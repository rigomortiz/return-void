export class Video {

  public static videoInit(video: HTMLVideoElement, mediaStream: MediaStream) {
    video!.srcObject = mediaStream;
    video!.onloadedmetadata = (e: Event) => {
      video!.play().then(() => {
        console.log('Play')
      });
      video!.muted = true;
      console.log(e)
    };
  }

  public static stream(video: HTMLVideoElement | null | undefined,
                       constraints: MediaStreamConstraints,
                       canvas?: HTMLCanvasElement | null | undefined,
                       canvasFrame?: CanvasRenderingContext2D | null | undefined,
                       callback?: (video: HTMLVideoElement, canvasFrame: CanvasRenderingContext2D,
                                   canvas: HTMLCanvasElement) => void) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream: MediaStream) => {
        Video.videoInit(video!, mediaStream)
        if (callback) {
          callback(video!, canvasFrame!, canvas!);
        }
      })
      .catch((err) => {
        console.error(`Error with decoding audio data: ${err}`)
      });
  }
}