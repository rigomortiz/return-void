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

const VideoStreamOpenCVPage = () => {
  let videoStreamEffectOpenCV: VideoStreamEffectOpenCV | null;

  let onClick = function () {
    let video = videoStreamEffectOpenCV?.video;
    let canvas = videoStreamEffectOpenCV?.canvas;

    if (video == undefined || canvas == undefined)
      return;

    const constraints: MediaStreamConstraints = {
      audio: true,
      //peerIdentity: '1',
      //preferCurrentTab: true,
      video: {width: 1280, height: 720}
    };

    Video.stream(video, constraints, (video: HTMLVideoElement) => {
      // VIDEO
      const WIDTH = video!.width, HEIGHT = video!.height, FPS = 30;
      let cap = new cv.VideoCapture(video!);
      // take first frame of the video
      let frame = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC4);
      cap.read(frame);

      //cv.cvtColor(frame, output, cv.COLOR_RGB2HSV, 0);
      let hsv = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC3);

      function processVideo() {
        let begin = Date.now();
        cap.read(frame);
        cv.cvtColor(frame, hsv, cv.COLOR_RGB2HSV);


        //cv.inRange(frame, new cv.Mat(190, 0, 0), new cv.Mat(256, 256, 256), src);

        // start processing.
        let [x, y, w, h] = [20, 20, 50, 50];
        cv.rectangle(hsv, new cv.Point(x, y), new cv.Point(x + w, y + h), [255, 0, 0, 255], 2);

        let font1 = cv.FONT_HERSHEY_SIMPLEX
        let org1 = new cv.Point(50, 50)
        let fontScale1 = 1
        let color = new cv.Scalar(255, 0, 0, 255)
        let thickness1 = 2
        cv.putText(hsv, 'return void();', org1, font1, fontScale1, color, thickness1, cv.LINE_AA)

        //const roiRect: Rect = new cv.Rect(0, 0, 300, 300);
        //const roi = hsv.roi(roiRect);
        cv.imshow(canvas!, hsv);

        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      }

      // schedule the first one.
      setTimeout(processVideo, 0);

      //cv.imshow('canvas-rv', frame);
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
            classVideo={styles['video-stream-effect-opencv']}
            classCanvas={'has-ratio'}
            ref={v => (videoStreamEffectOpenCV = v)}/>
        </figure>
      </BodyHero>
    </SectionHero>
  );
}

export default VideoStreamOpenCVPage;