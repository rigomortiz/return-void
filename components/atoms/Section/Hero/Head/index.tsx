import React, {Component} from "react";

class HeadHero extends Component<{children: any}> {
  render(){
    let children = this.props.children;

    return (
      <div className="hero-head">
        {children}
      </div>
    )
  }
}

export default HeadHero;