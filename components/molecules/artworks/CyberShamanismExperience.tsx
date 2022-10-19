import { useEffect, useRef } from 'react';
import { CyberShamanismScene } from 'virtual-reality/scenes/CyberShamanismScene';

const CyberShamanismExperience = () => {
  const cyberShamanismVRExperienceHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cyberShamanismVRExperienceHost.current !== null) {
      const cyberShamanismScene = new CyberShamanismScene();

      cyberShamanismScene.setDivElementHost(cyberShamanismVRExperienceHost.current);
      cyberShamanismScene.renderScene();
    }
  }, []);

  return (
    <div ref={cyberShamanismVRExperienceHost} />
  )
}

export default CyberShamanismExperience;