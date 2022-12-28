import React, {Component} from "react";

class NavLevel extends Component<{children: any}> {
  render() {
    let children = this.props.children;

    return(
      <nav className="level">
        {children}
      </nav>
    )
  }
}

export default NavLevel;