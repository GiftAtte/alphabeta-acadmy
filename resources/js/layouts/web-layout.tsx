import Footer from '@/components/web-footer';
import Header from '@/components/web-nav';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
        <Header/>
      <main>{children}</main>
      <Footer/>
     
    </div>
  );
};

export default Layout;
