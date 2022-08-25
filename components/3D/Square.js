import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const Figure = () => {
    const figure = useRef(null);

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
        figure.current.appendChild( renderer.domElement );
    }, []);
    return (
        <div ref={figure}></div>
    )
}

export default Figure;