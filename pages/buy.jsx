import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_HERO = "/images/top-hero-main.webp";
const IMG_BW = "/images/lower-hero.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

const faqs = [
  { q: "How do I start buying a home in Charlotte NC?", a: "The first step is a conversation with Ryan to understand your goals, timeline, and budget. From there, he'll connect you with a trusted lender for pre-approval, walk you through Charlotte's neighborhoods, and build a strategy before you ever set foot in a home." },
  { q: "How much do I need for a down payment in Charlotte?", a: "It depends on your loan type. Conventional loans typically require 3–20% down. VA loans (for veterans and active military) often require zero down. FHA loans require as little as 3.5%. Ryan works with lenders who can walk you through every option." },
  { q: "How long does it take to buy a home in Charlotte?", a: "From pre-approval to close typically runs 30–60 days once you're under contract. Finding the right home in Charlotte's competitive market can take anywhere from a few weeks to a few months depending on your neighborhood and price point." },
  { q: "Do I need a buyer's agent in Charlotte NC?", a: "Yes — and in most cases it costs you nothing. The seller typically covers the buyer's agent commission. Ryan represents your interests, negotiates on your behalf, and guides you through every step of the transaction at no direct cost to you." },
  { q: "What are closing costs for buyers in North Carolina?", a: "Buyers in NC typically pay 2–5% of the purchase price in closing costs, covering loan origination, appraisal, title search, attorney fees, and prepaid items. Ryan will walk you through a full cost estimate before you make any offers." },
  { q: "What Charlotte neighborhoods are best for first-time buyers?", a: "Villa Heights, Chantilly, and Plaza Midwood offer the best combination of character, walkability, and entry-level pricing for first-time buyers. NoDa and South End are strong for condo buyers. Ryan will match your lifestyle to the right neighborhood." },
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(22px)", transition:`opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

const Label = ({ children, light = false }) => (
  <p style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color: light ? "rgba(255,255,255,0.5)" : C.accent, marginBottom:"0.75rem" }}>{children}</p>
);

