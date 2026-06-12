import Head from 'next/head';
import { useState, useEffect, useRef } from "react";

const IMG_SUIT = "/images/top-hero-main.webp";
const IMG_BW = "/images/lower-hero-about-bw.webp";
const IMG_GROUP = "/images/lower-hero-about-group.webp";
const IMG_CLOSEUP = "/images/lower-hero-about-closeup.webp";

const C = {
  cream: "#F5F1EB", warm: "#FDFCFA", charcoal: "#181816",
  mid: "#6B6B65", light: "#B8B8B0", accent: "#2C4A3E",
  accentL: "#4A7A68", rule: "#E2DDD6", sand: "#EDE8E0",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.07 }
    );
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
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const Label = ({ children, light = false }) => (
  <p style={{ fontFamily: sans, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.5)" : C.accent, marginBottom: "0.75rem" }}>
    {children}
  </p>
);

export default function AboutRyan() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  
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

  const inp = (key, type = "text") => ({
    type,
    value: form[key],
    onChange: e => setForm(p => ({ ...p, [key]: e.target.value })),
    style: { width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", WebkitAppearance:"none" },
  });

  return (
          <Head>
        <title>About Ryan McGill | Charlotte NC Realtor | 5 Points Realty</title>
        <meta name="description" content="Ryan McGill is a licensed Charlotte NC realtor, Army veteran, and Blackhawk helicopter pilot. Military Relocation Professional (MRP) at 5 Points Realty." />
        <meta property="og:title" content="About Ryan McGill | Charlotte NC Realtor | 5 Points Realty" />
        <meta property="og:description" content="Ryan McGill is a licensed Charlotte NC realtor, Army veteran, and Blackhawk helicopter pilot. Military Relocation Professional (MRP) at 5 Points Realty." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
<div style={{ fontFamily: sans, background: C.warm, color: C.charcoal, overflowX: "hidden" }}>

      {/* JSON-LD Schema — Person + RealEstateAgent */}
      <div dangerouslySetInnerHTML={{ __html: `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Ryan K. McGill",
          "jobTitle": "Realtor / Broker",
          "description": "Ryan McGill is a licensed real estate broker and Certified Military Relocation Professional (MRP) at 5 Points Realty in Charlotte, NC. Marine officer veteran, helicopter pilot, and breathwork facilitator.",
          "url": "https://ryanmcgillrealtor.com/about/",
          "telephone": "+17045764118",
          "image": "https://ryanmcgillrealtor.com/ryan-mcgill.jpg",
          "hasCredential": [
            {"@type": "EducationalOccupationalCredential", "credentialCategory": "Realtor®", "recognizedBy": {"@type": "Organization", "name": "National Association of Realtors"}},
            {"@type": "EducationalOccupationalCredential", "credentialCategory": "Certified Military Relocation Professional (MRP)", "recognizedBy": {"@type": "Organization", "name": "National Association of Realtors"}},
            {"@type": "EducationalOccupationalCredential", "credentialCategory": "NC Real Estate Broker License #359364", "recognizedBy": {"@type": "Organization", "name": "NC Real Estate Commission"}}
          ],
          "worksFor": {"@type": "RealEstateAgent", "name": "5 Points Realty", "address": {"@type": "PostalAddress", "streetAddress": "2200 The Plaza", "addressLocality": "Charlotte", "addressRegion": "NC", "postalCode": "28205"}},
          "areaServed": {"@type": "City", "name": "Charlotte", "addressRegion": "NC"},
          "knowsAbout": ["Residential Real Estate", "Military Relocation", "PCS Moves", "Charlotte NC Neighborhoods", "Home Buying", "Home Selling", "Investment Properties"]
        }
        </script>
      `}} />

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
        a{text-decoration:none;-webkit-tap-highlight-color:transparent;}
        button{-webkit-tap-highlight-color:transparent;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        input:focus,textarea:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px rgba(44,74,62,0.08);}
        .pill{-webkit-tap-highlight-color:transparent;}
        .pill:active{opacity:0.85;}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background: scrolled||menuOpen ? "rgba(253,252,250,0.97)" : "transparent", backdropFilter:"blur(20px)", borderBottom: scrolled ? `1px solid ${C.rule}` : "1px solid transparent", transition:"all 0.3s" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1rem 1.4rem" }}>
          <a href="/" style={{ fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color: scrolled ? C.charcoal : "#fff", lineHeight:1.15, transition:"color 0.3s" }}>
            Ryan McGill
            <span style={{ display:"block", fontFamily:sans, fontSize:"0.55rem", letterSpacing:"0.13em", textTransform:"uppercase", color: scrolled ? C.mid : "rgba(255,255,255,0.6)", marginTop:1 }}>5 Points Realty · Charlotte, NC</span>
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <a href="tel:+17045764118" className="pill" style={{ background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.68rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.55rem 1rem", borderRadius:2 }}>
              Call Ryan
            </a>
            <div onClick={() => setMenuOpen(o => !o)} style={{ padding:"4px 2px", cursor:"pointer" }}>
              <div style={{ width:22, display:"flex", flexDirection:"column", gap:5 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ display:"block", height:1.5, background: scrolled ? C.charcoal : "#fff", borderRadius:1,
                    transform: menuOpen ? (i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"none") : "none",
                    opacity: menuOpen && i===1 ? 0 : 1, transition:"all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:C.warm, borderTop:`1px solid ${C.rule}`, animation:"slideDown 0.25s ease both" }}>
            {[["Home","/"],["Buy","/buy/"],["Sell","/sell/"],["Neighborhoods","/neighborhoods/"],["Market Reports","/market-reports/"],["Contact","#contact"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display:"block", padding:"1rem 1.4rem", fontFamily:sans, fontSize:"0.83rem", letterSpacing:"0.07em", textTransform:"uppercase", color:C.charcoal, borderBottom:`1px solid ${C.rule}` }}>{l}</a>
            ))}
            <div style={{ padding:"1.4rem" }}>
              <a href="tel:+17045764118" style={{ display:"block", background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"0.95rem", borderRadius:3, textAlign:"center" }}>(704) 576-4118</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:"relative", height:"100svh", minHeight:580, maxHeight:860 }}>
        <img
          src={IMG_SUIT}
          alt="Ryan McGill, Charlotte NC Real Estate Broker and Marine veteran"
          fetchpriority="high"
          decoding="async"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(24,24,22,0.25) 0%, rgba(24,24,22,0.1) 35%, rgba(24,24,22,0.72) 72%, rgba(24,24,22,0.94) 100%)" }} />

        {/* Breadcrumb */}
        <div style={{ position:"absolute", top:72, left:"1.4rem", zIndex:1 }}>
          <a href="/" style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)" }}>Home</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 0.4rem" }}>›</span>
          <span style={{ fontFamily:sans, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)" }}>About Ryan</span>
        </div>

        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 1.4rem 2.5rem" }}>
          <p style={{ fontFamily:sans, fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:"0.8rem", animation:"fadeUp 0.7s 0.1s ease both" }}>
            Realtor® · Broker · Marine Veteran · MRP
          </p>
          <h1 style={{ fontFamily:serif, fontSize:"clamp(3rem,12vw,5.5rem)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:"0.6rem", animation:"fadeUp 0.7s 0.2s ease both" }}>
            Ryan K. McGill
          </h1>
          <p style={{ fontFamily:serif, fontSize:"clamp(1.05rem,4vw,1.5rem)", fontStyle:"italic", fontWeight:300, color:"rgba(255,255,255,0.62)", marginBottom:"1.75rem", animation:"fadeUp 0.7s 0.3s ease both" }}>
            Not just a Realtor®. A trusted partner you can count on.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <a href="#contact" className="pill" style={{ flex:1, background:C.accent, color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block" }}>
              Work With Ryan
            </a>
            <a href="tel:+17045764118" className="pill" style={{ flex:1, background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", color:"#fff", fontFamily:sans, fontSize:"0.72rem", fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.9rem 1rem", borderRadius:3, textAlign:"center", display:"block", border:"1px solid rgba(255,255,255,0.28)" }}>
              (704) 576-4118
            </a>
          </div>
        </div>
      </section>

      {/* ── CREDENTIAL STRIP ── */}
      <div style={{ background:C.charcoal, display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[
          ["Realtor®", "Licensed Broker"],
          ["MRP", "Military Relocation"],
          ["#359364", "NC License"],
          ["5 Points", "Realty"],
        ].map(([num, label], i) => (
          <Reveal key={label} delay={i * 0.08}>
            <div style={{ textAlign:"center", padding:"1.4rem 0.5rem", borderRight: i < 3 ? "1px solid #2A2A28" : "none" }}>
              <span style={{ fontFamily:serif, fontSize:"1.3rem", fontWeight:300, color:"#fff", lineHeight:1, display:"block" }}>{num}</span>
              <span style={{ fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.light, marginTop:"0.4rem", display:"block" }}>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── BIO — MAIN ── */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>About Ryan</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"1.5rem" }}>
            Buying or selling a home<br /><em style={{ fontStyle:"italic", color:C.accent }}>isn't just a transaction.</em>
          </h2>
          <p style={{ fontSize:"0.95rem", color:C.mid, lineHeight:1.95, marginBottom:"1.25rem" }}>
            It's a life-changing experience. With a background as a Marine officer, helicopter pilot, and nonprofit leader, Ryan brings discipline, focus, and an unwavering commitment to service into every client relationship.
          </p>
          <p style={{ fontSize:"0.95rem", color:C.mid, lineHeight:1.95, marginBottom:"1.25rem" }}>
            He's built his career around helping people navigate high-pressure situations with clarity and confidence — and carries that same approach into real estate. As a Certified Military Relocation Professional (MRP), Ryan specializes in helping active-duty service members, veterans, and their families navigate the unique challenges of PCS moves, deployments, and transitioning to civilian life.
          </p>
          <p style={{ fontSize:"0.95rem", color:C.mid, lineHeight:1.95 }}>
            Whether guiding first-time buyers, advising seasoned investors, or helping families relocate, his mission is simple: make the process smooth, strategic, and stress-free.
          </p>
        </Reveal>
      </section>

      {/* ── FULL BLEED — B&W HELICOPTER ── */}
      <div style={{ position:"relative", height:"65vw", maxHeight:600, overflow:"hidden" }}>
        <img
          src={IMG_BW}
          alt="Ryan McGill walking on Army helicopter flight line"
          decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,24,22,0.82) 0%, rgba(24,24,22,0.08) 65%)", display:"flex", alignItems:"flex-end", padding:"2rem 1.4rem" }}>
          <div>
            <p style={{ fontFamily:serif, fontSize:"clamp(1.2rem,5vw,1.9rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.45, marginBottom:"0.75rem" }}>
              "I've built my career around helping people navigate high-pressure situations with clarity and confidence."
            </p>
            <span style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>— Ryan McGill · Marine Officer · Helicopter Pilot · Realtor®</span>
          </div>
        </div>
      </div>

      {/* ── CREDENTIALS ── */}
      <section style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Background & Credentials</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"2rem" }}>
            The experience behind<br /><em style={{ fontStyle:"italic", color:C.accent }}>every deal.</em>
          </h2>
        </Reveal>

        {[
          { icon:"🎖️", title:"Marine Officer & Helicopter Pilot", body:"Ryan served as a Marine officer and helicopter pilot — a career defined by high-stakes decision-making, precision under pressure, and unwavering accountability to the people depending on him. That foundation shapes every client relationship he builds." },
          { icon:"🏠", title:"Realtor® / Broker — 5 Points Realty", body:"Licensed NC Real Estate Broker #359364, operating through 5 Points Realty — Charlotte's neighborhood-first brokerage, founded in 2007 with a core passion for architecture, design, and the city's historic fabric." },
          { icon:"⭐", title:"Certified Military Relocation Professional (MRP)", body:"As an MRP-certified broker, Ryan specializes in the unique complexities of military relocations — PCS moves, deployment timelines, VA loan navigation, and the specific needs of active-duty and veteran families." },
          { icon:"🌿", title:"Breathwork Facilitator", body:"Ryan is a certified breathwork facilitator — a practice rooted in the same discipline and presence he brings to real estate. When he's not with clients, he's teaching breathwork and volunteering with local nonprofits." },
          { icon:"🏙️", title:"Charlotte Native & Community Advocate", body:"Charlotte is home. Ryan knows its neighborhoods, markets, and hidden gems from the inside — not from a data sheet. That local depth is what makes the difference when it matters most for his clients." },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", padding:"1.3rem 0", borderBottom:`1px solid ${C.rule}` }}>
              <span style={{ fontSize:"1.3rem", flexShrink:0, width:32, textAlign:"center", marginTop:2 }}>{item.icon}</span>
              <div>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1.05rem", fontWeight:400, color:C.charcoal, marginBottom:"0.35rem", lineHeight:1.3 }}>{item.title}</strong>
                <p style={{ fontSize:"0.83rem", color:C.mid, lineHeight:1.8 }}>{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── PHOTO — GROUP ARMY SHOT ── */}
      <div style={{ position:"relative", height:"55vw", maxHeight:400, overflow:"hidden" }}>
        <img
          src={IMG_GROUP}
          alt="Ryan McGill with fellow U.S. Army soldiers"
          decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 40%, rgba(24,24,22,0.7) 100%)" }} />
      </div>

      {/* ── MILITARY RELOCATION SPECIALIST ── */}
      <section style={{ background:C.charcoal, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label light>Military Relocation Specialist</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:"#fff", marginBottom:"1.25rem" }}>
            PCS moves.<br /><em style={{ fontStyle:"italic", color:C.accentL }}>Done right.</em>
          </h2>
          <p style={{ fontSize:"0.93rem", color:C.light, lineHeight:1.9, marginBottom:"2rem" }}>
            Ryan understands military life from the inside. As a Marine veteran and Certified Military Relocation Professional, he navigates the unique pressures of PCS moves, deployment timelines, VA loan requirements, and the compressed decision windows that military families face — with patience, precision, and genuine empathy.
          </p>
        </Reveal>

        {[
          ["🎯", "VA Loan Navigation", "Understanding VA loan entitlements, funding fees, and approval timelines — so nothing slows down your close."],
          ["📅", "PCS Timeline Management", "Military moves run on orders, not convenience. Ryan builds his process around your timeline, not the other way around."],
          ["🌐", "Virtual Tours & Remote Buying", "Deployed or stationed elsewhere? Ryan conducts thorough virtual tours and handles the full transaction remotely when needed."],
          ["🏡", "Transition to Civilian Life", "Leaving the service and buying your first civilian home? Ryan has navigated that transition personally and professionally."],
        ].map(([icon, title, body], i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", padding:"1.3rem 0", borderBottom:"1px solid #2A2A28" }}>
              <span style={{ fontSize:"1.2rem", flexShrink:0, width:28, textAlign:"center", marginTop:2 }}>{icon}</span>
              <div>
                <strong style={{ display:"block", fontSize:"0.85rem", fontWeight:500, color:"#fff", marginBottom:"0.3rem" }}>{title}</strong>
                <p style={{ fontSize:"0.82rem", color:C.light, lineHeight:1.8 }}>{body}</p>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.3} style={{ marginTop:"2rem" }}>
          <a href="#contact" className="pill" style={{ display:"block", background:C.accentL, color:"#fff", fontFamily:sans, fontSize:"0.73rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"1rem", borderRadius:3, textAlign:"center" }}>
            Talk Military Relocation
          </a>
        </Reveal>
      </section>

      {/* ── CLOSEUP PHOTO ── */}
      <div style={{ position:"relative", height:"65vw", maxHeight:460, overflow:"hidden" }}>
        <img
          src={IMG_CLOSEUP}
          alt="Ryan McGill, Charlotte NC realtor close up portrait"
          decoding="async"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 15%", display:"block" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, rgba(245,241,235,0.95) 100%)" }} />
      </div>

      {/* ── PHILOSOPHY ── */}
      <section style={{ background:C.cream, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>How Ryan Works</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"1.5rem" }}>
            Mission simple.<br /><em style={{ fontStyle:"italic", color:C.accent }}>Results clear.</em>
          </h2>
          <p style={{ fontSize:"0.95rem", color:C.mid, lineHeight:1.95, marginBottom:"2rem" }}>
            Charlotte is home, and Ryan knows its neighborhoods, markets, and opportunities inside and out. Backed by 5 Points Realty's reputation and his own drive to go above and beyond, he takes pride in being not just a Realtor®, but a trusted partner you can count on.
          </p>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:C.rule, border:`1px solid ${C.rule}`, borderRadius:6, overflow:"hidden" }}>
          {[
            ["👂", "Listens First", "Every engagement starts with understanding your situation — not pitching a product."],
            ["🎯", "Strategy Driven", "Every recommendation is backed by data, market knowledge, and a clear plan."],
            ["⚡", "Decisive Under Pressure", "Competitive markets reward decisive action. Ryan has the experience to know when to move fast and when to hold."],
            ["🤝", "Partner, Not Vendor", "Ryan's goal isn't a transaction. It's a relationship built on results you can trust long after closing."],
          ].map(([icon, title, body], i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{ background:C.cream, padding:"1.5rem 1.2rem" }}>
                <span style={{ fontSize:"1.3rem", display:"block", marginBottom:"0.5rem" }}>{icon}</span>
                <strong style={{ display:"block", fontFamily:serif, fontSize:"1rem", fontWeight:400, color:C.charcoal, marginBottom:"0.35rem" }}>{title}</strong>
                <p style={{ fontSize:"0.76rem", color:C.mid, lineHeight:1.65 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── OUTSIDE THE OFFICE ── */}
      <section style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Beyond Real Estate</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"1.25rem" }}>
            Living fully.<br /><em style={{ fontStyle:"italic", color:C.accent }}>Serving others.</em>
          </h2>
          <p style={{ fontSize:"0.95rem", color:C.mid, lineHeight:1.95, marginBottom:"1.75rem" }}>
            When he's not working with clients, you'll find Ryan teaching breathwork, volunteering with local nonprofits, or exploring Charlotte's hidden gems. He believes in living fully, serving others, and helping people create the future they want — starting with where they live.
          </p>
        </Reveal>

        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
          {["Breathwork Facilitator", "Nonprofit Volunteer", "Charlotte Explorer", "Marine Veteran", "Community Advocate", "Outdoor Enthusiast"].map(tag => (
            <Reveal key={tag}>
              <span style={{ fontFamily:sans, fontSize:"0.72rem", color:C.accent, border:`1px solid ${C.accentL}`, borderRadius:99, padding:"0.3rem 0.9rem", display:"inline-block" }}>{tag}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ background:C.accent, padding:"3rem 1.4rem", textAlign:"center" }}>
        <Reveal>
          <blockquote style={{ fontFamily:serif, fontSize:"clamp(1.3rem,5vw,2rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.5, marginBottom:"1.25rem" }}>
            "Ryan actually sits and listens to what your needs are to help guide you forward. Such a patient person — exactly what you want in a realtor."
          </blockquote>
          <cite style={{ fontStyle:"normal", fontFamily:sans, fontSize:"0.62rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)" }}>
            — Verified Yelp Review
          </cite>
          <div style={{ marginTop:"2rem" }}>
            <a href="#contact" className="pill" style={{ display:"inline-block", background:"#fff", color:C.accent, fontFamily:sans, fontSize:"0.73rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"0.9rem 2rem", borderRadius:3 }}>
              Start the Conversation
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background:C.warm, padding:"3rem 1.4rem" }}>
        <Reveal>
          <Label>Get In Touch</Label>
          <h2 style={{ fontFamily:serif, fontSize:"clamp(2rem,8vw,2.8rem)", fontWeight:300, lineHeight:1.15, color:C.charcoal, marginBottom:"0.75rem" }}>
            Ready to work<br /><em style={{ fontStyle:"italic", color:C.accent }}>with Ryan?</em>
          </h2>
          <p style={{ fontSize:"0.88rem", color:C.mid, lineHeight:1.8, marginBottom:"1.75rem" }}>
            Whether you're buying, selling, or navigating a military relocation, reach out. No pressure — just a real conversation.
          </p>

          {/* Contact info pills */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"2rem" }}>
            <a href="tel:+17045764118" style={{ background:C.cream, border:`1px solid ${C.rule}`, borderRadius:6, padding:"1rem", textAlign:"center", display:"block" }}>
              <div style={{ fontFamily:sans, fontSize:"0.85rem", fontWeight:500, color:C.accent, marginBottom:"0.3rem" }}>Call</div>
              <div style={{ fontFamily:sans, fontSize:"0.58rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:C.mid, marginBottom:2 }}>Call</div>
              <div style={{ fontFamily:sans, fontSize:"0.8rem", color:C.charcoal }}>(704) 576-4118</div>
            </a>
            <div style={{ background:C.cream, border:`1px solid ${C.rule}`, borderRadius:6, padding:"1rem", textAlign:"center" }}>
              <div style={{ fontFamily:sans, fontSize:"0.85rem", fontWeight:500, color:C.accent, marginBottom:"0.3rem" }}>Office</div>
              <div style={{ fontFamily:sans, fontSize:"0.58rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:C.mid, marginBottom:2 }}>Office</div>
              <div style={{ fontFamily:sans, fontSize:"0.78rem", color:C.charcoal }}>2200 The Plaza<br />Charlotte, NC 28205</div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"0.75rem" }}>
            {[["first","First Name","Jane"],["last","Last Name","Smith"]].map(([k,label,ph]) => (
              <div key={k}>
                <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>{label}</label>
                <input placeholder={ph} {...inp(k)} />
              </div>
            ))}
          </div>
          {[["email","Email","jane@email.com","email"],["phone","Phone","(704) 555-0100","tel"]].map(([k,label,ph,type]) => (
            <div key={k} style={{ marginBottom:"0.75rem" }}>
              <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>{label}</label>
              <input placeholder={ph} {...inp(k, type)} />
            </div>
          ))}
          <div style={{ marginBottom:"1.25rem" }}>
            <label style={{ display:"block", fontFamily:sans, fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"0.4rem" }}>Message</label>
            <textarea placeholder="Tell Ryan about your situation..." value={form.message} onChange={e => setForm(p => ({...p, message:e.target.value}))}
              style={{ width:"100%", padding:"0.8rem 1rem", background:C.cream, border:`1px solid ${C.rule}`, borderRadius:3, fontFamily:sans, fontSize:"0.95rem", color:C.charcoal, outline:"none", resize:"vertical", minHeight:110 }} />
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

      {/* ── FOOTER ── */}
      <footer style={{ background:C.charcoal, padding:"2.5rem 1.4rem" }}>
        <div style={{ marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid #2A2A28" }}>
          <div style={{ fontFamily:serif, fontSize:"1.1rem", fontWeight:300, color:"#fff", lineHeight:1.3, marginBottom:"0.4rem" }}>Ryan K. McGill</div>
          <div style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.13em", textTransform:"uppercase", color:C.light, marginBottom:"0.4rem" }}>Realtor® / Broker · 5 Points Realty · License #359364</div>
          <div style={{ fontFamily:sans, fontSize:"0.58rem", letterSpacing:"0.13em", textTransform:"uppercase", color:C.mid }}>Certified Military Relocation Professional (MRP)</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid #2A2A28" }}>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Navigate</h4>
            {[["Home","/"],["Buy","/buy/"],["Sell","/sell/"],["Neighborhoods","/neighborhoods/"],["Market Reports","/market-reports/"]].map(([l,h]) => (
              <a key={l} href={h} style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:sans, fontSize:"0.57rem", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.light, marginBottom:"0.75rem" }}>Contact</h4>
            <a href="tel:+17045764118" style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>(704) 576-4118</a>
            <span style={{ display:"block", fontSize:"0.78rem", color:C.mid, marginBottom:"0.5rem" }}>2200 The Plaza</span>
            <span style={{ display:"block", fontSize:"0.78rem", color:C.mid }}>Charlotte, NC 28205</span>
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
        <p style={{ fontSize:"0.64rem", color:"#3A3A38", lineHeight:1.6 }}>
          © 2025 Ryan McGill · 5 Points Realty · Charlotte, NC<br />
          Licensed Real Estate Broker · North Carolina · License #359364
        </p>
      </footer>
    </div>
  );
}
