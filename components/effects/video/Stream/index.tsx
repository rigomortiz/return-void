import React, {Component} from "react";

class VideoStream extends Component<{classes: any}> {
  private _video: HTMLVideoElement | null | undefined;

  get video(): HTMLVideoElement | null | undefined {
    return this._video;
  }

  componentDidMount() {
    //const intendedWidth = this._div!.clientWidth;
    //this._video!.setAttribute("width", String(intendedWidth));
  }

  render() {
    return (
      <>
        <video
          className={this.props.classes}
          ref={v => (this._video = v)}
          controls width={"640"}
          height={"360"} />
      </>
    );
  }
}

export default VideoStream;