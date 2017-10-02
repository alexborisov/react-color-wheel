import React from 'react';

class ColorTriangleDefs extends React.PureComponent {
  render(){
    return (
      <defs>            
        <linearGradient id="bottom-to-top-mask" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="1.0"/>
          <stop offset="1" stopColor="white" stopOpacity="0.0"/>
        </linearGradient>
        <mask id="fade" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#bottom-to-top-mask)"/>
        </mask>
        <linearGradient id="left-to-right-color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="black"/>
          <stop offset="1" stopColor="white"/>
        </linearGradient>
      </defs>
    );
  }
}

export default ColorTriangleDefs;