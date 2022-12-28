import React from "react";
import Paragraph from "../../Paragraph";

export interface INavLevel {
  title: string;
  classes: string;
}

const NavLevel = ({title, classes}: INavLevel) => (
  <nav className="level">
    <Paragraph __html={title} classes={'level-item ' + classes}/>
  </nav>
)

export default NavLevel;