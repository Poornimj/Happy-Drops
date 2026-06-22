import { Link } from "react-router-dom";
import "./Shop.css";

function SimplePage({ title }) {
  return (
    <div className="simple-page">
      <Link to="/" className="back-link">Back to Shop</Link>
      <h1>{title}</h1>
      <p>This page is ready. You can add content here later.</p>
    </div>
  );
}

export default SimplePage;