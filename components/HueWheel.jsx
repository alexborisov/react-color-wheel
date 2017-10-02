import React from 'react';
import chroma from 'chroma-js';

class HueWheel extends React.PureComponent {
  render(){
    const { n, strokeWidth, componentId } = this.props;

    const items = [];
    for(let i = 0; i<n; i++){
      const ref = i*2*Math.PI/n;
      const lo = ref; 
      const hi = ref + 2*Math.PI/n;
      const hiS = hi+0.002;      
      
      const d = `M ${Math.cos(lo)},${-Math.sin(lo)} A 1,1 0 0,0 ${Math.cos(hiS)},${-Math.sin(hiS)}`;
  
      items.push(
        <path
          key={i}
          d={d}
          stroke={`url(#g${i}${componentId})`}
        />
      );
    }

    return (
      <g fill="none" strokeWidth={strokeWidth}>{items}</g>
    );
  }
}

export default HueWheel;