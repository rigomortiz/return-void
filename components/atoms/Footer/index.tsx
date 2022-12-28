import styles from './index.module.css';

interface IFooter {
  text: string
}

const Footer = ({ text }: IFooter) => (
  <div className={styles.footer}>
    {text}
  </div>
)

export default Footer;