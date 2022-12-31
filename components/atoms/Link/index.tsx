import {Component} from "react";

class Link extends Component<{ classes: any, text: any, href: any }> {

  render() {
    return (
      <a className={`button ${this.props.classes}`} href={this.props.href}>
        {this.props.text}
      </a>
    )
  }

}

export default Link;