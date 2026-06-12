import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_HERO = "/images/top-hero-faq-old.webp";
const IMG_ACCENT = "/images/lower-hero.webp";
const IMG_SUIT = "/images/top-hero-faq.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

const FAQ_SECTIONS = [
  {
    category: "Buying in Charlotte",
    icon: "🏠",
    questions: [
      {
        q: "Is Charlotte NC a good place to buy a home in 2025?",
        a: "Yes — Charlotte consistently ranks among the Southeast's strongest real estate markets. The metro's combination of Fortune 500 employment, steady in-migration, relative affordability versus peer cities like Atlanta and Nashville, and persistent supply constraints in desirable neighborhoods creates durable fundamentals for buyers. Charlotte Fintech Week, the upcoming MLS All-Star Game hosting, and continued corporate investment signal a city still in growth mode."
      },
      {
        q: "What is the best neighborhood in Charlotte to buy a home?",
        a: "It depends entirely on your lifestyle and budget. Plaza Midwood and NoDa suit walkable urban buyers who want character and Gold Line or LYNX transit access. Myers Park and Eastover serve luxury and established family buyers. South End attracts young professionals who want Blue Line access and the brewery corridor. Dilworth is consistently the most competitive — historic supply constraints and Freedom Park access make it perennially in demand. Ballantyne is the go-to for corporate relocations and families prioritizing schools. Ryan will match your specific priorities to the right neighborhood."
      },
      {
        q: "How competitive is the Charlotte real estate market?",
        a: "Inner Charlotte neighborhoods — Plaza Midwood, NoDa, Dilworth, Elizabeth, Chantilly — remain seller's markets with sub-1.5 months of inventory. Well-priced homes in these areas routinely go under contract within the first weekend. The surrounding suburbs and outer ring cities are more balanced. The level of competition varies significantly by neighborhood and price point — ask Ryan for a current read on your specific target area."
      },
      {
        q: "What is the average home price in Charlotte NC?",
        a: "The Charlotte metro median home price runs approximately $425,000 as of mid-2025. Neighborhood medians range widely — from $295,000 in Kannapolis to $2.1M in Eastover. Plaza Midwood sits around $575,000, Dilworth around $650,000, and Myers Park around $1.4M. See the Market Reports page for current neighborhood-level data."
      },
      {
        q: "How much do I need to buy a home in Charlotte?",
        a: "At minimum, you need a down payment (as low as 0% for VA loans, 3–3.5% for FHA and some conventional programs), closing costs (typically 2–5% of the purchase price), and 3–6 months cash reserves. On a $450,000 home, buyers using conventional financing with 5% down typically need $22,500–$45,000 total out of pocket. Ryan can connect you with trusted Charlotte lenders who'll give you an exact picture for your situation."
      },
      {
        q: "What is due diligence in North Carolina real estate?",
        a: "North Carolina uses a due diligence period — a negotiated window (typically 14–21 days) during which buyers can conduct inspections and terminate for any reason, forfeiting only their due diligence fee. The due diligence fee is paid directly to the seller at contract and is non-refundable regardless of outcome. This structure differs significantly from most other states and is critical to understand before making an offer in Charlotte."
      },
      {
        q: "Do buyers pay agent commission in Charlotte NC?",
        a: "In most Charlotte transactions, the seller covers the buyer's agent commission. As of August 2024, buyers sign a buyer agency agreement that defines compensation upfront — but commission is typically still negotiated as part of the overall transaction. Ryan's full buyer representation — search, strategy, negotiation, and closing management — comes at no direct cost to most buyers."
      },
      {
        q: "What are the best Charlotte neighborhoods for first-time buyers?",
        a: "Villa Heights, Chantilly, and Concord offer the strongest combination of affordability and lifestyle access for first-time buyers. Villa Heights sits adjacent to NoDa with LYNX Blue Line access at a meaningfully lower price point. Chantilly is tucked between Plaza Midwood and Elizabeth at a discount to both. Concord delivers metro access on I-85 at prices well below Mecklenburg County."
      },
      {
        q: "Can I buy a home in Charlotte while living out of state?",
        a: "Yes — Ryan regularly works with out-of-state buyers including military families on PCS orders. He conducts virtual tours, provides detailed neighborhood walkthroughs, and manages the full transaction remotely. Many buyers have purchased Charlotte homes from other states, from overseas, or while deployed. The process is structured to work with your timeline, not against it."
      },
    ]
  },
  {
    category: "Selling in Charlotte",
    icon: "🔑",
    questions: [
      {
        q: "When is the best time to sell a home in Charlotte NC?",
        a: "Spring and early summer historically produce the highest buyer demand and fastest sales in Charlotte — late February through May is peak season. That said, well-priced, well-presented homes sell in every season. Charlotte's mild winters and year-round corporate relocation activity keep the market more consistent than northern metros. Ryan will advise on timing based on your specific neighborhood and situation."
      },
      {
        q: "How long does it take to sell a home in Charlotte?",
        a: "In high-demand inner Charlotte neighborhoods, well-priced homes often go under contract within 7–14 days. The full close from accepted offer takes another 30–45 days. Total time from listing to funded close typically runs 45–75 days. Outer suburbs and higher price points trend longer. Ryan will give you a realistic, data-backed timeline for your specific property."
      },
      {
        q: "What is my Charlotte home worth?",
        a: "The most accurate answer comes from a Comparative Market Analysis — a data-driven review of recent comparable sales in your specific neighborhood, adjusted for your home's condition, features, and location. Ryan provides free CMAs for any Charlotte-area property. Zillow's Zestimate is a starting point for curiosity, not a pricing strategy — it doesn't know about your renovation, your lot orientation, or what just sold two streets over."
      },
      {
        q: "How much does it cost to sell a home in Charlotte NC?",
        a: "Sellers typically pay 5–6% in total agent commission plus 1–3% in closing costs including attorney fees, prorated property taxes, HOA dues, and agreed repair credits. On a $500,000 home, total selling costs typically run $30,000–$45,000. Ryan will prepare a personalized net proceeds estimate before you list so there are zero surprises at closing."
      },
      {
        q: "Should I make repairs before listing my Charlotte home?",
        a: "Selectively. Fresh paint, landscaping, and minor cosmetic updates deliver strong ROI. Full kitchen and bathroom renovations rarely return their full cost in a sale scenario — buyers discount heavily for their own taste preferences. Ryan walks every listing before it goes live and provides a specific, prioritized prep list: what to do, what to skip, and what to price around rather than repair."
      },
      {
        q: "What is the due diligence fee in North Carolina from a seller's perspective?",
        a: "The due diligence fee is paid directly to you at contract and is non-refundable regardless of outcome — including if the buyer terminates during due diligence. It's the seller's compensation for taking the home off the market while the buyer inspects. In Charlotte's competitive market, due diligence fees range from $1,000 to $10,000+ depending on price point and how competitive the offer situation is. A strong due diligence fee is one of the clearest signals of a serious buyer."
      },
    ]
  },
  {
    category: "Charlotte Neighborhoods",
    icon: "📍",
    questions: [
      {
        q: "What is Plaza Midwood known for in Charlotte?",
        a: "Plaza Midwood is Charlotte's most walkable historic neighborhood — a dense, eclectic grid of craftsman bungalows and mid-century homes along Central Avenue, with the city's best collection of independent restaurants, bars, and coffee shops. The Diamond Restaurant has been a neighborhood institution since 1945. The CityLYNX Gold Line streetcar connects residents to Uptown. If a Charlotte neighborhood has a genuine identity, it's Plaza Midwood."
      },
      {
        q: "What is NoDa Charlotte?",
        a: "NoDa — short for North Davidson — is Charlotte's official arts district. Murals, galleries, the Neighborhood Theatre, and a dense concentration of craft breweries define its character. The LYNX Blue Line light rail stops here, connecting residents directly to Uptown and University City. NoDa is where Camp North End, one of Charlotte's most exciting adaptive reuse projects, hosts weekly events including Midweek Mixtape live music every Wednesday in the Boileryard."
      },
      {
        q: "Is South End Charlotte walkable?",
        a: "Yes — South End has a Walk Score of 90 and is one of Charlotte's most transit-connected neighborhoods. Multiple LYNX Blue Line stations run its spine. The Rail Trail is a 3.5-mile greenway lined with murals and connecting neighborhoods by foot or bike. Suffolk Punch, Free Range Brewing, and Sycamore Brewing anchor a legitimate brewery district. South End is where Charlotte's young professional class chose to plant its flag."
      },
      {
        q: "What are the best Charlotte neighborhoods for families?",
        a: "Myers Park, Dilworth, Cotswold, and Ballantyne consistently rank as Charlotte's top family neighborhoods. Myers Park and Cotswold both feed into Myers Park High — one of North Carolina's highest-ranked public schools. Ballantyne feeds into Providence High with top-ranked Mecklenburg County schools and corporate campus amenities. Matthews and Davidson offer excellent school districts in a more small-town setting. Ryan will match your school priorities to the right feeder district."
      },
      {
        q: "How is Davidson NC different from other Charlotte suburbs?",
        a: "Davidson doesn't feel like a Charlotte suburb — and that's the point. Built around Davidson College, one of the nation's top liberal arts schools, it has a walkable Main Street, a genuine community identity, a weekly farmers market, and Lake Norman access. Kindred — one of Charlotte's most acclaimed restaurants — is on Main Street. Davidson feels like a Virginia college town that happens to be 25 minutes from a major metro. That combination is why it commands a premium."
      },
      {
        q: "What is the best Charlotte neighborhood for young professionals?",
        a: "South End is the consensus answer — LYNX access, walkability, brewery district, and tech office density make it the default for young professionals relocating to Charlotte. NoDa is the alternative for buyers who want arts district energy and a slightly lower price point. Plaza Midwood suits buyers who want maximum walkability and character without the new construction aesthetic of South End."
      },
      {
        q: "Is Ballantyne Charlotte a good place to live?",
        a: "For the right buyer — yes, consistently. Ballantyne is Charlotte's premier master-planned community: top-ranked schools, the Ballantyne Corporate Park housing major employers, TD Amp Ballantyne hosting major concerts like Primus and The Human League this summer, and a retail and dining corridor that keeps expanding. It's designed for families, corporate transferees, and buyers who want the full suburban package executed well."
      },
      {
        q: "What is Camp North End in Charlotte?",
        a: "Camp North End is one of the most ambitious adaptive reuse projects in the Southeast — a former Ford assembly plant and military logistics depot on 76 acres in North Charlotte, now being transformed into a mixed-use district of offices, restaurants, event spaces, and creative businesses. It's the cultural anchor of the Villa Heights and NoDa corridor. Midweek Mixtape live music runs every Wednesday at the Canteen from 7–9pm through September."
      },
    ]
  },
  {
    category: "Charlotte Living",
    icon: "🌆",
    questions: [
      {
        q: "What is Charlotte NC known for?",
        a: "Charlotte is the largest city in North Carolina and the second-largest banking center in the US after New York — home to Bank of America and the East Coast operations of Wells Fargo. It's also the center of NASCAR racing, with more race teams headquartered here than anywhere on earth. The Panthers, Hornets, and Knights call it home. The Bechtler Museum, Blumenthal Performing Arts Center, Discovery Place Science, and the Charlotte Symphony give the city genuine cultural depth. In 2026 Charlotte is hosting the MLS All-Star Game — with Messi confirmed on the roster."
      },
      {
        q: "What is the weather like in Charlotte NC?",
        a: "Charlotte has a humid subtropical climate with four distinct seasons. Summers are hot and humid (highs in the high 80s–low 90s). Winters are mild by mid-Atlantic standards — temperatures typically stay above freezing though snow is possible December through February. Spring and fall are the city's best seasons — warm, dry, and ideal for Charlotte's outdoor lifestyle. The Charlotte Symphony's Summer Pops series at Symphony Park in SouthPark runs through June and July."
      },
      {
        q: "Is Charlotte NC a good place to live?",
        a: "Charlotte consistently appears in national best-places-to-live rankings. The combination of a strong job market anchored by finance, tech, and healthcare, relative affordability versus peer metros, a growing cultural scene, mild weather, and proximity to both mountains and coast makes it a compelling choice. The city is still in active growth mode — infrastructure investment, new development, and population in-migration all point toward continued momentum."
      },
      {
        q: "What are the best things to do in Charlotte NC?",
        a: "Charlotte's activity range spans Panthers and Hornets games at Bank of America Stadium and Spectrum Center, Discovery Place Science (Science on the Rocks adult events run monthly), the Bechtler Museum and Mint Museum in Uptown, NoDa gallery crawls and live music at Neighborhood Theatre, the Rail Trail and Freedom Park for outdoor activity, and a food and drink scene centered on South End's brewery district and East Boulevard in Dilworth. The Charlotte Symphony performs Summer Pops outdoors at Symphony Park through the summer."
      },
      {
        q: "How far is Charlotte from the beach?",
        a: "Charlotte is approximately 3.5–4 hours from Wilmington and the Cape Fear coast — the nearest North Carolina beach. Myrtle Beach, SC is about 3.5 hours south. The Outer Banks are 5–6 hours. Charlotte's location also puts the Blue Ridge Mountains — Asheville, Boone, and the Black Balsam ridge — about 2 hours west. Many Charlotte residents do both regularly."
      },
      {
        q: "What is the job market like in Charlotte NC?",
        a: "Charlotte's job market is anchored by financial services (Bank of America, Wells Fargo, Truist, Ally Financial, LendingTree), healthcare (Atrium Health, Novant Health), technology, and a growing fintech sector — Charlotte Fintech Week in June brings together innovators and investors from across the industry. The city also has significant logistics, manufacturing, and energy sector employment. Unemployment typically runs below the national average."
      },
      {
        q: "Is Charlotte NC growing?",
        a: "Rapidly. Charlotte is one of the fastest-growing large metros in the United States. The metro population has grown from roughly 750,000 in 2000 to over 2.7 million today. Population projections suggest the metro could reach 3.5 million by 2035. This growth trajectory drives housing demand, infrastructure investment, and the sustained appreciation that has characterized Charlotte real estate for two decades."
      },
    ]
  },
  {
    category: "Military & Relocation",
    icon: "🎖️",
    questions: [
      {
        q: "Is Charlotte NC good for military families?",
        a: "Yes — Charlotte is an excellent destination for military families relocating from bases across the Southeast and beyond. The metro has no major active-duty installation nearby but is a common PCS destination for veterans transitioning to civilian careers in finance, healthcare, and tech. Ryan is a Marine Corps veteran and Certified Military Relocation Professional (MRP) — he handles VA loans, compressed PCS timelines, virtual tours, and the specific pressures of military family moves with firsthand understanding."
      },
      {
        q: "Does Charlotte NC have VA home loans available?",
        a: "Yes — VA loans are fully available throughout the Charlotte metro and surrounding area. Ryan works with Charlotte lenders experienced in VA loan processing, appraisal requirements, and closing timelines. VA loans offer zero down payment, no private mortgage insurance, and competitive rates for eligible veterans and active-duty service members. Ryan will flag any VA appraisal concerns on specific properties before you make an offer."
      },
      {
        q: "What is the best Charlotte neighborhood for military veterans?",
        a: "There's no single answer — it depends on your lifestyle and budget. Veterans who prioritize affordability and investment upside should look at Villa Heights, Concord, and Kannapolis. Those prioritizing family and schools will find Ballantyne, Matthews, and Davidson strong fits. Those wanting walkable urban life will find Plaza Midwood and NoDa compelling. Ryan will build a neighborhood shortlist based on your specific situation."
      },
      {
        q: "How does Ryan McGill help with military relocations to Charlotte?",
        a: "Ryan is a Marine Corps veteran and Certified Military Relocation Professional who has helped military families buy Charlotte homes from Germany, Japan, and bases across the US. He provides virtual tours, video neighborhood walkthroughs, VA loan guidance, PCS timeline management, and full remote transaction coordination. He understands that military orders don't flex for market conditions — his process is built around your timeline."
      },
    ]
  },
  {
    category: "Working With Ryan",
    icon: "🤝",
    questions: [
      {
        q: "Who is Ryan McGill at 5 Points Realty?",
        a: "Ryan McGill is a licensed North Carolina Real Estate Broker (License #359364) at 5 Points Realty in Charlotte. He's also a Marine Corps veteran with 2,100+ flight hours as a helicopter pilot, three combat deployments, and a Certified Military Relocation Professional designation. He teaches breathwork, volunteers with local nonprofits, and has been navigating Charlotte's neighborhoods professionally and personally for years. His approach: listen first, then guide. No pressure, no guesswork."
      },
      {
        q: "How do I contact Ryan McGill?",
        a: "Call or text (704) 576-4118. Visit 5 Points Realty at 2200 The Plaza, Charlotte, NC 28205. Or fill out the contact form on this site — Ryan will respond promptly."
      },
      {
        q: "What areas does Ryan McGill serve?",
        a: "Ryan serves Charlotte and all surrounding areas including Plaza Midwood, NoDa, Dilworth, Myers Park, South End, Elizabeth, Cotswold, Eastover, Villa Heights, Chantilly, Ballantyne, Uptown Charlotte, Huntersville, Mooresville, Davidson, Cornelius, Matthews, Concord, Kannapolis, Rock Hill SC, Gastonia, Mint Hill, and Pineville."
      },
      {
        q: "Does Ryan McGill work with buyers or sellers?",
        a: "Both. Ryan provides full buyer representation — search, strategy, negotiation, and closing — and full seller representation — pricing, preparation guidance, marketing, offer negotiation, and transaction management. He also specializes in buy-sell coordination for clients who need to do both simultaneously, and military relocation for active-duty and veteran buyers."
      },
      {
        q: "What is 5 Points Realty in Charlotte?",
        a: "5 Points Realty is a Charlotte-based independent brokerage founded in 2007 with a founding passion for architecture, design, and Charlotte's historic neighborhoods. Their office is at 2200 The Plaza in Plaza Midwood — the heart of one of Charlotte's most distinctive neighborhoods. The brokerage has deep roots in Charlotte's inner ring and a reputation for quality representation built over nearly two decades."
      },
    ]
  },
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(22px)", transition:`opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

export default function FAQPage() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [openItem,     setOpenItem]     = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xykapbvl", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({ first:"", last:"", email:"", phone:"", interest:"", message:"", timeline:"", neighborhoods:"", budget:"", address:"", condition:"", neighborhood:"", looking:"" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", message:"" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const allCategories = ["All", ...FAQ_SECTIONS.map(s => s.category)];
  const visibleSections = activeFilter === "All"
    ? FAQ_SECTIONS
    : FAQ_SECTIONS.filter(s => s.category === activeFilter);

  const totalQuestions = FAQ_SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);

  const inp = (key, type="text") => ({
    type, value: form[key],
    onChange: e => setForm(p => ({...p,[key]:e.target.value})),
    style:{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", WebkitAppearance:"none" },
  });

  // Build flat FAQ list for schema
  const schemaFaqs = FAQ_SECTIONS.flatMap(s => s.questions).slice(0, 10);

  return (
          <Head>
        <title>Charlotte NC Real Estate FAQ | Ryan McGill | 5 Points Realty</title>
        <meta name="description" content="Answers to the most common Charlotte NC real estate questions — buying, selling, timing, costs, and more. From licensed broker Ryan McGill at 5 Points Realty." />
        <meta property="og:title" content="Charlotte NC Real Estate FAQ | Ryan McGill | 5 Points Realty" />
        <meta property="og:description" content="Answers to the most common Charlotte NC real estate questions — buying, selling, timing, costs, and more. From licensed broker Ryan McGill at 5 Points Realty." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily:sans, background:C.warm, color:C.charcoal, overflowX:"hidden" }}>

      <div dangerouslySetInnerHTML={{ __html: `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            ${schemaFaqs.map(f => JSON.stringify({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            })).join(",\n            ")}
          ]
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Ryan McGill",
          "telephone": "+17045764118",
          "url": "https://ryanmcgillrealtor.com",
          "address": {"@type":"PostalAddress","streetAddress":"2200 The Plaza","addressLocality":"Charlotte","addressRegion":"NC","postalCode":"28205"},
          "areaServed": {"@type":"City","name":"Charlotte","addressRegion":"NC"}
        }
        </script>
      `}} />

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
        a{text-decoration:none;-webkit-tap-highlight-color:transparent;}
        button{-webkit-tap-highlight-color:transparent;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .pill:active{opacity:0.85;}
        .filter-btn:active{opacity:0.8;}
        input:focus,textarea:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px rgba(44,74,62,0.08);}
        .faq-row:active{background:${C.cream};}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background: scrolled||menuOpen ? "rgba(253,252,250,0.97)" : "transparent", backdropFilter:"blur(20px)", borderBottom: scrolled ? `1px solid ${C.rule}` : "1px solid transparent", transition:"all 0.3s" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1rem 1.4rem" }}>
          <a href="/" style={{ fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color: scrolled ? C.charcoal : "#fff", lineHeight:1.15, transition:"color 0.3s" }}>
            Ryan McGill
            <span style={{ display:"block", fontFamily:sans, fontSize:"0.55rem", letterSpacing:"0.13em", textTransform:"uppercase", color: scrolled ? C.mid : "rgba(255,255,255,0.6)", marginTop:1 }}>5 Points Realty · Charlotte, NC</span>
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <a href="tel:+17045764118" className="pill" style={{ background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.68rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.55rem 1rem", borderRadius:2 }}>Call Ryan</a>
            <div onClick={() => setMenuOpen(o => !o)} style={{ padding:"4px 2px", cursor:"pointer" }}>
              <div style={{ width:22, display:"flex", flexDirection:"column", gap:5 }}>
                {[0,1,2].map(i => <span key={i} style={{ display:"block", height:1.5, background: scrolled ? C.charcoal : "#fff", borderRadius:1, transform: menuOpen?(i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"none"):"none", opacity: menuOpen&&i===1?0:1, transition:"all 0.3s" }} />)}
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:C.warm, borderTop:`1px solid ${C.rule}`, animation:"slideDown 0.25s ease both" }}>
            {[["Home","/"],["Buy","/buy"],["Sell","/sell"],["Neighborhoods","/neighborhoods"],["Market Reports","/market-reports"],["About Ryan","/about"],["FAQ","/faq"],["Contact","#contact"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display:"block", padding:"1rem 1.4rem", fontFamily:sans, fontSize:"0.83rem", letterSpacing:"0.07em", textTransform:"uppercase", color:C.charcoal, borderBottom:`1px solid ${C.rule}` }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", height:"65svh", minHeight:460, maxHeight:680 }}>
        <img src={IMG_HERO} alt="Charlotte NC real estate FAQ — Ryan McGill 5 Points Realty" fetchpriority="high" decoding="async"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(24,24,22,0.5) 0%, rgba(24,24,22,0.2) 40%, rgba(24,24,22,0.82) 78%, rgba(24,24,22,0.97) 100%)" }} />
        <div style={{ position:"absolute", top:72, left:"1.4rem", zIndex:1 }}>
          <a href="/" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Home</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <span style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)" }}>FAQ</span>
        </div>
        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 1.4rem 2.5rem" }}>
          <p style={{ fontFamily:sans, fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:"0.8rem", animation:"fadeUp 0.7s 0.1s ease both" }}>Charlotte Real Estate · {totalQuestions} Questions Answered</p>
          <h1 style={{ fontFamily:serif, fontSize:"clamp(2.6rem,10vw,4.2rem)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:"0.6rem", animation:"fadeUp 0.7s 0.2s ease both" }}>
            Everything people ask<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.7)" }}>about Charlotte.</em>
          </h1>
          <p style={{ fontFamily:serif, fontSize:"clamp(0.95rem,3.5vw,1.3rem)", fontStyle:"italic", fontWeight:300, color:"rgba(255,255,255,0.6)", animation:"fadeUp 0.7s 0.3s ease both" }}>
            Buying, selling, neighborhoods, living. All of it.
          </p>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ background:C.charcoal, display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
        {[[`${totalQuestions}`, "Questions Answered"],["6","Topic Categories"],["23+","Neighborhoods Covered"]].map(([num,label],i) => (
          <Reveal key={label} delay={i*0.08}>
            <div style={{ textAlign:"center", padding:"1.4rem 0.5rem", borderRight: i<2 ? "1px solid #2A2A28" : "none" }}>
              <span style={{ fontFamily:serif, fontSize:"1.8rem", fontWeight:300, color:"#fff", lineHeight:1, display:"block" }}>{num}</span>
              <span style={{ fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.light, marginTop:"0.4rem", display:"block" }}>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FILTER BAR */}
      <div style={{ background:C.cream, borderBottom:`1px solid ${C.rule}`, padding:"1rem 1.4rem", position:"sticky", top:62, zIndex:100, backdropFilter:"blur(12px)" }}>
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
          <div style={{ display:"flex", gap:"0.5rem", width:"max-content" }}>
            {allCategories.map(cat => (
              <button key={cat} className="filter-btn" onClick={() => { setActiveFilter(cat); setOpenItem(null); }}
                style={{ fontFamily:sans, fontSize:"0.65rem", fontWeight: activeFilter===cat ? 500 : 400, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.45rem 0.9rem", borderRadius:99, border:`1px solid ${activeFilter===cat ? C.accent : C.rule}`, background: activeFilter===cat ? C.accent : "transparent", color: activeFilter===cat ? "#fff" : C.mid, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ SECTIONS */}
      {visibleSections.map((section, si) => (
        <section key={section.category} style={{ background: si%2===0 ? C.warm : C.cream, padding:"2.5rem 1.4rem" }}>
          <Reveal>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.75rem", paddingBottom:"1rem", borderBottom:`1px solid ${C.rule}` }}>
              <span style={{ fontSize:"1.3rem" }}>{section.icon}</span>
              <h2 style={{ fontFamily:serif, fontSize:"clamp(1.4rem,5vw,2rem)", fontWeight:300, color:C.charcoal }}>{section.category}</h2>
            </div>
          </Reveal>

          <div itemScope itemType="https://schema.org/FAQPage">
            {section.questions.map((faq, qi) => {
              const key = `${si}-${qi}`;
              const isOpen = openItem === key;
              return (
                <Reveal key={qi} delay={qi * 0.04}>
                  <div
                    className="faq-row"
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    style={{ borderBottom:`1px solid ${C.rule}`, cursor:"pointer", transition:"background 0.2s", borderRadius:3 }}
                    itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                  >
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 0", gap:"1rem" }}>
                      <span style={{ fontFamily:serif, fontSize:"1rem", fontWeight:400, color:C.charcoal, lineHeight:1.35, flex:1 }} itemProp="name">{faq.q}</span>
                      <span style={{ fontFamily:sans, fontSize:"1.3rem", color:C.accent, flexShrink:0, transition:"transform 0.25s", transform: isOpen?"rotate(45deg)":"none", display:"inline-block", lineHeight:1 }}>+</span>
                    </div>
                    <div
                      style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.88, maxHeight: isOpen ? 500 : 0, overflow:"hidden", transition:"max-height 0.4s ease, padding-bottom 0.4s", paddingBottom: isOpen ? "1.4rem" : 0 }}
                      itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                    >
                      <span itemProp="text">{faq.a}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      ))}

      {/* FULL BLEED */}
      <div style={{ position:"relative", height:"52vw", maxHeight:500, overflow:"hidden" }}>
        <img src={IMG_ACCENT} alt="Ryan McGill Charlotte NC realtor" decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,24,22,0.88) 0%, rgba(24,24,22,0.08) 60%)", display:"flex", alignItems:"flex-end", justifyContent:"flex-start", padding:"2rem 1.4rem" }}>
          <div style={{ maxWidth:"60%" }}>
            <p style={{ fontFamily:serif, fontSize:"clamp(1rem,3.5vw,1.6rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.45, marginBottom:"0.75rem", textAlign:"left" }}>
              "Charlotte is home. I know its neighborhoods, markets, and opportunities inside and out. Let me answer your specific question."
            </p>
            <span style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", display:"block", textAlign:"left" }}>— Ryan McGill · Realtor® · 5 Points Realty</span>
          </div>
        </div>
      </div>

      {/* DIDN'T FIND YOUR ANSWER */}
      <section style={{ background:C.accent, padding:"3rem 1.4rem", textAlign:"center" }}>
        <Reveal>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"0.5rem" }}>Didn't find your answer?</h2>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.68)", lineHeight:1.2, marginBottom:"1.5rem" }}>Ask Ryan directly.</h2>
          <p style={{ fontFamily:sans, fontSize:"0.88rem", color:"rgba(255,255,255,0.65)", lineHeight:1.8, marginBottom:"2rem", maxWidth:380, margin:"0 auto 2rem" }}>
            No question is too specific. Charlotte neighborhoods, pricing, timing, the buying or selling process — Ryan will give you a straight answer.
          </p>
          <a href="#contact" className="pill" style={{ display:"block", background:"#fff", color:C.accent, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, marginBottom:"0.75rem" }}>Ask a Question</a>
          <a href="tel:+17045764118" className="pill" style={{ display:"block", background:"transparent", color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, border:"1px solid rgba(255,255,255,0.32)" }}>(704) 576-4118</a>
        </Reveal>
      </section>

      {/* QUICK LINKS */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <p style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:C.accent, marginBottom:"0.75rem" }}>Keep Exploring</p>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.4rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"1.75rem" }}>
            More resources<br /><em style={{ fontStyle:"italic", color:C.accent }}>from Ryan.</em>
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
          {[
            ["🏠","Buyer's Guide","Everything you need to know about buying in Charlotte.", "/buyers-guide/"],
            ["🔑","Seller's Guide","How to sell your Charlotte home for maximum proceeds.", "/sellers-guide/"],
            ["📊","Market Reports","Neighborhood-level Charlotte market data, updated quarterly.", "/market-reports/"],
            ["📍","Neighborhoods","Detailed guides for all 23 Charlotte areas Ryan serves.", "/neighborhoods/"],
          ].map(([icon,title,desc,href]) => (
            <Reveal key={title}>
              <a href={href} style={{ background:C.warm, border:`1px solid ${C.rule}`, borderRadius:6, padding:"1.25rem 1rem", display:"block" }}>
                <span style={{ fontSize:"1.3rem", display:"block", marginBottom:"0.5rem" }}>{icon}</span>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1rem", fontWeight:400, color:C.charcoal, marginBottom:"0.3rem" }}>{title}</strong>
                <p style={{ fontSize:"0.76rem", color:C.mid, lineHeight:1.6 }}>{desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <p style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:C.accent, marginBottom:"0.75rem" }}>Get In Touch</p>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Ask Ryan<br /><em style={{ fontStyle:"italic", color:C.accent }}>anything.</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>Charlotte real estate, specific neighborhoods, the buying or selling process — no question is too specific or too early.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"0.75rem" }}>
            {[["first","First Name","Jane"],["last","Last Name","Smith"]].map(([k,l,p]) => (
              <div key={k}>
                <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>{l}</label>
                <input placeholder={p} {...inp(k)} />
              </div>
            ))}
          </div>
          {[["email","Email","jane@email.com","email"],["phone","Phone","(704) 555-0100","tel"]].map(([k,l,p,t]) => (
            <div key={k} style={{ marginBottom:"0.75rem" }}>
              <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>{l}</label>
              <input placeholder={p} {...inp(k,t)} />
            </div>
          ))}
          <div style={{ marginBottom:"1.25rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Your Question</label>
            <textarea placeholder="What do you want to know? Be as specific as you like..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", resize:"vertical", minHeight:110 }} />
          </div>
          <button onClick={handleSubmit} disabled={formStatus==="sending"} style={{ width:"100%", padding:"1rem", background: formStatus==="sending" ? C.accentL : C.accent, color:"#fff", border:"none", borderRadius:3, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", cursor: formStatus==="sending" ? "wait" : "pointer", transition:"background 0.2s" }}>
            Send Question
          </button>
          {formStatus === "success" && (
            <div style={{ background:"rgba(44,74,62,0.1)", border:"1px solid rgba(44,74,62,0.3)", borderRadius:6, padding:"1rem 1.25rem", marginTop:"1rem", textAlign:"center" }}>
              <p style={{ fontFamily:sans, fontSize:"0.85rem", color:C.accent, fontWeight:500 }}>✓ Message sent! Ryan will be in touch shortly.</p>
            </div>
          )}
          {formStatus === "error" && (
            <div style={{ background:"rgba(139,58,58,0.08)", border:"1px solid rgba(139,58,58,0.2)", borderRadius:6, padding:"1rem 1.25rem", marginTop:"1rem", textAlign:"center" }}>
              <p style={{ fontFamily:sans, fontSize:"0.85rem", color:"#8B3A3A" }}>Something went wrong. Please call Ryan at (704) 576-4118.</p>
            </div>
          )}
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background:C.charcoal, padding:"2.5rem 1.4rem" }}>
        <div style={{ marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid #2A2A28" }}>
          <div style={{ fontFamily:serif, fontSize:"1.1rem", fontWeight:300, color:"#fff", lineHeight:1.3, marginBottom:"0.4rem" }}>Ryan McGill</div>
          <div style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.13em", textTransform:"uppercase", color:C.light }}>Licensed Real Estate Broker · 5 Points Realty · Charlotte, NC · License #359364</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid #2A2A28" }}>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Resources</h4>
            {[["Buyer's Guide","/buyers-guide/"],["Seller's Guide","/sellers-guide/"],["Market Reports","/market-reports/"],["Neighborhoods","/neighborhoods/"],["About Ryan","/about/"]].map(([l,h]) => (
              <a key={l} href={h} style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Contact</h4>
            <a href="tel:+17045764118" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>(704) 576-4118</a>
            <a href="/buy" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Buy a Home</a>
            <a href="/sell" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Sell Your Home</a>
            <span style={{ display:"block", fontSize:"0.78rem", color:C.mid }}>2200 The Plaza, Charlotte NC</span>
            <div style={{ marginTop:"1.25rem" }}>
              <p style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Find Ryan</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <a href="https://share.google/dvIjO4KOAG1qnUvbX" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.78rem", color:"#fff" }}>
                  <span style={{ fontSize:"0.9rem" }}>📍</span> Google Business Profile
                </a>
                <a href="https://5pointsrealty.myhomesear.ch/our-agents/agent-details.cfm?AgentID=759" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.78rem", color:"#fff" }}>
                  <span style={{ fontSize:"0.9rem" }}>🏢</span> 5 Points Realty Profile
                </a>
                <a href="https://www.realtor.com/realestateagents/67f735599211d83beef98579" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.78rem", color:"#fff" }}>
                  <span style={{ fontSize:"0.9rem" }}>🏠</span> Realtor.com Profile
                </a>
                <a href="https://www.linkedin.com/in/ryanmcgill13" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.78rem", color:"#fff" }}>
                  <span style={{ fontSize:"0.9rem" }}>💼</span> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize:"0.64rem", color:"#3A3A38", lineHeight:1.6 }}>© 2025 Ryan McGill · 5 Points Realty · Charlotte, NC · Licensed Real Estate Broker · North Carolina</p>
      </footer>
    </div>
  );
}
