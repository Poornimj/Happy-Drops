import "./Hero.css";
import "../styles/ScrollReveal.css";
import heroVideo from "../assets/images/video.mp4";
import useScrollReveal from "../hooks/useScrollReveal";

function Hero() {
  const [taglineRef, taglineVisible] = useScrollReveal();
  const [titleRef, titleVisible] = useScrollReveal();
  const [descriptionRef, descriptionVisible] = useScrollReveal();
  const [buttonsRef, buttonsVisible] = useScrollReveal();
  const [videoRef, videoVisible] = useScrollReveal();

  return (
    <section className="hero">

      <div className="leaf-decoration-left"></div>
      <div className="leaf-decoration-right"></div>

      <div className="hero-left">

        <p className="hero-tagline scroll-reveal" ref={taglineRef} style={{ opacity: taglineVisible ? 1 : 0, transform: taglineVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          EMPOWERING WELLNESS NATURALLY
        </p>

        <h1 className="hero-title scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          Personalized Wellness,
          <br />
          Designed for Longevity
        </h1>

        <p className="hero-description scroll-reveal" ref={descriptionRef} style={{ opacity: descriptionVisible ? 1 : 0, transform: descriptionVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          Discover tailored essential oil recipes,
          nutrition guidance, and wellness tools
          for a happier, healthier you and your family.
        </p>

        <div className="hero-buttons scroll-reveal" ref={buttonsRef} style={{ opacity: buttonsVisible ? 1 : 0, transform: buttonsVisible ? 'translateY(0)' : 'translateY(40px)' }}>

          <button className="primary-btn">
            🌿 Get My Recommendation
          </button>

          <button className="secondary-btn">
            👜 Book a Workshop
          </button>

          <button className="secondary-btn">
            🛍️ Explore Products
          </button>

        </div>

        

      </div>

      <div className="hero-right">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video scroll-reveal"
          ref={videoRef}
          style={{ opacity: videoVisible ? 1 : 0, transform: videoVisible ? 'translateY(0)' : 'translateY(40px)' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="video-fade"></div>

      </div>

    </section>
  );
}

export default Hero;