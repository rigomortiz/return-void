import React, {Component} from "react";

class Audio extends Component<any, any> {
  public static URL = '/audio/spirale_jam_kog_reverd_and_EQ.mp3'

  device() {
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      //navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia =
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
  }
  init() {
    this.device()
    // this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  play() {
    Audio.getAudio(Audio.URL)
  }

  public static getAudio(url: string) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((response) => {
        document.getElementById('play')!.setAttribute('disabled', 'disabled')
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let source = audioCtx.createBufferSource();
        const analyser = audioCtx.createAnalyser();
        audioCtx.decodeAudioData(
          response,
          (buffer) => {
            source.buffer = buffer;
            source.connect(analyser);
            source.connect(audioCtx.destination);
            source.loop = true;
            source.start()
          },
          (e) => console.error(`Error with decoding audio data: ${e}`)
        );

        const WIDTH = 1200, HEIGHT = 100;
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        let canvasCtx =  document.getElementById('visualizer')!.getContext('2d')
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        const colors = ['#204829', '#22b455','#80ce87', '#92e5a1']
        function draw() {
          const drawVisual = requestAnimationFrame(draw);
          analyser.getByteTimeDomainData(dataArray);
          canvasCtx.fillStyle = "#020204";
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx.lineWidth = 7;
          canvasCtx.strokeStyle = colors[Math.floor(Math.random() * 3)];
          canvasCtx.beginPath();
          const sliceWidth = WIDTH / bufferLength;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * (HEIGHT / 2);
            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          canvasCtx.lineTo(WIDTH, HEIGHT / 2);
          canvasCtx.stroke();
        }
        draw()
      })
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <>
        <button className="button is-danger is-rounded" id={'play'} onClick={this.play}>Play</button>
        <canvas ref={'canvas'} className="visualizer" id={'visualizer'}></canvas>
      </>
    );
  }

}
export default Audio;
