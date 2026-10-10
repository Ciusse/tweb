import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, Plus, Check, Star, Wrench, Package, BookOpen, Disc, Link as LinkIcon, FileUp, UploadCloud } from 'lucide-react';
import { CategoryDTO, ItemCondition, ListingCreateDTO, ListingDetailDTO, PackagingStatus, PlatformDTO, UserDTO } from '../types';
import { api } from '../services/api';

interface CreateListingFormProps {
  currentUser: UserDTO | null;
  platforms: PlatformDTO[];
  categories: CategoryDTO[];
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: (newListing: ListingDetailDTO) => void;
  onPlatformAdded?: (newPlatform: PlatformDTO) => void;
  onRequestLogin?: () => void;
}

export const CreateListingForm: React.FC<CreateListingFormProps> = ({
  currentUser,
  platforms,
  categories,
  isOpen,
  onClose,
  onListingCreated,
  onPlatformAdded,
  onRequestLogin,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [platformId, setPlatformId] = useState<number>(platforms[0]?.id || 1);
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [itemCondition, setItemCondition] = useState<ItemCondition>('GOOD');
  const [packagingStatus, setPackagingStatus] = useState<PackagingStatus>('CIB');
  const [imageUrl, setImageUrl] = useState('');

  // Scelta media: Link URL o Caricamento File (qualsiasi tipo)
  const [mediaSourceType, setMediaSourceType] = useState<'url' | 'file'>('url');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Sotto-form per aggiungere una nuova piattaforma se non esiste
  const [isAddingNewPlatform, setIsAddingNewPlatform] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformManufacturer, setNewPlatformManufacturer] = useState('Nintendo');
  const [newPlatformYear, setNewPlatformYear] = useState('1995');
  const [isSavingPlatform, setIsSavingPlatform] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFile(true);
    setErrorMessage(null);

    api.uploadFile(file)
      .then((res) => {
        setIsUploadingFile(false);
        setImageUrl(res.url);
        setUploadedFileName(file.name);
      })
      .catch((err: Error) => {
        setIsUploadingFile(false);
        setErrorMessage('Errore nel caricamento del file: ' + err.message);
      });
  };

  if (!isOpen) return null;

  const handleCreatePlatform = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newPlatformName.trim()) {
      alert('Inserisci il nome della piattaforma/console.');
      return;
    }

    setIsSavingPlatform(true);
    api.createPlatform({
      name: newPlatformName.trim(),
      manufacturer: newPlatformManufacturer.trim(),
      releaseYear: parseInt(newPlatformYear) || 1995,
      generation: 5,
    })
      .then((createdPlatform) => {
        setIsSavingPlatform(false);
        if (onPlatformAdded) onPlatformAdded(createdPlatform);
        setPlatformId(createdPlatform.id);
        setIsAddingNewPlatform(false);
        setNewPlatformName('');
      })
      .catch((err: Error) => {
        setIsSavingPlatform(false);
        alert('Errore creazione piattaforma: ' + err.message);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentUser) {
      setErrorMessage('Devi aver effettuato l\'accesso prima di pubblicare un annuncio.');
      if (onRequestLogin) onRequestLogin();
      return;
    }

    if (!title.trim() || title.length < 3) {
      setErrorMessage('Il titolo deve contenere almeno 3 caratteri.');
      return;
    }
    if (!description.trim() || description.length < 5) {
      setErrorMessage('La descrizione deve contenere almeno 5 caratteri.');
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Inserisci un prezzo valido superiore a €0.00.');
      return;
    }

    const payload: ListingCreateDTO = {
      title: title.trim(),
      description: description.trim(),
      price: parsedPrice,
      platformId,
      categoryId,
      itemCondition,
      packagingStatus,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    };

    setIsSubmitting(true);

    api.createListing(payload, currentUser)
      .then((createdListing) => {
        setIsSubmitting(false);
        onListingCreated(createdListing);
        onClose();
      })
      .catch((err: Error) => {
        setIsSubmitting(false);
        console.error('Errore creazione annuncio:', err.message);
        setErrorMessage(err.message || 'Errore durante la creazione dell\'annuncio sul server.');
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header Form */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Pubblica un Nuovo Annuncio</h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form POST */}
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

          {/* Titolo */}
          <div className="form-group">
            <label className="form-label">Titolo Annuncio *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="es. Chrono Trigger - PAL SNES con Mappa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 3) Piattaforma Hardware & Bottone Nuova Console se non esiste */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Piattaforma Hardware *</label>
              <button
                type="button"
                onClick={() => setIsAddingNewPlatform(!isAddingNewPlatform)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Plus size={13} />
                {isAddingNewPlatform ? 'Chiudi' : 'Console non in lista? Aggiungila'}
              </button>
            </div>

            {/* Sotto-form per aggiungere nuova console */}
            {isAddingNewPlatform && (
              <div style={{
                margin: '0.5rem 0 1rem',
                padding: '1rem',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.65rem' }}>
                  Censisci una Nuova Piattaforma Console:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'end' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Nome Console</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                      placeholder="es. WonderSwan Color"
                      value={newPlatformName}
                      onChange={(e) => setNewPlatformName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Produttore</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem 0.5rem', fontSize: '0.8rem' }}
                      value={newPlatformManufacturer}
                      onChange={(e) => setNewPlatformManufacturer(e.target.value)}
                    >
                      <option value="Nintendo">Nintendo</option>
                      <option value="Sony">Sony</option>
                      <option value="Sega">Sega</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="SNK">SNK</option>
                      <option value="Atari">Atari</option>
                      <option value="Bandai">Bandai</option>
                      <option value="Altro">Altro</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Anno</label>
                    <input
                      type="number"
                      className="form-input"
                      style={{ padding: '0.5rem 0.5rem', fontSize: '0.8rem' }}
                      value={newPlatformYear}
                      onChange={(e) => setNewPlatformYear(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreatePlatform}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem' }}
                    disabled={isSavingPlatform}
                  >
                    Salva
                  </button>
                </div>
              </div>
            )}

            <select
              className="form-select"
              value={platformId}
              onChange={(e) => setPlatformId(Number(e.target.value))}
            >
              {platforms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.manufacturer} • {p.releaseYear})
                </option>
              ))}
            </select>
          </div>

          {/* 4) Categoria con Selettore Visivo */}
          <div className="form-group">
            <label className="form-label">Categoria Oggetto *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {categories.map((c) => {
                const isSelected = categoryId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setCategoryId(c.id)}
                    className="glass-panel"
                    style={{
                      padding: '0.65rem',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      border: isSelected ? '2px solid var(--accent-violet)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                      {c.name.split('(')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4) Condizione Fisica con Chip/Card Selezionabili */}
          <div className="form-group">
            <label className="form-label">Condizione Fisica Grading *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {[
                { key: 'MINT' as ItemCondition, label: 'MINT', desc: 'Come Nuovo', icon: <Star size={14} color="#34d399" /> },
                { key: 'GOOD' as ItemCondition, label: 'GOOD', desc: 'Ottimo Stato', icon: <Sparkles size={14} color="#38bdf8" /> },
                { key: 'FAIR' as ItemCondition, label: 'FAIR', desc: 'Segni d\'Uso', icon: <Package size={14} color="#fbbf24" /> },
                { key: 'FOR_PARTS' as ItemCondition, label: 'PARTS', desc: 'Per Ricambi', icon: <Wrench size={14} color="#fb7185" /> },
              ].map((cond) => {
                const isSelected = itemCondition === cond.key;
                return (
                  <div
                    key={cond.key}
                    onClick={() => setItemCondition(cond.key)}
                    className="glass-panel"
                    style={{
                      padding: '0.65rem 0.5rem',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontWeight: 800, fontSize: '0.8rem' }}>
                      {cond.icon}
                      {cond.label}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {cond.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4) Stato Confezione con Chip/Card Selezionabili */}
          <div className="form-group">
            <label className="form-label">Integrità Confezione / Packaging *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {[
                { key: 'CIB' as PackagingStatus, label: 'CIB', desc: 'Scatola + Manuale', icon: '🎁' },
                { key: 'LOOSE' as PackagingStatus, label: 'LOOSE', desc: 'Solo Cartuccia/Cd', icon: '🕹️' },
                { key: 'BOX_ONLY' as PackagingStatus, label: 'BOX ONLY', desc: 'Solo Scatola', icon: '📦' },
                { key: 'MANUAL_ONLY' as PackagingStatus, label: 'MANUAL', desc: 'Solo Manuale', icon: '📖' },
              ].map((pack) => {
                const isSelected = packagingStatus === pack.key;
                return (
                  <div
                    key={pack.key}
                    onClick={() => setPackagingStatus(pack.key)}
                    className="glass-panel"
                    style={{
                      padding: '0.65rem 0.5rem',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      border: isSelected ? '2px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '1rem', marginBottom: '0.1rem' }}>{pack.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>{pack.label}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{pack.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prezzo e Media (URL o File di qualsiasi tipo) */}
          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Prezzo (€) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                className="form-input"
                placeholder="49.90"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Media / Allegato</label>
                
                {/* Switcher Tab URL vs FILE */}
                <div style={{
                  display: 'flex',
                  background: 'rgba(11, 15, 23, 0.9)',
                  padding: '2px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <button
                    type="button"
                    onClick={() => setMediaSourceType('url')}
                    style={{
                      background: mediaSourceType === 'url' ? 'var(--accent-cyan)' : 'transparent',
                      color: mediaSourceType === 'url' ? '#090d16' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <LinkIcon size={12} /> Link Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaSourceType('file')}
                    style={{
                      background: mediaSourceType === 'file' ? 'var(--accent-cyan)' : 'transparent',
                      color: mediaSourceType === 'file' ? '#090d16' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <UploadCloud size={12} /> Da File (tutti i formati)
                  </button>
                </div>
              </div>

              {mediaSourceType === 'url' ? (
                <div>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Inserisci il link HTTPS diretto ad un'immagine o risorsa online
                  </span>
                </div>
              ) : (
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      background: isUploadingFile ? 'rgba(56, 189, 248, 0.1)' : 'rgba(15, 23, 42, 0.8)',
                      border: '1px dashed var(--accent-cyan)',
                      borderRadius: 'var(--radius-md)',
                      cursor: isUploadingFile ? 'wait' : 'pointer',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      transition: 'background 0.2s',
                    }}
                  >
                    <FileUp size={18} color="var(--accent-cyan)" />
                    <span>
                      {isUploadingFile
                        ? 'Caricamento in corso sul server...'
                        : uploadedFileName
                        ? `File caricato: ${uploadedFileName}`
                        : 'Scegli un file dal tuo computer (qualsiasi tipo)'}
                    </span>
                    <input
                      type="file"
                      disabled={isUploadingFile}
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Supporta tutti i tipi di file: immagini (PNG, JPG, WEBP), ZIP, ROM, PDF, documentazione, ecc.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Descrizione */}
          <div className="form-group">
            <label className="form-label">Descrizione Dettagliata *</label>
            <textarea
              required
              rows={3}
              className="form-textarea"
              placeholder="Indica dettagli tecnici, integrità dei pin, seriale o eventuali difetti visibili..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Bottoni Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
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
              <Send size={16} />
              {isSubmitting ? 'Pubblicazione in corso...' : 'Pubblica Annuncio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
