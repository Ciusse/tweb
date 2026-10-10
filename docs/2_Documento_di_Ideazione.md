# RetroTrade - Documento di Ideazione e Analisi dei Requisiti

**Progetto Esteso per l'esame di Tecnologie Web**  
**Autore:** Candidato Esame di Tecnologie Web  
**Argomento:** Piattaforma per la Compravendita Specializzata di Retro-Gaming  

---

## 1. Identificazione e Profilazione degli Attori

Il sistema riconosce e gestisce quattro distinte categorie di attori (tre umane e una architetturale):

1. **Visitatore Anonimo (Guest):**
   - Utente sprovvisto di credenziali attive o non loggato.
   - Può effettuare ricerche full-text e applicare filtri di catalogo (piattaforma, prezzo, condizione).
   - Può consultare la scheda dettagliata degli articoli senza visualizzare dati sensibili di contatto.
   - Viene reindirizzato al login qualora tenti di eseguire operazioni di acquisto o inserimento dati.

2. **Utente Base Autenticato (Registered User - Buyer & Seller):**
   - Utente con ruolo standard `ROLE_USER`.
   - Agisce indifferentemente come compratore o venditore all'interno dello stesso account.
   - Come venditore: compila schede di vendita strutturate con specifiche collezionistiche (stato box, manuale, condizione hardware), modifica i propri annunci e ne controlla lo stato.
   - Come acquirente: acquista annunci disponibili mediante processo transazionale atomico, monitora i propri ordini ed esprime recensioni quantitative e qualitative sui venditori.

3. **Amministratore di Sistema (System Administrator / Moderator):**
   - Utente dotato di credenziali privilegiate `ROLE_ADMIN`.
   - Dispone di una dashboard dedicata con telemetria e metriche globali (volume transato, ordini evasi, annunci totali).
   - Ha la facoltà di revocare o eliminare qualsiasi annuncio ritenuto non conforme, fraudolento o contraffatto.
   - Può ispezionare l'intero log degli ordini e delle recensioni della piattaforma.

4. **Sistema Backend (Spring Transaction Engine):**
   - Attore software responsabile dell'integrità referenziale del database relazionale, dell'applicazione delle regole di business e dell'emissione di DTO "shallow" privi di cicli di serializzazione.

---

## 2. Scenari d'Uso Tipici

### Scenario 1: Esplorazione Parametrica del Catalogo
Un collezionista accede alla home page di RetroTrade. Tramite il componente `FilterSidebar`, seleziona la piattaforma "Nintendo 64", imposta il filtro di packaging su "CIB (Complete In Box)" e imposta un tetto di spesa massimo pari a 120,00€. Il client React invia una richiesta HTTP `GET /api/listings?platformId=...&packagingStatus=CIB&maxPrice=120`. Il backend Spring Boot esegue una query ottimizzata tramite `ListingRepository` e restituisce una collezione compattata di `ListingSummaryDTO`. Il componente `ListingGrid` aggiorna la vista istantaneamente senza provocare il ricaricamento del DOM della pagina.

### Scenario 2: Pubblicazione Specialistica di un Lotto Raro
Un utente registrato decide di mettere in vendita una copia di *Castlevania: Symphony of the Night* per PlayStation 1. Accede al form di inserimento, seleziona la console "Sony PlayStation", specifica lo stato del packaging ("CIB"), il grading delle condizioni fisiche ("MINT - Eccellente") e un prezzo di 180,00€. Il client esegue la validazione dei vincoli e invia una richiesta `POST /api/listings`. Il backend persiste la nuova entità con stato `AVAILABLE` e restituisce il relativo DTO. Il componente genitore `App.tsx` cattura la risposta positiva e inserisce il nuovo articolo in cima alla griglia visibile all'utente.

### Scenario 3: Audit e Moderazione Piattaforma da parte dell'Admin
Un amministratore si collega con credenziali di moderazione. Nel menù di navigazione si attiva la voce riservata "Admin Dashboard". L'amministratore consulta le metriche aggregate emesse da `GET /api/admin/metrics`. Individuato un annuncio sospetto o duplicato, seleziona l'azione "Revoca Annuncio", inviando una `DELETE /api/listings/{id}` al server. Lo stato dell'annuncio viene marcato come `REMOVED` e la griglia pubblica lo esclude tempestivamente.

