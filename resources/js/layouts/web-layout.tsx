import Footer from '@/components/web-footer';
import Header from '@/components/web-nav';
import { PropsWithChildren } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer/>
      <WhatsAppButton phoneNumber="+2348033404197" />
    </div>
  );
};

export default Layout;
