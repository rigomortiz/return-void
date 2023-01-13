import {Audio} from "../../../../core/Audio";
import Visualizer from "../index";

class OscilloscopeVisualizer extends Visualizer {

  run(audio: Audio, style: any): void {
    if (audio == undefined)
      return;

    const WIDTH = this._canvas!.width;
    const HEIGHT = this._canvas!.height;

    this._canvasContext!.clearRect(0, 0, WIDTH, HEIGHT);

    const analyser = audio.analyserNode;
    const bufferLength = analyser!.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser!.fftSize = 2048;
      analyser!.getByteTimeDomainData(dataArray);
      this._canvasContext!.fillStyle = style.backgroundColor;
      this._canvasContext!.fillRect(0, 0, WIDTH, HEIGHT);
      this._canvasContext!.beginPath();

      // this._canvasContext!.lineWidth = 1;
      // for (let xi = 0; xi <= WIDTH; xi = xi + 10) {
      //   this._canvasContext!.moveTo(xi, 0);
      //   this._canvasContext!.lineTo(xi, HEIGHT);
      // }
      // for (let yi = 0; yi <= HEIGHT; yi = yi + 10) {
      //   this._canvasContext!.moveTo(0, yi);
      //   this._canvasContext!.lineTo(WIDTH, yi);
      // }
      // this._canvasContext!.strokeStyle = "rgba(255,255,255,0.5)";
      // this._canvasContext!.stroke();

      this._canvasContext!.lineWidth = 2;
      this._canvasContext!.strokeStyle = style.lineColor;
      this._canvasContext!.beginPath();
      const sliceWidth = WIDTH / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (HEIGHT / 2);
        if (i === 0) {
          this._canvasContext!.moveTo(x, y);
        } else {
          this._canvasContext!.lineTo(x, y);
        }
        x += sliceWidth;
      }
      this._canvasContext!.lineTo(WIDTH, HEIGHT / 2);
      this._canvasContext!.stroke();
    }

    draw()
  }
}

export default OscilloscopeVisualizer;
