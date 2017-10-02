import React from 'react';
import chroma from 'chroma-js';

import HueWheel from './HueWheel';
import HueWheelDefs from './HueWheelDefs';

import ColorTriangle from './ColorTriangle';
import ColorTriangleDefs from './ColorTriangleDefs';

class Rainbow extends React.PureComponent {
  render(){
    const { 
      hue, saturation, value, 
      currentOffset, itemType, 
      radius, thickness,
      componentId
    } = this.props;

    const chromaColor = chroma.hsv(hue, saturation, value); 
    const hexColor = chromaColor.hex();
    const lumColor = chromaColor.luminance();
    const rgb = chromaColor.rgb();

    const chromaHue = chroma.hsv(hue, 1, 1);
    const lumHue = chromaHue.luminance();
    const hexHue = chromaHue.hex();

    const tr = thickness / (radius-thickness/2);    
    const ht = tr/2;
    const ht1 = 1+ht;
    const htm1 = 1-ht;

    const sc = Math.sqrt(3) * value;
    const e2 = saturation*sc - sc/2;
    const e1 = value*1.5-1;

    const ang = -7*Math.PI/3;
    const cos30 = Math.cos(ang);
    const sin30 = Math.sin(ang);

    const rx1 = + cos30*e1 - sin30*e2;
    const ry1 = - sin30*e1 - cos30*e2;
    const x1 = rx1 * (1-tr/2);
    const y1 = ry1 * (1-tr/2);

    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height={`${2*radius}px`} viewBox={`-${ht1} -${ht1} ${2*ht1} ${2*ht1}`}>
          <HueWheelDefs n={12} componentId={componentId} />
          <ColorTriangleDefs componentId={componentId} />
        
          <g strokeWidth="0">
            <HueWheel strokeWidth={tr} n={12} componentId={componentId} />
            <g transform={`rotate(${-hue})`} fill={hexHue} stroke={'black'} strokeWidth={.01} >
              <ColorTriangle radius={htm1} />

              <rect x={1-tr/2} y={-tr / 16} width={tr} height={tr / 8} fill={lumHue < .4 ? 'white' : 'black'} stroke="none"/>
              <circle cx={x1} cy={y1} r={.05} fill="none" strokeWidth="0.03" stroke={lumColor < .4 ? 'white':'black'} />
            </g>
          </g>
        </svg>
        <div className="color-picker-preview" style={{ width: 50, height: 50, background: hexColor }} />
        <div style={{fontFamily: 'monospace'}}>{`hsv => ${hue.toFixed(3)} == ${saturation.toFixed(3)} == ${value.toFixed(3)}`}</div>
        <div style={{fontFamily: 'monospace'}}>{`rgb => ${rgb[0].toFixed(3)} == ${rgb[1].toFixed(3)} == ${rgb[2].toFixed(3)}`}</div>
      </div>
    );
  }
}

export default Rainbow;