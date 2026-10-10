import {
  AdminMetricsDTO,
  CategoryDTO,
  FilterParams,
  ListingCreateDTO,
  ListingDetailDTO,
  ListingSummaryDTO,
  OrderCreateDTO,
  OrderDetailDTO,
  OrderSummaryDTO,
  PlatformDTO,
  ReviewCreateDTO,
  ReviewDTO,
  UserDTO,
  AuthResponseDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
} from '../types';

const API_BASE = 'http://localhost:8080/api';

/**
 * Gestione centralizzata degli errori HTTP e parsing JSON.
 * Utilizza la logica di controllo status con catch/then nelle chiamate API.
 */
function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 404) {
    return Promise.reject(new Error('404: Risorsa non trovata o rimossa.'));
  }
  if (res.status === 401) {
    return Promise.reject(new Error('401: Accesso non autorizzato. Effettua il login.'));
  }
  if (res.status === 409) {
    return res.json().then(
      (err) => Promise.reject(new Error(err.message || '409: Conflitto! L\'articolo è già stato venduto o non è disponibile.')),
      () => Promise.reject(new Error('409: Conflitto di disponibilità risorsa.'))
    );
  }
  if (!res.ok) {
    return res.json().then(
      (err) => Promise.reject(new Error(err.message || `Errore HTTP ${res.status}`)),
      () => Promise.reject(new Error(`Errore HTTP ${res.status}`))
    );
  }
  if (res.status === 204) {
    return Promise.resolve({} as T);
  }
  return res.json();
}

/**
 * Helper per creare gli header contestuali con credenziali dell'utente attivo.
 */
function getHeaders(currentUser?: UserDTO | null): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (currentUser) {
    headers['X-User-Id'] = currentUser.id.toString();
    headers['X-User-Role'] = currentUser.role;
  }
  return headers;
}

