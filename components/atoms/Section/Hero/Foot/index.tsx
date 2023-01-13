import {Component} from "react";

class FootHero extends Component<{ children: any }> {
  render() {
    let {children} = this.props;
    return (
      <div className="hero-foot">
        <div className="content has-text-centered">
          {children}
        </div>
      </div>
    );
  }
}

export default FootHero;