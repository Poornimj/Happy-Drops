import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineTrash } from "react-icons/hi";
import { apiRequest } from "../lib/api";
import "./Cart.css";

const productAssets = import.meta.glob("../assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const productImageNames = {
  Dew: "Shop_SkinMoisturesHover.png",
  Timeless: "Shop_AntiWrinclesHover.png",
  Radiance: "Shop_SkinTightningsHover.png",
  Release: "Shop_StressReliefsHover.png",
  Flow: "Shop_WaistEassesHover.png",
  Stride: "Shop_JointEasesHover.png",
  Peace: "Shop_SleepSupportOilHover.png",
  Bloom: "Shop_BoostHairGrowthsHover.png",
  Clarity: "Shop_ConcentrationOilHover.png",
  Nourish: "Shop_SkinCaresHover.png",
  Calm: "Shop_HeadacheReliefsHover.png",
  "Circle Calm": "Shop_CircleCalm_Hover.png",
  Balance: "Shop_HealthylifeHover.png",
  Harmony: "Shop_SleepSupportOilHover.png",
  Passion: "Shop_VitalityOilHover.png",
  Grace: "Shop_FeminineHover.png",
  Joy: "Shop_JoyMoodHover.png",
  Presence: "Shop_MeditationHover.png",
  Vitality: "Shop_EnergyBoostHover.png",
  "Mosquito Spray": "Shop_MosquitoSpray.png",
  "Sauna Relaxation": "Shop_SaunaRelaxation.png",
  "Magic Sauce": "food-magic-sauce-new.png",
  "Biotin Beauty Supplement": "food-biotin-beauty-supplement-new.png",
  "Extra Virgin Olive Oil": "food-extra-virgin-olive-oil-new.png",
  "Hemp Seed Oil": "food-hemp-seed-oil-new.png",
  Kombucha: "kombucha.png",
  Kefir: "FoodR_Kefir.png",
};

const productImages = Object.fromEntries(
  Object.entries(productImageNames).map(([name, filename]) => [
    name,
    productAssets[`../assets/images/${filename}`],
  ])
);

const money = (value) => new Intl.NumberFormat("en-FI", {
  style: "currency",
  currency: "EUR",
}).format(Number(value));

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const loadCart = () => apiRequest("/api/cart", { auth: true })
    .then(({ cart: current }) => setCart(current))
    .catch((requestError) => setError(requestError.message));

  useEffect(() => { loadCart(); }, []);

  const updateQuantity = async (item, quantity) => {
    setBusyId(item.id);
    setError("");
    try {
      const result = await apiRequest(`/api/cart/items/${item.id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ quantity }),
      });
      setCart(result.cart);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const removeItem = async (item) => {
    setBusyId(item.id);
    setError("");
    try {
      const result = await apiRequest(`/api/cart/items/${item.id}`, {
        method: "DELETE",
        auth: true,
      });
      setCart(result.cart);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const checkout = () => {
    const items = cart.items.map((item) => ({
      productId: item.product_id,
      name: item.name,
      quantity: item.quantity,
      price: Number(item.price),
    }));
    navigate("/checkout", {
      state: {
        checkout: {
          type: "cart",
          title: "Your Happy Drops order",
          description: `${items.length} product${items.length === 1 ? "" : "s"}`,
          items,
          unitPrice: Number(cart.subtotal),
          quantity: 1,
          shipping: Number(cart.subtotal) >= 50 ? 0 : 5.9,
          tax: 0,
        },
      },
    });
  };

  if (!cart) {
    return <main className="cart-page"><p>{error || "Loading your cart…"}</p></main>;
  }

  return (
    <main className="cart-page">
      <section className="cart-heading">
        <span><HiOutlineShoppingBag /></span>
        <div>
          <p>YOUR SHOPPING BAG</p>
          <h1>Your Cart</h1>
          <small>{cart.items.length} item{cart.items.length === 1 ? "" : "s"} selected</small>
        </div>
      </section>

      {error && <p className="cart-error" role="alert">{error}</p>}

      {cart.items.length === 0 ? (
        <section className="cart-empty">
          <HiOutlineShoppingBag />
          <h2>Your cart is empty</h2>
          <p>Explore Happy Drops products and add something that supports your daily wellness.</p>
          <Link to="/shop">Continue Shopping</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            {cart.items.map((item) => (
              <article className="cart-item-card" key={item.id}>
                <div className="cart-item-mark">
                  {productImages[item.name] ? (
                    <img src={productImages[item.name]} alt={item.name} />
                  ) : (
                    <span aria-hidden="true">{item.name.slice(0, 1)}</span>
                  )}
                </div>
                <div className="cart-item-copy">
                  <p>{item.sku}</p>
                  <h2>{item.name}</h2>
                  <span>{money(item.price)} each</span>
                </div>
                <label>
                  Quantity
                  <select
                    value={item.quantity}
                    disabled={busyId === item.id}
                    onChange={(event) => updateQuantity(item, Number(event.target.value))}
                  >
                    {Array.from({ length: Math.min(10, item.stock_quantity) }, (_, index) => index + 1)
                      .map((value) => <option key={value}>{value}</option>)}
                  </select>
                </label>
                <strong>{money(Number(item.price) * item.quantity)}</strong>
                <button
                  type="button"
                  disabled={busyId === item.id}
                  onClick={() => removeItem(item)}
                  aria-label={`Remove ${item.name}`}
                >
                  <HiOutlineTrash />
                </button>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div><span>Subtotal</span><strong>{money(cart.subtotal)}</strong></div>
            <div><span>Estimated delivery</span><strong>{Number(cart.subtotal) >= 50 ? "Free" : money(5.9)}</strong></div>
            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{money(Number(cart.subtotal) + (Number(cart.subtotal) >= 50 ? 0 : 5.9))}</strong>
            </div>
            <button type="button" onClick={checkout}>Proceed to Checkout</button>
            <Link to="/shop">Continue Shopping</Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
