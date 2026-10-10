import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ShoppingCart, AlertCircle } from 'lucide-react';
import { ListingSummaryDTO, OrderCreateDTO, OrderDetailDTO, UserDTO } from '../types';
import { api } from '../services/api';

interface CheckoutOrderModalProps {
  listing: ListingSummaryDTO | null;
  currentUser: UserDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (order: OrderDetailDTO) => void;
  onRequestLogin?: () => void;
}

export const CheckoutOrderModal: React.FC<CheckoutOrderModalProps> = ({
  listing,
  currentUser,
  isOpen,
  onClose,
  onOrderCompleted,
  onRequestLogin,
}) => {
  const [shippingAddress, setShippingAddress] = useState('Via Garibaldi 18, 40121 Bologna (BO)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetailDTO | null>(null);

  if (!isOpen || !listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentUser) {
      setErrorMessage('Devi aver effettuato l\'accesso per procedere con l\'acquisto.');
      if (onRequestLogin) onRequestLogin();
      return;
    }

    if (!shippingAddress.trim() || shippingAddress.trim().length < 10) {
      setErrorMessage('L\'indirizzo di spedizione deve contenere almeno 10 caratteri.');
      return;
    }

    const payload: OrderCreateDTO = {
      listingId: listing.id,
      shippingAddress: shippingAddress.trim(),
    };

    setIsSubmitting(true);

    // Chiamata POST con then e catch
    api.createOrder(payload, currentUser)
      .then((createdOrder) => {
        setIsSubmitting(false);
        setCompletedOrder(createdOrder);
        // Notifica il componente genitore App.tsx per aggiornare ListingGrid (VENDUTO) in tempo reale!
        onOrderCompleted(createdOrder);
      })
      .catch((err: Error) => {
        setIsSubmitting(false);
        console.error('Errore checkout:', err.message);
        setErrorMessage(err.message || 'Errore durante la finalizzazione dell\'ordine sul server.');
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Header Modale */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Finalizzazione Acquisto (Checkout)</h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Schermata di Conferma Successo */}
        {completedOrder ? (
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              border: '2px solid rgba(16, 185, 129, 0.4)',
            }}>
              <CheckCircle size={36} color="var(--accent-emerald)" />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: '#34d399' }}>
              Ordine Confermato con Successo!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              L'articolo è stato riservato atomicamente. L'annuncio a schermo è ora contrassegnato come <strong>VENDUTO</strong>.
            </p>

            <div style={{
              background: 'rgba(11, 15, 23, 0.6)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-subtle)',
              textAlign: 'left',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>ID Ordine:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>#{completedOrder.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Totale Pagato:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>€{completedOrder.totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Spedizione a:</span>
                <span style={{ fontWeight: 600 }}>{completedOrder.shippingAddress}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCompletedOrder(null);
                onClose();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Torna al Catalogo Aggiornato
            </button>
          </div>
        ) : (
          /* Form POST 2 */
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            {errorMessage && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: '#fb7185',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
              }}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Riepilogo Articolo */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(11, 15, 23, 0.5)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.25rem',
            }}>
              <img
                src={listing.imageUrl}
                alt={listing.title}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  {listing.title}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Venduto da: <strong>{listing.sellerUsername}</strong> • {listing.packagingStatus}
                </div>
              </div>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: 'var(--accent-amber)',
                fontFamily: 'var(--font-display)',
              }}>
                €{listing.price.toFixed(2)}
              </div>
            </div>

            {/* Campo Indirizzo Spedizione */}
            <div className="form-group">
              <label className="form-label">Indirizzo di Consegna Completo *</label>
              <textarea
                required
                rows={3}
                className="form-textarea"
                placeholder="Via/Piazza, Civico, CAP, Città, Provincia, Telefono per corriere"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>

            {/* Garanzie Transazionali */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.75rem',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: '#bae6fd',
              marginBottom: '1.25rem',
            }}>
              <ShieldCheck size={20} color="var(--accent-cyan)" />
              <span>Transazione Protetto RetroTrade: riserva esclusiva del pezzo con blocco atomico.</span>
            </div>

            {/* Bottoni Form */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1rem',
            }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Annulla
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Elaborazione Transazione...' : `Conferma Ordine (€${listing.price.toFixed(2)})`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
