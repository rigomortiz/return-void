import { Material, BoxGeometry, Mesh } from 'three';

export abstract class AbsCubeCreator {
  public abstract factoryMethod(...props: any): Mesh<BoxGeometry, Material>;
}