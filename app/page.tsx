import Footer from "./layouts/footer";
import Navbar from "./layouts/navbar";
import ImageCabinet from "./home/image-cabinet";
import LatestEvent from "./home/latest-event";
import NewsLetter from "./home/news-letter";
import SocialMedia from "./home/social-media";
import StudentCount from "./home/student-count";
import Face from "./home/face";
import Support from "./home/support";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ImageCabinet />
      <LatestEvent />
      <NewsLetter />
      {/* <Face /> */}
      <SocialMedia />
      <Support />
      <StudentCount />
      <Footer />
    </div>
  );
}
