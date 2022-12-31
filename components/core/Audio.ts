export class Audio {
  private _arrayBuffer: ArrayBuffer | undefined;
  private _audioContext: AudioContext | undefined;
  private _audioBufferSourceNode: AudioBufferSourceNode | undefined;
  private _analyserNode: AnalyserNode | undefined;

  /*device() {
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia =
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
  }*/

  get arrayBuffer(): ArrayBuffer {
    return this._arrayBuffer as ArrayBuffer;
  }

  set arrayBuffer(value: ArrayBuffer) {
    this._arrayBuffer = value;
  }

  get audioContext(): AudioContext | undefined {
    return this._audioContext;
  }

  set audioContext(value: AudioContext | undefined) {
    this._audioContext = value;
  }


  get audioBufferSourceNode(): AudioBufferSourceNode | undefined {
    return this._audioBufferSourceNode;
  }

  set audioBufferSourceNode(value: AudioBufferSourceNode | undefined) {
    this._audioBufferSourceNode = value;
  }

  get analyserNode(): AnalyserNode | undefined {
    return this._analyserNode;
  }

  set analyserNode(value: AnalyserNode | undefined) {
    this._analyserNode = value;
  }

  public static play(url: string, callback?: (a: Audio) => void) {
    Audio.getAudio(url)
      .then((arrayBuffer: ArrayBuffer) => {
        return Audio.decode(arrayBuffer);
      })
      .then((audio: Audio) => {
        if (callback) {
          callback(audio);
        }
      });
  }

  constructor(arrayBuffer: ArrayBuffer, audioContext: AudioContext, audioBufferSourceNode: AudioBufferSourceNode,
              analyserNode: AnalyserNode) {
    this.arrayBuffer = arrayBuffer;
    this.audioContext = audioContext;
    this.audioBufferSourceNode = audioBufferSourceNode;
    this.analyserNode = analyserNode;
  }

  public static async getAudio(url: string) {
    return await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.arrayBuffer();
      });
  };

  public static decode(arrayBuffer: ArrayBuffer): Audio {
    let audioContext = new (window.AudioContext)();
    let bufferSource = audioContext.createBufferSource();
    let analyser = audioContext.createAnalyser();

    audioContext.decodeAudioData(
      arrayBuffer,
      (audioBuffer: AudioBuffer) => {
        bufferSource.buffer = audioBuffer;
        bufferSource.connect(analyser);
        bufferSource.connect(audioContext.destination);
        bufferSource.loop = true;
        bufferSource.start()
      },
      (e) => console.error(`Error with decoding audio data: ${e}`)
    )

    return new Audio(arrayBuffer, audioContext, bufferSource, analyser);
  }
}
