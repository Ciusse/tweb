import React from 'react';
import { Eye, ShoppingCart, Trash2 } from 'lucide-react';
import { ListingSummaryDTO, UserDTO } from '../types';

interface ListingCardProps {
  listing: ListingSummaryDTO;
  currentUser: UserDTO | null;
  onViewDetails: (id: number) => void;
  onInitiateCheckout: (listing: ListingSummaryDTO) => void;
  onDeleteListing?: (id: number) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUser,
  onViewDetails,
  onInitiateCheckout,
  onDeleteListing,
}) => {
  const isSold = listing.status === 'SOLD';
  const isOwner = currentUser && currentUser.id === listing.sellerId;
  const isAdmin = currentUser && currentUser.role === 'ROLE_ADMIN';

  const getConditionBadgeClass = (condition: string) => {
    switch (condition) {
      case 'MINT': return 'badge-mint';
      case 'GOOD': return 'badge-cib';
      case 'FAIR': return 'badge-loose';
      default: return 'badge-sold';
    }
  };

  return (
    <article className="glass-panel glass-panel-hover" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
    }}>
      {/* Immagine con badge sovrapposti */}
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden', background: '#090d16' }}>
        <img
          src={listing.imageUrl}
          alt={listing.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            filter: isSold ? 'grayscale(80%) opacity(0.7)' : 'none',
          }}
          onError={(e) => {
            // Fallback se l'immagine remota non carica
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Piattaforma Code Tag */}
        {listing.platformCode && (
          <span className="badge badge-platform" style={{ position: 'absolute', top: '10px', left: '10px' }}>
            {listing.platformCode}
          </span>
        )}

        {/* Stato Transazione */}
        {isSold ? (
          <span className="badge badge-sold" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            VENDUTO
          </span>
        ) : (
          <span className="badge badge-mint" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            DISPONIBILE
          </span>
        )}

        {/* Box Status Tag */}
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '0.4rem' }}>
          <span className={`badge ${listing.packagingStatus === 'CIB' ? 'badge-cib' : 'badge-loose'}`}>
            {listing.packagingStatus}
          </span>
          <span className={`badge ${getConditionBadgeClass(listing.itemCondition)}`}>
            {listing.itemCondition}
          </span>
        </div>
      </div>

      {/* Contenuto Testuale Card */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {listing.categoryName || 'Collezione Rétro'} • Da: <strong style={{ color: '#cbd5e1' }}>{listing.sellerUsername}</strong>
          </div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            lineHeight: 1.3,
            color: isSold ? 'var(--text-muted)' : 'var(--text-primary)',
          }}>
            {listing.title}
          </h3>
        </div>

        {/* Barra Prezzo e Bottoni Azione */}
        <div style={{
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Prezzo</span>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: isSold ? 'var(--text-muted)' : 'var(--accent-amber)',
            }}>
              €{listing.price.toFixed(2)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {/* Bottone Dettagli */}
            <button
              onClick={() => onViewDetails(listing.id)}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.65rem' }}
              title="Visualizza Scheda Completa"
            >
              <Eye size={16} />
            </button>

            {/* Bottone Acquista Subito */}
            {!isSold && !isOwner && (
              <button
                onClick={() => onInitiateCheckout(listing)}
                className="btn btn-primary"
                style={{ padding: '0.45rem 0.85rem' }}
                title="Acquista questo articolo"
              >
                <ShoppingCart size={15} />
                Acquista
              </button>
            )}

            {/* Tasto Revoca per Admin o Proprietario */}
            {(isAdmin || isOwner) && onDeleteListing && !isSold && (
              <button
                onClick={() => onDeleteListing(listing.id)}
                className="btn btn-danger"
                style={{ padding: '0.45rem 0.65rem' }}
                title={isAdmin ? 'Revoca Annuncio (Moderazione Admin)' : 'Elimina mio annuncio'}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
