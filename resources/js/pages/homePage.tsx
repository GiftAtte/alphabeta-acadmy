import Carousel from '../components/home/Carousel';
import Stats from '../components/home/Stats';
import FeaturedCourses from '../components/home/FeaturedCourses';
import Testimonials from '../components/home/Testimonials';
import DynamicCallToAction from '../components/home/DynamicCallToAction';
import Layout from '@/layouts/web-layout';
import About from '@/components/home/About';
import OurServices from '@/components/home/OurServices';
import Partners from '@/components/home/Partners';
import Gallery from '@/components/home/Gallery';
import FullWidthSection from '@/components/FullWidthSection';
import VerifyCertificateButton from '@/components/VerifyCertificateButton';

const HomePage = () => {
  return (
    <Layout>
      {/* Verify Certificate Button */}

      
      <VerifyCertificateButton />

      {/* Full-width carousel with no container */}
      <Carousel />

      <FullWidthSection className="bg-gray-50">
        <About/>
      </FullWidthSection>

      <FullWidthSection
        className="bg-gradient-to-r from-primary-900/95 to-primary-800/95 text-white"
      >
        <Stats />
      </FullWidthSection>

      <FullWidthSection>
        <OurServices/>
      </FullWidthSection>

      <FullWidthSection className="bg-gray-50">
        <Partners/>
      </FullWidthSection>

      <FullWidthSection className="bg-white">
        <FeaturedCourses />
      </FullWidthSection>

      <FullWidthSection
        className="bg-gradient-to-r from-primary-800/90 to-primary-700/90 text-white"
      >
        <Testimonials />
      </FullWidthSection>

      <FullWidthSection className="bg-gray-50">
        <Gallery/>
      </FullWidthSection>

      <FullWidthSection
        className="bg-primary text-white"
        noPadding
        noContainer
      >
        <DynamicCallToAction />
      </FullWidthSection>
    </Layout>
  );
};

export default HomePage;
