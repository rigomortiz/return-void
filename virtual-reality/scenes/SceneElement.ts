export abstract class SceneElement {
    public divElementHost?: HTMLDivElement;


    setDivElementHost(div: HTMLDivElement) {
        this.divElementHost = div;
    }

    abstract render(): any;
}