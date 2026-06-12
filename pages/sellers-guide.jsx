import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_HERO = "/images/top-hero-buyers-sellers.webp";
const IMG_BW = "/images/lower-hero.webp";
const IMG_SUIT = "/images/top-hero-main.webp";
const IMG_GROUP = "/images/lower-hero-buyers-sellers.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

const CHAPTERS = [
  { id:"readiness",    num:"01", title:"Are You Ready to Sell?",             anchor:"#readiness" },
  { id:"valuation",    num:"02", title:"What Is Your Home Worth?",           anchor:"#valuation" },
  { id:"preparation",  num:"03", title:"Preparing Your Home to Sell",        anchor:"#preparation" },
  { id:"marketing",    num:"04", title:"Marketing & Listing Strategy",       anchor:"#marketing" },
  { id:"offers",       num:"05", title:"Reviewing & Negotiating Offers",     anchor:"#offers" },
  { id:"duediligence", num:"06", title:"Under Contract & Due Diligence",     anchor:"#duediligence" },
  { id:"closing",      num:"07", title:"The Closing Process",                anchor:"#closing" },
  { id:"costs",        num:"08", title:"Costs of Selling in North Carolina", anchor:"#costs" },
  { id:"situations",   num:"09", title:"Special Selling Situations",         anchor:"#situations" },
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

const ChapterTitle = ({ num, title }) => (
  <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", marginBottom:"1.5rem", paddingTop:"0.5rem" }}>
    <span style={{ fontFamily:serif, fontSize:"2.2rem", fontWeight:300, color:C.accent, opacity:0.35, lineHeight:1, flexShrink:0, marginTop:4 }}>{num}</span>
    <h2 style={{ fontFamily:serif, fontSize:"clamp(1.6rem,6vw,2.4rem)", fontWeight:300, lineHeight:1.2, color:C.charcoal }}>{title}</h2>
  </div>
);

const Tip = ({ children }) => (
  <div style={{ background:"rgba(44,74,62,0.07)", border:"1px solid rgba(44,74,62,0.2)", borderLeft:`3px solid ${C.accent}`, borderRadius:"0 4px 4px 0", padding:"1rem 1.1rem", margin:"1.5rem 0" }}>
    <p style={{ fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.accent, marginBottom:"0.3rem" }}>Ryan's Take</p>
    <p style={{ fontSize:"0.85rem", color:C.charcoal, lineHeight:1.8 }}>{children}</p>
  </div>
);

const CheckList = ({ items }) => (
  <div style={{ margin:"1.25rem 0" }}>
    {items.map((item, i) => (
      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.75rem", padding:"0.6rem 0", borderBottom:`1px solid ${C.rule}` }}>
        <span style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:700, color:C.accent, flexShrink:0, marginTop:4 }}>✓</span>
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

export default function SellersGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tocOpen,  setTocOpen]  = useState(false);
  
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

  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", address:"", message:"" });

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
        <title>Charlotte NC Home Sellers Guide | Ryan McGill | 5 Points Realty</title>
        <meta name="description" content="A step-by-step guide to selling your home in Charlotte NC. Pricing, staging, marketing, and negotiation — from licensed broker Ryan McGill at 5 Points Realty." />
        <meta property="og:title" content="Charlotte NC Home Sellers Guide | Ryan McGill | 5 Points Realty" />
        <meta property="og:description" content="A step-by-step guide to selling your home in Charlotte NC. Pricing, staging, marketing, and negotiation — from licensed broker Ryan McGill at 5 Points Realty." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily:sans, background:C.warm, color:C.charcoal, overflowX:"hidden" }}>

      <div dangerouslySetInnerHTML={{ __html: `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Sell Your Home in Charlotte NC",
          "description": "A comprehensive step-by-step guide to selling a home in Charlotte NC, written by Ryan McGill, licensed real estate broker at 5 Points Realty.",
          "author": {"@type":"RealEstateAgent","name":"Ryan McGill","url":"https://ryanmcgillrealtor.com"},
          "step": [
            {"@type":"HowToStep","name":"Assess Your Readiness","text":"Evaluate your financial situation, equity position, and life goals before deciding to list."},
            {"@type":"HowToStep","name":"Get a Home Valuation","text":"Obtain a Comparative Market Analysis from a local broker to determine accurate market value."},
            {"@type":"HowToStep","name":"Prepare Your Home","text":"Complete strategic repairs, declutter, deep clean, and stage your home to maximize buyer appeal."},
            {"@type":"HowToStep","name":"List and Market","text":"Launch your listing on MLS with professional photography and a targeted marketing strategy."},
            {"@type":"HowToStep","name":"Review and Negotiate Offers","text":"Evaluate incoming offers on price, terms, and buyer strength, then negotiate to maximize net proceeds."},
            {"@type":"HowToStep","name":"Navigate Due Diligence","text":"Manage the inspection period, respond to repair requests, and keep the transaction on track."},
            {"@type":"HowToStep","name":"Close the Sale","text":"Complete the closing process, sign the deed, and receive your proceeds."}
          ]
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"How much does it cost to sell a home in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"Sellers in Charlotte typically pay 5–6% in total agent commission plus 1–3% in closing costs including attorney fees, property taxes, HOA dues, and any agreed repair credits. On a $500,000 home, total selling costs typically run $30,000–$45,000 before your net proceeds."}},
            {"@type":"Question","name":"How long does it take to sell a home in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"In high-demand neighborhoods like Plaza Midwood and Dilworth, well-priced homes often go under contract within 7–14 days. The full close takes another 30–45 days from accepted offer. Total time from listing to funded close is typically 45–75 days."}},
            {"@type":"Question","name":"Should I make repairs before selling my Charlotte home?","acceptedAnswer":{"@type":"Answer","text":"It depends on the repair. Some updates deliver strong ROI — fresh paint, landscaping, minor kitchen updates. Others don't justify the cost. Ryan provides specific guidance on what to fix, what to skip, and what to price around rather than repair."}},
            {"@type":"Question","name":"What is the due diligence fee in North Carolina?","acceptedAnswer":{"@type":"Answer","text":"The due diligence fee is a negotiated amount paid directly to the seller at contract, non-refundable regardless of outcome. It compensates the seller for taking the home off the market during the buyer's inspection period. In Charlotte's competitive market, due diligence fees typically range from $1,000 to $10,000+ depending on price point and competition."}},
            {"@type":"Question","name":"Do I need to disclose problems with my home in North Carolina?","acceptedAnswer":{"@type":"Answer","text":"Yes. North Carolina requires sellers to complete a Residential Property Disclosure Statement covering known material defects including structural issues, water intrusion, HVAC condition, and more. Failure to disclose known defects creates significant legal liability."}},
            {"@type":"Question","name":"Can I sell my Charlotte home while buying another?","acceptedAnswer":{"@type":"Answer","text":"Yes — but it requires careful coordination. Options include simultaneous closing, a sale-leaseback arrangement, or a bridge loan. Ryan manages both sides of buy-sell transactions regularly and will build a strategy that minimizes the gap between transactions and protects you from owning two homes or none at the same time."}}
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
        .toc-link:active{background:#222220;}
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
        <img src={IMG_HERO} alt="Charlotte NC home seller's guide — Ryan McGill 5 Points Realty" fetchpriority="high" decoding="async"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(24,24,22,0.4) 0%, rgba(24,24,22,0.15) 35%, rgba(24,24,22,0.82) 75%, rgba(24,24,22,0.97) 100%)" }} />
        <div style={{ position:"absolute", top:72, left:"1.4rem", zIndex:1 }}>
          <a href="/" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Home</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <a href="/sell" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Sell</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <span style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)" }}>Seller's Guide</span>
        </div>
        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 1.4rem 2.5rem" }}>
          <p style={{ fontFamily:sans, fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:"0.8rem", animation:"fadeUp 0.7s 0.1s ease both" }}>Complete Charlotte Seller's Guide</p>
          <h1 style={{ fontFamily:serif, fontSize:"clamp(2.6rem,10vw,4.2rem)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:"0.6rem", animation:"fadeUp 0.7s 0.2s ease both" }}>
            How to sell your home<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.7)" }}>in Charlotte, NC.</em>
          </h1>
          <p style={{ fontFamily:serif, fontSize:"clamp(0.95rem,3.5vw,1.3rem)", fontStyle:"italic", fontWeight:300, color:"rgba(255,255,255,0.6)", marginBottom:"1.75rem", animation:"fadeUp 0.7s 0.3s ease both" }}>
            Maximum proceeds. Minimum surprises.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <a href="#readiness" className="pill" style={{ flex:1, background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block" }}>Start Reading</a>
            <a href="#contact" className="pill" style={{ flex:1, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block", border:"1px solid rgba(255,255,255,0.4)" }}>Get Home Value</a>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <div style={{ background:C.charcoal }}>
        <div onClick={() => setTocOpen(o => !o)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.1rem 1.4rem", cursor:"pointer" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <span style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:C.accentL }}>Table of Contents</span>
            <span style={{ fontFamily:sans, fontSize:"0.6rem", color:"#444440" }}>· 9 chapters</span>
          </div>
          <span style={{ fontFamily:sans, fontSize:"1rem", color:C.accentL, transition:"transform 0.25s", transform: tocOpen?"rotate(45deg)":"none", display:"inline-block", lineHeight:1 }}>+</span>
        </div>
        <div style={{ maxHeight: tocOpen ? 600 : 0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
          {CHAPTERS.map(ch => (
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
          <ChapterTitle num="01" title="Are You Ready to Sell?" />
          <BodyText>Selling a home is a significant financial and emotional event. Before you list, it's worth taking an honest look at whether the timing is right — not just for the market, but for your specific situation.</BodyText>

          <SubHead>Financial readiness</SubHead>
          <BodyText>The most important number to understand before you sell is your net proceeds — what you'll actually walk away with after paying off your mortgage, covering selling costs, and settling any other obligations tied to the property. Sellers are sometimes surprised to find their equity position is smaller than expected once all costs are accounted for.</BodyText>

          <CheckList items={[
            "Know your current mortgage payoff amount — call your servicer for an exact figure",
            "Estimate your equity: current market value minus mortgage payoff",
            "Budget for selling costs: typically 7–9% of sale price total",
            "Understand any prepayment penalties on your mortgage",
            "Account for capital gains tax if you've lived in the home less than 2 of the last 5 years",
            "Factor in your next move — do you have a plan for where you're going?",
            "Consider timing relative to your buying situation if purchasing simultaneously",
          ]} />

          <SubHead>Emotional readiness</SubHead>
          <BodyText>This matters more than most sellers expect. A home is not just a financial asset — it's where your life has been lived. Sellers who aren't emotionally ready tend to overprice, refuse reasonable offers, and create friction in negotiations that costs them money. Getting clear on your motivations and timeline before you list makes every subsequent step easier.</BodyText>

          <Tip>The first conversation I have with every seller isn't about price — it's about why. Why are you selling, where are you going, and what does success actually look like for you? Those answers shape every decision we make together.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 02 — VALUATION ── */}
      <section id="valuation" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 02</Label>
          <ChapterTitle num="02" title="What Is Your Home Worth?" />
          <BodyText>Pricing is the single most consequential decision in your entire sale. Price too high and you sit on the market, accumulate days on market stigma, and eventually sell for less than you would have priced correctly from the start. Price too low and you leave money on the table. Neither is acceptable.</BodyText>

          <SubHead>The Comparative Market Analysis (CMA)</SubHead>
          <BodyText>A CMA is a data-driven analysis of recent comparable sales in your neighborhood, adjusted for your home's specific features, condition, and location. It's what a licensed broker uses to arrive at a recommended list price. It's not an appraisal — but it's what the market actually reflects, which is what matters when you're selling.</BodyText>

          <SubHead>What goes into a CMA</SubHead>
          <CheckList items={[
            "Recent sold comps — homes similar to yours that have closed in the last 90 days",
            "Active competition — what buyers are currently choosing between",
            "Expired and withdrawn listings — what the market rejected and why",
            "Price per square foot analysis — adjusted for condition, features, and location",
            "Days on market trends — how quickly homes at various price points are moving",
            "Seasonal demand factors — Charlotte's market has real seasonal patterns",
            "Neighborhood-specific dynamics — what's unique about demand in your area",
          ]} />

          <SubHead>Why Zillow's Zestimate is not your price</SubHead>
          <BodyText>Zillow's algorithm doesn't know that your kitchen was renovated last year, that your lot backs to a greenway, that the school boundary recently changed, or that three comparable homes just came on the market two streets over. The Zestimate is a starting point for curiosity — not a pricing strategy. Sellers who list based on Zillow rather than a real CMA consistently underperform the market or sit unsold.</BodyText>

          <Tip>I've seen sellers lose $40,000 by pricing based on what they thought their home was worth rather than what the market said it was worth. I've also seen sellers leave $30,000 on the table by pricing too conservatively because they were afraid of sitting. The right price is a data question, not a gut feeling. Let me run the numbers.</Tip>

          <SubHead>The cost of overpricing</SubHead>
          <BodyText>In Charlotte's market, the first two weeks on the market are when your listing has maximum visibility and maximum buyer urgency. Overpriced homes miss their window. Buyers who were interested initially move on. Days on market accumulate. Price reductions signal weakness. The home that could have sold for $550,000 in week one eventually sells for $520,000 in week eight — and the seller is worse off than if they'd priced it correctly from day one.</BodyText>
        </Reveal>
      </section>

      {/* ── CHAPTER 03 — PREPARATION ── */}
      <section id="preparation" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 03</Label>
          <ChapterTitle num="03" title="Preparing Your Home to Sell" />
          <BodyText>Preparation is where most sellers either make or lose money before a single buyer walks through the door. The goal is not to renovate — it's to present the home in a condition that commands the price you're asking and removes every objection a buyer might have for discounting their offer.</BodyText>

          <SubHead>High-ROI preparation moves</SubHead>
          <CheckList items={[
            "Fresh interior paint in neutral tones — highest ROI of any single improvement",
            "Deep clean throughout including windows, grout, appliances, and baseboards",
            "Landscaping and curb appeal — first impressions are formed before buyers enter",
            "Declutter every room — less furniture makes spaces read larger",
            "Depersonalize — remove family photos, personal collections, and anything polarizing",
            "Address all deferred maintenance — leaky faucets, sticking doors, cracked caulk",
            "Replace dated light fixtures — a $200 fixture swap reads as a $2,000 upgrade",
            "Professional staging consultation — even occupied staging guidance makes a difference",
          ]} />

          <SubHead>What not to over-invest in</SubHead>
          <BodyText>Full kitchen and bathroom renovations rarely return their cost in a sale scenario. Buyers discount heavily for their own taste preferences — a $30,000 kitchen renovation may add $15,000 in perceived value if the buyer doesn't share your design aesthetic. The exception is homes that are genuinely outdated and priced below market — in those cases, strategic updates can unlock a significantly higher price point.</BodyText>

          <SubHead>Disclosure requirements in North Carolina</SubHead>
          <BodyText>North Carolina requires sellers to complete a Residential Property Disclosure Statement covering all known material defects — structural issues, water intrusion, HVAC condition, roof condition, pest history, and more. Attempting to conceal known defects creates significant legal liability that can follow you long after closing. Disclose everything and price accordingly — it's always the right strategy.</BodyText>

          <Tip>I walk every home before we list it and give sellers a specific, prioritized prep list — what to do, what to skip, and what to budget. I'm not trying to create work for contractors. I'm trying to get you the most money with the least unnecessary spend. Those are different goals than what most agents have.</Tip>
        </Reveal>
      </section>

      {/* FULL BLEED */}
      <div style={{ position:"relative", height:"55vw", maxHeight:400, overflow:"hidden" }}>
        <img src={IMG_SUIT} alt="Ryan McGill Charlotte NC listing agent" decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,24,22,0.85) 0%, rgba(24,24,22,0.08) 65%)", display:"flex", alignItems:"flex-end", padding:"2rem 1.4rem" }}>
          <div>
            <p style={{ fontFamily:serif, fontSize:"clamp(1.1rem,4vw,1.7rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.45, marginBottom:"0.75rem" }}>
              "Most sellers either make or lose money before a single buyer walks through the door. Preparation is where the sale is won."
            </p>
            <span style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>— Ryan McGill · Realtor® · 5 Points Realty</span>
          </div>
        </div>
      </div>

      {/* ── CHAPTER 04 — MARKETING ── */}
      <section id="marketing" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 04</Label>
          <ChapterTitle num="04" title="Marketing & Listing Strategy" />
          <BodyText>Your home's marketing determines how many qualified buyers see it, how they perceive it, and how urgently they respond. In Charlotte's digital-first market, presentation quality — photography, listing copy, digital reach — directly affects both the speed of sale and the final price.</BodyText>

          <SubHead>Professional photography is non-negotiable</SubHead>
          <BodyText>Over 95% of buyers start their home search online. The photos are the listing. Homes with professional photography sell faster and for more money than homes with phone photos — consistently, across all price points. This is not a luxury for expensive homes. It's a basic requirement of a competent listing.</BodyText>

          <SubHead>What Ryan's marketing includes</SubHead>
          <CheckList items={[
            "Professional photography — wide angle, natural light, properly staged",
            "MLS listing — Canopy MLS with full data, mapped correctly to all syndication partners",
            "Zillow, Realtor.com, Trulia syndication — immediate maximum exposure",
            "5 Points Realty buyer network — agents and buyers actively working in your area",
            "Social media distribution — targeted to Charlotte-area buyers",
            "Email distribution to active buyer pool",
            "Yard signage and lockbox — captures drive-by interest",
            "Showing management — coordinated, tracked, with feedback collected after each showing",
          ]} />

          <SubHead>Timing your launch</SubHead>
          <BodyText>In Charlotte, Thursday and Friday listing launches capture the weekend browsing surge — the highest buyer activity window of the week. Homes that go live Monday or Tuesday miss the peak. Ryan times every listing launch to maximize first-weekend showing volume, which is directly correlated with offer quality and speed.</BodyText>

          <Tip>The first two weeks on market are everything. A well-priced, well-presented home that launches cleanly on a Thursday with strong photos will often generate its best offers within the first 10 days. That window doesn't come back. We do it right the first time.</Tip>

          <SubHead>Open houses — worth it or not?</SubHead>
          <BodyText>Open houses in Charlotte generate buyer traffic and neighborhood awareness, but statistically, very few homes sell to someone who walked in off an open house. Their real value is creating a sense of competition and urgency — multiple buyers in a space on the same day creates social proof that the home is desirable. Ryan will advise specifically on whether an open house makes sense for your property and neighborhood.</BodyText>
        </Reveal>
      </section>

      {/* ── CHAPTER 05 — OFFERS ── */}
      <section id="offers" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 05</Label>
          <ChapterTitle num="05" title="Reviewing & Negotiating Offers" />
          <BodyText>An offer is not just a number. It's a package of price, due diligence fee, earnest money, contingencies, closing timeline, and buyer strength signals. Evaluating an offer correctly requires weighing all of these components — not just the top-line price.</BodyText>

          <SubHead>The North Carolina offer structure</SubHead>
          <BodyText>North Carolina purchase contracts include two seller-favorable features that differ from most other states:</BodyText>
          <CheckList items={[
            "Due Diligence Fee — paid directly to you at contract, non-refundable. A strong due diligence fee signals a serious buyer who is unlikely to walk away. This money is yours to keep regardless of outcome.",
            "Earnest Money — held in escrow, returned to the buyer if they terminate during due diligence, at risk if they terminate after due diligence for non-financing reasons.",
          ]} />

          <SubHead>How to evaluate multiple offers</SubHead>
          <CheckList items={[
            "Net proceeds after all costs — not just the headline price",
            "Due diligence fee amount — a proxy for buyer seriousness",
            "Financing type — cash and conventional are stronger than FHA/VA in most cases",
            "Pre-approval quality — local lender vs. online lender matters",
            "Contingencies — appraisal, financing, inspection, sale of other property",
            "Closing timeline — does it work with your plans?",
            "Escalation clause terms — ceiling and increment if present",
          ]} />

          <SubHead>When to counter vs. accept</SubHead>
          <BodyText>Not every offer warrants a counter. In a multi-offer situation with strong competing bids, calling for highest and best may generate more than countering the strongest offer individually. In a single-offer situation, the negotiating dynamics are different. Ryan will advise you specifically on the right strategy for each offer scenario as it unfolds.</BodyText>

          <Tip>The highest offer is not always the best offer. I've seen sellers take a lower price from a cash buyer with a strong due diligence fee and walk away with more money than if they'd taken a higher financed offer that fell apart at appraisal. I'll build you a net proceeds comparison for every offer so you're deciding on facts, not feelings.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 06 — DUE DILIGENCE ── */}
      <section id="duediligence" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 06</Label>
          <ChapterTitle num="06" title="Under Contract & Due Diligence" />
          <BodyText>Once you're under contract, the due diligence period begins — the window during which the buyer conducts inspections, reviews disclosures, and decides whether to proceed. For sellers, this period requires patience, responsiveness, and strategic judgment on how to handle inspection findings.</BodyText>

          <SubHead>What to expect during inspections</SubHead>
          <BodyText>Buyers will typically order a general home inspection, radon test, pest inspection, and potentially HVAC, sewer scope, and roof certifications. Every home has inspection findings. Even new construction generates a list. The question is not whether findings will come back — it's how material they are and how you respond.</BodyText>

          <SubHead>Responding to repair requests</SubHead>
          <CheckList items={[
            "You are not required to make repairs — you can counter, credit, or decline",
            "A repair credit at closing is often cleaner than completing repairs yourself",
            "Safety issues and lender-required repairs may need to be addressed regardless",
            "Cosmetic findings are generally not worth crediting — buyers are buying the home as-is on those",
            "Major structural or mechanical issues require a real response — ignoring them risks the deal",
            "Always get contractor estimates before agreeing to a repair credit amount",
          ]} />

          <SubHead>The appraisal</SubHead>
          <BodyText>If the buyer is financing, the lender will order an appraisal. If the home appraises below the contract price, you have options: negotiate a price reduction, split the difference with the buyer, or hold firm and risk the deal if the buyer doesn't have appraisal gap coverage. Ryan will advise you on the right response based on your market position and the buyer's contractual commitments.</BodyText>

          <Tip>Most deals that fall apart do so during due diligence — and most of those failures are preventable. The key is knowing when to flex and when to hold. I've been through hundreds of inspection negotiations. I know the difference between a buyer using inspection findings as a negotiating tool and a buyer who has found something genuinely material. That distinction is worth knowing.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 07 — CLOSING ── */}
      <section id="closing" style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 07</Label>
          <ChapterTitle num="07" title="The Closing Process" />
          <BodyText>Closing in North Carolina is handled by a real estate attorney. As the seller, your closing involvement is lighter than the buyer's — you sign the deed and related documents, the mortgage payoff is processed, and you receive your net proceeds. The heavy lifting happens behind the scenes.</BodyText>

          <SubHead>Seller's closing timeline</SubHead>
          <CheckList items={[
            "Week 1–2 post-contract: Buyer completes inspections, submits repair requests",
            "Week 2–3: Negotiate and finalize any repair agreements",
            "Week 3–4: Lender orders appraisal (if buyer is financing)",
            "Week 4–5: Title search, lien clearance, loan underwriting",
            "Week 5–6: Clear to close issued, final walkthrough scheduled",
            "Closing day: Sign deed and documents, receive net proceeds wire",
          ]} />

          <SubHead>What sellers sign at closing</SubHead>
          <BodyText>The seller's document stack is shorter than the buyer's. You'll sign the deed (transferring ownership), any lender payoff documents, the settlement statement showing your net proceeds, and various title and transfer documents. Your closing attorney will walk you through each one.</BodyText>

          <SubHead>How you receive your proceeds</SubHead>
          <BodyText>Net proceeds are typically wired to your bank account on the day of closing or the following business day. Bring your bank routing and account numbers to closing. Wire fraud targeting real estate transactions is a real and growing threat — always verify wire instructions by calling your closing attorney directly before transmitting any financial information, and never trust wire instructions sent by email alone.</BodyText>

          <Tip>Do not change your financial situation in the weeks before closing — no large deposits, no new accounts, no unusual transfers. The buyer's lender is watching the transaction until the moment it funds, and anything unusual can trigger a delay. Keep everything stable and boring until you have your proceeds in hand.</Tip>
        </Reveal>
      </section>

      {/* ── CHAPTER 08 — COSTS ── */}
      <section id="costs" style={{ background:C.charcoal, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label light>Chapter 08</Label>
          <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", marginBottom:"1.5rem" }}>
            <span style={{ fontFamily:serif, fontSize:"2.2rem", fontWeight:300, color:C.accentL, opacity:0.5, lineHeight:1, flexShrink:0, marginTop:4 }}>08</span>
            <h2 style={{ fontFamily:serif, fontSize:"clamp(1.6rem,6vw,2.4rem)", fontWeight:300, lineHeight:1.2, color:"#fff" }}>Costs of Selling in North Carolina</h2>
          </div>
          <p style={{ fontSize:"0.93rem", color:C.light, lineHeight:1.95, marginBottom:"1.75rem" }}>
            Understanding your full cost picture before you list eliminates surprises at closing. Here's what sellers in Charlotte typically pay.
          </p>

          {[
            { title:"Agent Commission", body:"Typically 5–6% of the sale price, split between listing agent and buyer's agent. On a $500,000 home, this runs $25,000–$30,000. As of August 2024, commission structures are more negotiable than they've historically been — Ryan will walk you through current market norms." },
            { title:"Closing Attorney Fees", body:"North Carolina closings require a real estate attorney. Seller's share of attorney fees typically runs $500–$800 depending on the transaction complexity." },
            { title:"Prorated Property Taxes", body:"You'll owe property taxes from January 1 through your closing date. This is calculated at closing and deducted from your proceeds." },
            { title:"HOA Dues & Transfer Fees", body:"If your property has an HOA, you'll typically owe prorated dues plus a transfer fee that varies by association. Some HOAs also charge a document preparation fee — request the payoff statement early." },
            { title:"Repair Credits", body:"Any credits agreed to during due diligence are deducted from your proceeds at closing. Budget conservatively — inspection findings are inevitable." },
            { title:"Capital Gains Tax", body:"If you've owned and lived in the home for at least 2 of the last 5 years, you may exclude up to $250,000 ($500,000 married filing jointly) of gain from capital gains tax. If you don't meet this threshold, consult your accountant before you list." },
          ].map((item, i) => (
            <Reveal key={i} delay={i*0.08}>
              <div style={{ padding:"1.25rem 0", borderBottom:"1px solid #2A2A28" }}>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color:"#fff", marginBottom:"0.4rem" }}>{item.title}</strong>
                <p style={{ fontSize:"0.85rem", color:C.light, lineHeight:1.85 }}>{item.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.4} style={{ marginTop:"2rem", background:"rgba(255,255,255,0.05)", border:"1px solid #2A2A28", borderRadius:6, padding:"1.25rem" }}>
            <p style={{ fontFamily:sans, fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.accentL, marginBottom:"0.5rem" }}>Example Net Proceeds — $500,000 Sale</p>
            {[
              ["Sale Price",        "+$500,000"],
              ["Agent Commission (5.5%)", "−$27,500"],
              ["Attorney Fees",     "−$700"],
              ["Property Taxes (prorated)", "−$2,500"],
              ["Repair Credits (est.)", "−$3,000"],
              ["Mortgage Payoff (est.)", "−$250,000"],
              ["Net Proceeds (est.)", "≈ $216,300"],
            ].map(([label, value], i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"0.5rem 0", borderBottom: i < 6 ? "1px solid #2A2A28" : "none" }}>
                <span style={{ fontFamily:sans, fontSize:"0.78rem", color: i === 6 ? "#fff" : C.light, fontWeight: i === 6 ? 500 : 300 }}>{label}</span>
                <span style={{ fontFamily:serif, fontSize:"0.88rem", color: i === 6 ? C.accentL : C.light, fontWeight: i === 6 ? 400 : 300 }}>{value}</span>
              </div>
            ))}
            <p style={{ fontFamily:sans, fontSize:"0.6rem", color:"#444440", marginTop:"0.75rem", lineHeight:1.5 }}>Example only. Actual figures vary based on your specific situation. Ryan will prepare a personalized net proceeds estimate for your home.</p>
          </Reveal>
        </Reveal>
      </section>

      {/* ── CHAPTER 09 — SPECIAL SITUATIONS ── */}
      <section id="situations" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Chapter 09</Label>
          <ChapterTitle num="09" title="Special Selling Situations" />
          <BodyText>Not every sale is straightforward. Here's how Ryan approaches the situations that require more than a standard listing strategy.</BodyText>

          {[
            { icon:"🔼", title:"Selling While Buying", body:"Coordinating a simultaneous sale and purchase is the most common complex selling situation Ryan handles. Options include simultaneous closings on the same day, a sale-leaseback arrangement that lets you stay in your home after closing while you find your next property, or a bridge loan that provides purchasing power before your sale closes. Ryan will model each option against your specific financial situation and recommend the right structure." },
            { icon:"📦", title:"Relocation Sale", body:"Selling while moving out of Charlotte — or out of state — requires a listing agent who can manage the transaction without constant in-person involvement from you. Ryan handles all aspects of the listing, preparation coordination, showing management, and closing remotely when sellers are already elsewhere. This is a common situation for military families and corporate relocations." },
            { icon:"💼", title:"Estate & Inherited Property", body:"Selling an inherited property involves probate process navigation, potential multiple-beneficiary coordination, and emotional complexity that a standard listing doesn't encounter. Ryan provides clear guidance on process sequence, realistic timeline expectations, and how to structure the transaction to protect all parties involved." },
            { icon:"⏰", title:"Distressed or Time-Sensitive Sale", body:"Facing foreclosure, a divorce settlement deadline, or a job relocation with a firm start date? Time-sensitive sales require a pricing strategy that balances speed against proceeds. Ryan is direct about the tradeoffs — sometimes the right answer is accepting a price that feels low in exchange for a certainty of close that a higher-priced listing can't guarantee." },
            { icon:"🏗️", title:"Selling a Fixer or As-Is Property", body:"Not every home is ready to list in show condition — and sometimes the numbers don't justify preparation investment. As-is sales attract a specific buyer profile: investors, flippers, and experienced buyers comfortable with renovation projects. Ryan knows this buyer pool and how to price and market to them effectively." },
          ].map((item, i) => (
            <Reveal key={i} delay={i*0.08}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", padding:"1.3rem 0", borderBottom:`1px solid ${C.rule}` }}>
                <span style={{ fontSize:"1.3rem", flexShrink:0, width:28, textAlign:"center", marginTop:2 }}>{item.icon}</span>
                <div>
                  <strong style={{ display:"block", fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color:C.charcoal, marginBottom:"0.4rem" }}>{item.title}</strong>
                  <p style={{ fontSize:"0.83rem", color:C.mid, lineHeight:1.85 }}>{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
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
            Charlotte seller<br /><em style={{ fontStyle:"italic", color:C.accent }}>FAQ.</em>
          </h2>
        </Reveal>
        {[
          { q:"How much does it cost to sell a home in Charlotte NC?", a:"Sellers typically pay 5–6% in total agent commission plus 1–3% in closing costs including attorney fees, prorated property taxes, HOA dues, and any agreed repair credits. On a $500,000 home, total selling costs typically run $30,000–$45,000 before your net proceeds." },
          { q:"How long does it take to sell a home in Charlotte NC?", a:"In high-demand neighborhoods like Plaza Midwood and Dilworth, well-priced homes often go under contract within 7–14 days. The full close takes another 30–45 days from accepted offer. Total time from listing to funded close is typically 45–75 days." },
          { q:"Should I make repairs before selling my Charlotte home?", a:"It depends on the repair. Fresh paint and landscaping deliver strong ROI. Full kitchen or bathroom renovations rarely return their cost in a sale. Ryan provides a specific, prioritized prep list for every listing — what to do, what to skip, and what to price around rather than repair." },
          { q:"What is the due diligence fee in North Carolina?", a:"The due diligence fee is a negotiated amount paid directly to the seller at contract, non-refundable regardless of outcome. In Charlotte's competitive market, due diligence fees typically range from $1,000 to $10,000+ depending on price point and competition level." },
          { q:"Do I need to disclose problems with my home in North Carolina?", a:"Yes. North Carolina requires sellers to complete a Residential Property Disclosure Statement covering all known material defects. Failure to disclose known defects creates significant legal liability. Disclose everything and price accordingly — it is always the right strategy." },
          { q:"Can I sell my Charlotte home while buying another?", a:"Yes — but it requires careful coordination. Options include simultaneous closing, a sale-leaseback arrangement, or a bridge loan. Ryan manages buy-sell transactions regularly and will build a strategy that minimizes gaps and protects you from owning two homes or none at the same time." },
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
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"0.5rem" }}>Ready to find out what</h2>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.68)", lineHeight:1.2, marginBottom:"2rem" }}>your Charlotte home is worth?</h2>
          <a href="#contact" className="pill" style={{ display:"block", background:"#fff", color:C.accent, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, marginBottom:"0.75rem" }}>Get Free Valuation</a>
          <a href="tel:+17045764118" className="pill" style={{ display:"block", background:"transparent", color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, border:"1px solid rgba(255,255,255,0.32)" }}>(704) 576-4118</a>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Get Started</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Questions about<br /><em style={{ fontStyle:"italic", color:C.accent }}>selling in Charlotte?</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>
            Ryan will pull a free CMA for your property and walk you through exactly what to expect — price, timeline, costs, and strategy. No obligation.
          </p>
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
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Property Address</label>
            <input placeholder="123 Main St, Charlotte, NC 28205" {...inp("address")} />
          </div>
          <div style={{ marginBottom:"1.25rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>What's your situation?</label>
            <textarea placeholder="Tell Ryan about your property and your selling timeline..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", resize:"vertical", minHeight:110 }} />
          </div>
          <button onClick={handleSubmit} disabled={formStatus==="sending"} style={{ width:"100%", padding:"1rem", background: formStatus==="sending" ? C.accentL : C.accent, color:"#fff", border:"none", borderRadius:3, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", cursor: formStatus==="sending" ? "wait" : "pointer", transition:"background 0.2s" }}>
            Get My Free Valuation
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
            <a href="/buyers-guide" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Buyer's Guide</a>
            <a href="/sellers-guide" style={{ display:"block", fontSize:"0.78rem", color:C.accentL, marginBottom:"0.5rem" }}>Seller's Guide</a>
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
