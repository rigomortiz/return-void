import HeadHero, {IHeadHero} from "./Head";
import BodyHero, {IBodyHero} from "./Body";
import FootHero from "./Foot";
import React, {useEffect, useRef} from "react";
import Index from "../../../molecules/ReturnVoidExperience/Sky";
import Audio from "../../../molecules/ReturnVoidExperience/Audio";
import {ReturnVoidScene} from "../../../../virtual-reality/scenes/ReturnVoidScene";


export interface ISectionHero {
  classes: string;
  headHero: IHeadHero;
  bodyHero: IBodyHero;
}


const SectionHero = ({classes, headHero, bodyHero}: ISectionHero) => {
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
    <section ref={returnVoidVRExperienceHost} className={'hero ' + classes}>
      <HeadHero title={headHero.title} classes={headHero.classes}></HeadHero>
      <BodyHero title={bodyHero.title} button={bodyHero.button}/>
      <FootHero />
      <Index />
    </section>
  )
}

export default SectionHero;