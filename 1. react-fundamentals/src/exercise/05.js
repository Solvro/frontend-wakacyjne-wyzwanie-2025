import * as React from 'react'
import '../box-styles.css'

// Part 1
// const smallBox = (
//   <div
//     style={{backgroundColor: 'lightblue', fontStyle: 'italic'}}
//     className="box box--small"
//   >
//     small lightblue box
//   </div>
// )
// const mediumBox = (
//   <div
//     style={{backgroundColor: 'pink', fontStyle: 'italic'}}
//     className="box box--medium"
//   >
//     medium pink box
//   </div>
// )
// const largeBox = (
//   <div
//     style={{backgroundColor: 'orange', fontStyle: 'italic'}}
//     className="box box--large"
//   >
//     large orange box
//   </div>
// )

// function App() {
//   return (
//     <div>
//       {smallBox}
//       {mediumBox}
//       {largeBox}
//     </div>
//   )
// }

// Part 2
// function Box({children, style, className}) {
//   return (
//     <div style={{...style, fontStyle: 'italic'}} className={`box ${className}`}>
//       {children}
//     </div>
//   )
// }

// function App() {
//   return (
//     <div>
//       <Box className="box--small" style={{backgroundColor: 'lightblue'}}>
//         small lightblue box
//       </Box>
//       <Box className="box--medium" style={{backgroundColor: 'pink'}}>
//         medium pink box
//       </Box>
//       <Box className="box--large" style={{backgroundColor: 'orange'}}>
//         large orange box
//       </Box>
//     </div>
//   )
// }

// Part 3
function Box({children, style, size}) {
  return (
    <div style={{...style, fontStyle: 'italic'}} className={`box box--${size}`}>
      {children}
    </div>
  )
}

function App() {
  return (
    <div>
      <Box size="small" style={{backgroundColor: 'lightblue'}}>
        small lightblue box
      </Box>
      <Box size="medium" style={{backgroundColor: 'pink'}}>
        medium pink box
      </Box>
      <Box size="large" style={{backgroundColor: 'orange'}}>
        large orange box
      </Box>
    </div>
  )
}
export default App
