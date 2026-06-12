import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  charcoal: '#181816', mid: '#6B6B65', accent: '#2C4A3E', rule: '#E2DDD6', warm: '#FDFCFA',
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

export default function Nav({ light = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const textColor = (scrolled || !light) ? C.charcoal : '#fff';
  const subColor  = (scrolled || !light) ? C.mid : 'rgba(255,255,255,0.6)';

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, background: scrolled||menuOpen ? 'rgba(253,252,250,0.97)' : 'transparent', backdropFilter:'blur(20px)', borderBottom: scrolled ? `1px solid ${C.rule}` : '1px solid transparent', transition:'all 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.4rem' }}>
        <Link href="/" style={{ fontFamily:serif, fontSize:'1.25rem', fontWeight:400, color:textColor, lineHeight:1.15, transition:'color 0.3s', padding:'0.25rem 0.5rem', marginLeft:'-0.5rem', borderRadius:3 }}>
          Ryan McGill
          <span style={{ display:'block', fontFamily:sans, fontSize:'0.62rem', letterSpacing:'0.13em', textTransform:'uppercase', color:subColor, marginTop:1 }}>5 Points Realty · Charlotte, NC</span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <a href="tel:+17045764118" style={{ background:C.accent, color:'#fff', fontFamily:sans, fontSize:'0.68rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.55rem 1rem', borderRadius:2 }}>Call Ryan</a>
          <div onClick={() => setMenuOpen(o => !o)} style={{ padding:'4px 2px', cursor:'pointer' }}>
            <div style={{ width:22, display:'flex', flexDirection:'column', gap:5 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ display:'block', height:1.5, background:textColor, borderRadius:1,
                  transform: menuOpen ? (i===0?'rotate(45deg) translate(4.5px,4.5px)':i===2?'rotate(-45deg) translate(4.5px,-4.5px)':'none') : 'none',
                  opacity: menuOpen&&i===1 ? 0 : 1, transition:'all 0.3s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background:C.warm, borderTop:`1px solid ${C.rule}` }}>
          {[['Home','/'],['Buy','/buy'],['Sell','/sell'],['Neighborhoods','/neighborhoods'],['Market Reports','/market-reports'],['About Ryan','/about'],['FAQ','/faq'],['Contact','#contact']].map(([l,h]) => (
            <Link key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display:'block', padding:'1rem 1.4rem', fontFamily:sans, fontSize:'0.83rem', letterSpacing:'0.07em', textTransform:'uppercase', color:C.charcoal, borderBottom:`1px solid ${C.rule}` }}>{l}</Link>
          ))}
          <div style={{ padding:'1.4rem' }}>
            <a href="tel:+17045764118" style={{ display:'block', background:C.accent, color:'#fff', fontFamily:sans, fontSize:'0.75rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', padding:'0.95rem', borderRadius:3, textAlign:'center' }}>(704) 576-4118</a>
          </div>
        </div>
      )}
    </nav>
  );
}
