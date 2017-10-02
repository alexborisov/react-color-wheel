import React from 'react';

class ColorTriangle extends React.PureComponent {
  render(){
    const { radius } = this.props;
    const hx = 0;
    const tp1 = `${Math.cos(hx)*radius},${-Math.sin(hx)*radius}`;
    const tp2 = `${Math.cos(hx+2*Math.PI/3)*radius},${-Math.sin(hx+2*Math.PI/3)*radius}`; 
    const tp3 = `${Math.cos(hx+4*Math.PI/3)*radius},${-Math.sin(hx+4*Math.PI/3)*radius}`;
    const tps = `${tp1} ${tp2} ${tp3}`;

    return (
      <g>
        <polygon points={tps} />
        <polygon points={tps} fill="url(#left-to-right-color)" mask="url(#fade)" stroke="none" />
      </g>
    )
  }
}

export default ColorTriangle;