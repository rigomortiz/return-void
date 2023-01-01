import React from "react";
import BodyHero from "../../../components/atoms/Section/Hero/Body";
import Button from "../../../components/atoms/Button";
import SectionHero from "../../../components/atoms/Section/Hero";
import {Video} from "../../../components/core/Video";
import styles from "./index.module.scss";
import HeadHero from "../../../components/atoms/Section/Hero/Head";
import NavLevel from "../../../components/atoms/NavLevel";
import VideoStreamEffectOpenCV from "../../../components/effects/video/Stream/EffectsOpenCV";
import cv from "opencv-ts";
import Mat from "opencv-ts/src/core/Mat";
import {delay} from "rxjs";
import {setIn} from "immutable";

const VideoStreamOpenCVPage = () => {
  let videoStreamEffectOpenCV: VideoStreamEffectOpenCV | null;

  let onClick = function () {
    let videoInput = videoStreamEffectOpenCV?.video;
    let canvasOutput = videoStreamEffectOpenCV?.canvas;
    let canvasFrameContext = videoStreamEffectOpenCV!.canvasFrame!
      .getContext('2d', {willReadFrequently: true});

    if (videoInput == undefined || canvasOutput == undefined)
      return;

    const constraints: MediaStreamConstraints = {
      audio: true,
      //peerIdentity: '1',
      //preferCurrentTab: true,
      video: true
    };

    function textTerminator(img: Mat.Mat) {
      const scale = 0.5;
      const red = new cv.Scalar(255, 0, 0, 125);
      const white = new cv.Scalar(255, 255, 255, 255);
      cv.putText(img, 'ANALYSIS', new cv.Point(50, 50), cv.FONT_HERSHEY_COMPLEX_SMALL, scale,
        white, 1, cv.LINE_AA)
      cv.putText(img, '************', new cv.Point(50, 60), cv.FONT_HERSHEY_COMPLEX_SMALL, scale,
        white, 1, cv.LINE_AA)
      for (let i = 0; i < 10; i++)
        cv.putText(img,
          String(`${Math.floor(Math.random() * 100_000_000)}  ${Math.floor(Math.random() * 1000)}  ${Math.floor(Math.random() * 100)}`),
          new cv.Point(50, 70 + i * 10), cv.FONT_HERSHEY_COMPLEX_SMALL, scale,
          white, 1, cv.LINE_AA)

      cv.putText(img, 'SEARCH MODE: _', new cv.Point(50, 300), cv.FONT_HERSHEY_DUPLEX, 1,
        white, 1, cv.LINE_AA)
    }
        let textOn = true;


    Video.stream(videoInput, constraints, canvasOutput, canvasFrameContext,
      (videoInput: HTMLVideoElement, canvasFrameContext: CanvasRenderingContext2D, canvasOutput: HTMLCanvasElement) => {
        // VIDEO
        const WIDTH = videoInput!.width, HEIGHT = videoInput!.height, FPS = 30;
        console.log(WIDTH)
        console.log(HEIGHT)

        let input = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC4);
        let output = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC3);

        function title() {
          canvasOutputContext.font = "30px Monospace";
          canvasOutputContext.fillStyle = "rgba(255,255,255,255)";
          canvasOutputContext.textAlign = "center";
          canvasOutputContext.fillText("SEARCH MODE", WIDTH / 2, HEIGHT / 2);
        }

        function title2() {
          canvasOutputContext.font = "30px Monospace";
          canvasOutputContext.fillStyle = "rgba(0,0,0,255)";
          canvasOutputContext.textAlign = "center";
          canvasOutputContext.fillText("SEARCH MODE", WIDTH / 2, HEIGHT / 2);
        }

        function titleOnSwitch(b) {
          textOn = textOn!;
          console.log("title", b)
        }
        function text() {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < 100; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
          }

        let canvasOutputContext = canvasOutput.getContext('2d')!;

        let processVideo = () => {
          let begin = Date.now();
          let delay = 1000 / FPS - (Date.now() - begin);
          canvasFrameContext!.drawImage(videoInput, 0, 0, WIDTH, HEIGHT);
          input.data.set(canvasFrameContext!.getImageData(0, 0, WIDTH, HEIGHT).data);
          //cv.cvtColor(input, output, cv.COLOR_RGB2GRAY)

          //cv.cvtColor(input, hsv, cv.COLOR_RGB2HSV);
          cv.threshold(input, output, 100, 255, cv.THRESH_BINARY);

          //let channels = new cv.MatVector();
          // hsvCopy = hsv.clone()
          //cv.split(hsv, channels);
          // let hue = channels.get(0);
          // let saturation = channels.get(1);m
          // let val = channels.get(2);
          //for (let i = 0; i < hsv.data.length; i++)
          //  hsv.data[i] = (0);

          //cv.merge(channels, hsvCopy);
          //cv.cvtColor(hsvCopy, hsvCopy, cv.COLOR_HSV2BGR);

          cv.imshow(canvasOutput, output);




          //requestAnimationFrame(animate);


          function animate() {
            // Background red
            canvasOutputContext.globalAlpha = 0.75;
            canvasOutputContext.fillStyle = `rgba(255, 0, 0, 255)`;
            canvasOutputContext.fillRect(0, 0, WIDTH, HEIGHT);


            canvasOutputContext.font = "12px Monospace";
            canvasOutputContext.fillStyle = "rgba(255,255,255,255)";
            canvasOutputContext.textAlign = "left";
            canvasOutputContext.fillText("SCAN LEVEL", 50, 30);
            canvasOutputContext.fillText("**********", 50, 40);

            for (let i = 0; i < 10; i++) {
              canvasOutputContext.fillText(
                `${Math.floor(Math.random() * 100_000_000)}  ${Math.floor(Math.random() * 1000)}  ${Math.floor(Math.random() * 100)}`,
                50, 50 + i * 16);
            }

            canvasOutputContext.fillText(
              `CODE: ${text()}`,
              50, 300);

            canvasOutputContext.font = "8px Monospace";
            canvasOutputContext.fillStyle = "rgba(0,0,0,255)";
            for (let i = 0; i <= HEIGHT; i += 10) {
              canvasOutputContext.fillText(
                `${Math.floor(Math.random() * 2)}`,
                630, i);
              canvasOutputContext.fillText(
                `${Math.floor(Math.random() * 2)}`,
                620, i);
            }
            title2()

          }

          animate();



          setTimeout(processVideo, delay);
        }


        // schedule first one.
        setTimeout(processVideo, 0);
        console.log('end')

        /*
        let cap = new cv.VideoCapture(video!);
        // take first frame of the video
        let frame = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC4);
        cap.read(frame);

        //cv.cvtColor(frame, output, cv.COLOR_RGB2HSV, 0);
        let hsv = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC3);
        let rgb = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC3);

        function processVideo() {
          let begin = Date.now();
          cap.read(frame);
          cv.cvtColor(frame, hsv, cv.COLOR_RGB2HSV);

          // SET COLOR RED
          //let i: Mat.Mat = frame.clone()
          //i.setTo(new cv.Scalar(255, 0, 0 ,125))

          // TEXT
          //textTerminator(hsv);

          // COLOR
          //let hsvCopy = hsv.clone();
          //let value = 0;
          //value += 100;
          //let channels = new cv.MatVector();
          //cv.split(hsvCopy, channels);
          //let hue = channels.get(0);
          //let saturation = channels.get(1);
          //let val = channels.get(2);

          //for (var i = 0; i < saturation.data.length; i++)
          //  saturation.data[i] = (0);
          //for(var i = 0; i < hue.data.length; i++)
          //  hue.data[i] = (0);
          //for(var i = 0; i < val.data.length; i++)
          //  val.data[i] = (255);

          //cv.merge(channels, hsvCopy);
          //cv.cvtColor(hsvCopy, rgb, cv.COLOR_HSV2BGR);
          cv.imshow(canvas!, hsv);


          //cv.imshow(canvas!, hsv);

          //let [x, y, w, h] = [20, 20, 50, 50];
          //cv.rectangle(frame, new cv.Point(x, y), new cv.Point(x + w, y + h), [255, 255, 255, 255], 2);

          //cv.inRange(frame, new cv.Mat(190, 0, 0), new cv.Mat(256, 256, 256), src);


          //const roiRect: Rect = new cv.Rect(0, 0, 300, 300);
          //const roi = hsv.roi(roiRect);
          //cv.imshow(canvas!, frame);

          // schedule the next one.
          let delay = 1000 / FPS - (Date.now() - begin);
          setTimeout(processVideo, delay);
        }

        // schedule the first one.
        setTimeout(processVideo, 0);

        //cv.imshow('canvas-rv', frame);
         */
      });


  }

  return (
    <SectionHero classes={`is-fullheight ${styles['video-stream']}`}>
      <HeadHero>
        <NavLevel>
          <div className={'level-item'}>
            <Button classes={'is-danger is-rounded'} text={'Play'} onClick={onClick}/>
          </div>
        </NavLevel>
      </HeadHero>
      <BodyHero>
        <figure className="image is-16by9">
          <VideoStreamEffectOpenCV
            classVideo={`is-hidden ${styles['video-stream-effect-opencv']}`}
            classCanvas={'has-ratio'}
            ref={v => (videoStreamEffectOpenCV = v)}/>
        </figure>
      </BodyHero>
    </SectionHero>
  );
}

export default VideoStreamOpenCVPage;