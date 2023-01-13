import Visualizer from "../index";
import {Audio} from "../../../../core/Audio";

class BarGraphVisualizer extends Visualizer {
  run(audio: Audio, style:any): void {
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
      analyser!.getByteFrequencyData(dataArray);

      this._canvasContext!.fillStyle = style.backgroundColor;
      this._canvasContext!.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 16.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 1;
        this._canvasContext!.fillStyle = style.barColor;
        this._canvasContext!.fillRect(x, HEIGHT - barHeight / 1, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    draw()
  }

}

export default BarGraphVisualizer