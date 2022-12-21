import {useEffect, useRef} from "react";
import styles from "../TvStaticExperience/index.module.css";
import {ReturnVoidScene} from "../../../virtual-reality/scenes/ReturnVoidScene";

const ReturnVoid = () => {
    const returnVoidVRExperienceHost = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (returnVoidVRExperienceHost.current !== null) {
            const returnVoidScene = new ReturnVoidScene();

            returnVoidScene.setDivElementHost(returnVoidVRExperienceHost.current);
            returnVoidScene.render();
        }
    }, []);

    return (
        <div ref={returnVoidVRExperienceHost}>
            <div className={styles.body}><b>RETURN VOID</b></div>
        </div>
    )

}

export default ReturnVoid;