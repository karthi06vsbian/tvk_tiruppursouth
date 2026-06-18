/* ─── ChatBot Component ───────────────────────────────────────── */
const chatCopy = {
  en: {
    welcome: "Hello! \ud83d\udc4b I'm Tirumalai. Welcome to TVK Tiruppur South.",
    intro: "I can help you explore the website or submit a petition. What would you like to do?",
    opt_explore: "\ud83d\udccd Explore the website",
    opt_petition: "\ud83d\udcdd Submit a petition",
    explore_msg: "Here are the sections you can visit:",
    sec_home: "\ud83c\udfe0 Home",
    sec_party: "\ud83c\udfc1 About the Party",
    sec_features: "\ud83d\udcda Leadership, Ideology & More",
    sec_journey: "\ud83d\udcc5 Our Journey",
    sec_news: "\ud83d\udcf0 News & Updates",
    sec_events: "\ud83d\udcf7 Gallery",
    sec_join: "\u2728 Join TVK",
    sec_contact: "\ud83d\udcde Contact",
    nav_done: "Scrolling to the section now!",
    pet_name: "Please enter your full name:",
    pet_phone: "Enter your phone number:",
    pet_email: "Enter your email address (optional, or select 'Skip'):",
    pet_area: "Please select your Ward / Area:",
    pet_subject: "What is the subject of your petition?",
    pet_summary: "Please provide a summary of your petition:",
    pet_photo: "Would you like to attach a photo of the issue? You can upload a file or select 'Skip'.",
    pet_confirm: "Thank you! Your petition has been submitted successfully. \u2705",
    pet_error: "There was an error submitting. Please try again.",
    pet_submitting: "Submitting your petition...",
    back_menu: "\u2b05\ufe0f Back to menu",
    input_placeholder: "Type your message...",
    input_locked_placeholder: "Please select an option above...",
    title: "Tirumalai",
    subtitle: "Online"
  },
  ta: {
    welcome: "\u0ba8\u0bae\u0bb8\u0bcd\u0b95\u0bbe\u0bb0\u0bae\u0bcd! \ud83d\udc4b \u0ba8\u0bbe\u0ba9\u0bcd \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8. \u0ba4\u0bb5\u0bc6\u0b95 \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0bbe\u0bae\u0bcd.",
    intro: "\u0ba8\u0bbe\u0ba9\u0bcd \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b87\u0ba3\u0bc8\u0baf\u0ba4\u0bcd\u0ba4\u0bb3\u0ba4\u0bcd\u0ba4\u0bc8 \u0b85\u0bb1\u0bbf\u0bae\u0bc1\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4 \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0bae\u0ba9\u0bc1 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95 \u0b89\u0ba4\u0bb5 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bc1\u0bae\u0bcd. \u0ba8\u0bc0\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b8e\u0ba9\u0bcd\u0ba9 \u0b9a\u0bc6\u0baf\u0bcd\u0baf \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bc1\u0b95\u0bbf\u0bb1\u0bc0\u0bb0\u0bcd\u0b95\u0bb3\u0bcd?",
    opt_explore: "\ud83d\udccd \u0b87\u0ba3\u0bc8\u0baf\u0ba4\u0bcd\u0ba4\u0bb3\u0ba4\u0bcd\u0ba4\u0bc8 \u0b85\u0bb1\u0bbf\u0baf",
    opt_petition: "\ud83d\udcdd \u0bae\u0ba9\u0bc1 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95",
    explore_msg: "\u0b87\u0ba4\u0bc7 \u0baa\u0b95\u0bc1\u0ba4\u0bbf\u0b95\u0bb3\u0bc8 \u0baa\u0bbe\u0bb0\u0bcd\u0bb5\u0bc8\u0baf\u0bbf\u0b9f\u0bb2\u0bbe\u0bae\u0bcd:",
    sec_home: "\ud83c\udfe0 \u0bae\u0bc1\u0b95\u0baa\u0bcd\u0baa\u0bc1",
    sec_party: "\ud83c\udfc1 \u0b95\u0b9f\u0bcd\u0b9a\u0bbf \u0baa\u0bb1\u0bcd\u0bb1\u0bbf",
    sec_features: "\ud83d\udcda \u0ba4\u0bb2\u0bc8\u0bae\u0bc8, \u0b95\u0bca\u0bb3\u0bcd\u0b95\u0bc8 & \u0bae\u0bc7\u0bb2\u0bc1\u0bae\u0bcd",
    sec_journey: "\ud83d\udcc5 \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0baa\u0baf\u0ba3\u0bae\u0bcd",
    sec_news: "\ud83d\udcf0 \u0b9a\u0bc6\u0baf\u0bcd\u0ba4\u0bbf\u0b95\u0bb3\u0bcd",
    sec_events: "\ud83d\udcf7 \u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd",
    sec_join: "\u2728 \u0b87\u0ba3\u0bc8\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd",
    sec_contact: "\ud83d\udcde \u0ba4\u0bca\u0b9f\u0bb0\u0bcd\u0baa\u0bc1",
    nav_done: "\u0baa\u0b95\u0bc1\u0ba4\u0bbf\u0b95\u0bcd\u0b95\u0bc1 \u0b9a\u0bc6\u0bb2\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0bbe\u0bae\u0bcd!",
    pet_name: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc1\u0bb4\u0bc1\u0baa\u0bcd \u0baa\u0bc6\u0baf\u0bb0\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd:",
    pet_phone: "\u0ba4\u0bca\u0bb2\u0bc8\u0baa\u0bc7\u0b9a\u0bbf \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd:",
    pet_email: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bbf\u0ba9\u0bcd\u0ba9\u0b9e\u0bcd\u0b9a\u0bb2\u0bcd \u0bae\u0bc1\u0b95\u0bb5\u0bb5\u0bb0\u0bbf (\u0bb5\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1\u0bb0\u0bbf\u0baf\u0ba4\u0bc1):",
    pet_area: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bb0\u0bcd\u0b9f\u0bc1 / \u0baa\u0b95\u0bc1\u0ba4\u0bbf\u0baf\u0bc8\u0ba4\u0bcd \u0ba4\u0bc7\u0bb0\u0bcd\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bb5\u0bc1\u0bae\u0bcd:",
    pet_subject: "\u0bae\u0ba9\u0bc1\u0bb5\u0bbf\u0ba9\u0bcd \u0ba4\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bc1 \u0b8e\u0ba9\u0bcd\u0ba9?",
    pet_summary: "\u0bae\u0ba9\u0bc1\u0bb5\u0bbf\u0ba9\u0bcd \u0b9a\u0bc1\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0ba4\u0bcd\u0ba4\u0bc8 \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd:",
    pet_photo: "\u0baa\u0bbf\u0bb0\u0b9a\u0bcd\u0b9a\u0ba9\u0bc8\u0baf\u0bbf\u0ba9\u0bcd \u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0bc8 \u0b87\u0ba3\u0bc8\u0b95\u0bcd\u0b95 \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bc1\u0b95\u0bbf\u0bb1\u0bc0\u0bb0\u0bcd\u0b95\u0bb3\u0bcd? \u0b95\u0bcb\u0baa\u0bcd\u0baa\u0bc8\u0baa\u0bcd \u0baa\u0ba4\u0bbf\u0bb5\u0bc7\u0bb1\u0bcd\u0bb1\u0bb5\u0bc1\u0bae\u0bcd \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 'Skip' \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bb5\u0bc1\u0bae\u0bcd.",
    pet_confirm: "\u0ba8\u0ba9\u0bcd\u0bb1\u0bbf! \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0ba9\u0bc1 \u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1. \u2705",
    pet_error: "\u0baa\u0bbf\u0bb4\u0bc8 \u0b8f\u0bb1\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1. \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0bae\u0bc1\u0baf\u0bb1\u0bcd\u0b9a\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd.",
    pet_submitting: "\u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0ba4\u0bc1...",
    back_menu: "\u2b05\ufe0f \u0bae\u0bc6\u0ba9\u0bc1\u0bb5\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa",
    input_placeholder: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0ba4\u0bbf\u0baf\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd...",
    input_locked_placeholder: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0bc8 \u0bae\u0bc7\u0bb2\u0bc7 \u0ba4\u0bc7\u0bb0\u0bcd\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bb5\u0bc1\u0bae\u0bcd...",
    title: "\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8",
    subtitle: "\u0b86\u0ba9\u0bcd\u0bb2\u0bc8\u0ba9\u0bcd"
  }
};

