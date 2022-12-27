import React, {useEffect, useRef} from "react";
import {ReturnVoidScene} from "../../../virtual-reality/scenes/ReturnVoidScene";
import Sky from "../../../pages/book/Sky";
import Audio from "../../../pages/book/Audio";


const ReturnVoidExperience = () => {

  const returnVoidVRExperienceHost = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (returnVoidVRExperienceHost.current !== null) {
      const returnVoidScene = new ReturnVoidScene();
      returnVoidScene.setDivElementHost(returnVoidVRExperienceHost.current);
      returnVoidScene.render();
    }
  }, []);

  return (
    <>
      <section className="hero is-fullheight return-void" ref={returnVoidVRExperienceHost}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title is-uppercase has-text-weight-bold is-size-1-mobile">RETURN<br/>VOID</p>
            <p className="subtitle is-lowercase has-text-weight-light is-size-3 is-size-7-mobile has-text-white">
              bad request & rigomortiz
            </p>
          </div>
        </div>
        <div className="hero-foot">
          <div className="content has-text-centered">
            <Audio />
          </div>
        </div>
        <Sky></Sky>
      </section>
    </>
  )
}

export default ReturnVoidExperience;