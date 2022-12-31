import Gallery from "../../components/templates/pages/GalleryBasic";

const EffectsPage = () => {
  const title = 'EFFECTS';
  const links = [
    {
      href: '/effects/image/opencv',
      text: 'Image OpenCV'
    },
    {
      href: '/effects/audio/wave-visualizer',
      text: 'Audio Wave'
    },
    {
      href: '/effects/audio/bar-visualizer',
      text: 'Audio Bar'
    },
    {
      href: '/effects/video/stream',
      text: 'Video stream'
    },
    {
      href: '/effects/video/stream-opencv',
      text: 'Video Opencv'
    },
    {
      href: '/effects/graphic/threejs-demo',
      text: 'Three.js Demo'
    }
  ]

  return (
    <Gallery title={title} links={links}/>
  )
}

export default EffectsPage;