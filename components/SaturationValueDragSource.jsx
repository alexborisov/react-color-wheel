import React from 'react';
import { DragSource } from 'react-dnd'

import previewSrc from '../utils/emptyImage'

class SaturationValueDragSource extends React.PureComponent {
  componentDidMount(){
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src = previewSrc;
  }

  render(){
    const { connectDragSource, radius, thickness } = this.props;
    const dia = 2*(radius-thickness);

    const style = {
      position: 'absolute',
      width: dia,
      height: dia,
      border: 'none',
      top: thickness, left: thickness,
      borderRadius: '50%',
      cursor: 'normal'
    };

    return connectDragSource(
      <div style={style} />
    );
  }
}

const cardSource = {
  beginDrag: props => {
    const { componentId } = props;
    const el = document.getElementById(`color-picker-root-${componentId}`);
    const bb = el.getBoundingClientRect();

    return {
      boundingBox: bb
    };
  },

  endDrag: (props, monitor) => {
    const { hue, radius, thickness } = props;
    const { x, y } = monitor.getClientOffset();
    const { boundingBox } = monitor.getItem();    
    const { left, top } = boundingBox;

    const x1 = x - left - radius;
    const y1 = y - top - radius;

    const rx1 = x1 / (radius-thickness);
    const ry1 = y1 / (radius-thickness);
    
    const ang = 5*Math.PI/3 + (hue / 180 * Math.PI);
    const cos30 = Math.cos(ang);
    const sin30 = Math.sin(ang);

    const e1 = + cos30*rx1 - sin30*ry1;
    const e2 = - sin30*rx1 - cos30*ry1;

    let v2 = (e1 + 1)/1.5;
    let s2 = 0;

    if(v2<0) v2 = 0;
    if(v2>1) v2 = 1;

    if(v2 === 0) s2 = 0;
    else {
      const sc = Math.sqrt(3) * v2;
      s2 = (e2+(sc/2)) / sc;
    }

    if(s2<0) s2 = 0;        
    if(s2>1) s2 = 1;    

    if(props.onSaturationChange){
      props.onSaturationChange(s2);
    }

    if(props.onValueChange){
      props.onValueChange(v2);
    }
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('saturation-value', cardSource, collect)(SaturationValueDragSource);