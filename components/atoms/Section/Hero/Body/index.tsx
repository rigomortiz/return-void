import React from "react";
import Paragraph, {IParagraph} from "../../../Paragraph";
import Button, {IButton} from "../../../Button";

export interface IBodyHero {
  title: IParagraph;
  button: IButton;
}

const BodyHero = ({title, button}: IBodyHero) => (
  <div className="hero-body">
    <div className="container has-text-centered">
      <Paragraph __html={title.__html} classes={title.classes}/>
      <Button text={button.text} classes={button.classes}></Button>
      {/*<p className={"press-key is-family-monospace"}><b>PRESS SPACE BUTTON</b></p>*/}
    </div>
  </div>
)

export default BodyHero;