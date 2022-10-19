import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DirectionalLightCreator } from 'virtual-reality/lights/DirectionalLightCreator';
import { WireframeCubeCreator } from 'virtual-reality/meshes/cubes/WireframeCubeCreator';
import { MaterialEnum } from 'virtual-reality/types/enums';

export class CyberShamanismScene {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  private renderer = new THREE.WebGLRenderer()
  private divHost?: HTMLDivElement;
  private wireFrameCubesCreator = new WireframeCubeCreator();
  private directionalLightCreator = new DirectionalLightCreator();

  setDivElementHost(divElement: HTMLDivElement) {
    this.divHost = divElement;
  }

  renderScene() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(0, -140, 375);
    new OrbitControls(this.camera, this.renderer.domElement);

    const light = this.directionalLightCreator.factoryMethod([ -1, 2, 4 ]);
    const cubes = [
      this.wireFrameCubesCreator.factoryMethod(0x0044aa, MaterialEnum.Basic, [ -5, 2, -3 ], 30),
      this.wireFrameCubesCreator.factoryMethod(0x8844aa, MaterialEnum.Basic, [ -2.5, 1, -1 ], 30),
      this.wireFrameCubesCreator.factoryMethod(0x00ff00, MaterialEnum.Basic, [ 0, 0, 0 ], 30),
      this.wireFrameCubesCreator.factoryMethod(0xaa8844, MaterialEnum.Phong, [ 2.5, -1, -1 ], 30)
    ]

    cubes.forEach(cube => this.scene.add(cube));
    this.scene.add(light);
    this.renderCubesAnimation(cubes);
    this.mountSceneToHost();

    // add floor to metaver scene
    const geometry = new THREE.PlaneGeometry( 1000, 1000, 75, 75 );
	  const material = new THREE.MeshBasicMaterial( { color: 0x03a062, wireframe: true } );
	  const floor = new THREE.Mesh( geometry, material );
    floor.position.set(0, 0, 0);
	  floor.material.side = THREE.DoubleSide;
	  floor.rotation.x = 90;
	  this.scene.add( floor );
  }

  private renderCubesAnimation(cubes: THREE.Mesh[]) {
    const render = (time: number) => {
      console.log(this.camera.position)
      time *= 0.001;  // convert time to seconds

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  private mountSceneToHost() {
    if (this.divHost) {
      this.divHost.appendChild(this.renderer.domElement);
    } else {
      console.warn('[waning] div host for VR experience was not provided before rendering');
    }
  }
}
