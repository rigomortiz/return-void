import { useEffect, useState } from 'react';
import styles from './index.module.css';

interface IDeadChannelTransition {
  triggerStartTransition?: boolean
}

const DeadChannelTransition = ({ triggerStartTransition  }: IDeadChannelTransition) => {
  const [ startTransition, setStartTransition ] = useState(false);

  useEffect(() => {
    if (triggerStartTransition) {
      setStartTransition(true);
    }
  }, [ triggerStartTransition ])

  return (
    <div
      className={
        `${styles['dead_channel']} ${startTransition ? styles['dead_channel_transition'] : ''}`
      }
    ></div>
  );
}

export default DeadChannelTransition;