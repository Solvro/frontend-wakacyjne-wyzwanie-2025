import * as React from 'react'
import '../box-styles.css'

// Background
// const smallBox = (
//     <div className = "box box--small"
//          style = {{fontStyle: 'italic', backgroundColor: 'lightblue'}}
//     >
//          small lightblue box
//     </div>)
//
// const mediumBox = (
//     <div className = "box box--medium"
//          style = {{fontStyle: 'italic', backgroundColor: 'pink'}}
//     >
//          medium pink box
//     </div>)
//
// const largeBox = (
//     <div className = "box box--large"
//          style = {{fontStyle: 'italic', backgroundColor: 'orange'}}
//     >
//          large orange box
//     </div>)

// 1
// function Box({className = "", style, ...otherProps}) {
//   return (
//       <div
//           className = {`${className} box`}
//           style = {{fontStyle: 'italic', ...style}}
//           {...otherProps}
//       />)
// }
//
// const smallBox = (
//     <Box
//         id = "small-box"
//         className = "box--small"
//         style = {{backgroundColor: 'lightblue'}}
//     >
//          small lightblue box
//     </Box>)
//
// const mediumBox = (
//     <Box className = "box--medium"
//          style = {{ backgroundColor: 'pink'}}
//     >
//          medium pink box
//     </Box>)
//
// const largeBox = (
//     <Box className = "box--large"
//          style = {{backgroundColor: 'orange'}}
//     >
//          large orange box
//     </Box>)

//2
function Box({style, size, className = "", ...otherProps}) {
  const sizeClassName = size ? `box--${size}` : ''
  return (
      <div
          className = {`box ${className} ${sizeClassName}`}
          style = {{fontStyle: 'italic', ...style}}
          {...otherProps}
      />)
}

const smallBox = (
    <Box
        id = "small-box"
        size = "small"
        style = {{backgroundColor: 'lightblue'}}
    >
      small lightblue box
    </Box>)

const mediumBox = (
    <Box
        size = "medium"
        style = {{ backgroundColor: 'pink'}}
    >
      medium pink box
    </Box>)

const largeBox = (
    <Box
        size = "large"
        style = {{backgroundColor: 'orange'}}
    >
      large orange box
    </Box>)


function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
      <Box> sizeless box </Box>
    </div>
  )
}

export default App
