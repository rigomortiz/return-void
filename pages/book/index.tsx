import React from "react";
import BodyHero from "../../components/atoms/Section/Hero/Body";
import Paragraph from "../../components/atoms/Paragraph";
import SectionHero from "../../components/atoms/Section/Hero";
import Link from "../../components/atoms/Link";

const BookPage = () =>  {

  return (
    <SectionHero classes={'is-black is-fullheight'}>
      <BodyHero>
        <Paragraph text={{__html: 'Book'}} classes={'title'} />
        <Link classes={'is-text'} text={'Open'} href={'/book/cover'}></Link>
      </BodyHero>
    </SectionHero>
  );
}

export default BookPage;
