import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const C = {
  cream:"#F5F1EB",warm:"#FDFCFA",charcoal:"#181816",
  mid:"#6B6B65",light:"#B8B8B0",accent:"#2C4A3E",
  accentL:"#4A7A68",rule:"#E2DDD6",
};
const serif="'Cormorant Garamond', Georgia, serif";
const sans="'DM Sans', sans-serif";

const INNER = [
  {name:"Plaza Midwood",slug:"plaza-midwood",type:"Historic · Eclectic",desc:"Charlotte's most walkable historic neighborhood. Bungalows, Central Ave, Gold Line."},
  {name:"NoDa",slug:"noda",type:"Arts District",desc:"Murals, music venues, indie eateries. Charlotte's creative heartbeat."},
  {name:"Dilworth",slug:"dilworth",type:"Historic · Family",desc:"Tree-lined streets, craftsman bungalows. Charlotte's first suburb."},
  {name:"Myers Park",slug:"myers-park",type:"Luxury · Established",desc:"Grand homes, oak-lined boulevards, top schools."},
  {name:"South End",slug:"south-end",type:"Urban · Modern",desc:"Breweries, tech startups, art galleries. Blue Line runs through it."},
  {name:"Elizabeth",slug:"elizabeth",type:"Walkable · Charming",desc:"Historic homes, cozy cafes, quiet energy minutes from Uptown."},
  {name:"Cotswold",slug:"cotswold",type:"Convenient · Established",desc:"Great schools, Freedom Park, farmers market."},
  {name:"Uptown Charlotte",slug:"uptown-charlotte",type:"Urban Core",desc:"Charlotte's beating heart. High-rise living, culture, sports."},
  {name:"Eastover",slug:"eastover",type:"Luxury · Private",desc:"Charlotte's most exclusive address. Estate homes, irreplaceable lots."},
  {name:"Villa Heights",slug:"villa-heights",type:"Emerging · NoDa-Adjacent",desc:"NoDa's quieter neighbor. The one that still has upside."},
  {name:"Chantilly",slug:"chantilly",type:"Hidden Gem · Walkable",desc:"Between Plaza Midwood and Elizabeth. Hidden in plain sight."},
  {name:"Ballantyne",slug:"ballantyne",type:"Master-Planned · Family",desc:"Top schools, corporate campus, TD Amp concerts. Consistently in demand."},
];

const SURROUNDING = [
  {name:"Huntersville",slug:"huntersville",type:"Lake Norman Gateway",desc:"Birkdale Village, Lake Norman access, top schools."},
  {name:"Mooresville",slug:"mooresville",type:"Race City USA · Lake Norman",desc:"NASCAR capital. Lake Norman's crown jewel."},
  {name:"Davidson",slug:"davidson",type:"College Town · Charming",desc:"NC's most charming college town. On Lake Norman."},
  {name:"Cornelius",slug:"cornelius",type:"Lake Norman · Waterfront",desc:"Where Lake Norman living is the point, not the bonus."},
  {name:"Matthews",slug:"matthews",type:"Small Town · Family",desc:"Real downtown. Real community. Real schools."},
  {name:"Concord",slug:"concord",type:"Racing Heritage · Affordable",desc:"Charlotte's neighbor. Half the price. All the growth."},
  {name:"Kannapolis",slug:"kannapolis",type:"Mill Town Revival · Emerging",desc:"Charlotte's most affordable bet. And the bet is paying off."},
  {name:"Rock Hill SC",slug:"rock-hill",type:"South Carolina Value",desc:"South of the border. North of the price."},
  {name:"Gastonia",slug:"gastonia",type:"Gaston County Seat",desc:"West Charlotte's value corridor. Bigger city, better prices."},
  {name:"Mint Hill",slug:"mint-hill",type:"Suburban · Eastern Charlotte",desc:"East Charlotte's best-kept secret."},
  {name:"Pineville",slug:"pineville",type:"South Charlotte Gateway",desc:"South Charlotte access. Half the price tag."},
];

