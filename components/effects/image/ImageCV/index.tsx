import {Component} from "react";
import cv from "opencv-ts";

class ImageCV extends Component<any, any> {
  componentDidMount() {
    cv.onRuntimeInitialized = () => {
      console.log('onRuntimeInitialized')
    }
  }

  edit() {
    let imgElement = (document.querySelector('.img-rv') as HTMLCanvasElement);
    let input = cv.imread(imgElement);
    let hsv = new cv.Mat();
    let output = new cv.Mat();
    // You can try more different parameters
    //cv.cvtColor(input, hsv, cv.COLOR_BGR2HSV, 0);

    cv.threshold(input, output, 150, 200, cv.THRESH_TOZERO);



    cv.imshow('canvas-rv', output);
    input.delete();
    output.delete();
    //cv.onRuntimeInitialized = () => {
      //const src = cv.imread(imgElement);
      //const dst: Mat = new cv.Mat(src.cols, src.rows, cv.CV_8UC4);
      //cv.resize(src, dst, new cv.Size(500, 500), 0, 0, cv.INTER_AREA);
      //const roiRect: Rect = new cv.Rect(0, 0, 200, 200);
      //const roi = dst.roi(roiRect);
      //cv.imshow('outputCanvas', roi);
    //};

  }

  render() {
    return (
      <>
        <div className={'content'}>
           <h1>OpenCV</h1>
          <button onClick={this.edit}>Edit</button>
          <img className={'img-rv'} src={'/images/image.jpeg'} width={'500px'} height={'300px'} alt={'img'}/>
          <canvas className={'canvas-rv'} id={'canvas-rv'} width={'500px'} height={'300px'}></canvas>
        </div>
      </>
    );
  }
}

export default ImageCV