import React, { useEffect, useState } from 'react';
import { X, User as UserIcon, ShieldCheck, ShoppingCart, Tag, AlertTriangle, Star } from 'lucide-react';
import { ListingDetailDTO, ListingSummaryDTO, ReviewDTO, UserDTO } from '../types';
import { api } from '../services/api';

interface ListingDetailModalProps {
  listingId: number | null;
  currentUser: UserDTO | null;
  onClose: () => void;
  onInitiateCheckout: (listing: ListingSummaryDTO) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listingId,
  currentUser,
  onClose,
  onInitiateCheckout,
}) => {
  const [detail, setDetail] = useState<ListingDetailDTO | null>(null);
  const [sellerReviews, setSellerReviews] = useState<ReviewDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!listingId) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSellerReviews([]);

    // Gestione errore con then e catch come da bando
    api.getListingById(listingId)
      .then((data) => {
        setDetail(data);
        if (data.seller && data.seller.id) {
          api.getSellerReviews(data.seller.id)
            .then((reviews) => setSellerReviews(reviews))
            .catch(() => setSellerReviews([]));
        }
      })
      .catch((err: Error) => {
        console.error('Fetch detail error:', err.message);
        setErrorMessage(err.message || 'Impossibile recuperare i dettagli dell\'annuncio.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listingId]);

  if (!listingId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px' }}
      >
        {/* Header Modale */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={18} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Scheda Dettagliata Articolo</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.6rem' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Modale */}
        <div style={{ padding: '1.5rem' }}>
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{
                width: '36px',
                height: '36px',
                border: '3px solid rgba(99, 102, 241, 0.2)',
                borderTopColor: 'var(--accent-cyan)',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ color: 'var(--text-secondary)' }}>Caricamento scheda da Spring Boot...</p>
            </div>
          )}

          {errorMessage && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'center',
              color: '#fb7185',
            }}>
              <AlertTriangle size={32} style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: 600 }}>{errorMessage}</p>
            </div>
          )}

          {detail && !isLoading && (
            <div>
              {/* Media & Key Specs Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 300px) 1fr',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: '#090d16',
                  height: '240px',
                }}>
                  <img
                    src={detail.imageUrl}
                    alt={detail.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-platform">{detail.platform.name}</span>
                      <span className="badge badge-cib">{detail.packagingStatus}</span>
                      <span className="badge badge-mint">{detail.itemCondition}</span>
                    </div>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.25 }}>
                      {detail.title}
                    </h2>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      <strong>Produttore:</strong> {detail.platform.manufacturer} ({detail.platform.releaseYear}) • Gen {detail.platform.generation}ª
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <strong>Categoria:</strong> {detail.category.name}
                    </div>
                  </div>

                  {/* Prezzo e Stato */}
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prezzo Richiesto</span>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                      color: detail.status === 'SOLD' ? 'var(--text-muted)' : 'var(--accent-amber)',
                    }}>
                      €{detail.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrizione estesa */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>
                  Descrizione dell'Inserzionista
                </h4>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(11, 15, 23, 0.6)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#cbd5e1',
                  whiteSpace: 'pre-wrap',
                }}>
                  {detail.description}
                </div>
              </div>

              {/* Informazioni Venditore */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <UserIcon size={18} color="var(--accent-violet)" />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      Venditore: {detail.seller.username}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Contatto: {detail.seller.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
                  <ShieldCheck size={16} />
                  <span>Venditore Verificato</span>
                </div>
              </div>

              {/* Sezione Recensioni del Venditore */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Star size={16} style={{ fill: 'var(--accent-amber)', color: 'var(--accent-amber)' }} />
                    Valutazioni e Recensioni di {detail.seller.username} ({sellerReviews.length})
                  </h4>
                  {sellerReviews.length > 0 && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                      Media: {(sellerReviews.reduce((acc, r) => acc + r.rating, 0) / sellerReviews.length).toFixed(1)} / 5.0
                    </span>
                  )}
                </div>

                {sellerReviews.length === 0 ? (
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(11, 15, 23, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}>
                    Nessuna recensione ancora registrata per questo venditore.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {sellerReviews.map((rev) => (
                      <div
                        key={rev.id}
                        style={{
                          padding: '0.75rem 1rem',
                          background: 'rgba(11, 15, 23, 0.6)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1' }}>
                            Acquirente: <strong>{rev.authorUsername}</strong>
                          </span>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={13}
                                style={{
                                  fill: star <= rev.rating ? 'var(--accent-amber)' : 'none',
                                  color: star <= rev.rating ? 'var(--accent-amber)' : 'var(--text-muted)',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        {rev.comment && (
                          <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
                            "{rev.comment}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={onClose} className="btn btn-secondary">
                  Chiudi
                </button>

                {detail.status === 'AVAILABLE' && (!currentUser || detail.seller.id !== currentUser.id) && (
                  <button
                    onClick={() => {
                      onClose();
                      onInitiateCheckout({
                        id: detail.id,
                        title: detail.title,
                        price: detail.price,
                        itemCondition: detail.itemCondition,
                        packagingStatus: detail.packagingStatus,
                        status: detail.status,
                        imageUrl: detail.imageUrl,
                        createdAt: detail.createdAt,
                        platformCode: detail.platform.code,
                        sellerId: detail.seller.id,
                        sellerUsername: detail.seller.username,
                      });
                    }}
                    className="btn btn-primary"
                  >
                    <ShoppingCart size={16} />
                    Procedi all'Acquisto
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
