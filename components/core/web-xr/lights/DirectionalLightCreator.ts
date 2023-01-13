import * as THREE from 'three';
import { AbsLightCreator } from 'components/core/web-xr/lights/LightCreator.abstract';
import { Coordinate } from 'components/core/web-xr/types/types';

export class DirectionalLightCreator extends AbsLightCreator {
  public factoryMethod(coordinate: Coordinate): THREE.Light {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);

    light.position.set(...coordinate);

    return light;
  }
}