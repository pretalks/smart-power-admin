import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import EnquiryPopup from "./EnquiryPopup";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 pt-[72px]">{children}</main>
    <Footer />
    <WhatsAppButton />
    <EnquiryPopup />
  </div>
);

export default Layout;