const sectionMap = {
  sec_home: "home",
  sec_party: "party",
  sec_features: "features",
  sec_journey: "our-journey",
  sec_news: "news",
  sec_events: "events",
  sec_join: "join",
  sec_contact: "contact"
};

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [chatLang, setChatLang] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("lang_select");
  const [petStep, setPetStep] = useState(0);
  const [petData, setPetData] = useState({ name: "", phone: "", email: "", area: "Tiruppur South", subject: "", summary: "", photo_data: "", photo_name: "" });
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!chatLang) {
      setMessages([
        { from: "bot", text: "Hello! \ud83d\udc4b / \u0ba8\u0bae\u0bb8\u0bcd\u0b95\u0bbe\u0bb0\u0bae\u0bcd! \ud83d\udc4b" },
        { from: "bot", text: "Please select your language / \u0bae\u0bca\u0bb4\u0bbf\u0baf\u0bc8\u0ba4\u0bcd \u0ba4\u0bc7\u0bb0\u0bcd\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bb5\u0bc1\u0bae\u0bcd:", buttons: [
          { label: "\ud83c\uddec\ud83c\udde7 English", action: "set_lang_en" },
          { label: "\ud83c\uddee\ud83c\uddf3 \u0ba4\u0bae\u0bbf\u0bb4\u0bcd", action: "set_lang_ta" }
        ]}
      ]);
      setMode("lang_select");
    }
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open, mode, petStep]);

  const t = chatLang ? chatCopy[chatLang] : chatCopy.en;

  const addMsg = (from, text, extra) => { setMessages(prev => [...prev, { from, text, ...extra }]); };

  const showMainMenu = (lang) => {
    const ct = chatCopy[lang];
    addMsg("bot", ct.welcome);
    addMsg("bot", ct.intro, { buttons: [
      { label: ct.opt_explore, action: "explore" },
      { label: ct.opt_petition, action: "petition" }
    ]});
  };

  const handlePetitionInput = (value) => {
    const steps = ["name", "phone", "email", "area", "subject", "summary", "photo"];
    const currentField = steps[petStep - 1];

    let userMsgText = value;
    if (currentField === "photo") {
      userMsgText = value ? `\ud83d\udcf7 ${value}` : (chatLang === "ta" ? "\u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0bae\u0bcd \u0ba4\u0bb5\u0bbf\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1" : "Skipped Photo");
    } else if (currentField === "email" && !value) {
      userMsgText = chatLang === "ta" ? "\u0bae\u0bbf\u0ba9\u0bcd\u0ba9\u0b9e\u0bcd\u0b9a\u0bb2\u0bcd \u0ba4\u0bb5\u0bbf\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1" : "Skipped Email";
    }
    addMsg("user", userMsgText);

    let cleanedValue = value;
    if (currentField === "phone") {
      cleanedValue = value.replace(/\D/g, '');
    }

    const newData = { ...petData, [currentField === "photo" ? "photo_name" : currentField]: cleanedValue };
    setPetData(newData);

    if (petStep < 7) {
      const nextStep = petStep + 1;
      setPetStep(nextStep);

      if (nextStep === 2) {
        addMsg("bot", t.pet_phone);
      } else if (nextStep === 3) {
        addMsg("bot", t.pet_email, { buttons: [{ label: chatLang === 'ta' ? "\u0ba4\u0bb5\u0bbf\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd (Skip)" : "Skip", action: "skip_email" }] });
      } else if (nextStep === 4) {
        addMsg("bot", t.pet_area, {
          buttons: [
            { label: "Tiruppur South", action: "area_Tiruppur South" },
            { label: "Tiruppur North", action: "area_Tiruppur North" },
            { label: "Tiruppur West", action: "area_Tiruppur West" },
            { label: "Other", action: "area_Other" }
          ]
        });
      } else if (nextStep === 5) {
        addMsg("bot", t.pet_subject);
      } else if (nextStep === 6) {
        addMsg("bot", t.pet_summary);
      } else if (nextStep === 7) {
        addMsg("bot", t.pet_photo, {
          buttons: [
            { label: chatLang === 'ta' ? "\u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0bae\u0bcd \u0baa\u0ba4\u0bbf\u0bb5\u0bc7\u0bb1\u0bcd\u0bb1\u0bb5\u0bc1\u0bae\u0bcd" : "Upload Photo", action: "upload_photo" },
            { label: chatLang === 'ta' ? "\u0ba4\u0bb5\u0bbf\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd (Skip)" : "Skip", action: "skip_photo" }
          ]
        });
      }
    } else {
      addMsg("bot", t.pet_submitting);

      fetch("/api/petitions/submit/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newData.name,
          phone: newData.phone,
          email: newData.email,
          area: newData.area,
          subject: newData.subject,
          summary: newData.summary,
          photo_data: newData.photo_data || "",
          photo_name: newData.photo_name || ""
        })
      })
        .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
        .then(() => {
          addMsg("bot", t.pet_confirm, { buttons: [{ label: t.back_menu, action: "back_menu" }] });
          setMode("menu");
          setPetStep(0);
          setPetData({ name: "", phone: "", email: "", area: "Tiruppur South", subject: "", summary: "", photo_data: "", photo_name: "" });
        })
        .catch(() => {
          addMsg("bot", t.pet_error, { buttons: [{ label: t.back_menu, action: "back_menu" }] });
          setMode("menu");
          setPetStep(0);
          setPetData({ name: "", phone: "", email: "", area: "Tiruppur South", subject: "", summary: "", photo_data: "", photo_name: "" });
        });
    }
  };

  const handleChatPhotoUpload = (base64Data, filename) => {
    setPetData(prev => ({
      ...prev,
      photo_data: base64Data,
      photo_name: filename
    }));
    handlePetitionInput(filename);
  };

  const handleAction = (action) => {
    if (action === "set_lang_en") { setChatLang("en"); setMode("menu"); addMsg("user", "🇬🇧 English"); showMainMenu("en"); return; }
    if (action === "set_lang_ta") { setChatLang("ta"); setMode("menu"); addMsg("user", "🇮🇳 தமிழ்"); showMainMenu("ta"); return; }
    
    if (action === "explore") {
      setMode("explore"); addMsg("user", t.opt_explore);
      const sectionKeys = ["sec_home", "sec_party", "sec_features", "sec_journey", "sec_news", "sec_events", "sec_join", "sec_contact"];
      addMsg("bot", t.explore_msg, { buttons: sectionKeys.map(k => ({ label: t[k], action: `nav_${k}` })) });
    } else if (action === "petition") {
      setMode("petition"); setPetStep(1); addMsg("user", t.opt_petition); addMsg("bot", t.pet_name);
    } else if (action === "back_menu") {
      setMode("menu"); setPetStep(0);
      addMsg("bot", t.intro, { buttons: [{ label: t.opt_explore, action: "explore" }, { label: t.opt_petition, action: "petition" }] });
    } else if (action === "skip_email") {
      handlePetitionInput("");
    } else if (action === "skip_photo") {
      handlePetitionInput("");
    } else if (action.startsWith("area_")) {
      const selectedArea = action.replace("area_", "");
      handlePetitionInput(selectedArea);
    } else if (action.startsWith("nav_")) {
      const key = action.replace("nav_", "");
      const sectionId = sectionMap[key];
      if (sectionId) {
        addMsg("user", t[key]);
        addMsg("bot", t.nav_done, { buttons: [{ label: t.back_menu, action: "back_menu" }] });
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSend = () => {
    const val = input.trim(); if (!val) return; setInput("");
    if (mode === "petition" && petStep >= 1) { handlePetitionInput(val); }
    else { addMsg("user", val); if (chatLang) { addMsg("bot", t.intro, { buttons: [{ label: t.opt_explore, action: "explore" }, { label: t.opt_petition, action: "petition" }] }); } }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const displayTitle = chatLang ? chatCopy[chatLang].title : "Tirumalai";
  const displaySub = chatLang ? chatCopy[chatLang].subtitle : "Online";

  const isInputNeeded = mode === "petition" && (petStep === 1 || petStep === 2 || petStep === 3 || petStep === 5 || petStep === 6);

  let currentPlaceholder = "";
  if (!chatLang) {
    currentPlaceholder = "Select language / மொழியைத் தேர்ந்தெடுக்கவும்...";
  } else if (isInputNeeded) {
    currentPlaceholder = t.input_placeholder;
  } else {
    currentPlaceholder = t.input_locked_placeholder;
  }

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(!open)} aria-label="Open chat assistant">
        {open ? <X size={24} /> : (
          <>
            <img src="/assets/branding/tirumalai-avatar.png" alt="Tirumalai" className="chatbot-fab-avatar" />
            <span className="chatbot-fab-dot" />
          </>
        )}
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <img src="/assets/branding/tirumalai-avatar.png" alt="Tirumalai" />
                <span className="chatbot-online-dot" />
              </div>
              <div>
                <div className="chatbot-title">{displayTitle}</div>
                <div className="chatbot-subtitle"><span className="chatbot-online-text-dot" />{displaySub}</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.from}`}>
                <div className="chatbot-bubble">{msg.text}</div>
                {msg.buttons && (
                  <div className="chatbot-buttons">
                    {msg.buttons.map((btn, j) => {
                      if (btn.action === "upload_photo") {
                        return (
                          <div key={j} style={{ position: 'relative', display: 'inline-block' }}>
                            <input
                              type="file"
                              accept="image/*"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0,
                                cursor: 'pointer',
                                width: '100%',
                                height: '100%',
                                zIndex: 10
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    handleChatPhotoUpload(event.target.result, file.name);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <button className="chatbot-option-btn" type="button" style={{ pointerEvents: 'none' }}>
                              📸 {btn.label}
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button key={j} className="chatbot-option-btn" onClick={() => handleAction(btn.action)}>
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-bar">
            <input 
              ref={inputRef} 
              type="text" 
              className="chatbot-input" 
              placeholder={currentPlaceholder} 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyDown} 
              disabled={!isInputNeeded}
            />
            <button className="chatbot-send" onClick={handleSend} disabled={!isInputNeeded} aria-label="Send message">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
