import React from 'react';
import chroma from 'chroma-js';

class HueWheelDefs extends React.PureComponent {
  render(){
    const { n, componentId } = this.props;
    const items = [];
    for(let i = 0; i<n; i++){
      const ref = i*2*Math.PI/n;
      const lo = ref; 
      const loDeg = lo * 180 / Math.PI;
      const hi = ref + 2*Math.PI/n;
      const hiDeg = hi * 180 / Math.PI;   

      const r1 = ref + Math.PI/n;      
      
      const x10 = Math.sin(r1); const xa = Math.abs(x10);
      const y10 = Math.cos(r1); const ya = Math.abs(y10);
      const x20 = -Math.sin(r1);
      const y20 = -Math.cos(r1);
      const mult = 1 / Math.max(xa, ya);      
  
      const x11 = (mult*x10+1)/2;
      const y11 = (mult*y10+1)/2;
      const x21 = (mult*x20+1)/2;
      const y21 = (mult*y20+1)/2;

      items.push(
        <linearGradient 
          key={i}        
          id={`g${i}${componentId}`}
          gradientUnits="objectBoundingBox"
          x1={x11} 
          y1={y11} 
          x2={x21} 
          y2={y21}
        >
          <stop offset="0%" stopColor={`${chroma.hsv(loDeg,1,1).hex()}`} />   
          <stop offset="100%" stopColor={`${chroma.hsv(hiDeg,1,1).hex()}`} />   
        </linearGradient>
      );
    }

    return (
      <defs>{items}</defs>
    )
  }
}

export default HueWheelDefs;