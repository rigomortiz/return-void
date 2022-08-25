import Head from 'next/head'
import {useEffect, useRef} from 'react';
import {LandingScene} from 'virtual-reality/scenes/LandingScene'
import {TVStaticNoise} from 'virtual-reality/scenes/TVStaticNoise';

const landingScene = new LandingScene();
const tvStaticNoise = new TVStaticNoise();

const Landing = () => {
  const landingVRExperienceHost = useRef<HTMLDivElement>(null);
  const tvStaticNoiseVRExperienceHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if host div reference is initialized OK, VR landing a scene is mounted
    if (tvStaticNoiseVRExperienceHost.current !== null) {
      tvStaticNoise.setDivElementHost(tvStaticNoiseVRExperienceHost.current);
      tvStaticNoise.renderScene();
    }
    if (landingVRExperienceHost.current !== null) {
      landingScene.setDivElementHost(landingVRExperienceHost.current);
      landingScene.renderScene();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>return void();</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
        <div ref={tvStaticNoiseVRExperienceHost}>
          <div className="title">return void();</div>
          <div className="body"><b>NO SIGNAL</b></div>
          <div className="footer">
            bad request & sentinel
          </div>
        </div>
    </div>
  )
}

export default Landing;
