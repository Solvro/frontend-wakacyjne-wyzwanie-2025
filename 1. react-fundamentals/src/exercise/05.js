// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

// 🐨 add a className prop to each div and apply the correct class names
// based on the text content
// 💰 Here are the available class names: box, box--large, box--medium, box--small
// 💰 each of the elements should have the "box" className applied

// 🐨 add a style prop to each div so their background color
// matches what the text says it should be
// 🐨 also use the style prop to make the font italic
// 💰 Here are available style attributes: backgroundColor, fontStyle

//basic
/*
const smallBox = <div className={"box box--small"} style={{backgroundColor: "lightblue", fontStyle: "italic"}}>small lightblue box</div>
const mediumBox = <div className={"box box--medium"} style={{backgroundColor: "pink", fontStyle: "italic"}}>medium pink box</div>
const largeBox = <div className={"box box--large"} style={{backgroundColor: "orange", fontStyle: "italic"}}>large orange box</div>
*/

//extra credit 1
/*
function Box(className, style,  ...otherProps}) {
  return <div className={"box " + className} style={{fontStyle: "italic",...style}} {...otherProps} />
}

const smallBox = <Box className={"box--small"} style={{backgroundColor: "lightblue"}}>small lightblue box</Box>
const mediumBox = <Box className={"box--medium"} style={{backgroundColor: "pink"}}>medium pink box</Box>
const largeBox = <Box className={"box--large"} style={{backgroundColor: "orange"}}>large orange box</Box>
*/
//extra credit 2
function Box({size, style,  ...otherProps}) {
  const className = size ? `box box--${size}` : 'box';
  return (<div className={className} style={{fontStyle: "italic",...style}}  {...otherProps} />);
}

function App() {
  return (
    <div>
      <Box size={"small"} style={{backgroundColor: "lightblue"}}>small lightblue box</Box>
      <Box size={"medium"} style={{backgroundColor: "pink"}}>medium pink box</Box>
      <Box size={"large"} style={{backgroundColor: "orange"}}>large orange box</Box>
    </div>
  )
}

export default App