---

## 3. Casi d'Uso Complessi (Analisi Passo-Passo)

### 3.1 CASO D'USO COMPLESSO 1 (UC-01): Creazione e Validazione di un Annuncio con Tassonomia Collezionistica

- **Attore Primario:** Utente Base Autenticato (`ROLE_USER`).
- **Precondizioni:** L'utente ha una sessione autenticata attiva; il client ha caricato i vocabolari controllati delle Piattaforme e delle Categorie.
- **Postcondizioni:** Un nuovo record `Listing` è salvato con stato `AVAILABLE`, collegato alle chiavi esterne di utente, piattaforma e categoria.

#### Flusso Principale (Passo-Passo):
1. L'utente preme il pulsante "Nuovo Annuncio" nella barra superiore.
2. Il componente `CreateListingForm` viene renderizzato a schermo.
3. L'utente compila i dati obbligatori:
   - Titolo annuncio (stringa tra 5 e 120 caratteri).
   - Descrizione estesa dell'oggetto.
   - Piattaforma di appartenenza (selezionata da dropdown popolato dinamicamente tramite `GET /api/platforms`).
   - Categoria merceologica (selezionata da dropdown via `GET /api/categories`).
   - Stato conservativo (`MINT`, `GOOD`, `FAIR`, `FOR_PARTS`).
   - Stato confezione (`CIB`, `BOX_ONLY`, `MANUAL_ONLY`, `LOOSE`).
   - Prezzo in Euro (valore numerico maggiore di 0.00).
   - URL dell'immagine fotografica del pezzo reale.
4. L'utente clicca su "Pubblica Annuncio".
5. Il client React esegue validazione sintattica locale. Se superata, effettua una chiamata asincrona `POST /api/listings` veicolando un payload JSON strutturato secondo l'interfaccia `ListingCreateDTO`.
6. Il controller Spring `ListingController` intercetta la richiesta e invoca la validazione Jakarta Bean Validation (`@Valid`).
7. Il servizio di dominio `ListingService` riceve il DTO e svolge le verifiche di consistenza:
   - Risoluzione dell'identità dell'utente autenticato (estratto da contesto di sicurezza o header).
   - Verifica di esistenza delle entità correlate `Platform` e `Category` nei rispettivi repository.
   - Inizializzazione della nuova istanza `Listing` con data corrente e stato `AVAILABLE`.
8. Il repository JPA esegue l'inserimento persistente nel database relazionale.
9. La classe mapper `ListingMapper` converte l'entità persistita in un `ListingResponseDTO` "shallow", contenente solo i campi essenziali per la vista, troncando la catena delle relazioni per evitare payload ridondanti o cicli di serializzazione.
10. Il controller restituisce lo status HTTP `201 Created` insieme al DTO nel body.
11. Il client React riceve il codice di successo 201 nel blocco `.then()`, pulisce i campi del form e invoca la callback `onListingCreated(newListing)` fornita dal componente genitore `App.tsx`.
12. Il componente `App.tsx` aggiorna la lista condivisa e ordina al componente fratello `ListingGrid` di mostrare immediatamente il nuovo articolo tra i risultati.

#### Flussi Alternativi ed Eccezioni:
- **3a. Validazione Client Fallita:** se uno o più campi obbligatori sono omessi, il client visualizza messaggi di errore inline e interrompe l'invio della richiesta.
- **6a. Payload Server non conforme (400 Bad Request):** se un parametro vìola le annotazioni di validazione, `GlobalExceptionHandler` restituisce una mappa JSON con i singoli errori di validazione.
- **7a. Piattaforma o Categoria inesistente (404 Not Found):** `ListingService` solleva `ResourceNotFoundException`. Il controller risponde con status 404. Il client intercetta l'errore nel blocco `.catch()` ed espone un messaggio di notifica toast.
- **7b. Utente non autorizzato (401 Unauthorized):** la richiesta viene respinta e il client reindirizza alla schermata di accesso.

