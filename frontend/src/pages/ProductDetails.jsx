import { Link, useParams } from "react-router-dom";
import "../shared.css";
import "./Shop.css";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import SkinCare from "../assets/images/SkinDrynesses.png";
import sleepOil from "../assets/images/TwilightDropss.png";
import hairOil from "../assets/images/BoostHairGrowths.png";
import sleepSupportOil from "../assets/images/Cherishmoods.png";
import painReliefOil from "../assets/images/JointEasses.png";
import immunityOil from "../assets/images/BoostImmunity.png";
import stressOil from "../assets/images/HeadacheReliefs.png";
import SkinTightOil from "../assets/images/SkinTightnings.png";
import SkinMoisture from "../assets/images/SkinMoistures.png";
import AntiWrincle from "../assets/images/AntiWrincles.png";
import StressRelief from "../assets/images/StressReliefs.png";

const products = [
  {
    id: 1,
    name: "Skin and Beauty",
    description:
      "A gentle daily care oil created for soft, radiant-looking skin. It can be used as part of a simple self-care routine to support a nourished skin feel and a calm wellness moment.",
    amount: "15 ml",
    price: "24.90",
    image: SkinCare,
  },
  {
    id: 2,
    name: "Sleep and Relaxation",
    description:
      "A calming wellness blend designed for quiet evening routines. Its soothing aroma helps create a peaceful atmosphere before bedtime and supports a more relaxed self-care experience.",
    amount: "15 ml",
    price: "29.90",
    image: sleepOil,
  },
  {
    id: 3,
    name: "Hair Care",
    description:
      "A nourishing oil made for hair and scalp care. It helps support a healthy-looking shine and can be used during gentle massage or regular hair care routines.",
    amount: "15 ml",
    price: "26.90",
    image: hairOil,
  },
  {
    id: 4,
    name: "Sleep Support Blend",
    description:
      "A soft aromatic blend made for bedtime rituals and relaxation. It helps create a comfortable, restful environment and is ideal for winding down after a busy day.",
    amount: "15 ml",
    price: "23.00",
    image: sleepSupportOil,
  },
  {
    id: 5,
    name: "Pain and relief",
    description:
      "A comforting body-care oil designed for massage and relaxation. It can be used after long days to support a soothing self-care routine and a sense of ease.",
    amount: "15 ml",
    price: "22.00",
    image: painReliefOil,
  },
  {
    id: 6,
    name: "Boost Immunity",
    description:
      "A refreshing wellness oil blend made for everyday self-care. Its clean, uplifting aroma is suitable for daily routines when you want a fresh and balanced atmosphere.",
    amount: "15 ml",
    price: "19.90",
    image: immunityOil,
  },
  {
    id: 7,
    name: "Stress and Mood",
    description:
      "A calming aroma blend created for peaceful moments and emotional balance. It is ideal for quiet breaks, breathing routines, or creating a gentle wellness space.",
    amount: "15 ml",
    price: "21.90",
    image: stressOil,
  },
  {
    id: 8,
    name: "Skin Tightening",
    description:
      "A skin care oil made for firm, smooth-looking skin. It works well in a regular beauty routine and supports a soft, hydrated skin feel.",
    amount: "15 ml",
    price: "27.90",
    image: SkinTightOil,
  },
  {
    id: 9,
    name: "Skin and Beauty",
    description:
      "A moisturizing oil created for a soft skin glow and gentle daily nourishment. It is suitable for simple beauty care and relaxing self-care moments.",
    amount: "15 ml",
    price: "22.90",
    image: SkinMoisture,
  },
  {
    id: 10,
    name: "Anti Wrinkle Oil",
    description:
      "A natural beauty oil made for mature-looking skin care. It helps support a smoother, refreshed appearance when used as part of a consistent skincare routine.",
    amount: "15 ml",
    price: "25.90",
    image: AntiWrincle,
  },
  {
    id: 11,
    name: "Hair Strength Oil",
    description:
      "A strengthening hair oil created to support healthy-looking hair and shine. It can be used for scalp massage, dry ends, or regular nourishing hair care.",
    amount: "15 ml",
    price: "27.90",
    image: hairOil,
  },
  {
    id: 12,
    name: "Mood Harmony",
    description:
      "A gentle mood-support aroma blend made for calm and positive daily moments. It helps create a peaceful environment for rest, reflection, or quiet self-care.",
    amount: "15 ml",
    price: "24.90",
    image: StressRelief,
  },
];

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="page-shell detail-page">
          <h2>Product not found</h2>
          <Link to="/" className="back-link">
            Back to Shop
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="page-shell detail-page">
        <Link to="/" className="back-link">
          Back to Shop
        </Link>

        <section className="detail-box">
          <div className="detail-image-box">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-info">
            <p className="product-id">Product ID: {product.id}</p>

            <h1>{product.name}</h1>

            <p className="detail-description">{product.description}</p>

            <p className="detail-amount">
              <strong>Amount:</strong> {product.amount}
            </p>

            <h2>€ {product.price}</h2>

            <label className="quantity-label">
              Quantity
              <select defaultValue="1">
                 {Array.from({ length: 20 }, (_, index) => {
                   const value = index + 1;

                   return (
                     <option key={value} value={value}>
                         {value} {value === 1 ? "bottle" : "bottles"}
                      </option>
                  );
             })}
             </select>
            </label>

            <button className="detail-cart">Add to Cart</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;