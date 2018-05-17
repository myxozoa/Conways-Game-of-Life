import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
const canvasWidth = 500;
const canvasHeight = 400;

const COLORS = [
  [0x00, 0x00, 0x00],
  [0xFF, 0xFF, 0xFF],
  [0xFF, 0x00, 0x00],
]
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();

    this.canvas = null;
    this.ctx = null;
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.setupCanvas();
    requestAnimationFrame(() => this.animFrame());
  }

  setupCanvas = () => {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //
    let cells = this.life.getCells();
    let canvas = this.canvas;
    let ctx = this.ctx;

    let imageData = ctx.getImageData(0,0, canvas.width, canvas.height);


    let buffer = imageData.data;

    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        buffer[index + 0] = COLORS[currentNumber][0];
        buffer[index + 1] = COLORS[currentNumber][1];
        buffer[index + 2] = COLORS[currentNumber][2];
        buffer[index + 3] = 0xFF;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => this.animFrame());

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={canvasWidth} height={canvasHeight} />
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
        <LifeApp />
      </div>
    );
  }
}

export default App;
