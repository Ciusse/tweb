# RetroTrade - Documento di Sintesi e Valutazione Architetturale

**Progetto Esteso per l'esame di Tecnologie Web**  
**Autore:** Candidato Esame di Tecnologie Web  
**Estensione:** 1.5 - 2 pagine accademiche

---

## 1. Adeguatezza delle Scelte Tecnologiche

La scelta di combinare **Spring Boot (Java)** sul back-end con **React, Vite e TypeScript** sul front-end risponde a precise motivazioni ingegneristiche:

- **Spring Boot e Jakarta Web Profile:**
  - *Robustezza Transazionale:* la gestione dichiarativa delle transazioni tramite `@Transactional` è vitale per prevenire inconsistenze e race condition nel processo di checkout.
  - *Pattern DTO e Mapper:* l'adozione deliberata di DTO dedicati e classi mapper esplicite disaccoppia il modello di persistenza relazionale dalla rappresentazione HTTP. Ciò scongiura eccezioni di serializzazione pigra (`LazyInitializationException`), previene loop ciclici infiniti nella serializzazione Jackson e riduce il payload scambiato sulla rete trasmettendo solo viste "shallow".
  - *Separazione delle Responsabilità:* l'architettura a tre livelli rigorosi (`@RestController` -> `@Service` -> JPA `Repository`) favorisce la manutenibilità, l'estensibilità e la testabilità del codice sorgente.

- **React con Vite e TypeScript:**
  - *Component-Based Architecture:* la scomposizione in componenti isolati e riutilizzabili consente una chiara separazione delle responsabilità (orchestratore genitore, viste di presentazione, modali di input).
  - *Lifting State Up:* la comunicazione tra componenti fratelli mediata dal genitore comune permette una reattività immediata della UI, evitando l'eccessiva complessità di librerie di state management esterne in contesti mirati.
  - *Type Safety con TypeScript:* la definizione di contratti di interfaccia rigorosi per le strutture dati ricevute dalle API abbatte la classe di errori legata all'accesso a proprietà non definite a runtime.

---

## 2. Strategie di Deployment e Scalabilità

L'applicazione è architettata per consentire il deployment containerizzato mediante **Docker**:
1. **Front-end Container:** build ottimizzata statica prodotta con `npm run build` e servita tramite un server web **Nginx**. La configurazione Nginx include regole di riscrittura URL per il routing SPA (`try_files $uri /index.html`) e gestione delle intestazioni di caching per gli asset con hash univoco.
2. **Back-end Container:** immagine multi-stage con compilazione Maven e runtime leggero su OpenJDK 21/Temurin JRE. Il container espone la porta 8080 e acquisisce parametri sensibili (credenziali DB, profili attivi) mediante variabili d'ambiente.
3. **Database Container:** istanza PostgreSQL o MySQL con volumi montati esternamente per garantire la persistenza dei dati. Per sessioni di sviluppo e collaudo didattico immediato, Spring Boot è equipaggiato con database in-memory H2 con console abilitata e pre-popolamento automatico (`DataInitializer`).

La totale separazione stateless tra front-end e back-end consente di scalare orizzontalmente le istanze dell'API Spring Boot dietro un load balancer senza necessità di condivisione di sessioni sticky.

---

## 3. Strumenti Futuri ed Evoluzione del Progetto

In un'ottica di evoluzione industriale del prodotto, l'architettura è predisposta per accogliere:
- **Websocket / STOMP:** implementazione di canali bidirezionali per l'aggiornamento istantaneo del catalogo senza polling (invio automatico di notifiche ai client quando un annuncio viene venduto o subisce una variazione di prezzo).
- **Integrazione Gateway di Pagamento (Stripe API):** gestione di pagamenti con garanzia escrow, in cui il denaro dell'acquirente viene trattenuto dalla piattaforma fino alla conferma di ricezione dell'oggetto d'epoca.
- **Motore di Ricerca Full-Text Distribuito:** adozione di Elasticsearch o Meilisearch per abilitare ricerche con tolleranza d'errore (fuzzy search) su titoli, anni di pubblicazione e codici seriali delle cartucce.

---

## 4. Problematiche di Rete, Sicurezza e Responsiveness

### Problematiche di Rete
- **Minimizzazione del Payload:** l'impiego di DTO "shallow" assicura che le query sul catalogo restituiscano solo le informazioni strettamente necessarie alla renderizzazione delle card, rimandando il recupero di dati accessori (descrizioni prolisse, storico ordini) a chiamate puntuali su domanda (`/api/listings/{id}`).
- **Gestione Fallimenti e Resilienza:** tutte le interazioni di rete del client adottano catene di promise basate su `.then()` e `.catch()` per intercettare disconnessioni o risposte 404/401/500, informando l'utente tramite interfacce informative ed evitando freeze dell'interfaccia.

### Sicurezza Applicativa
- **Role-Based Access Control (RBAC):** differenziazione netta tra `ROLE_USER` (operazioni ordinarie di vendita e acquisto) e `ROLE_ADMIN` (operazioni privilegiate di censimento piattaforme, revoca forzata annunci e consultazione metriche aziendali).
- **Protezione da Injection:** l'uso esclusivo di costrutti Spring Data JPA e HQL parametrizzato neutralizza i vettori di attacco di tipo SQL Injection.
- **Sanitizzazione XSS:** il motore JSX di React esegue l'auto-escaping automatico delle stringhe prima dell'inserimento nel DOM, impedendo l'esecuzione di script malevoli nelle descrizioni dei prodotti.
- **CORS e Intestazioni:** il backend configura esplicitamente `CorsConfigurationSource` per circoscrivere l'accesso agli origin autorizzati.

### Responsiveness
L'interfaccia adotta un layout responsivo a griglia fluida:
- Su dispositivi mobili (smartphone < 768px), i filtri laterali collassano in un pannello a scomparsa e la griglia si dispone a colonna singola con target tattili minimi di 44x44 pixel.
- Su monitor desktop (> 1024px), l'interfaccia espande la barra dei filtri in posizione sticky e organizza gli annunci in una griglia multi-colonna ad alta densità informativa.

---

## 5. Ricadute su Accessibilità (a11y) ed Inclusività

La progettazione dell'interfaccia ottempera alle raccomandazioni **WCAG 2.1 (Web Content Accessibility Guidelines) livello AA**:
- **Contrasti Cromatici:** la combinazione di colori rétro è stata calibrata per garantire un rapporto di contrasto pari ad almeno 4.5:1 per il testo ordinario e 3:1 per elementi grafici interattivi.
- **Navigazione da Tastiera:** tutti i controlli interattivi (campi form, pulsanti d'acquisto, schede catalogo) sono raggiungibili mediante navigazione sequenziale da tastiera (`Tab` / `Shift+Tab`) con anelli di focus evidenti (`focus-visible`).
- **Supporto Screen Reader:** impiego sistematico di tag semantici HTML5 (`<header>`, `<main>`, `<aside>`, `<article>`), associazione biunivoca `<label for="...">` nei form e introduzione di attributi ARIA (`aria-modal="true"`, `aria-live="polite"`) per annunciare dinamicamente gli aggiornamenti asincroni del catalogo a utenti ipovedenti o non vedenti.
