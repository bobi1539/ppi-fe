import Footer from "../layouts/footer";
import Navbar from "../layouts/navbar";

export default function EventLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
