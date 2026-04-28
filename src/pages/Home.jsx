import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AwardsSection from '../components/AwardsSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import FaqSection from '../components/FaqSection';
import ValuesSection from '../components/ValuesSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AwardsSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection />
      <ValuesSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Home;
