import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_SUIT = "/images/top-hero-index.webp";
const IMG_BW = "/images/lower-hero.webp";
const IMG_GROUP = "/images/lower-hero-group.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6", sand: "#EDE8E0",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'DM Sans', sans-serif";

const neighborhoods = [
  { name: "Plaza Midwood", slug: "plaza-midwood", type: "Historic · Eclectic", desc: "Charlotte's most walkable historic neighborhood. Bungalows, Central Ave, Gold Line." },
  { name: "NoDa", slug: "noda", type: "Arts District", desc: "Murals, music venues, indie eateries. Charlotte's creative heartbeat." },
  { name: "Dilworth", slug: "dilworth", type: "Historic · Family", desc: "Tree-lined streets, craftsman bungalows. Charlotte's first suburb." },
  { name: "Myers Park", slug: "myers-park", type: "Luxury · Established", desc: "Grand homes, oak-lined boulevards, top schools." },
  { name: "South End", slug: "south-end", type: "Urban · Modern", desc: "Breweries, tech startups, art galleries. Blue Line runs through it." },
  { name: "Elizabeth", slug: "elizabeth", type: "Walkable · Charming", desc: "Historic homes, cozy cafes, quiet energy minutes from Uptown." },
  { name: "Cotswold", slug: "cotswold", type: "Convenient · Established", desc: "Great schools, Freedom Park, farmers market." },
  { name: "Uptown Charlotte", slug: "uptown-charlotte", type: "Urban Core", desc: "Charlotte's beating heart. High-rise living, culture, sports." },
];

const testimonials = [
  { text: "Ryan actually sits and listens to what your needs are to help guide you forward. Such a patient person, exactly what you want in a realtor.", author: "Verified Yelp Review" },
  { text: "Best in town. If you are buying or selling in Charlotte, this is who you need to see.", author: "Five Points Realty Client" },
  { text: "The deep knowledge of every neighborhood, the patience with our timeline, the honesty throughout, Ryan is the real deal.", author: "Charlotte Home Buyer" },
];

const faqs = [
  { q: "What neighborhoods does Ryan serve?", a: "All Charlotte neighborhoods including Plaza Midwood, NoDa, Dilworth, Myers Park, South End, Elizabeth, Cotswold, Eastover, Villa Heights, Ballantyne, and Uptown, plus surrounding cities." },
  { q: "Is now a good time to buy in Charlotte?", a: "Charlotte remains one of the Southeast's strongest markets. The right time depends on your goals. Ryan will walk you through current conditions in any specific neighborhood." },
  { q: "How much does a buyer's agent cost?", a: "In most cases, the buyer's agent commission is covered by the seller. Ryan walks you through the current structure upfront, zero surprises." },
  { q: "How long does it take to sell in Charlotte?", a: "In high-demand areas like Plaza Midwood and Dilworth, well-priced homes often move in under two weeks. Ryan provides a data-backed timeline for your property." },
  { q: "Does Ryan help with relocation?", a: "Yes. Ryan regularly works with out-of-state buyers. He offers virtual tours, neighborhood orientation, and a structured process for long-distance moves." },
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      ...style
    }}>
      {children}
    </div>
  );
}

