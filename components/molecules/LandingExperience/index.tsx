import { useEffect, useRef } from 'react';
import { LandingScene } from 'virtual-reality/scenes/LandingScene';

const Landing = () => {
  const landingVRExperienceHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (landingVRExperienceHost.current !== null) {
      const landingScene = new LandingScene();

      landingScene.setDivElementHost(landingVRExperienceHost.current);
      landingScene.renderScene();
    }
  }, []);

  return (
    <div ref={landingVRExperienceHost} />
  )
}

export default Landing;