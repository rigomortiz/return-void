import { useEffect, useRef } from 'react';
import { TVStaticNoise } from 'components/core/web-xr/scenes/TVStaticNoise';
import styles from './index.module.css';

const TVStatic = () => {
    const tvStaticNoiseVRExperienceHost = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tvStaticNoiseVRExperienceHost.current !== null) {
            const tvStaticNoise = new TVStaticNoise();

            tvStaticNoise.setDivElementHost(tvStaticNoiseVRExperienceHost.current);
            tvStaticNoise.render();
        }
    }, []);

    return (
        <div ref={tvStaticNoiseVRExperienceHost}>
            <div className={styles.body}><b>NO SIGNAL</b></div>
        </div>
    )
}

export default TVStatic;
