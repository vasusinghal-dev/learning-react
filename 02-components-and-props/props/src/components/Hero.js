import heroImg from "url:../images/hero.jpg";

// Hero Component — large banner image section
const Hero = () => {
  return (
    <div className="hero-section">
      <img src={heroImg} alt="hero" className="hero-img" />
    </div>
  );
};

export default Hero;
