import React, {useEffect} from "react";
import BodyHero from "../../components/atoms/Section/Hero/Body";
import Paragraph from "../../components/atoms/Paragraph";
import SectionHero from "../../components/atoms/Section/Hero";
import Link from "../../components/atoms/Link";

const BookPage = () =>  {

  useEffect(() => {
    const xrSystem: XRSystem | undefined = navigator.xr
    if (xrSystem == undefined) {
      console.log('XRSystem is undefined')
      return;
    }
    xrSystem!.isSessionSupported('inline')
      .then(r => {
        console.log(r)
      })
    xrSystem!.requestSession('inline', {
        optionalFeatures: [ "local" ]
      })
      .then((xrSession: XRSession) => {
        console.log(xrSession)
        xrSession.requestAnimationFrame(d  => {
          console.log(d)
        })
      }).catch(e => {
        console.log(e)
      }).finally( () => {
          console.log('end session')
      })


  }, []);

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
