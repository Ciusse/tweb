import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section style={{
      padding: '2.5rem 1.5rem 1.5rem',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      <div className="glass-panel" style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.2)',
      }}>
        {/* Glow background accent */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            color: 'var(--accent-cyan)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            <Sparkles size={14} />
            PIATTAFORMA SPECIALIZZATA PER COLLEZIONISTI VINTAGE
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            lineHeight: 1.15,
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Autenticità, Cartucce CIB e Hardware Storico Garantito.
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.75rem',
            lineHeight: 1.6,
          }}>
            Acquista e vendi pezzi originali per NES, SNES, Mega Drive, PS1 e N64. 
            Ogni annuncio certifica lo stato di conservazione (CIB, Loose, Box) e l'integrità del corredo con riserva atomica istantanea.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <span>Protezione Transazione Escrow</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" />
              <span>Standard Grading Internazionale</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <Zap size={18} color="var(--accent-amber)" />
              <span>Sincronizzazione di Stato Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
