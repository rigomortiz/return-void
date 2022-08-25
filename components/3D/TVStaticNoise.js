import {useEffect, useRef} from "react";
import * as THREE from "three";

const TVStaticNoise = () => {
    const TVExperience = useRef(null);

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        const points = [];

            for(let y = -100; y < 100; y++) {
                for(let x = -100; x < 100; x++) {
                    points.push( new THREE.Vector3( x, y, 0 ) );
                    points.push( new THREE.Vector3( (-1)*x, y, 0 ) );
                }
            }

        const material = new THREE.LineBasicMaterial( {
            color: Math.random() * 0xffffff,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
        });

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        const scene = new THREE.Scene();
        scene.add( line );



        renderer.render( scene, camera );

        const animate = () => {
            requestAnimationFrame( animate );
            material.color.setHex( Math.random() * 0xffffff );
            renderer.render( scene, camera );
        };
        animate();

        // use ref as a mount point of the Three.js scene instead of the document.body
        TVExperience.current.appendChild( renderer.domElement );
    }, []);

    return (

      <div ref={TVExperience} >
          <h3 className="title">
              Welcome to
          </h3>
          <h1 className="return-void">return void();</h1>
      </div>
    )
}

export default TVStaticNoise;