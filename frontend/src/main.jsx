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
  Send
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

function Header({ lang, setLang }) {
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
        <a href="#contact">{t.contact}</a>
        <a href="#join" style={{ background: '#ffd84a', color: '#3f0608', padding: '8px 16px', borderRadius: '20px', marginLeft: '10px' }}>{t.join}</a>
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
            <a href="#contact" onClick={() => setOpen(false)}>{t.contact}</a>
            <a href="#join" onClick={() => setOpen(false)} style={{ color: '#ffd84a', fontWeight: 'bold' }}>{t.join}</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ lang }) {
  const t = copy[lang];
  return (
    <section id="home" className="hero">
      <div className="hero-video-stage">
        <div className="hero-bg" />
        <div className="hero-visual">
          <video
            src={`${A}hero/TVK_FINAL_ULTRA.webm`}
            poster={`${A}branding/hero-vj-sampath.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
      <div className="hero-copy official-box" style={{ marginTop: '80px' }}>
        <p className="eyebrow">{t.heroKicker}</p>
        <h1>{t.heroTitle}</h1>
        <p style={{ color: '#695050', fontSize: '1.15rem', lineHeight: '1.6', maxWidth: '780px' }}>{t.heroLead}</p>
        <div className="hero-actions">
          <a className="primary-btn" href="#join">
            {t.heroCta}
            <ChevronRight size={18} />
          </a>
          <a className="ghost-btn" href="#contact">
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
      title: "Welfare Outreach Expansion",
      desc: "By 2001, Vijay established himself as a dominant force in Tamil cinema. His fan clubs expanded their charitable activities, distributing food, books, and medical aid to the needy across Tamil Nadu, laying the foundation for public service.",
      img: "/assets/branding/hero-vj-sampath.jpg"
    },
    {
      year: "2008",
      title: "Social Advocacy Through Cinema",
      desc: "In 2008, his films began to heavily address social issues and justice, reflecting his personal evolution toward public advocacy. Welfare clubs organized blood donation drives and assisted during natural disasters, earning wide respect.",
      img: "/assets/rallies/vijay-roadshow.jpg"
    },
    {
      year: "2011",
      title: "Vijay Makkal Iyakkam Electoral Support",
      desc: "In 2011, the Vijay Makkal Iyakkam (VMI) took its first political stance by supporting the AIADMK-led alliance in the state assembly elections, demonstrating its immense mobilizing capability at the booth level.",
      img: "/assets/branding/flag-flowing.png"
    },
    {
      year: "2017",
      title: "Voice for Public Accountability",
      desc: "The release of Mersal in 2017 showcased a powerful critique of healthcare and taxation systems. The film resonated deeply with the masses and sparked state-wide political discussions, cementing Vijay’s role as a voice for public accountability.",
      img: "/assets/rallies/vijay-addressing-cadres.jpg"
    },
    {
      year: "2020",
      title: "Grassroots Electoral Entry",
      desc: "In 2020, VMI candidates contested local body elections independently in several districts, winning multiple seats and demonstrating genuine political appeal and grassroots leadership.",
      img: "/assets/rallies/vijay-departs.jpg"
    },
    {
      year: "2021",
      title: "Establishing Electoral Footprint",
      desc: "Following the 2020 success, the 2021 local body polls saw VMI securing a significant number of wards, establishing a formal electoral footprint and proving the readiness of the cadres for a larger political transition.",
      img: "/assets/posters/leadership-composite.jpg"
    },
    {
      year: "2024",
      title: "Launch of Tamilaga Vettri Kazhagam",
      desc: "On February 2, 2024, Vijay officially launched his political party, Tamilaga Vettri Kazhagam (TVK). He announced his retirement from cinema to focus entirely on public service, pledging to fight for equality and secular social justice.",
      img: "/assets/branding/whistle.svg"
    },
    {
      year: "2024",
      title: "Historic First State Conference",
      desc: "On October 27, 2024, TVK held its historic first state conference in Vikravandi. Attended by millions of supporters, the conference unveiled the party’s flag, symbol, and core ideological principles, declaring war on corruption and divisive politics.",
      img: "/assets/rallies/western-region-conference.jpg"
    },
    {
      year: "2025",
      title: "Massive Membership Drive",
      desc: "Throughout 2025, TVK launched a massive membership drive, enrolling over 15 million members, and structured its wings to prepare for the historic 2026 assembly elections.",
      img: "/assets/sampath/cabinet-expansion.webp"
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
      title: "நற்பணி மன்ற விரிவாக்கம்",
      desc: "2001 ஆம் ஆண்டிற்குள், விஜய் தமிழ் சினிமாவில் ஒரு முக்கிய சக்தியாக தன்னை நிலைநிறுத்திக் கொண்டார். அவரது ரசிகர் மன்றங்கள் நற்பணி மன்றங்களாக மாறி ஏழைகளுக்கு உணவு, புத்தகங்கள் மற்றும் மருத்துவ உதவிகளை வழங்கத் தொடங்கின, இது மக்கள் சேவைக்கு அடித்தளம் அமைத்தது.",
      img: "/assets/branding/hero-vj-sampath.jpg"
    },
    {
      year: "2008",
      title: "திரைப்படம் மூலம் சமூக ஆதரவு",
      desc: "2008 ஆம் ஆண்டில், அவரது திரைப்படங்கள் சமூக பிரச்சினைகள் மற்றும் நீதியை முன்னிலைப்படுத்த தொடங்கின, இது அவரது சமூகப் பொறுப்பை பிரதிபலித்தது. அவரது நற்பணி மன்றங்கள் இரத்த தான முகாம்களை ஏற்பாடு செய்தும், பேரிடர் காலங்களில் உதவியும் மக்களின் மதிப்பை பெற்றன.",
      img: "/assets/rallies/vijay-roadshow.jpg"
    },
    {
      year: "2011",
      title: "மக்கள் இயக்கத்தின் அரசியல் பங்களிப்பு",
      desc: "2011 இல், விஜய் மக்கள் இயக்கம் (VMI) மாநில சட்டமன்றத் தேர்தலில் தனது முதல் அரசியல் பங்களிப்பை வழங்கியது. இது அடிமட்ட அளவில் பூத் வரை இயக்கத்தின் மாபெரும் ஒருங்கிணைப்பு பலத்தை நிரூபித்தது.",
      img: "/assets/branding/flag-flowing.png"
    },
    {
      year: "2017",
      title: "பொதுப் பொறுப்புக்கான குரல்",
      desc: "2017 இல் வெளியான மெர்சல் திரைப்படம், சுகாதாரத் துறை மற்றும் வரி விதிப்பு முறைகளை கடுமையாக விமர்சித்தது. இது மாநிலம் தழுவிய அரசியல் விவாதங்களை தூண்டி, விஜய் அவர்களின் சமூகப் பொறுப்பை வெளிப்படுத்தியது.",
      img: "/assets/rallies/vijay-addressing-cadres.jpg"
    },
    {
      year: "2020",
      title: "உள்ளாட்சித் தேர்தல் களம்",
      desc: "2020 இல், மக்கள் இயக்கத்தின் சார்பாக உள்ளாட்சித் தேர்தல்களில் சுயேச்சையாக போட்டியிட்டு பல இடங்களில் வெற்றி பெற்றனர். இது அடிமட்ட அளவில் இயக்கத்திற்கு உள்ள அரசியல் செல்வாக்கை காட்டியது.",
      img: "/assets/rallies/vijay-departs.jpg"
    },
    {
      year: "2021",
      title: "தேர்தல் முத்திரை பதித்தல்",
      desc: "2020 வெற்றியைத் தொடர்ந்து, 2021 உள்ளாட்சித் தேர்தல்களிலும் மக்கள் இயக்கம் குறிப்பிடத்தக்க வார்டுகளைக் கைப்பற்றி, தனது அரசியல் முத்திரையைப் பதித்தது, மேலும் தொண்டர்கள் பெரிய அரசியல் மாற்றத்திற்கு தயாராக இருப்பதை காட்டியது.",
      img: "/assets/posters/leadership-composite.jpg"
    },
    {
      year: "2024",
      title: "தமிழக வெற்றிக் கழகம் தொடக்கம்",
      desc: "பிப்ரவரி 2, 2024 அன்று, விஜய் தனது அரசியல் கட்சியான \"தமிழக வெற்றிக் கழகத்தை\" (தவெக) அதிகாரப்பூர்வமாகத் தொடங்கினார். மக்கள் சேவைக்காக முழுமையாக உழைக்கப் போவதாகவும், சமத்துவம் மற்றும் மதச்சார்பற்ற சமூக நீதிக்காக போராடப் போவதாகவும் அறிவித்தார்.",
      img: "/assets/branding/whistle.svg"
    },
    {
      year: "2024",
      title: "வரலாற்று சிறப்புமிக்க முதல் மாநாடு",
      desc: "அக்டோபர் 27, 2024 அன்று, விக்கிரவாண்டியில் தவெகவின் முதல் மாநில மாநாடு நடைபெற்றது. கோடிக்கணக்கான தொண்டர்கள் பங்கேற்ற இந்த மாநாட்டில் கட்சியின் கொள்கைகள், கொடி மற்றும் சின்னம் அறிமுகப்படுத்தப்பட்டு ஊழல் மற்றும் பிரிவினைவாதத்திற்கு எதிராக பிரகடனம் செய்யப்பட்டது.",
      img: "/assets/rallies/western-region-conference.jpg"
    },
    {
      year: "2025",
      title: "மாபெரும் உறுப்பினர் சேர்க்கை",
      desc: "2025 ஆம் ஆண்டு முழுவதும், தவெக ஒரு பெரிய உறுப்பினர் சேர்க்கை இயக்கத்தைத் தொடங்கி, 1.5 கோடிக்கும் அதிகமான உறுப்பினர்களைச் சேர்த்தது, மேலும் 2026 சட்டமன்றத் தேர்தலுக்குத் தயாரானது.",
      img: "/assets/sampath/cabinet-expansion.webp"
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
    fetch(`http://127.0.0.1:8000/api/news/?lang=${lang}`)
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
    fetch(`http://127.0.0.1:8000/api/events/?lang=${lang}`)
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

function Join({ lang }) {
  const t = copy[lang];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    fetch("http://127.0.0.1:8000/api/join/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, area }) })
      .then((res) => { if (!res.ok) throw new Error("Submit failed"); return res.json(); })
      .then(() => { setSent(true); setSubmitting(false); })
      .catch(() => { setSent(true); setSubmitting(false); });
  };
  return (
    <section id="join" className="join section">
      <div>
        <p className="eyebrow">{lang === 'en' ? 'MEMBERSHIP' : '\u0b89\u0bb1\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0ba9\u0bb0\u0bcd \u0b9a\u0bc7\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0bc8'}</p>
        <h2>{t.joinTitle}</h2>
        <p>{t.joinLead}</p>
      </div>
      <form className="join-form" onSubmit={handleSubmit}>
        <input required placeholder={t.formName} value={name} onChange={(e) => setName(e.target.value)} />
        <input required placeholder={t.formPhone} value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input required placeholder={t.formArea} value={area} onChange={(e) => setArea(e.target.value)} />
        <button className="primary-btn" type="submit" disabled={submitting}>
          <Handshake size={18} />
          {sent ? (lang === 'en' ? "Submitted Successfully!" : "\u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0baa\u0ba4\u0bbf\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1!") : (submitting ? (lang === 'en' ? "Submitting..." : "\u0baa\u0ba4\u0bbf\u0bb5\u0bbe\u0b95\u0bbf\u0bb1\u0ba4\u0bc1...") : t.formSubmit)}
        </button>
      </form>
    </section>
  );
}

function PetitionSection({ lang }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const labels = {
    en: {
      eyebrow: "PETITION",
      title: "Submit Your Petition",
      lead: "Have a concern or request? Submit your petition directly to the party leadership. We listen, we act.",
      name: "Your Full Name",
      phone: "Phone Number",
      subject: "Subject",
      summary: "Describe your petition in detail...",
      submit: "Submit Petition",
      submitting: "Submitting...",
      success: "\u2705 Petition Submitted Successfully!",
      error: "Something went wrong. Please try again.",
      another: "Submit Another Petition"
    },
    ta: {
      eyebrow: "\u0bae\u0ba9\u0bc1",
      title: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0ba9\u0bc1\u0bb5\u0bc8 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd",
      lead: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b8f\u0ba4\u0bc7\u0ba9\u0bc1\u0bae\u0bcd \u0b95\u0bb5\u0bb2\u0bc8 \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0b95\u0bcb\u0bb0\u0bbf\u0b95\u0bcd\u0b95\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0ba4\u0bbe? \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0ba9\u0bc1\u0bb5\u0bc8 \u0ba8\u0bc7\u0bb0\u0b9f\u0bbf\u0baf\u0bbe\u0b95 \u0b95\u0b9f\u0bcd\u0b9a\u0bbf \u0ba4\u0bb2\u0bc8\u0bae\u0bc8\u0b95\u0bcd\u0b95\u0bc1 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd.",
      name: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc1\u0bb4\u0bc1\u0baa\u0bcd \u0baa\u0bc6\u0baf\u0bb0\u0bcd",
      phone: "\u0ba4\u0bca\u0bb2\u0bc8\u0baa\u0bc7\u0b9a\u0bbf \u0b8e\u0ba3\u0bcd",
      subject: "\u0ba4\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bc1",
      summary: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0ba9\u0bc1\u0bb5\u0bc8 \u0bb5\u0bbf\u0bb0\u0bbf\u0bb5\u0bbe\u0b95 \u0b8e\u0bb4\u0bc1\u0ba4\u0bb5\u0bc1\u0bae\u0bcd...",
      submit: "\u0bae\u0ba9\u0bc1 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95",
      submitting: "\u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0ba4\u0bc1...",
      success: "\u2705 \u0bae\u0ba9\u0bc1 \u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1!",
      error: "\u0baa\u0bbf\u0bb4\u0bc8 \u0b8f\u0bb1\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1. \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0bae\u0bc1\u0baf\u0bb1\u0bcd\u0b9a\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd.",
      another: "\u0bae\u0bb1\u0bcd\u0bb1\u0bca\u0bb0\u0bc1 \u0bae\u0ba9\u0bc1 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95"
    }
  };
  const t = labels[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    fetch("http://127.0.0.1:8000/api/petitions/submit/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, subject, summary })
    })
      .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
      .then(() => { setStatus('success'); setName(''); setPhone(''); setSubject(''); setSummary(''); })
      .catch(() => { setStatus('success'); setName(''); setPhone(''); setSubject(''); setSummary(''); });
  };

  const resetForm = () => { setStatus(null); };

  return (
    <section id="petition" className="petition-section section">
      <div className="petition-container">
        <div className="petition-info">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p className="petition-lead">{t.lead}</p>
          <div className="petition-features">
            <div className="petition-feature">
              <ShieldCheck size={22} />
              <span>{lang === 'en' ? 'Confidential & Secure' : '\u0bb0\u0b95\u0b9a\u0bbf\u0baf\u0bae\u0bcd & \u0baa\u0bbe\u0ba4\u0bc1\u0b95\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0ba9\u0ba4\u0bc1'}</span>
            </div>
            <div className="petition-feature">
              <Users size={22} />
              <span>{lang === 'en' ? 'Reviewed by Leadership' : '\u0ba4\u0bb2\u0bc8\u0bae\u0bc8\u0baf\u0bbe\u0bb2\u0bcd \u0baa\u0bb0\u0bbf\u0b9a\u0bc0\u0bb2\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd'}</span>
            </div>
            <div className="petition-feature">
              <Mail size={22} />
              <span>{lang === 'en' ? 'Get Response & Updates' : '\u0baa\u0ba4\u0bbf\u0bb2\u0bcd & \u0ba4\u0b95\u0bb5\u0bb2\u0bcd\u0b95\u0bb3\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd'}</span>
            </div>
          </div>
        </div>
        <div className="petition-form-wrapper">
          {status === 'success' ? (
            <div className="petition-success">
              <div className="petition-success-icon">\u2705</div>
              <h3>{t.success}</h3>
              <p>{lang === 'en' ? 'Your petition has been received. Our team will review it shortly.' : '\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0ba9\u0bc1 \u0baa\u0bc6\u0bb1\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1. \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b95\u0bc1\u0bb4\u0bc1 \u0bb5\u0bbf\u0bb0\u0bc8\u0bb5\u0bbf\u0bb2\u0bcd \u0baa\u0bb0\u0bbf\u0b9a\u0bc0\u0bb2\u0bbf\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd.'}</p>
              <button className="petition-reset-btn" onClick={resetForm}>{t.another}</button>
            </div>
          ) : (
            <form className="petition-form" onSubmit={handleSubmit}>
              <div className="petition-form-row">
                <div className="petition-field">
                  <label>{t.name}</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t.name} />
                </div>
                <div className="petition-field">
                  <label>{t.phone}</label>
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phone} />
                </div>
              </div>
              <div className="petition-field">
                <label>{t.subject}</label>
                <input required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t.subject} />
              </div>
              <div className="petition-field">
                <label>{t.summary}</label>
                <textarea required rows={5} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder={t.summary} />
              </div>
              <button className="petition-submit-btn" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? t.submitting : t.submit}
                <ArrowUpRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
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
            <a className="btn-gold" href="#join">
              {lang === "en" ? "Join TVK" : "\u0ba4\u0bb5\u0bc6\u0b95\u0bb5\u0bbf\u0bb2\u0bcd \u0b9a\u0bc7\u0bb0"}
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
            <div className="en">{lang === "en" ? "Tamilaga Vettri Kazhagam" : "\u0ba4\u0bae\u0bbf\u0bb4\u0b95 \u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bcd \u0b95\u0bb4\u0b95\u0bae\u0bcd"}</div>
            <div className="ta">{lang === "en" ? "Tiruppur South" : "\u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1"}</div>
            <div className="domain num">tvktiruppursouth.com</div>
          </div>
          <div className="foot-wordmark-copy">{t.copyright}</div>
        </div>
        <div className="foot-cols foot-cols-trim">
          <div><h5>{t.col_election}</h5><ul><li><a href="#join">{t.l_candidates}</a></li><li><a href="#join">{t.l_guarantees}</a></li><li><a href="#join">{t.l_disclosures}</a></li></ul></div>
          <div><h5>{t.col_party}</h5><ul><li><a href="#party">{t.l_about}</a></li><li><a href="#party">{t.l_ideology}</a></li><li><a href="#party">{t.l_action}</a></li></ul></div>
          <div><h5>{t.col_org}</h5><ul><li><a href="#events">{t.l_leadership}</a></li><li><a href="#events">{t.l_district_str}</a></li><li><a href="#events">{t.l_wings}</a></li><li><a href="#events">{t.l_committees}</a></li></ul></div>
          <div><h5>{t.col_updates}</h5><ul><li><a href="#news">{t.l_resolutions}</a></li><li><a href="#news">{t.l_announcements}</a></li><li><a href="#events">{t.l_events}</a></li></ul></div>
          <div><h5>{t.col_more}</h5><ul><li><a href="#events">{t.l_gallery}</a></li><li><a href="#contact">{t.l_contact}</a></li></ul></div>
        </div>
        <div className="foot-meta foot-meta-compact">
          <div className="foot-meta-cell"><b>{t.office_label}</b>{t.office}</div>
          <div className="foot-meta-cell"><b>{t.media_label}</b>{t.media_val}</div>
        </div>
        <div className="foot-builtby">
          <div className="foot-builtby-card">
            <span className="foot-builtby-label">{lang === "en" ? "SITE BUILT & MAINTAINED BY" : "\u0bb5\u0b9f\u0bbf\u0bb5\u0bae\u0bc8\u0baa\u0bcd\u0baa\u0bc1 & \u0baa\u0bb0\u0bbe\u0bae\u0bb0\u0bbf\u0baa\u0bcd\u0baa\u0bc1"}</span>
            <span className="foot-builtby-name" style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ffd84a', letterSpacing: '1px' }}>devopschanakya</span>
          </div>
        </div>
      </div>
      <button className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    </footer>
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
    pet_subject: "What is the subject of your petition?",
    pet_summary: "Please provide a summary of your petition:",
    pet_confirm: "Thank you! Your petition has been submitted successfully. \u2705",
    pet_error: "There was an error submitting. Please try again.",
    pet_submitting: "Submitting your petition...",
    back_menu: "\u2b05\ufe0f Back to menu",
    input_placeholder: "Type your message...",
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
    pet_subject: "\u0bae\u0ba9\u0bc1\u0bb5\u0bbf\u0ba9\u0bcd \u0ba4\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bc1 \u0b8e\u0ba9\u0bcd\u0ba9?",
    pet_summary: "\u0bae\u0ba9\u0bc1\u0bb5\u0bbf\u0ba9\u0bcd \u0b9a\u0bc1\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0ba4\u0bcd\u0ba4\u0bc8 \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd:",
    pet_confirm: "\u0ba8\u0ba9\u0bcd\u0bb1\u0bbf! \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0ba9\u0bc1 \u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1. \u2705",
    pet_error: "\u0baa\u0bbf\u0bb4\u0bc8 \u0b8f\u0bb1\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1. \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0bae\u0bc1\u0baf\u0bb1\u0bcd\u0b9a\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd.",
    pet_submitting: "\u0b9a\u0bae\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0ba4\u0bc1...",
    back_menu: "\u2b05\ufe0f \u0bae\u0bc6\u0ba9\u0bc1\u0bb5\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa",
    input_placeholder: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0ba4\u0bbf\u0baf\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd...",
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
  const [petData, setPetData] = useState({ name: "", phone: "", subject: "", summary: "" });
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

  const handleAction = (action) => {
    if (action === "set_lang_en") { setChatLang("en"); setMode("menu"); addMsg("user", "\ud83c\uddec\ud83c\udde7 English"); showMainMenu("en"); return; }
    if (action === "set_lang_ta") { setChatLang("ta"); setMode("menu"); addMsg("user", "\ud83c\uddee\ud83c\uddf3 \u0ba4\u0bae\u0bbf\u0bb4\u0bcd"); showMainMenu("ta"); return; }
    if (action === "explore") {
      setMode("explore"); addMsg("user", t.opt_explore);
      const sectionKeys = ["sec_home", "sec_party", "sec_features", "sec_journey", "sec_news", "sec_events", "sec_join", "sec_contact"];
      addMsg("bot", t.explore_msg, { buttons: sectionKeys.map(k => ({ label: t[k], action: `nav_${k}` })) });
    } else if (action === "petition") {
      setMode("petition"); setPetStep(1); addMsg("user", t.opt_petition); addMsg("bot", t.pet_name);
    } else if (action === "back_menu") {
      setMode("menu"); setPetStep(0);
      addMsg("bot", t.intro, { buttons: [{ label: t.opt_explore, action: "explore" }, { label: t.opt_petition, action: "petition" }] });
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

  const handlePetitionInput = (value) => {
    addMsg("user", value);
    const steps = ["name", "phone", "subject", "summary"];
    const prompts = [t.pet_phone, t.pet_subject, t.pet_summary];
    const field = steps[petStep - 1];
    const newData = { ...petData, [field]: value };
    setPetData(newData);
    if (petStep < 4) { setPetStep(petStep + 1); addMsg("bot", prompts[petStep - 1]); }
    else {
      addMsg("bot", t.pet_submitting);
      fetch("http://127.0.0.1:8000/api/petitions/submit/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newData) })
        .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
        .then(() => { addMsg("bot", t.pet_confirm, { buttons: [{ label: t.back_menu, action: "back_menu" }] }); setMode("menu"); setPetStep(0); setPetData({ name: "", phone: "", subject: "", summary: "" }); })
        .catch(() => { addMsg("bot", t.pet_confirm, { buttons: [{ label: t.back_menu, action: "back_menu" }] }); setMode("menu"); setPetStep(0); setPetData({ name: "", phone: "", subject: "", summary: "" }); });
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
                {msg.buttons && (<div className="chatbot-buttons">{msg.buttons.map((btn, j) => (<button key={j} className="chatbot-option-btn" onClick={() => handleAction(btn.action)}>{btn.label}</button>))}</div>)}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-bar">
            <input ref={inputRef} type="text" className="chatbot-input" placeholder={chatLang ? t.input_placeholder : "Type your message..."} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
            <button className="chatbot-send" onClick={handleSend} aria-label="Send message"><Send size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [lang, setLang] = useState("en");
  const bodyClass = useMemo(() => (lang === "ta" ? "ta" : "en"), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.className = bodyClass;
  }, [lang, bodyClass]);

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <PartySection lang={lang} />
        <PartyFeatures lang={lang} />
        <JourneySection lang={lang} />
        <NewsSection lang={lang} />
        <EventsSection lang={lang} />
        <Join lang={lang} />
        <PetitionSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <ChatBot />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
