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

/*const smallBox = (
  <div
    className="box box--small"
    style={{ fontStyle: "italic", backgroundColor: "lightblue" }}
  >
    small lightblue box
  </div>
);
const mediumBox = (
  <div
    className="box box--medium"
    style={{ fontStyle: "italic", backgroundColor: "pink" }}
  >
    medium pink box
  </div>
);
const largeBox = (
  <div
    className="box box--large"
    style={{ fontStyle: "italic", backgroundColor: "orange" }}
  >
    large orange box
  </div>
);*/

function Box({ size, className = "", style, ...otherProps }) {
  const sizeClass = size ? `box--${size}` : "";
  return (
    <div
      className={`box ${sizeClass} ${className}`.trim()}
      style={{ fontStyle: "italic", ...style }}
      {...otherProps}
    />
  );
}

const smallBox = (
  <Box size="small" style={{ backgroundColor: "lightblue" }}>
    small lightblue box
  </Box>
);
const mediumBox = (
  <Box size="medium" style={{ backgroundColor: "pink" }}>
    medium pink box
  </Box>
);
const largeBox = (
  <Box size="large" style={{ backgroundColor: "orange" }}>
    large orange box
  </Box>
);

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
