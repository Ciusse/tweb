import React, { useState } from 'react';
import {
  X, LogIn, UserPlus, Shield, UserCheck, Key, Mail, User as UserIcon,
  Sparkles, AlertCircle, CheckCircle, Eye, EyeOff, Gamepad2, Lock, AtSign,
} from 'lucide-react';
import { Role, UserDTO } from '../types';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserDTO) => void;
  allUsers: UserDTO[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  allUsers,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Campi Login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // Campi Registrazione
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPwd, setShowRegPwd] = useState(false);

  // Stati UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForms = () => {
    setLoginUsername(''); setLoginPassword('');
    setRegUsername(''); setRegEmail(''); setRegPassword('');
    setErrorMsg(null); setSuccessMsg(null); setIsLoading(false);
  };

  const handleTabChange = (tab: 'login' | 'register') => {
    resetForms();
    setActiveTab(tab);
  };

  const handleQuickLogin = (user: UserDTO) => {
    setErrorMsg(null);
    setSuccessMsg(`Bentornato, @${user.username}! 🎮`);
    setTimeout(() => {
      onAuthSuccess(user);
      onClose();
      resetForms();
    }, 700);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    api.login({ username: loginUsername.trim(), password: loginPassword })
      .then((res) => {
        setIsLoading(false);
        setSuccessMsg(`Bentornato, ${res.user.username}! 🎮`);
        setTimeout(() => {
          onAuthSuccess(res.user);
          onClose();
          resetForms();
        }, 700);
      })
      .catch((err: Error) => {
        setIsLoading(false);
        setErrorMsg(err.message || 'Credenziali non valide. Verifica username e password.');
      });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (regUsername.trim().length < 3) {
      setErrorMsg('Lo username deve contenere almeno 3 caratteri.');
      return;
    }
    if (!regEmail.includes('@')) {
      setErrorMsg('Inserisci un indirizzo email valido.');
      return;
    }
    if (regPassword.length < 4) {
      setErrorMsg('La password deve contenere almeno 4 caratteri.');
      return;
    }

    setIsLoading(true);
    api.register({
      username: regUsername.trim(),
      email: regEmail.trim(),
      password: regPassword,
    })
      .then((res) => {
        setIsLoading(false);
        setSuccessMsg(`Account creato! Accesso in corso come @${res.user.username}... 🎉`);
        setTimeout(() => {
          onAuthSuccess(res.user);
          onClose();
          resetForms();
        }, 800);
      })
      .catch((err: Error) => {
        setIsLoading(false);
        setErrorMsg(err.message || 'Errore durante la registrazione.');
      });
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.65)' }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: 0,
          overflow: 'hidden',
          border: '1px solid rgba(99,102,241,0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
        }}
      >
        {/* Hero Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.15) 100%)',
            padding: '2rem 1.5rem 1.5rem',
            textAlign: 'center',
            borderBottom: '1px solid rgba(99,102,241,0.2)',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '0.35rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#94a3b8',
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 0 30px rgba(99,102,241,0.5)',
            }}
          >
            <Gamepad2 size={32} color="#fff" />
          </div>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(to right, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.25rem',
            }}
          >
            RetroTrade
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Marketplace per collezionisti di retro-gaming
          </p>

          {/* Tab switcher */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              padding: '4px',
              marginTop: '1.25rem',
              gap: '4px',
            }}
          >
            {(['login', 'register'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: activeTab === tab
                    ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                    : 'transparent',
                  color: activeTab === tab ? '#fff' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: activeTab === tab ? '0 4px 12px rgba(99,102,241,0.4)' : 'none',
                }}
              >
                {tab === 'login' ? <LogIn size={15} /> : <UserPlus size={15} />}
                {tab === 'login' ? 'Accedi' : 'Registrati'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Messaggi */}
          {errorMsg && (
            <div
              style={{
                background: 'rgba(244,63,94,0.12)',
                border: '1px solid rgba(244,63,94,0.35)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                color: '#fb7185',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div
              style={{
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.35)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                color: '#34d399',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <CheckCircle size={16} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB: ACCEDI */}
          {activeTab === 'login' && (
            <div>
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Username */}
                <div>
                  <label className="form-label" style={{ marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AtSign size={14} color="var(--accent-cyan)" /> Username
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      autoFocus
                      className="form-input"
                      placeholder="es. mario_retrogamer"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      style={{ paddingLeft: '2.6rem' }}
                    />
                    <UserIcon size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="form-label" style={{ marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Lock size={14} color="var(--accent-cyan)" /> Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showLoginPwd ? 'text' : 'password'}
                      required
                      className="form-input"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      style={{ paddingLeft: '2.6rem', paddingRight: '2.8rem' }}
                    />
                    <Key size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <button
                      type="button"
                      onClick={() => setShowLoginPwd(!showLoginPwd)}
                      style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
                    >
                      {showLoginPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: 'none',
                    borderRadius: '10px',
                    background: isLoading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
                    transition: 'all 0.2s',
                    marginTop: '0.25rem',
                  }}
                >
                  <LogIn size={17} />
                  {isLoading ? 'Autenticazione...' : 'Accedi a RetroTrade'}
                </button>
              </form>
            </div>
          )}

          {/* TAB: REGISTRATI */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Username */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AtSign size={14} color="var(--accent-emerald)" /> Username *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    autoFocus
                    className="form-input"
                    placeholder="es. retro_collector_99"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    style={{ paddingLeft: '2.6rem' }}
                  />
                  <UserIcon size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} color="var(--accent-emerald)" /> Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="collezionista@email.it"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    style={{ paddingLeft: '2.6rem' }}
                  />
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={14} color="var(--accent-emerald)" /> Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showRegPwd ? 'text' : 'password'}
                    required
                    className="form-input"
                    placeholder="Minimo 4 caratteri"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    style={{ paddingLeft: '2.6rem', paddingRight: '2.8rem' }}
                  />
                  <Key size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    onClick={() => setShowRegPwd(!showRegPwd)}
                    style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
                  >
                    {showRegPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>



              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '10px',
                  background: isLoading ? 'rgba(16,185,129,0.4)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(16,185,129,0.35)',
                  transition: 'all 0.2s',
                  marginTop: '0.25rem',
                }}
              >
                <UserPlus size={17} />
                {isLoading ? 'Creazione in corso...' : 'Crea Account RetroTrade'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
