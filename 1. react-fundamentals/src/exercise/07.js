import * as React from 'react'

const allItems = [
  {id: 'apple', value: '🍎 apple'},
  {id: 'orange', value: '🍊 orange'},
  {id: 'grape', value: '🍇 grape'},
  {id: 'pear', value: '🍐 pear'},
]

function App() {

  const [items, setItems] = React.useState(allItems)   // Stan przechowujący aktualnie wyświetlane elementy listy

  function addItem() {
    //lista identyfikatorow elementow listy
    const itemIds = items.map(i => i.id)
    // Szukamy w allItems elementu, ktorego id nie ma w stanie
    //dodajemy go na koniec
    setItems([...items, allItems.find(i => !itemIds.includes(i.id))])
  }

  function removeItem(item) {
    //nowa lista bez usuwanego
    setItems(items.filter(i => i.id !== item.id))
  }

  return (
    <div className="keys">
      <button disabled={items.length >= allItems.length} onClick={addItem}> 
        add item
      </button>
      <ul>
        {items.map(item => (
          <li key = {item.id}>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
