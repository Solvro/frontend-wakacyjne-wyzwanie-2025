// React.memo for reducing unnecessary re-renders
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {useCombobox} from '../use-combobox'
import {getItems} from '../workerized-filter-cities'
import {useAsync, useForceRerender} from '../utils'
import {a} from 'react-spring'

// React.memo make rerendering slightly faster but in this simple case there is no visible difference

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          // (commented in extra 2)
          // selectedItem={selectedItem}
          // highlightedIndex={highlightedIndex}

          // extra 2
          isHighlighted={highlightedIndex === index}
          isSelected={selectedItem?.id === index}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  )
}

// 🐨 Memoize the Menu here using React.memo

// it does not prevent useless rerending here beacuse of the line:
//    const items = allItems.slice(0, 100)
// Every rerender items are not referentially equal
// Menu gets rerendered because of it
// I'll wrap it in useCallback

Menu = React.memo(Menu)

function ListItem({
  getItemProps,
  item,
  index,
  // (commented in extra 2)
  // selectedItem,
  // highlightedIndex,

  // extra 2
  isHighlighted,
  isSelected,
  ...props
}) {
  // (commented in extra 2)
  // const isSelected = selectedItem?.id === item.id
  // const isHighlighted = highlightedIndex === index

  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        },
        ...props,
      })}
    />
  )
}

// extra 1
const isListItemTheSame = (oldProps, newProps) => {
  if (oldProps.getItemProps !== newProps.getItemProps) return false
  if (oldProps.item !== newProps.item) return false
  if (oldProps.index !== newProps.index) return false
  if (oldProps.selectedItem !== newProps.selectedItem) return false

  if (
    oldProps.highlightedIndex !== newProps.highlightedIndex &&
    (oldProps.highlightedIndex === oldProps.index) !==
      (newProps.highlightedIndex === newProps.index)
  )
    return false

  return true
}

// 🐨 Memoize the ListItem here using React.memo

// exercise
// ListItem = React.memo(ListItem)

// extra 1
// ListItem = React.memo(ListItem, isListItemTheSame)

// extra 2
ListItem = React.memo(ListItem)

function App() {
  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = React.useState('')

  const {data: allItems, run} = useAsync({data: [], status: 'pending'})
  React.useEffect(() => {
    run(getItems(inputValue))
  }, [inputValue, run])

  // has to be wrapped in useMemo because it's a Menu prop
  const items = React.useMemo(() => {
    console.log('rerender check')
    return allItems.slice(0, 100)
  }, [allItems])

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    onSelectedItemChange: ({selectedItem}) =>
      alert(
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  })

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({type: 'text'})} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  )
}

export default App

/*
eslint
  no-func-assign: 0,
*/
