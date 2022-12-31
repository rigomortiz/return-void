import {Component} from "react";
import cv from "opencv-ts";

class VideoStreaming extends Component<any, any>{
  componentDidMount() {
    cv.onRuntimeInitialized = () => {
      console.log('onRuntimeInitialized')
    }
  }

  init() {
    // Store useful UI elements
    const video: HTMLVideoElement = document.querySelector("video") as HTMLVideoElement;
    // Create float32 arrays for getFrequencyResponse()
   // const frequencyArray: Float32Array = new Float32Array([1000, 2000, 3000, 4000, 5000]);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream: MediaStream) => {
        video.srcObject = stream;
        video.onloadedmetadata = (e: Event) => {
          video.play().then(() => {
            console.log('Play')
          });
          video.muted = true;
          console.log(e)
        };

        // VIDEO
        let cap = new cv.VideoCapture(video);
        // take first frame of the video
        let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        cap.read(frame);

        //cv.cvtColor(frame, output, cv.COLOR_RGB2HSV, 0);
        let hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
        const FPS = 30;
        function processVideo() {
          let begin = Date.now();
          cap.read(frame);
          cv.cvtColor(frame, hsv, cv.COLOR_RGB2HSV);


          //cv.inRange(frame, new cv.Mat(190, 0, 0), new cv.Mat(256, 256, 256), src);

          // start processing.
          let [x, y, w, h] = [20, 20, 50, 50];
          cv.rectangle(hsv, new cv.Point(x, y), new cv.Point(x+w, y+h), [255, 0, 0, 255], 2);

          let font1 = cv.FONT_HERSHEY_SIMPLEX
          let org1 = new cv.Point(50, 50)
          let fontScale1 = 1
          let color = new cv.Scalar(255, 0, 0, 255)
          let thickness1 = 2
          cv.putText(hsv, 'return void();', org1, font1, fontScale1, color, thickness1, cv.LINE_AA)

          //const roiRect: Rect = new cv.Rect(0, 0, 300, 300);
          //const roi = hsv.roi(roiRect);
          cv.imshow('canvas-rv', hsv);

          // schedule the next one.
          let delay = 1000/FPS - (Date.now() - begin);
          setTimeout(processVideo, delay);
        }
        // schedule the first one.
        setTimeout(processVideo, 0);

        //cv.imshow('canvas-rv', frame);



        //VISUAL

        // Create a MediaStreamAudioSourceNode
        // Feed the HTMLMediaElement into it
        const audioCtx:AudioContext = new AudioContext();
        const source:MediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(audioCtx, {
          mediaStream: stream,
        });

        const analyser = audioCtx.createAnalyser();

        source.connect(analyser);
        source.connect(audioCtx.destination);

        const canvas = (document.querySelector('.visualizer') as HTMLCanvasElement)
        const intendedWidth = document.querySelector(".content")!.clientWidth;
        canvas.setAttribute("width", String(intendedWidth));
        const canvasCtx = canvas!.getContext('2d')
        if (canvasCtx === null)
          return;
        const WIDTH = canvas!.width;
        const HEIGHT = canvas!.height;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
          requestAnimationFrame(draw);
          analyser.fftSize = 2048;
          analyser.getByteTimeDomainData(dataArray);
          canvasCtx!.fillStyle = "#000";
          canvasCtx!.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx!.beginPath();

          canvasCtx!.lineWidth = 1;
          for (let xi=0; xi<=WIDTH; xi=xi+10){
            canvasCtx!.moveTo(xi,0);
            canvasCtx!.lineTo(xi,HEIGHT);
          }
          for (let yi=0; yi<=HEIGHT; yi=yi+10){
            canvasCtx!.moveTo(0, yi);
            canvasCtx!.lineTo(WIDTH, yi);
          }
          canvasCtx!.strokeStyle = "rgba(255,255,255,0.5)";
          canvasCtx!.stroke();

          canvasCtx!.lineWidth = 5;
          canvasCtx!.strokeStyle = '#E93CAC';
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
        draw()

      })
      .catch((err) => {
        console.error(`The following error occurred: ${err}`);
      });
  }

  render() {


    return (
      <>
        <div className={'content'}>
          <h1>Web Audio API examples: MediaStreamAudioSourceNode</h1>
          <button onClick={this.init}>Start</button>
          <video className={'video'} height={'300px'} width={'500px'} controls></video>
          <canvas className={'canvas-rv'} id={'canvas-rv'} width={'500px'} height={'300px'}></canvas>
          <canvas className={'visualizer'} height={'150px'} width={'100%'}></canvas>
        </div>
      </>
    );
  }
}
export default VideoStreaming