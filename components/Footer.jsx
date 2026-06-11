import Link from 'next/link';

const C = { charcoal:'#181816', mid:'#6B6B65', light:'#B8B8B0', accent:'#2C4A3E', accentL:'#4A7A68', rule:'#E2DDD6' };
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

const PROFILES = [
  { icon:'📍', label:'Google Business Profile',  href:'https://share.google/dvIjO4KOAG1qnUvbX' },
  { icon:'🏢', label:'5 Points Realty Profile',   href:'https://5pointsrealty.myhomesear.ch/our-agents/agent-details.cfm?AgentID=759' },
  { icon:'🏠', label:'Realtor.com Profile',        href:'https://www.realtor.com/realestateagents/67f735599211d83beef98579' },
  { icon:'💼', label:'LinkedIn',                   href:'https://www.linkedin.com/in/ryanmcgill13' },
];

export default function Footer() {
  return (
    <footer style={{ background:C.charcoal, padding:'2.5rem 1.4rem' }}>
      <div style={{ marginBottom:'1.5rem', paddingBottom:'1.5rem', borderBottom:'1px solid #2A2A28' }}>
        <div style={{ fontFamily:serif, fontSize:'1.1rem', fontWeight:300, color:'#fff', lineHeight:1.3, marginBottom:'0.4rem' }}>Ryan McGill</div>
        <div style={{ fontFamily:sans, fontSize:'0.58rem', letterSpacing:'0.13em', textTransform:'uppercase', color:C.light }}>
          Licensed Real Estate Broker · 5 Points Realty · Charlotte, NC · License #359364
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem', paddingBottom:'1.5rem', borderBottom:'1px solid #2A2A28' }}>
        <div>
          <h4 style={{ fontFamily:sans, fontSize:'0.57rem', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', color:C.light, marginBottom:'0.75rem' }}>Navigate</h4>
          {[['Buy a Home','/buy'],['Sell Your Home','/sell'],['Neighborhoods','/neighborhoods'],['Market Reports','/market-reports'],["Buyer's Guide",'/buyers-guide'],["Seller's Guide",'/sellers-guide'],['About Ryan','/about'],['FAQ','/faq']].map(([l,h]) => (
            <Link key={l} href={h} style={{ display:'block', fontSize:'0.78rem', color:C.mid, marginBottom:'0.5rem' }}>{l}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily:sans, fontSize:'0.57rem', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', color:C.light, marginBottom:'0.75rem' }}>Contact</h4>
          <a href="tel:+17045764118" style={{ display:'block', fontSize:'0.78rem', color:C.mid, marginBottom:'0.5rem' }}>(704) 576-4118</a>
          <span style={{ display:'block', fontSize:'0.78rem', color:C.mid, marginBottom:'1.25rem' }}>2200 The Plaza<br />Charlotte, NC 28205</span>

          <h4 style={{ fontFamily:sans, fontSize:'0.57rem', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', color:C.light, marginBottom:'0.75rem' }}>Find Ryan</h4>
          {PROFILES.map(p => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.78rem', color:'#fff', marginBottom:'0.5rem' }}>
              <span style={{ fontSize:'0.9rem' }}>{p.icon}</span> {p.label}
            </a>
          ))}
        </div>
      </div>

      <p style={{ fontSize:'0.64rem', color:'#3A3A38', lineHeight:1.6 }}>
        © 2025 Ryan McGill · 5 Points Realty · Charlotte, NC<br />
        Licensed Real Estate Broker · North Carolina · License #359364
      </p>
    </footer>
  );
}
