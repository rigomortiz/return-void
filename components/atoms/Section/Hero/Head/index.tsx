import React from "react";
import Paragraph from "../../../Paragraph";

export interface IHeadHero {
  title: string;
  classes: string;
}

const HeadHero = ({title, classes}: IHeadHero) => (
  <div className="hero-head">
    <nav className="level">
      <Paragraph __html={title} classes={'level-item ' + classes}/>
    </nav>
  </div>
)

export default HeadHero;