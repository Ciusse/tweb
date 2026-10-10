# RetroTrade - Documento di Visione

**Autore:** Candidato Esame di Tecnologie Web  
**Corso:** Laurea in Informatica - Ingegneria Informatica  
**Progetto Esteso:** RetroTrade - Marketplace per il Collezionismo Retro-Gaming  
**Estensione:** 265 parole

---

### Descrizione del Sistema
*RetroTrade* è un'applicazione web single-page orientata alla compravendita specialistica di console, videogiochi vintage e accessori d'epoca (dalla terza alla sesta generazione di piattaforme hardware). A differenza dei mercati generalisti, la piattaforma normalizza e certifica ogni inserzione legandola a una tassonomia strutturata che include sistema di destinazione, standard collezionistico della confezione (Complete in Box, Loose, Box Only) e grado di conservazione fisica dell'esemplare.

### Target di Utenza
Il bacino d'utenza comprende:
- **Collezionisti ed appassionati storici**, alla ricerca di trasparenza sullo stato conservativo e unicità dei lotti;
- **Videogiocatori e venditori privati**, che desiderano alienare o valorizzare le proprie collezioni con garanzie transazionali;
- **Amministratori e moderatori**, incaricati di vigilare sulla conformità delle inserzioni, dirimere dispute e monitorare i flussi della piattaforma.

### Benefit Chiave
- **Affidabilità Tassonomica:** catalogazione standardizzata per piattaforma, casa produttrice e variante di packaging;
- **Protezione Transazionale:** lock atomico della risorsa durante il checkout per azzerare collisioni d'acquisto tra compratori concorrenti;
- **Disaccoppiamento DTO Shallow:** ottimizzazione delle risposte JSON server per garantire tempi di caricamento istantanei e basso consumo di banda.

### Ricadute Socio-Economiche ed Ecologiche
Sul piano culturale, *RetroTrade* supporta la salvaguardia del patrimonio storico-digitale dell'intrattenimento interattivo del XX secolo. Sul versante ambientale ed economico, stimola la transizione verso l'economia circolare incoraggiando il riutilizzo, la riparazione e lo scambio di componentistica elettronica obsoleta, contribuendo in modo diretto e quantificabile alla riduzione dei rifiuti di apparecchiature elettriche ed elettroniche (RAEE).
