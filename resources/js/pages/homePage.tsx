import Carousel from '../components/home/Carousel';
import Stats from '../components/home/Stats';
import FeaturedCourses from '../components/home/FeaturedCourses';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import Layout from '@/layouts/web-layout';
import About from '@/components/home/About';
import OurServices from '@/components/home/OurServices';
import Partners from '@/components/home/Partners';
import Gallery from '@/components/home/Gallery';


const HomePage = () => {
  return (
    <>
     <Layout>
       <Carousel />
       <About/>
      <Stats />
      <OurServices/>
      <Partners/>
      <FeaturedCourses />
      <Testimonials />
      <Gallery/>
      <CallToAction />
     </Layout>
    </>
  );
};

export default HomePage;