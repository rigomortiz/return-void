import React from "react";
import BodyHero from "../../../components/atoms/Section/Hero/Body";
import Button from "../../../components/atoms/Button";
import SectionHero from "../../../components/atoms/Section/Hero";
import VideoStream from "../../../components/effects/video/Stream";
import {Video} from "../../../components/core/Video";
import styles from "./index.module.scss";
import HeadHero from "../../../components/atoms/Section/Hero/Head";
import NavLevel from "../../../components/atoms/NavLevel";

const VideoStreamPage = () => {
  let videStream: VideoStream | null;

  let onClick = function () {
    let video = videStream?.video;
    if (video == undefined)
      return;

    const constraints: MediaStreamConstraints = {
      audio: true,
      //peerIdentity: '1',
      //preferCurrentTab: true,
      video: { width: 1280, height: 720 }
    };

    Video.stream(video, constraints);
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
          <VideoStream
            ref={v => (videStream = v)}
            classes={'has-ratio ' + styles['video-stream']}
          />
        </figure>
      </BodyHero>
    </SectionHero>
  );
}

export default VideoStreamPage;