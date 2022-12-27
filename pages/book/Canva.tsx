import {Component} from "react";

class Canva extends Component<any, any> {

  componentDidMount() {
    const canvas = this.refs.canvas;

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    ctx.background = '#201547'

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(400, 0);
    ctx.stroke();
  }

  render() {
    return (
      <canvas ref={'canvas'} className={'grid'} ></canvas>
    );
  }

}

export default Canva;
