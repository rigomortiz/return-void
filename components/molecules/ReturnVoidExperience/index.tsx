import SectionHero, {ISectionHero} from "../../atoms/Section/Hero";

export interface IReturnVoidEx {
  section: ISectionHero;
}

const ReturnVoidExperience = ({section}: IReturnVoidEx) => {

  return (
      <SectionHero
        classes={section.classes}
        headHero={section.headHero}
        bodyHero={section.bodyHero} />
  )
}

export default ReturnVoidExperience;