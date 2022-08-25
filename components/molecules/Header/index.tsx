
interface IHeader {
  title: string
}

const Header = ({ title }: IHeader) => {
  return <h3 className="title">{title} Recover</h3>
}

export default Header;