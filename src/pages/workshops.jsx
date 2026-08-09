import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import {
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuCalendarHeart,
  LuLeaf,
  LuMapPin,
  LuPalette,
  LuShieldCheck,
  LuSoup,
  LuTimer,
} from "react-icons/lu";
import workshopHeader from "../assets/images/workshop-header.png";
import workshopEssentialOil from "../assets/images/workshops-essential-oil.png";
import workshopOilCard from "../assets/images/workshop-essential-oil-new.png";
import workshopDumplingCard from "../assets/images/workshop-dumpling-new.png";
import workshopSpecialEventCard from "../assets/images/workshop- specialevent2.png";
import workshopOfficeCard from "../assets/images/workshop-office.png";
import workshopSummaryImage from "../assets/images/workshop-summary-image.png";
import kombuchaMenuImage from "../assets/images/kombucha.png";
import saladMenuImage from "../assets/images/salad.png";
import workshopDrinksMenuImage from "../assets/images/workshop-drinks-menu.png";
import "../index.css";

const workshops = [
  {
    title: "Essential Oil Workshop",
    text: "Learn how essential oils can support common wellness questions in a natural and practical way.",
    icon: LuLeaf,
    color: "green",
    sheet: workshopEssentialOil,
    price: 48,
    date: "25 August 2026",
    time: "14:00",
    location: "Happy Drops Studio, Helsinki",
    duration: 120,
  },
  {
    title: "Dumpling DIY + Nutrition Workshop",
    text: "Enjoy a hands-on dumpling-making experience while learning simple nutrition tips",
    icon: LuSoup,
    color: "purple",
    sheet: workshopDumplingCard,
    price: 55,
    date: "30 August 2026",
    time: "12:00",
    location: "Happy Drops Studio, Helsinki",
    duration: 120,
  },
  {
    title: "Special Event Workshop",
    text: "Wellness and happiness activities created for celebrations, retreats, families, and groups of friends.",
    icon: LuCalendarHeart,
    color: "rose",
    sheet: workshopSpecialEventCard,
    price: 65,
    date: "By arrangement",
    time: "Flexible",
    location: "Your chosen venue",
    duration: 120,
  },
  {
    title: "Business Purpose Workshop",
    text: "Purposeful corporate wellness activities for stronger connections, teamwork, and productive business events.",
    icon: LuBriefcaseBusiness,
    color: "gold",
    sheet: workshopOfficeCard,
    price: 48,
    date: "By arrangement",
    time: "Flexible",
    location: "Company venue or Happy Drops Studio",
    duration: 120,
  },
];

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const planWorkshopCards = [
  {
    title: "Essential Oil Workshop",
    image: workshopOilCard,
  },
  {
    title: "Dumpling DIY + Nutrition Workshop",
    image: workshopDumplingCard,
  },
  {
    title: "Special Event Workshop",
    image: workshopSpecialEventCard,
  },
  {
    title: "Business Purpose Workshop",
    image: workshopOfficeCard,
  },
];

const upcomingWorkshopTitles = new Set([
  "Essential Oil Workshop",
  "Dumpling DIY + Nutrition Workshop",
]);

const tailorMadeWorkshopTitles = new Set([
  "Special Event Workshop",
  "Business Purpose Workshop",
]);

const tailorMadeWorkshopDetails = {
  "Special Event Workshop": {
    lead: "If you are looking for wellness and happiness activities to enjoy with friends or family, we will create a meaningful experience around your special occasion.",
    idealFor: "Birthday parties, bachelor or bachelorette parties, anniversary celebrations, weekend retreats, family gatherings, friendship groups, and other private occasions.",
    includes: [
      "A workshop theme personalized for your occasion",
      "Guided wellness activities led by an experienced facilitator",
      "Flexible venue, date, time, and group-size planning",
      "Options for essential oils, relaxation, nutrition, or creative activities",
    ],
  },
  "Business Purpose Workshop": {
    lead: "Bring people together through a tailored corporate wellness experience that supports communication, connection, teamwork, and a positive working culture.",
    idealFor: "VC and CEO bridge-building sessions, teamwork days, Pikkujoulu celebrations, board meetings, leadership events, staff wellbeing days, and company retreats.",
    includes: [
      "A program shaped around your team’s wellbeing goals",
      "Professional guided activities suitable for the workplace",
      "Flexible delivery at your company venue or an agreed location",
      "Options for stress support, energy, focus, relaxation, and healthy routines",
    ],
  },
};

const workshopLocations = [
  "Rautatiekatu 16A, Kamppi",
  "Pilvijärventie 50 C, Kirkkonummi",
  "Villa Stenberg, Suoniementaival 164, 08350 Lohja",
  "XR Center, Hämeentie 135 A, 00560 Helsinki",
];

const healthyMenuItems = [
  { name: "Signature Salads", subtitle: "Five Nordic wellness bowls", image: saladMenuImage, category: "salads" },
  { name: "Dumplings", subtitle: "3 flavours, 7 pieces per portion", image: workshopDumplingCard, category: "dumplings" },
  { name: "Kombucha", subtitle: "€5.00 each", image: kombuchaMenuImage, category: "kombucha" },
  { name: "Tea, Coffee & Soft Drinks", subtitle: "Choose drinks and servings", image: workshopDrinksMenuImage, category: "drinks" },
];

const dumplingOptions = [
  { label: "Meat & Vegetable", value: "Dumplings — Meat & Vegetable" },
  { label: "Chicken & Vegetable", value: "Dumplings — Chicken & Vegetable" },
  { label: "Vegetable", value: "Dumplings — Vegetable" },
];

const signatureWellnessBowls = [
  {
    name: "Nordic Glow Bowl",
    tagline: "Nourish your body. Calm your mind. Glow from within.",
    description: "Our signature bowl combines Finnish berries, seasonal vegetables, sustainable salmon, wholesome ingredients, healthy fats, and fresh Nordic herbs.",
    ingredients: ["Baby spinach", "Kale", "Roasted broccoli", "Purple cabbage", "Roasted beetroot", "Carrots", "Bilberries or blueberries", "Avocado", "Edamame", "Roasted salmon (optional)", "Walnuts", "Pumpkin seeds", "Fresh dill", "Microgreens", "Olive oil and lemon dressing"],
    highlights: ["35–40 g protein with salmon", "15–20 g fibre", "Omega-3 and healthy fats", "Calcium and magnesium", "Vitamins C, D, and K", "Polyphenols and phytoestrogens", "Supports gut, brain, heart, and muscle health"],
  },
  {
    name: "Forever Young Salad",
    tagline: "Healthy Aging • Anti-Inflammatory • Brain Health • Gut Health",
    description: "Created for anyone who wants to age gracefully while maintaining energy, mental clarity, and overall vitality.",
    ingredients: ["Baby spinach", "Kale", "Mixed salad greens", "Roasted broccoli", "Purple cabbage", "Carrots", "Beetroot", "Blueberries or bilberries", "Avocado", "Chickpeas", "Pumpkin seeds", "Walnuts", "Ground flaxseed", "Fresh parsley and dill", "Olive oil and lemon dressing"],
    highlights: ["Rich in antioxidants", "High in fibre", "Supports the gut microbiome", "Supports brain and heart health", "Source of vitamins C, K, and folate"],
  },
  {
    name: "The Happy Hormone Bowl",
    tagline: "Women Around 50 • Hormone Balance • Bone Health • Heart Health",
    description: "Thoughtfully created for women during perimenopause and menopause to support stable energy, muscle maintenance, and bone health.",
    ingredients: ["Baby spinach", "Kale", "Broccoli", "Edamame", "Roasted salmon", "Avocado", "Roasted sweet potato", "Blueberries", "Pumpkin seeds", "Ground flaxseed", "Sesame seeds", "Walnuts", "Fresh dill", "Olive oil and lemon dressing"],
    highlights: ["High-quality protein", "Omega-3 fatty acids", "Natural phytoestrogens from soy and flaxseed", "Calcium, magnesium, and vitamin K", "High in fibre"],
  },
  {
    name: "Aurora Glow Bowl",
    tagline: "Skin Health • Beauty from Within • Collagen Support",
    description: "Inspired by the Northern Lights and filled with colourful vegetables and antioxidant-rich berries to nourish healthy skin.",
    ingredients: ["Baby spinach", "Rocket", "Red and yellow peppers", "Carrots", "Tomatoes", "Cucumber", "Blueberries", "Seasonal strawberries", "Avocado", "Grilled chicken or smoked trout", "Sunflower seeds", "Almonds", "Fresh mint", "Citrus vinaigrette"],
    highlights: ["Vitamin C to support collagen production", "Vitamin E", "Healthy fats for skin hydration", "Antioxidant-rich ingredients", "Lean protein for tissue maintenance"],
  },
  {
    name: "Nordic Vitality Bowl",
    tagline: "Active Lifestyle • Muscle Recovery • Sustained Energy",
    description: "A balanced, nutrient-dense bowl designed to support an active lifestyle with quality protein, vegetables, and wholesome carbohydrates.",
    ingredients: ["Mixed leafy greens", "Quinoa", "Roasted salmon or grilled chicken", "Broccoli", "Green beans", "Roasted carrots", "Beetroot", "Mushrooms", "Blueberries", "Pumpkin seeds", "Walnuts", "Fresh herbs", "Olive oil and lemon dressing"],
    highlights: ["Quality protein for muscle maintenance", "Complex carbohydrates for sustained energy", "Omega-3 fatty acids", "Potassium and magnesium", "High in fibre"],
  },
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date,
      isCurrentMonth: date.getMonth() === month,
    };
  });
}

