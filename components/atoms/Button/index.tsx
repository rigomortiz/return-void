import Audio from "../../molecules/ReturnVoidExperience/Audio";

export interface IButton {
  text: string;
  classes: string;
}

const Button = ({text, classes}: IButton) => {
  function click(this: any) {
     Audio.getAudio(Audio.URL);
     document.querySelector(".button")!.setAttribute('disabled', 'disabled')
  }

  return (
    <button className={'button ' + classes} onClick={click}>{text}</button>
  )
}

export default Button;