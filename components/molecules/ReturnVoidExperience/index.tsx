import SectionHero, {ISectionHero} from "../../atoms/Section/Hero";
import Audio from "./Effects/AudioVisualizer";
import React, {useEffect, useRef} from "react";
import {ReturnVoidScene} from "../../../virtual-reality/scenes/ReturnVoidScene";

export interface IReturnVoidEx {
  section: ISectionHero;
}

const ReturnVoidExperience = ({section}: IReturnVoidEx) => {
  function onClick() {
    Audio.getAudio(Audio.URL);
    document.querySelector(".button")!.setAttribute('disabled', 'disabled')
  }

  const returnVoidVRExperienceHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (keyName === ' ') {
        Audio.getAudio(Audio.URL);
        return;
      }
    }, false);

    if (returnVoidVRExperienceHost.current !== null) {
      const returnVoidScene = new ReturnVoidScene();
      returnVoidScene.setDivElementHost(returnVoidVRExperienceHost.current);
      returnVoidScene.render();
    }
  }, []);

  return (
    <>
      <SectionHero
        scene={returnVoidVRExperienceHost}
        classes={section.classes}
        headHero={section.headHero}
        bodyHero={section.bodyHero}
        onClick={onClick}
      />
    </>
  )
}

export default ReturnVoidExperience;