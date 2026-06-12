import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_HERO = "/images/lower-hero.webp";
const IMG_SUIT = "/images/top-hero-main.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

const faqs = [
  { q:"How do I find out what my Charlotte home is worth?", a:"The most accurate way is a Comparative Market Analysis (CMA) from a local broker. Ryan provides a free, data-backed CMA that looks at recent sales, active competition, and your home's specific attributes — not just an algorithm's estimate." },
  { q:"When is the best time to sell a home in Charlotte NC?", a:"Spring and early summer typically produce the highest buyer demand and fastest sales in Charlotte. However, well-priced, well-presented homes sell in every season. Ryan will advise on timing based on your specific neighborhood and situation." },
  { q:"How long does it take to sell a home in Charlotte?", a:"In high-demand neighborhoods like Plaza Midwood and Dilworth, well-priced homes often go under contract in under two weeks. The full close typically takes 30–45 days from accepted offer. Ryan will give you a realistic timeline for your specific property." },
  { q:"What does a seller's agent do?", a:"Ryan handles pricing strategy, staging guidance, professional marketing, MLS listing, showing coordination, offer negotiation, due diligence management, and closing coordination — everything from listing day to keys handed over." },
  { q:"How much does it cost to sell a home in Charlotte NC?", a:"Sellers typically pay 5–6% of the sale price in total commission, plus closing costs of 1–3%. Ryan will walk you through a complete net proceeds estimate so you know exactly what to expect before you list." },
  { q:"Should I make repairs before listing in Charlotte?", a:"It depends. Some repairs deliver strong ROI; others don't. Ryan provides specific, data-backed guidance on what to fix, what to skip, and what to stage — so you don't spend money where it won't come back." },
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay=0, style={} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(22px)", transition:`opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

const Label = ({ children, light=false }) => (
  <p style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color: light ? "rgba(255,255,255,0.5)" : C.accent, marginBottom:"0.75rem" }}>{children}</p>
);

