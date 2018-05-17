import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0xFF, 0xFF, 0xFF],
  [0xFF, 0x00, 0x00],
  [0x00, 0xFF, 0x00],
  [0x00, 0x00, 0xFF],
  [0x00, 0x00, 0x00],
];

/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.cca = new CCA(props.width, props.height);    
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});

  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let cells = this.cca.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0,0, canvas.width, canvas.height);

    // let screenBuffer = imageData;

    // screenBuffer.data[0] = 0;
    // screenBuffer.data[1] = 0;
    // screenBuffer.data[2] = 0;

    // ctx.putImageData(screenBuffer, 0, 0);

    let buffer = imageData.data;

    for(let row = 0; row < this.props.height; row++) {
      for(let col =0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        buffer[index + 0] = COLORS[currentNumber][0];
        buffer[index + 1] = COLORS[currentNumber][1];
        buffer[index + 2] = COLORS[currentNumber][2];
        buffer[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    this.cca.step();
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Render
   */
  render() {
    return (
      <canvas ref='canvas' width={this.props.width} height={this.props.height} />
    );
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {
  constructor(props) {
    super(props);

  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={600} height={600}/>
      </div>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <CCAApp />
      </div>
    );
  }
}

export default App;