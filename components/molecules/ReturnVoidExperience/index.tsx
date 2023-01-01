import SectionHero from "../../atoms/Section/Hero";
import React, {useEffect, useRef} from "react";
import {ReturnVoidScene} from "../../core/web-xr/scenes/ReturnVoidScene";
import NavLevel from "../../atoms/NavLevel";
import Paragraph from "../../atoms/Paragraph";
import HeadHero from "../../atoms/Section/Hero/Head";
import Button from "../../atoms/Button";
import BodyHero from "../../atoms/Section/Hero/Body";
import FootHero from "../../atoms/Section/Hero/Foot";
import SkyEffect from "../../effects/graphics/Sky";
import {IReturnVoidEx} from "./types";
import styles from "./index.module.scss";
import BarGraphVisualizer from "../../effects/audio/Visualizer/BarGraph";
import {Audio} from "../../core/Audio";
import {CyberpunkSynthWave} from "../../core/types/enums/Colors";
import OscilloscopeVisualizer from "../../effects/audio/Visualizer/Oscilloscope";


const ReturnVoidExperience = ({section}: IReturnVoidEx) => {
  // let barGraphVisualizer: BarGraphVisualizer | null;
  let oscilloscopeVisualizer: OscilloscopeVisualizer | null;

  const returnVoidVRExperienceHost = useRef<HTMLDivElement>(null);
  const style = {
    backgroundColor: CyberpunkSynthWave.Black,
    // lineColor: CyberpunkSynthWave.PinkBite
    lineColor: '#FFDE59'
  }

  function onClick() {
    const url = '/audio/Malfunction.mp3'
    Audio.play(url, (audio: Audio) => {
      oscilloscopeVisualizer!.run(audio, style)
      console.log(audio);
      document.querySelector(".button")!.setAttribute('disabled', 'disabled')
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', () => {
      const url = '/audio/Malfunction.mp3'
      Audio.play(url, (audio: Audio) => {
        oscilloscopeVisualizer!.run(audio, style)
        console.log(audio);
        document.querySelector(".button")!.setAttribute('disabled', 'disabled')
      })
    }, false);

    if (returnVoidVRExperienceHost.current !== null) {
      const returnVoidScene = new ReturnVoidScene();
      returnVoidScene.setDivElementHost(returnVoidVRExperienceHost.current);
      returnVoidScene.render();
    }
  }, []);

  return (
      <SectionHero classes={`is-fullheight is-black`} >
        <HeadHero>
          <NavLevel>
            <Paragraph text={section.headHero.title}
                       classes={`level-item has-text-centered ${styles['subtitle']} is-lowercase has-text-weight-light is-size-3 is-size-5-mobile has-text-white`} />
          </NavLevel>
        </HeadHero>
        <BodyHero>
          {/*<div ref={returnVoidVRExperienceHost}></div>*/}
          <Paragraph text={section.bodyHero.title}
                     classes={`${styles['title']} is-uppercase has-text-weight-bold is-size-1-mobile`} />
          {/*<BarGraphVisualizer ref={ o => (barGraphVisualizer = o)} classes={''}/>*/}
          <OscilloscopeVisualizer ref={ o => (oscilloscopeVisualizer = o)} classes={styles['visualizer']}/>
        </BodyHero>
        <FootHero>
          {/*<p className={"press-key is-family-monospace"}><b>PRESS SPACE BUTTON</b></p>*/}
          <Button classes={'is-danger is-rounded'} text={section.bodyHero.button.text} onClick={onClick}/>
        </FootHero>
        <SkyEffect/>
      </SectionHero>
  )
}

export default ReturnVoidExperience;