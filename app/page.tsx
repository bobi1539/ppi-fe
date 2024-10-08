import ImageCabinet from "./home/image-cabinet";
import LatestEvent from "./home/latest-event";
import NewsLetter from "./home/news-letter";
import SocialMedia from "./home/social-media";
import StudentCount from "./home/student-count";
import Support from "./home/support";

export default function Home() {
  return (
    <div>
      <ImageCabinet />
      <LatestEvent />
      <NewsLetter />
      <SocialMedia />
      <Support />
      <StudentCount />
    </div>
  );
}
