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

  public static stream(video: HTMLVideoElement | null | undefined, constraints: MediaStreamConstraints,
                       callback?: (video: HTMLVideoElement) => void) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream: MediaStream) => {
        Video.videoInit(video!, mediaStream)
        if (callback) {
          callback(video!);
        }
      })
      .catch((err) => {
        console.error(`Error with decoding audio data: ${err}`)
      });
  }
}