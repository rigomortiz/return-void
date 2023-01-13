import {Component} from "react";

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