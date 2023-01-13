import Gallery from 'components/templates/pages/GalleryBasic';

const GalleryPage = () => {
  const title = 'GALLERY';
  const links = [
    {
      href: '/gallery/artworks/cyber-shamanism',
      text: 'CyberShamanism'
    },
    {
      href: '/gallery/artworks/hacker-buddha',
      text: 'HackerBuddha'
    }]
  return (
    <Gallery title={title} links={links}/>
  )
}

export default GalleryPage;