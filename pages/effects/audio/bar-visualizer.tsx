import React from "react";
import {Audio} from "../../../components/core/Audio";
import Button from "../../../components/atoms/Button";
import SectionHero from "../../../components/atoms/Section/Hero";
import BodyHero from "../../../components/atoms/Section/Hero/Body";
import BarGraphVisualizer from "../../../components/effects/audio/Visualizer/BarGraph";
import styles from './index.module.scss';
import {CyberpunkSynthWave} from "../../../components/core/types/enums/Colors";

const VisualizerWavePage = () => {
  let barGraphVisualizer: BarGraphVisualizer | null;

  let onClick = function() {
    const url = '/audio/Malfunction.mp3'
    Audio.play(url, (audio: Audio) => {
      const style = {
        backgroundColor: CyberpunkSynthWave.Black,
        barColor: CyberpunkSynthWave.PinkBite
      }
      barGraphVisualizer!.run(audio, style)
      console.log(audio);
      document.querySelector(".button")!.setAttribute('disabled', 'disabled')
    })
  }

  return (
    <SectionHero classes={`is-fullheight ${styles['bar-visualizer']}`}>
      <BodyHero>
        <Button classes={'is-danger is-rounded'} text={'Play'} onClick={onClick} />
        <BarGraphVisualizer ref={ o => (barGraphVisualizer = o)} classes={''}/>
      </BodyHero>
    </SectionHero>
  );
}

export default VisualizerWavePage;