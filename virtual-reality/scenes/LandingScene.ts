import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type Coordinate = [ number, number, number ]

export class LandingScene {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new THREE.WebGLRenderer()
  private divHost?: HTMLDivElement;

  setDivElementHost(divElement: HTMLDivElement) {
    this.divHost = divElement;
  }

  renderScene() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(2.5, -1, -1);
    new OrbitControls(this.camera, this.renderer.domElement);

    const light = this.createWhiteLight([ -1, 2, 4 ]);
    const cubes = [
      this.createWireframeCube(0x0044aa, true, [ -5, 2, -3 ]),
      this.createWireframeCube(0x8844aa, true, [ -2.5, 1, -1 ]),
      this.createWireframeCube(0x00ff00, false, [ 0, 0, 0 ]),
      this.createWireframeCube(0xaa8844, true, [ 2.5, -1, -1 ])
    ]

    cubes.forEach(cube => this.scene.add(cube));
    this.scene.add(light);
    this.renderCubesAnimation(cubes);
    this.mountSceneToHost();
  }

  private createWireframeCube(color: THREE.ColorRepresentation, isPhong: boolean, coordinate: Coordinate) {
    const MaterialTypeClass = isPhong ? THREE.MeshPhongMaterial : THREE.MeshBasicMaterial
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new MaterialTypeClass({ color, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(...coordinate);

    return cube;
  }

  private createWhiteLight(coordinate: Coordinate) {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);

    light.position.set(...coordinate);

    return light;
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
