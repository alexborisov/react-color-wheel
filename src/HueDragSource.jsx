import React from 'react';
import { DragSource } from 'react-dnd'

import previewSrc from '../utils/emptyImage';

class HueDragSource extends React.PureComponent {
  componentDidMount(){
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src = previewSrc;
  }

  render(){
    const { radius, connectDragSource } = this.props;
    const style = {
      position: 'absolute',
      width: 2*radius,
      height: 2*radius,
      border: 'none',
      top: 0, left: 0,
      borderRadius: '50%',
      cursor: 'pointer'
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
    const { radius } = props;
    const { x, y } = monitor.getClientOffset();
    const { boundingBox } = monitor.getItem();    
    const { left, top } = boundingBox;

    const x1 = x - left - radius;
    const y1 = y - top - radius;
    
    let h2 = -Math.atan2(y1, x1) / Math.PI * 180;  
    h2 = (h2+3600)%360;
    h2 = Math.round(h2);

    if(props.onHueChange){
      props.onHueChange(h2);
    }
  },
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('hue', cardSource, collect)(HueDragSource);