import { Link, useParams } from "react-router-dom";
import "./Shop.css";

function CategoryPage() {
  const { categoryName } = useParams();
  const title = categoryName.replaceAll("-", " ");

  return (
    <div className="simple-page">
      <Link to="/" className="back-link">Back to Shop</Link>
      <h1>{title}</h1>
      <p>Products for this category will show here.</p>
    </div>
  );
}

export default CategoryPage;