---

### 3.2 CASO D'USO COMPLESSO 2 (UC-02): Transazione d'Acquisto con Riserva Atomica e Creazione Ordine Multi-Stato

- **Attore Primario:** Utente Base Autenticato (`ROLE_USER`).
- **Precondizioni:** L'annuncio selezionato ha stato `AVAILABLE` ed appartiene a un venditore diverso dall'acquirente.
- **Postcondizioni:** Lo stato dell'annuncio transita atomicamente a `SOLD`; viene creata l'entità `Order` nello stato `PENDING`; l'articolo non è più acquistabile da altri utenti.

#### Flusso Principale (Passo-Passo):
1. L'utente visualizza un annuncio nel catalogo e clicca sulla card per aprirne la scheda informativa `ListingDetailModal`.
2. Nella scheda, l'utente preme il bottone "Acquista Subito".
3. L'applicazione apre il modale dedicato `CheckoutOrderModal` (secondo form POST del sistema).
4. Il modale mostra il riepilogo dell'oggetto (titolo, prezzo, spese stimate) e presenta il campo per l'indirizzo di spedizione completo.
5. L'utente inserisce l'indirizzo e clicca su "Conferma Acquisto".
6. Il client React invia una richiesta HTTP `POST /api/orders` con il payload `OrderCreateDTO` (`listingId`, `shippingAddress`).
7. Il controller `OrderController` riceve la richiesta e ne delega l'elaborazione al metodo transazionale `createOrder()` di `OrderService` (contrassegnato da `@Transactional`).
8. `OrderService` esegue la logica transazionale di controllo e lock applicativo:
   - Carica l'entità `Listing` tramite `ListingRepository`. Se inesistente, solleva `ResourceNotFoundException` (HTTP 404).
   - Verifica che l'acquirente non coincida con il venditore (`buyer.getId() != listing.getSeller().getId()`). In caso di coincidenza, solleva `IllegalOperationException` (HTTP 400).
   - Verifica la disponibilità dell'annuncio: se il campo `status` è diverso da `AVAILABLE` (es. già acquistato o rimosso), solleva `ListingAlreadySoldException` (HTTP 409 Conflict).
   - Muta atomicamente lo stato di `Listing` in `SOLD`.
   - Istanzia l'entità `Order` valorizzando data corrente, prezzo totale congelato al momento dell'acquisto, indirizzo di spedizione, stato ordine `PENDING` e riferimenti ad acquirente e annuncio.
   - Persiste sia l'ordine che l'aggiornamento dell'annuncio nel database.
9. `OrderMapper` converte l'entità `Order` in `OrderResponseDTO` shallow.
10. Il server restituisce HTTP `201 Created` con il payload dell'ordine.
11. Il client React riceve il codice 201:
    - `CheckoutOrderModal` visualizza la schermata di conferma acquisto con codice ordine.
    - Notifica il genitore `App.tsx` invocando `onOrderPlaced(order)`.
    - `App.tsx` aggiorna lo stato dell'annuncio nella lista globale, impostandolo come venduto.
    - Il componente fratello `ListingGrid` riflette istantaneamente la modifica: il pulsante d'acquisto sulla card viene disabilitato e sostituito dal badge grafico "VENDUTO".

#### Flussi Alternativi ed Eccezioni:
- **8a. Corsa Critica / Concurrency Conflict (409 Conflict):** se un altro utente ha finalizzato l'acquisto una frazione di secondo prima, lo stato dell'annuncio risulterà già `SOLD`. Il server intercetta la condizione di gara e risponde con HTTP 409. Il client cattura l'eccezione nel blocco `.catch()` ed emette un avviso esplicito all'utente (*"Spiacenti, l'articolo è stato appena acquistato da un altro utente"*).
- **8b. Autocompravebdita Vietata (400 Bad Request):** se un utente prova ad acquistare un proprio annuncio, il server solleva un'eccezione di logica di dominio che viene restituita come errore 400 al client.
