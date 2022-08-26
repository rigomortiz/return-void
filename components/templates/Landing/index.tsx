import { useState, useEffect } from 'react';
import TvStaticExperience from 'components/molecules/TvStaticExperience';
import LandingExperience from 'components/molecules/LandingExperience';
import Title from 'components/atoms/Title';
import Footer from 'components/atoms/Footer';

const Landing = () => {
  const [ experienceIndex, setExperienceIndex ] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setExperienceIndex(1);
    }, 10_000);
  }, []);

  const renderVRExperience = (experienceIndex: number) => {
    const experiences = [ TvStaticExperience, LandingExperience ];
    const CurrentExperience = experiences[experienceIndex];

    return <CurrentExperience />
  }

  return (
    <div>
      <Title title='return void();' />
      {renderVRExperience(experienceIndex)}
      <Footer text='bad request & sentinel'/>
    </div>
  )
}

export default Landing;
