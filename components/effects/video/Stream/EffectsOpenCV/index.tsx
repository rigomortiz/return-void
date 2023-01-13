import React, {Component} from "react";

class VideoStreamEffectOpenCV extends Component<{classVideo: any, classCanvas: any}> {
  private _canvas: HTMLCanvasElement | null | undefined;
  private _canvasFrame: HTMLCanvasElement | null | undefined;
  private _video: HTMLVideoElement | null | undefined;

  get video(): HTMLVideoElement | null | undefined {
    return this._video;
  }

  get canvas(): HTMLCanvasElement | null | undefined {
    return this._canvas;
  }

  get canvasFrame(): HTMLCanvasElement | null | undefined {
    return this._canvasFrame;
  }

  componentDidMount() {
    //const intendedWidth = this._div!.clientWidth;
    //this._video!.setAttribute("width", String(intendedWidth));
  }

  render() {
    return (
      <>
        <canvas ref={c => (this._canvas = c)} className={this.props.classCanvas} width="640" height="360"/>
        <canvas ref={cf => (this._canvasFrame = cf)} className={'is-hidden'} width="640" height="360"/>
        <video className={this.props.classVideo} ref={v => (this._video = v)} controls width={'640'} height={'360'} />
      </>
    );
  }
}

export default VideoStreamEffectOpenCV;