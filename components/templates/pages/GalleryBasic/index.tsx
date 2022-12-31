import SectionHero from "../../../atoms/Section/Hero";
import BodyHero from "../../../atoms/Section/Hero/Body";
import Paragraph from "../../../atoms/Paragraph";
import Link from "../../../atoms/Link";

const Gallery = ({title, links}: any) => {
  return (
     <SectionHero classes={'is-black is-fullheight'}>
      <BodyHero>
        <Paragraph text={{__html: title}} classes={'title'} />
        {
          links.map((link: { href: string; text: string}) => (
            <Link href={link.href} classes={'is-text'} text={link.text} />
          ))
        }
      </BodyHero>
    </SectionHero>
  )
}

export default Gallery;