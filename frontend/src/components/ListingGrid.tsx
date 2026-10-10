import React from 'react';
import { PackageOpen, AlertCircle } from 'lucide-react';
import { ListingSummaryDTO, UserDTO } from '../types';
import { ListingCard } from './ListingCard';

interface ListingGridProps {
  listings: ListingSummaryDTO[];
  currentUser: UserDTO | null;
  isLoading: boolean;
  error: string | null;
  onViewDetails: (id: number) => void;
  onInitiateCheckout: (listing: ListingSummaryDTO) => void;
  onDeleteListing?: (id: number) => void;
  onRetry: () => void;
}

export const ListingGrid: React.FC<ListingGridProps> = ({
  listings,
  currentUser,
  isLoading,
  error,
  onViewDetails,
  onInitiateCheckout,
  onDeleteListing,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '380px',
        gap: '1rem',
      }}>
        <div style={{
          width: '45px',
          height: '45px',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: 'var(--accent-cyan)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Interrogazione catalogo Spring Boot...
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{
        padding: '2.5rem',
        textAlign: 'center',
        borderColor: 'rgba(244, 63, 94, 0.3)',
      }}>
        <AlertCircle size={42} color="var(--accent-rose)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fb7185' }}>
          Errore nel caricamento del catalogo
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          {error}
        </p>
        <button onClick={onRetry} className="btn btn-primary">
          Riprova Richiesta
        </button>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="glass-panel" style={{
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <PackageOpen size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Nessun annuncio trovato con questi filtri
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Prova a modificare i parametri di ricerca o inserisci un nuovo annuncio in piattaforma.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Risultati trovati: <strong style={{ color: 'var(--accent-cyan)' }}>{listings.length}</strong>
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {listings.map((item) => (
          <ListingCard
            key={item.id}
            listing={item}
            currentUser={currentUser}
            onViewDetails={onViewDetails}
            onInitiateCheckout={onInitiateCheckout}
            onDeleteListing={onDeleteListing}
          />
        ))}
      </div>
    </div>
  );
};
