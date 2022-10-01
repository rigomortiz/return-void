import Link from 'next/link';

const Gallery = () => {
  return (
    <div>
      <h1>Gallery</h1>
      <div>
        <Link href="/gallery/artworks/cyber-shamanism"><button>CyberShamanism</button></Link>
        <Link href="/gallery/artworks/hacker-buddha"><button>HackerBudda</button></Link>
      </div>
    </div>
  )
}

export default Gallery;