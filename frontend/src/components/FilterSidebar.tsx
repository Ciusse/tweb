import React, { useState } from 'react';
import { Filter, RotateCcw, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { CategoryDTO, FilterParams, ItemCondition, PlatformDTO } from '../types';

interface FilterSidebarProps {
  platforms: PlatformDTO[];
  categories: CategoryDTO[];
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  onResetFilters: () => void;
}

// Mappa emoji/icone per manufacturer
const MANUFACTURER_EMOJI: Record<string, string> = {
  Nintendo: '🎮',
  Sony: '🎯',
  Sega: '🌀',
  Microsoft: '🟩',
  SNK: '⚔️',
  Atari: '🕹️',
  Bandai: '🐉',
};

// Colori accent per manufacturer
const MANUFACTURER_COLOR: Record<string, string> = {
  Nintendo: '#e4000f',
  Sony: '#003087',
  Sega: '#17a2b8',
  Microsoft: '#107c10',
  SNK: '#c8a84b',
  Atari: '#f07030',
  Bandai: '#9b59b6',
};

const CATEGORY_EMOJI: Record<string, string> = {
  Videogiochi: '💿',
  'Console': '📺',
  'Accessori': '🕹️',
  'Scatole': '📦',
};

const CONDITION_LABELS: { key: ItemCondition; label: string; desc: string; color: string }[] = [
  { key: 'MINT',      label: 'MINT',     desc: 'Pari al nuovo',    color: '#10b981' },
  { key: 'GOOD',      label: 'GOOD',     desc: 'Buone condizioni', color: '#38bdf8' },
  { key: 'FAIR',      label: 'FAIR',     desc: 'Segni d\'uso',     color: '#fbbf24' },
  { key: 'FOR_PARTS', label: 'PARTS',    desc: 'Per ricambi',      color: '#fb7185' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  platforms,
  categories,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  const handleChange = (key: keyof FilterParams, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  const togglePlatform = (id: number) => {
    handleChange('platformId', filters.platformId === id ? '' : id);
  };

  const toggleCategory = (id: number) => {
    handleChange('categoryId', filters.categoryId === id ? '' : id);
  };

  const toggleCondition = (cond: ItemCondition) => {
    handleChange('condition', filters.condition === cond ? '' : cond);
  };

  const hasActiveFilters =
    !!filters.platformId || !!filters.categoryId || !!filters.condition ||
    (!!filters.maxPrice && filters.maxPrice < 300) || !!filters.search;

  // Ordina piattaforme per produttore e anno
  const sortedPlatforms = [...platforms].sort((a, b) =>
    a.manufacturer.localeCompare(b.manufacturer) || a.releaseYear - b.releaseYear
  );
  const visiblePlatforms = showAllPlatforms ? sortedPlatforms : sortedPlatforms.slice(0, 9);

  return (
    <aside
      style={{
        height: 'fit-content',
        position: 'sticky',
        top: '5.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Header */}
      <div
        className="glass-panel"
        style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
          <Filter size={18} color="var(--accent-cyan)" />
          <span>Filtri Ricerca</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="btn btn-secondary"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--accent-rose)' }}
            title="Ripristina tutti i filtri"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        )}
      </div>

      {/* Ricerca Testuale */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
          🔍 Ricerca Titolo
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Zelda, Castlevania, PS1..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Categorie */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <label className="form-label" style={{ marginBottom: '0.6rem', display: 'block' }}>
          🗂️ Categoria
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {categories.map((c) => {
            const isSelected = filters.categoryId === c.id;
            const emojiKey = Object.keys(CATEGORY_EMOJI).find((k) => c.name.includes(k)) || '';
            const emoji = CATEGORY_EMOJI[emojiKey] || '📁';
            return (
              <button
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                style={{
                  padding: '0.6rem 0.4rem',
                  border: isSelected ? '2px solid var(--accent-violet)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.18s',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.78rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <span style={{ fontSize: '1.15rem' }}>{emoji}</span>
                <span style={{ lineHeight: 1.2 }}>{c.name.split('(')[0].split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Piattaforme */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <label className="form-label" style={{ marginBottom: '0.6rem', display: 'block' }}>
          🕹️ Piattaforma / Console
        </label>

        {/* All button */}
        <button
          onClick={() => handleChange('platformId', '')}
          style={{
            width: '100%',
            padding: '0.45rem',
            marginBottom: '0.5rem',
            border: !filters.platformId ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            background: !filters.platformId ? 'rgba(6,182,212,0.15)' : 'transparent',
            color: !filters.platformId ? 'var(--accent-cyan)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
            transition: 'all 0.18s',
          }}
        >
          Tutte le Piattaforme
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
          {visiblePlatforms.map((p) => {
            const isSelected = filters.platformId === p.id;
            const color = MANUFACTURER_COLOR[p.manufacturer] || '#6366f1';
            const emoji = MANUFACTURER_EMOJI[p.manufacturer] || '🎮';
            return (
              <button
                key={p.id}
                onClick={() => togglePlatform(p.id)}
                title={`${p.name} (${p.manufacturer}, ${p.releaseYear})`}
                style={{
                  padding: '0.5rem 0.3rem',
                  border: isSelected ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? `${color}22` : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.18s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.1rem',
                }}
              >
                <span style={{ fontSize: '0.65rem' }}>{emoji}</span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: isSelected ? '#fff' : '#94a3b8',
                    lineHeight: 1.15,
                    wordBreak: 'break-all',
                  }}
                >
                  {p.code}
                </span>
              </button>
            );
          })}
        </div>

        {sortedPlatforms.length > 9 && (
          <button
            onClick={() => setShowAllPlatforms(!showAllPlatforms)}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              padding: '0.35rem',
              background: 'none',
              border: 'none',
              color: 'var(--accent-cyan)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
            }}
          >
            {showAllPlatforms ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAllPlatforms ? 'Mostra meno' : `Vedi tutte (${sortedPlatforms.length})`}
          </button>
        )}
      </div>

      {/* Condizione */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <label className="form-label" style={{ marginBottom: '0.6rem', display: 'block' }}>
          ⭐ Stato Conservazione
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem' }}>
          {CONDITION_LABELS.map((cond) => {
            const isSelected = filters.condition === cond.key;
            return (
              <button
                key={cond.key}
                onClick={() => toggleCondition(cond.key)}
                style={{
                  padding: '0.5rem 0.35rem',
                  border: isSelected ? `2px solid ${cond.color}` : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? `${cond.color}22` : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.18s',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: isSelected ? cond.color : '#94a3b8' }}>
                  {cond.label}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  {cond.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prezzo Massimo */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="form-label">💰 Prezzo Massimo</label>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
            {filters.maxPrice && filters.maxPrice < 300 ? `€${filters.maxPrice}` : '∞'}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="300"
          step="5"
          value={filters.maxPrice || 300}
          onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--accent-amber)',
            cursor: 'pointer',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          <span>€10</span>
          <span>€150</span>
          <span>€300+</span>
        </div>
      </div>
    </aside>
  );
};
