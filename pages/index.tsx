import styles from "./index.module.scss";

const Index = () => {

  return (
    <div>
      <video className={styles['return-void-video']} autoPlay={true} muted={true} poster={"images/return-void-background.png"}>
        <source src={"video/return-void.mp4"} type="video/mp4"/>
      </video>
    </div>
  );
}

export default Index;