function useReveal(){
  const ref=useRef(null);const[vis,setVis]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.06});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return[ref,vis];
}
function Reveal({children,delay=0}){const[ref,vis]=useReveal();return<div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(22px)",transition:`opacity 0.75s ${delay}s ease,transform 0.75s ${delay}s ease`}}>{children}</div>;}

function NeighborhoodCard({n,i}){
  return(
    <Reveal delay={i*0.04}>
      <Link href={`/neighborhoods/${n.slug}`} style={{background:C.cream,border:`1px solid ${C.rule}`,borderRadius:6,padding:"1.4rem 1.2rem",display:"block"}}>
        <div style={{fontFamily:sans,fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent,marginBottom:"0.35rem"}}>{n.type}</div>
        <div style={{fontFamily:serif,fontSize:"1.25rem",fontWeight:400,color:C.charcoal,marginBottom:"0.4rem",lineHeight:1.2}}>{n.name}</div>
        <p style={{fontSize:"0.78rem",color:C.mid,lineHeight:1.6,marginBottom:"0.75rem"}}>{n.desc}</p>
        <div style={{fontFamily:sans,fontSize:"0.62rem",letterSpacing:"0.1em",textTransform:"uppercase",color:C.accent}}>Explore →</div>
      </Link>
    </Reveal>
  );
}

export default function NeighborhoodsIndex(){
  const[menuOpen,setMenuOpen]=useState(false);
  const[scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>10);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);

  return(
    <div style={{fontFamily:sans,background:C.warm,color:C.charcoal,overflowX:"hidden"}}>
      <div dangerouslySetInnerHTML={{__html:`<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Charlotte NC Neighborhoods — Ryan McGill 5 Points Realty","description":"Complete guide to Charlotte NC neighborhoods and surrounding cities by Ryan McGill, licensed real estate broker at 5 Points Realty.","numberOfItems":23}</script>`}}/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}a{text-decoration:none;-webkit-tap-highlight-color:transparent;}@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:scrolled||menuOpen?"rgba(253,252,250,0.97)":"rgba(253,252,250,0.97)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.rule}`,transition:"all 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 1.4rem"}}>
          <Link href="/" style={{fontFamily:serif,fontSize:"1.05rem",fontWeight:400,color:C.charcoal,lineHeight:1.15}}>
            Ryan McGill
            <span style={{display:"block",fontFamily:sans,fontSize:"0.55rem",letterSpacing:"0.13em",textTransform:"uppercase",color:C.mid,marginTop:1}}>5 Points Realty · Charlotte, NC</span>
          </Link>
          <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
            <a href="tel:+17045764118" style={{background:C.accent,color:"#fff",fontFamily:sans,fontSize:"0.68rem",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.55rem 1rem",borderRadius:2}}>Call Ryan</a>
            <div onClick={()=>setMenuOpen(o=>!o)} style={{padding:"4px 2px",cursor:"pointer"}}>
              <div style={{width:22,display:"flex",flexDirection:"column",gap:5}}>
                {[0,1,2].map(i=><span key={i} style={{display:"block",height:1.5,background:C.charcoal,borderRadius:1,transform:menuOpen?(i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"none"):"none",opacity:menuOpen&&i===1?0:1,transition:"all 0.3s"}}/>)}
              </div>
            </div>
          </div>
        </div>
        {menuOpen&&<div style={{background:C.warm,borderTop:`1px solid ${C.rule}`,animation:"slideDown 0.25s ease both"}}>
          {[["Home","/"],["Buy","/buy"],["Sell","/sell"],["Market Reports","/market-reports"],["About Ryan","/about"],["FAQ","/faq"]].map(([l,h])=>(
            <Link key={l} href={h} onClick={()=>setMenuOpen(false)} style={{display:"block",padding:"1rem 1.4rem",fontFamily:sans,fontSize:"0.83rem",letterSpacing:"0.07em",textTransform:"uppercase",color:C.charcoal,borderBottom:`1px solid ${C.rule}`}}>{l}</Link>
          ))}
        </div>}
      </nav>

      <div style={{paddingTop:72,paddingBottom:"0.5rem",background:C.charcoal}}>
        <div style={{padding:"3rem 1.4rem 2rem"}}>
          <Reveal>
            <p style={{fontFamily:sans,fontSize:"0.6rem",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.accentL,marginBottom:"0.75rem"}}>Charlotte NC · 23 Areas</p>
            <h1 style={{fontFamily:serif,fontSize:"clamp(2.4rem,9vw,3.8rem)",fontWeight:300,lineHeight:1.1,color:"#fff",marginBottom:"0.75rem"}}>
              Every neighborhood.<br/><em style={{fontStyle:"italic",color:"rgba(255,255,255,0.65)"}}>All covered.</em>
            </h1>
            <p style={{fontFamily:serif,fontSize:"1.05rem",fontStyle:"italic",fontWeight:300,color:"rgba(255,255,255,0.55)"}}>
              From Plaza Midwood to Rock Hill. Ryan knows them all.
            </p>
          </Reveal>
        </div>
      </div>

      <section style={{background:C.warm,padding:"2.5rem 1.4rem"}}>
        <Reveal>
          <p style={{fontFamily:sans,fontSize:"0.6rem",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.accent,marginBottom:"1.5rem"}}>Inner Charlotte</p>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
          {INNER.map((n,i)=><NeighborhoodCard key={n.slug} n={n} i={i}/>)}
        </div>
      </section>

      <section style={{background:C.cream,padding:"2.5rem 1.4rem"}}>
        <Reveal>
          <p style={{fontFamily:sans,fontSize:"0.6rem",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.accent,marginBottom:"1.5rem"}}>Surrounding Cities</p>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
          {SURROUNDING.map((n,i)=><NeighborhoodCard key={n.slug} n={n} i={i}/>)}
        </div>
      </section>

      <section style={{background:C.accent,padding:"3rem 1.4rem",textAlign:"center"}}>
        <Reveal>
          <h2 style={{fontFamily:serif,fontSize:"clamp(1.8rem,7vw,2.6rem)",fontWeight:300,color:"#fff",lineHeight:1.2,marginBottom:"0.5rem"}}>Not sure which area</h2>
          <h2 style={{fontFamily:serif,fontSize:"clamp(1.8rem,7vw,2.6rem)",fontWeight:300,fontStyle:"italic",color:"rgba(255,255,255,0.68)",lineHeight:1.2,marginBottom:"2rem"}}>is right for you?</h2>
          <Link href="/#contact" style={{display:"block",background:"#fff",color:C.accent,fontFamily:sans,fontSize:"0.75rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",padding:"1rem",borderRadius:3,marginBottom:"0.75rem"}}>Ask Ryan</Link>
          <a href="tel:+17045764118" style={{display:"block",background:"transparent",color:"#fff",fontFamily:sans,fontSize:"0.75rem",fontWeight:400,letterSpacing:"0.12em",textTransform:"uppercase",padding:"1rem",borderRadius:3,border:"1px solid rgba(255,255,255,0.32)"}}>( 704) 576-4118</a>
        </Reveal>
      </section>

      <footer style={{background:C.charcoal,padding:"2.5rem 1.4rem"}}>
        <div style={{marginBottom:"1.5rem",paddingBottom:"1.5rem",borderBottom:"1px solid #2A2A28"}}>
          <div style={{fontFamily:serif,fontSize:"1.1rem",fontWeight:300,color:"#fff",lineHeight:1.3,marginBottom:"0.4rem"}}>Ryan McGill</div>
          <div style={{fontFamily:sans,fontSize:"0.58rem",letterSpacing:"0.13em",textTransform:"uppercase",color:C.light}}>Licensed Real Estate Broker · 5 Points Realty · Charlotte, NC</div>
        </div>
        <p style={{fontSize:"0.64rem",color:"#3A3A38",lineHeight:1.6}}>© 2025 Ryan McGill · 5 Points Realty · Charlotte, NC · Licensed Real Estate Broker · North Carolina</p>
      </footer>
    </div>
  );
}
