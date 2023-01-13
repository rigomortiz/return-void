import React, {Component} from "react";
import {CyberpunkSynthWave} from "../../../core/types/enums/Colors";

class Sky extends Component<{ classes: any }> {
  protected _canvas: HTMLCanvasElement | null | undefined;
  protected _canvasContext: CanvasRenderingContext2D | null | undefined;

  componentDidMount() {

    // resize the canvas to fill browser window dynamically
    const resizeCanvas = () => {
      /**
       * Your drawings need to be inside this function otherwise they will be reset when
       * you resize the browser window and the canvas goes will be cleared.
       */
      console.log(window.innerWidth)
      console.log(window.innerHeight)
    }

    window.addEventListener('resize', resizeCanvas, false);

    this._canvas!.setAttribute("width", String(window.innerWidth));
    this._canvas!.setAttribute("height", String(window.innerHeight));

    this._canvasContext = this._canvas!.getContext('2d')
    if (this._canvasContext === null)
      return;

    const WIDTH = this._canvas!.width;
    const HEIGHT = this._canvas!.height;

    this._canvasContext!.fillStyle = CyberpunkSynthWave.MidnightDreams;
    this._canvasContext!.fillRect(0, 0, WIDTH, HEIGHT);

    this._canvasContext!.arc(WIDTH/2, 75, 75, 0, 2 * Math.PI);
    this._canvasContext!.fillStyle = CyberpunkSynthWave.CleanPoolBlue;
    this._canvasContext!.fill()

    for(let i = 0; i < 50; i++) {
      this._canvasContext!.beginPath();
      this._canvasContext!.fillStyle = '#FFF';
      this._canvasContext!.fillRect(Math.random()*WIDTH, Math.random()*HEIGHT, 2, 2)
    }

    this._canvasContext!.fillStyle = CyberpunkSynthWave.ShadowPlanet;

    let space = 0;
    for(let i = HEIGHT/2; i <= HEIGHT; i+=space) {
      this._canvasContext!.beginPath();
      this._canvasContext!.fillStyle = '#E93CAC';
      this._canvasContext!.fillRect(0, i, WIDTH, 1)
      space += 0.1;
    }

    this._canvasContext.lineWidth = 2;
    this._canvasContext.beginPath();
    this._canvasContext.moveTo(WIDTH/2,HEIGHT/2);
    this._canvasContext.lineTo(WIDTH/2, HEIGHT);
    this._canvasContext.strokeStyle = '#E93CAC'
    this._canvasContext.stroke();

    for (let i = 1; i <= WIDTH; i++) {
      this._canvasContext.lineWidth = 1.5;
      this._canvasContext.beginPath();
      this._canvasContext.moveTo(WIDTH/2 ,HEIGHT/2);
      this._canvasContext.lineTo(WIDTH/2 - 100*i, HEIGHT);
      this._canvasContext.strokeStyle = '#E93CAC'
      this._canvasContext.stroke();

      this._canvasContext.lineWidth = 1.5;
      this._canvasContext.beginPath();
      this._canvasContext.moveTo(WIDTH/2,HEIGHT/2);
      this._canvasContext.lineTo(WIDTH/2 + 100*i, HEIGHT);
      this._canvasContext.strokeStyle = '#E93CAC'
      this._canvasContext.stroke();
    }
  }

  render() {
    return (
      <canvas ref={c => (this._canvas = c)} height={'100%'} width={'100%'} className={this.props.classes}/>
    );
  }
}

export default Sky;