export default function BuyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);
  
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

  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", timeline:"", neighborhoods:"", budget:"", message:"" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const inp = (key, type="text") => ({
    type, value: form[key],
    onChange: e => setForm(p => ({...p, [key]: e.target.value})),
    style: { width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", WebkitAppearance:"none" },
  });

  return (
          <Head>
        <title>Buy a Home in Charlotte NC | Ryan McGill | 5 Points Realty</title>
        <meta name="description" content="Looking to buy a home in Charlotte NC? Ryan McGill guides buyers through every neighborhood, price point, and situation — with zero buyer agent cost." />
        <meta property="og:title" content="Buy a Home in Charlotte NC | Ryan McGill | 5 Points Realty" />
        <meta property="og:description" content="Looking to buy a home in Charlotte NC? Ryan McGill guides buyers through every neighborhood, price point, and situation — with zero buyer agent cost." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily:sans, background:C.warm, color:C.charcoal, overflowX:"hidden" }}>

      <div dangerouslySetInnerHTML={{ __html: `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Buy a Home in Charlotte NC",
          "description": "Ryan McGill, licensed real estate broker at 5 Points Realty, guides buyers through Charlotte NC's competitive real estate market — from pre-approval to close.",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Ryan McGill",
            "telephone": "+17045764118",
            "url": "https://ryanmcgillrealtor.com",
            "address": {"@type":"PostalAddress","streetAddress":"2200 The Plaza","addressLocality":"Charlotte","addressRegion":"NC","postalCode":"28205"}
          },
          "areaServed": {"@type":"City","name":"Charlotte","addressRegion":"NC"},
          "serviceType": "Residential Real Estate Buyer Representation"
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"How do I start buying a home in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"The first step is a conversation with Ryan to understand your goals, timeline, and budget. From there, he'll connect you with a trusted lender for pre-approval, walk you through Charlotte's neighborhoods, and build a strategy before you ever set foot in a home."}},
            {"@type":"Question","name":"How much do I need for a down payment in Charlotte?","acceptedAnswer":{"@type":"Answer","text":"Conventional loans typically require 3–20% down. VA loans often require zero down. FHA loans require as little as 3.5%. Ryan works with lenders who can walk you through every option."}},
            {"@type":"Question","name":"Do I need a buyer's agent in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"Yes — and in most cases it costs you nothing. The seller typically covers the buyer's agent commission. Ryan represents your interests, negotiates on your behalf, and guides you through every step at no direct cost to you."}}
          ]
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
        input:focus,select:focus,textarea:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px rgba(44,74,62,0.08);}
        .step-card:hover{background:${C.sand};}
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
                {[0,1,2].map(i => <span key={i} style={{ display:"block", height:1.5, background: scrolled ? C.charcoal : "#fff", borderRadius:1, transform: menuOpen ? (i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"none") : "none", opacity: menuOpen&&i===1 ? 0 : 1, transition:"all 0.3s" }} />)}
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:C.warm, borderTop:`1px solid ${C.rule}`, animation:"slideDown 0.25s ease both" }}>
            {[["Home","/"],["Buy","/buy"],["Sell","/sell"],["Neighborhoods","/neighborhoods"],["Market Reports","/market-reports"],["About Ryan","/about"],["FAQ","/faq"],["Contact","#contact"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display:"block", padding:"1rem 1.4rem", fontFamily:sans, fontSize:"0.83rem", letterSpacing:"0.07em", textTransform:"uppercase", color:C.charcoal, borderBottom:`1px solid ${C.rule}` }}>{l}</a>
            ))}
            <div style={{ padding:"1.4rem" }}>
              <a href="tel:+17045764118" style={{ display:"block", background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"0.95rem", borderRadius:3, textAlign:"center" }}>(704) 576-4118</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", height:"100svh", minHeight:560, maxHeight:820 }}>
        <img src={IMG_HERO} alt="Buy a home in Charlotte NC with Ryan McGill" fetchpriority="high" decoding="async"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(24,24,22,0.3) 0%, rgba(24,24,22,0.1) 35%, rgba(24,24,22,0.78) 75%, rgba(24,24,22,0.95) 100%)" }} />
        <div style={{ position:"absolute", top:72, left:"1.4rem", zIndex:1 }}>
          <a href="/" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Home</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <span style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)" }}>Buy</span>
        </div>
        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 1.4rem 2.5rem" }}>
          <p style={{ fontFamily:sans, fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:"0.8rem", animation:"fadeUp 0.7s 0.1s ease both" }}>Buy a Home in Charlotte, NC</p>
          <h1 style={{ fontFamily:serif, fontSize:"clamp(2.8rem,11vw,4.5rem)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:"0.6rem", animation:"fadeUp 0.7s 0.2s ease both" }}>
            Find your place<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.72)" }}>in Charlotte.</em>
          </h1>
          <p style={{ fontFamily:serif, fontSize:"clamp(1rem,3.5vw,1.35rem)", fontStyle:"italic", fontWeight:300, color:"rgba(255,255,255,0.6)", marginBottom:"1.75rem", animation:"fadeUp 0.7s 0.3s ease both" }}>
            Right neighborhood. Right price. Zero guesswork.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <a href="#contact" className="pill" style={{ flex:1, background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block" }}>Start Your Search</a>
            <a href="/neighborhoods" className="pill" style={{ flex:1, background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block", border:"1px solid rgba(255,255,255,0.28)" }}>Explore Areas</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:C.charcoal, display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[["$0","Buyer Agent Cost"],["23+","Neighborhoods"],["MRP","Military Certified"],["CLT","Local Expert"]].map(([num,label],i) => (
          <Reveal key={label} delay={i*0.08}>
            <div style={{ textAlign:"center", padding:"1.4rem 0.5rem", borderRight: i<3 ? "1px solid #2A2A28" : "none" }}>
              <span style={{ fontFamily:serif, fontSize:"1.5rem", fontWeight:300, color:"#fff", lineHeight:1, display:"block" }}>{num}</span>
              <span style={{ fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.light, marginTop:"0.4rem", display:"block" }}>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* WHY RYAN */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Why Work With Ryan</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"1.25rem" }}>
            Charlotte's market is<br /><em style={{ fontStyle:"italic", color:C.accent }}>competitive. So is Ryan.</em>
          </h2>
          <p style={{ fontSize:"0.93rem", color:C.mid, lineHeight:1.9, marginBottom:"2rem" }}>
            Charlotte's best neighborhoods move fast. Plaza Midwood bungalows, Myers Park estates, South End condos — well-priced homes often receive multiple offers within days. The buyers who win aren't just the ones with the highest offer. They're the ones with the best representation, the clearest strategy, and a broker who knows when to move and how.
          </p>
        </Reveal>
        {[
          ["🎯","Local Neighborhood Expertise","Ryan knows every Charlotte neighborhood from the inside — pricing trends, block-by-block differences, what's overpriced and what's a genuine opportunity."],
          ["⚡","Fast, Decisive Action","In competitive markets, hesitation costs homes. Ryan's military background means he processes information quickly, moves decisively, and keeps your transaction on track."],
          ["🤝","Zero Cost to Buyers","In most transactions, the seller covers the buyer's agent commission. Ryan's full representation — search, strategy, negotiation, closing — comes at no direct cost to you."],
          ["🎖️","Military Relocation Certified","As a Certified MRP, Ryan specializes in VA loans, PCS moves, and the unique complexities of military family relocations to Charlotte."],
        ].map((item,i) => (
          <Reveal key={i} delay={i*0.08}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", padding:"1.2rem 0", borderBottom:`1px solid ${C.rule}` }}>
              <span style={{ fontSize:"1.2rem", flexShrink:0, width:28, textAlign:"center", marginTop:2 }}>{item[0]}</span>
              <div>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1rem", fontWeight:400, color:C.charcoal, marginBottom:"0.3rem" }}>{item[1]}</strong>
                <p style={{ fontSize:"0.82rem", color:C.mid, lineHeight:1.8 }}>{item[2]}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* PROCESS */}
      <section style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>The Buying Process</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"2rem" }}>
            Step by step.<br /><em style={{ fontStyle:"italic", color:C.accent }}>No surprises.</em>
          </h2>
        </Reveal>
        {[
          ["01","Conversation & Goals","Ryan starts by understanding what you want, what you need, and what your timeline looks like. No pitch. Just clarity."],
          ["02","Pre-Approval","Ryan connects you with trusted Charlotte lenders to get pre-approved — so you know your real budget before you fall in love with a home."],
          ["03","Neighborhood Strategy","Based on your lifestyle, commute, budget, and priorities, Ryan narrows the search to the right neighborhoods and the right property types."],
          ["04","The Search","Ryan sources active listings, off-market opportunities, and upcoming inventory. You see the homes worth seeing — not everything on Zillow."],
          ["05","Offer & Negotiation","When you find the one, Ryan builds a competitive offer strategy and negotiates terms that protect your interests — price, contingencies, timeline, and more."],
          ["06","Due Diligence & Closing","Inspections, appraisals, title, and closing — Ryan manages every step and keeps you informed so there are zero surprises at the closing table."],
        ].map(([num,title,body],i) => (
          <Reveal key={num} delay={i*0.07}>
            <div className="step-card" style={{ display:"flex", gap:"1.2rem", padding:"1.4rem 1rem", borderBottom:`1px solid ${C.rule}`, borderRadius:4, transition:"background 0.2s", marginBottom:1 }}>
              <span style={{ fontFamily:serif, fontSize:"1.8rem", fontWeight:300, color:C.accent, opacity:0.4, lineHeight:1, flexShrink:0, width:36, marginTop:2 }}>{num}</span>
              <div>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color:C.charcoal, marginBottom:"0.35rem" }}>{title}</strong>
                <p style={{ fontSize:"0.82rem", color:C.mid, lineHeight:1.8 }}>{body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* FULL BLEED */}
      <div style={{ position:"relative", height:"55vw", maxHeight:520, overflow:"hidden" }}>
        <img src={IMG_BW} alt="Ryan McGill Charlotte NC real estate broker" decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,24,22,0.82) 0%, rgba(24,24,22,0.08) 65%)", display:"flex", alignItems:"flex-end", padding:"2rem 1.4rem" }}>
          <div>
            <p style={{ fontFamily:serif, fontSize:"clamp(1.2rem,4.5vw,1.8rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.45, marginBottom:"0.75rem" }}>
              "My goal isn't just to find you a house. It's to find you the right home, in the right neighborhood, at the right price — and get you there without the stress."
            </p>
            <span style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>— Ryan McGill · Realtor® · 5 Points Realty</span>
          </div>
        </div>
      </div>

      {/* BUYER TYPES */}
      <section style={{ background:C.charcoal, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label light>Who Ryan Works With</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:"#fff", marginBottom:"2rem" }}>
            Every buyer.<br /><em style={{ fontStyle:"italic", color:C.accentL }}>Every situation.</em>
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"#2A2A28", border:"1px solid #2A2A28", borderRadius:6, overflow:"hidden" }}>
          {[
            ["🏠","First-Time Buyers","Navigating your first purchase is complex. Ryan simplifies the process, explains every step, and makes sure you never feel pressured into a decision you're not confident about."],
            ["🎖️","Military & Veterans","As an MRP-certified broker and Marine veteran, Ryan understands VA loans, PCS timelines, and the unique needs of military families relocating to Charlotte."],
            ["📦","Relocation Buyers","Moving to Charlotte from out of state? Ryan offers virtual tours, neighborhood orientation, and a structured process that makes a long-distance move feel manageable."],
            ["📈","Investors","From buy-and-hold rentals to fix-and-flip opportunities, Ryan brings market data and neighborhood knowledge to help investors identify Charlotte's best opportunities."],
          ].map(([icon,title,body],i) => (
            <Reveal key={i} delay={i*0.08}>
              <div style={{ background:C.charcoal, padding:"1.75rem 1.25rem" }}>
                <span style={{ fontSize:"1.3rem", display:"block", marginBottom:"0.6rem" }}>{icon}</span>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color:"#fff", marginBottom:"0.4rem", lineHeight:1.3 }}>{title}</strong>
                <p style={{ fontSize:"0.8rem", color:C.light, lineHeight:1.8 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEIGHBORHOODS PREVIEW */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Explore Charlotte</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Not sure where<br /><em style={{ fontStyle:"italic", color:C.accent }}>to buy?</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>Ryan has deep knowledge of every Charlotte neighborhood. Here's a quick snapshot of the most popular buyer targets.</p>
        </Reveal>
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
          <div style={{ display:"flex", gap:"0.75rem", paddingBottom:"0.5rem", width:"max-content" }}>
            {[
              ["Plaza Midwood","$575K median","Historic · Walkable","/neighborhoods/plaza-midwood/"],
              ["NoDa","$460K median","Arts · LYNX Access","/neighborhoods/noda/"],
              ["Dilworth","$650K median","Historic · Family","/neighborhoods/dilworth/"],
              ["Myers Park","$1.4M median","Luxury · Schools","/neighborhoods/myers-park/"],
              ["South End","$425K median","Urban · Modern","/neighborhoods/south-end/"],
              ["Ballantyne","$625K median","Family · Corporate","/neighborhoods/ballantyne/"],
            ].map(([name,price,type,href]) => (
              <a key={name} href={href} style={{ width:"56vw", maxWidth:220, background:C.warm, border:`1px solid ${C.rule}`, borderRadius:6, padding:"1.25rem 1.1rem", flexShrink:0, display:"block" }}>
                <div style={{ fontFamily:sans, fontSize:"0.55rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.accent, marginBottom:"0.3rem" }}>{type}</div>
                <div style={{ fontFamily:serif, fontSize:"1.2rem", fontWeight:400, color:C.charcoal, marginBottom:"0.3rem", lineHeight:1.2 }}>{name}</div>
                <div style={{ fontFamily:sans, fontSize:"0.78rem", color:C.mid, marginBottom:"0.75rem" }}>{price}</div>
                <div style={{ fontFamily:sans, fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.accent }}>View Area →</div>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop:"1.25rem" }}>
          <Reveal>
            <a href="/neighborhoods" style={{ display:"block", background:"transparent", color:C.charcoal, fontFamily:sans, fontSize:"0.72rem", fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase", padding:"0.9rem", borderRadius:3, textAlign:"center", border:`1px solid ${C.rule}` }}>
              View All 23 Areas
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background:C.warm, padding:"3rem 1.4rem" }} itemScope itemType="https://schema.org/FAQPage">
        <Reveal>
          <Label>Common Questions</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"2rem" }}>
            Buyers ask<br /><em style={{ fontStyle:"italic", color:C.accent }}>Ryan everything.</em>
          </h2>
        </Reveal>
        {faqs.map((faq,i) => (
          <Reveal key={i} delay={i*0.05}>
            <div onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{ borderBottom:`1px solid ${C.rule}`, cursor:"pointer" }}
              itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.3rem 0", gap:"1rem" }}>
                <span style={{ fontFamily:serif, fontSize:"1rem", fontWeight:400, color:C.charcoal, lineHeight:1.35 }} itemProp="name">{faq.q}</span>
                <span style={{ fontFamily:sans, fontSize:"1.3rem", color:C.accent, flexShrink:0, transition:"transform 0.25s", transform: openFaq===i ? "rotate(45deg)" : "none", display:"inline-block", lineHeight:1 }}>+</span>
              </div>
              <div style={{ fontSize:"0.85rem", color:C.mid, lineHeight:1.8, maxHeight: openFaq===i ? 300 : 0, overflow:"hidden", transition:"max-height 0.35s ease, padding-bottom 0.35s", paddingBottom: openFaq===i ? "1.3rem" : 0 }}
                itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">{faq.a}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background:C.accent, padding:"3rem 1.4rem", textAlign:"center" }}>
        <Reveal>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"0.6rem" }}>Ready to find your</h2>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.68)", lineHeight:1.2, marginBottom:"2rem" }}>Charlotte home?</h2>
          <a href="#contact" className="pill" style={{ display:"block", background:"#fff", color:C.accent, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, marginBottom:"0.75rem" }}>Start Your Search</a>
          <a href="tel:+17045764118" className="pill" style={{ display:"block", background:"transparent", color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, border:"1px solid rgba(255,255,255,0.32)" }}>(704) 576-4118</a>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Get Started</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Tell Ryan what<br /><em style={{ fontStyle:"italic", color:C.accent }}>you're looking for.</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>No obligation. Ryan will reach out to start the conversation on your timeline.</p>
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
          <div style={{ marginBottom:"0.75rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Ideal Timeline</label>
            <select value={form.timeline} onChange={e => setForm(p => ({...p,timeline:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.mid, outline:"none", WebkitAppearance:"none" }}>
              <option value="">Select one</option>
              <option>ASAP — actively searching</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>6–12 months</option>
              <option>Just exploring</option>
            </select>
          </div>
          <div style={{ marginBottom:"0.75rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Neighborhoods of Interest</label>
            <input placeholder="e.g. Plaza Midwood, NoDa, Dilworth..." {...inp("neighborhoods")} />
          </div>
          <div style={{ marginBottom:"0.75rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Budget Range</label>
            <select value={form.budget} onChange={e => setForm(p => ({...p,budget:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.mid, outline:"none", WebkitAppearance:"none" }}>
              <option value="">Select one</option>
              <option>Under $300K</option>
              <option>$300K – $450K</option>
              <option>$450K – $650K</option>
              <option>$650K – $1M</option>
              <option>$1M+</option>
            </select>
          </div>
          <div style={{ marginBottom:"1.25rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Anything Else?</label>
            <textarea placeholder="Tell Ryan about your situation — what matters most to you in your next home..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", resize:"vertical", minHeight:110 }} />
          </div>
          <button onClick={handleSubmit} disabled={formStatus==="sending"} style={{ width:"100%", padding:"1rem", background: formStatus==="sending" ? C.accentL : C.accent, color:"#fff", border:"none", borderRadius:3, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", cursor: formStatus==="sending" ? "wait" : "pointer", transition:"background 0.2s" }}>
            Start My Search
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
          <div style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.13em", textTransform:"uppercase", color:C.light }}>Licensed Real Estate Broker · 5 Points Realty · Charlotte, NC</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid #2A2A28" }}>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Neighborhoods</h4>
            {["Plaza Midwood","NoDa","Dilworth","Myers Park","South End","All Areas →"].map(n => (
              <a key={n} href={`/neighborhoods/${n.toLowerCase().replace(/ /g,"-").replace("→","")}/`} style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>{n}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Contact</h4>
            <a href="tel:+17045764118" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>(704) 576-4118</a>
            <a href="/sell" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Sell Your Home</a>
            <a href="/about" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>About Ryan</a>
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
