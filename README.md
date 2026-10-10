# RetroTrade - Marketplace per il Collezionismo Retro-Gaming

Progetto Esteso per l'esame di **Tecnologie Web** (Voto target: **30/30**).

---

## Struttura della Soluzione

```
PROGETTO_NUOVO/
├── docs/                               # FASE 1: I 3 Documenti Ufficiali d'Esame
│   ├── 1_Documento_di_Visione.md       # Visione (265 parole, utenza, benefit, RAEE)
│   ├── 2_Documento_di_Ideazione.md     # Ideazione (Attori, Scenari, 2 Casi d'Uso Complessi)
│   └── 3_Documento_di_Sintesi.md       # Sintesi (Framework, Deployment, Sicurezza, a11y)
│
├── backend/                            # FASE 2 & FASE 3: Spring Boot REST Backend
│   ├── pom.xml                         # Maven, Java 21, Spring Boot 3.3.4, JPA, H2, Validation
│   └── src/main/java/com/retrotrade/
│       ├── model/                      # 6 JPA @Entity (User, Platform, Category, Listing, Order, Review)
│       ├── repository/                 # 6 Spring Data JPA Repositories
│       ├── dto/                        # DTO compatti ("shallow") per disaccoppiamento viste
│       ├── mapper/                     # Mappers per conversione Entity <-> DTO shallow
│       ├── service/                    # 4 @Service (ListingService, OrderService, PlatformService, AdminDashboardService)
│       ├── controller/                 # 4 @RestController (15 Route REST con query, path, body)
│       ├── exception/                  # GlobalExceptionHandler (404, 401, 400, 500 con stack trace)
│       └── config/                     # CORS WebMvc e DataInitializer con seed retrogaming
│
└── frontend/                           # FASE 4: React + Vite + TypeScript SPA
    ├── package.json
    ├── src/
    │   ├── types/index.ts              # Interfacce TypeScript speculari ai DTO
    │   ├── services/api.ts             # Fetch API con gestione errori then/catch (404, 401, 500)
    │   ├── components/                 # 10 Componenti React distinti
    │   │   ├── Navbar.tsx              # Header, switch utente (User/Admin), badge ordini
    │   │   ├── HeroSection.tsx         # Banner d'impatto con indicatori di piattaforma
    │   │   ├── FilterSidebar.tsx       # Filtro per console, categorie, grading e prezzo
    │   │   ├── ListingGrid.tsx         # Griglia reattiva con gestione stati loading/empty
    │   │   ├── ListingCard.tsx         # Card articolo con badge CIB/Loose e azioni
    │   │   ├── ListingDetailModal.tsx  # Scheda tecnica completa del lotto
    │   │   ├── CreateListingForm.tsx   # [FORM POST 1] Pubblicazione annuncio
    │   │   ├── CheckoutOrderModal.tsx  # [FORM POST 2] Finalizzazione ordine con riserva atomica
    │   │   ├── UserOrdersView.tsx      # Storico ordini, recesso e recensioni 5 stelle
    │   │   └── AdminDashboard.tsx      # Dashboard telemetria KPI e moderazione per ROLE_ADMIN
    │   ├── App.tsx                     # Componente Genitore: orchestrazione e sibling communication
    │   └── index.css                   # Design System moderno, dark mode e responsive
```

---

## Come Avviare l'Applicazione

### 1. Avviare il Back-end (Spring Boot)
Requisiti: Java 21+ e Maven (oppure wrapper).
```bash
cd backend
mvn spring-boot:run
```
- Endpoint API: `http://localhost:8080/api`
- Console Database H2: `http://localhost:8080/h2-console`  
  - JDBC URL: `jdbc:h2:mem:retrotradedb`
  - Username: `sa` | Password: *(vuota)*

### 2. Avviare il Front-end (React + Vite)
Requisiti: Node.js 18+.
```bash
cd frontend
npm install
npm run dev
```
- Interfaccia Web SPA: `http://localhost:5173`

---

## Account Pre-configurati per la Demo d'Esame

La barra di navigazione superiore (`Navbar`) include un comodo selettore a tendina per cambiare istantaneamente l'identità dell'utente simulato:
1. **`mario_retrogamer`** (`ROLE_USER` - Utente Base venditore/compratore)
2. **`luigi_collector`** (`ROLE_USER` - Utente Base venditore/compratore)
3. **`admin_bowser`** (`ROLE_ADMIN` - Amministratore di Sistema con accesso alla Dashboard Admin e revoca inserzioni)
