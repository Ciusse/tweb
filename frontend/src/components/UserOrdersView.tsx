import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, AlertCircle, Ban, CheckCircle2 } from 'lucide-react';
import { OrderSummaryDTO, UserDTO } from '../types';
import { api } from '../services/api';

interface UserOrdersViewProps {
  currentUser: UserDTO | null;
  onOrderCancelled?: (orderId: number, listingId: number) => void;
  onRefreshOrders?: () => void;
  onRequestLogin?: () => void;
}

export const UserOrdersView: React.FC<UserOrdersViewProps> = ({
  currentUser,
  onOrderCancelled,
  onRefreshOrders,
  onRequestLogin,
}) => {
  const [orders, setOrders] = useState<OrderSummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Stato per form recensione inline
  const [reviewOrderId, setReviewOrderId] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  const loadOrders = () => {
    if (!currentUser) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    api.getBuyerOrders(currentUser)
      .then((data) => {
        setOrders(data);
        if (onRefreshOrders) {
          onRefreshOrders();
        }
      })
      .catch((err: Error) => {
        console.error('Errore getBuyerOrders:', err.message);
        setError(err.message || 'Errore nel caricamento dei tuoi ordini.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadOrders();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
          <ShoppingBag size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Accedi per visualizzare i tuoi ordini
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Per visualizzare la cronologia dei tuoi acquisti e rilasciare recensioni, effettua prima il login.
          </p>
          {onRequestLogin && (
            <button onClick={onRequestLogin} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
              Accedi / Registrati Ora
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleCancelOrder = (orderId: number, listingId: number) => {
    if (!window.confirm('Sei sicuro di voler annullare questo ordine? L\'articolo tornerà disponibile.')) {
      return;
    }

    api.cancelOrder(orderId, 'Richiesta di recesso dell\'acquirente', currentUser)
      .then(() => {
        loadOrders();
        if (onOrderCancelled) {
          onOrderCancelled(orderId, listingId);
        }
        if (onRefreshOrders) {
          onRefreshOrders();
        }
      })
      .catch((err: Error) => {
        alert('Errore durante l\'annullamento: ' + err.message);
      });
  };

  const handleSubmitReview = (orderId: number) => {
    api.addReview(orderId, { rating, comment: reviewComment }, currentUser)
      .then((createdReview) => {
        setReviewSuccessMsg(`Recensione inviata con successo per l'ordine #${orderId}!`);
        setReviewOrderId(null);
        setReviewComment('');
        // Aggiorna immediatamente lo stato locale
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  hasReview: true,
                  reviewRating: createdReview.rating,
                  reviewComment: createdReview.comment,
                }
              : o
          )
        );
        loadOrders();
        setTimeout(() => setReviewSuccessMsg(null), 4000);
      })
      .catch((err: Error) => {
        alert('Errore salvataggio recensione: ' + err.message);
      });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShoppingBag size={24} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>I Tuoi Ordini d'Acquisto</h2>
        </div>
        <button onClick={loadOrders} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          Aggiorna Storico
        </button>
      </div>

      {reviewSuccessMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          color: '#34d399',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <CheckCircle2 size={18} />
          <span>{reviewSuccessMsg}</span>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Recupero ordini in corso...</p>
        </div>
      )}

      {error && (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
          <AlertCircle size={36} color="var(--accent-rose)" style={{ margin: '0 auto 0.75rem' }} />
          <p style={{ color: '#fb7185' }}>{error}</p>
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <ShoppingBag size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Nessun ordine presente</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Non hai ancora acquistato alcun articolo. Esplora il catalogo e trova un pezzo da collezione!
          </p>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((o) => (
            <div key={o.id} className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={o.listingImageUrl}
                    alt={o.listingTitle}
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        Ordine #{o.id}
                      </span>
                      <span className={`badge ${
                        o.status === 'COMPLETED' ? 'badge-mint' : o.status === 'CANCELLED' ? 'badge-sold' : 'badge-loose'
                      }`}>
                        {o.status}
                      </span>
                      {o.platformCode && (
                        <span className="badge badge-platform">{o.platformCode}</span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {o.listingTitle}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Venditore: <strong>{o.sellerUsername}</strong> • Spedizione: {o.shippingAddress}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Importo</span>
                    <span style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--accent-amber)',
                      fontFamily: 'var(--font-display)',
                    }}>
                      €{o.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {/* Annulla Ordine (se PENDING) */}
                    {o.status === 'PENDING' && (
                      <button
                        onClick={() => handleCancelOrder(o.id, o.listingId)}
                        className="btn btn-danger"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        <Ban size={14} />
                        Annulla
                      </button>
                    )}

                    {/* Lascia Recensione (se non ancora rilasciata e non cancellato) */}
                    {o.status !== 'CANCELLED' && !o.hasReview && (
                      <button
                        onClick={() => setReviewOrderId(reviewOrderId === o.id ? null : o.id)}
                        className="btn btn-primary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        <Star size={14} />
                        Valuta
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Modale/Inline Recensione */}
              {reviewOrderId === o.id && (
                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  background: 'rgba(11, 15, 23, 0.4)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent-amber)' }}>
                    Rilascia Valutazione per {o.sellerUsername}
                  </h5>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Punteggio (1-5):</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={22}
                        onClick={() => setRating(star)}
                        style={{
                          cursor: 'pointer',
                          fill: star <= rating ? 'var(--accent-amber)' : 'none',
                          color: star <= rating ? 'var(--accent-amber)' : 'var(--text-muted)',
                        }}
                      />
                    ))}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Commento sull'imballaggio o sulla precisione dell'annuncio..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setReviewOrderId(null)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                    >
                      Chiudi
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmitReview(o.id)}
                      className="btn btn-primary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      Invia Recensione
                    </button>
                  </div>
                </div>
              )}

              {/* Box Recensione Esistente Visibile a Schermo */}
              {o.hasReview && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.85rem 1.15rem',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                        Valutazione Rilasciata:
                      </span>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={15}
                            style={{
                              fill: star <= (o.reviewRating || 5) ? 'var(--accent-amber)' : 'none',
                              color: star <= (o.reviewRating || 5) ? 'var(--accent-amber)' : 'var(--text-muted)',
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24' }}>
                        ({o.reviewRating || 5}/5)
                      </span>
                    </div>

                    <span className="badge badge-mint" style={{ fontSize: '0.65rem' }}>
                      Recensione Registrata
                    </span>
                  </div>

                  {o.reviewComment && (
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#e2e8f0',
                      fontStyle: 'italic',
                      margin: '0.2rem 0 0 0',
                    }}>
                      "{o.reviewComment}"
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
