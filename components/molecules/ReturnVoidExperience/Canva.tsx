import {Component} from "react";

class Canva extends Component<any, any> {

  componentDidMount() {
    const canvas = this.refs.canvasGrid as HTMLCanvasElement;

    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = '#201547'

    // set line stroke and line width
    ctx!.strokeStyle = 'red';
    ctx!.lineWidth = 5;

    // draw a red line
    ctx!.beginPath();
    ctx!.moveTo(0, 0);
    ctx!.lineTo(300, 0);
    ctx!.stroke();
    ctx!.beginPath();
    ctx!.moveTo(0, 0);
    ctx!.lineTo(400, 0);
    ctx!.stroke();
  }

  render() {
    return (
      <canvas ref={'canvasGrid'} className={'grid'} width={'100%'} height={'200px'}></canvas>
    );
  }

}

export default Canva;
