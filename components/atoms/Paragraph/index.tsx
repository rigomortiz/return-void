import React, {Component} from "react";

class Paragraph extends Component<{text: any, classes: any}> {
  render() {
    return (
      <p className={this.props.classes} dangerouslySetInnerHTML={this.props.text} />
    )
  }
}

export default Paragraph;