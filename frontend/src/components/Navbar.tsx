import {
  Gamepad2,
  PlusCircle,
  ShieldAlert,
  ShoppingBag,
  User as UserIcon,
  LogIn,
  LogOut,
  Home,
  Sparkles,
  ChevronDown,
  Tv,
} from 'lucide-react';
import { UserDTO } from '../types';

interface NavbarProps {
  currentUser: UserDTO | null;
  onLogout: () => void;
  activeView: 'home' | 'catalog' | 'platforms' | 'orders' | 'admin';
  onChangeView: (view: 'home' | 'catalog' | 'platforms' | 'orders' | 'admin') => void;
  onOpenCreateListing: () => void;
  onOpenAuthModal: () => void;
  ordersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  activeView,
  onChangeView,
  onOpenCreateListing,
  onOpenAuthModal,
  ordersCount,
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(10, 15, 26, 0.82)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0.85rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
      }}>
        {/* Brand Logo con badge animato */}
        <div 
          onClick={() => onChangeView('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          title="Torna alla Home Page"
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            <Gamepad2 size={25} color="#ffffff" />
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}>
              <span style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(to right, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                RetroTrade
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '6px',
                background: 'rgba(6, 182, 212, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                letterSpacing: '0.05em',
              }}>
                PRO
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
              MARKETPLACE RETRO-GAMING & HARDWARE
            </div>
          </div>
        </div>

        {/* Navigation Links Centrali */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <button
            onClick={() => onChangeView('home')}
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
          >
            <Home size={16} />
            Home
          </button>

          <button
            onClick={() => onChangeView('catalog')}
            className={`nav-link ${activeView === 'catalog' ? 'active' : ''}`}
          >
            <Gamepad2 size={16} />
            Catalogo
          </button>

          <button
            onClick={() => onChangeView('platforms')}
            className={`nav-link ${activeView === 'platforms' ? 'active' : ''}`}
          >
            <Tv size={16} />
            Piattaforme
          </button>

          <button
            onClick={() => {
              if (!currentUser) {
                onOpenAuthModal();
              } else {
                onChangeView('orders');
              }
            }}
            className={`nav-link ${activeView === 'orders' ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={16} />
            I Miei Ordini
            {currentUser && ordersCount > 0 && (
              <span style={{
                background: 'var(--accent-rose)',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '999px',
                marginLeft: '4px',
                boxShadow: '0 0 10px rgba(244, 63, 94, 0.5)',
              }}>
                {ordersCount}
              </span>
            )}
          </button>

          {currentUser && currentUser.role === 'ROLE_ADMIN' && (
            <button
              onClick={() => onChangeView('admin')}
              className={`nav-link ${activeView === 'admin' ? 'active' : ''}`}
              style={{
                color: activeView === 'admin' ? '#ffffff' : '#fb7185',
              }}
            >
              <ShieldAlert size={16} />
              Admin
            </button>
          )}
        </nav>

        {/* Actions & User State a Destra */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Tasto Pubblica Annuncio (Visibile solo per utenti autenticati) */}
          {currentUser && (
            <button
              onClick={onOpenCreateListing}
              className="btn btn-primary"
              style={{
                padding: '0.55rem 1.15rem',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
              }}
            >
              <PlusCircle size={17} />
              Nuovo Annuncio
            </button>
          )}

          {/* Stato Account: Non collegato (Ospite) o Utente Autenticato */}
          {!currentUser ? (
            <button
              onClick={onOpenAuthModal}
              className="btn btn-secondary"
              style={{
                padding: '0.55rem 1.1rem',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                background: 'rgba(99, 102, 241, 0.1)',
                color: '#ffffff',
              }}
            >
              <LogIn size={16} color="var(--accent-cyan)" />
              Accedi / Registrati
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'rgba(18, 25, 39, 0.9)',
              padding: '0.35rem 0.65rem 0.35rem 0.45rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div
                onClick={onOpenAuthModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  cursor: 'pointer',
                }}
                title="Account attivo - Clicca per visualizzare o cambiare account"
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: currentUser.role === 'ROLE_ADMIN' 
                    ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.3), rgba(244, 63, 94, 0.1))'
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <UserIcon size={17} color={currentUser.role === 'ROLE_ADMIN' ? '#fb7185' : 'var(--accent-cyan)'} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
                      @{currentUser.username}
                    </span>
                    <span className={`badge ${currentUser.role === 'ROLE_ADMIN' ? 'badge-sold' : 'badge-mint'}`} style={{ padding: '2px 5px', fontSize: '0.65rem' }}>
                      {currentUser.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {currentUser.email}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="btn btn-secondary"
                style={{
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.75rem',
                  color: 'var(--accent-rose)',
                  borderColor: 'rgba(244, 63, 94, 0.25)',
                  background: 'rgba(244, 63, 94, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                title="Disconnetti account"
              >
                <LogOut size={13} />
                Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
