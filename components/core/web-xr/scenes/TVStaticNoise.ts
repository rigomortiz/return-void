import {
  BufferGeometry,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  PointsMaterial, Scene,
  WebGLRenderer
} from "three";
import {SceneElement} from "./SceneElement";

export class TVStaticNoise extends SceneElement {
    init() {

    }

    render() {
        const scene = new Scene();
        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        /** Point **/
        const dots: Points<BufferGeometry, PointsMaterial>[] = [];
        for (let i = -1 * innerWidth / 10; i < innerWidth / 10; i += 1) {
            for (let j = -1 * innerHeight / 10; j < innerHeight / 10; j += 1) {
                let dotGeometry = new BufferGeometry();
                dotGeometry.setAttribute('position', new Float32BufferAttribute([i, j, 0], 3));
                let dotMaterial = new PointsMaterial({size: 10, color: Math.random() * 0xffffff});
                let dot = new Points(dotGeometry, dotMaterial);
                dots.push(dot);
                scene.add(dot);
            }
        }

        /** Line **/
        /*
        const points = [];
        for(let y = -100; y < 100; y++) {
          for(let x = -100; x < 100; x++) {
            points.push(new Vector3(x, y, 0));
            points.push(new Vector3((-1)*x, y, 0));
          }
        }
        const material = new LineBasicMaterial( {
          color: Math.random() * 0xffffff,
          linewidth: 1,
          linecap: 'round', //ignored by WebGLRenderer
          linejoin:  'round' //ignored by WebGLRenderer
        });
        const geometry = new BufferGeometry().setFromPoints(points);
        const line = new Line(geometry, material);
        scene.add(line);
        */


        renderer.render(scene, camera);
        const animate = () => {
            requestAnimationFrame(animate);
            //material.color.setHex( Math.random() * 0xffffff );
            dots.forEach(dot => {
                dot.material.color.setHex(Math.random() * 0xffffff)
            });
            renderer.render(scene, camera);
        };
        animate();

        // mount landing scene in de divHostElement provided
        if (this.divElementHost) {
            this.divElementHost.appendChild(renderer.domElement);
        } else {
            console.warn('[warning] ThreeJSDemo VR scene could not been rendered because divElementHost is not set yet');
        }
    }
}