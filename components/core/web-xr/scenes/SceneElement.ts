export abstract class SceneElement {
    public divElementHost?: HTMLDivElement;

    constructor() {
        this.init();
    }

    setDivElementHost(div: HTMLDivElement) {
        this.divElementHost = div;
    }

    abstract render(): any;

    abstract init(): void;

}