export const api = {
  // Piattaforme e Categorie
  getPlatforms(generation?: number): Promise<PlatformDTO[]> {
    const url = generation ? `${API_BASE}/platforms?generation=${generation}` : `${API_BASE}/platforms`;
    return fetch(url)
      .then((res) => handleResponse<PlatformDTO[]>(res))
      .catch((err) => {
        console.error('Errore getPlatforms:', err.message);
        throw err;
      });
  },

  getCategories(): Promise<CategoryDTO[]> {
    return fetch(`${API_BASE}/categories`)
      .then((res) => handleResponse<CategoryDTO[]>(res))
      .catch((err) => {
        console.error('Errore getCategories:', err.message);
        throw err;
      });
  },

  // Annunci (Listings)
  getListings(filters: FilterParams = {}): Promise<ListingSummaryDTO[]> {
    const params = new URLSearchParams();
    if (filters.platformId) params.append('platformId', filters.platformId.toString());
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.condition) params.append('condition', filters.condition);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return fetch(`${API_BASE}/listings${query}`)
      .then((res) => handleResponse<ListingSummaryDTO[]>(res))
      .catch((err) => {
        console.error('Errore getListings:', err.message);
        throw err;
      });
  },

  getListingById(id: number): Promise<ListingDetailDTO> {
    return fetch(`${API_BASE}/listings/${id}`)
      .then((res) => handleResponse<ListingDetailDTO>(res))
      .catch((err) => {
        console.error(`Errore getListingById(${id}):`, err.message);
        throw err;
      });
  },

  createListing(dto: ListingCreateDTO, currentUser: UserDTO): Promise<ListingDetailDTO> {
    return fetch(`${API_BASE}/listings`, {
      method: 'POST',
      headers: getHeaders(currentUser),
      body: JSON.stringify(dto),
    })
      .then((res) => handleResponse<ListingDetailDTO>(res))
      .catch((err) => {
        console.error('Errore createListing:', err.message);
        throw err;
      });
  },

  deleteListing(id: number, currentUser: UserDTO): Promise<void> {
    return fetch(`${API_BASE}/listings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(currentUser),
    })
      .then((res) => handleResponse<void>(res))
      .catch((err) => {
        console.error(`Errore deleteListing(${id}):`, err.message);
        throw err;
      });
  },

  getMyListings(currentUser: UserDTO): Promise<ListingSummaryDTO[]> {
    return fetch(`${API_BASE}/listings/my-listings`, {
      headers: getHeaders(currentUser),
    })
      .then((res) => handleResponse<ListingSummaryDTO[]>(res))
      .catch((err) => {
        console.error('Errore getMyListings:', err.message);
        throw err;
      });
  },

  // Ordini (Orders)
  createOrder(dto: OrderCreateDTO, currentUser: UserDTO): Promise<OrderDetailDTO> {
    return fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(currentUser),
      body: JSON.stringify(dto),
    })
      .then((res) => handleResponse<OrderDetailDTO>(res))
      .catch((err) => {
        console.error('Errore createOrder:', err.message);
        throw err;
      });
  },

  getBuyerOrders(currentUser: UserDTO): Promise<OrderSummaryDTO[]> {
    return fetch(`${API_BASE}/orders/buyer`, {
      headers: getHeaders(currentUser),
    })
      .then((res) => handleResponse<OrderSummaryDTO[]>(res))
      .catch((err) => {
        console.error('Errore getBuyerOrders:', err.message);
        throw err;
      });
  },

  cancelOrder(id: number, reason: string, currentUser: UserDTO): Promise<OrderDetailDTO> {
    return fetch(`${API_BASE}/orders/${id}/cancel`, {
      method: 'PATCH',
      headers: getHeaders(currentUser),
      body: JSON.stringify({ reason }),
    })
      .then((res) => handleResponse<OrderDetailDTO>(res))
      .catch((err) => {
        console.error(`Errore cancelOrder(${id}):`, err.message);
        throw err;
      });
  },

  addReview(orderId: number, dto: ReviewCreateDTO, currentUser: UserDTO): Promise<ReviewDTO> {
    return fetch(`${API_BASE}/orders/${orderId}/reviews`, {
      method: 'POST',
      headers: getHeaders(currentUser),
      body: JSON.stringify(dto),
    })
      .then((res) => handleResponse<ReviewDTO>(res))
      .catch((err) => {
        console.error(`Errore addReview(${orderId}):`, err.message);
        throw err;
      });
  },

  getSellerReviews(sellerId: number): Promise<ReviewDTO[]> {
    return fetch(`${API_BASE}/orders/seller/${sellerId}/reviews`)
      .then((res) => handleResponse<ReviewDTO[]>(res))
      .catch((err) => {
        console.error(`Errore getSellerReviews(${sellerId}):`, err.message);
        throw err;
      });
  },

  // Admin
  getAdminMetrics(currentUser: UserDTO): Promise<AdminMetricsDTO> {
    return fetch(`${API_BASE}/admin/metrics`, {
      headers: getHeaders(currentUser),
    })
      .then((res) => handleResponse<AdminMetricsDTO>(res))
      .catch((err) => {
        console.error('Errore getAdminMetrics:', err.message);
        throw err;
      });
  },

  createPlatform(dto: { name: string; manufacturer?: string; releaseYear?: number; code?: string; generation?: number }): Promise<PlatformDTO> {
    return fetch(`${API_BASE}/platforms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
      .then((res) => handleResponse<PlatformDTO>(res))
      .catch((err) => {
        console.error('Errore createPlatform:', err.message);
        throw err;
      });
  },

  // Auth / Utenti
  login(dto: LoginRequestDTO): Promise<AuthResponseDTO> {
    return fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
      .then((res) => handleResponse<AuthResponseDTO>(res))
      .catch((err) => {
        console.error('Errore login:', err.message);
        throw err;
      });
  },

  register(dto: RegisterRequestDTO): Promise<AuthResponseDTO> {
    return fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
      .then((res) => handleResponse<AuthResponseDTO>(res))
      .catch((err) => {
        console.error('Errore register:', err.message);
        throw err;
      });
  },

  getAllUsers(): Promise<UserDTO[]> {
    return fetch(`${API_BASE}/auth/users`)
      .then((res) => handleResponse<UserDTO[]>(res))
      .catch((err) => {
        console.error('Errore getAllUsers:', err.message);
        throw err;
      });
  },

  uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(`${API_BASE}/uploads`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => handleResponse<{ url: string; filename: string }>(res))
      .catch((err) => {
        console.error('Errore caricamento file:', err.message);
        throw err;
      });
  },
};

