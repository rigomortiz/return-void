import styles from './index.module.css'

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        By --{'>'}
        <span style={{ marginRight: '20px', marginLeft: '20px' }}>BAD R3QUEST</span>
        {' && '}
        <span style={{ marginRight: '20px', marginLeft: '20px' }}>$ENTINEL</span>
      </footer>
    </>
  )
}

export default Footer;