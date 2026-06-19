import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ChevronDown,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Star,
  Flag,
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  X,
  MessageCircle,
  Send,
  Camera,
  Inbox,
  Search
} from "lucide-react";
import "./styles.css";

const A = "/assets/";

const copy = {
  en: {
    home: "Home",
    party: "Party",
    news: "News",
    events: "Events",
    contact: "Contact",
    join: "Join Us",
    district: "Tamilaga Vettri Kazhagam",
    districtSub: "Tiruppur South District Chapter",
    partyName: "Tamilaga Vettri Kazhagam",
    heroKicker: "TIRUPPUR SOUTH DISTRICT CHAPTER",
    heroTitle: "TVK TIRUPPUR SOUTH",
    heroLead: "The official Tiruppur South organisation of Tamilaga Vettri Kazhagam. Ten constituencies, six victories, one mandate. A movement built around equality, dignity, and accountable governance.",
    heroCta: "Join TVK Tiruppur South",
    contactCta: "Contact Office",
    stat1: "Grassroots",
    stat1Label: "ward and booth work",
    stat2: "People",
    stat2Label: "welfare first",
    stat3: "Youth",
    stat3Label: "public service network",
    
    // Party Section
    s_about_eyebrow: "ABOUT THE PARTY",
    s_about_title: "Tamilaga Vettri Kazhagam",
    s_about_sub: "Founded on 2 February 2024 by Honorable CM Joseph Vijay. Single largest party in the 2026 Tamil Nadu Legislative Assembly.",
    s_pledge_text: "We work to advance people-centric politics, for the people, with the people, as one among the people. Tiruppur's support is part of that promise.",
    s_pledge_by: "TVK Foundational Pledge",
    s_flag_title: "Flag Description",
    s_flag_sub: "Every element on the TVK flag carries meaning. Here is what each stands for.",
    flag_red_h: "Blood Red",
    flag_red_b: "The top and bottom bands. The colour of struggle, of sacrifice, of the energy of the Tamil people.",
    flag_yellow_h: "Vibrant Yellow",
    flag_yellow_b: "The middle band. The colour of prosperity, of the harvest, of hope and a brighter tomorrow.",
    flag_vagai_h: "Vagai Flower",
    flag_vagai_b: "At the centre of the medallion. The Tamil symbol of victory — worn by warriors, awarded to winners.",
    flag_elephants_h: "Twin Elephants",
    flag_elephants_b: "Flanking the medallion. Symbols of strength, dignity, memory, and Tamil heritage.",
    flag_stars_h: "28 Stars",
    flag_stars_b: "Around the vagai medallion. The 28 initiatives and welfare programs of the party.",
    flag_source: "Source: tvkvijay.com/en/about-party",
    
    stat_founded: "FOUNDED",
    stat_founder: "FOUNDER",
    stat_symbol: "SYMBOL",
    stat_mandate: "MANDATE",
    stat_cm: "CHIEF MINISTER",
    stat_founder_v: "Hon. CM Joseph Vijay",
    stat_symbol_v: "Whistle (Visil)",
    stat_mandate_v: "Single largest party · 2026",
    stat_cm_v: "Hon. Vijay · since 2026",

    // Card Navigation
    c_leadership: "Leadership",
    c_ideology: "Ideology",
    c_action: "Action Plan",
    c_resolutions: "Resolutions",
    c_leadership_desc: "Guidance for equality and fair development.",
    c_ideology_desc: "Balanced growth through people-centric governance.",
    c_action_desc: "Clear steps for development and social empowerment.",
    c_resolutions_desc: "Commitment to lasting change and a better future.",
    
    // Card Detail Modals
    modal_leadership_title: "Leadership Ideology & Vision",
    modal_leadership_body: "He began his life as a film artist, but as a socially responsible human being, he immersed himself in all forms of social activity. He took on the great duty of shaping his fans into responsible individuals, transforming fan clubs into forums for public service. With social responsibility and selfless public service as his sole duty, the time came to organize the Thalapathy’s service-minded followers into a movement — thus was born the Vijay Makkal Iyakkam. From fasting in solidarity with Eelam Tamils, to raising his voice for Tamil Nadu’s fishermen, to standing firm for Tamil rights through Jallikattu, he led the movement not only in these struggles but also in countless welfare initiatives across Tamil Nadu, serving people of all ages, from children to the elderly. The leader’s direct political involvement came as the fulfillment of both his duties and the demand of the times. A leadership born solely out of people’s needs and trust now carries the responsibility of enabling a truly democratic future for Tamil Nadu.",
    
    modal_ideology_title: "Secular Principles of Social Justice",
    modal_ideology_body: "The party’s strength, foundation, vitality, and revolutionary declarations lie in its principles. To uphold the individual, social, economic, and political rights of all people living in Tamil Nadu, without reducing society to divisions of religion, caste, color, race, language, gender, or economic status, and to build an equitable society where everything is accessible to everyone.",
    
    modal_action_title: "Action Plan for Development",
    modal_action_body: "Tamilaga Vettri Kazhagam is not about promises alone; it is committed to creating and implementing programs for the welfare of the people. Our action plans are rooted in long-term ideals, serving as a guide to meet today’s needs and to shape the future development of Tamil Nadu.",
    
    modal_resolutions_title: "Declarations & Resolutions",
    modal_resolutions_body: "Our principle is simple: Power does not belong to parties, dynasties, or corporations. It belongs to the people. We are here to restore dignity, fairness, and truth in public life. The resolutions of Tamilaga Vettri Kazhagam stress strong actions and long-lasting solutions to address the challenges faced by our state.",
    
    // Journey Section
    j_title: "Our Journey",
    j_subtitle: "The milestones and historical evolution of our movement.",
    j_prev: "Previous",
    j_next: "Next",

    newsTitle: "Featured Updates",
    newsroom: "Newsroom",
    eventsTitle: "On the Ground Rallies & Conferences",
    joinTitle: "Stand with TVK Tiruppur South.",
    joinLead: "Volunteer for booth work, public outreach, welfare support, digital coordination, and local issue escalation across Tiruppur South.",
    formName: "Full name",
    formPhone: "Phone number",
    formArea: "Area / ward",
    formSubmit: "Register Interest",
    footerLead: "Tamilaga Vettri Kazhagam, Tiruppur South District Committee.",
    office: "TVK Tiruppur South City Office, Tiruppur South, Tamil Nadu",
    foot_pre: "TAMILAGA VETTRI KAZHAGAM",
    foot_h: "Join the movement.",
    foot_p: "Driven by the core vision that everyone deserves everything, Tamilaga Vetri Kazhagam works to advance people-centric politics - for the people, with the people, as one among the people. Be a part of this movement - join the party today and make your contribution count.",
    col_election: "2026 - Election",
    col_party: "PARTY",
    col_org: "ORGANISATION",
    col_updates: "UPDATES",
    col_more: "MORE",
    l_candidates: "Candidates for Victory",
    l_guarantees: "Election Guarantees",
    l_disclosures: "Disclosures",
    l_about: "About Party",
    l_ideology: "Ideology",
    l_action: "Action Plan",
    l_leadership: "Leadership",
    l_district_str: "District Structure",
    l_resolutions: "Resolutions",
    l_announcements: "Announcements",
    l_events: "Events",
    l_gallery: "Gallery",
    l_contact: "Contact",
    l_wings: "Wings",
    l_committees: "Committees",
    copyright: "© 2026 TVK Tiruppur South District Committee · tvktiruppursouth.com",
    office_label: "DISTRICT OFFICE",
    media_label: "MEDIA DESK",
    media_val: "+91 · Coming Soon"
  },
  ta: {
    home: "முகப்பு",
    party: "கட்சி",
    news: "செய்திகள்",
    events: "நிகழ்வுகள்",
    contact: "தொடர்பு",
    join: "இணையுங்கள்",
    district: "தமிழக வெற்றிக் கழகம்",
    districtSub: "திருப்பூர் தெற்கு மாவட்ட அமைப்பு",
    partyName: "தமிழக வெற்றிக் கழகம்",
    heroKicker: "திருப்பூர் தெற்கு மாவட்ட அமைப்பு",
    heroTitle: "தவெக திருப்பூர் தெற்கு",
    heroLead: "தமிழக வெற்றிக் கழகத்தின் அதிகாரப்பூர்வ திருப்பூர் தெற்கு அமைப்பு. பத்து தொகுதிகள், ஆறு வெற்றிகள், ஒரு மக்கள் தீர்ப்பு. சமத்துவம், மரியாதை, பொறுப்பான ஆட்சி ஆகியவற்றை மையமாகக் கொண்ட இயக்கம்.",
    heroCta: "தவெக திருப்பூர் தெற்கு சேர",
    contactCta: "அலுவலக தொடர்பு",
    stat1: "அடித்தளம்",
    stat1Label: "வார்டு மற்றும் பூத் பணி",
    stat2: "மக்கள்",
    stat2Label: "நலன் முதலில்",
    stat3: "இளையோர்",
    stat3Label: "சேவை வலைப்பின்னல்",
    
    // Party Section
    s_about_eyebrow: "கட்சியைப் பற்றி",
    s_about_title: "தமிழக வெற்றிக் கழகம்",
    s_about_sub: "மாண்புமிகு முதலமைச்சர் ஜோசப் விஜய் அவர்களால் 2 பிப்ரவரி 2024-இல் தொடங்கப்பட்டது. 2026 தமிழ்நாடு சட்டமன்றத்தில் தனிப்பெரும் கட்சி.",
    s_pledge_text: "மக்களுக்காக, மக்களோடு, மக்களில் ஒருவராக. மக்கள் மய அரசியலை முன்னெடுக்கிறோம். திருப்பூர் தெற்கு மக்கள் ஆதரவு அந்த உறுதிமொழியின் ஒரு பகுதி.",
    s_pledge_by: "தவெக Foundational Pledge",
    s_flag_title: "கொடி விளக்கம்",
    s_flag_sub: "தவெக கொடியின் ஒவ்வொரு அங்கமும் ஒரு பொருளைச் சுமக்கிறது. ஒவ்வொன்றும் என்ன குறிக்கிறது என்பதைக் காண்க.",
    flag_red_h: "செந்நிற இரத்த சிவப்பு",
    flag_red_b: "மேலும் கீழும் உள்ள பட்டைகள். போராட்டத்தின் நிறம். தியாகத்தின் நிறம். தமிழ் மக்களின் உயிர்த்துடிப்பின் நிறம்.",
    flag_yellow_h: "மஞ்சள் பட்டை",
    flag_yellow_b: "நடுவில் உள்ள பட்டை. செழுமையின் நிறம், அறுவடையின் நிறம், நம்பிக்கையின் நிறம்.",
    flag_vagai_h: "வாகை மலர்",
    flag_vagai_b: "கொடியின் மையத்தில் உள்ள சின்னம். தமிழர்களின் வெற்றிச் சின்னம் — வீரர்கள் சூடியது, வெற்றியாளர்களுக்கு வழங்கப்படுவது.",
    flag_elephants_h: "இரட்டை யானைகள்",
    flag_elephants_b: "சின்னத்தின் இரு புறமும். வலிமை, கௌரவம், நினைவு, தமிழர் பாரம்பரியத்தின் சின்னம்.",
    flag_stars_h: "இருபத்தெட்டு நட்சத்திரங்கள்",
    flag_stars_b: "வாகை சின்னத்தைச் சுற்றியுள்ள நட்சத்திரங்கள். கட்சியின் 28 செயல் திட்டங்களையும் நலத் திட்டங்களையும் குறிக்கிறது.",
    flag_source: "மூலம்: tvkvijay.com/ta/about-party",
    
    stat_founded: "தொடக்கம்",
    stat_founder: "நிறுவனர்",
    stat_symbol: "சின்னம்",
    stat_mandate: "மக்கள் தீர்ப்பு",
    stat_cm: "முதலமைச்சர்",
    stat_founder_v: "மாண்புமிகு முதலமைச்சர் ஜோசப் விஜய்",
    stat_symbol_v: "விசில்",
    stat_mandate_v: "தனிப்பெரும் கட்சி · 2026",
    stat_cm_v: "மாண்புமிகு விஜய் · 2026 முதல்",

    // Card Navigation
    c_leadership: "தலைமை",
    c_ideology: "கொள்கை",
    c_action: "செயல் திட்டம்",
    c_resolutions: "தீர்மானங்கள்",
    c_leadership_desc: "சமத்துவம் மற்றும் நியாயமான வளர்ச்சிக்கு வழிகாட்டுதல்.",
    c_ideology_desc: "மக்கள் மைய ஆட்சி மூலம் சீரான வளர்ச்சி.",
    c_action_desc: "வளர்ச்சி மற்றும் சமூக அதிகாரமளிப்பதற்கான தெளிவான படிகள்.",
    c_resolutions_desc: "நிலையான மாற்றம் மற்றும் சிறந்த எதிர்காலத்திற்கான அர்ப்பணிப்பு.",
    
    // Card Detail Modals
    modal_leadership_title: "தலைமைத்துவம் மற்றும் தொலைநோக்கு பார்வை",
    modal_leadership_body: "திரைப்பட கலைஞராக வாழ்க்கையைத் தொடங்கியவர், சமூகப் பொறுப்புமிக்க மனிதராக அனைத்து சமூகச் செயல்பாடுகளிலும் தன்னை ஈடுபடுத்திக் கொண்டவர். தனது ரசிகர்களைப் பொறுப்புமிக்க மனிதர்களாக மேம்படுத்தும் பெரும் கடமையை ஏற்று நடத்தினார். ரசிகர் மன்றத்தை நற்பணி மன்றமாக மாற்றினார். சமூகப் பொறுப்பு, தன்னலமற்ற பொதுச் சேவைகளை மட்டுமே கடமையாகக் கொண்டு செயல்பட்ட தளபதியின் நற்பணி மன்றத் தோழர்களை, இயக்கமாக ஒருங்கிணைப்பதன் காலத்தின் தேவையின் பொருட்டு 'விஜய் மக்கள் இயக்கம்' தொடங்கப்பட்டது. ஈழத்தமிழ் உறவுகளுக்காக உண்ணாவிரதப் போராட்டம், தமிழக மீனவர்களுக்காகக் குரல், ஜல்லிக்கட்டு தமிழர்களின் உரிமைக்காகத் துணை நின்றது போன்ற சமூகக் களத்திலும், குழந்தைகள் முதல் முதியவர்கள் வரை அனைத்து தரப்பினருக்கான தேவைகள் எனத் தமிழகம் முழுவதும் மேற்கொண்ட நற்பணிகளையும் மக்கள் இயக்கமாக வழிநடத்தினார். கழகத் தலைவரின் நேரடி அரசியல் ஈடுபாடு என்பது அவரது கடமையான பொறுப்புகளையும், காலத்தின் மற்ற தேவையை நிறைவு செய்வதாக நிகழ்ந்துள்ளது. மக்களின் தேவையையும் நம்பிக்கையையும் மட்டுமே ஏற்று உருவான தலைமை, தமிழகத்தின் வருங்கால மக்களாட்சிக்கான பொறுப்பைச் சாத்தியப்படுத்தும்.",
    
    modal_ideology_title: "மதச்சார்பற்ற சமூகநீதி கொள்கைகள்",
    modal_ideology_body: "கழகத்தின் வளம், அடித்தளம், உயிரோட்டம் மற்றும் புரட்சிகர பிரகடனங்களாகக் கொள்கைகள் இருக்கின்றன. மதம், சாதி, நிறம், இனம், மொழி, பாலின அடையாளம், பொருளாதாரம் என்கிற தனி அடையாளங்களுக்குள் மனித சமூகத்தைச் சுருக்காது, தமிழ்நாட்டில் வாழும் அனைத்து மக்களின் தனிமனித, சமூக, பொருளாதார அரசியல் உரிமைகளை நிலைநிறுத்தி எல்லோருக்கும் எல்லாமும் ஆன சமநிலைச் சமூகம் உருவாக்குவது.",
    
    modal_action_title: "வளர்ச்சிக்கான செயல் திட்டம்",
    modal_action_body: "தமிழக வெற்றிக் கழகம், வாக்குறுதிகளை மட்டுமல்ல; மக்கள் நலனுக்காகச் செயல்படும் திட்டங்களை உருவாக்கி, நடைமுறைப்படுத்துவதை லட்சியமாகக் கொண்டுள்ளது. எங்கள் செயல் திட்டங்கள், நீண்டகாலப் பார்வையை அடிப்படையாகக் கொண்டு, இன்றைய தேவை மற்றும் எதிர்காலத் தமிழகத்தின் வளர்ச்சிக்கான வழிகாட்டியாக இருப்பவை.",
    
    modal_resolutions_title: "தீர்மானங்கள் மற்றும் பிரகடனம்",
    modal_resolutions_body: "எங்கள் கொள்கை எளிதானது: அதிகாரம் கட்சிகளுக்கோ, வம்சங்களுக்கோ அல்லது கார்ப்பரேட்டுகளுக்கோ சொந்தமானது அல்ல. அது மக்களுக்குச் சொந்தமானது. பொது வாழ்வில் கண்ணியம், நேர்மை மற்றும் உண்மையைக் மீட்டெடுக்க நாங்கள் இங்கு வந்துள்ளோம். தீர்க்கமான அம்சங்களுடன் கூடிய முன்னெடுப்புகளையும் தீர்வுகளையும் வலியுறுத்துவதே தமிழக வெற்றிக் கழகத்தின் தீர்மானங்கள் ஆகும்.",
    
    // Journey Section
    j_title: "எங்கள் பயணம்",
    j_subtitle: "எங்கள் இயக்கத்தின் மைல்கற்கள் மற்றும் வரலாற்று பரிணாமம்.",
    j_prev: "முந்தைய",
    j_next: "அடுத்து",

    newsTitle: "செய்தி அறை",
    newsroom: "செய்திகள்",
    eventsTitle: "பேரணி, மாநாடு மற்றும் ரோட்ஷோக்கள்",
    joinTitle: "தவெக திருப்பூர் தெற்குடன் இணையுங்கள்.",
    joinLead: "பூத் பணி, மக்கள் தொடர்பு, நலத்திட்ட உதவி, டிஜிட்டல் ஒருங்கிணைப்பு, உள்ளூர் பிரச்சினை பதிவு ஆகியவற்றில் தன்னார்வமாகப் பங்கெடுக்கலாம்.",
    formName: "முழு பெயர்",
    formPhone: "தொலைபேசி எண்",
    formArea: "பகுதி / வார்டு",
    formSubmit: "விருப்பம் பதிவு",
    footerLead: "தமிழக வெற்றிக் கழகம், திருப்பூர் தெற்கு மாவட்டக் குழு.",
    office: "தவெக திருப்பூர் தெற்கு மாநகர அலுவலகம், திருப்பூர், தமிழ்நாடு",
    foot_pre: "தமிழக வெற்றிக் கழகம்",
    foot_h: "இயக்கத்தில் இணையுங்கள்.",
    foot_p: "எல்லோருக்கும் எல்லாமும் என்ற கோட்பாட்டின் அடிப்படையில் மக்களுக்கான மக்கள் மய அரசியலை முன்னெடுக்கிறோம். இயக்கத்தில் இணைந்து உங்களது பங்களிப்பை அளியுங்கள்.",
    col_election: "2026 - தேர்தல்",
    col_party: "கட்சி",
    col_org: "அமைப்பு",
    col_updates: "புதுப்பிப்புகள்",
    col_more: "மேலும்",
    l_candidates: "வெற்றி வேட்பாளர்கள்",
    l_guarantees: "தேர்தல் வாக்குறுதிகள்",
    l_disclosures: "வெளிப்பாடுகள்",
    l_about: "கட்சி பற்றி",
    l_ideology: "கொள்கை",
    l_action: "செயல் திட்டம்",
    l_leadership: "தலைமை",
    l_district_str: "மாவட்ட அமைப்பு",
    l_resolutions: "தீர்மானங்கள்",
    l_announcements: "அறிவிப்புகள்",
    l_events: "நிகழ்வுகள்",
    l_gallery: "படங்கள்",
    l_contact: "தொடர்பு",
    l_wings: "பாசறைகள்",
    l_committees: "குழுக்கள்",
    copyright: "© 2026 தவெக திருப்பூர் தெற்கு மாவட்டக் குழு · tvktiruppursouth.com",
    office_label: "மாவட்ட அலுவலகம்",
    media_label: "ஊடகத் தொடர்பு",
    media_val: "+91 · விரைவில்"
  }
};

