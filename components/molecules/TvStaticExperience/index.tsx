import { useEffect, useRef } from 'react';
import { TVStaticNoise } from 'virtual-reality/scenes/TVStaticNoise';
import styles from './index.module.css';

const Landing = () => {
  const tvStaticNoiseVRExperienceHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tvStaticNoiseVRExperienceHost.current !== null) {
      const tvStaticNoise = new TVStaticNoise();

      tvStaticNoise.setDivElementHost(tvStaticNoiseVRExperienceHost.current);
      tvStaticNoise.renderScene();
    }
  }, []);

  return (
    <div ref={tvStaticNoiseVRExperienceHost}>
      <div className={styles.body}><b>NO SIGNAL</b></div>
    </div>
  )
}

export default Landing;
