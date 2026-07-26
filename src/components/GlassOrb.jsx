import "./GlassOrb.css";
import newlogo from "../assets/images/newlogo.jpeg";

function GlassOrb() {
  return (
    <div className="glass-orb-container">
      <div className="orb-shadow"></div>
      
      <div className="glass-orb">
        <div className="glass-sphere">
          <div className="glass-reflection-top"></div>
          <div className="glass-reflection-side"></div>
          <div className="glass-highlight"></div>
          
          <div className="logo-container">
            <img 
              src={newlogo} 
              alt="Wellness Logo" 
              className="orb-logo"
            />
          </div>
          
          <div className="glass-shine"></div>
        </div>
      </div>
      
      <div className="gold-base">
        <div className="base-top"></div>
        <div className="base-middle"></div>
        <div className="base-bottom"></div>
        <div className="base-reflection"></div>
      </div>
    </div>
  );
}

export default GlassOrb;
