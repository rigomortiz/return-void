import { Light } from 'three';

export abstract class AbsLightCreator {
  public abstract factoryMethod(...props: any): Light;
}