import React from "react";
import Hero from "../modules/Hero";
import AppContainer from "../components/AppContainer";
import WhoAreWe from "../modules/WhoAreWe";
import Services from "../modules/Services";
import RealMVP from "../modules/RealMVP";
import Nav from "../modules/Nav";
import AboutUs from "../modules/AboutUs";
import Portfolio from "./Portfolio";
import WhyUs from "../modules/WhyUs";
import Contact from "../modules/Contact";
import VisitUs from "../modules/VisitUs";

// import Navigation from "../modules/Navigation";

const Index = () => {
  return (
    <AppContainer>
      <title>Blazity - High end web and mobile software</title>
      <Nav />
      <Hero />
      <WhoAreWe />
      <Services />
      <RealMVP />
      <WhyUs />
      <Portfolio />
      <AboutUs />
      <Contact />
      <VisitUs />
    </AppContainer>
  );
};

export default Index;
