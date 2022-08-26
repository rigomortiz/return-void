import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DirectionalLightCreator } from 'virtual-reality/lights/DirectionalLightCreator';
import { WireframeCubeCreator } from 'virtual-reality/meshes/cubes/WireframeCubeCreator';
import { MaterialEnum } from 'virtual-reality/types/enums';

export class LandingScene {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new THREE.WebGLRenderer()
  private divHost?: HTMLDivElement;
  private wireFrameCubesCreator = new WireframeCubeCreator();
  private directionalLightCreator = new DirectionalLightCreator();

  setDivElementHost(divElement: HTMLDivElement) {
    this.divHost = divElement;
  }

  renderScene() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(2.5, -1, -1);
    new OrbitControls(this.camera, this.renderer.domElement);

    const light = this.directionalLightCreator.factoryMethod([ -1, 2, 4 ]);
    const cubes = [
      this.wireFrameCubesCreator.factoryMethod(0x0044aa, MaterialEnum.Phong, [ -5, 2, -3 ]),
      this.wireFrameCubesCreator.factoryMethod(0x8844aa, MaterialEnum.Phong, [ -2.5, 1, -1 ]),
      this.wireFrameCubesCreator.factoryMethod(0x00ff00, MaterialEnum.Basic, [ 0, 0, 0 ]),
      this.wireFrameCubesCreator.factoryMethod(0xaa8844, MaterialEnum.Phong, [ 2.5, -1, -1 ])
    ]

    cubes.forEach(cube => this.scene.add(cube));
    this.scene.add(light);
    this.renderCubesAnimation(cubes);
    this.mountSceneToHost();
  }

  private renderCubesAnimation(cubes: THREE.Mesh[]) {
    const render = (time: number) => {
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
