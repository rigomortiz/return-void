import HeadHero from "./Head";
import BodyHero from "./Body";
import FootHero from "./Foot";
import React, {Component} from "react";
import Audio from "../../../molecules/ReturnVoidExperience/Effects/AudioVisualizer";
import Paragraph, {IParagraph} from "../../Paragraph";
import Button, {IButton} from "../../Button";
import NavLevel from "../../NavLevel";
import SkyEffect from "../../../molecules/ReturnVoidExperience/Effects/Sky";


export interface IHeadHero {
  title: string;
  classes: string;
}

export interface IBodyHero {
  title: IParagraph;
  button: IButton;
}

export interface ISectionHero {
  classes: string;
  headHero: IHeadHero;
  bodyHero: IBodyHero;
}


class SectionHero extends Component<{classes: any, headHero: any, bodyHero: any, onClick: any, scene: any}> {
  render() {
    return (
      <section className={`hero ${this.props.classes}`} ref={this.props.scene}>
        <HeadHero>
          <NavLevel>
            <Paragraph __html={this.props.headHero.title} classes={`level-item ${this.props.headHero.classes}`}/>
          </NavLevel>
        </HeadHero>
        <BodyHero>
          <Paragraph __html={this.props.bodyHero.title.__html} classes={this.props.bodyHero.title.classes}/>
          <Button classes={this.props.bodyHero.button.classes} text={this.props.bodyHero.button.text}
                  onClick={this.props.onClick}/>
          {/*<p className={"press-key is-family-monospace"}><b>PRESS SPACE BUTTON</b></p>*/}
        </BodyHero>
        <FootHero>
          <Audio/>
        </FootHero>
        <SkyEffect/>
      </section>
    )
  }
}

export default SectionHero;