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

const smallBoxStyle = {backgroundColor: 'lightblue', fontStyle: 'italic'}
const mediumBoxStyle = {backgroundColor: 'pink', fontStyle: 'italic'}
const largeBoxStyle = {backgroundColor: 'orange', fontStyle: 'italic'}

const smallBox = <div className='box box--small' style= {smallBoxStyle}>small lightblue box</div>
const mediumBox = <div className= 'box box--medium' style= {mediumBoxStyle}>medium pink box</div>
const largeBox = <div className= 'box box--large' style= {largeBoxStyle}>large orange box</div>

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