function MenuIcon({ open }) {
  return (
    <div style={{ width: 22, height: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
      <span style={{ display: "block", height: 1.5, background: C.charcoal, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
      <span style={{ display: "block", height: 1.5, background: C.charcoal, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
      <span style={{ display: "block", height: 1.5, background: C.charcoal, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
    </div>
  );
}

export default function RyanMcGill() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  
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

  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", interest: "", message: "" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const inp = (key, type = "text") => ({
    type,
    value: form[key],
    onChange: e => setForm(p => ({ ...p, [key]: e.target.value })),
    style: {
      width: "100%", padding: "0.8rem 1rem",
      background: C.cream, border: `1px solid ${C.rule}`,
      borderRadius: 3, fontFamily: sans, fontSize: "0.95rem",
      color: C.charcoal, outline: "none", WebkitAppearance: "none",
    }
  });

  return (
          <Head>
        <title>Ryan McGill | Charlotte NC Real Estate | 5 Points Realty</title>
        <meta name="description" content="Charlotte NC real estate with Ryan McGill — Army veteran, helicopter pilot, and licensed broker at 5 Points Realty. Buy or sell from Plaza Midwood to Myers Park." />
        <meta property="og:title" content="Ryan McGill | Charlotte NC Real Estate | 5 Points Realty" />
        <meta property="og:description" content="Charlotte NC real estate with Ryan McGill — Army veteran, helicopter pilot, and licensed broker at 5 Points Realty. Buy or sell from Plaza Midwood to Myers Park." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily: sans, background: C.warm, color: C.charcoal, overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        a { text-decoration: none; -webkit-tap-highlight-color: transparent; }
        button { -webkit-tap-highlight-color: transparent; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
        .nbr-card { transition: background 0.2s; -webkit-tap-highlight-color: transparent; }
        .nbr-card:active { background: ${C.sand} !important; }
        input:focus, select:focus, textarea:focus { border-color: ${C.accent} !important; box-shadow: 0 0 0 3px rgba(44,74,62,0.08); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || menuOpen ? "rgba(253,252,250,0.97)" : "rgba(253,252,250,0.0)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? `1px solid ${C.rule}` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.4rem", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 400, color: C.charcoal, lineHeight: 1.15 }}>
            Ryan McGill
            <span style={{ display: "block", fontFamily: sans, fontSize: "0.55rem", letterSpacing: "0.13em", textTransform: "uppercase", color: C.mid, marginTop: 1 }}>5 Points Realty · Charlotte, NC</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="tel:+17045764118" style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: C.accent, color: "#fff", fontFamily: sans, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.55rem 1rem", borderRadius: 2 }}>
              Call Ryan
            </a>
            <div onClick={() => setMenuOpen(o => !o)} style={{ padding: "4px 2px" }}>
              <MenuIcon open={menuOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div style={{ background: C.warm, borderTop: `1px solid ${C.rule}`, animation: "slideDown 0.25s ease both" }}>
            {[["Buy", "/buy"], ["Sell", "/sell"], ["Neighborhoods", "/neighborhoods"], ["Market Reports", "/market-reports"], ["About Ryan", "/about"], ["FAQ", "/faq"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "1rem 1.4rem", fontFamily: sans, fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: C.charcoal, borderBottom: `1px solid ${C.rule}` }}>
                {label}
              </a>
            ))}
            <div style={{ padding: "1.4rem" }}>
              <a href="tel:+17045764118" style={{ display: "block", background: C.accent, color: "#fff", fontFamily: sans, fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.95rem", borderRadius: 3, textAlign: "center" }}>
                (704) 576-4118
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        {/* Full bleed photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG_SUIT} alt="Ryan McGill Charlotte NC Realtor" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition:"center center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(24,24,22,0.28) 0%, rgba(24,24,22,0.15) 40%, rgba(24,24,22,0.82) 80%, rgba(24,24,22,0.95) 100%)" }} />
        </div>

        {/* Hero content, pinned to bottom */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto", padding: "2rem 1.4rem 2.5rem" }}>
          <p style={{ fontFamily: sans, fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "0.9rem", animation: "fadeUp 0.8s 0.1s ease both" }}>
            Charlotte, NC Real Estate
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.6rem,10vw,4rem)", fontWeight: 300, lineHeight: 1.07, color: "#fff", marginBottom: "0.8rem", animation: "fadeUp 0.8s 0.2s ease both" }}>
            Your guide to<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>Charlotte</em><br />
            real estate.
          </h1>
          <p style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.6)", marginBottom: "1.6rem", animation: "fadeUp 0.8s 0.3s ease both" }}>
            From Plaza Midwood to Myers Park.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", animation: "fadeUp 0.8s 0.4s ease both" }}>
            <a href="#contact" style={{ flex: 1, background: C.accent, color: "#fff", fontFamily: sans, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.95rem 1rem", borderRadius: 3, textAlign: "center", display: "block" }}>
              Start Your Search
            </a>
            <a href="#contact" style={{ flex: 1, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: sans, fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.95rem 1rem", borderRadius: 3, textAlign: "center", display: "block", border: "1px solid rgba(255,255,255,0.3)" }}>
              Get Home Value
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: C.charcoal, display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[["5+", "Years"], ["12", "Areas"], ["CLT", "Based"], ["100%", "Focused"]].map(([num, label], i) => (
          <Reveal key={label} delay={i * 0.08}>
            <div style={{ textAlign: "center", padding: "1.4rem 0.5rem", borderRight: i < 3 ? "1px solid #2A2A28" : "none" }}>
              <span style={{ fontFamily: serif, fontSize: "1.8rem", fontWeight: 300, color: "#fff", lineHeight: 1, display: "block" }}>{num}</span>
              <span style={{ fontFamily: sans, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.light, marginTop: "0.3rem", display: "block" }}>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: C.cream }}>
        {/* Full-width photo */}
        <div style={{ position: "relative", height: "56vw", maxHeight: 520, overflow: "hidden" }}>
          <img src={IMG_GROUP} alt="Ryan McGill U.S. Army" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition:"center 25%", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(245,241,235,0.95) 100%)" }} />
        </div>

        {/* Text content */}
        <div style={{ padding: "2.5rem 1.4rem 3rem" }}>
          <Reveal>
            <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: "0.75rem" }}>About Ryan</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,8vw,2.8rem)", fontWeight: 300, lineHeight: 1.15, color: C.charcoal, marginBottom: "1.2rem" }}>
              Not your average<br /><em style={{ fontStyle: "italic", color: C.accent }}>broker.</em>
            </h2>
            <p style={{ fontSize: "0.92rem", color: C.mid, lineHeight: 1.85, marginBottom: "2rem" }}>
              Ryan McGill brings a background unlike anyone else in Charlotte real estate, decorated Army helicopter pilot, Blackhawk aviator, and medevac pilot for Novant Health. That discipline, attention to detail, and mission-first mentality is what you get when Ryan represents you.
            </p>
          </Reveal>

          {/* Credentials */}
          {[
            ["◆", "Licensed Real Estate Broker", "5 Points Realty, Charlotte NC"],
            ["◆", "U.S. Army Veteran · 2,100+ Flight Hours", "Three combat deployments · UH-60 Blackhawk Pilot"],
            ["◆", "Charlotte Community Advocate", "Rooted in the neighborhoods he serves"],
          ].map(([icon, title, sub], i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.1rem 0", borderBottom: `1px solid ${C.rule}` }}>
                <div style={{ width: 36, height: 36, background: C.warm, border: `1px solid ${C.rule}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem" }}>{icon}</div>
                <div>
                  <strong style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: C.charcoal, lineHeight: 1.3, marginBottom: 2 }}>{title}</strong>
                  <span style={{ fontSize: "0.78rem", color: C.mid }}>{sub}</span>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3} style={{ marginTop: "1.75rem" }}>
            <a href="#contact" style={{ display: "block", background: C.accent, color: "#fff", fontFamily: sans, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem", borderRadius: 3, textAlign: "center" }}>
              Work With Ryan
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── NEIGHBORHOODS ── */}
      <section id="neighborhoods" style={{ background: C.warm, padding: "3rem 0" }}>
        <div style={{ padding: "0 1.4rem 1.75rem" }}>
          <Reveal>
            <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: "0.75rem" }}>Explore Charlotte</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,8vw,2.8rem)", fontWeight: 300, lineHeight: 1.15, color: C.charcoal }}>
              Every neighborhood.<br /><em style={{ fontStyle: "italic", color: C.accent }}>All covered.</em>
            </h2>
          </Reveal>
        </div>

        {/* Horizontal scroll cards */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none", paddingBottom: "0.5rem" }}>
          <style>{`.nbr-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div className="nbr-scroll" style={{ display: "flex", gap: "0.75rem", paddingLeft: "1.4rem", paddingRight: "1.4rem", width: "max-content" }}>
            {neighborhoods.map((n, i) => (
              <Reveal key={n.name} delay={i * 0.04}>
                <a href={`/neighborhoods/${n.slug}`} style={{ width: "64vw", maxWidth: 260, background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 6, padding: "1.4rem 1.2rem", flexShrink: 0, display: "block", textDecoration: "none" }}>
                  <div style={{ fontFamily: sans, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, marginBottom: "0.4rem" }}>{n.type}</div>
                  <div style={{ fontFamily: serif, fontSize: "1.35rem", fontWeight: 400, color: C.charcoal, marginBottom: "0.5rem", lineHeight: 1.2 }}>{n.name}</div>
                  <p style={{ fontSize: "0.78rem", color: C.mid, lineHeight: 1.6 }}>{n.desc}</p>
                  <div style={{ marginTop: "1rem", fontFamily: sans, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent }}>Explore →</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div style={{ padding: "1.5rem 1.4rem 0" }}>
          <Reveal>
            <a href="/neighborhoods" style={{ display: "block", background: "transparent", color: C.charcoal, fontFamily: sans, fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem", borderRadius: 3, textAlign: "center", border: `1px solid ${C.rule}` }}>
              View All Areas
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="sell" style={{ background: C.charcoal, padding: "3rem 1.4rem" }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accentL, marginBottom: "0.75rem" }}>What Ryan Does</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,8vw,2.8rem)", fontWeight: 300, lineHeight: 1.15, color: "#fff", marginBottom: "0.75rem" }}>
            Buy. Sell.<br /><em style={{ fontStyle: "italic", color: C.accentL }}>Win.</em>
          </h2>
          <p style={{ fontSize: "0.88rem", color: C.light, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Real estate transactions are high-stakes. You deserve a broker who treats every deal like a mission.
          </p>
        </Reveal>

        {[
          ["01", "Buying a Home in Charlotte", "From first-time buyers to relocation clients, Ryan navigates Charlotte's competitive market with a level head. Right neighborhood, right price, right home."],
          ["02", "Selling Your Charlotte Home", "Pricing strategy, staging guidance, marketing reach, negotiation precision. Ryan leverages 5 Points Realty's Charlotte roots to get you the best outcome."],
          ["03", "Charlotte Market Reports", "Neighborhood-level data updated regularly. Know what's selling, what's sitting, and what the market is actually doing before you make any move."],
          ["04", "Relocation to Charlotte", "Moving from out of state? Ryan handles complexity, neighborhood matching, virtual tours, timeline coordination, so your move lands exactly right."],
        ].map(([num, title, body], i) => (
          <Reveal key={num} delay={i * 0.08}>
            <div style={{ borderTop: `1px solid #2A2A28`, padding: "1.6rem 0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <span style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 300, color: C.accentL, opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{num}</span>
                <div>
                  <h3 style={{ fontFamily: serif, fontSize: "1.2rem", fontWeight: 300, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ fontSize: "0.82rem", color: C.light, lineHeight: 1.8 }}>{body}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── FULL BLEED QUOTE ── */}
      <div style={{ position: "relative", height: "70vw", maxHeight: 800, overflow: "hidden" }}>
        <img src={IMG_BW} alt="Ryan McGill on Army helicopter flight line" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition:"center center", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(24,24,22,0.72)", display: "flex", alignItems: "flex-end", padding: "2rem 1.4rem" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "clamp(1.2rem,5vw,1.8rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.45, marginBottom: "0.8rem" }}>
              "The same discipline that gets you home from a combat mission is what I bring to every real estate deal."
            </p>
            <span style={{ fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}>— Ryan McGill · U.S. Army Veteran</span>
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <section style={{ background: C.cream, padding: "3rem 1.4rem" }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: "0.75rem" }}>How It Works</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,8vw,2.8rem)", fontWeight: 300, lineHeight: 1.15, color: C.charcoal, marginBottom: "2rem" }}>
            Simple process.<br /><em style={{ fontStyle: "italic", color: C.accent }}>Real results.</em>
          </h2>
        </Reveal>
        {[
          ["01", "Conversation First", "No pressure, no pitch. A real conversation about your goals, timeline, and what matters most."],
          ["02", "Market Intelligence", "Neighborhood data, pricing trends, honest analysis. You'll always know exactly where you stand."],
          ["03", "Strategic Action", "Every move is deliberate. Precision in negotiation and execution at every step."],
          ["04", "Closed & Clear", "A smooth close with zero surprises. Ryan stays present until the keys are in your hand."],
        ].map(([num, title, body], i) => (
          <Reveal key={num} delay={i * 0.08}>
            <div style={{ display: "flex", gap: "1.2rem", padding: "1.4rem 0", borderBottom: `1px solid ${C.rule}` }}>
              <span style={{ fontFamily: serif, fontSize: "1.6rem", fontWeight: 300, color: C.accent, opacity: 0.35, lineHeight: 1, flexShrink: 0, width: 28 }}>{num}</span>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 400, color: C.charcoal, marginBottom: "0.4rem" }}>{title}</h3>
                <p style={{ fontSize: "0.82rem", color: C.mid, lineHeight: 1.75 }}>{body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ background: C.warm, padding: "3rem 1.4rem", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: "1.5rem" }}>What Clients Say</p>
          <div style={{ minHeight: 120 }}>
            <blockquote style={{ fontFamily: serif, fontSize: "clamp(1.15rem,4.5vw,1.6rem)", fontWeight: 300, fontStyle: "italic", color: C.charcoal, lineHeight: 1.55, marginBottom: "1.2rem", transition: "opacity 0.3s" }}>
              "{testimonials[tIdx].text}"
            </blockquote>
            <cite style={{ fontStyle: "normal", fontFamily: sans, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.mid }}>
              — {testimonials[tIdx].author}
            </cite>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: i === tIdx ? C.accent : C.rule, padding: 0, transition: "background 0.2s" }} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: C.cream, padding: "3rem 1.4rem" }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: "0.75rem" }}>Common Questions</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,8vw,2.8rem)", fontWeight: 300, lineHeight: 1.15, color: C.charcoal, marginBottom: "2rem" }}>
            What people are<br /><em style={{ fontStyle: "italic", color: C.accent }}>asking.</em>
          </h2>
        </Reveal>
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ borderBottom: `1px solid ${C.rule}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.3rem 0", gap: "1rem" }}>
                <span style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 400, color: C.charcoal, lineHeight: 1.35 }}>{faq.q}</span>
                <span style={{ fontFamily: sans, fontWeight: 300, fontSize: "1.3rem", color: C.accent, flexShrink: 0, transition: "transform 0.25s", transform: openFaq === i ? "rotate(45deg)" : "none", display: "inline-block", lineHeight: 1 }}>+</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: C.mid, lineHeight: 1.8, maxHeight: openFaq === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.35s ease, padding-bottom 0.35s", paddingBottom: openFaq === i ? "1.3rem" : 0 }}>
                {faq.a}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: C.accent, padding: "3rem 1.4rem", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,7vw,2.6rem)", fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: "0.6rem" }}>
            Ready to make your
          </h2>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,7vw,2.6rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.68)", lineHeight: 1.2, marginBottom: "2rem" }}>
            move in Charlotte?
          </h2>
          <a href="#contact" style={{ display: "block", background: "#fff", color: C.accent, fontFamily: sans, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem", borderRadius: 3, marginBottom: "0.75rem" }}>
            Let's Talk
          </a>
          <a href="tel:+17045764118" style={{ display: "block", background: "transparent", color: "#fff", fontFamily: sans, fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem", borderRadius: 3, border: "1px solid rgba(255,255,255,0.35)" }}>
            (704) 576-4118
          </a>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: C.warm, padding: "3rem 1.4rem" }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: "0.75rem" }}>Get In Touch</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,8vw,2.8rem)", fontWeight: 300, lineHeight: 1.15, color: C.charcoal, marginBottom: "0.75rem" }}>
            Start the<br /><em style={{ fontStyle: "italic", color: C.accent }}>conversation.</em>
          </h2>
          <p style={{ fontSize: "0.88rem", color: C.mid, lineHeight: 1.8, marginBottom: "1.75rem" }}>No obligation. Just a real conversation about your real estate goals in Charlotte.</p>
        </Reveal>

        {/* Contact info pills */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
            <a href="tel:+17045764118" style={{ background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 6, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontFamily:sans, fontSize:"1rem", marginBottom:"0.3rem", color:C.accent }}>☎</div>
              <div style={{ fontFamily: sans, fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.mid, marginBottom: 2 }}>Call</div>
              <div style={{ fontFamily: sans, fontSize: "0.8rem", color: C.charcoal, fontWeight: 400 }}>(704) 576-4118</div>
            </a>
            <div style={{ background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 6, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontFamily:sans, fontSize:"1rem", marginBottom:"0.3rem", color:C.accent }}>✉</div>
              <div style={{ fontFamily: sans, fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.mid, marginBottom: 2 }}>Office</div>
              <div style={{ fontFamily: sans, fontSize: "0.78rem", color: C.charcoal }}>2200 The Plaza<br />Charlotte, NC 28205</div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            {[["first", "First Name", "Jane"], ["last", "Last Name", "Smith"]].map(([k, label, ph]) => (
              <div key={k}>
                <label style={{ display: "block", fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mid, marginBottom: "0.4rem" }}>{label}</label>
                <input placeholder={ph} {...inp(k)} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mid, marginBottom: "0.4rem" }}>Email</label>
            <input placeholder="jane@email.com" {...inp("email", "email")} />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mid, marginBottom: "0.4rem" }}>Phone</label>
            <input placeholder="(704) 555-0100" {...inp("phone", "tel")} />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mid, marginBottom: "0.4rem" }}>I'm interested in</label>
            <select value={form.interest} onChange={e => setForm(p => ({ ...p, interest: e.target.value }))}
              style={{ width: "100%", padding: "0.8rem 1rem", background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 3, fontFamily: sans, fontSize: "0.95rem", color: form.interest ? C.charcoal : C.mid, outline: "none", WebkitAppearance: "none", appearance: "none" }}>
              <option value="">Select one</option>
              <option value="buying">Buying a Home in Charlotte</option>
              <option value="selling">Selling My Charlotte Home</option>
              <option value="both">Buying & Selling</option>
              <option value="relocation">Relocating to Charlotte</option>
              <option value="market">Market Information</option>
            </select>
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mid, marginBottom: "0.4rem" }}>Message</label>
            <textarea placeholder="Tell Ryan about your situation..." value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              style={{ width: "100%", padding: "0.8rem 1rem", background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 3, fontFamily: sans, fontSize: "0.95rem", color: C.charcoal, outline: "none", resize: "vertical", minHeight: 110, WebkitAppearance: "none" }} />
          </div>
          <button type="button" onClick={handleSubmit} style={{ width: "100%", padding: "1rem", background: C.accent, color: "#fff", border: "none", borderRadius: 3, fontFamily: sans, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
            {formStatus === "sending" ? "Sending..." : "Send Message"}
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

      {/* ── FOOTER ── */}
      <footer style={{ background: C.charcoal, padding: "2.5rem 1.4rem" }}>
        <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #2A2A28" }}>
          <div style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 300, color: "#fff", lineHeight: 1.3, marginBottom: "0.5rem" }}>Ryan McGill</div>
          <div style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.13em", textTransform: "uppercase", color: C.light, marginBottom: "0.75rem" }}>Licensed Real Estate Broker · 5 Points Realty</div>
          <p style={{ fontSize: "0.78rem", color: C.mid, lineHeight: 1.7 }}>Serving Charlotte and all surrounding neighborhoods with patience, precision, and local expertise.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #2A2A28" }}>
          {[
            ["Explore", ["Buy a Home", "Sell Your Home", "Active Listings", "Market Reports"]],
            ["Contact", ["(704) 576-4118", "Send a Message", "About Ryan", "5 Points Realty"]],
          ].map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontFamily: sans, fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.light, marginBottom: "1rem" }}>{heading}</h4>
              <ul style={{ listStyle: "none" }}>
                {links.map(label => (
                  <li key={label} style={{ marginBottom: "0.6rem" }}>
                    <a style={{ fontSize: "0.8rem", color: C.mid, cursor: "pointer" }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
          <div style={{ gridColumn:"span 2", marginTop:"1rem", paddingTop:"1.5rem", borderTop:"1px solid #2A2A28" }}>
            <h4 style={{ fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--light)", marginBottom:"0.75rem" }}>Find Ryan</h4>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem" }}>
              <a href="https://share.google/dvIjO4KOAG1qnUvbX" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.78rem", color:"#fff" }}>📍 Google Business</a>
              <a href="https://5pointsrealty.myhomesear.ch/our-agents/agent-details.cfm?AgentID=759" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.78rem", color:"#fff" }}>🏢 5 Points Realty</a>
              <a href="https://www.realtor.com/realestateagents/67f735599211d83beef98579" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.78rem", color:"#fff" }}>🏠 Realtor.com</a>
              <a href="https://www.linkedin.com/in/ryanmcgill13" target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.78rem", color:"#fff" }}>💼 LinkedIn</a>
            </div>
          </div>
        <div style={{ fontSize: "0.65rem", color: "#3A3A38", lineHeight: 1.6 }}>
          © 2025 Ryan McGill · 5 Points Realty · Charlotte, NC<br />
          Licensed Real Estate Broker · North Carolina
        </div>
      </footer>
    </div>
  );
}
