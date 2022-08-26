import * as THREE from 'three';
import { AbsCubeCreator } from 'virtual-reality/meshes/cubes/CubeCreator.abstract';
import { MaterialEnum } from 'virtual-reality/types/enums';
import { Coordinate } from 'virtual-reality/types/types';

export class WireframeCubeCreator extends AbsCubeCreator {
  public factoryMethod(color: THREE.ColorRepresentation, materialType: MaterialEnum, coordinate: Coordinate): THREE.Mesh<THREE.BoxGeometry, THREE.Material> {
    const availableMaterials = {
      [MaterialEnum.Basic]: THREE.MeshBasicMaterial,
      [MaterialEnum.Phong]: THREE.MeshPhongMaterial
     }
    const MaterialTypeClass = availableMaterials[materialType];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new MaterialTypeClass({ color, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(...coordinate);

    return cube;
  }
}