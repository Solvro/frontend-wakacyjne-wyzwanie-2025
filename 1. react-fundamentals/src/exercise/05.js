
import * as React from 'react'
import '../box-styles.css'

function Box({style, className = '', ...otherProps}) {
  return (
    <div
      className={`box ${className}`}
      style={{fontStyle: 'italic', ...style}}
      {...otherProps}
    />
  )
}

const smallBox = <Box className="box--small" style={{backgroundColor: 'lightblue'}}>small lightblue box</Box>

const mediumBox = <div className="box--medium box" style={{backgroundColor:'pink'}}>medium pink box</div>
const largeBox = <div className="box--large box" style={{backgroundColor:'orange'}}>large orange box</div>

function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
    </div>
  )
}

export default App
