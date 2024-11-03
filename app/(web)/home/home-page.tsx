import Footer from "../layouts/footer";
import Navbar from "../layouts/navbar";
import Staff from "./staff";
import ImageCabinet from "./image-cabinet";
import LatestEvent from "./latest-event";
import NewsLetter from "./news-letter";
import SocialMedia from "./social-media";
import WebCount from "./web-count";
import Support from "./support";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main>
        <ImageCabinet />
        <LatestEvent />
        <NewsLetter />
        <Staff />
        <SocialMedia />
        <Support />
        <WebCount />
      </main>
      <Footer />
    </div>
  );
}
