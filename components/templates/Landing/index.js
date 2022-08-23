import Head from 'next/head'
import Header from '@components/molecules/Header'
import Footer from '@components/molecules/Footer'
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const Landing = () => {
  const landingVRExperience = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, 300 );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    const cube = new THREE.Mesh( geometry, material );

    scene.add( cube );
    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };

    animate();

    // use ref as a mount point of the Three.js scene instead of the document.body
    landingVRExperience.current.appendChild( renderer.domElement );
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
          ref={landingVRExperience}
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
