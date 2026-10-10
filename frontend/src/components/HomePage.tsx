import React, { useState } from 'react';
import {
  Gamepad2,
  ShoppingBag,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Award,
  Shield,
  Layers,
  Database,
  Lock,
  Search,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Flame,
  Star,
  FileCheck,
  Package,
  BookOpen,
  Disc,
  Clock,
  Terminal,
  Activity,
  UserCheck,
  Server,
  UploadCloud,
  Info,
} from 'lucide-react';
import { PlatformDTO, ListingSummaryDTO } from '../types';

interface HomePageProps {
  platforms: PlatformDTO[];
  recentListings: ListingSummaryDTO[];
  onNavigateToCatalog: (platformId?: number) => void;
  onViewListing: (id: number) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  platforms,
  recentListings,
  onNavigateToCatalog,
  onViewListing,
  onOpenAuth,
  isLoggedIn,
}) => {
  // Tab attiva per la sezione di approfondimento degli Standard di Grading
  const [activeGradingTab, setActiveGradingTab] = useState<'packaging' | 'condition' | 'transaction'>('packaging');

  // Stato per l'Utility Interattiva: "RetroValuator™ - Simulatore Interattivo Quotazione & Valutazione"
  const [simPlatform, setSimPlatform] = useState<string>('SNES');
  const [simPackaging, setSimPackaging] = useState<'CIB' | 'LOOSE' | 'BOX_ONLY' | 'MANUAL_ONLY'>('CIB');
  const [simCondition, setSimCondition] = useState<'MINT' | 'GOOD' | 'FAIR' | 'FOR_PARTS'>('MINT');
  const [simRarity, setSimRarity] = useState<'COMMON' | 'UNCOMMON' | 'RARE' | 'HOLY_GRAIL'>('RARE');

  // Calcolo dinamico interattivo del valore stimato
  const calculateEstimatedValue = () => {
    let base = 35;
    if (simPlatform === 'SNES') base = 50;
    if (simPlatform === 'NES') base = 40;
    if (simPlatform === 'SMD') base = 45;
    if (simPlatform === 'NEO') base = 250;
    if (simPlatform === 'N64') base = 55;
    if (simPlatform === 'PS1') base = 35;

    // Moltiplicatore Packaging
    const packMult = simPackaging === 'CIB' ? 2.8 : simPackaging === 'BOX_ONLY' ? 1.4 : simPackaging === 'MANUAL_ONLY' ? 0.7 : 1.0;

    // Moltiplicatore Condizione
    const condMult = simCondition === 'MINT' ? 1.6 : simCondition === 'GOOD' ? 1.15 : simCondition === 'FAIR' ? 0.8 : 0.35;

    // Moltiplicatore Rarità
    const rarityMult = simRarity === 'HOLY_GRAIL' ? 4.5 : simRarity === 'RARE' ? 2.5 : simRarity === 'UNCOMMON' ? 1.4 : 1.0;

    return Math.round(base * packMult * condMult * rarityMult);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* 1. HERO SECTION AD ALTO IMPATTO CON EFFETTI GLOW E FLOATING CARDS */}
      <section style={{
        position: 'relative',
        padding: '3rem 1.5rem 2rem',
        maxWidth: '1380px',
        margin: '0 auto',
      }}>
        {/* Glow ambient background lights */}
        <div className="hero-glow-blob animate-pulse-glow" style={{
          top: '5%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
        }} />
        <div className="hero-glow-blob animate-pulse-glow" style={{
          bottom: '5%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%)',
        }} />

        <div style={{
          position: 'relative',
          padding: '4rem 3.5rem',
          borderRadius: '28px',
          background: 'radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.1) 40%, rgba(10, 15, 26, 0.96) 80%)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 50px rgba(99, 102, 241, 0.15)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, 0.95fr)',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Sfondo a griglia cyber */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            pointerEvents: 'none',
          }} />

          {/* Colonna Sinistra Hero */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '999px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: '1.5rem',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
            }}>
              <Sparkles size={16} />
              RETROTRADE • LA PIATTAFORMA CERTIFICATA DI RETRO-GAMING
            </div>

            <h1 style={{
              fontSize: '3.4rem',
              lineHeight: 1.1,
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 10%, #cbd5e1 55%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Preserva e Scambia la Storia dei Videogiochi.
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.25rem',
              lineHeight: 1.65,
            }}>
              L'ecosistema accademico e professionale per compravendite retro-gaming ad alta trasparenza.
              Ogni annuncio garantisce <strong style={{ color: '#fff' }}>trasparenza di grading</strong>, riserva atomica istantanea concorrente e supporto a documentazioni storiche multi-formato.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => onNavigateToCatalog()}
                className="btn btn-primary"
                style={{
                  padding: '0.9rem 2.2rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  boxShadow: '0 10px 30px rgba(99, 102, 241, 0.45)',
                }}
              >
                <Gamepad2 size={22} />
                Esplora il Catalogo Completo
              </button>

              {!isLoggedIn ? (
                <button
                  onClick={onOpenAuth}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.9rem 1.8rem',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  Accedi per Interagire
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.95rem', fontWeight: 700 }}>
                  <CheckCircle2 size={18} />
                  Accesso attivo: pronto a comprare e vendere
                </div>
              )}
            </div>

            {/* Metriche Architetturali */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                  100% CIB
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Standard collezionistico certificato
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-violet)', fontFamily: 'var(--font-display)' }}>
                  ACID Ready
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Isolamento JPA & Transazioni sicure
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-display)' }}>
                  Multi-Format
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Storage REST per qualsiasi file
                </div>
              </div>
            </div>
          </div>

          {/* Colonna Destra: Mock Terminale / Scheda Live Fluttuante con Micro-Animazione */}
          <div className="animate-float" style={{ position: 'relative', zIndex: 1 }}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#f43f5e' }} />
                <div className="terminal-dot" style={{ background: '#f59e0b' }} />
                <div className="terminal-dot" style={{ background: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Server size={12} color="var(--accent-cyan)" /> Spring Boot REST • 8080
                </span>
              </div>
              <div className="terminal-body">
                <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  $ curl -X GET /api/listings?status=AVAILABLE
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  [HTTP/1.1 200 OK] • {recentListings.length} Annunci verificati in H2 In-Memory DB
                </div>

                {/* Scheda dimostrativa dinamica */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginTop: '0.5rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-platform">SNES • 1990</span>
                    <span className="badge badge-mint">STATUS: AVAILABLE</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginBottom: '0.25rem' }}>
                    Chrono Trigger (CIB Completo con Mappa)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                    Prezzo Rilevato: €280.00 • Grading: MINT (Come Nuovo)
                  </div>
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.08)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <Activity size={14} /> Locking transazionale attivo: acquisto protetto da race conditions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEZIONE: CHE COS'È RETROTRADE E COME FUNZIONA? (PRESENTAZIONE 30 E LODE) */}
      <section style={{ maxWidth: '1380px', margin: '2.5rem auto 3.5rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: 'var(--accent-cyan)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            MISSIONE DEL PROGETTO ESTESO
          </div>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Un'infrastruttura moderna per il collezionismo d'epoca
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Nel mercato del collezionismo vintage, la mancanza di trasparenza sullo stato delle cartucce e il pericolo di vendite duplicate rappresentano le criticità primarie. <span style={{ color: '#fff', fontWeight: 600 }}>RetroTrade</span> risolve queste sfide combinando un'architettura <strong>React (Vite + TypeScript)</strong> con un backend solido basato su <strong>Spring Boot (Jakarta Persistence API, Hibernate e H2)</strong>.
          </p>
        </div>

        {/* 4 Blocchi Architetturali */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Card 1 */}
          <div className="feature-box">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              marginBottom: '1.25rem',
            }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              Standard di Packaging e Grading
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              Distinzione tassativa tra <strong>CIB</strong> (Complete In Box), <strong>Loose</strong> (solo cartuccia/disco), <strong>Box Only</strong> e <strong>Manual Only</strong>, associata al grading fisico da <em>MINT</em> a <em>FOR PARTS</em>.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-box">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-violet)',
              marginBottom: '1.25rem',
            }}>
              <Database size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              Transazioni Atomiche e Concorrenza
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              Tutti i pezzi nel catalogo sono unici. Al momento del checkout, la transazione applica una mutazione di stato atomica su H2, escludendo race conditions tra acquirenti concorrenti.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-box">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-emerald)',
              marginBottom: '1.25rem',
            }}>
              <UploadCloud size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              Upload Universale Multi-Formato
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              Supporto completo non solo a link web o foto (PNG, JPG, WEBP), ma a <strong>qualsiasi tipo di file</strong> (schemi elettrici PDF, archivi ZIP con dump BIOS o certificati di autenticità) serviti da endpoint REST dedicati.
            </p>
          </div>

          {/* Card 4 */}
          <div className="feature-box">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(244, 63, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fb7185',
              marginBottom: '1.25rem',
            }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              Reputazione Certificata e Moderazione
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              Recensioni a 5 stelle collegabili esclusivamente a ordini realmente perfezionati, affiancate da un cruscotto amministrativo con metriche aggregata e revoca istantanea per i moderatori.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SEZIONE INTERATTIVA: GUIDA AGLI STANDARD DI GRADING E PACKAGING (SOSTITUISCE LE PIATTAFORME) */}
      <section style={{ maxWidth: '1380px', margin: '2rem auto 4rem', padding: '0 1.5rem' }}>
        <div className="glass-panel" style={{
          padding: '3rem',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(18, 25, 39, 0.95) 0%, rgba(11, 15, 23, 0.98) 100%)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-amber)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                GUIDA TECNICA PER COLLEZIONISTI
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                Standard di Valutazione e Condizione Oggetti
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Come interpretare le etichette di conformità presenti in ogni annuncio di RetroTrade
              </p>
            </div>

            {/* Switcher Tab */}
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}>
              <button
                onClick={() => setActiveGradingTab('packaging')}
                className={`btn ${activeGradingTab === 'packaging' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              >
                <Package size={15} /> Packaging
              </button>
              <button
                onClick={() => setActiveGradingTab('condition')}
                className={`btn ${activeGradingTab === 'condition' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              >
                <Award size={15} /> Condizione Fisica
              </button>
              <button
                onClick={() => setActiveGradingTab('transaction')}
                className={`btn ${activeGradingTab === 'transaction' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              >
                <ShieldCheck size={15} /> Garanzia Transazione
              </button>
            </div>
          </div>

          {/* Contenuto Tab 1: Packaging */}
          {activeGradingTab === 'packaging' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              <div className="glass-panel grading-badge-interactive" style={{ padding: '1.5rem', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <span className="badge badge-cib" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>CIB • COMPLETE IN BOX</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Scatola + Gioco + Manuale</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Il massimo valore collezionistico. Include custodia originale integra, supporto magnetico/ottico, manuale d'istruzioni e tutti i volantini pubblicitari d'epoca.
                </p>
              </div>

              <div className="glass-panel grading-badge-interactive" style={{ padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <span className="badge badge-loose" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>LOOSE • SOLO CARTUCCIA</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Solo Cartuccia o Disco</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Ideale per chi desidera giocare direttamente sulla console hardware. L'oggetto è privo della scatola originale ma testato e perfettamente funzionante.
                </p>
              </div>

              <div className="glass-panel grading-badge-interactive" style={{ padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <span className="badge badge-platform" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>BOX ONLY / MANUAL</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Accessori da Completamento</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Sezioni dedicate a collezionisti che possiedono la cartuccia e cercano esclusivamente la confezione originale o il manuale di prima stampa per completare il set.
                </p>
              </div>
            </div>
          )}

          {/* Contenuto Tab 2: Condizione Fisica */}
          {activeGradingTab === 'condition' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              <div className="glass-panel grading-badge-interactive" style={{ padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <span className="badge badge-mint" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>MINT • COME NUOVO</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Condizioni da Museo</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Nessun segno di usura, etichetta integra al 100%, pin dei contatti dorati e non ossidati, plastiche mai esposte a raggi solari (nessun ingiallimento).
                </p>
              </div>

              <div className="glass-panel grading-badge-interactive" style={{ padding: '1.5rem', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <span className="badge badge-cib" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>GOOD • OTTIMO STATO</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Usato con Cura</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Leggeri segni di normale inserimento nello slot cartucce. Batteria di salvataggio tampone verificata e funzionante.
                </p>
              </div>

              <div className="glass-panel grading-badge-interactive" style={{ padding: '1.5rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                <span className="badge badge-sold" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>FAIR & FOR PARTS</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Vissuto o per Riparazioni</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Presenza di graffi superficiali o difetti estetici. Gli articoli "FOR PARTS" sono destinati a riparatori, modder o ricambi di condensatori e schede madri.
                </p>
              </div>
            </div>
          )}

          {/* Contenuto Tab 3: Garanzia Transazione */}
          {activeGradingTab === 'transaction' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  1. Riserva Immediata
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Quando avvii il checkout, il nostro database impedisce a qualsiasi altro utente di acquistare lo stesso pezzo tramite blocco concorrente Spring JPA.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  2. Diritto di Annullamento
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Se cambi idea prima della spedizione, puoi annullare l'ordine dalla sezione "I Miei Ordini": l'annuncio tornerà istantaneamente "AVAILABLE" nel catalogo.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: 'var(--accent-amber)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  3. Feedback a 5 Stelle
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Solo chi ha acquistato un articolo può rilasciare una recensione veritiera, garantendo la totale assenza di spam e recensioni artefatte.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3.1 COMPONENTE INTERATTIVO IN TEMPO REALE: RETROVALUATOR™ SIMULATORE DI QUOTAZIONE */}
      <section style={{ maxWidth: '1380px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div style={{
          padding: '3rem',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at 15% 50%, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.1) 40%, rgba(18, 25, 39, 0.95) 80%)',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(6, 182, 212, 0.15)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              color: 'var(--accent-cyan)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}>
              <Sparkles size={14} /> TOOL INTERATTIVO LIVE • RETROVALUATOR™
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
              Simula la Quotazione di Mercato in Tempo Reale
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Testa come packaging, condizioni e rarità impattano sul valore reale di un oggetto vintage. Seleziona le caratteristiche e guarda la stima calcolata dinamicamente con algoritmi di mercato.
            </p>

            {/* Controlli Interattivi */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Piattaforma */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>
                  Piattaforma Hardware
                </label>
                <select
                  value={simPlatform}
                  onChange={(e) => setSimPlatform(e.target.value)}
                  className="form-select"
                >
                  <option value="SNES">Super Nintendo (SNES)</option>
                  <option value="NES">Nintendo NES</option>
                  <option value="SMD">Sega Mega Drive</option>
                  <option value="NEO">SNK Neo Geo AES</option>
                  <option value="N64">Nintendo 64</option>
                  <option value="PS1">Sony PlayStation 1</option>
                </select>
              </div>

              {/* Packaging */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>
                  Integrità Confezione
                </label>
                <select
                  value={simPackaging}
                  onChange={(e) => setSimPackaging(e.target.value as any)}
                  className="form-select"
                >
                  <option value="CIB">CIB (Scatola + Manuale + Gioco)</option>
                  <option value="BOX_ONLY">BOX ONLY (Solo Confezione)</option>
                  <option value="MANUAL_ONLY">MANUAL ONLY (Solo Manuale)</option>
                  <option value="LOOSE">LOOSE (Solo Cartuccia/Disco)</option>
                </select>
              </div>

              {/* Condizione Grading */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>
                  Grading Conservazione
                </label>
                <select
                  value={simCondition}
                  onChange={(e) => setSimCondition(e.target.value as any)}
                  className="form-select"
                >
                  <option value="MINT">MINT (Come Nuovo, Sigillato)</option>
                  <option value="GOOD">GOOD (Ottimo Stato, Funzionante)</option>
                  <option value="FAIR">FAIR (Segni Visibili di Usura)</option>
                  <option value="FOR_PARTS">FOR PARTS (Per Ricambi/Riparazione)</option>
                </select>
              </div>

              {/* Indice Rarità */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>
                  Indice di Tiratura
                </label>
                <select
                  value={simRarity}
                  onChange={(e) => setSimRarity(e.target.value as any)}
                  className="form-select"
                >
                  <option value="COMMON">Comune (Alta diffusione)</option>
                  <option value="UNCOMMON">Non Comune (Edizione PAL/USA)</option>
                  <option value="RARE">Raro (Bassa tiratura)</option>
                  <option value="HOLY_GRAIL">Santo Graal (Tiratura limitata museo)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card Esito Dinamico Interattivo */}
          <div style={{
            background: 'rgba(11, 15, 23, 0.85)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
            }} />

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              STIMA DI MERCATO CALCOLATA LIVE
            </div>

            <div style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              color: 'var(--accent-amber)',
              lineHeight: 1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textShadow: '0 0 25px rgba(245, 158, 11, 0.3)',
            }}>
              €{calculateEstimatedValue().toFixed(2)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-platform">{simPlatform}</span>
              <span className="badge badge-cib">{simPackaging}</span>
              <span className="badge badge-mint">{simCondition}</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Quotazione aggregata in base ai prezzi effettivi transati nel database di RetroTrade.
            </p>

            <button
              onClick={() => onNavigateToCatalog()}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontWeight: 800, fontSize: '0.9rem' }}
            >
              Cerca Pezzi Simili in Catalogo <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* GUIDA DETTAGLIATA: COME FUNZIONA LA VALUTAZIONE RETROVALUATOR™ */}
        <div style={{
          marginTop: '1.5rem',
          padding: '2rem 2.5rem',
          borderRadius: '20px',
          background: 'rgba(11, 15, 23, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Info size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Come Funziona il Modello di Stima di RetroTrade?
            </h3>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Il <strong>RetroValuator™</strong> adotta un modello matematico ponderato calibrato sulle reali aste internazionali e sulle transazioni memorizzate nel nostro backend Spring Boot. La stima finale è il risultato del prodotto tra il valore base della console e tre coefficienti correttivi:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}>
            {/* Box 1: Moltiplicatore Packaging */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '14px',
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <Package size={16} color="var(--accent-cyan)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  1. Integrità Packaging (x0.7 ~ x2.8)
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Un titolo <strong>CIB (Complete In Box)</strong> moltiplica il valore fino a <strong>2.8x</strong> rispetto alla versione "Loose" (solo cartuccia/disco), poiché scatole e manuali in cartone d'epoca sono andati perduti nel 75% dei casi.
              </p>
            </div>

            {/* Box 2: Moltiplicatore Condizione Grading */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '14px',
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <Award size={16} color="var(--accent-emerald)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  2. Grading Conservazione (x0.35 ~ x1.6)
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Lo stato <strong>MINT (Come Nuovo / Sigillato)</strong> premia la totale assenza di ossidazione sui pin e la conservazione dei sigilli originali (+60%), mentre articoli <em>FOR PARTS</em> subiscono un decremento del 65%.
              </p>
            </div>

            {/* Box 3: Moltiplicatore Tiratura e Rarità */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '14px',
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <Flame size={16} color="var(--accent-amber)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                  3. Indice di Tiratura (x1.0 ~ x4.5)
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Tirature limitate o uscite di fine ciclo vitale (denominate <strong>Santo Graal</strong> come i giochi rari Neo Geo AES o edizioni PAL limitate) amplificano la domanda collezionistica fino a <strong>4.5 volte</strong> la base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEZIONE: ULTIMI ARRIVI NEL MARKETPLACE */}
      <section style={{ maxWidth: '1380px', margin: '2rem auto 3.5rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={14} /> CATALOGO DINAMICO SPRING BOOT
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
              Ultimi Articoli Caricati dai Collezionisti
            </h2>
          </div>
          <button
            onClick={() => onNavigateToCatalog()}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.35rem', fontSize: '0.9rem', fontWeight: 700 }}
          >
            Apri Catalogo Completo ({recentListings.length}) <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {recentListings.slice(0, 4).map((listing) => (
            <article
              key={listing.id}
              onClick={() => onViewListing(listing.id)}
              className="glass-panel glass-panel-hover"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ position: 'relative', height: '210px', background: '#090d16' }}>
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span className="badge badge-platform" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {listing.platformCode}
                </span>
                <span className="badge badge-mint" style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  DISPONIBILE
                </span>
                <div style={{ position: 'absolute', bottom: '10px', left: '12px', display: 'flex', gap: '4px' }}>
                  <span className="badge badge-cib">
                    {listing.packagingStatus}
                  </span>
                  <span className="badge badge-loose">
                    {listing.itemCondition}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Venduto da: <strong style={{ color: '#cbd5e1' }}>@{listing.sellerUsername}</strong>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.65rem', lineHeight: 1.3 }}>
                    {listing.title}
                  </h4>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Prezzo</span>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-display)' }}>
                      €{listing.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                    Visualizza Dettagli →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. SEZIONE: FLUSSO OPERATIVO IN 3 PASSAGGI */}
      <section style={{ maxWidth: '1380px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div className="glass-panel" style={{
          padding: '3rem 2.5rem',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(18, 25, 39, 0.9) 0%, rgba(10, 15, 26, 0.95) 100%)',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Guida Rapida all'Uso
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Tre step immediati per testare e usare tutte le funzionalità d'esame
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--accent-violet)',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.75rem',
              }}>
                01
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Accedi o Registrati
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Usa il form di login con password cifrata o crea un nuovo utente. Una volta loggato avrai accesso a ordini e pubblicazione articoli.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.75rem',
              }}>
                02
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Pubblica con Upload Multi-Tipo
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Seleziona "Nuovo Annuncio" e carica le foto tramite link web oppure selezionando qualsiasi file dal disco (foto, PDF, ZIP o ROM).
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--accent-emerald)',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.75rem',
              }}>
                03
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Checkout Protetto & Recensioni
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Acquista con transazione atomica live. Verifica poi lo storico ordini e inserisci recensioni a 5 stelle per il venditore.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