const defaultUpdates = [
  {
    img: `${A}sampath/cabinet-expansion.webp`,
    tag: "Organisation",
    title: "District coordination desk prepared for Tiruppur South outreach",
    text: "A clean public presence for announcements, membership drives, gallery records, and volunteer contact."
  },
  {
    img: `${A}rallies/western-region-conference.jpg`,
    tag: "Cadres",
    title: "Western Tamil Nadu cadre energy carried into local booth planning",
    text: "The page mirrors the reference site's rally-first visual tone while focusing the copy on local work."
  },
  {
    img: `${A}branding/flag.png`,
    tag: "Flag",
    title: "TVK identity preserved with crimson, gold, flag, and ideology elements",
    text: "UI polish improves scanability while keeping the theme recognizable."
  }
];

const defaultEvents = [
  { src: `${A}sampath/vijay-oath.jpg`, caption: "CM Oath · 10 May 2026", span: { col: 4, row: 2 } },
  { src: `${A}sampath/cabinet-expansion.webp`, caption: "Cabinet · 21 May 2026", span: { col: 2, row: 2 } },
  { src: `${A}rallies/western-region-conference.jpg`, caption: "Western Region Conference", span: { col: 3, row: 2 } },
  { src: `${A}rallies/vijay-addressing-cadres.jpg`, caption: "Cadre Address · Kongu", span: { col: 3, row: 2 } },
  { src: `${A}rallies/vijay-roadshow.jpg`, caption: "Roadshow · Day 2", span: { col: 2, row: 1 } },
  { src: `${A}rallies/vijay-coimbatore-bang.webp`, caption: "Avinashi Road Roadshow", span: { col: 4, row: 1 } }
];

