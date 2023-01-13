export interface IReturnVoidEx {
  section: ISectionHero;
}

export interface ISectionHero {
  classes: string;
  headHero: IHeadHero;
  bodyHero: IBodyHero;
}

export interface IBodyHero {
  title: IParagraph;
  button: IButton;
}

export interface IHeadHero {
  title: IParagraph;
  classes: string;
}

export interface IButton {
  text: string;
  classes: string;
}

export interface IParagraph {
  __html: string;
  classes: string;
}
