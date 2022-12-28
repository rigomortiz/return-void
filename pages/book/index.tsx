import React from "react";
import ReturnVoidExperience, {IReturnVoidEx} from "../../components/molecules/ReturnVoidExperience";

const Index = () =>  {
  const returnVoidExp: IReturnVoidEx = {
    section: {
      classes: 'is-fullheight return-void',
      headHero: {
        title: 'bad request & rigomortiz',
        classes: 'has-text-centered subtitle is-lowercase has-text-weight-light is-size-3 is-size-5-mobile has-text-white'
      },
      bodyHero: {
        title: {
          __html: 'RETURN<br/>VOID',
          classes: 'title is-uppercase has-text-weight-bold is-size-1-mobile'
        },
        button: {
          text: 'Play',
          classes: 'is-danger is-rounded',
        }
      }
    }
  }

  return (
      <ReturnVoidExperience
        section={returnVoidExp.section}
      />
  );
}

export default Index;
