import { Link } from "react-router-dom";
import "./CustomerCare.css";

const effectiveDate = "31 July 2026";

const shippingPage = {
  kicker: "Customer Care",
  title: "Shipping & Delivery",
  intro: "Clear delivery information for Happy Drops product orders in Finland.",
  sections: [
    { title: "Delivery area", paragraphs: ["We currently deliver product orders within Finland. Available delivery choices and the final delivery charge are shown during checkout."] },
    { title: "Delivery charges", paragraphs: ["Product delivery costs €5.90 for orders below €50. Product orders of €50 or more receive free standard delivery. Workshops and digital services do not include product delivery charges."] },
    { title: "Estimated delivery time", paragraphs: ["Orders are normally prepared within 1–3 business days and delivered within approximately 2–5 business days after dispatch. Weekends, holidays, remote locations, and exceptional demand may add time."] },
    { title: "Order tracking", paragraphs: ["Keep your order number from checkout. You can use it with the order email on the Track Order page to see the latest recorded status."] },
    { title: "Delivery details", paragraphs: ["Customers are responsible for entering a complete name, street address, postal code, city, country, email, and phone number. Contact us promptly if a delivery detail is incorrect."] },
    { title: "Problems with delivery", paragraphs: ["If a package is delayed, damaged, or missing, contact info@happydrops.fi with your order number. Please retain the packaging and photographs when reporting damage."] },
  ],
};