function sessionFields(session, fallbackDuration = 120) {
  const start = session?.starts_at ? new Date(session.starts_at) : null;
  const end = session?.ends_at ? new Date(session.ends_at) : null;
  const duration = start && end ? Math.max(15, Math.round((end - start) / 60000)) : fallbackDuration;
  return {
    id: session?.id || null,
    date: start ? `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}` : "",
    time: start ? `${String(start.getHours()).padStart(2, "0")}:${String(start.getMinutes()).padStart(2, "0")}` : "",
    place: session?.location || "",
    duration,
    capacity: session?.capacity || 30,
  };
}

function displaySession(session, fallback) {
  if (!session?.starts_at) return {
    id: null,
    isoDate: "",
    date: fallback.date,
    time: fallback.time,
    place: fallback.location,
    duration: formatDuration(fallback.duration),
  };
  const fields = sessionFields(session, fallback.duration);
  const value = new Date(session.starts_at);
  return {
    id: session.id,
    isoDate: fields.date,
    date: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(value),
    time: new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(value),
    place: fields.place,
    duration: formatDuration(fields.duration),
  };
}

function formatDuration(minutes) {
  const value = Number(minutes);
  if (!Number.isFinite(value) || value <= 0) return "To be confirmed";
  const hours = Math.floor(value / 60);
  const remainingMinutes = value % 60;
  if (!hours) return `${remainingMinutes} minutes`;
  if (!remainingMinutes) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${hours} h ${remainingMinutes} min`;
}

function displaySchedule(databaseWorkshop, fallback) {
  return displaySession(databaseWorkshop?.sessions?.[0], fallback);
}

export default function Workshops() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeWorkshop, setActiveWorkshop] = useState(workshops[0]);
  const [tailorMadeWorkshop, setTailorMadeWorkshop] = useState(workshops[2]);
  const [openWorkshopSheet, setOpenWorkshopSheet] = useState(null);
  const [openWorkshopRequest, setOpenWorkshopRequest] = useState(null);
  const [openTailorInfo, setOpenTailorInfo] = useState(null);
  const [openUpcomingBooking, setOpenUpcomingBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [isPlanRequestSubmitted, setIsPlanRequestSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [adminLocation, setAdminLocation] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [workshopThemes, setWorkshopThemes] = useState({});
  const [workshopSessionDrafts, setWorkshopSessionDrafts] = useState({});
  const [apiWorkshops, setApiWorkshops] = useState([]);
  const [participantCount, setParticipantCount] = useState(1);
  const [bookingNotes, setBookingNotes] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [adminWorkshopMessage, setAdminWorkshopMessage] = useState({});
  const [isSavingWorkshop, setIsSavingWorkshop] = useState(null);
  const [bookingRecords, setBookingRecords] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminWorkshopFilter, setAdminWorkshopFilter] = useState("");
  const [adminDateFilter, setAdminDateFilter] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState("");
  const [adminPage, setAdminPage] = useState(1);
  const [adminSummary, setAdminSummary] = useState({ total_bookings: 0, total_participants: 0, total_price: 0 });
  const [adminPagination, setAdminPagination] = useState({ page: 1, totalPages: 1 });
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [openMenuCategory, setOpenMenuCategory] = useState("salads");
  const [selectedWellnessBowls, setSelectedWellnessBowls] = useState([]);
  const [selectedHealthyMenuItems, setSelectedHealthyMenuItems] = useState([]);
  const [allergyStatus, setAllergyStatus] = useState("");
  const calendarDays = getCalendarDays(calendarMonth);
  const activeApiWorkshop = apiWorkshops.find((item) => item.title === activeWorkshop.title);
  const tailorMadeApiWorkshop = apiWorkshops.find((item) => item.title === tailorMadeWorkshop.title);
  const calendarMonthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);
  const locationBookingRecords = bookingRecords.filter((item) => item.location === adminLocation);

  const getAdminRequestQuery = useCallback((exportAll = false) => {
    const params = new URLSearchParams();
    if (adminLocation) params.set("location", adminLocation);
    if (adminSearch.trim()) params.set("search", adminSearch.trim());
    if (adminWorkshopFilter) params.set("workshopId", adminWorkshopFilter);
    if (adminDateFilter) params.set("date", adminDateFilter);
    if (adminStatusFilter) params.set("status", adminStatusFilter);
    if (exportAll) params.set("export", "true");
    else {
      params.set("page", String(adminPage));
      params.set("limit", "10");
    }
    return params.toString();
  }, [adminDateFilter, adminLocation, adminPage, adminSearch, adminStatusFilter, adminWorkshopFilter]);

  const loadBookingRecords = useCallback(async () => {
    if (!user) {
      setBookingRecords([]);
      return;
    }
    setIsLoadingBookings(true);
    try {
      const path = user.role === "ADMIN"
        ? `/api/admin/workshops/requests?${getAdminRequestQuery()}`
        : "/api/workshops/requests/me";
      const result = await apiRequest(path, { auth: true });
      setBookingRecords(result.requests);
      if (user.role === "ADMIN") {
        setAdminSummary(result.summary);
        setAdminPagination(result.pagination);
      }
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsLoadingBookings(false);
    }
  }, [getAdminRequestQuery, user]);

  const exportAdminBookings = async () => {
    try {
      const result = await apiRequest(`/api/admin/workshops/requests?${getAdminRequestQuery(true)}`, { auth: true });
      const columns = [
        ["Customer Name", "full_name"], ["Email", "email"], ["Phone", "phone"],
        ["Workshop", "workshop_title"], ["Theme", "theme"], ["Location", "location"],
        ["Date", "preferred_date"], ["Time", "preferred_time"], ["Participants", "participant_count"],
        ["Purpose", "purpose"], ["Special Requests", "special_requirements"], ["Status", "status"],
      ];
      const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const csv = [
        columns.map(([label]) => escapeCsv(label)).join(","),
        ...result.requests.map((record) => columns.map(([, key]) => escapeCsv(record[key])).join(",")),
      ].join("\r\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `workshop-participants-${adminLocation ? adminLocation.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase() : "all"}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setRequestError(error.message);
    }
  };

  useEffect(() => {
    apiRequest("/api/workshops")
      .then((result) => {
        setApiWorkshops(result.workshops);
        setWorkshopThemes(Object.fromEntries(result.workshops.map((item) => [item.title, item.theme || ""])));
        setWorkshopSessionDrafts(Object.fromEntries(result.workshops.map((item) => [
          item.title,
          item.sessions.map((session) => sessionFields(session, item.duration_minutes || 120)),
        ])));
      })
      .catch((error) => setRequestError(error.message));
  }, []);

  useEffect(() => {
    loadBookingRecords();
  }, [loadBookingRecords]);

  useEffect(() => {
    const title = location.state?.openWorkshopRequestTitle;
    if (!user || !tailorMadeWorkshopTitles.has(title)) return;
    const workshop = workshops.find((item) => item.title === title);
    const card = planWorkshopCards.find((item) => item.title === title);
    if (workshop && card) {
      setTailorMadeWorkshop(workshop);
      setOpenWorkshopRequest(card);
      setRequestError("");
      navigate("/workshops", { replace: true, state: null });
    }
  }, [location.state, navigate, user]);

  useEffect(() => {
    setAdminPage(1);
    setExpandedBookingId(null);
  }, [adminLocation, adminSearch, adminWorkshopFilter, adminDateFilter, adminStatusFilter]);

  useEffect(() => {
    setPricePerPerson(String(tailorMadeApiWorkshop?.default_price || tailorMadeWorkshop.price));
  }, [tailorMadeApiWorkshop, tailorMadeWorkshop]);

  const saveWorkshopContent = async (workshop, posterFile) => {
    const databaseWorkshop = apiWorkshops.find((item) => item.title === workshop.title);
    if (!databaseWorkshop) {
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Workshop record is unavailable." }));
      return;
    }
    let posterDataUrl;
    if (posterFile) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(posterFile.type) || posterFile.size > 4 * 1024 * 1024) {
        setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Choose a PNG, JPEG, or WebP image under 4 MB." }));
        return;
      }
      posterDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("The poster could not be read."));
        reader.readAsDataURL(posterFile);
      });
    }
    setIsSavingWorkshop(workshop.title);
    setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "" }));
    try {
      const result = await apiRequest(`/api/admin/workshops/${databaseWorkshop.id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({
          theme: workshopThemes[workshop.title] || "",
          ...(posterDataUrl ? { posterDataUrl } : {}),
        }),
      });
      setApiWorkshops((current) => current.map((item) => item.id === result.workshop.id ? result.workshop : item));
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Saved" }));
    } catch (error) {
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: error.message }));
    } finally {
      setIsSavingWorkshop(null);
    }
  };

  const updateSessionDraft = (title, draftIndex, key, value) => {
    setWorkshopSessionDrafts((current) => ({
      ...current,
      [title]: (current[title] || []).map((draft, index) => index === draftIndex ? { ...draft, [key]: value } : draft),
    }));
  };

  const addSessionDraft = (workshop) => {
    setWorkshopSessionDrafts((current) => ({
      ...current,
      [workshop.title]: [...(current[workshop.title] || []), {
        id: null,
        date: "",
        time: "",
        place: workshop.location,
        duration: workshop.duration || 120,
        capacity: 30,
      }],
    }));
  };

  const saveWorkshopSession = async (workshop, draftIndex) => {
    const databaseWorkshop = apiWorkshops.find((item) => item.title === workshop.title);
    const draft = workshopSessionDrafts[workshop.title]?.[draftIndex];
    if (!databaseWorkshop || !draft) return;
    const actionKey = `${workshop.title}-${draft.id || draftIndex}`;
    setIsSavingWorkshop(actionKey);
    setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "" }));
    try {
      const result = await apiRequest(
        draft.id
          ? `/api/admin/workshops/${databaseWorkshop.id}/sessions/${draft.id}`
          : `/api/admin/workshops/${databaseWorkshop.id}/sessions`,
        {
          method: draft.id ? "PATCH" : "POST",
          auth: true,
          body: JSON.stringify({
            sessionDate: draft.date,
            sessionTime: draft.time,
            location: draft.place,
            durationMinutes: Number(draft.duration),
            capacity: Number(draft.capacity),
          }),
        },
      );
      const savedSession = result.session;
      setApiWorkshops((current) => current.map((item) => item.id !== databaseWorkshop.id ? item : {
        ...item,
        sessions: draft.id
          ? item.sessions.map((session) => session.id === savedSession.id ? savedSession : session).sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at))
          : [...item.sessions, savedSession].sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at)),
      }));
      setWorkshopSessionDrafts((current) => ({
        ...current,
        [workshop.title]: current[workshop.title].map((item, index) => index === draftIndex ? sessionFields(savedSession, workshop.duration) : item),
      }));
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Session saved." }));
    } catch (error) {
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: error.message }));
    } finally {
      setIsSavingWorkshop(null);
    }
  };

  const removeWorkshopSession = async (workshop, draftIndex) => {
    const databaseWorkshop = apiWorkshops.find((item) => item.title === workshop.title);
    const draft = workshopSessionDrafts[workshop.title]?.[draftIndex];
    if (!draft) return;
    if (!draft.id) {
      setWorkshopSessionDrafts((current) => ({ ...current, [workshop.title]: current[workshop.title].filter((_, index) => index !== draftIndex) }));
      return;
    }
    const actionKey = `${workshop.title}-${draft.id}`;
    setIsSavingWorkshop(actionKey);
    try {
      await apiRequest(`/api/admin/workshops/${databaseWorkshop.id}/sessions/${draft.id}`, { method: "DELETE", auth: true });
      setApiWorkshops((current) => current.map((item) => item.id === databaseWorkshop.id ? { ...item, sessions: item.sessions.filter((session) => session.id !== draft.id) } : item));
      setWorkshopSessionDrafts((current) => ({ ...current, [workshop.title]: current[workshop.title].filter((_, index) => index !== draftIndex) }));
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Session removed." }));
    } catch (error) {
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: error.message }));
    } finally {
      setIsSavingWorkshop(null);
    }
  };

  const submitWorkshopRequest = async (payload) => {
    setIsSubmittingRequest(true);
    setRequestError("");
    try {
      const result = await apiRequest("/api/workshops/requests", {
        method: "POST",
        auth: Boolean(user),
        body: JSON.stringify(payload),
      });
      return result.request;
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleEnrollmentSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: "/workshops", message: "Log in to request a workshop." } });
      return;
    }
    if (!selectedDate || !selectedTime || !selectedLocation) {
      setRequestError("Please select a date, time, and location.");
      return;
    }
    try {
      await submitWorkshopRequest({
        workshopId: tailorMadeApiWorkshop?.id || null,
        fullName: `${user.firstName || ""} ${user.familyName || ""}`.trim() || user.email,
        email: user.email,
        preferredDate: selectedDate.toISOString().slice(0, 10),
        preferredTime: selectedTime,
        location: selectedLocation,
        participantCount,
        purpose: workshopThemes[tailorMadeWorkshop.title] || tailorMadeWorkshop.title,
        specialRequirements: bookingNotes,
      });
      setIsRequestSubmitted(true);
      await loadBookingRecords();
    } catch (error) {
      setRequestError(error.message);
    }
  };

  const handlePlanRequest = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/workshop-register", { state: { workshopTitle: openWorkshopRequest?.title } });
      return;
    }
    setRequestError("");
    setIsPlanRequestSubmitted(false);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const requestedTitle = openWorkshopRequest?.title;
    if (!tailorMadeWorkshopTitles.has(requestedTitle)) {
      setRequestError("Please select a tailor-made workshop.");
      return;
    }
    const requestedWorkshop = apiWorkshops.find((item) => item.title === requestedTitle);
    const selectedBowls = form.getAll("wellnessBowls");
    const bowlSelections = selectedBowls.map((bowl) => {
      const key = bowl.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
      const quantity = form.get(`quantity-${key}`);
      return [bowl, quantity ? `people: ${quantity}` : null].filter(Boolean).join(" — ");
    });
    const selectedMenuItems = form.getAll("healthyMenuItems");
    const menuSelections = selectedMenuItems.map((item) => {
      const key = item.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
      const quantity = form.get(`quantity-${key}`);
      if (item.startsWith("Dumplings — ")) {
        return [item, quantity ? `portions: ${quantity}` : null].filter(Boolean).join(" — ");
      }
      return [item, quantity ? `quantity: ${quantity}` : null].filter(Boolean).join(" — ");
    });
    const allergyDetails = String(form.get("allergyDetails") || "").trim();
    const specialRequestText = String(form.get("specialRequirements") || "").trim();
    try {
      await submitWorkshopRequest({
        workshopId: requestedWorkshop?.id || null,
        companyName: form.get("companyName") || null,
        requesterAddress: form.get("requesterAddress") || null,
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        preferredDate: form.get("preferredDate") || null,
        preferredTime: form.get("preferredTime"),
        location: form.get("location"),
        participantCount: Number(form.get("participantCount")),
        purpose: form.get("purpose"),
        specialRequirements: [
          bowlSelections.length ? `Selected wellness bowls: ${bowlSelections.join("; ")}` : "Selected wellness bowls: None",
          menuSelections.length ? `Selected food and drinks: ${menuSelections.join("; ")}` : "Selected food and drinks: None",
          `Food allergies: ${form.get("allergyStatus") === "yes" ? allergyDetails : "None declared"}`,
          specialRequestText ? `Other requests: ${specialRequestText}` : null,
        ].filter(Boolean).join("\n"),
      });
      setIsPlanRequestSubmitted(true);
      await loadBookingRecords();
      formElement.reset();
      setSelectedWellnessBowls([]);
      setSelectedHealthyMenuItems([]);
      setOpenMenuCategory("salads");
      setAllergyStatus("");
    } catch (error) {
      setRequestError(error.message);
    }
  };

  return (
    <div className="workshop-page">
      <main className="workshop-main">
        <section className="workshop-header">
          <img
            className="workshop-header-image"
            src={workshopHeader}
            alt=""
            aria-hidden="true"
          />

          <div className="workshop-header-content">
            <h1>
              Book Your
              <br />
              Wellness
              <br />
              Workshop
            </h1>
            <p className="workshop-header-text">
              Explore practical and enjoyable workshops that bring natural wellness
              and meaningful experiences to individuals, groups, and teams.
            </p>
          </div>
          <div className="workshop-booking-action">
            <div>
              <span>Selected workshop</span>
              <strong>{activeWorkshop.title}</strong>
              <small>From €{activeWorkshop.price.toFixed(2)} per participant</small>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate("/checkout?type=workshop", {
                  state: {
                    checkout: {
                      type: "workshop",
                      workshopId: activeApiWorkshop?.id || null,
                      title: activeWorkshop.title,
                      description: activeWorkshop.text,
                      participants: 1,
                      unitPrice: activeWorkshop.price,
                      date: activeWorkshop.date,
                      time: activeWorkshop.time,
                      location: activeWorkshop.location,
                      tax: 0,
                    },
                  },
                })
              }
            >
              Pay Now
            </button>
          </div>
        </section>

        <section className="workshop-choices" aria-labelledby="workshop-choices-title">
          <h2 id="workshop-choices-title">Book Our Upcoming Workshops</h2>
          <p className="workshop-professional-note">
            <LuShieldCheck aria-hidden="true" />
            All workshops are delivered by experienced wellness professionals and, where applicable, qualified and certified facilitators.
          </p>

          <div className="workshop-card-grid">
            {workshops
              .filter((workshop) => user?.role === "ADMIN" || upcomingWorkshopTitles.has(workshop.title))
              .map((workshop, index) => {
              const Icon = workshop.icon;
              const isActive = activeWorkshop.title === workshop.title;
              const themeInputId = `workshop-theme-${index}`;
              const databaseWorkshop = apiWorkshops.find((item) => item.title === workshop.title);
              const publicTheme = databaseWorkshop?.theme || workshopThemes[workshop.title] || "Theme coming soon";
              const publicPoster = databaseWorkshop?.image_url || workshop.sheet;
              const publicSchedule = displaySchedule(databaseWorkshop, workshop);
              const publicSessions = databaseWorkshop?.sessions?.length
                ? databaseWorkshop.sessions.map((session) => displaySession(session, workshop))
                : [publicSchedule];
              const cardImage = planWorkshopCards.find((card) => card.title === workshop.title)?.image;

              return (
                <article
                  className={`workshop-choice-card ${workshop.color} ${isActive ? "active" : ""}`}
                  key={workshop.title}
                >
                  {cardImage && (
                    <button
                      className="workshop-upcoming-image"
                      type="button"
                      aria-label={`View ${workshop.title}`}
                      onClick={() => {
                        setActiveWorkshop(workshop);
                        if (publicPoster) setOpenWorkshopSheet({ ...workshop, sheet: publicPoster });
                      }}
                    >
                      <img src={cardImage} alt="" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    className="workshop-card-select"
                    type="button"
                    onClick={() => {
                      setActiveWorkshop(workshop);
                      if (publicPoster) setOpenWorkshopSheet({ ...workshop, sheet: publicPoster });
                    }}
                  >
                    <span className="workshop-choice-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{workshop.title}</strong>
                    <span>{workshop.text}</span>
                  </button>

                  <div className="workshop-theme-field">
                    <span className="workshop-theme-icon">
                      <LuPalette aria-hidden="true" />
                    </span>
                    <label htmlFor={user?.role === "ADMIN" ? themeInputId : undefined}>Theme</label>
                    {user?.role === "ADMIN" ? (
                      <>
                        <input
                          id={themeInputId}
                          name={`theme-${index}`}
                          type="text"
                          value={workshopThemes[workshop.title] || ""}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            setWorkshopThemes((themes) => ({
                              ...themes,
                              [workshop.title]: event.target.value,
                            }))
                          }
                        />
                        <div className="workshop-admin-session-manager">
                          <strong className="workshop-admin-session-heading">Workshop Sessions</strong>
                          {(workshopSessionDrafts[workshop.title] || []).map((draft, draftIndex) => {
                            const actionKey = `${workshop.title}-${draft.id || draftIndex}`;
                            return (
                              <div className="workshop-admin-session" key={draft.id || `new-${draftIndex}`}>
                                <span className="workshop-admin-session-number">Session {draftIndex + 1}</span>
                                <div className="workshop-admin-schedule">
                                  <label>Date<input type="date" value={draft.date} onChange={(event) => updateSessionDraft(workshop.title, draftIndex, "date", event.target.value)} /></label>
                                  <label>Time<input type="time" value={draft.time} onChange={(event) => updateSessionDraft(workshop.title, draftIndex, "time", event.target.value)} /></label>
                                  <label>Place<input type="text" value={draft.place} onChange={(event) => updateSessionDraft(workshop.title, draftIndex, "place", event.target.value)} /></label>
                                  <label>Duration (minutes)<input type="number" min="15" max="1440" step="15" value={draft.duration} onChange={(event) => updateSessionDraft(workshop.title, draftIndex, "duration", event.target.value)} /></label>
                                  <label>Capacity<input type="number" min="1" max="1000" value={draft.capacity} onChange={(event) => updateSessionDraft(workshop.title, draftIndex, "capacity", event.target.value)} /></label>
                                </div>
                                <div className="workshop-admin-session-actions">
                                  <button type="button" disabled={isSavingWorkshop === actionKey} onClick={() => saveWorkshopSession(workshop, draftIndex)}>
                                    {isSavingWorkshop === actionKey ? "Saving…" : draft.id ? "Save Session" : "Create Session"}
                                  </button>
                                  <button className="workshop-admin-session-remove" type="button" disabled={isSavingWorkshop === actionKey} onClick={() => removeWorkshopSession(workshop, draftIndex)}>
                                    {draft.id ? "Remove Session" : "Cancel"}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                          <button className="workshop-admin-add-session" type="button" onClick={() => addSessionDraft(workshop)}>+ Add Another Session</button>
                        </div>
                        <label className="workshop-poster-upload">
                          <span>Upload poster</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) => saveWorkshopContent(workshop, event.target.files?.[0])}
                          />
                        </label>
                        <button
                          className="workshop-admin-save"
                          type="button"
                          disabled={isSavingWorkshop === workshop.title}
                          onClick={() => saveWorkshopContent(workshop)}
                        >
                          {isSavingWorkshop === workshop.title ? "Saving…" : "Save workshop details"}
                        </button>
                        {adminWorkshopMessage[workshop.title] && (
                          <small className="workshop-admin-message">{adminWorkshopMessage[workshop.title]}</small>
                        )}
                      </>
                    ) : (
                      <div className="workshop-theme-value">{publicTheme}</div>
                    )}
                  </div>
                  {user?.role !== "ADMIN" && <div className="workshop-card-schedule">
                    <div><LuCalendarDays aria-hidden="true" /><span><strong>Date</strong>{publicSchedule.date}</span></div>
                    <div><LuCalendarHeart aria-hidden="true" /><span><strong>Time</strong>{publicSchedule.time}</span></div>
                    <div><LuMapPin aria-hidden="true" /><span><strong>Place</strong>{publicSchedule.place}</span></div>
                    <div><LuTimer aria-hidden="true" /><span><strong>Duration</strong>{publicSchedule.duration}</span></div>
                  </div>}
                  {user?.role !== "ADMIN" && publicSessions.length > 1 && (
                    <p className="workshop-session-count">{publicSessions.length} sessions available — choose when booking</p>
                  )}
                  {user?.role !== "ADMIN" && (
                    <button
                      className="workshop-upcoming-pay"
                      type="button"
                      onClick={() => setOpenUpcomingBooking({
                        workshop,
                        databaseWorkshop,
                        schedule: publicSchedule,
                        location: publicSchedule.place,
                        sessions: publicSessions,
                        sessionId: publicSchedule.id,
                      })}
                    >
                      Book Now
                    </button>
                  )}
                </article>
              );
            })}
          </div>

          <h2 className="workshop-enrollment-title">Plan Your Tailor-Made Workshop</h2>
          <p className="workshop-professional-note workshop-tailor-made-description">
            <LuShieldCheck aria-hidden="true" />
            Choose a private celebration or business wellness experience, personalized for your group by experienced professionals.
          </p>

          <div className="workshop-booking-area workshop-tailor-booking-layout">
            <section className="workshop-booking-form workshop-tailor-booking-cards" aria-label="Tailor-made workshop options">
              <div className="workshop-plan-card-grid workshop-tailor-card-grid">
                {workshops.filter((workshop) => tailorMadeWorkshopTitles.has(workshop.title)).map((workshop) => {
                  const card = planWorkshopCards.find((item) => item.title === workshop.title);
                  const Icon = workshop.icon;
                  return (
                  <article className={`workshop-choice-card workshop-tailor-booking-card ${workshop.color}`} key={workshop.title}>
                    <button
                      className="workshop-upcoming-image"
                      type="button"
                      onClick={() => {
                        setOpenTailorInfo({ workshop, card, details: tailorMadeWorkshopDetails[workshop.title] });
                      }}
                    >
                      <img src={card.image} alt={`${workshop.title} booking`} />
                    </button>
                    <div className="workshop-tailor-card-content">
                      <span className="workshop-choice-icon"><Icon aria-hidden="true" /></span>
                      <h3>{workshop.title}</h3>
                      <p>{workshop.text}</p>
                    </div>
                    <button
                      className="workshop-upcoming-pay"
                      type="button"
                      onClick={() => {
                        if (!user) {
                          navigate("/workshop-register", { state: { workshopTitle: workshop.title } });
                        } else {
                          setTailorMadeWorkshop(workshop);
                          setOpenWorkshopRequest(card);
                          setIsPlanRequestSubmitted(false);
                          setRequestError("");
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </article>
                );})}
              </div>
            </section>

            <aside className="workshop-booking-summary" aria-label="Booking summary">
              <h3>Booking Summary</h3>

              <fieldset className="workshop-admin-location">
                <legend>Select Location</legend>
                <div>
                  {workshopLocations.map((location) => (
                    <label key={location}>
                      <input
                        type="radio"
                        name="admin-location"
                        value={location}
                        checked={adminLocation === location}
                        onChange={(event) => setAdminLocation(event.target.value)}
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {user?.role === "ADMIN" && (
                <section className="workshop-admin-participants" aria-label="Participant management">
                  <div className="workshop-admin-totals">
                    <strong>{adminSummary.total_bookings} bookings</strong>
                    <span>{adminSummary.total_participants} participants</span>
                    <span>EUR {Number(adminSummary.total_price || 0).toFixed(2)} total</span>
                  </div>
                  <div className="workshop-admin-filters">
                    <label><span>Find customer</span><input
                        type="search"
                        value={adminSearch}
                        onChange={(event) => setAdminSearch(event.target.value)}
                        placeholder="Name, email, or phone"
                      /></label>
                    <label><span>Workshop</span><select value={adminWorkshopFilter} onChange={(event) => setAdminWorkshopFilter(event.target.value)}>
                        <option value="">All workshops</option>
                        {apiWorkshops.map((workshop) => <option key={workshop.id} value={workshop.id}>{workshop.title}</option>)}
                      </select></label>
                    <label><span>Booking date</span><input type="date" value={adminDateFilter} onChange={(event) => setAdminDateFilter(event.target.value)} /></label>
                    <label><span>Status</span><select value={adminStatusFilter} onChange={(event) => setAdminStatusFilter(event.target.value)}>
                        <option value="">All statuses</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="UNDER_REVIEW">Under review</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="WITHDRAWN">Withdrawn</option>
                      </select></label>
                  </div>
                  <button className="workshop-export-btn" type="button" onClick={exportAdminBookings} disabled={!adminSummary.total_bookings}>
                    Export CSV
                  </button>
                </section>
              )}

              {!user && (
                <p className="workshop-summary-empty">Log in to view your saved workshop details.</p>
              )}
              {user && !adminLocation && (
                <p className="workshop-summary-empty">Select a location to view saved workshop details.</p>
              )}
              {isLoadingBookings && <p className="workshop-summary-empty">Loading bookings…</p>}
              {user && adminLocation && !isLoadingBookings && locationBookingRecords.length === 0 && (
                <p className="workshop-summary-empty">
                  {user.role === "ADMIN"
                    ? "No workshop requests have been saved for this location."
                    : "You have no saved workshop requests for this location."}
                </p>
              )}
              {user?.role !== "ADMIN" && locationBookingRecords.map((record) => (
                <dl className="workshop-saved-booking" key={record.id}>
                  <div>
                    <dt>Customer Name</dt>
                    <dd>{record.full_name}</dd>
                  </div>
                  {user?.role === "ADMIN" && (
                    <>
                      <div><dt>Email</dt><dd>{record.email}</dd></div>
                      <div><dt>Phone</dt><dd>{record.phone || "—"}</dd></div>
                    </>
                  )}
                  <div>
                    <dt>Workshop Name</dt>
                    <dd>{record.workshop_title || record.purpose || "Custom workshop"}</dd>
                  </div>
                  <div>
                    <dt>Theme</dt>
                    <dd>{record.theme || record.purpose || "—"}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{record.preferred_date ? formatDate(new Date(`${record.preferred_date.slice(0, 10)}T00:00:00`)) : "By arrangement"}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{record.preferred_time || "By arrangement"}</dd>
                  </div>
                  <div>
                    <dt>Number of Participants</dt>
                    <dd>{record.participant_count || "—"}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{record.status === "APPROVED" ? "Approved — payment setup pending" : record.status}</dd>
                  </div>
                  {user?.role === "ADMIN" && (
                    <>
                      <div><dt>Purpose</dt><dd>{record.purpose || "—"}</dd></div>
                      <div><dt>Special Requests</dt><dd>{record.special_requirements || "—"}</dd></div>
                      <div><dt>Status</dt><dd>{record.status}</dd></div>
                    </>
                  )}
                  <div className="summary-total">
                    <dt>Total Price</dt>
                    <dd>{Number(record.total_price) > 0 ? `${record.currency?.trim() || "EUR"} ${Number(record.total_price).toFixed(2)}` : "To be confirmed"}</dd>
                  </div>
                  {record.status === "APPROVED" && (
                    <div className="workshop-customer-payment">
                      <dt>Payment</dt>
                      <dd>
                        <button
                          className="workshop-pay-preview-btn"
                          type="button"
                          onClick={() => navigate("/checkout?type=workshop", {
                            state: {
                              checkout: {
                                type: "workshop",
                                requestId: record.id,
                                workshopId: record.workshop_id,
                                title: record.workshop_title || "Approved Workshop",
                                description: record.theme || record.purpose || "",
                                participants: record.participant_count || 1,
                                unitPrice: Number(record.default_price || 0),
                                date: record.preferred_date ? formatDate(new Date(`${record.preferred_date.slice(0, 10)}T00:00:00`)) : "By arrangement",
                                time: record.preferred_time || "By arrangement",
                                location: record.location,
                                tax: 0,
                                paymentPreview: true,
                              },
                            },
                          })}
                        >
                          Pay Now
                        </button>
                      </dd>
                    </div>
                  )}
                </dl>
              ))}
              {user?.role === "ADMIN" && locationBookingRecords.map((record) => {
                const isExpanded = expandedBookingId === record.id;
                return (
                  <article className="workshop-participant-row" key={record.id}>
                    <button type="button" onClick={() => setExpandedBookingId(isExpanded ? null : record.id)} aria-expanded={isExpanded}>
                      <span><strong>{record.full_name}</strong><small>{record.email}</small></span>
                      <span><strong>{record.participant_count || 0}</strong><small>participants</small></span>
                      <span>{record.preferred_date ? formatDate(new Date(`${record.preferred_date.slice(0, 10)}T00:00:00`)) : "By arrangement"}</span>
                      <span>{isExpanded ? "Hide" : "Details"}</span>
                    </button>
                    {isExpanded && (
                      <dl className="workshop-saved-booking">
                        <div><dt>Phone</dt><dd>{record.phone || "—"}</dd></div>
                        <div><dt>Workshop</dt><dd>{record.workshop_title || "Custom workshop"}</dd></div>
                        <div><dt>Theme</dt><dd>{record.theme || record.purpose || "—"}</dd></div>
                        <div><dt>Time</dt><dd>{record.preferred_time || "By arrangement"}</dd></div>
                        <div><dt>Purpose</dt><dd>{record.purpose || "—"}</dd></div>
                        <div><dt>Special Requests</dt><dd>{record.special_requirements || "—"}</dd></div>
                        <div><dt>Status</dt><dd>{record.status}</dd></div>
                        <div className="summary-total"><dt>Total Price</dt><dd>{Number(record.total_price) > 0 ? `${record.currency?.trim() || "EUR"} ${Number(record.total_price).toFixed(2)}` : "To be confirmed"}</dd></div>
                      </dl>
                    )}
                  </article>
                );
              })}
              {user?.role === "ADMIN" && adminPagination.totalPages > 1 && (
                <nav className="workshop-admin-pagination" aria-label="Participant pages">
                  <button type="button" disabled={adminPage <= 1} onClick={() => setAdminPage((page) => page - 1)}>Previous</button>
                  <span>Page {adminPagination.page} of {adminPagination.totalPages}</span>
                  <button type="button" disabled={adminPage >= adminPagination.totalPages} onClick={() => setAdminPage((page) => page + 1)}>Next</button>
                </nav>
              )}

              <img
                className="workshop-summary-image"
                src={workshopSummaryImage}
                alt=""
                aria-hidden="true"
              />
            </aside>
          </div>

        </section>

      </main>

      {openWorkshopSheet && (
        <div className="modal-backdrop" role="presentation">
          <div className="workshop-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="workshop-sheet-title">
            <button
              className="modal-close workshop-sheet-close"
              type="button"
              aria-label="Close workshop information"
              onClick={() => setOpenWorkshopSheet(null)}
            >
              ×
            </button>

            <img src={openWorkshopSheet.sheet} alt={`${openWorkshopSheet.title} information sheet`} />
          </div>
        </div>
      )}

      {openTailorInfo && (
        <div className="modal-backdrop" role="presentation">
          <section className="workshop-tailor-info-modal" role="dialog" aria-modal="true" aria-labelledby="tailor-info-title">
            <button
              className="modal-close workshop-request-close"
              type="button"
              aria-label="Close workshop information"
              onClick={() => setOpenTailorInfo(null)}
            >
              &times;
            </button>
            <img src={openTailorInfo.card.image} alt={`${openTailorInfo.workshop.title} experience`} />
            <div className="workshop-tailor-info-content">
              <span className="workshop-tailor-info-label">Tailor-Made Experience</span>
              <h2 id="tailor-info-title">{openTailorInfo.workshop.title}</h2>
              <p className="workshop-tailor-info-lead">{openTailorInfo.details.lead}</p>
              <div className="workshop-tailor-info-ideal">
                <strong>Perfect for</strong>
                <p>{openTailorInfo.details.idealFor}</p>
              </div>
              <h3>What your workshop can include</h3>
              <ul>
                {openTailorInfo.details.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="workshop-tailor-info-note">Tell us what you need in the request form. Our team will review your preferences and contact you to confirm the final plan and price.</p>
              <p className="workshop-tailor-registration-note">
                Please register or log in to request a workshop and keep track of your booking details.
              </p>
              <button
                className="workshop-upcoming-pay"
                type="button"
                onClick={() => {
                  if (!user) {
                    navigate("/workshop-register", { state: { workshopTitle: openTailorInfo.workshop.title } });
                  } else {
                    setTailorMadeWorkshop(openTailorInfo.workshop);
                    setOpenWorkshopRequest(openTailorInfo.card);
                    setOpenTailorInfo(null);
                    setIsPlanRequestSubmitted(false);
                    setRequestError("");
                  }
                }}
              >
                Request This Workshop
              </button>
            </div>
          </section>
        </div>
      )}

      {openUpcomingBooking && (
        <div className="modal-backdrop" role="presentation">
          <form
            className="workshop-request-modal workshop-upcoming-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upcoming-booking-title"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const participants = Number(form.get("participantCount"));
              navigate("/checkout?type=workshop", {
                state: {
                  checkout: {
                    type: "workshop",
                    workshopId: openUpcomingBooking.databaseWorkshop?.id || null,
                    sessionId: openUpcomingBooking.sessionId || null,
                    title: openUpcomingBooking.workshop.title,
                    description: openUpcomingBooking.workshop.text,
                    participants,
                    unitPrice: openUpcomingBooking.workshop.price,
                    date: openUpcomingBooking.schedule.date,
                    isoDate: openUpcomingBooking.schedule.isoDate,
                    time: openUpcomingBooking.schedule.time,
                    location: openUpcomingBooking.location,
                    customerName: form.get("fullName"),
                    customerEmail: form.get("email"),
                    customerPhone: form.get("phone"),
                    notes: form.get("notes"),
                    tax: 0,
                  },
                },
              });
            }}
          >
            <button
              className="modal-close workshop-request-close"
              type="button"
              aria-label="Close booking form"
              onClick={() => setOpenUpcomingBooking(null)}
            >
              &times;
            </button>

            <h3 id="upcoming-booking-title">Book {openUpcomingBooking.workshop.title}</h3>
            <p className="workshop-request-intro">
              Complete your booking details below, then continue securely to payment.
            </p>

            {openUpcomingBooking.sessions?.length > 1 && (
              <label className="workshop-session-selector">
                <span>Choose Your Session</span>
                <select
                  value={openUpcomingBooking.sessionId || ""}
                  onChange={(event) => {
                    const schedule = openUpcomingBooking.sessions.find((session) => session.id === event.target.value);
                    if (schedule) setOpenUpcomingBooking((current) => ({
                      ...current,
                      sessionId: schedule.id,
                      schedule,
                      location: schedule.place,
                    }));
                  }}
                >
                  {openUpcomingBooking.sessions.map((session) => (
                    <option value={session.id || "fallback"} key={session.id || "fallback"}>
                      {session.date} at {session.time} — {session.place}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="workshop-upcoming-summary" aria-label="Selected workshop details">
              <div><span>Date</span><strong>{openUpcomingBooking.schedule.date}</strong></div>
              <div><span>Time</span><strong>{openUpcomingBooking.schedule.time}</strong></div>
              <div><span>Location</span><strong>{openUpcomingBooking.location}</strong></div>
              <div><span>Duration</span><strong>{openUpcomingBooking.schedule.duration}</strong></div>
              <div><span>Price</span><strong>€{openUpcomingBooking.workshop.price.toFixed(2)} per person</strong></div>
            </div>

            <div className="workshop-request-grid workshop-upcoming-form-grid">
              <label>
                <span>Full Name</span>
                <input name="fullName" type="text" required defaultValue={user ? `${user.firstName || ""} ${user.familyName || ""}`.trim() : ""} placeholder="Enter your full name" />
              </label>
              <label>
                <span>Email Address</span>
                <input name="email" type="email" required defaultValue={user?.email || ""} placeholder="Enter your email address" />
              </label>
              <label>
                <span>Phone Number</span>
                <input name="phone" type="tel" required placeholder="Enter your phone number" />
              </label>
              <label>
                <span>Number of Participants</span>
                <input name="participantCount" type="number" min="1" max="100" defaultValue="1" required />
              </label>
              <label className="workshop-upcoming-notes">
                <span>Notes (Optional)</span>
                <textarea name="notes" placeholder="Dietary requirements, accessibility needs, or other information" />
              </label>
            </div>

            <button className="workshop-request-submit" type="submit">Pay Now</button>
            <p className="workshop-upcoming-payment-note">
              You can review the workshop and total price before completing payment.
            </p>
          </form>
        </div>
      )}

      {openWorkshopRequest && (
        <div className="modal-backdrop" role="presentation">
          <form
            className="workshop-request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="workshop-request-title"
            onSubmit={handlePlanRequest}
          >
            <button
              className="modal-close workshop-request-close"
              type="button"
              aria-label="Close workshop request form"
              onClick={() => setOpenWorkshopRequest(null)}
            >
              &times;
            </button>

            <h3 id="workshop-request-title">Request a Tailor-Made Workshop</h3>
            <p className="workshop-request-intro">
              Please fill in the details below. After submitting your request, we will review it and contact you by email.
            </p>

            <h4>Customer Details</h4>
            <div className="workshop-request-grid workshop-request-customer-grid">
              {user?.accountType === "COMPANY" && (
                <label className="workshop-request-email-field">
                  <span>Company / Organization</span>
                  <input name="companyName" type="text" defaultValue={user.companyName || ""} readOnly />
                </label>
              )}
              <label>
                <span>{user?.accountType === "COMPANY" ? "Contact Person" : "Full Name"}</span>
                <input name="fullName" type="text" required defaultValue={user ? `${user.firstName || ""} ${user.familyName || ""}`.trim() : ""} placeholder="Enter your full name" />
              </label>

              <label>
                <span>Phone Number</span>
                <input name="phone" type="tel" defaultValue={user?.phone || ""} placeholder="Enter your phone number" />
              </label>

              <label className="workshop-request-email-field">
                <span>Email Address</span>
                <input name="email" type="email" required defaultValue={user?.email || ""} placeholder="Enter your email address" />
              </label>
              {user?.address && (
                <label className="workshop-request-email-field">
                  <span>{user.accountType === "COMPANY" ? "Company Address" : "Address"}</span>
                  <input name="requesterAddress" type="text" defaultValue={user.address} />
                </label>
              )}
            </div>

            <h4 className="workshop-request-section-title">Workshop Details</h4>
            <div className="workshop-request-grid workshop-request-details-grid">
              <label>
                <span>Preferred Date</span>
                <input name="preferredDate" type="date" min={new Date().toISOString().slice(0, 10)} required aria-label="Select date" />
              </label>

              <label className="workshop-request-location-field">
                <span>Preferred Location</span>
                <select name="location" required defaultValue="">
                  <option value="" disabled>
                    Select location
                  </option>
                  {workshopLocations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                  <option>Customer-provided venue / address to be confirmed</option>
                  <option>Company venue / address to be confirmed</option>
                </select>
              </label>

              <label className="workshop-request-time-field">
                <span>Preferred Time</span>
                <select name="preferredTime" required defaultValue="">
                  <option value="" disabled>
                    Select time
                  </option>
                  <option>9:00 AM - 11:00 AM</option>
                  <option>10:00 AM - 12:00 Noon</option>
                  <option>1:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 5:00 PM</option>
                </select>
              </label>

              <label className="workshop-request-participants-field">
                <span>Number of Participants</span>
                <input
                  className="workshop-participant-input"
                  name="participantCount"
                  type="number"
                  min="1"
                  max="100"
                  required
                  placeholder="Enter number of participants"
                />
              </label>
            </div>

            <h4 className="workshop-request-event-title">Event Details</h4>
            <div className="workshop-request-grid workshop-request-event-grid">
              <label>
                <span>Theme / Purpose of the Workshop</span>
                <textarea name="purpose" required placeholder="Example: birthday, team building, family gathering, wellness session, business event" />
              </label>

              <section className="workshop-healthy-menu workshop-menu-categories" aria-labelledby="workshop-healthy-menu-title">
                <div className="workshop-wellness-bowls-heading">
                  <span>Food & Drinks</span>
                  <h5 id="workshop-healthy-menu-title">Our Healthy Menu</h5>
                  <p>Select a category to see the available choices. You can choose several food and drink options for your event.</p>
                </div>
                <div className="workshop-healthy-menu-grid workshop-menu-category-grid">
                  {healthyMenuItems.map((item) => {
                    return (
                      <button className={`workshop-healthy-menu-card ${openMenuCategory === item.category ? "is-front" : ""}`} key={item.name} type="button" onClick={() => setOpenMenuCategory(item.category)} aria-expanded={openMenuCategory === item.category}>
                        <img src={item.image} alt={`${item.name} menu selection`} />
                        <div className="workshop-healthy-menu-content"><strong>{item.name}</strong><span>{item.subtitle}</span></div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {openMenuCategory === "salads" && <section className="workshop-wellness-bowls" aria-labelledby="wellness-bowls-title">
                <div className="workshop-wellness-bowls-heading">
                  <span>Finnish Happiness Academy</span>
                  <h5 id="wellness-bowls-title">Signature Wellness Bowls</h5>
                  <p>Thoughtfully crafted with fresh Nordic ingredients to nourish the body, support long-term wellbeing, and celebrate the Finnish philosophy of living well. Select any bowls you would like us to discuss for your event.</p>
                </div>
                <div className="workshop-wellness-bowl-grid">
                  {signatureWellnessBowls.map((bowl) => {
                    const selected = selectedWellnessBowls.includes(bowl.name);
                    const key = bowl.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
                    return (
                      <article className={`workshop-wellness-bowl ${selected ? "selected" : ""}`} key={bowl.name}>
                        <label className="workshop-wellness-bowl-choice">
                          <input
                            type="checkbox"
                            name="wellnessBowls"
                            value={bowl.name}
                            checked={selected}
                            onChange={(event) => setSelectedWellnessBowls((current) => event.target.checked ? [...current, bowl.name] : current.filter((name) => name !== bowl.name))}
                          />
                          <span><strong>{bowl.name}</strong><small>{bowl.tagline}</small></span>
                        </label>
                        {selected && <label className="workshop-menu-single-quantity">People<input name={`quantity-${key}`} type="number" min="1" max="300" defaultValue="1" /></label>}
                        <p className={bowl.name === "Aurora Glow Bowl" ? "aurora-glow-bowl-description" : ""}>{bowl.description}</p>
                        <details>
                          <summary>View ingredients and health highlights</summary>
                          <div className="workshop-wellness-bowl-details">
                            <div><strong>Key ingredients</strong><ul>{bowl.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul></div>
                            <div><strong>Health highlights</strong><ul>{bowl.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
                          </div>
                        </details>
                      </article>
                    );
                  })}
                </div>
                <p className="workshop-wellness-philosophy"><strong>Our philosophy:</strong> Food should do more than satisfy hunger. Every bowl is designed to nourish the body, calm the mind, and bring people together through seasonal Nordic ingredients and the joy of sharing food.</p>
              </section>}

              {openMenuCategory === "dumplings" && <section className="workshop-menu-choice-panel">
                <h5>Dumpling Selection</h5>
                <p>Select the dumpling flavours you want and how many 7-piece portions you need for each flavour. Final availability will be confirmed with your booking.</p>
                <div className="workshop-drink-options workshop-dumpling-options">
                  {dumplingOptions.map((dumpling) => {
                    const selected = selectedHealthyMenuItems.includes(dumpling.value);
                    const key = dumpling.value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
                    return <div className="workshop-drink-option workshop-dumpling-option" key={dumpling.value}><label className="workshop-menu-choice-row"><input type="checkbox" name="healthyMenuItems" value={dumpling.value} checked={selected} onChange={(event) => setSelectedHealthyMenuItems((current) => event.target.checked ? [...current, dumpling.value] : current.filter((item) => item !== dumpling.value))} /><span><strong>{dumpling.label}</strong><small>7 pieces / 1 portion</small></span></label>{selected && <label className="workshop-menu-single-quantity">Portions<input name={`quantity-${key}`} type="number" min="1" max="100" defaultValue="1" /></label>}</div>;
                  })}
                </div>
              </section>}

              {openMenuCategory === "kombucha" && <section className="workshop-menu-choice-panel">
                <h5>Kombucha</h5><p>Add refreshing kombucha to your event menu.</p>
                <label className="workshop-menu-choice-row"><input type="checkbox" name="healthyMenuItems" value="Kombucha" checked={selectedHealthyMenuItems.includes("Kombucha")} onChange={(event) => setSelectedHealthyMenuItems((current) => event.target.checked ? [...current, "Kombucha"] : current.filter((item) => item !== "Kombucha"))} /><span><strong>Kombucha (€5.00 each)</strong><small>Select and enter the required quantity</small></span></label>
                {selectedHealthyMenuItems.includes("Kombucha") && <label className="workshop-menu-single-quantity">Quantity<input name="quantity-kombucha" type="number" min="1" max="200" defaultValue="1" /></label>}
              </section>}

              {openMenuCategory === "drinks" && <section className="workshop-menu-choice-panel">
                <h5>Tea, Coffee & Soft Drinks</h5><p>Select any drinks you would like us to arrange. Pricing and available varieties will be confirmed with your request.</p>
                <div className="workshop-drink-options">{["Tea", "Coffee", "Soft Drinks"].map((drink) => {
                  const selected = selectedHealthyMenuItems.includes(drink);
                  const key = drink.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
                  return <div className="workshop-drink-option" key={drink}><label className="workshop-menu-choice-row"><input type="checkbox" name="healthyMenuItems" value={drink} checked={selected} onChange={(event) => setSelectedHealthyMenuItems((current) => event.target.checked ? [...current, drink] : current.filter((item) => item !== drink))} /><span><strong>{drink}</strong><small>Available on request</small></span></label>{selected && <label>Servings<input name={`quantity-${key}`} type="number" min="1" max="300" defaultValue="1" /></label>}</div>;
                })}</div>
              </section>}

              <fieldset className="workshop-allergy-fieldset">
                <legend>Food Allergies or Dietary Restrictions <strong>*</strong></legend>
                <p>Please tell us about allergies before submitting your request so our team can plan safely.</p>
                <div className="workshop-allergy-options">
                  <label><input type="radio" name="allergyStatus" value="no" checked={allergyStatus === "no"} onChange={(event) => setAllergyStatus(event.target.value)} required /> No known food allergies</label>
                  <label><input type="radio" name="allergyStatus" value="yes" checked={allergyStatus === "yes"} onChange={(event) => setAllergyStatus(event.target.value)} required /> Yes, allergies or dietary restrictions</label>
                </div>
                {allergyStatus === "yes" && <label className="workshop-allergy-details"><span>Please provide full details <strong>*</strong></span><textarea name="allergyDetails" required placeholder="List each allergy, intolerance, dietary restriction, and the affected participant(s). Include severity where known." /></label>}
              </fieldset>

              <label className="workshop-request-special-field">
                <span>Special Requests</span>
                <textarea name="specialRequirements" placeholder="Example: food and drinks, accessibility needs, language preference, private event requests" />
              </label>
            </div>

            <button className="workshop-request-submit" type="submit" disabled={isSubmittingRequest}>
              {isSubmittingRequest ? "Submitting…" : "Request Tailor-Made Workshop"}
            </button>

            {requestError && <p className="form-error" role="alert">{requestError}</p>}
            {isPlanRequestSubmitted && (
              <p className="workshop-request-success" role="status" aria-live="polite">
                Thank you! Your workshop request has been submitted successfully. We will contact you soon by email.
              </p>
            )}
          </form>
        </div>
      )}

    </div>
  );
}
