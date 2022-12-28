import React, {Component} from "react";

class BodyHero extends Component<{ children: any }> {
  render() {
    let children = this.props.children;
    return(
      <div className="hero-body">
        <div className="container has-text-centered">
          {children}
        </div>
      </div>
    )
  }
}

export default BodyHero;