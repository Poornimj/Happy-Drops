import { Link } from "react-router-dom";
import "./CustomerCare.css";

const pages = {
  shipping: {
    kicker: "Customer Care",
    title: "Shipping & Delivery",
    intro: "Clear delivery information for Happy Drops product orders in Finland.",
    sections: [
      ["Delivery area", "We currently deliver product orders within Finland. Available delivery choices and the final delivery charge are shown during checkout."],
      ["Delivery charges", "Product delivery costs €5.90 for orders below €50. Product orders of €50 or more receive free standard delivery. Workshops and digital services do not include product delivery charges."],
      ["Estimated delivery time", "Orders are normally prepared within 1–3 business days and delivered within approximately 2–5 business days after dispatch. Weekends, holidays, remote locations, and exceptional demand may add time."],
      ["Order tracking", "Keep your order number from checkout. You can use it with the order email on the Track Order page to see the latest recorded status."],
      ["Delivery details", "Customers are responsible for entering a complete name, street address, postal code, city, country, email, and phone number. Contact us promptly if a delivery detail is incorrect."],
      ["Problems with delivery", "If a package is delayed, damaged, or missing, contact info@happydrops.com with your order number. Please retain the packaging and photographs when reporting damage."],
    ],
  },
  privacy: {
    kicker: "Customer Care",
    title: "Privacy Policy",
    intro: "How Happy Drops handles account, wellness, workshop, supplier, and order information.",
    sections: [
      ["Information we collect", "We collect information customers choose to provide, including account details, contact information, delivery addresses, wellness-profile answers, assessments, questions, workshop requests, supplier applications, favorites, and order details."],
      ["How information is used", "Information is used to provide accounts, recommendations, customer support, orders, workshops, saved items, supplier reviews, security, and service administration."],
      ["Wellness information", "Wellness answers may be sensitive. They are stored for the customer’s requested profile and services and are available only through authenticated or authorized workflows. Happy Drops does not provide emergency or medical diagnosis services."],
      ["Payments", "The current website uses a payment prototype and does not store complete payment-card numbers. When a real payment provider is connected, its own privacy terms will also apply."],
      ["Sharing and protection", "We do not sell personal information. Information may be shared only with service providers needed to operate delivery, hosting, communications, or payments, or when legally required. Reasonable technical and organizational safeguards are used."],
      ["Your choices", "Customers may request access, correction, or deletion of eligible personal information and may withdraw optional consent. Some records may need to be retained for legal, accounting, fraud-prevention, or contractual reasons."],
      ["Contact", "Privacy questions and requests can be sent to info@happydrops.com. Published legal contact and company-registration details should be added before production launch."],
    ],
  },
  terms: {
    kicker: "Customer Care",
    title: "Terms & Conditions",
    intro: "Important conditions for using Happy Drops accounts, products, workshops, and information.",
    sections: [
      ["Using the website", "Customers must provide accurate information, protect their login credentials, and use the website lawfully. Accounts may be restricted when misuse, fraud, or security risks are identified."],
      ["Wellness information", "Website content and personalized wellness information are educational and are not a substitute for diagnosis, treatment, or advice from a qualified healthcare professional. Seek urgent medical help when appropriate."],
      ["Products and availability", "Product descriptions and prices are presented in euros and may be updated. Orders are subject to availability and confirmation. Obvious pricing or catalogue errors may be corrected."],
      ["Orders and payment", "An order reference confirms that an order record was received. The current checkout is a prototype and does not process real online payments. Binding payment and fulfillment rules must be updated when a payment provider is activated."],
      ["Workshops", "Workshop availability, participant limits, location, price, and cancellation conditions are displayed during booking. A request is not finally confirmed until its displayed approval and payment requirements are satisfied."],
      ["Cancellations and returns", "Applicable consumer rights remain unaffected. Product-return, workshop-cancellation, refund, hygiene-product, and custom-product rules must be finalized with Finnish/EU legal review before commercial launch."],
      ["Liability and changes", "Happy Drops is not responsible for losses caused by misuse, incorrect customer information, or events outside reasonable control, subject to mandatory law. These terms may be updated when services change."],
      ["Contact", "Questions can be sent to info@happydrops.com. These operational terms require review and completion with the registered company details before public commercial launch."],
    ],
  },
};

function CustomerCare({ type }) {
  const page = pages[type];
  return (
    <main className="care-page page-shell">
      <header className="care-hero">
        <p className="section-kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </header>
      <section className="care-content">
        {page.sections.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <aside className="care-help">
        <div>
          <h2>Need help?</h2>
          <p>Contact Happy Drops and include your order number when your question concerns an order.</p>
        </div>
        <a href="mailto:info@happydrops.com">info@happydrops.com</a>
        <Link to="/track-order">Track an order</Link>
      </aside>
    </main>
  );
}

export default CustomerCare;
