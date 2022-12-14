import styles from './index.module.css';

interface ITitle {
  title: string
}

const Title = ({ title }: ITitle) => {
  return <div className={styles.title}>{title}</div>
}

export default Title;