import { Link, useParams } from "react-router-dom";
import productImage from "../assets/images/Imageoil.jpg";
import "./Shop.css";

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">Back to Shop</Link>

      <div className="detail-box">
        <img src={productImage} alt="Product" />

        <div>
          <h1>Sleep Support Blend</h1>
          <p>Product ID: {id}</p>
          <p>Relaxation and better sleep. A calming wellness product for your daily routine.</p>
          <h2>€ 24.90</h2>
          <p className="stars">★★★★★ (120)</p>
          <button className="detail-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;