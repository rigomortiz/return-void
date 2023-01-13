import {SceneElement} from "./SceneElement";

import {
    BoxGeometry,
    Color,
    Clock, DirectionalLight,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene, TextureLoader,
    WebGLRenderer,
    //Audio, AudioLoader, AudioListener
} from "three";


export class ReturnVoidScene extends SceneElement {
    private clock = new Clock();
    private delta = 0;
    private geometry: BoxGeometry | undefined;
    private scene: Scene | undefined;
    private camera: PerspectiveCamera | undefined;
    private renderer: WebGLRenderer | undefined;
    private material: MeshLambertMaterial | undefined;
    private mesh: Mesh<BoxGeometry, any> | undefined;
    private smokeParticles: [Mesh] | undefined;
    private cubeSineDriver = 0;

    init() {
        window.onload = function() {
          //let context = new AudioContext();
        }
        this.scene = new Scene();
        this.scene.background = new Color('hsl(0, 0%, 4%)')
        // set the view size in pixels (custom or according to window size)
        let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        // camera attributes
        let VIEW_ANGLE = 75, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 1_000;
        // set up camera
        this.camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        // add the camera to the scene
        this.scene.add(this.camera);
        // the camera defaults to position (0,0,0)
        // 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
        this.camera.position.set(0,0,1_000);
        this.camera.lookAt(this.scene.position);

        // create and start the renderer; choose antialias setting.
        this.renderer = new WebGLRenderer( {antialias:false} );

        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        this.geometry = new BoxGeometry(200, 200, 200);
        this.material = new MeshLambertMaterial({ color: 'hsl(0, 0%, 40%)', wireframe: false });
        this.mesh = new Mesh(this.geometry, this.material);
        // @ts-ignore
        this.smokeParticles = []

        /*
        // create an AudioListener and add it to the camera
        let listener = new AudioListener();
        this.camera.add( listener );

        // create a global audio source
        const sound = new Audio( listener );
        const audioLoader = new AudioLoader();
        audioLoader.load( '/audio/spirale_jam_kog_reverd_and_EQ.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.5 );
            sound.play();
        });
        */
    }

    render(): any {
        let light = new DirectionalLight('hsl(0, 0%, 90%)',0.5);
        light.position.set(-1,0,1);
        this.scene!.add(light);

        let smokeTexture = new TextureLoader()
            .load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
            //.load('/images/smoke.png');
        let smokeMaterial = new MeshLambertMaterial({
            color: 'hsl(0, 0%, 77%)',
            map: smokeTexture,
            opacity: 2,
            transparent: true
        });
        let smokeGeo = new PlaneGeometry(300,300);

        for (let p = 0; p < 150; p++) {
            let particle = new Mesh(smokeGeo, smokeMaterial);
            particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
            particle.rotation.z = Math.random() * 360;
            this.scene!.add(particle);
            this.smokeParticles!.push(particle);
        }

        const animate = () => {
            this.delta = this.clock.getDelta();
            requestAnimationFrame( animate );
            this.evolveSmoke();
            this.renderSmoke();
            //this.pointsRender();
        };
        animate();

        // mount landing scene in de divHostElement provided
        if (this.divElementHost) {
            this.divElementHost.appendChild(this.renderer!.domElement);
        } else {
            console.warn('[warning] ThreeJSDemo VR scene could not been rendered because divElementHost is not set yet');
        }

    }

    evolveSmoke() {
        let sp = this.smokeParticles!.length;
        while(sp--) {
            this.smokeParticles![sp].rotation.z += (this.delta * 0.2);
        }
    }
    renderSmoke() {
        this.mesh!.rotation.x += 0.005;
        this.mesh!.rotation.y += 0.01;
        this.cubeSineDriver += .01;
        this.mesh!.position.z = 100 + (Math.sin(this.cubeSineDriver) * 500);
        this.renderer!.render( this.scene!, this.camera! );
    }

}