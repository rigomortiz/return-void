import {Component} from "react";

export interface IButton {
  text: string;
  classes: string;
}

class Button extends Component<{ classes: any, text: any, onClick: any }> {

  render() {
    return (
      <button className={`button ${this.props.classes}`} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }

}

export default Button;