import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { FilterSidebar } from './components/FilterSidebar';
import { ListingGrid } from './components/ListingGrid';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CreateListingForm } from './components/CreateListingForm';
import { CheckoutOrderModal } from './components/CheckoutOrderModal';
import { UserOrdersView } from './components/UserOrdersView';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { PlatformsWikiView } from './components/PlatformsWikiView';
import { CategoryDTO, FilterParams, ListingDetailDTO, ListingSummaryDTO, OrderDetailDTO, PlatformDTO, UserDTO } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  // Lista utenti di sistema (caricata da backend)
  const [allUsers, setAllUsers] = useState<UserDTO[]>([]);

  // Utente attivo: NULL all'avvio, nessun account collegato finché l'utente non effettua il login
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);

  // Viste attive nella SPA: 'home', 'catalog', 'platforms', 'orders', 'admin'
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'platforms' | 'orders' | 'admin'>('home');

  // Dati di dominio condivisi
  const [platforms, setPlatforms] = useState<PlatformDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [listings, setListings] = useState<ListingSummaryDTO[]>([]);
  const [userOrdersCount, setUserOrdersCount] = useState<number>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Filtri catalogo
  const [filters, setFilters] = useState<FilterParams>({});

  // Stati di caricamento ed errore
  const [isLoadingListings, setIsLoadingListings] = useState<boolean>(true);
  const [listingsError, setListingsError] = useState<string | null>(null);

  // Stati modali
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
  const [checkoutListing, setCheckoutListing] = useState<ListingSummaryDTO | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Caricamento iniziale di tassonomie hardware, categorie e lista utenti da Spring Boot
  useEffect(() => {
    api.getAllUsers()
      .then((users) => {
        if (users && users.length > 0) {
          setAllUsers(users);
        }
      })
      .catch((err) => console.warn('Caricamento utenti backend:', err.message));

    api.getPlatforms()
      .then((data) => setPlatforms(data))
      .catch((err) => console.error('Errore getPlatforms:', err.message));

    api.getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Errore getCategories:', err.message));
  }, []);

  // Ricarica il contatore ordini reale dal backend se l'utente è loggato
  useEffect(() => {
    if (!currentUser) {
      setUserOrdersCount(0);
      return;
    }
    api.getBuyerOrders(currentUser)
      .then((orders) => setUserOrdersCount(orders.length))
      .catch(() => setUserOrdersCount(0));
  }, [currentUser]);

  // Funzione per caricare gli annunci con i filtri correnti
  const fetchListings = () => {
    setIsLoadingListings(true);
    setListingsError(null);

    // Chiamata API con pattern .then() e .catch()
    api.getListings(filters)
      .then((data) => {
        setListings(data);
      })
      .catch((err: Error) => {
        setListingsError(err.message || 'Errore nel recupero degli annunci.');
      })
      .finally(() => {
        setIsLoadingListings(false);
      });
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  /**
   * REQUISITO ESAME: Comunicazione tra componenti fratelli tramite il genitore.
   * Il componente fratello CreateListingForm invoca onListingCreated.
   * Il genitore App aggiorna 'listings', che viene iniettato come prop nel
   * componente fratello ListingGrid, aggiornandolo a schermo in tempo reale!
   */
  const handleListingCreated = (newListing: ListingDetailDTO) => {
    const summary: ListingSummaryDTO = {
      id: newListing.id,
      title: newListing.title,
      price: newListing.price,
      itemCondition: newListing.itemCondition,
      packagingStatus: newListing.packagingStatus,
      status: newListing.status,
      imageUrl: newListing.imageUrl,
      createdAt: newListing.createdAt,
      platformId: newListing.platform.id,
      platformName: newListing.platform.name,
      platformCode: newListing.platform.code,
      categoryId: newListing.category.id,
      categoryName: newListing.category.name,
      sellerId: newListing.seller.id,
      sellerUsername: newListing.seller.username,
    };

    // Aggiungi in cima alla lista: ListingGrid si re-renderizza istantaneamente
    setListings((prev) => [summary, ...prev]);
    setActiveView('catalog');
  };

  /**
   * REQUISITO ESAME: Modifica dello stato da parte di un componente (CheckoutOrderModal)
   * che muta i dati visualizzati da un ALTRO componente presente sulla pagina (ListingGrid).
   */
  const handleOrderCompleted = (completedOrder: OrderDetailDTO) => {
    setListings((prevListings) =>
      prevListings.map((l) =>
        l.id === completedOrder.listing.id ? { ...l, status: 'SOLD' } : l
      )
    );
    setUserOrdersCount((prev) => prev + 1);
  };

  // Callback per ripristino annuncio ad AVAILABLE se l'ordine viene annullato da UserOrdersView
  const handleOrderCancelled = (_orderId: number, listingId: number) => {
    setListings((prevListings) =>
      prevListings.map((l) =>
        l.id === listingId ? { ...l, status: 'AVAILABLE' } : l
      )
    );
  };

  // Eliminazione / Revoca annuncio (da ListingCard o AdminDashboard)
  const handleListingDeleted = (id: number) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserOrdersCount(0);
    if (activeView === 'admin' || activeView === 'orders') {
      setActiveView('home');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Componente Navbar con Home, Catalogo, Ordini, Admin e Login/Logout */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        activeView={activeView}
        onChangeView={setActiveView}
        onOpenCreateListing={() => {
          if (!currentUser) {
            setIsAuthModalOpen(true);
            return;
          }
          setIsCreateModalOpen(true);
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        ordersCount={userOrdersCount}
      />

      <main style={{ flexGrow: 1 }}>
        {/* VISTA 1: HOME PAGE DEDICATA (INDEX) */}
        {activeView === 'home' && (
          <HomePage
            platforms={platforms}
            recentListings={listings}
            onNavigateToCatalog={(platformId) => {
              if (platformId) {
                setFilters({ platformId });
              } else {
                setFilters({});
              }
              setActiveView('catalog');
            }}
            onViewListing={(id) => setSelectedListingId(id)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            isLoggedIn={!!currentUser}
          />
        )}

        {/* VISTA 2: CATALOGO COMPLETO CON FILTRI E GRIGLIA */}
        {activeView === 'catalog' && (
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '2rem 1.5rem 4rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 300px) 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}>
            {/* Sidebar Filtri */}
            <FilterSidebar
              platforms={platforms}
              categories={categories}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters({})}
            />

            {/* Griglia Annunci */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    Catalogo Videogiochi & Console Vintage
                  </h1>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {listings.length} {listings.length === 1 ? 'articolo disponibile' : 'articoli disponibili'}
                  </span>
                </div>
              </div>

              <ListingGrid
                listings={listings}
                currentUser={currentUser}
                isLoading={isLoadingListings}
                error={listingsError}
                onViewDetails={(id) => setSelectedListingId(id)}
                onInitiateCheckout={(item) => {
                  if (!currentUser) {
                    setIsAuthModalOpen(true);
                  } else {
                    setCheckoutListing(item);
                  }
                }}
                onDeleteListing={handleListingDeleted}
                onRetry={fetchListings}
              />
            </div>
          </div>
        )}

        {/* VISTA 3: PIATTAFORME & WIKI HARDWARE */}
        {activeView === 'platforms' && (
          <PlatformsWikiView
            platforms={platforms}
            onSelectPlatform={(platId) => {
              setFilters({ platformId: platId });
              setActiveView('catalog');
            }}
          />
        )}

        {/* VISTA 4: I MIEI ORDINI */}
        {activeView === 'orders' && (
          <UserOrdersView
            currentUser={currentUser}
            onOrderCancelled={handleOrderCancelled}
            onRefreshOrders={() => {
              if (currentUser) {
                api.getBuyerOrders(currentUser)
                  .then((orders) => setUserOrdersCount(orders.length))
                  .catch(() => {});
              }
            }}
            onRequestLogin={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* VISTA 4: PANNELLO ADMIN (Riservato a ROLE_ADMIN) */}
        {activeView === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            listings={listings}
            onListingDeleted={handleListingDeleted}
          />
        )}
      </main>

      {/* Dettaglio Annuncio Modale */}
      <ListingDetailModal
        listingId={selectedListingId}
        currentUser={currentUser}
        onClose={() => setSelectedListingId(null)}
        onInitiateCheckout={(item) => {
          setSelectedListingId(null);
          if (!currentUser) {
            setIsAuthModalOpen(true);
          } else {
            setCheckoutListing(item);
          }
        }}
      />

      {/* Form Creazione Annuncio */}
      <CreateListingForm
        currentUser={currentUser}
        platforms={platforms}
        categories={categories}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onListingCreated={handleListingCreated}
        onPlatformAdded={(newPlatform) => setPlatforms((prev) => [...prev, newPlatform])}
        onRequestLogin={() => {
          setIsCreateModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      {/* AuthModal: Login e Registrazione */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        allUsers={allUsers}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setAllUsers((prev) => {
            const exists = prev.find((u) => u.id === user.id);
            return exists ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user];
          });
        }}
      />

      {/* Checkout Modal */}
      <CheckoutOrderModal
        listing={checkoutListing}
        currentUser={currentUser}
        isOpen={!!checkoutListing}
        onClose={() => setCheckoutListing(null)}
        onOrderCompleted={handleOrderCompleted}
        onRequestLogin={() => {
          setCheckoutListing(null);
          setIsAuthModalOpen(true);
        }}
      />

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        background: 'rgba(11, 15, 23, 0.9)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            RetroTrade • Marketplace Specializzato Retro-Gaming & Vintage
          </p>
          <p>
            Spring Boot (Jakarta Web Profile, JPA/Hibernate, H2) + React (Vite, TypeScript, Single Page Application)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