export default function SellPage() {
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

  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", address:"", timeline:"", condition:"", message:"" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const inp = (key, type="text") => ({
    type, value:form[key],
    onChange: e => setForm(p => ({...p,[key]:e.target.value})),
    style:{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", WebkitAppearance:"none" },
  });

  return (
          <Head>
        <title>Sell Your Home in Charlotte NC | Ryan McGill | 5 Points Realty</title>
        <meta name="description" content="Get what your home is worth. Ryan McGill offers full-service listing representation in Charlotte NC — pricing strategy, staging, marketing, and negotiation." />
        <meta property="og:title" content="Sell Your Home in Charlotte NC | Ryan McGill | 5 Points Realty" />
        <meta property="og:description" content="Get what your home is worth. Ryan McGill offers full-service listing representation in Charlotte NC — pricing strategy, staging, marketing, and negotiation." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily:sans, background:C.warm, color:C.charcoal, overflowX:"hidden" }}>

      <div dangerouslySetInnerHTML={{ __html: `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Sell Your Home in Charlotte NC",
          "description": "Ryan McGill, licensed real estate broker at 5 Points Realty, provides full-service home selling representation in Charlotte NC — pricing, marketing, negotiation, and closing.",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Ryan McGill",
            "telephone": "+17045764118",
            "url": "https://ryanmcgillrealtor.com",
            "address": {"@type":"PostalAddress","streetAddress":"2200 The Plaza","addressLocality":"Charlotte","addressRegion":"NC","postalCode":"28205"}
          },
          "areaServed": {"@type":"City","name":"Charlotte","addressRegion":"NC"},
          "serviceType": "Residential Real Estate Seller Representation"
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"How do I find out what my Charlotte home is worth?","acceptedAnswer":{"@type":"Answer","text":"The most accurate way is a Comparative Market Analysis (CMA) from a local broker. Ryan provides a free, data-backed CMA that looks at recent sales, active competition, and your home's specific attributes."}},
            {"@type":"Question","name":"When is the best time to sell a home in Charlotte NC?","acceptedAnswer":{"@type":"Answer","text":"Spring and early summer typically produce the highest buyer demand and fastest sales in Charlotte. However, well-priced, well-presented homes sell in every season."}},
            {"@type":"Question","name":"How long does it take to sell a home in Charlotte?","acceptedAnswer":{"@type":"Answer","text":"In high-demand neighborhoods like Plaza Midwood and Dilworth, well-priced homes often go under contract in under two weeks. The full close typically takes 30–45 days from accepted offer."}}
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
            {[["Home","/"],["Buy","/buy/"],["Neighborhoods","/neighborhoods/"],["About Ryan","/about/"],["Contact","#contact"]].map(([l,h]) => (
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
        <img src={IMG_HERO} alt="Sell your home in Charlotte NC with Ryan McGill" fetchpriority="high" decoding="async"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(24,24,22,0.4) 0%, rgba(24,24,22,0.15) 35%, rgba(24,24,22,0.8) 75%, rgba(24,24,22,0.96) 100%)" }} />
        <div style={{ position:"absolute", top:72, left:"1.4rem", zIndex:1 }}>
          <a href="/" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Home</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <span style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)" }}>Sell</span>
        </div>
        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 1.4rem 2.5rem" }}>
          <p style={{ fontFamily:sans, fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:"0.8rem", animation:"fadeUp 0.7s 0.1s ease both" }}>Sell Your Home in Charlotte, NC</p>
          <h1 style={{ fontFamily:serif, fontSize:"clamp(2.8rem,11vw,4.5rem)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:"0.6rem", animation:"fadeUp 0.7s 0.2s ease both" }}>
            Get what your<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.72)" }}>home is worth.</em>
          </h1>
          <p style={{ fontFamily:serif, fontSize:"clamp(1rem,3.5vw,1.35rem)", fontStyle:"italic", fontWeight:300, color:"rgba(255,255,255,0.6)", marginBottom:"1.75rem", animation:"fadeUp 0.7s 0.3s ease both" }}>
            Strategy, not luck. Results, not promises.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <a href="#contact" className="pill" style={{ flex:1, background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block" }}>Get Home Value</a>
            <a href="#process" className="pill" style={{ flex:1, background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block", border:"1px solid rgba(255,255,255,0.28)" }}>How It Works</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:C.charcoal, display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[["Free","Home Valuation"],["Full","Service Listing"],["MLS","+ Marketing"],["CLT","Local Expert"]].map(([num,label],i) => (
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
          <Label>The Ryan McGill Difference</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"1.25rem" }}>
            Selling isn't just<br /><em style={{ fontStyle:"italic", color:C.accent }}>putting up a sign.</em>
          </h2>
          <p style={{ fontSize:"0.93rem", color:C.mid, lineHeight:1.9, marginBottom:"2rem" }}>
            Most sellers leave money on the table. Not because the market is bad — because their strategy is wrong. Pricing, timing, presentation, and negotiation are four separate disciplines. Ryan brings precision to all four, backed by 5 Points Realty's deep Charlotte roots and a transaction approach shaped by military-grade attention to detail.
          </p>
        </Reveal>
        {[
          ["📊","Data-Driven Pricing","Overpricing kills deals. Underpricing costs money. Ryan's CMA process uses real-time Charlotte sales data to identify the exact price point that maximizes both speed and net proceeds."],
          ["📸","Professional Marketing","Every listing gets professional photography, MLS exposure, targeted digital marketing, and Ryan's full network — not a phone photo and a prayer."],
          ["🧠","Negotiation Precision","Accepting the first offer isn't always right. Countering isn't always right either. Ryan's negotiation approach is built on data and experience, not emotion."],
          ["🗂️","Transaction Management","Inspections, appraisals, repair requests, title issues — Ryan manages every moving part from accepted offer to close so you never get blindsided."],
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
      <section id="process" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>The Selling Process</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"2rem" }}>
            From valuation<br /><em style={{ fontStyle:"italic", color:C.accent }}>to closed.</em>
          </h2>
        </Reveal>
        {[
          ["01","Free Home Valuation","Ryan starts with a free Comparative Market Analysis — a data-backed pricing assessment that goes well beyond what Zillow's algorithm can produce. No obligation, no pressure."],
          ["02","Pricing Strategy","Together you'll set a price that reflects the market, your timeline, and your goals. Ryan explains the logic behind every number so you're confident going in."],
          ["03","Prep & Presentation","Ryan advises on what repairs, updates, and staging moves deliver the highest ROI — and connects you with trusted vendors to get it done efficiently."],
          ["04","Professional Marketing","Your listing goes live on MLS with professional photography, targeted digital marketing, and Ryan's full buyer network engaged from day one."],
          ["05","Showings & Offers","Ryan manages showing coordination, collects feedback, and keeps you informed throughout. When offers arrive, he walks you through each one with clear analysis and a recommendation."],
          ["06","Negotiation & Close","Whether it's one offer or five, Ryan negotiates terms that protect your interests and maximize your net proceeds — then manages the path to close without surprises."],
        ].map(([num,title,body],i) => (
          <Reveal key={num} delay={i*0.07}>
            <div style={{ display:"flex", gap:"1.2rem", padding:"1.4rem 1rem", borderBottom:`1px solid ${C.rule}`, borderRadius:4, marginBottom:1 }}>
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
        <img src={IMG_SUIT} alt="Ryan McGill Charlotte NC listing agent" decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,24,22,0.82) 0%, rgba(24,24,22,0.08) 65%)", display:"flex", alignItems:"flex-end", padding:"2rem 1.4rem" }}>
          <div>
            <p style={{ fontFamily:serif, fontSize:"clamp(1.2rem,4.5vw,1.8rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.45, marginBottom:"0.75rem" }}>
              "Pricing strategy, staging guidance, marketing reach, negotiation precision. Every seller deserves all four — not just a lockbox and an MLS entry."
            </p>
            <span style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>— Ryan McGill · Realtor® · 5 Points Realty</span>
          </div>
        </div>
      </div>

      {/* SELLER TYPES */}
      <section style={{ background:C.charcoal, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label light>Every Seller Situation</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:"#fff", marginBottom:"2rem" }}>
            Your situation.<br /><em style={{ fontStyle:"italic", color:C.accentL }}>Ryan's expertise.</em>
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"#2A2A28", border:"1px solid #2A2A28", borderRadius:6, overflow:"hidden" }}>
          {[
            ["🔼","Upsizing","Coordinating a sale and purchase simultaneously is complex. Ryan manages both sides of the transaction to minimize gaps, overlaps, and stress."],
            ["🔽","Downsizing","Letting go of a family home takes more than a transaction strategy. Ryan brings patience and a clear plan to help you move forward with confidence."],
            ["📦","Relocation","Selling while moving out of Charlotte — or out of state? Ryan handles your listing end-to-end so you can focus on where you're going, not what you're leaving."],
            ["💼","Estate & Inherited Property","Selling an inherited property carries unique emotional and logistical complexity. Ryan provides clear guidance and compassionate support through every step."],
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

      {/* FAQ */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }} itemScope itemType="https://schema.org/FAQPage">
        <Reveal>
          <Label>Common Questions</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"2rem" }}>
            Sellers ask<br /><em style={{ fontStyle:"italic", color:C.accent }}>the right questions.</em>
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
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"0.6rem" }}>Ready to find out what</h2>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,7vw,2.6rem)", fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.68)", lineHeight:1.2, marginBottom:"2rem" }}>your home is worth?</h2>
          <a href="#contact" className="pill" style={{ display:"block", background:"#fff", color:C.accent, fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, marginBottom:"0.75rem" }}>Get Free Valuation</a>
          <a href="tel:+17045764118" className="pill" style={{ display:"block", background:"transparent", color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, border:"1px solid rgba(255,255,255,0.32)" }}>(704) 576-4118</a>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Get Your Home Value</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Free Charlotte<br /><em style={{ fontStyle:"italic", color:C.accent }}>home valuation.</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>
            Tell Ryan about your property. He'll prepare a free, data-backed Comparative Market Analysis and walk you through it personally — no automated estimates, no obligation.
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
          <div style={{ marginBottom:"0.75rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Ideal Selling Timeline</label>
            <select value={form.timeline} onChange={e => setForm(p => ({...p,timeline:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.mid, outline:"none", WebkitAppearance:"none" }}>
              <option value="">Select one</option>
              <option>ASAP — ready to list</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>6–12 months</option>
              <option>Just curious about value</option>
            </select>
          </div>
          <div style={{ marginBottom:"0.75rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Property Condition</label>
            <select value={form.condition} onChange={e => setForm(p => ({...p,condition:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.mid, outline:"none", WebkitAppearance:"none" }}>
              <option value="">Select one</option>
              <option>Move-in ready</option>
              <option>Minor updates needed</option>
              <option>Some work needed</option>
              <option>Significant renovation needed</option>
            </select>
          </div>
          <div style={{ marginBottom:"1.25rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Anything Else?</label>
            <textarea placeholder="Tell Ryan anything that might affect your home's value or your selling situation..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", resize:"vertical", minHeight:110 }} />
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
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Neighborhoods</h4>
            {["Plaza Midwood","NoDa","Dilworth","Myers Park","South End","All Areas →"].map(n => (
              <a key={n} href={`/neighborhoods/${n.toLowerCase().replace(/ /g,"-")}/`} style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>{n}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Contact</h4>
            <a href="tel:+17045764118" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>(704) 576-4118</a>
            <a href="/buy" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>Buy a Home</a>
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
