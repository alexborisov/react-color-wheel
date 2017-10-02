import chroma from 'chroma-js';
import React from 'react';
import DragLayer from './DragLayer';
import HueDragSource from './HueDragSource';
import SaturationValueDragSource from './SaturationValueDragSource';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const rootStyle = {
  position: 'relative'  
}

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const randomId = () => {
  return (
    s4() + s4() + s4() + s4() + 
    s4() + s4() + s4() + s4()
  );
}


class ColorWheel extends React.PureComponent {
  constructor(props){
    super(props);

    this.componentId = randomId();

    this.state = {
      hue: 0,
      saturation: 0,
      value: 0
    };
  }

  render(){
    const { hue, saturation, value } = this.state;
    const { diameter, wheelThickness } = this.props;

    const radius = diameter ? diameter / 2 : 125;
    const thickness = wheelThickness ? wheelThickness : radius/5;

    return (
      <div style={rootStyle} id={`color-picker-root-${this.componentId}`}>
        <DragLayer
          radius={radius}
          thickness={thickness}
          hue={hue}
          saturation={saturation}
          value={value}
          componentId={this.componentId}
        />

        <HueDragSource 
          onHueChange={hue => this.setState({ hue })}
          radius={radius}
          thickness={thickness}
          componentId={this.componentId}
        />
        <SaturationValueDragSource
          hue={hue}
          onSaturationChange={saturation => this.setState({ saturation })} 
          onValueChange={value => this.setState({ value })}
          radius={radius}
          thickness={thickness}
          componentId={this.componentId}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(ColorWheel);;