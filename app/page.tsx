import Navbar from "./components/navbar";
import ImageCabinet from "./home/image-cabinet";
import LatestEvent from "./home/latest-event";
import NewsLetter from "./home/news-letter";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ImageCabinet />
      <LatestEvent />
      <NewsLetter />
    </div>
  );
}
