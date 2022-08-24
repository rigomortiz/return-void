import Head from 'next/head'
import Header from 'components/molecules/Header'
import Footer from 'components/molecules/Footer'
import { useEffect, useRef } from 'react';
import { LandingScene } from 'virtual-reality/scenes/LandingScene'

const landingScene = new LandingScene();

const Landing = () => {
  const landingVRExperienceHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if host div reference is initialize Ok, VR landing scene is mounted
    if (landingVRExperienceHost.current !== null) {
      landingScene.setDivElementHost(landingVRExperienceHost.current);
      landingScene.renderScene();
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>return void();</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrap">
        <Header title="Welcome to" />
        <div
          ref={landingVRExperienceHost}
        />
        <p className="description">
          <code>return void();</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default Landing;
