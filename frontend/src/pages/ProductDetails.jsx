import { Link, useParams } from "react-router-dom";
import "../shared.css";
import "./Shop.css";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { HiOutlineShoppingCart } from "react-icons/hi";

import DewOil from "../assets/images/SkinMoistures.png";
import TimelessOil from "../assets/images/AntiWrincles.png";
import RadianceOil from "../assets/images/SkinTightnings.png";
import ReleaseOil from "../assets/images/StressReliefs.png";
import FlowOil from "../assets/images/WaistEasses.png";
import StrideOil from "../assets/images/JointEasses.png";
import PeaceOil from "../assets/images/SleepSupportOil.png";
import BloomOil from "../assets/images/BoostHairGrowths.png";
import ClarityOil from "../assets/images/TwilightDropss.png";
import NourishOil from "../assets/images/SkinDrynesses.png";
import CalmOil from "../assets/images/HeadacheReliefs.png";
import FlexibilityOil from "../assets/images/JointMoves.png";
import BalanceOil from "../assets/images/VitalGuards.png";
import HarmonyOil from "../assets/images/Cherishmoods.png";
import PassionOil from "../assets/images/VitalGuards.png";
import GraceOil from "../assets/images/Cherishmoods.png";
import JoyOil from "../assets/images/Cherishmoods.png";
import PresenceOil from "../assets/images/TwilightDropss.png";
import VitalityOil from "../assets/images/VitalGuards.png";

const products = [
  {
    id: 1,
    name: "Dew",
    function: "Skin Moisture",
    desc: "Fresh, soft, glowing, hydrated skin",
    price: "24.90",
    badge: "Best Seller",
    reviews: 120,
    amount: "15 ml",
    image: DewOil,
  },
  {
    id: 2,
    name: "Timeless",
    function: "Anti-Wrinkle",
    desc: "Beauty that stays graceful with age",
    price: "29.90",
    badge: "Popular",
    reviews: 98,
    amount: "15 ml",
    image: TimelessOil,
  },
  {
    id: 3,
    name: "Radiance",
    function: "Skin Tightening",
    desc: "Firm, young-looking, glowing skin",
    price: "26.90",
    reviews: 76,
    amount: "15 ml",
    image: RadianceOil,
  },
  {
    id: 4,
    name: "Release",
    function: "Neck & Shoulder Comfort",
    desc: "Let go of tension, stiffness, and stress",
    price: "27.90",
    reviews: 120,
    amount: "15 ml",
    image: ReleaseOil,
  },
  {
    id: 5,
    name: "Flow",
    function: "Waist Comfort",
    desc: "Easy movement and body comfort",
    price: "22.00",
    reviews: 120,
    amount: "15 ml",
    image: FlowOil,
  },
  {
    id: 6,
    name: "Stride",
    function: "Joint & Knee Support",
    desc: "Walk and move with confidence",
    price: "19.90",
    reviews: 120,
    amount: "15 ml",
    image: StrideOil,
  },
  {
    id: 7,
    name: "Peace",
    function: "Sleep Like a Baby",
    desc: "Deep sleep, rest, and calm feeling",
    price: "21.90",
    reviews: 120,
    amount: "15 ml",
    image: PeaceOil,
  },
  {
    id: 8,
    name: "Bloom",
    function: "Hair Growth",
    desc: "Hair growth, health, and vitality",
    price: "27.90",
    reviews: 120,
    amount: "15 ml",
    image: BloomOil,
  },
  {
    id: 9,
    name: "Clarity",
    function: "Concentration",
    desc: "Clear mind, focus, and sharp thinking",
    price: "22.90",
    reviews: 120,
    amount: "15 ml",
    image: ClarityOil,
  },
  {
    id: 10,
    name: "Nourish",
    function: "Dry Skin Relief",
    desc: "Deep care for dry skin",
    price: "25.90",
    reviews: 98,
    amount: "15 ml",
    image: NourishOil,
  },
  {
    id: 11,
    name: "Calm",
    function: "Headache Comfort",
    desc: "Relaxation, balance, and comfort",
    price: "27.90",
    reviews: 76,
    amount: "15 ml",
    image: CalmOil,
  },
  {
    id: 12,
    name: "Flexibility",
    function: "Joint Comfort",
    desc: "Better movement and joint comfort",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: FlexibilityOil,
  },
  {
    id: 13,
    name: "Balance",
    function: "Weight Management",
    desc: "Support for a healthy lifestyle",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: BalanceOil,
  },
  {
    id: 14,
    name: "Harmony",
    function: "Digestive Wellness",
    desc: "Stomach comfort and inner balance",
    price: "21.90",
    reviews: 120,
    amount: "15 ml",
    image: HarmonyOil,
  },
  {
    id: 15,
    name: "Passion",
    function: "Men’s Vitality",
    desc: "Confidence, energy, and connection",
    price: "25.50",
    reviews: 120,
    amount: "15 ml",
    image: PassionOil,
  },
  {
    id: 16,
    name: "Grace",
    function: "Women’s Wellness",
    desc: "Feminine balance and self-care",
    price: "24.00",
    reviews: 120,
    amount: "15 ml",
    image: GraceOil,
  },
  {
    id: 17,
    name: "Joy",
    function: "Mood Enhancement",
    desc: "Happiness, positivity, good mood",
    price: "26.90",
    reviews: 120,
    amount: "15 ml",
    image: JoyOil,
  },
  {
    id: 18,
    name: "Presence",
    function: "Meditation & Spirituality",
    desc: "Mindfulness, inner peace, spiritual focus",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: PresenceOil,
  },
  {
    id: 19,
    name: "Vitality",
    function: "Energy Boost",
    desc: "Natural energy and motivation",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: VitalityOil,
  },
];

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  const addToCart = () => {
    alert(`${product.name} added to cart`);
  };

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
            {product.badge && (
              <span
                className={`product-badge ${
                  product.badge === "Popular" ? "purple" : "dark"
                }`}
              >
                {product.badge}
              </span>
            )}

            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-info">
            <p className="product-id">Product ID: {product.id}</p>

            <h1>{product.name}</h1>

            <small className="product-function">{product.function}</small>

            <p className="detail-description">{product.desc}</p>

            <div className="rating">
              <span>★★★★★</span>
              <small>({product.reviews})</small>
            </div>

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

            <button className="detail-cart" onClick={addToCart}>
              <HiOutlineShoppingCart />
              Add to Cart
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;