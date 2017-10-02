import React from 'react';
import { DragLayer } from 'react-dnd';
import Rainbow from './Rainbow';

class CustomDragLayer extends React.PureComponent {
  constructor(props){
    super(props);
  }

  getHue(){
    const {
      hue, offset,
      itemType, radius
    } = this.props;

    if(!offset) return hue;
    if(itemType !== 'hue') return hue;

    const { x, y } = offset;
    const x1 = x - radius;
    const y1 = y - radius;

    let h2 = -Math.atan2(y1, x1) / Math.PI * 180;
    h2 = (h2+3600)%360;
    h2 = Math.round(h2);

    return h2;
  }

  getSaturationValue(){
    const {
      hue, saturation, value,
      offset, itemType, radius,
      thickness
    } = this.props;

    if(!offset) return { saturation, value };
    if(itemType !== 'saturation-value') return { saturation, value };

    const { x, y } = offset;
    const x1 = x - radius;
    const y1 = y - radius;

    const rx1 = x1 / (radius - thickness);
    const ry1 = y1 / (radius - thickness);

    const ang = 5*Math.PI/3 + (hue / 180 * Math.PI);
    const cos30 = Math.cos(ang);
    const sin30 = Math.sin(ang);

    const e1 = + cos30*rx1 - sin30*ry1;
    const e2 = - sin30*rx1 - cos30*ry1;

    let v2 = (e1 + 1) / 1.5;
    if(v2<0) v2 = 0;
    if(v2>1) v2 = 1;

    let s2 = 0;
    if(v2 > 0){
      const sc = Math.sqrt(3) * v2;
      s2 = (e2+(sc/2)) / sc;
    }

    if(s2<0) s2 = 0;        
    if(s2>1) s2 = 1;

    return { saturation: s2, value: v2 };
  }

  render(){
    const { 
      itemType,
      radius,
      thickness      
    } = this.props;
    
    const hue = this.getHue();
    const { saturation, value } = this.getSaturationValue();

    return (
      <Rainbow
        hue={hue}
        saturation={saturation}
        value={value}
        radius={this.props.radius}
        componentId={this.props.componentId}
        thickness={this.props.thickness}
      />
    )
  }
}

const collect = (monitor, props) => {
  const currentOffset = monitor.getClientOffset();

  let offset = null;
  if(currentOffset){
    const { x, y } = currentOffset;

    const { boundingBox } = monitor.getItem();
    const { left, top } = boundingBox;

    const x1 = x - left;
    const y1 = y - top;

    offset = { x: x1, y: y1 };
  }

  return {
    itemType: monitor.getItemType(),
    offset
  };
};

export default DragLayer(collect)(CustomDragLayer);