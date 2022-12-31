import React, {Component} from "react";

class AudioVisualizer extends Component<any, any> {
  public static URL = '/audio/Malfunction.mp3'

  /*
  device() {
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
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
   */

  init() {
    //this.device()
    // this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  play() {
    AudioVisualizer.getAudio(AudioVisualizer.URL)
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

        const canvas = (document.getElementById('visualizer') as HTMLCanvasElement)
        const intendedWidth = document.querySelector(".content")!.clientWidth;
        canvas.setAttribute("width", String(intendedWidth));
        const canvasCtx = canvas!.getContext('2d')
        if (canvasCtx === null)
          return;

        let audioCtx = new (window.AudioContext)();
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

        const WIDTH = canvas!.width;
        const HEIGHT = canvas!.height;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);


        //analyser.getByteTimeDomainData(dataArray);


        canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);


        //const colorsM = ['#204829', '#22b455','#80ce87', '#92e5a1']
        const colorsC = ['#201547','#E93CAC', '#1E22AA', '#00BCE1', '#59CBE8']


        // @ts-ignore
        function draw() {
          requestAnimationFrame(draw);
          analyser.fftSize = 2048;
          analyser.getByteTimeDomainData(dataArray);
          canvasCtx!.fillStyle = "#000";
          canvasCtx!.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx!.beginPath();

          canvasCtx!.lineWidth = 1;
          for (let xi=0; xi<=WIDTH; xi=xi+50){
            canvasCtx!.moveTo(xi,0);
            canvasCtx!.lineTo(xi,HEIGHT);
          }
          for (let yi=0; yi<=HEIGHT; yi=yi+50){
            canvasCtx!.moveTo(0, yi);
            canvasCtx!.lineTo(WIDTH, yi);
          }
          canvasCtx!.strokeStyle = "rgba(255,255,255,0.5)";
          canvasCtx!.stroke();

          canvasCtx!.lineWidth = 5;
          canvasCtx!.strokeStyle = colorsC[Math.floor(Math.random() * 4)];
          canvasCtx!.beginPath();
          const sliceWidth = WIDTH / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * (HEIGHT / 2);
            if (i === 0) {
              canvasCtx!.moveTo(x, y);
            } else {
              canvasCtx!.lineTo(x, y);
            }
            x += sliceWidth;
          }
          canvasCtx!.lineTo(WIDTH, HEIGHT / 2);
          canvasCtx!.stroke();
        }

        function draw2() {
          requestAnimationFrame(draw2);

          analyser.getByteFrequencyData(dataArray);

          canvasCtx!.fillStyle = "hsl(0, 0%, 4%)";
          canvasCtx!.fillRect(0, 0, WIDTH, HEIGHT);

          const barWidth = (WIDTH / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

           for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            canvasCtx!.fillStyle = '#E93CFF';
            canvasCtx!.fillRect(x, HEIGHT - barHeight / 1.2, barWidth, barHeight);
           canvasCtx!.fillStyle = '#E93C77';
            canvasCtx!.fillRect(x, HEIGHT - barHeight / 1.5, barWidth, barHeight);
            canvasCtx!.fillStyle = '#E93C00';
            canvasCtx!.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
          }
        }
        draw2()
        //draw()
      })

    return
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <>
        <canvas ref={'canvas'} className="visualizer" id={'visualizer'}></canvas>
      </>
    );
  }

}
export default AudioVisualizer;
