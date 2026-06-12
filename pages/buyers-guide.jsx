import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_HERO = "/images/top-hero-buyers-sellers.webp";
const IMG_BW = "/images/lower-hero.webp";
const IMG_GROUP = "/images/lower-hero-buyers-sellers.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

const CHAPTERS = [
  { id:"readiness",    num:"01", title:"Are You Ready to Buy?",              anchor:"#readiness" },
  { id:"financing",    num:"02", title:"Financing & Pre-Approval",           anchor:"#financing" },
  { id:"agent",        num:"03", title:"Choosing the Right Agent",           anchor:"#agent" },
  { id:"search",       num:"04", title:"The Home Search",                    anchor:"#search" },
  { id:"offer",        num:"05", title:"Making an Offer",                    anchor:"#offer" },
  { id:"duediligence", num:"06", title:"Due Diligence & Inspections",        anchor:"#duediligence" },
  { id:"closing",      num:"07", title:"The Closing Process",                anchor:"#closing" },
  { id:"military",     num:"08", title:"Military & VA Buyers",               anchor:"#military" },
  { id:"neighborhoods",num:"09", title:"Choosing a Charlotte Neighborhood",  anchor:"#neighborhoods" },
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

const Label = ({ children, light = false }) => (
  <p style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color: light ? "rgba(255,255,255,0.5)" : C.accent, marginBottom:"0.75rem" }}>{children}</p>
);

const ChapterTitle = ({ num, title, id }) => (
  <div id={id} style={{ display:"flex", alignItems:"flex-start", gap:"1rem", marginBottom:"1.5rem", paddingTop:"0.5rem" }}>
    <span style={{ fontFamily:serif, fontSize:"2.2rem", fontWeight:300, color:C.accent, opacity:0.35, lineHeight:1, flexShrink:0, marginTop:4 }}>{num}</span>
    <h2 style={{ fontFamily:serif, fontSize:"clamp(1.6rem,6vw,2.4rem)", fontWeight:300, lineHeight:1.2, color:C.charcoal }}>{title}</h2>
  </div>
);

const Tip = ({ children }) => (
  <div style={{ background:`rgba(44,74,62,0.07)`, border:`1px solid rgba(44,74,62,0.2)`, borderLeft:`3px solid ${C.accent}`, borderRadius:"0 4px 4px 0", padding:"1rem 1.1rem", margin:"1.5rem 0" }}>
    <p style={{ fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.accent, marginBottom:"0.3rem" }}>Ryan's Take</p>
    <p style={{ fontSize:"0.85rem", color:C.charcoal, lineHeight:1.8 }}>{children}</p>
  </div>
);

const CheckList = ({ items }) => (
  <div style={{ margin:"1.25rem 0" }}>
    {items.map((item, i) => (
      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.75rem", padding:"0.6rem 0", borderBottom:`1px solid ${C.rule}` }}>
        <span style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:700, color:C.accent, flexShrink:0, marginTop:4, letterSpacing:"0.05em" }}>✓</span>
        <p style={{ fontSize:"0.85rem", color:C.mid, lineHeight:1.7 }}>{item}</p>
      </div>
    ))}
  </div>
);

const BodyText = ({ children }) => (
  <p style={{ fontSize:"0.93rem", color:C.mid, lineHeight:1.95, marginBottom:"1.1rem" }}>{children}</p>
);

const SubHead = ({ children }) => (
  <h3 style={{ fontFamily:serif, fontSize:"1.3rem", fontWeight:400, color:C.charcoal, marginBottom:"0.75rem", marginTop:"1.75rem", lineHeight:1.3 }}>{children}</h3>
);