const privacyPage = {
  kicker: "Privacy & Data",
  title: "Privacy Policy",
  intro: "This policy explains how Happy Drops collects, uses, stores, and protects personal data when you use our website, products, workshops, and wellness services.",
  notice: "Happy Drops respects your privacy. We process personal data transparently and only for defined purposes connected with the services you request, our legitimate operations, consent where required, and our legal obligations.",
  sections: [
    {
      title: "Who is responsible for your data?",
      paragraphs: [
        "Happy Drops is the controller of personal data processed through this website. Our contact address is Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki, Finland.",
        "Questions, privacy requests, and concerns can be sent to info@happydrops.fi.",
      ],
    },
    {
      title: "Personal data we collect",
      paragraphs: ["Depending on how you use Happy Drops, we may collect:"],
      bullets: [
        "Identity and account data, including your name, email address, password hash, preferred language, and account role.",
        "Contact and delivery data, including your address, postal code, city, country, and telephone number.",
        "Order and transaction data, including products, quantities, prices, order status, delivery choice, and order reference.",
        "Workshop data, including the selected workshop, theme, location, date, time, participant count, notes, total price, booking status, and payment status.",
        "Wellness data you voluntarily provide in assessments, profiles, or questions, including lifestyle answers, interests, goals, and requested recommendations.",
        "Supplier application data, including company, contact, product, certification, sourcing, and business information.",
        "Saved preferences such as wishlist items and records needed to provide account features.",
        "Technical and usage data such as IP address, browser type, device information, timestamps, security logs, and pages or features used, where enabled by our hosting or analytics tools.",
      ],
    },
    {
      title: "How we collect personal data",
      paragraphs: [
        "We collect data directly from you when you register, complete an assessment, submit a question, place an order, book a workshop, apply as a supplier, contact us, or otherwise use an interactive feature.",
        "Some technical data may be collected automatically by essential cookies, server logs, security tools, and—only where configured and legally permitted—analytics technologies.",
      ],
    },
    {
      title: "Why we use personal data",
      bullets: [
        "To create and secure accounts, authenticate users, and provide profile features.",
        "To process orders, deliveries, workshop bookings, confirmations, cancellations, refunds, and customer support.",
        "To save assessments and provide the wellness information or recommendations you request.",
        "To receive and respond to wellness questions and supplier applications.",
        "To prevent misuse, investigate errors, maintain security, and improve website performance.",
        "To keep business, tax, accounting, transaction, consent, and dispute records required by law.",
        "To send optional marketing only when we have a lawful basis and provide an appropriate way to unsubscribe.",
      ],
    },
    {
      title: "Legal bases for processing",
      paragraphs: ["Under applicable EU data-protection law, our processing may rely on:"],
      bullets: [
        "Performance of a contract or steps requested before a contract, such as account registration, orders, deliveries, and workshop bookings.",
        "Consent, particularly for optional marketing and for wellness information where explicit consent is required.",
        "Compliance with legal obligations, including accounting, taxation, consumer protection, and lawful authority requests.",
        "Our legitimate interests in operating, securing, supporting, and improving Happy Drops, provided those interests do not override your rights.",
      ],
    },
    {
      title: "Wellness and other sensitive information",
      paragraphs: [
        "Assessment answers and wellness questions may reveal information about health or wellbeing. You decide whether to provide this information. Where the data qualifies as special-category data, we process it only with an appropriate legal basis, such as your explicit consent, and only for the service you requested.",
        "Happy Drops wellness content is educational and is not an emergency, diagnosis, prescription, or medical-treatment service. Avoid submitting information that is unnecessary for your request.",
      ],
    },
    {
      title: "Payments",
      paragraphs: [
        "The current website does not store complete payment-card numbers. When online payment processing is activated, card details should be entered directly into the secure service of the selected payment provider. That provider will process payment data under its own privacy notice.",
        "Happy Drops may retain transaction references, amounts, currencies, payment status, refund status, and other records needed to administer the purchase.",
      ],
    },
    {
      title: "When we share personal data",
      paragraphs: ["We do not sell personal data. We may disclose only the data reasonably necessary to:"],
      bullets: [
        "Hosting, database, email, payment, delivery, analytics, security, and technical-support providers acting on our behalf.",
        "Workshop personnel or service partners who need booking information to deliver the selected service.",
        "Professional advisers, insurers, auditors, or authorities where access is legally justified.",
        "A successor organisation in a genuine merger, restructuring, or transfer of the business, subject to applicable safeguards.",
      ],
    },
    {
      title: "International transfers",
      paragraphs: [
        "We aim to use providers that process data in Finland or the European Economic Area. If personal data is transferred outside the EEA, we will use a lawful transfer mechanism and appropriate safeguards, such as an adequacy decision or approved contractual clauses, where required.",
      ],
    },
    {
      title: "How long we keep data",
      paragraphs: [
        "We retain personal data only for as long as it is needed for the purpose for which it was collected, including service delivery, account administration, legal retention, security, and dispute handling.",
        "Retention periods vary by record type. Account and optional wellness data may be removed or anonymised when no longer needed or following an eligible deletion request. Transaction and accounting records may be retained for the period required by Finnish law.",
      ],
    },
    {
      title: "How we protect personal data",
      paragraphs: [
        "We use reasonable organisational and technical measures designed to protect personal data, including access controls, password hashing, authenticated administration, database permissions, secure connections in production, updates, backups, and monitoring appropriate to the service.",
        "No online system can be guaranteed completely secure. Please use a strong, unique password and notify us if you suspect unauthorised account access.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: ["Subject to applicable law and exceptions, you may have the right to:"],
      bullets: [
        "Request access to and a copy of your personal data.",
        "Correct inaccurate or incomplete personal data.",
        "Request deletion or restriction of eligible personal data.",
        "Object to processing based on legitimate interests or to direct marketing.",
        "Withdraw consent at any time without affecting processing already carried out lawfully.",
        "Receive eligible data in a structured, commonly used, machine-readable format.",
        "Submit a complaint to the Office of the Data Protection Ombudsman in Finland.",
      ],
      closing: "To exercise a right, email info@happydrops.fi. We may need to verify your identity before completing the request.",
    },
    {
      title: "Cookies and similar technologies",
      paragraphs: [
        "Essential storage may be used to keep the website secure, maintain sessions, remember necessary choices, and support cart or account functions. Non-essential analytics or advertising technologies should be activated only with the consent required by law.",
        "You can control cookies through available website controls and your browser settings, although disabling essential storage may prevent some features from working.",
      ],
    },
    {
      title: "Children",
      paragraphs: [
        "Happy Drops is not intended for children to create accounts or make purchases independently. A parent or legal guardian should provide and supervise any information concerning a minor. Contact us if you believe a child has provided personal data without appropriate authorisation.",
      ],
    },
    {
      title: "Third-party links and services",
      paragraphs: [
        "Our website may link to external websites or use independent providers. Their privacy practices are governed by their own notices. Happy Drops is not responsible for services we do not own or control.",
      ],
    },
    {
      title: "Changes to this policy",
      paragraphs: [
        "We may update this policy when our services, providers, or legal obligations change. The effective date at the top identifies the latest version. Material changes will be highlighted appropriately.",
      ],
    },
    {
      title: "Contact us",
      paragraphs: [
        "Email: info@happydrops.fi",
        "Postal address: Happy Drops, Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki, Finland.",
      ],
    },
  ],
};

const termsPage = {
  kicker: "Website & Services",
  title: "Terms & Conditions",
  intro: "These terms govern your access to the Happy Drops website and your use of our accounts, products, workshops, wellness information, and related services.",
  notice: "Please read these terms before using the website or submitting an order or booking. By continuing to use Happy Drops, you agree to these terms. Mandatory consumer rights under Finnish and EU law remain unaffected.",
  sections: [
    {
      title: "About Happy Drops",
      paragraphs: [
        "The website is operated by Happy Drops from Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki, Finland. You can contact us at info@happydrops.fi.",
        "The registered business name, Business ID, and other mandatory trader information must be displayed here before commercial production launch.",
      ],
    },
    {
      title: "Eligibility and acceptance",
      paragraphs: [
        "You must have the legal capacity required to use the service or make a purchase. A minor may use the website only with the involvement and permission of a parent or legal guardian.",
        "If you do not agree to these terms, do not create an account, submit information, place an order, or book a workshop.",
      ],
    },
    {
      title: "Accounts and security",
      bullets: [
        "Provide accurate, current, and complete registration and contact information.",
        "Keep your password confidential and use a unique password that is not shared with another service.",
        "Notify us promptly if you suspect unauthorised access or misuse.",
        "Do not access another person’s account or falsely claim an identity, role, business, qualification, or affiliation.",
      ],
      closing: "We may temporarily restrict an account where reasonably necessary to investigate fraud, abuse, security concerns, or a material breach of these terms.",
    },
    {
      title: "Wellness and health information",
      paragraphs: [
        "Happy Drops provides general educational wellness content, lifestyle information, product information, assessments, and recommendations. This content is not medical advice and does not diagnose, treat, cure, or prevent a disease.",
        "Always follow product labels and safety instructions. Consult an appropriate healthcare professional before using essential oils, supplements, or wellness practices if you are pregnant, nursing, taking medication, managing a health condition, preparing a product for a child, or unsure whether it is suitable.",
        "Do not use this website for emergencies. Contact the appropriate emergency service or qualified medical professional when urgent help is needed.",
      ],
    },
    {
      title: "Products and availability",
      paragraphs: [
        "We aim to present product names, images, ingredients, sizes, descriptions, availability, and prices accurately. Colours and packaging may appear differently depending on the device or may change without altering the product’s essential characteristics.",
        "Products and promotional offers are subject to availability. We may limit quantities, discontinue an item, or correct an obvious catalogue, stock, or pricing error. If an error affects an order, we will contact you and provide the choices required by applicable law.",
      ],
    },
    {
      title: "Orders and contract formation",
      paragraphs: [
        "Adding an item to a cart does not reserve it. Submitting checkout information is an offer to purchase. An automatic acknowledgement means we received the request; a binding sales contract is formed only when we expressly accept the order or dispatch the products, depending on the confirmation provided.",
        "We may refuse or cancel an order for legitimate reasons such as unavailability, suspected fraud, an obvious error, delivery restrictions, or failure to authorise payment. Any amount already collected for a cancelled order will be handled in accordance with applicable law.",
      ],
    },
    {
      title: "Prices and payment",
      paragraphs: [
        "Prices are displayed in euros. Before a paid launch, checkout must clearly identify whether prices include applicable VAT and show delivery charges and the final total before the order is submitted.",
        "The current checkout is a prototype and does not process real online payments. When a payment provider is activated, payment is subject to its secure authorisation process and any additional terms shown during checkout. Never send full card details by email or through a general contact form.",
      ],
    },
    {
      title: "Shipping and delivery",
      paragraphs: [
        "Available delivery areas, charges, and estimates are described on our Shipping & Delivery page and during checkout. Delivery dates are estimates unless expressly agreed otherwise.",
        "You are responsible for providing accurate delivery and contact information. Risk and ownership pass as required by applicable consumer law. Contact us promptly about missing, delayed, incomplete, or damaged deliveries.",
      ],
    },
    {
      title: "Cancellations, returns, and refunds",
      paragraphs: [
        "Consumers may have a statutory right to cancel eligible distance purchases within the period provided by law. Exceptions may apply, including certain sealed hygiene goods after opening, personalised goods, perishable goods, or services already performed with the consumer’s prior request and acknowledgement.",
        "Before commercial launch, Happy Drops must publish final return instructions, the withdrawal form, return address, return-cost rules, refund timing, and any lawful product-specific exceptions. Nothing in these terms limits mandatory rights relating to faulty or non-conforming goods.",
      ],
    },
    {
      title: "Workshop bookings",
      paragraphs: [
        "Workshop descriptions identify the theme, location, available dates and times, participant requirements, and price. A booking request is not confirmed until the status and any payment requirements shown to you have been satisfied.",
        "You must provide accurate participant information and disclose only information reasonably required for safe participation. Follow the venue rules and reasonable safety instructions provided by the organiser.",
        "Workshop cancellation, rescheduling, substitution, minimum attendance, and refund terms must be displayed before a paid booking becomes binding. We will communicate material changes using the contact information supplied with the booking.",
      ],
    },
    {
      title: "Your submissions",
      paragraphs: [
        "You retain ownership of questions, reviews, application materials, photographs, text, and other content you submit. You confirm that you have the right to provide that content and that it is accurate, lawful, and does not infringe another person’s privacy or intellectual-property rights.",
        "You give Happy Drops a non-exclusive right to store, process, reproduce, and display your submission only as reasonably necessary to provide, secure, administer, or improve the requested service. We will request additional permission before using an identifiable review or image in public marketing where required.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "The Happy Drops name, logos, website design, text, graphics, product presentation, photographs, software, and other original content are owned by or licensed to Happy Drops and protected by applicable intellectual-property laws.",
        "We grant you a limited, revocable, non-exclusive, non-transferable right to access and use the website for lawful personal purposes. No ownership rights are transferred to you.",
      ],
    },
    {
      title: "Acceptable use",
      paragraphs: ["You must not:"],
      bullets: [
        "Use the website unlawfully, fraudulently, or in a manner that infringes another person’s rights.",
        "Interfere with security, attempt unauthorised access, introduce malicious code, overload the service, or bypass access controls.",
        "Scrape, harvest, copy, republish, sell, reverse engineer, or commercially exploit the website or its content except where expressly permitted by law or written permission.",
        "Submit misleading, defamatory, abusive, discriminatory, obscene, dangerous, or infringing material.",
        "Use another person’s personal data without a valid reason and appropriate authority.",
      ],
    },
    {
      title: "Third-party services and links",
      paragraphs: [
        "The website may rely on or link to independent services such as payment, delivery, maps, social media, or external information sources. Their separate terms and privacy notices apply. A link does not necessarily mean that Happy Drops endorses all external content.",
      ],
    },
    {
      title: "Availability and changes",
      paragraphs: [
        "We aim to keep the website accurate and available but cannot promise uninterrupted or error-free operation. We may maintain, update, secure, suspend, or change features where reasonably necessary.",
        "We may update these terms to reflect service, legal, security, or operational changes. The effective date identifies the current version. Changes will not remove rights already acquired under a confirmed consumer contract unless permitted by law.",
      ],
    },
    {
      title: "Responsibility and liability",
      paragraphs: [
        "You are responsible for following instructions, providing accurate information, and using products and services appropriately. Happy Drops is not responsible for loss caused by unlawful misuse, ignored safety information, inaccurate customer information, or events genuinely outside our reasonable control.",
        "To the maximum extent allowed by law, we do not accept liability for indirect or unforeseeable losses arising from general website use. Nothing in these terms excludes or limits liability that cannot legally be excluded, including mandatory consumer remedies or liability for intentional or grossly negligent conduct where applicable.",
      ],
    },
    {
      title: "Privacy",
      paragraphs: [
        "Our Privacy Policy explains how personal data is processed. By using the website, you acknowledge that policy; consent is requested separately where consent is the required legal basis.",
      ],
    },
    {
      title: "Governing law and disputes",
      paragraphs: [
        "These terms are governed by Finnish law, without removing mandatory protections available to consumers in their country of residence.",
        "Please contact info@happydrops.fi first so we can try to resolve a concern. Finnish consumers may also seek guidance from the Finnish Competition and Consumer Authority’s Consumer Advisory Services and refer an eligible dispute to the Finnish Consumer Disputes Board. You may also use any court or dispute process available under mandatory law.",
      ],
    },
    {
      title: "Contact us",
      paragraphs: [
        "Email: info@happydrops.fi",
        "Postal address: Happy Drops, Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki, Finland.",
      ],
    },
  ],
};

const pages = {
  shipping: shippingPage,
  privacy: privacyPage,
  terms: termsPage,
};

const sectionId = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function CustomerCare({ type }) {
  const page = pages[type] || shippingPage;
  const isLegalPage = type === "privacy" || type === "terms";

  return (
    <main className={`care-page page-shell ${isLegalPage ? "care-page-legal" : ""}`}>
      <header className="care-hero">
        <p className="section-kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        {isLegalPage && <p className="care-effective">Effective date: {effectiveDate}</p>}
      </header>

      {isLegalPage && (
        <>
          <section className="care-notice" aria-label={`${page.title} introduction`}>
            <p>{page.notice}</p>
          </section>
          <nav className="care-contents" aria-label={`${page.title} contents`}>
            <h2>On this page</h2>
            <ol>
              {page.sections.map((section) => (
                <li key={section.title}>
                  <a href={`#${sectionId(section.title)}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </>
      )}

      <section className="care-content">
        {page.sections.map((section, index) => (
          <article id={sectionId(section.title)} key={section.title}>
            {isLegalPage && <span className="care-section-number">{String(index + 1).padStart(2, "0")}</span>}
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {section.closing && <p>{section.closing}</p>}
          </article>
        ))}
      </section>

      <aside className="care-help">
        <div>
          <h2>Need help?</h2>
          <p>Contact Happy Drops and include your order or booking number when relevant.</p>
        </div>
        <a href="mailto:info@happydrops.fi">info@happydrops.fi</a>
        <Link to="/track-order">Track an order</Link>
      </aside>
    </main>
  );
}

export default CustomerCare;
