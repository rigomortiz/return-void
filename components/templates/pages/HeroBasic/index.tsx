import SectionHero from "../../../atoms/Section/Hero";
import BodyHero from "../../../atoms/Section/Hero/Body";
import Paragraph from "../../../atoms/Paragraph";

const HeroBasic = ({ text }:any) => {
  return (
    <SectionHero classes={'is-black is-fullheight'}>
      <BodyHero>
        <Paragraph text={{__html: text}} classes={'title'} />
      </BodyHero>
    </SectionHero>
  )
}

export default HeroBasic;
