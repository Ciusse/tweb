import React, { useEffect, useState } from 'react';
import { ShieldAlert, TrendingUp, Package, Users, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import { AdminMetricsDTO, ListingSummaryDTO, UserDTO } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  currentUser: UserDTO | null;
  listings: ListingSummaryDTO[];
  onListingDeleted: (id: number) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  listings,
  onListingDeleted,
}) => {
  const [metrics, setMetrics] = useState<AdminMetricsDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = () => {
    if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    api.getAdminMetrics(currentUser)
      .then((data) => {
        setMetrics(data);
      })
      .catch((err: Error) => {
        console.error('Errore metriche admin:', err.message);
        setError(err.message || 'Accesso negato o errore server nelle metriche.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMetrics();
  }, [currentUser]);

  const handleAdminDelete = (id: number) => {
    if (!currentUser) return;
    if (!window.confirm(`Azione di Moderazione: Sei sicuro di voler revocare l'annuncio ID #${id}?`)) {
      return;
    }

    api.deleteListing(id, currentUser)
      .then(() => {
        // Notifica il genitore per aggiornare lo stato in tempo reale sia nella griglia che nella dashboard
        onListingDeleted(id);
        fetchMetrics();
      })
      .catch((err: Error) => {
        alert('Errore revoca annuncio: ' + err.message);
      });
  };

  if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
    return (
      <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', borderColor: 'rgba(244, 63, 94, 0.4)' }}>
          <ShieldAlert size={48} color="var(--accent-rose)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.4rem', color: '#fb7185', marginBottom: '0.5rem' }}>
            Accesso Riservato agli Amministratori
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {currentUser
              ? `Il tuo account (@${currentUser.username}) ha ruolo ${currentUser.role}. Effettua l'accesso come amministratore (admin@gmail.com) per visualizzare questa sezione.`
              : 'Effettua l\'accesso con un account amministratore per accedere a questa sezione.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Intestazione Pannello */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-sold">Pannello Amministrativo</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>Spring Boot Telemetry v1.0</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Control Room & Moderazione</h2>
        </div>

        <button onClick={fetchMetrics} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <RefreshCw size={16} />
          Aggiorna Telemetria
        </button>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderColor: 'rgba(244, 63, 94, 0.3)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fb7185' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      {metrics && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {/* Card Volume Lordo */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Volume Transato</span>
              <TrendingUp size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-display)' }}>
              €{Number(metrics.totalGrossVolume).toFixed(2)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Totale ordini attivi</span>
          </div>

          {/* Card Annunci Totali */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Annunci a Catalogo</span>
              <Package size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {metrics.totalListings}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
              {metrics.availableListings} Disponibili / {metrics.soldListings} Venduti
            </span>
          </div>

          {/* Card Ordini Totali */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Ordini Emessi</span>
              <ShoppingCart size={20} color="var(--accent-purple)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {metrics.totalOrders}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {metrics.pendingOrders} In lavorazione
            </span>
          </div>

          {/* Card Utenti Registrati */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Account Censiti</span>
              <Users size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {metrics.registeredUsers}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Ruoli attivi su DB</span>
          </div>
        </div>
      )}

      {/* Tabella Moderazione Annunci */}
      <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Registro Audit & Moderazione Rapida
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Titolo Inserzione</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Piattaforma</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Prezzo</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Venditore</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Stato</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Azione Moderatore</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>#{item.id}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{item.title}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span className="badge badge-platform">{item.platformCode}</span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                  €{item.price.toFixed(2)}
                </td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#cbd5e1' }}>{item.sellerUsername}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span className={`badge ${item.status === 'SOLD' ? 'badge-sold' : 'badge-mint'}`}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                  {item.status !== 'REMOVED' && (
                    <button
                      onClick={() => handleAdminDelete(item.id)}
                      className="btn btn-danger"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                    >
                      Revoca
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
