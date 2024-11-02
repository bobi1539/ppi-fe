import Footer from "./layouts/footer";
import Navbar from "./layouts/navbar";

export default function MainMenuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