export default function BuyersGuide() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [tocOpen,  setTocOpen]    = useState(false);
  
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

  const inp = (key, type="text") => ({
    type, value: form[key],
    onChange: e => setForm(p => ({...p,[key]:e.target.value})),
    style:{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", WebkitAppearance:"none" },
  });

  return (
          <Head>
        <title>Charlotte NC Home Buyers Guide | Ryan McGill | 5 Points Realty</title>
        <meta name="description" content="A step-by-step guide to buying a home in Charlotte NC. From pre-approval to closing — written by licensed broker Ryan McGill at 5 Points Realty." />
        <meta property="og:title" content="Charlotte NC Home Buyers Guide | Ryan McGill | 5 Points Realty" />
        <meta property="og:description" content="A step-by-step guide to buying a home in Charlotte NC. From pre-approval to closing — written by licensed broker Ryan McGill at 5 Points Realty." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily:sans, background:C.warm, color:C.charcoal, overflowX:"hidden" }}>

      <div dangerouslySetInnerHTML={{ __html: `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Buy a Home in Charlotte NC",
          "description": "A comprehensive step-by-step guide to buying a home in Charlotte NC, written by Ryan McGill, licensed real estate broker at 5 Points Realty.",
          "author": {"@type":"RealEstateAgent","name":"Ryan McGill","url":"https://ryanmcgillrealtor.com"},
          "step": [
            {"@type":"HowToStep","name":"Assess Your Readiness","text":"Evaluate your financial position, credit score, savings, and lifestyle goals before beginning the home search."},
            {"@type":"HowToStep","name":"Get Pre-Approved","text":"Connect with a lender to get pre-approved for a mortgage. This defines your real budget and makes your offers competitive."},
            {"@type":"HowToStep","name":"Choose a Buyer's Agent","text":"Select a licensed Charlotte real estate agent who knows your target neighborhoods and represents your interests exclusively."},
            {"@type":"HowToStep","name":"Search for Homes","text":"Work with your agent to identify homes that match your criteria across Charlotte neighborhoods and surrounding cities."},
            {"@type":"HowToStep","name":"Make an Offer","text":"Submit a competitive offer with appropriate contingencies, earnest money, and terms tailored to the Charlotte market."},
            {"@type":"HowToStep","name":"Complete Due Diligence","text":"Order inspections, review disclosures, and complete all due diligence within the contract period."},
            {"@type":"HowToStep","name":"Close on Your Home","text":"Work through the closing process including final walkthrough, title review, and signing at the closing table."}
          ]
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"How much do I need to buy a home in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"You need a down payment (3–20% depending on loan type), closing costs (2–5% of purchase price), and cash reserves. VA loans require zero down for eligible veterans. The total out-of-pocket for a $400,000 home typically ranges from $12,000 to $90,000 depending on loan type."}},
            {"@type":"Question","name":"What credit score do I need to buy a home in Charlotte?","acceptedAnswer":{"@type":"Answer","text":"Conventional loans typically require a 620+ credit score. FHA loans allow scores as low as 580 with 3.5% down. VA loans have no minimum score requirement set by the VA, though lenders typically want 580–620+. Higher scores qualify for better rates."}},
            {"@type":"Question","name":"How long does it take to buy a home in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"From starting the search to closing typically takes 2–4 months. Once under contract, closing takes 30–45 days. In competitive neighborhoods like Plaza Midwood and Dilworth, finding the right home can take longer due to limited inventory."}},
            {"@type":"Question","name":"Do buyers pay agent commission in North Carolina?","acceptedAnswer":{"@type":"Answer","text":"In most Charlotte transactions, the seller covers the buyer's agent commission. Recent NAR settlement changes mean buyers sign a buyer agency agreement upfront, but commission is typically still negotiated as part of the transaction."}},
            {"@type":"Question","name":"What is due diligence in North Carolina real estate?","acceptedAnswer":{"@type":"Answer","text":"North Carolina uses a due diligence period — a negotiated window (typically 14–21 days) during which buyers can inspect the property and terminate for any reason, forfeiting only their due diligence fee. This is different from many other states."}}
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
        .toc-link:active{background:${C.cream};}
        input:focus,textarea:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px rgba(44,74,62,0.08);}
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
            {[["Home","/"],["Buy","/buy/"],["Sell","/sell/"],["Neighborhoods","/neighborhoods/"],["Market Reports","/market-reports/"],["About Ryan","/about/"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display:"block", padding:"1rem 1.4rem", fontFamily:sans, fontSize:"0.83rem", letterSpacing:"0.07em", textTransform:"uppercase", color:C.charcoal, borderBottom:`1px solid ${C.rule}` }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", height:"72svh", minHeight:500, maxHeight:720 }}>
        <img src={IMG_HERO} alt="Charlotte NC home buyer's guide — Ryan McGill 5 Points Realty" fetchpriority="high" decoding="async"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(24,24,22,0.35) 0%, rgba(24,24,22,0.15) 35%, rgba(24,24,22,0.82) 75%, rgba(24,24,22,0.97) 100%)" }} />
        <div style={{ position:"absolute", top:72, left:"1.4rem", zIndex:1 }}>
          <a href="/" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Home</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <a href="/buy" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Buy</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <span style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)" }}>Buyer's Guide</span>
        </div>
        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 1.4rem 2.5rem" }}>
          <p style={{ fontFamily:sans, fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:"0.8rem", animation:"fadeUp 0.7s 0.1s ease both" }}>Complete Charlotte Buyer's Guide</p>
          <h1 style={{ fontFamily:serif, fontSize:"clamp(2.6rem,10vw,4.2rem)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:"0.6rem", animation:"fadeUp 0.7s 0.2s ease both" }}>
            How to buy a home<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.7)" }}>in Charlotte, NC.</em>
          </h1>
          <p style={{ fontFamily:serif, fontSize:"clamp(0.95rem,3.5vw,1.3rem)", fontStyle:"italic", fontWeight:300, color:"rgba(255,255,255,0.6)", marginBottom:"1.75rem", animation:"fadeUp 0.7s 0.3s ease both" }}>
            Everything you need to know. Nothing you don't.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <a href="#readiness" className="pill" style={{ flex:1, background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block" }}>Start Reading</a>
            <a href="#contact" className="pill" style={{ flex:1, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block", border:"1px solid rgba(255,255,255,0.4)" }}>Talk to Ryan</a>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <div style={{ background:C.charcoal, padding:"0" }}>
        <div onClick={() => setTocOpen(o => !o)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.1rem 1.4rem", cursor:"pointer" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <span style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:C.accentL }}>Table of Contents</span>
            <span style={{ fontFamily:sans, fontSize:"0.6rem", color:"#444440" }}>· 9 chapters</span>
          </div>
          <span style={{ fontFamily:sans, fontSize:"1rem", color:C.accentL, transition:"transform 0.25s", transform: tocOpen?"rotate(45deg)":"none", display:"inline-block", lineHeight:1 }}>+</span>
        </div>
        <div style={{ maxHeight: tocOpen ? 600 : 0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
          {CHAPTERS.map((ch, i) => (
            <a key={ch.id} href={ch.anchor} className="toc-link" onClick={() => setTocOpen(false)}
              style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.9rem 1.4rem", borderTop:"1px solid #2A2A28", transition:"background 0.2s" }}>
              <span style={{ fontFamily:serif, fontSize:"1rem", fontWeight:300, color:C.accentL, opacity:0.6, flexShrink:0, width:24 }}>{ch.num}</span>
              <span style={{ fontFamily:sans, fontSize:"0.82rem", color:C.light }}>{ch.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── CHAPTER 01 — READINESS ── */}
      <section id="readiness" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 01</Label>
          <ChapterTitle num="01" title="Are You Ready to Buy?" id="readiness-title" />
          <BodyText>Buying a home in Charlotte is one of the largest financial decisions you'll make. Before you start browsing listings, it's worth taking an honest look at whether now is the right time — not just emotionally, but financially and practically.</BodyText>

          <SubHead>Financial readiness</SubHead>
          <BodyText>The upfront costs of buying go well beyond the down payment. A realistic picture includes your down payment, closing costs, moving expenses, immediate repairs or updates, and a cash reserve for the unexpected. Running out of money the week after closing is a real and avoidable outcome.</BodyText>

          <CheckList items={[
            "Credit score reviewed — ideally 700+ for best rates, 620+ minimum for conventional",
            "Debt-to-income ratio (DTI) under 43% — most lenders require this",
            "Down payment saved — 3–20% depending on loan type",
            "Closing costs budgeted — typically 2–5% of the purchase price",
            "3–6 months cash reserves remaining after closing",
            "No major credit events planned (new car, job change) in the next 90 days",
          ]} />

          <SubHead>Lifestyle readiness</SubHead>
          <BodyText>Financial readiness matters — but so does lifestyle stability. Buying a home ties you to a location. If your job situation, relationship status, or life plans are likely to shift in the next 2–3 years, renting may be the smarter short-term play.</BodyText>

          <Tip>The honest question isn't "can I afford to buy?" It's "does buying make more sense than renting given my specific situation right now?" I've told clients to wait. I'll tell you the same if it's the right answer for you.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 02 — FINANCING ── */}
      <section id="financing" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 02</Label>
          <ChapterTitle num="02" title="Financing & Pre-Approval" id="financing-title" />
          <BodyText>Your mortgage defines your budget. Getting pre-approved before you start searching isn't just a formality — in Charlotte's competitive market, sellers won't take your offer seriously without it. Pre-approval also forces a honest conversation about what you can actually afford versus what you want to afford.</BodyText>

          <SubHead>Loan types available in North Carolina</SubHead>
          <CheckList items={[
            "Conventional loan — 3–20% down, 620+ credit score, flexible property types",
            "FHA loan — 3.5% down, 580+ credit score, mortgage insurance required",
            "VA loan — 0% down for eligible veterans and active military, no PMI, competitive rates",
            "USDA loan — 0% down for eligible rural and suburban areas near Charlotte",
            "NC Home Advantage Mortgage — NC Housing Finance Agency down payment assistance",
            "Jumbo loan — for purchases above conventional loan limits (currently $766,550)",
          ]} />

          <SubHead>What pre-approval actually means</SubHead>
          <BodyText>Pre-qualification is a quick estimate based on self-reported numbers. Pre-approval means a lender has reviewed your actual documents — pay stubs, tax returns, bank statements, credit report — and issued a conditional commitment. Sellers in Charlotte expect pre-approval, not pre-qualification.</BodyText>

          <SubHead>What to gather for your lender</SubHead>
          <CheckList items={[
            "Last 2 years W-2s or tax returns (self-employed: last 2 years business returns)",
            "Last 30 days pay stubs",
            "Last 2–3 months bank statements (all accounts)",
            "Government-issued ID",
            "Social Security number for credit pull",
            "Proof of any additional income (rental, alimony, investments)",
            "VA Certificate of Eligibility (if applicable)",
          ]} />

          <Tip>Get pre-approved by a local Charlotte lender, not just an online platform. Local lenders know the market, close on time, and carry weight with listing agents who've worked with them before. I can connect you with lenders I trust.</Tip>

          <SubHead>Understanding your rate</SubHead>
          <BodyText>Your interest rate is determined by your credit score, loan type, down payment amount, loan term, and current market conditions. A 0.5% difference in rate on a $500,000 loan is approximately $1,500 per year — or $45,000 over a 30-year loan. It's worth shopping at least 3 lenders.</BodyText>
        </Reveal>
      </section>

      {/* ── CHAPTER 03 — AGENT ── */}
      <section id="agent" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 03</Label>
          <ChapterTitle num="03" title="Choosing the Right Agent" id="agent-title" />
          <BodyText>Your buyer's agent represents your interests — not the seller's, not the brokerage's. In Charlotte's competitive market, the quality of your representation affects whether you win the home, what you pay for it, and how smoothly the transaction closes. Not all agents are equal.</BodyText>

          <SubHead>What a buyer's agent does</SubHead>
          <CheckList items={[
            "Sources listings including off-market and pre-market opportunities",
            "Provides neighborhood-level pricing analysis for every home you consider",
            "Advises on offer strategy — price, terms, contingencies, escalation clauses",
            "Negotiates on your behalf at every stage of the transaction",
            "Coordinates inspections, due diligence, appraisal, and closing",
            "Advocates for your interests if issues arise during due diligence",
            "Connects you to trusted vendors — inspectors, lenders, attorneys, contractors",
          ]} />

          <SubHead>What to look for</SubHead>
          <BodyText>Local knowledge matters more than production volume. An agent who closes 200 homes a year in South Charlotte may know very little about Plaza Midwood or NoDa. Ask specifically about their experience in your target neighborhoods, their average days from search to close, and how they handle multiple offer situations.</BodyText>

          <SubHead>Buyer agency agreements in North Carolina</SubHead>
          <BodyText>As of August 2024, North Carolina requires buyers to sign a written buyer agency agreement before an agent can show homes. This agreement defines the agent's duties, the compensation structure, and the term of the relationship. Read it carefully — specifically the compensation clause and the termination provisions.</BodyText>

          <Tip>The agent you choose is the single highest-leverage decision in your home purchase. The right agent doesn't just find you houses. They tell you when a house is overpriced, when to walk away, and how to win when it matters. Choose accordingly.</Tip>
        </Reveal>
      </section>

      {/* FULL BLEED */}
      <div style={{ position:"relative", height:"55vw", maxHeight:400, overflow:"hidden" }}>
        <img src={IMG_BW} alt="Ryan McGill Charlotte NC real estate broker" decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,24,22,0.85) 0%, rgba(24,24,22,0.08) 65%)", display:"flex", alignItems:"flex-end", padding:"2rem 1.4rem" }}>
          <div>
            <p style={{ fontFamily:serif, fontSize:"clamp(1.1rem,4vw,1.7rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.45, marginBottom:"0.75rem" }}>
              "The agent you choose is the single highest-leverage decision in your home purchase. Everything else flows from that."
            </p>
            <span style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>— Ryan McGill · Realtor® · 5 Points Realty</span>
          </div>
        </div>
      </div>

      {/* ── CHAPTER 04 — SEARCH ── */}
      <section id="search" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 04</Label>
          <ChapterTitle num="04" title="The Home Search" id="search-title" />
          <BodyText>The Charlotte market moves fast. Well-priced homes in desirable neighborhoods — Plaza Midwood, Dilworth, NoDa, South End — can go under contract within days or hours of listing. Buyers who aren't prepared to move quickly lose homes to buyers who are.</BodyText>

          <SubHead>Needs vs. wants — be honest</SubHead>
          <BodyText>Before you start touring homes, separate what you need from what you want. Needs are non-negotiable — bedroom count, school district, commute distance, accessibility. Wants are preferences you'd sacrifice for the right home at the right price. Most buyers who struggle in their search haven't made this distinction clearly.</BodyText>

          <SubHead>Setting up your search correctly</SubHead>
          <CheckList items={[
            "Define your price ceiling based on pre-approval, not maximum qualification",
            "Identify 2–3 target neighborhoods based on lifestyle, commute, and budget",
            "Set up MLS alerts for new listings in your criteria — not just Zillow",
            "Be available to tour within 24–48 hours of a new listing in your target area",
            "Understand the difference between list price and likely sale price",
            "Track recent sold comps in your target neighborhoods weekly",
          ]} />

          <SubHead>What Zillow won't tell you</SubHead>
          <BodyText>Zillow's Zestimate is an algorithm, not a valuation. It doesn't know that a home backs to a busy road, that the school boundary changed, that the block has been redeveloped, or that the seller is motivated. Real market knowledge requires a local agent with MLS access and neighborhood expertise.</BodyText>

          <Tip>In Charlotte's competitive neighborhoods, the homes worth buying often go under contract before most buyers know they exist. The best opportunities come through agent networks, pocket listings, and relationships — not Zillow. This is why your agent matters.</Tip>

          <SubHead>How many homes should you tour?</SubHead>
          <BodyText>There's no magic number — but touring too many homes leads to decision fatigue, not better decisions. A well-prepared buyer with clear criteria typically needs to tour 5–15 homes before finding the right one. If you've toured 30+ homes without an offer, the problem is usually unclear criteria or an unrealistic budget, not a lack of options.</BodyText>
        </Reveal>
      </section>

      {/* ── CHAPTER 05 — OFFER ── */}
      <section id="offer" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 05</Label>
          <ChapterTitle num="05" title="Making an Offer" id="offer-title" />
          <BodyText>An offer in North Carolina is more than a number. It's a package of price, terms, contingencies, and signals that tells the seller who you are as a buyer and how likely you are to close. In a competitive situation, the terms often matter as much as the price.</BodyText>

          <SubHead>North Carolina's due diligence structure</SubHead>
          <BodyText>North Carolina uses a unique due diligence structure that most buyers from other states don't expect. There are effectively two deposits in a North Carolina purchase contract:</BodyText>
          <CheckList items={[
            "Due Diligence Fee — paid directly to the seller at contract, non-refundable. This is the seller's compensation for taking the home off the market while you conduct inspections. Typical range: $1,000–$10,000+ depending on price point and competition.",
            "Earnest Money Deposit — held in escrow, typically 1–2% of purchase price. Refundable if you terminate during the due diligence period. At risk if you terminate after the due diligence period for non-financing reasons.",
          ]} />

          <SubHead>What makes an offer competitive in Charlotte</SubHead>
          <CheckList items={[
            "Strong pre-approval letter from a credible local lender",
            "Due diligence fee that signals serious intent (higher = stronger signal)",
            "Clean offer — fewer contingencies where you can reasonably absorb risk",
            "Flexible closing date — match what the seller needs",
            "Escalation clause in competitive multi-offer situations",
            "Pre-inspections where permitted — removes inspection contingency entirely",
            "Appraisal gap coverage if waiving appraisal contingency",
          ]} />

          <SubHead>When to go over asking price</SubHead>
          <BodyText>In high-demand Charlotte neighborhoods, paying over asking price is often not overpaying — it's paying market price. The list price is where the conversation starts, not where it ends. Ryan will run a detailed comp analysis on every home before you offer so you know what fair market value actually is.</BodyText>

          <Tip>The due diligence fee is the most misunderstood part of buying in North Carolina. A low due diligence fee signals to the seller that you might walk away. In a competitive situation, a meaningful due diligence fee can win you a home at a lower price than a buyer offering more money with a weak fee. I'll advise you specifically on this for every offer we write.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 06 — DUE DILIGENCE ── */}
      <section id="duediligence" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 06</Label>
          <ChapterTitle num="06" title="Due Diligence & Inspections" id="dd-title" />
          <BodyText>The due diligence period is your window to verify everything about the property before you're fully committed. In North Carolina, this is the period during which you can terminate the contract and receive your earnest money back — forfeiting only your due diligence fee. Use it fully.</BodyText>

          <SubHead>Inspections to order in Charlotte</SubHead>
          <CheckList items={[
            "General home inspection — always, no exceptions",
            "Radon test — Charlotte has elevated radon levels in many areas",
            "Termite / wood-destroying organism (WDO) inspection — required by most lenders",
            "HVAC service inspection — separate from the general inspection",
            "Sewer scope — especially for older homes in Plaza Midwood, Dilworth, Elizabeth",
            "Chimney inspection — if the home has a fireplace",
            "Roof certification — if inspector flags roof condition",
            "Mold or air quality — if moisture issues are visible or suspected",
          ]} />

          <SubHead>How to handle inspection findings</SubHead>
          <BodyText>Inspection reports are not pass/fail documents. Every home has issues — even new construction. The question is whether the issues are material enough to affect your decision, and if not, whether they're worth requesting repairs or a price reduction for.</BodyText>
          <BodyText>In North Carolina you have three options after inspections: proceed as-is, request repairs, or request a price reduction in lieu of repairs. You can also terminate if the findings are severe enough. Ryan will help you triage every finding and decide the right strategy.</BodyText>

          <Tip>Don't skip the radon test. Charlotte and the surrounding Piedmont region have higher-than-average radon levels due to the underlying granite geology. Radon is the second leading cause of lung cancer in the US and is completely invisible and odorless. The test costs $150 and takes two days. There's no excuse to skip it.</Tip>

          <SubHead>The appraisal</SubHead>
          <BodyText>If you're financing, your lender will order an appraisal. The appraiser provides an independent opinion of value. If the home appraises below the contract price, you have options: renegotiate the price, cover the gap in cash, or terminate (if you have an appraisal contingency). In competitive markets, appraisal gap coverage is often written into the offer upfront.</BodyText>
        </Reveal>
      </section>

      {/* ── CHAPTER 07 — CLOSING ── */}
      <section id="closing" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 07</Label>
          <ChapterTitle num="07" title="The Closing Process" id="closing-title" />
          <BodyText>Closing in North Carolina is handled by a real estate attorney — not a title company, as in many other states. The closing attorney represents the lender but facilitates the transaction for all parties. You'll sign a significant stack of documents and walk away with the keys.</BodyText>

          <SubHead>Timeline from contract to close</SubHead>
          <CheckList items={[
            "Days 1–3: Due diligence fee paid, earnest money deposited, inspections scheduled",
            "Days 1–14: Due diligence period — inspections, reviews, negotiation of repairs",
            "Days 14–21: Appraisal ordered by lender (if financing)",
            "Days 21–30: Loan processing, underwriting, title search",
            "Days 28–30: Clear to close issued by lender",
            "Day 30–45: Final walkthrough, closing, keys",
          ]} />

          <SubHead>What to bring to closing</SubHead>
          <CheckList items={[
            "Government-issued photo ID (driver's license or passport)",
            "Cashier's check or wire transfer for closing costs and down payment",
            "Proof of homeowner's insurance policy",
            "Any outstanding documents requested by your lender",
          ]} />

          <SubHead>What you're signing at closing</SubHead>
          <BodyText>The closing document stack includes the deed (transfers ownership), the deed of trust (secures the lender's interest), the promissory note (your loan obligation), the closing disclosure (final accounting of all costs), and various lender and title documents. Your closing attorney will walk you through each one.</BodyText>

          <Tip>Do your final walkthrough on the day of closing, not the day before. You want to verify the property is in the same condition as when you made your offer, all agreed repairs are complete, and nothing unexpected has changed. I always walk through with my buyers on closing day.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 08 — MILITARY ── */}
      <section id="military" style={{ background:C.charcoal, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label light>Chapter 08</Label>
          <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", marginBottom:"1.5rem" }}>
            <span style={{ fontFamily:serif, fontSize:"2.2rem", fontWeight:300, color:C.accentL, opacity:0.5, lineHeight:1, flexShrink:0, marginTop:4 }}>08</span>
            <h2 style={{ fontFamily:serif, fontSize:"clamp(1.6rem,6vw,2.4rem)", fontWeight:300, lineHeight:1.2, color:"#fff" }}>Military & VA Buyers</h2>
          </div>

          <p style={{ fontSize:"0.93rem", color:C.light, lineHeight:1.95, marginBottom:"1.1rem" }}>
            As a Marine veteran and Certified Military Relocation Professional, Ryan understands what military buyers face in ways most agents simply don't. PCS orders don't care about market conditions. Deployment timelines don't flex for inspection scheduling. VA loan requirements add complexity that catches inexperienced agents off guard.
          </p>

          {[
            { title:"VA Loan Basics", body:"VA loans are available to eligible veterans, active-duty service members, and surviving spouses. Key benefits: no down payment required, no private mortgage insurance (PMI), competitive interest rates, and no prepayment penalty. The VA funding fee (1.25–3.3% of loan amount) applies in most cases but can be financed into the loan." },
            { title:"VA Certificate of Eligibility", body:"Your VA Certificate of Eligibility (COE) documents your entitlement to VA loan benefits. Obtain it through the VA's eBenefits portal, your lender, or Ryan can help you navigate the process. Full entitlement means no loan limit — you can borrow as much as a lender will approve with zero down." },
            { title:"VA Appraisal Requirements", body:"VA appraisals include minimum property requirements (MPRs) that go beyond a standard appraisal. The property must be safe, structurally sound, and sanitary. Some older Charlotte homes — particularly in historic neighborhoods — may require repairs before a VA loan can close. Ryan will flag potential VA appraisal issues before you make an offer." },
            { title:"PCS Move Strategy", body:"PCS moves mean compressed timelines, cross-state decisions, and often one opportunity to get it right. Ryan offers virtual tours, neighborhood video walkthroughs, and a structured remote buying process that has helped military families buy Charlotte homes from Germany, Japan, and bases across the US." },
          ].map((item, i) => (
            <Reveal key={i} delay={i*0.08}>
              <div style={{ padding:"1.25rem 0", borderBottom:"1px solid #2A2A28" }}>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color:"#fff", marginBottom:"0.4rem" }}>{item.title}</strong>
                <p style={{ fontSize:"0.85rem", color:C.light, lineHeight:1.85 }}>{item.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3} style={{ marginTop:"2rem" }}>
            <a href="#contact" className="pill" style={{ display:"block", background:C.accentL, color:"#fff", fontFamily:sans, fontSize:"0.73rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, textAlign:"center" }}>
              Talk Military Relocation
            </a>
          </Reveal>
        </Reveal>
      </section>

      {/* ── CHAPTER 09 — NEIGHBORHOODS ── */}
      <section id="neighborhoods" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 09</Label>
          <ChapterTitle num="09" title="Choosing a Charlotte Neighborhood" id="nbr-title" />
          <BodyText>Charlotte is not one market — it's 20+ distinct neighborhoods, each with its own pricing, character, school district, transit access, and buyer profile. Choosing the right neighborhood is as important as choosing the right home. The wrong neighborhood at the right price is still the wrong decision.</BodyText>

          <SubHead>Match your lifestyle to the neighborhood</SubHead>
          <CheckList items={[
            "Walkability matters to you → Plaza Midwood, NoDa, South End, Elizabeth, Dilworth",
            "Top public schools → Myers Park, Cotswold, Ballantyne, Davidson, Mooresville",
            "Maximum value for budget → Villa Heights, Chantilly, Concord, Kannapolis, Rock Hill",
            "Lake access → Cornelius, Mooresville, Davidson, Huntersville",
            "Urban high-rise lifestyle → Uptown Charlotte",
            "Luxury estate → Myers Park, Eastover",
            "Family suburban with amenities → Ballantyne, Matthews, Huntersville",
            "Military relocation → All of the above — Ryan matches your situation to the right area",
          ]} />

          <SubHead>School districts in the Charlotte area</SubHead>
          <BodyText>Charlotte-Mecklenburg Schools (CMS) serves the city of Charlotte. Surrounding communities have their own independent districts — Cabarrus County, Union County, Mooresville Graded, York County (SC) — several of which consistently outperform CMS on state rankings. If schools are a priority, the district boundary for a specific address matters more than the general neighborhood name.</BodyText>

          <Tip>I've been in every neighborhood on this list. I can tell you things about specific streets, specific blocks, and specific school feeder patterns that no website will. Use this guide to get oriented — then call me before you make any decisions.</Tip>

          <div style={{ marginTop:"1.75rem" }}>
            <a href="/neighborhoods" style={{ display:"block", background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.73rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, textAlign:"center" }}>
              Explore All 23 Neighborhood Guides
            </a>
          </div>
        </Reveal>
      </section>

      {/* GROUP PHOTO */}
      <div style={{ position:"relative", height:"50vw", maxHeight:360, overflow:"hidden" }}>
        <img src={IMG_GROUP} alt="Ryan McGill U.S. Army veteran Charlotte NC realtor" decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 30%, rgba(24,24,22,0.75) 100%)" }} />
      </div>

      {/* FAQ */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }} itemScope itemType="https://schema.org/FAQPage">
        <Reveal>
          <Label>Common Questions</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"2rem" }}>
            Charlotte buyer<br /><em style={{ fontStyle:"italic", color:C.accent }}>FAQ.</em>
          </h2>
        </Reveal>
        {[
          { q:"How much do I need to buy a home in Charlotte NC?", a:"You need a down payment (3–20% depending on loan type), closing costs (2–5% of purchase price), and cash reserves. VA loans require zero down for eligible veterans. The total out-of-pocket for a $400,000 home typically ranges from $12,000 to $90,000 depending on loan type." },
          { q:"What credit score do I need to buy a home in Charlotte?", a:"Conventional loans typically require 620+. FHA loans allow 580+ with 3.5% down. VA loans have no VA-set minimum, though lenders typically want 580–620+. Higher scores qualify for better rates — improving your score before applying can save tens of thousands over the life of a loan." },
          { q:"How long does it take to buy a home in Charlotte NC?", a:"From starting the search to closing typically takes 2–4 months. Once under contract, closing takes 30–45 days. In competitive neighborhoods, finding the right home can take longer due to limited inventory." },
          { q:"Do buyers pay agent commission in North Carolina?", a:"In most Charlotte transactions, the seller covers the buyer's agent commission. As of August 2024, buyers sign a buyer agency agreement upfront that defines compensation — but commission is typically still negotiated as part of the overall transaction." },
          { q:"What is due diligence in North Carolina real estate?", a:"North Carolina uses a due diligence period — a negotiated window (typically 14–21 days) where buyers can inspect the property and terminate for any reason, forfeiting only their non-refundable due diligence fee. This is different from most other states and critical to understand before making an offer." },
          { q:"Can I buy a home in Charlotte while living out of state?", a:"Yes — Ryan regularly works with out-of-state buyers including military families on PCS orders. He conducts thorough virtual tours, provides detailed neighborhood video walkthroughs, and manages the full transaction remotely. Many buyers have purchased Charlotte homes without ever visiting in person before closing." },
        ].map((faq, i) => {
          const [open, setOpen] = useState(false);
          return (
            <Reveal key={i} delay={i*0.05}>
              <div onClick={() => setOpen(o => !o)} style={{ borderBottom:`1px solid ${C.rule}`, cursor:"pointer" }}
                itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.3rem 0", gap:"1rem" }}>
                  <span style={{ fontFamily:serif, fontSize:"1rem", fontWeight:400, color:C.charcoal, lineHeight:1.35 }} itemProp="name">{faq.q}</span>
                  <span style={{ fontFamily:sans, fontSize:"1.3rem", color:C.accent, flexShrink:0, transition:"transform 0.25s", transform:open?"rotate(45deg)":"none", display:"inline-block", lineHeight:1 }}>+</span>
                </div>
                <div style={{ fontSize:"0.85rem", color:C.mid, lineHeight:1.8, maxHeight:open?300:0, overflow:"hidden", transition:"max-height 0.35s ease, padding-bottom 0.35s", paddingBottom:open?"1.3rem":0 }}
                  itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <span itemProp="text">{faq.a}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* CTA */}
      <section style={{ background:C.accent, padding:"3rem 1.4rem", textAlign:"center" }}>
        <Reveal>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"0.5rem" }}>Ready to start your</h2>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.68)", lineHeight:1.2, marginBottom:"2rem" }}>Charlotte home search?</h2>
          <a href="#contact" className="pill" style={{ display:"block", background:"#fff", color:C.accent, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, marginBottom:"0.75rem" }}>Talk to Ryan</a>
          <a href="tel:+17045764118" className="pill" style={{ display:"block", background:"transparent", color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, border:"1px solid rgba(255,255,255,0.32)" }}>(704) 576-4118</a>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Get Started</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Questions about<br /><em style={{ fontStyle:"italic", color:C.accent }}>buying in Charlotte?</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>No obligation. Ryan will answer your questions and help you figure out the right next step — whether that's starting your search now or waiting six months.</p>
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
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>What's your situation?</label>
            <textarea placeholder="Tell Ryan where you are in the process — just starting, actively searching, or have a specific question..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", resize:"vertical", minHeight:110 }} />
          </div>
          <button onClick={handleSubmit} disabled={formStatus==="sending"} style={{ width:"100%", padding:"1rem", background: formStatus==="sending" ? C.accentL : C.accent, color:"#fff", border:"none", borderRadius:3, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", cursor: formStatus==="sending" ? "wait" : "pointer", transition:"background 0.2s" }}>
            Send Message
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
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Guides</h4>
            <a href="/buyers-guide" style={{ display:"block", fontSize:"0.78rem", color:C.accentL, marginBottom:"0.5rem" }}>Buyer's Guide</a>
            <a href="/sellers-guide" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Seller's Guide</a>
            <a href="/neighborhoods" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Neighborhood Guides</a>
            <a href="/market-reports" style={{ display:"block", fontSize:"0.78rem", color:C.mid }}>Market Reports</a>
          </div>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Contact</h4>
            <a href="tel:+17045764118" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>(704) 576-4118</a>
            <a href="/buy" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Buy a Home</a>
            <a href="/sell" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Sell Your Home</a>
            <a href="/about" style={{ display:"block", fontSize:"0.78rem", color:C.mid }}>About Ryan</a>
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