function Header({ lang, setLang, setShowTrackModal, setShowJoinModal, setShowContactModal }) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="TVK Tiruppur South Home">
        <img src={`${A}branding/tvk-logo-192.png`} alt="TVK" />
        <div className="brand-text">
          <b>{t.district}</b>
          <small>{lang === 'en' ? 'TIRUPPUR SOUTH' : 'திருப்பூர் தெற்கு'}</small>
        </div>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#party">{t.party}</a>
        <a href="#news">{t.news}</a>
        <a href="#events">{t.events}</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}>{t.contact}</a>
        <button 
          type="button" 
          onClick={() => setShowTrackModal(true)} 
          className="nav-track-btn"
        >
          {lang === 'en' ? 'Track Petition' : 'மனுவைத் தேட'}
        </button>
        <a 
          href="https://tvk.world/register" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ background: '#ffd84a', color: '#3f0608', padding: '8px 16px', borderRadius: '20px', marginLeft: '10px', fontWeight: 'bold' }}
        >
          {t.join}
        </a>
      </nav>
      
      <div className="lang-switcher-pill" style={{ marginLeft: '15px' }}>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        <button className={lang === "ta" ? "active" : ""} onClick={() => setLang("ta")}>த</button>
      </div>

      <button className="menu-btn" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={24} />
      </button>

      {open && (
        <div className="drawer-shell" role="dialog" aria-modal="true">
          <button className="drawer-backdrop" type="button" onClick={() => setOpen(false)} />
          <div className="drawer">
            <button className="close-btn" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={24} style={{ color: '#ffd84a' }} />
            </button>
            <div className="drawer-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img src={`${A}branding/tvk-logo-192.png`} alt="TVK" style={{ width: '40px', height: '40px' }} />
              <span style={{ color: '#ffd84a', fontWeight: '800', fontSize: '1.5rem' }}>{t.district}</span>
            </div>
            <a href="#party" onClick={() => setOpen(false)}>{t.party}</a>
            <a href="#news" onClick={() => setOpen(false)}>{t.news}</a>
            <a href="#events" onClick={() => setOpen(false)}>{t.events}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setOpen(false); setShowContactModal(true); }}>{t.contact}</a>
            <a 
              href="#track-petition" 
              onClick={(e) => { e.preventDefault(); setOpen(false); setShowTrackModal(true); }}
              style={{ color: '#ffd84a' }}
            >
              {lang === 'en' ? 'Track Petition' : 'மனுவைக் கண்காணிக்க'}
            </a>
            <a 
              href="https://tvk.world/register" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setOpen(false)} 
              style={{ color: '#ffd84a', fontWeight: 'bold' }}
            >
              {t.join}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ lang, setShowJoinModal, setShowPetitionModal, setShowContactModal }) {
  const t = copy[lang];
  return (
    <section id="home" className="hero">
      <div className="hero-video-stage">
        <div className="hero-bg" />
        <div className="hero-visual">
          <video
            src={`${A}hero/TVK_FINAL_ULTRA.webm`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
      <div className="hero-copy official-box">
        <p className="eyebrow">{t.heroKicker}</p>
        <h1>{t.heroTitle}</h1>
        <p className="hero-lead">{t.heroLead}</p>
        <div className="hero-actions">
          <a className="primary-btn" href="#join" onClick={(e) => { e.preventDefault(); setShowJoinModal(true); }}>
            {t.heroCta}
            <ChevronRight size={18} />
          </a>
          <a className="ghost-btn" href="#contact" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}>
            {t.contactCta}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="stat-row">
          {[
            [t.stat1, t.stat1Label],
            [t.stat2, t.stat2Label],
            [t.stat3, t.stat3Label]
          ].map(([n, l]) => (
            <div className="stat" key={n}>
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartySection({ lang }) {
  const t = copy[lang];
  const flagCards = [
    { id: "red", h: t.flag_red_h, b: t.flag_red_b, swatch: "linear-gradient(180deg, #C71820, #7A1018)" },
    { id: "yellow", h: t.flag_yellow_h, b: t.flag_yellow_b, swatch: "linear-gradient(180deg, #FFD84A, #F5C518)" },
    { id: "vagai", h: t.flag_vagai_h, b: t.flag_vagai_b, image: `${A}branding/flag-element-vagai.png` },
    { id: "elephants", h: t.flag_elephants_h, b: t.flag_elephants_b, image: `${A}branding/flag-element-elephants.jpg` },
    { id: "stars", h: t.flag_stars_h, b: t.flag_stars_b, image: `${A}branding/flag-element-stars.png` }
  ];

  return (
    <section id="party" className="about-tvk">
      <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 30px auto' }}>
        <p className="eyebrow" style={{ color: '#ffd84a' }}>{t.s_about_eyebrow}</p>
        <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>{t.s_about_title}</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '800px', margin: '10px auto' }}>{t.s_about_sub}</p>
      </div>

      <div className="about-pledge">
        <div className="quote-mark">“</div>
        <div className="body">{t.s_pledge_text}</div>
        <div className="by">{t.s_pledge_by}</div>
      </div>

      <div className="flag-feature">
        <div className="flag-feature-img">
          <img src={`${A}branding/flag.png`} alt="TVK Flag" />
        </div>
        <div className="flag-feature-text">
          <span className="flag-feature-eyebrow">{lang === 'en' ? 'THE FLAG' : 'கொடி'}</span>
          <h3 className="flag-feature-title">{t.s_flag_title}</h3>
          <p className="flag-feature-sub">{t.s_flag_sub}</p>
          <div className="flag-cards">
            {flagCards.map((c) => (
              <div key={c.id} className="flag-card">
                {c.image ? (
                  <div className="flag-card-cue flag-card-cue-img">
                    <img src={c.image} alt="" />
                  </div>
                ) : (
                  <div className="flag-card-cue-swatch" style={{ background: c.swatch }} />
                )}
                <div className="flag-card-body">
                  <div className="flag-card-h">{c.h}</div>
                  <div className="flag-card-b">{c.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-stats-strip">
        <div className="ass-cell">
          <span className="ass-k">{t.stat_founded}</span>
          <span className="ass-v num">2 Feb 2024</span>
        </div>
        <div className="ass-cell">
          <span className="ass-k">{t.stat_founder}</span>
          <span className="ass-v">{t.stat_founder_v}</span>
        </div>
        <div className="ass-cell">
          <span className="ass-k">{t.stat_symbol}</span>
          <span className="ass-v">{t.stat_symbol_v}</span>
        </div>
        <div className="ass-cell">
          <span className="ass-k">{t.stat_mandate}</span>
          <span className="ass-v">{t.stat_mandate_v}</span>
        </div>
        <div className="ass-cell">
          <span className="ass-k">{t.stat_cm}</span>
          <span className="ass-v">{t.stat_cm_v}</span>
        </div>
      </div>
    </section>
  );
}

const timelineEvents = {
  en: [
    {
      year: "1992",
      title: "Ilaya Thalapathy Vijay Welfare Association",
      desc: "The journey of our leader was not laid out with flowers. He turned obstacles into stepping stones and marched forward with determination. His life stands as a story of success. Since 1992, his supporters have been defined by their commitment to social service. What began as a gathering of admirers naturally evolved into a fan movement. He then transformed it into a service organization, and ultimately into a people’s movement - a true testament to his leadership. He introduced a flag for the movement and gave it a powerful call: “Work! Rise! You Can!” - a vision that continues to inspire and lead the way.",
      img: "/assets/timeline/1990.png"
    },
    {
      year: "2001",
      title: "Extending a Helping Hand, He Took to the Streets with a Cause",
      desc: "During natural disasters such as the tsunami and the Gujarat Bhuj earthquake, he stepped forward to extend support, personally taking to the streets with a donation box. Inspired by his actions, lakhs of supporters joined the cause and rose to the occasion. When it comes to stepping into the field and delivering help, none can match the dedication and spirit of the welfare association.",
      img: "/assets/timeline/2001_welfare.jpg"
    },
    {
      year: "2008",
      title: "Hunger Strike for Eelam Tamils - A Stand for Justice",
      desc: "In 2008, as Tamils in Sri Lanka - our own blood and kin - faced brutal atrocities, our leader rose in defiance and led a hunger strike in Chepauk, condemning the injustice. This was not just a protest - it was a call to conscience. Across Tamil Nadu, members of the welfare association took to the streets, staging hunger strikes in solidarity. What began as one voice turned into a powerful wave of resistance, echoing the demand for justice and dignity.",
      img: "/assets/timeline/2008_eelam.jpg"
    },
    {
      year: "2011",
      title: "Protest for Tamil Nadu Fishermen",
      desc: "In Nagapattinam, condemning the brutal killing of Tamil Nadu fishermen, our leader led a massive protest gathering. Calling it a “Cruelty where even palm-wood boats become coffins,” he spoke with fire and conviction. In that charged moment, he invoked the spirit of the fearless Tamil woman who once struck down a tiger with bare courage, declaring, “We are the descendants of that bravery… We are tiger cubs!”. It was a roar of resistance rather than a mere speech.",
      img: "/assets/timeline/2011_fishermen.jpg"
    },
    {
      year: "2017",
      title: "With Anitha’s Family - Standing in Solidarity",
      desc: "In 2017, after Anitha - who scored 1176 out of 1200 in her Class 12 exams - lost her life due to the NEET examination, our leader personally visited her home. He stood with her grieving family, offering comfort and support in their moment of profound loss.",
      img: "/assets/timeline/2017_anitha.jpg"
    },
    {
      year: "2020",
      title: "A Helping Hand in Times of Crisis - Kerala Floods & Pandemic Relief",
      desc: "During the devastating COVID-19 pandemic in 2020, our leader contributed ₹1.3 crore as relief support, standing firmly with the people in a time of global crisis. When Kerala was affected by floods, he extended immediate assistance by sending relief materials in truckloads, reaching those affected in their hour of need.",
      img: "/assets/timeline/2020_kerala_flood.png"
    },
    {
      year: "2021",
      title: "2021 Rural Local Body Elections",
      desc: "In the 2021 rural local body elections, members of the Makkal Iyakkam contested by showcasing only Thalapathi’s photo. They emerged victorious in 127 seats, marking a significant grassroots breakthrough. Beyond electoral success, Makkal Iyakkam continued to act where systems often fall short - through initiatives like blood banks, eye care support, educational centers, libraries, legal aid services, Bread, Milk, and Egg Scheme, and housing support - delivering real impact on the ground.",
      img: "/assets/timeline/2021_local_body.webp"
    },
    {
      year: "2024",
      title: "Tamilaga Vetri Kazhagam - The Beginning of a New Chapter",
      desc: "On February 2, 2024, our leader announced the formation of the political party, Tamilaga Vetri Kazhagam, marking the start of a new political journey. On August 22, 2024, the party’s flag was formally unveiled.",
      img: "/assets/timeline/2024_tvk_launch.webp"
    },
    {
      year: "2024",
      title: "Vetri Kolgai Thiruvizha - A Historic First State Conference",
      desc: "On October 27, 2024, in Vikravandi, Villupuram district, a massive conference titled “Vetri Kolgai Thiruvizha” was held, drawing participation from over 1.5 million people. At this first state conference, our leader unveiled the movement’s five core ideological leaders, sending a powerful message across all directions. Tamilaga Vetri Kazhagam stands as the only political party in Tamil Nadu to declare women as ideological leaders - marking a bold and historic step in political representation.",
      img: "/assets/timeline/2024_state_conference.jpg"
    },
    {
      year: "2025",
      title: "Parandur Protest - A Leader Who Rose as the Voice of the People",
      desc: "Stepping into the field against the Parandur airport issue - which threatens water bodies, agricultural lands, and farming communities - our leader stood firmly with the people. When he came to meet his own people, countless obstacles were placed in his path. Yet, rising above every barrier, he became the voice of the voiceless - and continues to echo their concerns.",
      img: "/assets/timeline/2025_parandur.webp"
    }
  ],
  ta: [
    {
      year: "1992",
      title: "இளைய தளபதி விஜய் நற்பணி மன்றம்",
      desc: "வெற்றித் தலைவரின் பயணம் மலர் பாதைகளால் அமைந்தது அல்ல. தடைக்கற்களை படிக்கற்களாக்கி வீறு நடை போட்டவர். அவரது வாழ்க்கை ஒரு வெற்றிகரமான வரலாறு. 1992 முதல் சமூக சேவையால் தான் அவரது ரசிகர்கள் அடையாளம் பெற்றனர். அவருக்காக தானா சேர்ந்த கூட்டம் ரசிகர் மன்றமாக மாறியது. பின்பு அதை நற்பணி மன்றமாக உருமாற்றி, பின்னர் மக்கள் இயக்கமாக மாற்றிக் காட்டிய மாஸ்டர் தான் தளபதி. மக்கள் இயக்கத்திற்கென கொடியை அறிமுகம் செய்து, உழைத்திடு! உயர்ந்திடு! உன்னால் முடியும்! என்ற கொள்கை முழக்கத்தை வெற்றித் தலைவர் முன்னிறுத்தினார்.",
      img: "/assets/timeline/1990.png"
    },
    {
      year: "2001",
      title: "உதவிக்கரம் நீட்டிய தளபதி, உண்டியல் ஏந்தி தெருத்தெருவாக சென்றார்",
      desc: "சுனாமி, குஜராத் பூஜ் பூகம்பம் போன்ற இயற்கை பேரிடர் சம்பவங்களுக்கு உதவிக்கரம் நீட்டிய தளபதி, உண்டியல் ஏந்தி தெருத்தெருவாக சென்றார். அவரைப் பார்த்து லட்சக்கணக்கான ரசிகர்களும் களத்தில் குதித்தார்கள். களத்தில் இறங்கி உதவி செய்வதில் மக்கள் இயக்கத்தினருக்கு நிகர் ஏதுமில்லை.",
      img: "/assets/timeline/2001_welfare.jpg"
    },
    {
      year: "2008",
      title: "ஈழத் தமிழர்களுக்காக உண்ணாவிரதப் போராட்டம் - நீதிக்கான குரல்",
      desc: "2008 இல், இலங்கையில் நமது தொப்புள்கொடி உறவுகளான ஈழத் தமிழர்கள் கொடூரமான அத்துமீறல்களையும் இன்னல்களையும் சந்தித்தபோது, நமது தலைவர் அதற்கு கண்டனம் தெரிவித்து சென்னை சேப்பாக்கத்தில் உண்ணாவிரதப் போராட்டத்தை முன்னெடுத்தார். இது வெறும் போராட்டம் மட்டுமல்ல - மக்களின் மனசாட்சிக்கான அழைப்பு. தமிழகம் முழுவதும் நற்பணி மன்ற உறுப்பினர்கள் தார்மீக ஆதரவாக வீதிகளில் இறங்கி உண்ணாவிரதப் போராட்டங்களை நடத்தினார்கள். ஒரு குரலாகத் தொடங்கியது, நீதியையும் கண்ணியத்தையும் கோரும் சக்திவாய்ந்த எதிர்ப்பலையாக மாறியது.",
      img: "/assets/timeline/2008_eelam.jpg"
    },
    {
      year: "2011",
      title: "தமிழக மீனவர்களுக்கான கண்டனப் போராட்டம்",
      desc: "நாகப்பட்டினத்தில், தமிழக மீனவர்கள் கொடூரமாகக் கொல்லப்பட்டதைக் கண்டித்து, நமது தலைவர் ஒரு மாபெரும் கண்டனப் போராட்டத்தை நடத்தினார். \"பனை மரப் படகுகளும் சவப்பெட்டிகளாக மாறும் கொடுமை\" என்று அதனை வர்ணித்த அவர், மிகுந்த ஆவேசத்துடனும் உறுதியுடனும் பேசினார். அந்த உணர்ச்சிப்பூர்வமான தருணத்தில், வெறும் கையால் புலியை விரட்டியடித்த வீரத் தமிழ்ப் பெண்ணின் வீரத்தை நினைவு கூர்ந்த அவர், “நாம் அந்த வீரத்தின் வழிவந்தவர்கள்… நாம் புலிக்குட்டிகள்!” என்று முழங்கினார். இது வெறும் பேச்சு அல்ல, எதிர்ப்பின் கர்ஜனை!",
      img: "/assets/timeline/2011_fishermen.jpg"
    },
    {
      year: "2017",
      title: "தங்கை அனிதாவின் வீட்டில் தளபதி",
      desc: "பிளஸ் டூ தேர்வில் 1200க்கு 1176 மதிப்பெண்களை பெற்றும் மருத்துவராக முடியாத தங்கை அனிதாவை நீட் தேர்வு கொன்றது. 2017 ஆம் ஆண்டு அவரது வீட்டுக்கே சென்று, அவரது குடும்பத்தினருக்கு ஆறுதல் வழங்கினார்.",
      img: "/assets/timeline/2017_anitha.jpg"
    },
    {
      year: "2020",
      title: "கேரள வெள்ளத்தின் போது தளபதியின் உதவிக் கரம்",
      desc: "2020 ல் கொடிய கொரோனா பேரிடர் காலம். ஒரு கோடியே 30 லட்சம் ரூபாயை நன்கொடையாக கொடுத்தார் தளபதி. கேரளா, வெள்ளத்தில் மிதந்த போது, லாரி லாரியாய் நிவாரண பொருட்களை அனுப்பி வைத்தார் தளபதி அவர்கள்.",
      img: "/assets/timeline/2020_kerala_flood.png"
    },
    {
      year: "2021",
      title: "2021 ஊரக உள்ளாட்சித் தேர்தல்",
      desc: "2021ல் ஊரக உள்ளாட்சித் தேர்தல். தளபதியின் போட்டோவை மட்டும் காட்டி இயக்கத் தோழர்கள் போட்டியிட்டார்கள். 127 இடங்களில் வெற்றி வாகை சூடினார்கள். குருதியகம், விழியகம், பயிலகம், நூலகம், சட்ட ஆலோசனை மையம், ரொட்டி பால் முட்டை திட்டம், விலையில்லா விருந்தகம், விலையில்லா வீடு கட்டும் திட்டம் இப்படி ஒரு அரசாங்கம் செய்ய வேண்டிய வேலையை மக்கள் இயக்கம் செய்கிறது.",
      img: "/assets/timeline/2021_local_body.webp"
    },
    {
      year: "2024",
      title: "தமிழக வெற்றிக் கழகம்: புது அத்தியாயத்தின் தொடக்கம்",
      desc: "2024ஆம் ஆண்டு பிப்ரவரி மாதம் 2 ஆம் தேதி தமிழக வெற்றிக் கழகம் என்ற அரசியல் கட்சியை அறிவித்தார் தலைவர் அவர்கள். 22.08.2024 அன்று தமிழக வெற்றி கழகத்தின் கொடி முறைப்படி அறிமுகம் செய்யப்பட்டது.",
      img: "/assets/timeline/2024_tvk_launch.webp"
    },
    {
      year: "2024",
      title: "வெற்றிக் கொள்கைத் திருவிழா: வரலாறு படைத்த முதல் மாநில மாநாடு",
      desc: "விழுப்புரம் மாவட்டம், விக்கிரவாண்டியில் 27.10.2024 அன்று வெற்றிக் கொள்கைத் திருவிழா என்ற பெயரில் 15 லட்சத்திற்கும் அதிகமானோர் பங்கேற்ற மாநாடு நடத்தப்பட்டது. முதல் மாநில மாநாட்டில் கழகத்தின் ஐம்பெரும் கொள்கைத் தலைவர்களை அறிவித்து அத்தனை திசைகளையும் அதிர வைத்தார். தமிழ் நிலப் பரப்பில் பெண்களை கொள்கை தலைவர்களாக பிரகடனம் செய்த ஒரே கட்சி தமிழக வெற்றிக் கழகம்.",
      img: "/assets/timeline/2024_state_conference.jpg"
    },
    {
      year: "2025",
      title: "பரந்தூர் போராட்டம்: மக்களின் குரலாக எழுந்த தலைவர்",
      desc: "நீர்நிலைகளை, விவசாய நிலங்களை, விவசாயப் பெருங்குடி மக்களைப் பாதிக்கும் பரந்தூர் விமான நிலைய பிரச்சனைக்காக களத்திற்கு வந்தார். சொந்த நாட்டு மக்களை பார்ப்பதற்காக ஒரு தலைவர் வருகிறார் அவருக்கு எத்தனை தொல்லைகள் செய்தார்கள். அத்தனையும் தாண்டி குரல் அற்றவர்களின் குரலாக ஒலித்தார், ஒலித்துக்கொண்டிருக்கிறார்.",
      img: "/assets/timeline/2025_parandur.webp"
    }
  ]
};

function PartyFeatures({ lang }) {
  const t = copy[lang];
  const [activeModal, setActiveModal] = useState(null);

  const cards = [
    {
      id: "leadership",
      title: t.c_leadership,
      desc: t.c_leadership_desc,
      img: `${A}cards/leadership.png`,
      modalTitle: t.modal_leadership_title,
      modalBody: t.modal_leadership_body
    },
    {
      id: "ideology",
      title: t.c_ideology,
      desc: t.c_ideology_desc,
      img: `${A}cards/ideology.png`,
      modalTitle: t.modal_ideology_title,
      modalBody: t.modal_ideology_body
    },
    {
      id: "action",
      title: t.c_action,
      desc: t.c_action_desc,
      img: `${A}cards/action-plan.png`,
      modalTitle: t.modal_action_title,
      modalBody: t.modal_action_body
    },
    {
      id: "resolutions",
      title: t.c_resolutions,
      desc: t.c_resolutions_desc,
      img: `${A}cards/resolutions.png`,
      modalTitle: t.modal_resolutions_title,
      modalBody: t.modal_resolutions_body
    }
  ];

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  return (
    <section id="features" className="party-features-section">
      <div className="party-features-grid">
        {cards.map((c) => (
          <div key={c.id} className="party-feature-item" onClick={() => setActiveModal(c)}>
            <div className="party-feature-card">
              <div className="party-feature-card-img">
                <img src={c.img} alt={c.title} />
              </div>
              <div className="party-feature-card-title-banner">
                <h3>{c.title}</h3>
                <div className="circle-arrow-btn">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
            <p className="party-feature-card-desc">{c.desc}</p>
          </div>
        ))}
      </div>

      {activeModal && (
        <div className="feature-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="feature-modal-box" onClick={(e) => e.stopPropagation()}>
            <img className="feature-modal-header-img" src={activeModal.img} alt="" />
            <div className="feature-modal-body">
              <button className="feature-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">
                <X size={18} />
              </button>
              <h2>{activeModal.modalTitle}</h2>
              <p>{activeModal.modalBody}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function JourneySection({ lang }) {
  const t = copy[lang];
  const events = timelineEvents[lang];
  const [activeIdx, setActiveIdx] = useState(0);

  const activeEvent = events[activeIdx];

  const handlePrev = () => {
    if (activeIdx > 0) setActiveIdx(activeIdx - 1);
  };

  const handleNext = () => {
    if (activeIdx < events.length - 1) setActiveIdx(activeIdx + 1);
  };

  return (
    <section id="our-journey" className="journey-section">
      <div className="journey-bg-stage" aria-hidden="true">
        <img src={`${A}timeline/bg.png`} alt="" />
      </div>

      <div className="journey-container">
        <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
          <p className="eyebrow" style={{ color: '#a00000', fontWeight: '800' }}>{lang === "en" ? "HISTORICAL TIMELINE" : "வரலாற்று காலவரிசை"}</p>
          <h2 style={{ color: '#3f0608', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'Teko, sans-serif' }}>{t.j_title}</h2>
          <p style={{ color: '#4a5568', maxWidth: '800px', margin: '10px auto' }}>{t.j_subtitle}</p>
        </div>

        {/* Timeline Horizontal Line / Star Links */}
        <div className="timeline-axis-container">
          <div className="timeline-axis-line"></div>
          <div 
            className="timeline-axis-fill" 
            style={{ width: `${(activeIdx / (events.length - 1)) * 100}%` }}
          ></div>
          <div className="timeline-nodes" role="tablist" aria-label="Timeline milestones">
            {events.map((ev, idx) => (
              <button
                key={idx}
                type="button"
                className={`timeline-node ${idx === activeIdx ? "active" : ""}`}
                onClick={() => setActiveIdx(idx)}
                role="tab"
                aria-selected={idx === activeIdx}
                aria-label={`Milestone Year ${ev.year}`}
              >
                <div className="timeline-star-cue">
                  <Star 
                    size={idx === activeIdx ? 24 : 16} 
                    fill={idx === activeIdx ? "#a00000" : "#cbd5e0"}
                    stroke={idx === activeIdx ? "#a00000" : "#a0aec0"}
                  />
                </div>
                <p>{ev.year}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Active Milestone Display */}
        <div className="timeline-card-wrapper">
          <div className="timeline-card-grid">
            <div className="timeline-card-image">
              <img src={activeEvent.img} alt={activeEvent.title} />
            </div>
            <div className="timeline-card-text">
              <div className="timeline-card-year">{activeEvent.year}</div>
              <h3 className="timeline-card-title">{activeEvent.title}</h3>
              <p className="timeline-card-desc">{activeEvent.desc}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="timeline-controls">
          <button 
            className="timeline-control-btn" 
            onClick={handlePrev} 
            disabled={activeIdx === 0}
            aria-label="Previous milestone"
          >
            <ChevronLeft size={18} />
            {t.j_prev}
          </button>
          <button 
            className="timeline-control-btn" 
            onClick={handleNext} 
            disabled={activeIdx === events.length - 1}
            aria-label="Next milestone"
          >
            {t.j_next}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function NewsSection({ lang }) {
  const t = copy[lang];
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news/?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => {
        setNews(data.length > 0 ? data : defaultUpdates);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to local default updates if backend not started or fails
        setNews(defaultUpdates);
        setLoading(false);
      });
  }, [lang]);

  return (
    <section id="news" className="section updates">
      <div className="section-head compact">
        <p className="eyebrow" style={{ color: '#ffd84a' }}>{t.newsroom}</p>
        <h2 style={{ color: '#ffd84a' }}>{t.newsTitle}</h2>
      </div>
      <div className="update-grid">
        {news.map((item, index) => (
          <article className="update-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


function EventsSection({ lang }) {
  const t = copy[lang];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    fetch(`/api/events/?lang=${lang}`)
      .then((res) => { if (!res.ok) throw new Error("API Error"); return res.json(); })
      .then((data) => { setEvents(data.length > 0 ? data : defaultEvents); setLoading(false); })
      .catch(() => { setEvents(defaultEvents); setLoading(false); });
  }, [lang]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);
  return (
    <section id="events" className="section-dark section" style={{ background: '#210304', padding: '60px clamp(16px, 5vw, 72px)' }}>
      <div className="section-head">
        <p className="eyebrow" style={{ color: '#ffd84a' }}>{lang === 'en' ? 'GALLERY' : '\u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd'}</p>
        <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'Teko, sans-serif' }}>{t.eventsTitle}</h2>
      </div>
      <div className="events-grid">
        {events.map((ev, i) => (
          <button key={i} type="button" className="e" style={{ gridColumn: `span ${ev.span?.col || 2}`, gridRow: `span ${ev.span?.row || 1}`, background: '#000', overflow: 'hidden' }} onClick={() => setLightbox(ev)}>
            <img src={ev.src} alt={ev.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span className="cap">{ev.caption}</span>
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="lightbox" role="dialog" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setLightbox(null)}>
          <button type="button" style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 0, color: '#ffd84a', fontSize: '40px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setLightbox(null); }}>\u00d7</button>
          <div style={{ maxWidth: '90%', maxHeight: '90%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} style={{ maxWidth: '100%', maxHeight: '80vh', border: '3px solid #ffd84a', borderRadius: '8px' }} />
            <div style={{ color: '#fff', marginTop: '10px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>{lightbox.caption}</div>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer({ lang, setShowJoinModal }) {
  const t = copy[lang];

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer className="tvk-foot" id="contact">
      <div className="foot-hero">
        <div className="foot-bg-layer foot-crowd" aria-hidden="true"></div>
        <div className="foot-bg-layer foot-flag" aria-hidden="true"></div>
        <div className="foot-cutout-container">
          <img className="foot-flag-flowing" src="/assets/branding/flag-flowing.png" alt="" aria-hidden="true" />
          <img className="foot-thalaivar" src="/assets/branding/thalaivar-cutout.png" alt="CM Vijay" />
        </div>
        <div className="foot-cta">
          <span className="pre">{t.foot_pre}</span>
          <h3>{t.foot_h}</h3>
          <p>{t.foot_p}</p>
          <div className="foot-cta-row">
            <a className="btn-gold" href="#join" onClick={(e) => { e.preventDefault(); setShowJoinModal(true); }}>
              {lang === "en" ? "Join TVK" : "தவெகவில் சேர"}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
            </a>
          </div>
          <div className="foot-socials-group">
            <div className="foot-socials-inline">
              <a className="ic" href="#" aria-label="X (Twitter)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a className="ic" href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/></svg></a>
              <a className="ic" href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 22v-8H7v-3.5h2.5V8c0-2.5 1.5-4 3.8-4 1.1 0 2 .2 2.2.2v2.6h-1.5c-1.2 0-1.5.6-1.5 1.4v2.3H16l-.5 3.5h-2.5V22"/></svg></a>
              <a className="ic" href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div className="foot-wordmark-container">
        <div className="foot-bg-crowd-gold" aria-hidden="true"></div>
        <div className="foot-wordmark">
          <div className="foot-wordmark-brand">
            <div className="en">{lang === "en" ? "Tamilaga Vettri Kazhagam" : "தமிழக வெற்றிக் கழகம்"}</div>
            <div className="ta">{lang === "en" ? "Tiruppur South" : "திருப்பூர் தெற்கு"}</div>
            <div className="domain num">tvktiruppursouth.com</div>
          </div>
          <div className="foot-wordmark-copy">{t.copyright}</div>
        </div>
        
        <div className="foot-meta foot-meta-compact" style={{ flex: '1 1 250px', maxWidth: '350px' }}>
          <div className="foot-meta-cell"><b>{t.office_label}</b>{t.office}</div>
          <div className="foot-meta-cell"><b>{t.media_label}</b>{t.media_val}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '30px', background: '#120203' }}>
        <div className="foot-builtby" style={{ margin: 0 }}>
          <a href="#admin" className="foot-builtby-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <span className="foot-builtby-label">{lang === "en" ? "SITE BUILT & MAINTAINED BY" : "வடிவமைப்பு & பராமரிப்பு"}</span>
            <span className="foot-builtby-name" style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ffd84a', letterSpacing: '1px' }}>devopschanakya</span>
          </a>
        </div>
      </div>
      <button className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    </footer>
  );
}

/* ─── New Custom Components: Banner and Modals ─── */
function QuickActions({ lang, setShowPetitionModal, setShowJoinModal, setShowContactModal }) {
  const isEn = lang === 'en';
  return (
    <section className="quick-actions-banner">
      <div className="quick-action-card">
        <h4>{isEn ? "Petition Box" : "மனு பெட்டி"}</h4>
        <p>
          {isEn
            ? "Submit your grievances, local issues, or personal petitions directly to the party leadership."
            : "உங்கள் குறைகள், உள்ளூர் பிரச்சனைகள் அல்லது தனிப்பட்ட மனுக்களை நேரடியாக கட்சித் தலைமையிடம் சமர்ப்பிக்கவும்."}
        </p>
        <button className="quick-action-btn primary" onClick={() => setShowPetitionModal(true)}>
          <Inbox size={20} />
          {isEn ? "Open Petition Form" : "மனுப் படிவத்தைத் திறக்கவும்"}
        </button>
      </div>

      <div className="quick-action-card">
        <h4>{isEn ? "Contact Us" : "தொடர்பu கொள்ள"}</h4>
        <p>
          {isEn
            ? "Have questions or need support? Reach out to our Tiruppur South district office."
            : "கேள்விகள் உள்ளதா அல்லது ஆதரவு தேவையா? எங்களது திருப்பூர் தெற்கு மாவட்ட அலுவலகத்தைத் தொடர்பு கொள்ளவும்."}
        </p>
        <button className="quick-action-btn secondary" onClick={() => setShowContactModal(true)}>
          <Mail size={20} />
          {isEn ? "Send Message" : "செய்தி அனுப்பவும்"}
        </button>
      </div>

      <div className="quick-action-card">
        <h4>{isEn ? "Work Together" : "இணைந்து செயல்படுவோம்"}</h4>
        <p>
          {isEn
            ? "Become a primary member of Tamilaga Vettri Kazhagam and contribute to grassroots change."
            : "தமிழக வெற்றிக் கழகத்தின் முதன்மை உறுப்பினராகி, அடிமட்ட அளவிலான மாற்றத்திற்கு பங்களிக்கவும்."}
        </p>
        <button className="quick-action-btn primary" onClick={() => setShowJoinModal(true)}>
          <Handshake size={20} />
          {isEn ? "Work Together" : "இணைந்து செயல்படுக"}
        </button>
      </div>
    </section>
  );
}

function SubmitPetitionModal({ lang, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("Udumalpet");
  const [problemType, setProblemType] = useState("Water");
  const [subject, setSubject] = useState("");
  const [summary, setSummary] = useState("");
  const [photoData, setPhotoData] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const isEn = lang === 'en';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(isEn ? "File size must be less than 5MB." : "கோப்பின் அளவு 5MB க்கும் குறைவாக இருக்க வேண்டும்.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoData(event.target.result);
        setPhotoName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setPhotoData("");
    setPhotoName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert(isEn ? "Please enter a valid 10-digit phone number." : "தயவுசெய்து செல்லுபடியாகும் 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.");
      return;
    }

    if (!photoData) {
      alert(isEn ? "Please upload a required photo or PDF document." : "தயவுசெய்து தேவையான புகைப்படம் அல்லது PDF ஆவணத்தை பதிவேற்றவும்.");
      return;
    }

    setStatus('submitting');
    fetch("/api/petitions/submit/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone: cleanPhone,
        email,
        area,
        problem_type: problemType,
        subject,
        summary: summary || subject,
        photo_data: photoData,
        photo_name: photoName
      })
    })
      .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
      .then(() => {
        setStatus('success');
        setName('');
        setPhone('');
        setEmail('');
        setArea('Udumalpet');
        setProblemType('Water');
        setSubject('');
        setSummary('');
        setPhotoData('');
        setPhotoName('');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  };

  return (
    <div className="track-modal-overlay" onClick={onClose}>
      <div className="petition-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="track-modal-close" onClick={onClose} aria-label="Close petition modal">
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h3 className="track-modal-title">
              {isEn ? "Petition Submitted Successfully!" : "மனு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!"}
            </h3>
            <p style={{ color: '#4a5568', marginBottom: '24px', lineHeight: '1.6' }}>
              {isEn 
                ? "Thank you. Your petition has been recorded. You can track its status using your phone number." 
                : "நன்றி. உங்கள் மனு பதிவு செய்யப்பட்டுள்ளது. உங்கள் தொலைபேசி எண்ணைப் பயன்படுத்தி அதன் நிலையை நீங்கள் கண்காணிக்கலாம்."}
            </p>
            <button className="primary-btn" onClick={() => { setStatus(null); onClose(); }} style={{ width: '100%' }}>
              {isEn ? "Close" : "மூடவும்"}
            </button>
          </div>
        ) : (
          <>
            <h3 className="track-modal-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '6px' }}>
              {isEn ? "Submit Your Petition" : "உங்கள் மனுவைச் சமர்ப்பிக்கவும்"}
            </h3>
            <p className="track-modal-subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>
              {isEn 
                ? "Submit local or personal grievances directly to the party." 
                : "உள்ளூர் அல்லது தனிப்பட்ட குறைகளை நேரடியாக கட்சியிடம் சமர்ப்பிக்கவும்."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="modal-form-group">
                <label>{isEn ? "Your Full Name *" : "உங்கள் முழு பெயர் *"}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isEn ? "Enter name" : "பெயரை உள்ளிடவும்"}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="modal-form-group">
                  <label>{isEn ? "Phone Number *" : "தொலைபேசி எண் *"}</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={isEn ? "10-digit number" : "10-இலக்க எண்"}
                  />
                </div>
                <div className="modal-form-group">
                  <label>{isEn ? "Email Address" : "மின்னஞ்சல் முகவரி"}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isEn ? "Optional" : "விருப்பத்திற்குரியது"}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="modal-form-group">
                  <label>{isEn ? "Area / Ward *" : "பகுதி / வார்டு *"}</label>
                  <select value={area} onChange={(e) => setArea(e.target.value)}>
                    <option value="Udumalpet">Udumalpet (உடுமலைப்பேட்டை)</option>
                    <option value="Madathukkulam">Madathukkulam (மடத்துக்குளம்)</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>{isEn ? "Type of Problem *" : "பிரச்சனை வகை *"}</label>
                  <select value={problemType} onChange={(e) => setProblemType(e.target.value)}>
                    <option value="Water">Water (குடிநீர்)</option>
                    <option value="Road">Road (சாலை)</option>
                    <option value="Electricity">Electricity (மின்சாரம்)</option>
                    <option value="Garbage">Garbage (கழிவுநீர் / குப்பை)</option>
                    <option value="Personal">Personal (தனிப்பட்ட)</option>
                    <option value="Others">Others (இதர)</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label>{isEn ? "Subject / Issue Title *" : "தலைப்பு / பிரச்சனை *"}</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isEn ? "Brief title of the issue" : "பிரச்சனையின் சுருக்கமான தலைப்பு"}
                />
              </div>

              <div className="modal-form-group">
                <label>{isEn ? "Summary / Details" : "மனுவின் விவரம்"}</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder={isEn ? "Explain the problem in detail (optional)..." : "பிரச்சனையை விரிவாக விளக்கவும் (விருப்பத்திற்குரியது)..."}
                  rows={3}
                />
              </div>

              <div className="modal-form-group">
                <label>{isEn ? "Upload Photo or PDF *" : "படம் அல்லது PDF பதிவேற்றவும் *"}</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                {!photoData ? (
                  <div className="modal-file-drop" onClick={() => fileInputRef.current?.click()}>
                    <span className="modal-file-drop-icon">📁</span>
                    <span className="modal-file-drop-text">{isEn ? "Click to Upload Image or PDF (Max 5MB)" : "படம் அல்லது PDF பதிவேற்ற கிளிக் செய்யவும்"}</span>
                    <span className="modal-file-drop-subtext">{isEn ? "Supported: JPG, PNG, PDF" : "ஆதரவு: JPG, PNG, PDF"}</span>
                  </div>
                ) : (
                  <div className="modal-file-preview">
                    <span>📄 {photoName}</span>
                    <button type="button" onClick={handleRemoveFile}>✕</button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="primary-btn"
                style={{ width: '100%', marginTop: '8px' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' 
                  ? (isEn ? "Submitting..." : "சமர்ப்பிக்கப்படுகிறது...") 
                  : (isEn ? "Submit Petition" : "மனுவைச் சமர்ப்பிக்கவும்")}
              </button>
              {status === 'error' && (
                <div style={{ color: '#E53E3E', fontSize: '0.9rem', marginTop: '10px', textAlign: 'center' }}>
                  {isEn ? "❌ Something went wrong. Please try again." : "❌ பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ContactModal({ lang, isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  if (!isOpen) return null;

  const isEn = lang === 'en';

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert(isEn ? 'Please enter a valid 10-digit phone number.' : 'தயவுசெய்து செல்லுபடியாகும் 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.');
      return;
    }
    setStatus('submitting');
    fetch("/api/contact/submit/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone: cleanPhone, topic, message })
    })
      .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
      .then(() => {
        setStatus('success');
        setEmail('');
        setPhone('');
        setTopic('');
        setMessage('');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  };

  return (
    <div className="track-modal-overlay" onClick={onClose}>
      <div className="track-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="track-modal-close" onClick={onClose} aria-label="Close contact modal">
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h3 className="track-modal-title">
              {isEn ? "Message Sent Successfully!" : "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!"}
            </h3>
            <p style={{ color: '#4a5568', marginBottom: '24px', lineHeight: '1.6' }}>
              {isEn 
                ? "Thank you for reaching out. We will get back to you as soon as possible." 
                : "தொடர்பு கொண்டமைக்கு நன்றி. கூடிய விரைவில் உங்களைத் தொடர்பு கொள்வோம்."}
            </p>
            <button className="primary-btn" onClick={() => { setStatus(null); onClose(); }} style={{ width: '100%' }}>
              {isEn ? "Close" : "மூடவும்"}
            </button>
          </div>
        ) : (
          <>
            <h3 className="track-modal-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '6px' }}>
              {isEn ? "Contact Us" : "எங்களைத் தொடர்பு கொள்ள"}
            </h3>
            <p className="track-modal-subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>
              {isEn 
                ? "Send us a message and we will respond shortly." 
                : "எங்களுக்கு ஒரு செய்தியை அனுப்புங்கள், நாங்கள் விரைவில் பதிலளிப்போம்."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="modal-form-group">
                <label>{isEn ? "Email ID *" : "மின்னஞ்சல் முகவரி *"}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isEn ? "name@example.com" : "மின்னஞ்சல் முகவரியை உள்ளிடவும்"}
                />
              </div>

              <div className="modal-form-group">
                <label>{isEn ? "Phone Number *" : "தொலைபேசி எண் *"}</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder={isEn ? "e.g. 9876543210" : "எ.கா. 9876543210"}
                />
              </div>

              <div className="modal-form-group">
                <label>{isEn ? "Topic / Subject *" : "தொடர்புக்கான தலைப்பு *"}</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={isEn ? "e.g. Question, Feedback" : "எ.கா. கேள்வி, கருத்து"}
                />
              </div>

              <div className="modal-form-group">
                <label>{isEn ? "Message" : "செய்தி"}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isEn ? "Enter your message (optional)..." : "செய்தியை உள்ளிடவும் (விருப்பத்திற்குரியது)..."}
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="primary-btn"
                style={{ width: '100%', marginTop: '8px' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' 
                  ? (isEn ? "Sending..." : "அனுப்பப்படுகிறது...") 
                  : (isEn ? "Send Message" : "செய்தி அனுப்பவும்")}
              </button>
              {status === 'error' && (
                <div style={{ color: '#E53E3E', fontSize: '0.9rem', marginTop: '10px', textAlign: 'center' }}>
                  {isEn ? "❌ Failed to send message. Please try again." : "❌ செய்தி அனுப்புவதில் தோல்வி. மீண்டும் முயலவும்."}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}



function JoinMembershipModal({ lang, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    area: 'Tiruppur South',
    occupation: '',
    interests: [],
    photo_data: '',
    photo_name: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(lang === 'en' ? 'Photo size exceeds 5MB limit' : 'புகைப்படம் 5MB வரம்பை மீறுகிறது');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          photo_data: event.target.result,
          photo_name: file.name
        }));
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo_data: '',
      photo_name: ''
    }));
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/join/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          dob: '',
          gender: '',
          address: '',
          area: 'Tiruppur South',
          occupation: '',
          interests: [],
          photo_data: '',
          photo_name: ''
        });
        setPhotoPreview(null);
      } else {
        setError(data.message || (lang === 'en' ? 'Failed to submit application' : 'விண்ணப்பத்தை சமர்ப்பிக்க முடியவில்லை'));
      }
    } catch (err) {
      console.error('Error:', err);
      setError(lang === 'en' ? 'Failed to submit application. Please try again.' : 'விண்ணப்பத்தை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      content = content; // placeholder
      setLoading(false);
    }
  };

  const labels = {
    en: {
      eyebrow: "MEMBERSHIP",
      title: "Join TVK Today",
      lead: "Become a primary member of Tamilaga Vettri Kazhagam – the people's party for a better Tamil Nadu.",
      formTitle: "Membership Application Form",
      name: "Full Name *",
      namePlaceholder: "Enter your full name",
      phone: "Phone Number *",
      phonePlaceholder: "10-digit mobile number",
      email: "Email Address",
      emailPlaceholder: "your.email@example.com",
      dob: "Date of Birth *",
      gender: "Gender *",
      genderMale: "Male",
      genderFemale: "Female",
      genderOther: "Other",
      address: "Residential Address *",
      addressPlaceholder: "Enter your full residential address",
      area: "Ward / Area *",
      occupation: "Occupation / Profession",
      occupationPlaceholder: "e.g. Student, Business, Farmer",
      interests: "Areas of Interest (Select all that apply) *",
      photo: "Profile Photo",
      photoPlaceholder: "Click to upload your photo",
      photoHint: "JPG, PNG up to 5 MB",
      photoRemove: "Remove Photo",
      terms: "I agree to TVK membership terms and conditions",
      submit: "Submit Application",
      submitting: "Submitting...",
      successTitle: "✓ Application Submitted!",
      successMessage1: "Your membership application has been received.",
      successMessage2: "We will contact you soon with next steps.",
      whyJoin: "Why Join TVK?",
      benefit1Title: "Be Part of a Movement",
      benefit1Desc: "Join millions working to transform Tamil Nadu's political landscape",
      benefit2Title: "Contribute Your Talents",
      benefit2Desc: "Use your skills and expertise to drive grassroots social and political change"
    },
    ta: {
      eyebrow: "உறுப்பினர்",
      title: "இன்றே தவெகவில் இணையுங்கள்",
      lead: "சிறந்த தமிழ்நாட்டிற்கான மக்கள் கட்சி - தமிழக வெற்றிக் கழகத்தில் முதன்மை உறுப்பினராகுங்கள்.",
      formTitle: "உறுப்பினர் சேர்க்கை படிவம்",
      name: "முழு பெயர் *",
      namePlaceholder: "முழு பெயரை உள்ளிடவும்",
      phone: "தொலைபேசி எண் *",
      phonePlaceholder: "10-இலக்க தொலைபேசி எண்",
      email: "மின்னஞ்சல் முகவரி",
      emailPlaceholder: "example@email.com",
      dob: "பிறந்த தேதி *",
      gender: "பாலினம் *",
      genderMale: "ஆண்",
      genderFemale: "பெண்",
      genderOther: "இதர",
      address: "வசிப்பிட முகவரி *",
      addressPlaceholder: "முழு வசிப்பிட முகவரியை உள்ளிடவும்",
      area: "வார்டு / பகுதி *",
      occupation: "தொழில் / வேலை",
      occupationPlaceholder: "மாணவர், வணிகம், விவசாயி போன்றவை",
      interests: "ஆர்வமுள்ள பகுதிகள் (பொருந்தும் அனைத்தையும் தேர்ந்தெடுக்கவும்) *",
      photo: "சுயவிவரப் படம்",
      photoPlaceholder: "புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும்",
      photoHint: "5 MB வரையிலான JPG, PNG",
      photoRemove: "புகைப்படத்தை நீக்கு",
      terms: "தவெக உறுப்பினர் விதிமுறைகள் மற்றும் நிபந்தனைகளுக்கு நான் உடன்படுகிறேன்",
      submit: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
      submitting: "சமர்ப்பிக்கப்படுகிறது...",
      successTitle: "✓ விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!",
      successMessage1: "உங்கள் உறுப்பினர் சேர்க்கை விண்ணப்பம் பெறப்பட்டது.",
      successMessage2: "அடுத்த கட்ட நடவடிக்கைகளுடன் விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
      whyJoin: "ஏன் தவெகவில் இணைய வேண்டும்?",
      benefit1Title: "ஒரு இயக்கத்தின் பகுதியாக இருங்கள்",
      benefit1Desc: "தமிழ்நாட்டின் அரசியல் சூழலை மாற்ற உழைக்கும் லட்சக்கணக்கானோருடன் இணையுங்கள்",
      benefit2Title: "உங்கள் திறமைகளை பங்களிக்கவும்",
      benefit2Desc: "சமூக மற்றும் அரசியல் மாற்றங்களை ஏற்படுத்த உங்கள் திறன்களைப் பயன்படுத்துங்கள்"
    }
  };

  const interestOptions = [
    { id: "social_dev", labelEn: "Social Development", labelTa: "சமூக மேம்பாடு" },
    { id: "community", labelEn: "Community Service", labelTa: "சமூக சேவை" },
    { id: "digital", labelEn: "Digital & Technology", labelTa: "டிஜிட்டல் மற்றும் தொழில்நுட்பம்" },
    { id: "political", labelEn: "Political Training", labelTa: "அரசியல் பயிற்சி" },
    { id: "events", labelEn: "Event Management", labelTa: "நிகழ்வு மேலாண்மை" },
    { id: "other", labelEn: "Other", labelTa: "இதர" }
  ];

  const t = labels[lang];

  return (
    <div className="track-modal-overlay" onClick={onClose}>
      <div className="petition-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <button className="track-modal-close" onClick={onClose} aria-label="Close membership modal">
          <X size={24} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h3 className="track-modal-title">{t.successTitle}</h3>
            <p style={{ color: '#4a5568', marginBottom: '24px', lineHeight: '1.6' }}>
              {t.successMessage1} {t.successMessage2}
            </p>
            <button className="primary-btn" onClick={() => { setSubmitted(false); onClose(); }} style={{ width: '100%' }}>
              {lang === 'en' ? 'Close' : 'மூடவும்'}
            </button>
          </div>
        ) : (
          <>
            <h3 className="track-modal-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '6px' }}>
              {t.formTitle}
            </h3>
            <p className="track-modal-subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>
              {t.lead}
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ color: '#E53E3E', fontSize: '0.9rem', marginBottom: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                  {error}
                </div>
              )}

              <div className="modal-form-group">
                <label>{t.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="modal-form-group">
                  <label>{t.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>
                <div className="modal-form-group">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="modal-form-group">
                  <label>{t.dob}</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>{t.gender}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--</option>
                    <option value="Male">{t.genderMale}</option>
                    <option value="Female">{t.genderFemale}</option>
                    <option value="Other">{t.genderOther}</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label>{t.address}</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t.addressPlaceholder}
                  rows={2}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="modal-form-group">
                  <label>{t.area}</label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  >
                    <option value="Tiruppur South">Tiruppur South</option>
                    <option value="Tiruppur North">Tiruppur North</option>
                    <option value="Tiruppur West">Tiruppur West</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>{t.occupation}</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder={t.occupationPlaceholder}
                  />
                </div>
              </div>

              <div className="modal-form-group">
                <label>{t.interests}</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'rgba(90, 12, 18, 0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(90, 12, 18, 0.08)' }}>
                  {interestOptions.map(opt => (
                    <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#360507', fontWeight: '600', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(opt.id)}
                        onChange={() => handleInterestChange(opt.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span>{lang === 'en' ? opt.labelEn : opt.labelTa}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="modal-form-group">
                <label>{t.photo}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                  id="modal-membership-photo"
                />
                {!photoPreview ? (
                  <div className="modal-file-drop" onClick={() => document.getElementById('modal-membership-photo')?.click()}>
                    <span className="modal-file-drop-icon">📷</span>
                    <span className="modal-file-drop-text">{t.photoPlaceholder}</span>
                    <span className="modal-file-drop-subtext">{t.photoHint}</span>
                  </div>
                ) : (
                  <div className="modal-file-preview">
                    <span>📷 {formData.photo_name}</span>
                    <button type="button" onClick={handleRemovePhoto}>✕</button>
                  </div>
                )}
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5a0c12', fontWeight: 'bold', margin: '14px 0', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ cursor: 'pointer' }} />
                <span>{t.terms}</span>
              </label>

              <button
                type="submit"
                className="primary-btn"
                style={{ width: '100%', marginTop: '8px' }}
                disabled={loading}
              >
                {loading ? t.submitting : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

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


function TrackPetitionModal({ lang, isOpen, onClose }) {
  const [phone, setPhone] = useState("");
  const [petitions, setPetitions] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const response = await fetch(`/api/petitions/track/?phone=${phone}`);
      const data = await response.json();
      if (data.status === 'success') {
        setPetitions(data.data);
        setSearched(true);
      } else {
        setError(data.message || (lang === 'en' ? 'Error tracking petitions' : 'மனுக்களைத் தேடுவதில் பிழை'));
      }
    } catch (err) {
      console.error(err);
      setError(lang === 'en' ? 'Network error. Please try again.' : 'பிணையப் பிழை. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setLoading(false);
    }
  };

  const statusBadges = {
    'Pending': { en: 'Pending', ta: 'நிலுவையில் உள்ளது', color: '#718096', bg: '#EDF2F7' },
    'In Progress': { en: 'In Progress', ta: 'செயல்பாட்டில் உள்ளது', color: '#3182CE', bg: '#EBF8FF' },
    'Rejected': { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது', color: '#E53E3E', bg: '#FFF5F5' },
    'Solved': { en: 'Solved', ta: 'தீர்வு காணப்பட்டது', color: '#38A169', bg: '#F0FFF4' },
  };

  return (
    <div className="track-modal-overlay" onClick={onClose}>
      <div className="track-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="track-modal-close" onClick={onClose} aria-label="Close track modal">
          <X size={20} />
        </button>
        <h3 className="track-modal-title">{lang === 'en' ? 'Track Your Petitions' : 'மனுவைக் கண்காணித்தல்'}</h3>
        <p className="track-modal-subtitle">
          {lang === 'en' ? 'Enter your 10-digit registered phone number to view submitted petitions.' : 'நீங்கள் பதிவு செய்த 10 இலக்க தொலைபேசி எண்ணை உள்ளிட்டு மனுக்களைத் தேடவும்.'}
        </p>

        <form onSubmit={handleSearch} className="track-search-form">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder={lang === 'en' ? 'e.g. 9876543210' : 'எ.கா. 9876543210'}
            required
            pattern="[0-9]{10}"
            maxLength="10"
            style={{
              padding: '10px 14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '12px',
              color: '#1e293b',
              backgroundColor: '#ffffff'
            }}
          />
          <button type="submit" className="primary-btn track-search-btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? (lang === 'en' ? 'Searching...' : 'தேடப்படுகிறது...') : (lang === 'en' ? 'Search' : 'தேடு')}
          </button>
        </form>

        {error && <div className="track-modal-error" style={{ color: '#E53E3E', marginTop: '12px', fontSize: '0.9rem' }}>{error}</div>}

        {searched && (
          <div className="track-results-container" style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
            {petitions.length > 0 ? (
              <div className="track-petitions-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {petitions.map(p => {
                  const badge = statusBadges[p.status] || { en: p.status, ta: p.status, color: '#4A5568', bg: '#EDF2F7' };
                  return (
                    <div key={p.id} className="track-petition-item" style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', backgroundColor: '#ffffff' }}>
                      <div className="track-petition-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 'bold', color: '#1e293b' }}>{p.subject}</h4>
                        <span 
                          className="status-badge"
                          style={{
                            color: badge.color,
                            backgroundColor: badge.bg,
                            border: `1px solid ${badge.color}`,
                            fontSize: '0.78rem',
                            fontWeight: 'bold',
                            padding: '3px 8px',
                            borderRadius: '12px'
                          }}
                        >
                          {lang === 'en' ? badge.en : badge.ta}
                        </span>
                      </div>
                      <p className="track-petition-summary" style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#4a5568' }}>{p.summary}</p>
                      <small className="track-petition-date" style={{ color: '#718096', fontSize: '0.78rem' }}>
                        {lang === 'en' ? 'Submitted: ' : 'சமர்ப்பிக்கப்பட்டது: '}
                        {new Date(p.submitted_at).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="track-no-results" style={{ textAlign: 'center', color: '#718096', padding: '20px 0' }}>
                {lang === 'en' ? 'No petitions found for this phone number.' : 'இந்த தொலைபேசி எண்ணில் மனுக்கள் எதுவும் காணப்படவில்லை.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPanel({ lang }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem('tvkAdminLogged'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'petitions' | 'contacts'
  const [members, setMembers] = useState([]);
  const [petitions, setPetitions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedPetition, setSelectedPetition] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  
  const [memberNotes, setMemberNotes] = useState('');
  const [memberStatus, setMemberStatus] = useState('');
  const [savingMember, setSavingMember] = useState(false);

  const [petitionStatus, setPetitionStatus] = useState('');
  const [savingPetition, setSavingPetition] = useState(false);

  const [memberSearch, setMemberSearch] = useState('');
  const [petitionSearch, setPetitionSearch] = useState('');
  const [contactSearch, setContactSearch] = useState('');

  const [memberStatusFilter, setMemberStatusFilter] = useState('all');
  const [memberAreaFilter, setMemberAreaFilter] = useState('all');
  const [petitionStatusFilter, setPetitionStatusFilter] = useState('all');
  const [petitionProblemFilter, setPetitionProblemFilter] = useState('all');
  const [petitionAreaFilter, setPetitionAreaFilter] = useState('all');

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/members/');
      const data = await response.json();
      if (data.status === 'success') {
        setMembers(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPetitions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/petitions/');
      const data = await response.json();
      setPetitions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contacts/');
      const data = await response.json();
      if (data.status === 'success') {
        setContacts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMembers();
      fetchPetitions();
      fetchContacts();
    }
  }, [isLoggedIn, activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (username === 'admin' && password === 'tvk123') {
      sessionStorage.setItem('tvkAdminLogged', 'true');
      setIsLoggedIn(true);
    } else {
      setLoginError(lang === 'en' ? 'Invalid credentials. Please use admin / tvk123' : 'தவறான விபரங்கள். தயவுசெய்து admin / tvk123 ஐப் பயன்படுத்தவும்.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tvkAdminLogged');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSelectMember = async (memberId) => {
    try {
      const response = await fetch(`/api/members/${memberId}/`);
      const data = await response.json();
      if (data.status === 'success') {
        setSelectedMember(data.data);
        setMemberNotes(data.data.admin_notes || '');
        setMemberStatus(data.data.status || 'pending');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    if (!selectedMember) return;
    setSavingMember(true);
    try {
      const response = await fetch(`/api/members/${selectedMember.id}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: memberStatus, admin_notes: memberNotes })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSelectedMember(prev => ({ ...prev, status: memberStatus, admin_notes: memberNotes }));
        setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, status: memberStatus, admin_notes: memberNotes } : m));
        alert(lang === 'en' ? 'Application updated successfully!' : 'விண்ணப்பம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
      }
    } catch (err) {
      console.error(err);
      alert(lang === 'en' ? 'Failed to update application.' : 'விண்ணப்பத்தை புதுப்பிக்க முடியவில்லை.');
    } finally {
      setSavingMember(false);
    }
  };

  const handleSelectPetition = (petition) => {
    setSelectedPetition(petition);
    setPetitionStatus(petition.status || 'Pending');
  };

  const handleUpdatePetition = async (e) => {
    e.preventDefault();
    if (!selectedPetition) return;
    setSavingPetition(true);
    try {
      const response = await fetch(`/api/petitions/${selectedPetition.id}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: petitionStatus })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSelectedPetition(prev => ({ ...prev, status: petitionStatus }));
        setPetitions(prev => prev.map(p => p.id === selectedPetition.id ? { ...p, status: petitionStatus } : p));
        alert(lang === 'en' ? 'Petition status updated successfully!' : 'மனுவின் நிலை வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
      }
    } catch (err) {
      console.error(err);
      alert(lang === 'en' ? 'Failed to update petition.' : 'மனுவை புதுப்பிக்க முடியவில்லை.');
    } finally {
      setSavingPetition(false);
    }
  };

  const handleSharePetition = (p) => {
    const shareUrl = `/api/petitions/${p.id}/share/`;
    window.open(shareUrl, '_blank');
  };

  const handleDownloadPDF = (p) => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert(lang === 'en' ? "Please allow popups to download/print." : "மனுவைப் பதிவிறக்க பாப்-அப்களை அனுமதிக்கவும்.");
      return;
    }
    
    const submittedDateStr = new Date(p.submitted_at).toLocaleDateString();
    
    const htmlContent = `
      <html>
        <head>
          <title>TVK Petition #${p.id} - ${p.name}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&family=Instrument+Sans:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet" />
          <style>
            body {
              font-family: 'Instrument Sans', 'Noto Sans Tamil', sans-serif;
              color: #360507;
              background: #fffcf5;
              padding: 40px;
              margin: 0;
            }
            .header {
              text-align: center;
              border-bottom: 3.5px solid #ffd84a;
              padding-bottom: 20px;
              margin-bottom: 35px;
            }
            .header h1 {
              color: #5a0c12;
              margin: 0 0 5px 0;
              font-family: 'Teko', sans-serif;
              font-size: 38px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .header h2 {
              color: #746464;
              margin: 0;
              font-size: 15px;
              font-weight: 600;
            }
            .petition-title {
              color: #5a0c12;
              margin-top: 0;
              font-family: 'Teko', sans-serif;
              font-size: 26px;
              border-bottom: 2px solid #5a0c12;
              padding-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .petition-meta {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 30px;
              background: rgba(255, 255, 255, 0.7);
              border: 1.5px solid rgba(90, 12, 18, 0.1);
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0 4px 12px rgba(90, 12, 18, 0.02);
            }
            .meta-item {
              font-size: 14px;
              line-height: 1.6;
            }
            .meta-label {
              font-weight: 700;
              color: #5a0c12;
            }
            .content-section {
              margin-bottom: 30px;
            }
            .content-section h3 {
              color: #5a0c12;
              font-family: 'Teko', sans-serif;
              font-size: 20px;
              font-weight: 600;
              border-bottom: 1.5px solid rgba(90, 12, 18, 0.15);
              padding-bottom: 6px;
              margin-bottom: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .content-text {
              font-size: 14.5px;
              line-height: 1.65;
              white-space: pre-wrap;
              background: #fff;
              padding: 20px;
              border: 1.5px solid rgba(90, 12, 18, 0.08);
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(90, 12, 18, 0.01);
              color: #360507;
            }
            .status-badge {
              display: inline-block;
              padding: 6px 16px;
              font-weight: 700;
              font-size: 12px;
              border-radius: 20px;
              text-transform: uppercase;
              background: rgba(90, 12, 18, 0.05);
              border: 1.5px solid rgba(90, 12, 18, 0.1);
              color: #5a0c12;
            }
            .status-solved {
              background: #f0fdf4;
              border-color: #bbf7d0;
              color: #166534;
            }
            .status-rejected {
              background: #fef2f2;
              border-color: #fecaca;
              color: #991b1b;
            }
            .status-inprogress {
              background: #eff6ff;
              border-color: #bfdbfe;
              color: #1e40af;
            }
            .footer {
              margin-top: 60px;
              border-top: 1.5px solid rgba(90, 12, 18, 0.1);
              padding-top: 20px;
              text-align: center;
              font-size: 12.5px;
              color: #746464;
              line-height: 1.5;
            }
            @media print {
              .no-print { display: none; }
              body { padding: 20px; background: #fffcf5; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px; text-align: right;">
            <button onclick="window.print();" style="background: #5a0c12; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
            <button onclick="window.close();" style="background: #e2e8f0; color: #333; border: none; padding: 8px 16px; border-radius: 6px; margin-left: 10px; cursor: pointer;">Close Window</button>
          </div>
          
          <div class="header">
            <h1>TAMILAGA VETTRI KAZHAGAM</h1>
            <h2>Tiruppur South District Committee | திருப்பூர் தெற்கு மாவட்ட அமைப்பு</h2>
          </div>
          
          <h2 class="petition-title">
            GRIEVANCE PETITION / மக்கள் மனு - #${p.id}
          </h2>
          
          <div class="petition-meta">
            <div class="meta-item"><span class="meta-label">Petitioner Name / பெயர்:</span> ${p.name}</div>
            <div class="meta-item"><span class="meta-label">Submitted On / சமர்ப்பிக்கப்பட்ட தேதி:</span> ${submittedDateStr}</div>
            <div class="meta-item"><span class="meta-label">Phone / தொலைபேசி:</span> ${p.phone}</div>
            <div class="meta-item"><span class="meta-label">Area / பகுதி:</span> ${p.area || 'N/A'}</div>
            <div class="meta-item"><span class="meta-label">Email / மின்னஞ்சல்:</span> ${p.email || 'N/A'}</div>
            <div class="meta-item"><span class="meta-label">Problem Type / பிரச்சனை வகை:</span> ${p.problem_type}</div>
          </div>
          
          <div class="content-section">
            <h3>Subject / தலைப்பு</h3>
            <div class="content-text" style="font-weight: bold;">${p.subject}</div>
          </div>
          
          <div class="content-section">
            <h3>Summary of Grievance / மனுவின் சுருக்கம்</h3>
            <div class="content-text">${p.summary}</div>
          </div>
          
          <div class="content-section">
            <h3>Current Status / தற்போதைய நிலை</h3>
            <div style="margin-top: 8px;">
              <span class="status-badge ${p.status === 'Solved' ? 'status-solved' : p.status === 'Rejected' ? 'status-rejected' : p.status === 'In Progress' ? 'status-inprogress' : ''}">
                ${p.status || 'Pending'}
              </span>
            </div>
          </div>

          ${p.photo_data && !p.photo_data.startsWith('data:application/pdf') ? `
          <div class="content-section" style="page-break-before: always; margin-top: 30px;">
            <h3>Attached Evidence / இணைக்கப்பட்ட ஆவணம்</h3>
            <div style="text-align: center; border: 1px solid rgba(90, 12, 18, 0.12); padding: 15px; border-radius: 8px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <img src="${p.photo_data}" style="max-width: 100%; max-height: 480px; border-radius: 6px; border: 1.5px solid rgba(90, 12, 18, 0.15);" />
            </div>
          </div>
          ` : ''}
          
          <div class="footer">
            Tamilaga Vettri Kazhagam - Tiruppur South District Office. Generated electronically.<br>
            சிறந்த தமிழ்நாட்டிற்கான மக்கள் சக்தி - தமிழக வெற்றிக் கழகம்
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                          m.phone.includes(memberSearch) ||
                          m.area.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesStatus = memberStatusFilter === 'all' || m.status.toLowerCase() === memberStatusFilter.toLowerCase();
    const matchesArea = memberAreaFilter === 'all' || m.area === memberAreaFilter;
    return matchesSearch && matchesStatus && matchesArea;
  });

  const filteredPetitions = petitions.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(petitionSearch.toLowerCase()) ||
                          p.phone.includes(petitionSearch) ||
                          p.subject.toLowerCase().includes(petitionSearch.toLowerCase());
    const matchesStatus = petitionStatusFilter === 'all' || p.status.toLowerCase() === petitionStatusFilter.toLowerCase();
    const matchesProblem = petitionProblemFilter === 'all' || p.problem_type === petitionProblemFilter;
    const matchesArea = petitionAreaFilter === 'all' || p.area === petitionAreaFilter;
    return matchesSearch && matchesStatus && matchesProblem && matchesArea;
  });

  const leadersList = [
    { name: 'Vijay', src: '/assets/branding/thalaivar-cutout.png' },
    { name: 'Kamarajar', src: '/assets/leaders/kamarajar-thumbnail.png' },
    { name: 'Ambedkar', src: '/assets/leaders/ambedkar-thumbnail.png' },
    { name: 'Periyar', src: '/assets/leaders/periyar-thumbnail.png' },
    { name: 'Velu Nachiyar', src: '/assets/leaders/velu-nachiyar-thumbnail.png' },
    { name: 'Anjalai Ammal', src: '/assets/leaders/anjalai-ammal-thumbnail.png' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="admin-portal-dashboard admin-login-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="admin-login-card" style={{ background: '#fffcf5', border: '2.5px solid #ffd84a', padding: '40px', borderRadius: '16px', maxWidth: '540px', width: '100%', boxShadow: '0 20px 45px rgba(54, 5, 7, 0.25)', textAlign: 'center' }}>
          
          <img src="/assets/branding/tvk-logo-192.png" alt="TVK Logo" style={{ width: '80px', height: '80px', margin: '0 auto 15px auto', display: 'block', borderRadius: '50%', border: '2px solid #ffd84a' }} />
          
          <h2 style={{ fontFamily: 'Teko, sans-serif', fontSize: '2.2rem', color: '#5a0c12', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            TVK Tiruppur South
          </h2>
          <h3 style={{ fontSize: '1.2rem', color: '#360507', margin: '0 0 24px 0', fontWeight: '600' }}>
            Administration Login / நிர்வாக தளம்
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', background: 'rgba(90, 12, 18, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(90, 12, 18, 0.08)' }}>
            {leadersList.map(l => (
              <img key={l.name} src={l.src} alt={l.name} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ffd84a', objectFit: 'cover' }} title={l.name} />
            ))}
          </div>

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            {loginError && (
              <div style={{ color: '#E53E3E', fontSize: '0.9rem', marginBottom: '16px', textAlign: 'center', fontWeight: 'bold', background: '#FFF5F5', padding: '8px', borderRadius: '6px', border: '1px solid #FED7D7' }}>
                {loginError}
              </div>
            )}
            
            <div className="modal-form-group" style={{ marginBottom: '16px' }}>
              <label style={{ color: '#5a0c12', fontWeight: 'bold', fontSize: '0.9rem' }}>Username / பயனர்பெயர்</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid rgba(90, 12, 18, 0.15)' }}
              />
            </div>

            <div className="modal-form-group" style={{ marginBottom: '24px' }}>
              <label style={{ color: '#5a0c12', fontWeight: 'bold', fontSize: '0.9rem' }}>Password / கடவுச்சொல்</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid rgba(90, 12, 18, 0.15)' }}
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', fontSize: '1.1rem', padding: '12px' }}>
              Login to Console / உள்நுழையவும்
            </button>
          </form>

          <div style={{ marginTop: '24px' }}>
            <a href="/" style={{ fontSize: '0.9rem', color: '#746464', textDecoration: 'underline', fontWeight: 'bold' }}>
              Back to Website / தளம் திரும்புக
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-dashboard" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="admin-dashboard-header" style={{ padding: '15px 30px' }}>
        <div className="admin-header-title" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={`${A}branding/tvk-logo-192.png`} alt="TVK Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1.5px solid #ffd84a' }} />
          <div>
            <h2 style={{ margin: 0, fontFamily: 'Teko, sans-serif', fontSize: '1.8rem', letterSpacing: '0.5px' }}>TVK Tiruppur South Administration</h2>
            <span style={{ fontSize: '0.85rem' }}>Welcome, Administrator | தவெக நிர்வாகத் தளம்</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', overflow: 'hidden' }} className="header-leaders-strip">
          {leadersList.map(l => (
            <img key={l.name} src={l.src} alt={l.name} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1.5px solid #ffd84a', objectFit: 'cover' }} className="no-print" />
          ))}
        </div>

        <div className="admin-header-actions" style={{ display: 'flex', gap: '10px' }}>
          <a href="/" className="back-site-btn" style={{ fontSize: '0.85rem', padding: '8px 14px' }}>Back to Site / தளம்</a>
          <button onClick={handleLogout} className="view-details-btn" style={{ background: '#5a0c12', color: '#fff', borderColor: '#5a0c12', fontSize: '0.85rem', padding: '8px 14px' }}>Logout / வெளியேறு</button>
        </div>
      </header>

      <main className="admin-dashboard-container" style={{ flex: 1, padding: '30px' }}>
        {/* Dynamic Admin Summary Stats cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="stat-icon">👥</span>
            <div className="stat-details">
              <h3>{members.length}</h3>
              <p>Total Members / மொத்த உறுப்பினர்கள்</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-icon">📥</span>
            <div className="stat-details">
              <h3>{petitions.length}</h3>
              <p>Total Petitions / மொத்த மனுக்கள்</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-icon">⏳</span>
            <div className="stat-details">
              <h3>{petitions.filter(p => p.status === 'Pending').length}</h3>
              <p>Pending Petitions / நிலுவை மனுக்கள்</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-details">
              <h3>{petitions.filter(p => p.status === 'Solved').length}</h3>
              <p>Solved Petitions / தீர்க்கப்பட்டவை</p>
            </div>
          </div>
        </div>

        <div className="admin-tab-bar" style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => { setActiveTab('applications'); setSelectedMember(null); }} 
            className={`admin-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          >
            Membership Forms / உறுப்பினர் படிவங்கள்
          </button>
          <button 
            onClick={() => { setActiveTab('petitions'); setSelectedPetition(null); }} 
            className={`admin-tab-btn ${activeTab === 'petitions' ? 'active' : ''}`}
          >
            Petitions Box / மனுக்கள்
          </button>
        </div>

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="admin-layout-with-sidebar">
            {/* Filters Sidebar */}
            <aside className="admin-sidebar-filters">
              <h4>
                <Search size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Filters / வடிகட்டிகள்
              </h4>
              
              <div className="filter-group">
                <label>Status / நிலை</label>
                <select 
                  value={memberStatusFilter} 
                  onChange={(e) => setMemberStatusFilter(e.target.value)}
                >
                  <option value="all">All Status / அனைத்தும்</option>
                  <option value="pending">Pending / காத்திருப்பில்</option>
                  <option value="approved">Approved / அங்கீகரிக்கப்பட்டது</option>
                  <option value="rejected">Rejected / நிராகரிக்கப்பட்டது</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Area / பகுதி</label>
                <select 
                  value={memberAreaFilter} 
                  onChange={(e) => setMemberAreaFilter(e.target.value)}
                >
                  <option value="all">All Areas / அனைத்தும்</option>
                  <option value="Udumalpet">Udumalpet / உடுமலைப்பேட்டை</option>
                  <option value="Madathukkulam">Madathukkulam / மடத்துக்குளம்</option>
                </select>
              </div>

              <button 
                onClick={() => { setMemberStatusFilter('all'); setMemberAreaFilter('all'); setMemberSearch(''); }}
                className="clear-filter-btn"
              >
                Clear Filters / நீக்குக
              </button>
            </aside>

            {/* Main Table Content */}
            <div className="dashboard-content-panel" style={{ flex: 1 }}>
              <div className="panel-controls">
                <input
                  type="text"
                  placeholder="Search by Name, Phone, Area..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="search-input"
                />
                <div className="search-results-info">
                  Showing {filteredMembers.length} of {members.length} applications / {filteredMembers.length} விண்ணப்பங்கள் காண்பிக்கப்படுகின்றன
                </div>
              </div>

              {loading ? <div className="admin-panel-loading">Loading applications...</div> : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name / பெயர்</th>
                        <th>Phone / தொலைபேசி</th>
                        <th>Area / பகுதி</th>
                        <th>Submitted / தேதி</th>
                        <th>Status / நிலை</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map(m => (
                        <tr key={m.id}>
                          <td><b>{m.name}</b></td>
                          <td>{m.phone}</td>
                          <td>{m.area}</td>
                          <td>{new Date(m.submitted_at).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-pill pill-${m.status.toLowerCase()}`}>
                              {m.status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <button onClick={() => handleSelectMember(m.id)} className="view-details-btn">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PETITIONS TAB */}
        {activeTab === 'petitions' && (
          <div className="admin-layout-with-sidebar">
            {/* Filters Sidebar */}
            <aside className="admin-sidebar-filters">
              <h4>
                <Search size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Filters / வடிகட்டிகள்
              </h4>
              
              <div className="filter-group">
                <label>Status / நிலை</label>
                <select 
                  value={petitionStatusFilter} 
                  onChange={(e) => setPetitionStatusFilter(e.target.value)}
                >
                  <option value="all">All Status / அனைத்தும்</option>
                  <option value="Pending">Pending / காத்திருப்பில்</option>
                  <option value="In Progress">In Progress / செயல்பாட்டில்</option>
                  <option value="Rejected">Rejected / நிராகரிக்கப்பட்டது</option>
                  <option value="Solved">Solved / தீர்க்கப்பட்டது</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Problem / பிரச்சனை</label>
                <select 
                  value={petitionProblemFilter} 
                  onChange={(e) => setPetitionProblemFilter(e.target.value)}
                >
                  <option value="all">All Problems / அனைத்தும்</option>
                  <option value="Water">Water / தண்ணீர்</option>
                  <option value="Road">Road / சாலை</option>
                  <option value="Electricity">Electricity / மின்சாரம்</option>
                  <option value="Garbage">Garbage / குப்பை</option>
                  <option value="Personal">Personal / தனிப்பட்டவை</option>
                  <option value="Others">Others / இதர</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Area / பகுதி</label>
                <select 
                  value={petitionAreaFilter} 
                  onChange={(e) => setPetitionAreaFilter(e.target.value)}
                >
                  <option value="all">All Areas / அனைத்தும்</option>
                  <option value="Udumalpet">Udumalpet / உடுமலைப்பேட்டை</option>
                  <option value="Madathukkulam">Madathukkulam / மடத்துக்குளம்</option>
                </select>
              </div>

              <button 
                onClick={() => { setPetitionStatusFilter('all'); setPetitionProblemFilter('all'); setPetitionAreaFilter('all'); setPetitionSearch(''); }}
                className="clear-filter-btn"
              >
                Clear Filters / நீக்குக
              </button>
            </aside>

            {/* Main Table Content */}
            <div className="dashboard-content-panel" style={{ flex: 1 }}>
              <div className="panel-controls">
                <input
                  type="text"
                  placeholder="Search by Petitioner, Phone, Subject..."
                  value={petitionSearch}
                  onChange={(e) => setPetitionSearch(e.target.value)}
                  className="search-input"
                />
                <div className="search-results-info">
                  Showing {filteredPetitions.length} of {petitions.length} petitions / {filteredPetitions.length} மனுக்கள் காண்பிக்கப்படுகின்றன
                </div>
              </div>

              {loading ? <div className="admin-panel-loading">Loading petitions...</div> : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name / பெயர்</th>
                        <th>Phone / தொலைபேசி</th>
                        <th>Problem Type / வகை</th>
                        <th>Subject / தலைப்பு</th>
                        <th>Submitted / தேதி</th>
                        <th>Status / நிலை</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPetitions.map(p => (
                        <tr key={p.id}>
                          <td>#{p.id}</td>
                          <td><b>{p.name}</b></td>
                          <td>{p.phone}</td>
                          <td><span style={{ fontSize: '0.85rem', background: 'rgba(90, 12, 18, 0.08)', color: '#5a0c12', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{p.problem_type}</span></td>
                          <td>{p.subject}</td>
                          <td>{new Date(p.submitted_at).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-pill pill-${p.status ? p.status.toLowerCase().replace(' ', '-') : 'pending'}`}>
                              {p.status || 'PENDING'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button 
                                onClick={() => handleSelectPetition(p)} 
                                className="view-details-btn" 
                                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                                title="Manage Status / மேலாண்மை"
                              >
                                Manage
                              </button>
                              <button 
                                onClick={() => handleDownloadPDF(p)} 
                                className="view-details-btn" 
                                style={{ background: '#5a0c12', color: '#ffffff', borderColor: '#5a0c12', padding: '6px 10px', fontSize: '0.8rem' }}
                                title="Download PDF / பதிவிறக்கம்"
                              >
                                PDF
                              </button>
                              <button 
                                onClick={() => handleSharePetition(p)} 
                                className="view-details-btn" 
                                style={{ background: '#25D366', color: '#ffffff', borderColor: '#25D366', padding: '6px 10px', fontSize: '0.8rem' }}
                                title="Share Petition / வாட்ஸ்அப் பகிர்வு"
                              >
                                Share
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="admin-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="admin-modal-box large" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setSelectedMember(null)}>
              <X size={24} />
            </button>
            <div className="member-detail-grid">
              <div className="member-detail-left">
                <div className="member-profile-photo-wrapper">
                  {selectedMember.photo_data ? (
                    <img src={selectedMember.photo_data} alt={selectedMember.name} className="member-photo" />
                  ) : (
                    <div className="member-photo-placeholder">
                      <Camera size={48} />
                      <span>No Photo Uploaded</span>
                    </div>
                  )}
                </div>
                <h3>{selectedMember.name}</h3>
                <p className="member-phone">📞 {selectedMember.phone}</p>
                <p className="member-email">✉️ {selectedMember.email || 'No email provided'}</p>
                <p className="member-dob">🎂 DOB: {selectedMember.dob ? new Date(selectedMember.dob).toLocaleDateString() : 'N/A'}</p>
                <p className="member-gender">🚻 Gender: {selectedMember.gender || 'N/A'}</p>
                <p className="member-occupation">💼 Occupation: {selectedMember.occupation || 'N/A'}</p>
              </div>

              <div className="member-detail-right">
                <div className="detail-section">
                  <h4>Residential Address / வீட்டு முகவரி</h4>
                  <p className="detail-value address-box">{selectedMember.address || 'N/A'}</p>
                </div>

                <div className="detail-section">
                  <h4>Ward or Area / பகுதி</h4>
                  <p className="detail-value">{selectedMember.area}</p>
                </div>

                <div className="detail-section">
                  <h4>Interests / ஆர்வமுள்ள துறைகள்</h4>
                  <p className="detail-value text-capitalize">
                    {selectedMember.interests ? selectedMember.interests.split(', ').join(', ') : 'None'}
                  </p>
                </div>

                <form onSubmit={handleUpdateMember} className="admin-update-form">
                  <div className="form-group">
                    <label>Application Status / விண்ணப்ப நிலை</label>
                    <select value={memberStatus} onChange={(e) => setMemberStatus(e.target.value)}>
                      <option value="pending">PENDING</option>
                      <option value="approved">APPROVED</option>
                      <option value="rejected">REJECTED</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Admin Notes / நிர்வாக குறிப்புகள்</label>
                    <textarea 
                      value={memberNotes} 
                      onChange={(e) => setMemberNotes(e.target.value)} 
                      rows="3"
                      placeholder="Add internal notes about this applicant..."
                    />
                  </div>
                  <button type="submit" className="primary-btn save-change-btn" disabled={savingMember}>
                    {savingMember ? 'Saving...' : 'Save Notes & Status'}
                  </button>
                </form>

                <div className="linked-petitions-section">
                  <h4>Linked Petitions / இணைக்கப்பட்ட மனுக்கள்</h4>
                  {selectedMember.petitions && selectedMember.petitions.length > 0 ? (
                    <div className="linked-petitions-list">
                      {selectedMember.petitions.map(p => (
                        <div key={p.id} className="linked-petition-item">
                          <div className="linked-petition-header">
                            <h5>{p.subject}</h5>
                            <span className={`status-pill pill-${p.status.toLowerCase().replace(' ', '-')}`}>
                              {p.status}
                            </span>
                          </div>
                          <p>{p.summary}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-linked-petitions">No petitions submitted with phone number: {selectedMember.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Petition Details Modal */}
      {selectedPetition && (
        <div className="admin-modal-overlay" onClick={() => setSelectedPetition(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <button className="admin-modal-close" onClick={() => setSelectedPetition(null)}>
              <X size={24} />
            </button>
            <h3 className="petition-modal-title">Petition Details / மனு விபரம்</h3>
            <div className="petition-detail-body">
              <div className="p-detail-item">
                <span className="p-label">Petitioner / மனுதாரர்:</span>
                <span className="p-val">{selectedPetition.name}</span>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Phone / தொலைபேசி:</span>
                <span className="p-val">{selectedPetition.phone}</span>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Email / மின்னஞ்சல்:</span>
                <span className="p-val">{selectedPetition.email || 'N/A'}</span>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Area / பகுதி:</span>
                <span className="p-val">{selectedPetition.area || 'N/A'}</span>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Problem Type / பிரச்சனை வகை:</span>
                <span className="p-val" style={{ background: 'rgba(90, 12, 18, 0.08)', color: '#5a0c12', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block' }}>{selectedPetition.problem_type || 'Others'}</span>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Subject / தலைப்பு:</span>
                <span className="p-val">{selectedPetition.subject}</span>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Summary / சுருக்கம்:</span>
                <p className="p-val summary-text-box">{selectedPetition.summary}</p>
              </div>
              <div className="p-detail-item">
                <span className="p-label">Submitted / சமர்ப்பித்தது:</span>
                <span className="p-val">{new Date(selectedPetition.submitted_at).toLocaleString()}</span>
              </div>
              <div className="p-detail-item" style={{ display: 'block' }}>
                <span className="p-label" style={{ display: 'block', marginBottom: '6px' }}>Attached File / இணைக்கப்பட்ட கோப்பு:</span>
                {selectedPetition.photo_data ? (
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'inline-block', maxWidth: '100%' }}>
                    {selectedPetition.photo_data.startsWith('data:application/pdf') ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', padding: '10px 20px' }}>
                        <span style={{ fontSize: '2rem' }}>📄</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#360507' }}>{selectedPetition.photo_name || 'attachment.pdf'}</span>
                        <a 
                          href={selectedPetition.photo_data} 
                          download={selectedPetition.photo_name || 'attachment.pdf'}
                          className="quick-action-btn primary"
                          style={{ padding: '6px 14px', fontSize: '1.1rem', minHeight: 'auto', maxHeight: '40px', maxWidth: '200px' }}
                        >
                          Download PDF / பதிவிறக்கு
                        </a>
                      </div>
                    ) : (
                      <a href={selectedPetition.photo_data} target="_blank" rel="noopener noreferrer">
                        <img src={selectedPetition.photo_data} alt="Petition Attachment" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '6px', display: 'block', cursor: 'zoom-in' }} />
                      </a>
                    )}
                  </div>
                ) : (
                  <span className="p-val" style={{ color: '#8c7d7e', fontStyle: 'italic' }}>No file uploaded</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', margin: '20px 0 10px 0' }}>
                <button 
                  onClick={() => handleDownloadPDF(selectedPetition)} 
                  className="primary-btn" 
                  style={{ flex: 1, background: '#ffd84a', color: '#3f0608', borderColor: '#ffd84a' }}
                >
                  Download PDF / பிடிஎப் ஆக டவுன்லோட்
                </button>
                <button 
                  onClick={() => handleSharePetition(selectedPetition)} 
                  className="primary-btn" 
                  style={{ flex: 1, background: '#25D366', color: '#fff', borderColor: '#25D366' }}
                >
                  Share Petition / வாட்ஸ்அப்பில் பகிர்
                </button>
              </div>

              <form onSubmit={handleUpdatePetition} className="admin-update-form" style={{ borderTop: '1px solid rgba(90, 12, 18, 0.1)', paddingTop: '15px' }}>
                <div className="form-group">
                  <label>Update Status / மனு நிலைமை</label>
                  <select value={petitionStatus} onChange={(e) => setPetitionStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Solved">Solved</option>
                  </select>
                </div>
                <button type="submit" className="primary-btn save-change-btn" disabled={savingPetition}>
                  {savingPetition ? 'Saving...' : 'Update Petition Status'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

function JoinPartyBanner({ lang }) {
  const isEn = lang === 'en';
  return (
    <section className="join-party-banner" style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #5a0c12 0%, #360507 100%)',
      borderTop: '4px solid #ffd84a',
      borderBottom: '4px solid #ffd84a',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255, 216, 74, 0.1) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Teko, sans-serif',
          fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
          color: '#ffd84a',
          textTransform: 'uppercase',
          margin: '0 0 12px 0',
          letterSpacing: '1px'
        }}>
          {isEn ? "Join Tamilaga Vettri Kazhagam" : "தமிழக வெற்றிக் கழகத்தில் இணையுங்கள்"}
        </h2>
        <p style={{
          fontFamily: "'Instrument Sans', 'Noto Sans Tamil', sans-serif",
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#fff',
          opacity: 0.95,
          margin: '0 0 35px 0',
          lineHeight: 1.65
        }}>
          {isEn 
            ? "Become an official member of TVK and stand with our Thalapathy Vijay to build a transparent, equal, and progressive future for Tamil Nadu."
            : "நமது தவெக தலைவர் தளபதி விஜய் அவர்களின் வழியில் நேர்மையான, சமத்துவமான மற்றும் முற்போக்கான தமிழ்நாட்டை உருவாக்க அதிகாரப்பூர்வ உறுப்பினராக எங்களோடு இணையுங்கள்."}
        </p>
        <a 
          href="https://tvk.world/register" 
          target="_blank" 
          rel="noopener noreferrer"
          className="primary-btn" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.2rem',
            padding: '14px 38px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #ffd84a 0%, #f3ad20 100%)',
            color: '#3f0608',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(255, 216, 74, 0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
        >
          {isEn ? "Join Us Now" : "இப்போதே இணையுங்கள்"}
          <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = useState("ta");
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showPetitionModal, setShowPetitionModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const bodyClass = useMemo(() => (lang === "ta" ? "ta" : "en"), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.className = bodyClass;
  }, [lang, bodyClass]);

  if (hash === "#admin") {
    return <AdminPanel lang={lang} />;
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} setShowTrackModal={setShowTrackModal} setShowJoinModal={setShowJoinModal} setShowContactModal={setShowContactModal} />
      <main>
        <Hero lang={lang} setShowJoinModal={setShowJoinModal} setShowPetitionModal={setShowPetitionModal} setShowContactModal={setShowContactModal} />
        <QuickActions lang={lang} setShowPetitionModal={setShowPetitionModal} setShowJoinModal={setShowJoinModal} setShowContactModal={setShowContactModal} />
        <PartySection lang={lang} />
        <JoinPartyBanner lang={lang} />
        <PartyFeatures lang={lang} />
        <JourneySection lang={lang} />
        <NewsSection lang={lang} />
        <EventsSection lang={lang} />
      </main>
      <Footer lang={lang} setShowJoinModal={setShowJoinModal} />
      <ChatBot />

      {/* Floating Submit Petition Button */}
      <a 
        href="#petition" 
        className="floating-submit-petition-btn"
        onClick={(e) => {
          e.preventDefault();
          setShowPetitionModal(true);
        }}
        title={lang === 'en' ? 'Submit Petition' : 'மனுவைச் சமர்ப்பிக்க'}
      >
        <Inbox size={28} />
      </a>

      {/* Track Petition Modal */}
      <TrackPetitionModal 
        lang={lang} 
        isOpen={showTrackModal} 
        onClose={() => setShowTrackModal(false)} 
      />

      {/* Submit Petition Modal */}
      <SubmitPetitionModal 
        lang={lang} 
        isOpen={showPetitionModal} 
        onClose={() => setShowPetitionModal(false)} 
      />

      {/* Join Membership Modal */}
      <JoinMembershipModal 
        lang={lang} 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
      />

      {/* Contact Us Modal */}
      <ContactModal 
        lang={lang} 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
