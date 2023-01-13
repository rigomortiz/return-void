import React, {Component} from "react";
import {Audio} from "../../../core/Audio";

abstract class Visualizer extends Component<{ classes: any }> {
  protected _canvas: HTMLCanvasElement | null | undefined;
  protected _div: HTMLDivElement | null | undefined;
  protected _canvasContext: CanvasRenderingContext2D | null | undefined;

  abstract run(audio: Audio, style: any): void;

  componentDidMount() {
    const intendedWidth = this._div!.clientWidth;
    this._canvas!.setAttribute("width", String(intendedWidth));
    this._canvasContext = this._canvas!.getContext('2d')
    if (this._canvasContext === null)
      return;
  }

  render() {
    return (
      <div ref={d => (this._div = d)}>
        <canvas ref={c => (this._canvas = c)} height={'250'} width={'100%'} className={this.props.classes}/>
      </div>
    );
  }

}

export default Visualizer;
