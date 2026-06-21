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
    desc: "Dew is made for skin that needs softness, moisture, and a fresh glow. It is perfect for daily skin-care moments when you want your skin to feel hydrated, smooth, and naturally radiant.",
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
    desc: "Timeless is created for anti-aging beauty care. It supports a graceful skin-care routine and helps the skin feel smooth, cared for, and refreshed with every gentle application.",
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
    desc: "Radiance is designed for skin tightening and glow. It is ideal for beauty routines focused on firm, fresh, and youthful-looking skin with a naturally confident finish.",
    price: "26.90",
    reviews: 76,
    amount: "15 ml",
    image: RadianceOil,
  },
  {
    id: 4,
    name: "Release",
    function: "Neck & Shoulder Comfort",
    desc: "Release is made for neck and shoulder comfort. It is suitable for gentle massage after a long day, helping the body feel relaxed, lighter, and more comfortable.",
    price: "27.90",
    reviews: 120,
    amount: "15 ml",
    image: ReleaseOil,
  },
  {
    id: 5,
    name: "Flow",
    function: "Waist Comfort",
    desc: "Flow supports waist comfort and easy movement. It is ideal for gentle body massage when you want to feel relaxed, flexible, and comfortable in your daily routine.",
    price: "22.00",
    reviews: 120,
    amount: "15 ml",
    image: FlowOil,
  },
  {
    id: 6,
    name: "Stride",
    function: "Joint & Knee Support",
    desc: "Stride is created for joint and knee support routines. It helps bring a comforting feeling to tired areas and supports easier movement during everyday activities.",
    price: "19.90",
    reviews: 120,
    amount: "15 ml",
    image: StrideOil,
  },
  {
    id: 7,
    name: "Peace",
    function: "Sleep Like a Baby",
    desc: "Peace is made for sleep and relaxation routines. It helps create a calm night-time feeling, making it perfect for quiet evenings, rest, and peaceful self-care moments.",
    price: "21.90",
    reviews: 120,
    amount: "15 ml",
    image: PeaceOil,
  },
  {
    id: 8,
    name: "Bloom",
    function: "Hair Growth",
    desc: "Bloom is designed for hair growth support and scalp care. It is ideal for gentle scalp massage, helping the hair feel nourished, fresh, and full of vitality.",
    price: "27.90",
    reviews: 120,
    amount: "15 ml",
    image: BloomOil,
  },
  {
    id: 9,
    name: "Clarity",
    function: "Concentration",
    desc: "Clarity supports focus and concentration. It is perfect for study, work, or mindful moments when you want a clear mind and a fresh, focused feeling.",
    price: "22.90",
    reviews: 120,
    amount: "15 ml",
    image: ClarityOil,
  },
  {
    id: 10,
    name: "Nourish",
    function: "Dry Skin Relief",
    desc: "Nourish is made for dry skin relief. It helps rough or dry areas feel softer, smoother, and deeply cared for during your daily body-care routine.",
    price: "25.90",
    reviews: 98,
    amount: "15 ml",
    image: NourishOil,
  },
  {
    id: 11,
    name: "Calm",
    function: "Headache Comfort",
    desc: "Calm is created for headache comfort and stress relief. It is ideal for quiet relaxation, helping you feel balanced, soothed, and more peaceful after a busy day.",
    price: "27.90",
    reviews: 76,
    amount: "15 ml",
    image: CalmOil,
  },
  {
    id: 12,
    name: "Flexibility",
    function: "Joint Comfort",
    desc: "Flexibility supports joint comfort and easy movement. It is suitable for gentle massage when the body feels stiff, tired, or in need of extra care.",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: FlexibilityOil,
  },
  {
    id: 13,
    name: "Balance",
    function: "Weight Management",
    desc: "Balance is designed to support weight management routines and healthy lifestyle habits. It helps create a centered, motivated feeling during your personal wellness journey.",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: BalanceOil,
  },
  {
    id: 14,
    name: "Harmony",
    function: "Digestive Wellness",
    desc: "Harmony is made for digestive wellness and inner balance. It is suitable for gentle abdominal massage and calming self-care moments focused on comfort.",
    price: "21.90",
    reviews: 120,
    amount: "15 ml",
    image: HarmonyOil,
  },
  {
    id: 15,
    name: "Passion",
    function: "Men’s Vitality",
    desc: "Passion supports men’s vitality and confidence. It is ideal for personal wellness routines that encourage energy, connection, and a refreshed feeling.",
    price: "25.50",
    reviews: 120,
    amount: "15 ml",
    image: PassionOil,
  },
  {
    id: 16,
    name: "Grace",
    function: "Women’s Wellness",
    desc: "Grace is created for women’s wellness and self-care. It helps support a soft, balanced, and comforting routine for feminine care and emotional calm.",
    price: "24.00",
    reviews: 120,
    amount: "15 ml",
    image: GraceOil,
  },
  {
    id: 17,
    name: "Joy",
    function: "Mood Enhancement",
    desc: "Joy is designed for mood enhancement. It helps create a bright, positive, and uplifting feeling, making it perfect for daily emotional wellness routines.",
    price: "26.90",
    reviews: 120,
    amount: "15 ml",
    image: JoyOil,
  },
  {
    id: 18,
    name: "Presence",
    function: "Meditation & Spirituality",
    desc: "Presence is made for meditation and spirituality. It supports calm breathing, mindfulness, inner peace, and quiet moments of personal reflection.",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: PresenceOil,
  },
  {
    id: 19,
    name: "Vitality",
    function: "Energy Boost",
    desc: "Vitality is created for energy boost and motivation. It is ideal for morning routines or moments when you want to feel fresh, active, and inspired.",
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