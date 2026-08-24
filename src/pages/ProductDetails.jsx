import { Link, useNavigate, useParams } from "react-router-dom";
import "./Shop.css";

import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { addProductToCart, apiRequest, findApiProduct } from "../lib/api";
import { useAuth } from "../context/AuthContext";

import DewOil from "../assets/images/Shop_SkinMoisturesHover.png";
import TimelessOil from "../assets/images/Shop_AntiWrinclesHover.png";
import RadianceOil from "../assets/images/Shop_SkinTightningsHover.png";
import ReleaseOil from "../assets/images/Shop_StressReliefsHover.png";
import FlowOil from "../assets/images/Shop_WaistEassesHover.png";
import StrideOil from "../assets/images/Shop_JointEasesHover.png";
import PeaceOil from "../assets/images/Shop_SleepSupportOilHover.png";
import BloomOil from "../assets/images/Shop_BoostHairGrowthsHover.png";
import ClarityOil from "../assets/images/Shop_ConcentrationOilHover.png";
import NourishOil from "../assets/images/Shop_SkinCaresHover.png";
import CalmOil from "../assets/images/Shop_HeadacheReliefsHover.png";
import CircleCalmOil from "../assets/images/Shop_CircleCalm_Hover.png";
import BalanceOil from "../assets/images/Shop_HealthylifeHover.png";
import HarmonyOil from "../assets/images/Shop_SleepSupportOilHover.png";
import PassionOil from "../assets/images/Shop_VitalityOilHover.png";
import GraceOil from "../assets/images/Shop_FeminineHover.png";
import JoyOil from "../assets/images/Shop_JoyMoodHover.png";
import PresenceOil from "../assets/images/Shop_MeditationHover.png";
import VitalityOil from "../assets/images/Shop_EnergyBoostHover.png";
import SummerOil from "../assets/images/Shop_SummerOilHover.png";
import WinterOil from "../assets/images/Shop_WinterOilHover.png";

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
    price: "19.90",
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
    price: "16.90",
    reviews: 76,
    amount: "15 ml",
    image: RadianceOil,
  },
  {
    id: 4,
    name: "Release",
    function: "Neck & Shoulder Comfort",
    desc: "Release is made for neck and shoulder comfort. It is suitable for gentle massage after a long day, helping the body feel relaxed, lighter, and more comfortable.",
    price: "17.90",
    reviews: 120,
    amount: "15 ml",
    image: ReleaseOil,
  },
  {
    id: 5,
    name: "Flow",
    function: "Body Comfort",
    desc: "Flow is designed for a soothing body-care routine. It helps create a relaxed, comfortable feeling during gentle self-care moments.",
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
    function: "Evening Calm",
    desc: "Peace is made for quiet evening routines and relaxation. It helps create a calm, peaceful atmosphere for rest and self-care.",
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
    price: "21.90",
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
    function: "Skin Nourishment",
    desc: "Nourish is designed for gentle skin care and daily body-care routines. It helps the skin feel soft, smooth, and well cared for.",
    price: "21.90",
    reviews: 98,
    amount: "15 ml",
    image: NourishOil,
  },
  {
    id: 11,
    name: "Calm",
    function: "Headache Comfort",
    desc: "Calm is created for headache comfort and stress relief. It is ideal for quiet relaxation, helping you feel balanced, soothed, and more peaceful after a busy day.",
    price: "23.90",
    reviews: 76,
    amount: "15 ml",
    image: CalmOil,
  },
  {
    id: 12,
    name: "Circle Calm",
    function: "Calm Support",
    desc: "Circle Calm is designed for quiet self-care moments and a peaceful atmosphere. It brings a soft, soothing feel to your everyday routine.",
    price: "24.90",
    reviews: 120,
    amount: "15 ml",
    image: CircleCalmOil,
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
    price: "22.50",
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
    price: "16.90",
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
    price: "23.50",
    reviews: 120,
    amount: "15 ml",
    image: VitalityOil,
  },

    {
    id: 20,
    name: "Mosquito Spray",
    function: "Summer Protection",
    desc: "Mosquito Spray is made for summer outdoor comfort. It helps you enjoy fresh air, garden time, and evening relaxation with a clean and refreshing protective feeling.",
    price: "18.90",
    badge: "Summer",
    reviews: 120,
    amount: "15 ml",
    image: SummerOil,
  },
  {
    id: 21,
    name: "Sauna Relaxation",
    function: "Winter Relaxation",
    desc: "Sauna Relaxation is created for warm winter self-care moments. It supports deep calm, cozy relaxation, and a peaceful sauna-inspired wellness routine.",
    price: "22.90",
    badge: "Winter",
    reviews: 120,
    amount: "15 ml",
    image: WinterOil,
  },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = products.find((item) => item.id === Number(id));

  const addToCart = async () => {
    try {
      await addProductToCart(product.name);
      alert(`${product.name} added to cart`);
    } catch (error) {
      alert(error.message);
    }
  };

  const saveToWishlist = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/shop/product/${id}`, message: "Log in to save products to your wishlist." } });
      return;
    }
    try {
      const apiProduct = await findApiProduct(product.name);
      if (!apiProduct) throw new Error("This product is not available.");
      const result = await apiRequest("/api/account/favorites", {
        method: "POST",
        auth: true,
        body: JSON.stringify({ productId: apiProduct.id }),
      });
      alert(result.favorite ? `${product.name} saved to your wishlist` : `${product.name} is already in your wishlist`);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!product) {
    return (
      <main className="page-shell detail-page">
        <h2>Product not found</h2>
        <Link to="/shop" className="back-link">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page">
        <Link to="/shop" className="back-link">
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
                {Array.from({ length: 10 }, (_, index) => {
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
            <button className="detail-wishlist" type="button" onClick={saveToWishlist}>
              <HiOutlineHeart />
              Save to Wishlist
            </button>
          </div>
        </section>
    </main>
  );
}

export default ProductDetails;
