import React, {Component} from "react";

class SectionHero extends Component<{children: any, classes: any}> {
  render() {
    return (
      <section className={`hero ${this.props.classes}`}>
        {this.props.children}
      </section>
    )
  }
}

export default SectionHero;