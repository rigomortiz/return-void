import React, {Component} from "react";

class BodyHero extends Component<{ children: any }> {
  render() {
    return(
      <div className="hero-body">
        <div className="container has-text-centered">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default BodyHero;