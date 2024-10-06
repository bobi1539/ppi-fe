import Navbar from "./components/navbar";
import ImageCabinet from "./home/image-cabinet";
import LatestEvent from "./home/latest-event";
import NewsLetter from "./home/news-letter";
import SocialMedia from "./home/social-media";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ImageCabinet />
      <LatestEvent />
      <NewsLetter />
      <SocialMedia />
    </div>
  );
}
