import defaultImage1 from '@assets/catalog/default-stitch-1.png';
import defaultImage2 from '@assets/catalog/default-stitch-2.png';
import defaultImage3 from '@assets/catalog/default-stitch-3.jpg';

export default function getRandomDefaultImage() {
  const images = [defaultImage1, defaultImage2, defaultImage3];
  return images[Math.floor(Math.random() * images.length)];
}
