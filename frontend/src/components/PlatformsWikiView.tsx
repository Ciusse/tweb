import React, { useState } from 'react';
import { PlatformDTO } from '../types';
import { Layers, GitCompare, ArrowRight, Search, X, Shuffle, Sparkles } from 'lucide-react';

interface PlatformsWikiViewProps {
  platforms: PlatformDTO[];
  onSelectPlatform: (platformId: number) => void;
}

// All codes must match exactly what the seeder inserts
const PLATFORM_META: Record<string, {
  color: string; accent: string; emoji: string; cpu: string; ram: string;
  gpu: string; media: string; topGame: string; resolution: string;
  unitsSold: string; score: number; tags: string[];
  funFacts: string[];
  deepDives: string[];
}> = {
  // Nintendo
  'NES':   { 
    color: '#ef4444', accent: '#fca5a5', emoji: '🎮', 
    cpu: 'MOS 6502 (Ricoh 2A03) @ 1.79 MHz', ram: '2 KB RAM + 2 KB VRAM', 
    gpu: 'Ricoh PPU (256x240 px, 25 colori)', media: 'Cartucce ROM (Famicom/NES)', 
    topGame: 'Super Mario Bros. (40.2M)', resolution: '256 x 240',
    unitsSold: '61.9', score: 95, tags: ['Iconico','8-bit','Pioniere del Gaming'],
    funFacts: [
      'Ha salvato da solo l\'industria videoludica dopo il tragico crash del 1983, quando i negozi americani avevano smesso di vendere videogiochi.',
      'In Giappone il Famicom aveva un microfono integrato nel secondo controller, usato per sconfiggere nemici urlando in Legend of Zelda!',
      'Per convincere i negozi americani diffidenti, fu commercializzato con il robot giocattolo R.O.B. spacciandolo come giocattolo elettronico.',
      'La cartuccia "Stadium Events" del 1987 vale oggi oltre 40.000 dollari: meno di 200 copie originali esistono in tutto il mondo.',
      'Shigeru Miyamoto ha dichiarato che Super Mario Bros. fu progettato e completato in circa sei settimane di lavoro intensivo.',
      'Nintendo aveva un numero verde chiamato "Game Counselors" con oltre 100 operatori che rispondevano a domande di gameplay 7 giorni su 7.',
      'Il codice Konami (su su giù giù sinistra destra sinistra destra B A) fu inventato su NES per Gradius e usato nei decenni successivi in migliaia di giochi.',
      'Il "glitch della tartaruga" in Super Mario Bros. permetteva di ottenere vite infinite all\'infinito senza interruzione di corrente.',
      'Il Famicom Disk System (solo Giappone) permetteva di re-registrare le schede magnetiche da negozi appositi per soli 500 yen.',
      'La versione giapponese usava connettori a 60 pin d\'oro; la versione NES americana era incompatibile con 72 pin a causa di pressioni politiche sui dazi.',
      'La melodia di Game Over di Super Mario Bros. fu composta da Koji Kondo come musica provvisoria ma rimase per sempre nel gioco finale.',
      'Duck Hunt aveva una modalità per due giocatori dove il secondo controllava la posizione dell\'anatra con un pad, non documentata nel manuale americano.',
      'Il NES vendette più di 1 milione di unità nel solo periodo natalizio del 1985, anno del lancio americano in sole due città: New York e Los Angeles.',
      'Tetris per NES fu il primo gioco a occupare la prima pagina del New York Times nella storia: fu definito "la droga elettronica" più pericolosa mai creata.',
      'La circuiteria del Zapper light gun rilevava il segnale di rinfresco del catodo del tubo CRT, motivo per cui non funziona con le TV LCD o OLED moderne.',
      'I cartucce NES originali avevano il connettore dorato a 72 pin che si ossidava; Nintendo lanciò ufficialmente un kit di pulizia a 5 dollari.',
      'Donkey Kong Jr. Math è il gioco NES con meno copie vendute in Nord America: meno di 30.000 cartucce distribuite ufficialmente.',
      'Il font dei titoli NES nei logo ufficiali era il carattere tipografico "Handel Gothic" modificato da Nintendo of America.',
      'Mega Man 2 fu sviluppato quasi interamente nel tempo libero dal team di Capcom, dopo che il primo Mega Man vendette deludentemente senza budget aggiuntivo.',
      'Il progetto NES partì come un gioco arcade: il Famicom originale del 1983 cost\u00f2 a Nintendo 14.800 yen al lancio, meno della metà rispetto alla concorrenza.'
    ],
    deepDives: [
      'Con il chip di blocco 10NES e il celebre "Nintendo Seal of Quality", la grande N ha inventato il modello moderno di licensing software e controllo qualità per console.',
      'La gestione audio a 5 canali (2 onde quadre, triangolare, rumore bianco e DPCM per campioni vocali) definì il genere senza tempo della chiptune music.',
      'Senza memoria per memorizzare i progressi, la cartuccia di Zelda I introdusse per prima la batteria al litio CR2032 saldata direttamente sul PCB per salvare la partita.',
      'Il Mapper (Memory Management Controller) era un chip aggiuntivo nelle cartucce per espandere lo spazio di indirizzamento della CPU 6502, permettendo giochi fino a 512KB di ROM.',
      'La PPU (Picture Processing Unit) gestiva una palette di 52 colori, ma solo 25 potevano essere mostrati contemporaneamente per scanline, rendendo necessaria la tecnica del "color cycling".',
      'Nintendo limitò intenzionalmente le terze parti a soli 5 giochi per anno per mantenere alta la qualità media del catalogo e impedire l\'inondazione di titoli scadenti.',
      'Il chip audio DPCM (Delta-Pulse Code Modulation) permetteva campioni audio a 8-bit a 33 kHz, consentendo voci sintetizzate in giochi come Mike Tyson\'s Punch-Out.',
      'Il design del controller rettangolare a due pulsanti A/B era volutamente semplice: Gunpei Yokoi voleva che anche chi non aveva mai toccato un videogioco si sentisse a proprio agio.',
      'La versione americana aggiunse un meccanismo di bloccaggio fisico della cartuccia (ZIF Connector) con molle interne, causa principale dei problemi di connessione ossidati.',
      'La RAM video da 2KB poteva essere espansa tramite la VRAM interna alla cartuccia (CIRAM enable) per supportare layout di schermo complessi nei platform scroller avanzati.',
      'I developer first-party Nintendo usavano kit di sviluppo custom con hardware che espandeva la RAM a 32KB per il testing, poi compressi per entrare nei 2KB finali.',
      'Il sistema di scrolling orizzontale via "fine scroll register" richiedeva ai programmatori di sincronizzarsi esattamente con il beam del CRT, tecnica chiamata "raster interrupt".'
    ]
  },
  'SNES':  { 
    color: '#f97316', accent: '#fdba74', emoji: '🕹️', 
    cpu: 'Ricoh 5A22 (16-bit) @ 3.58 MHz', ram: '128 KB DRAM + 64 KB SRAM', 
    gpu: 'PPU1 + PPU2 (Mode 7 affine scaling)', media: 'Cartucce ROM fino a 48 Mbit (con chip Super FX)', 
    topGame: 'Super Mario World (20.6M)', resolution: '256 x 224 (fino a 512 x 448 interlacciato)',
    unitsSold: '49.1', score: 92, tags: ['JRPG Era','16-bit','Mode 7','Capolavori'],
    funFacts: [
      'Il chip Mode 7 permetteva rotazioni e pseudo-3D impensabili su rivali a 16-bit, usato magnificamente in F-Zero e Star Fox.',
      'I tasti dorsali L e R furono inventati per la prima volta sul pad dello SNES e sono presenti su ogni gamepad moderno ancora oggi.',
      'Il chip Super FX integrato nella cartuccia di Star Fox era un processore RISC 3D più potente della CPU della console stessa!',
      'La colonna sonora dello SNES era prodotta da un chip audio Sony SPC700 progettato dal futuro fondatore di PlayStation, Ken Kutaragi.',
      'Donkey Kong Country usava texture pre-renderizzate al computer Silicon Graphics per ottenere un aspetto 3D impossibile sull\'hardware 16-bit.',
      'Chrono Trigger fu sviluppato dal "Dream Team" Nintendo/Square: lo stesso team che incluse Hironobu Sakaguchi, Yuji Horii e Akira Toriyama.',
      'Il controller SNES è l\'unico della storia ad avere simultaneamente sia i pulsanti A,B,X,Y in posizione Gamepad-standard che i dorsali LR.',
      'Super Metroid conteneva messaggi nascosti nei crediti dove i designer ringraziavano personalmente ogni giocatore che aveva terminato il gioco.',
      'La versione europea del SNES girava a 50Hz invece di 60Hz per compatibilità con lo standard PAL: i giochi erano notoriamente più lenti del 16%.',
      'Il chip SA-1 nella cartuccia di Kirby Super Star era un processore 65816 a 10 MHz che quadruplicava la potenza della console per quel singolo gioco.',
      'Secret of Mana fu concepito originariamente come gioco per il Nintendo CD-ROM (lettore CD annunciato poi mai uscito); fu ridisegnato per la cartuccia da zero.',
      'Final Fantasy VI (III in occidente) fu il primo JRPG a ricevere recensioni da 10/10 contemporaneamente in Giappone, USA ed Europa, stabilendo lo standard narrativo del genere.',
      'La "Console War" degli anni \u201990 portò entrambe le aziende a usare la pubblicità comparativa: Sega attaccava Nintendo per nome nei propri spot televisivi americani.',
      'EarthBound vendette così poco al lancio americano per via della campagna "This Game Stinks" che oggi vale oltre 200 dollari in cartuccia sola in buone condizioni.',
      'La RAM da 128KB dello SNES era il triplo di quella del Mega Drive, ma la CPU più lenta compensava con il parallelismo delle due PPU che lavoravano in pipeline.',
      'Yoshi\'s Island usò il chip GSU-2 (Super FX 2) per realizzare nemici con centinaia di poligoni rotanti a schermo, un trucco mai replicato su altro 16-bit.',
      'Il test di avvio del SNES controllava se la cartuccia fosse una ROM valida leggendo l\'header: i primi 65 byte definivano nome del gioco, dimensione, checksum e paese.',
      'Seiken Densetsu 3 (mai uscito ufficialmente in Occidente fino al 2019) fu distribuito tramite il servizio Satellaview via satellite solo in Giappone nel 1996.',
      'La schermata di Selezione Mode 7 di Super Mario Kart mostra 8 personaggi animati in un loop continuo generato con il Mode 7 in real-time a 60fps.',
      'Nintendo vendette accessori audio SNES con chip DSP-1 specifici per i kart game: il DSP-1B migliorava i calcoli di rotazione spaziale per la guida a 8 direzioni.'
    ],
    deepDives: [
      'Grazie al chip audio DSP di Sony progettato da Ken Kutaragi e l\'incredibile palette a 32.768 colori, lo SNES è considerata la regina dell\'era d\'oro del 2D e dei JRPG classici.',
      'L\'architettura a doppio coprocessore video consentiva lo scorrimento parallattico su 4 piani indipendenti simultaneamente, creando profondità visive ineguagliate.',
      'La rivalità feroce con il Sega Genesis portò alla storica "Console War" degli anni \u201990, costringendo Nintendo ad adottare grafiche prerenderizzate come in Donkey Kong Country.',
      'Il bus dati a 16-bit e il bus indirizzi a 24-bit permettevano di indirizzare fino a 16MB di ROM senza bankswitching, sufficiente per i JRPG più ambiziosi.',
      'La modalità Mode 7 proiettava una singola texture bidimensionale in prospettiva usando trasformazioni affini hardware, il trucco visivo più imitato dell\'intera era 16-bit.',
      'Il coprocessore DSP-1 nella cartuccia di Pilotwings eseguiva operazioni trigonometriche di rotazione tridimensionale che la CPU principale non avrebbe mai completato in tempo reale.',
      'Il Super FX chip di Star Fox fu sviluppato dalla britannica Argonaut Games e conteneva 256 byte di RAM aggiuntiva, un clock di 21MHz e la capacità di renderizzare poligoni piatti a schermo.',
      'La palette a 256 colori in modalità BG3 permetteva trame ad alta qualità nei fondali a scorrimento, una caratteristica usata magnificamente da Secret of Mana e Final Fantasy VI.',
      'Il BIOS dello SNES include una routine di CRC32 che verifica l\'integrità della ROM all\'avvio, impedendo che cartucce difettose causassero crash imprevisti del sistema.',
      'Il controller SNES ha introdotto l\'asse Z analogico con i grilletti L/R digitali; la successiva iterazione per N64 li renderà finalmente analogici con corsa continua.',
      'Il chip SA-1 nelle cartucce di fascia alta della fine vita del sistema (1993-1996) poteva eseguire istruzioni a 10MHz, quasi tre volte la velocità della CPU principale della console.',
      'La palette CGRAM (Colour Graphics RAM) dello SNES supportava 512 colori unici distinti, ma la CPU grafica ne selezionava solo 256 per frame attivi nel modo grafico più comune.'
    ]
  },
  'N64':   { 
    color: '#eab308', accent: '#fde047', emoji: '🎯', 
    cpu: 'NEC VR4300 (64-bit MIPS) @ 93.75 MHz', ram: '4 MB RDRAM (espandibile a 8 MB con Expansion Pak)', 
    gpu: 'SGI RCP (Reality Coprocessor) @ 62.5 MHz', media: 'Cartucce ROM ad alta velocità (fino a 64 MB)', 
    topGame: 'Super Mario 64 (11.9M)', resolution: '320 x 240 (fino a 640 x 480i)',
    unitsSold: '32.9', score: 88, tags: ['3D Pioneer','64-bit','4 Giocatori','Z-Buffering'],
    funFacts: [
      'Super Mario 64 ha introdotto la levetta analogica a 360° e la telecamera dinamica tridimensionale nei videogiochi di piattaforma.',
      'Il controller dell\'N64 fu il primo al mondo a supportare il Rumble Pak, portando la vibrazione tattile nei videogiochi consumer.',
      'I designer di Silicon Graphics testarono l\'hardware renderizzando una demo del dinosauro di Jurassic Park in tempo reale prima del lancio.',
      'Il gioco Goldeneye 007 fu sviluppato quasi interamente da team di 9 programmatori senza esperienza di sparatutto: fu il loro primo gioco.',
      'Majora\'s Mask fu creato in soli 12 mesi riciclando gli asset di Ocarina of Time, grazie a un team super dedicato guidato da Yoshiaki Koizumi.',
      'Il Expansion Pak raddoppiava la RAM a 8MB e permise giochi come Donkey Kong 64 e Perfect Dark che non avrebbero potuto girare altrimenti.',
      'Il controller N64 fu il primo a mettere la levetta analogica a sinistra come posizione primaria, scelta che influenzò ogni pad successivo.',
      'Resident Evil 2 compresso in una cartuccia da 64MB fu considerato un miracolo tecnico: i video FMV occupavano 60% dello spazio disponibile.',
      'La cartuccia di Conker\'s Bad Fur Day fu la più capiente mai prodotta per N64: 512 Mbit (64MB) con audio compresso a 44kHz di qualità CD.',
      'Nintendo 64 supportava quattro controller in simultanea nativamente, rendendo il gaming multiplayer da divano senza adapter una caratteristica di serie.',
      'Il transfer pak permetteva di collegare le cartucce del Game Boy all\'N64: Pokémon Stadium importava le squadre dai giochi portatili Rosso e Blu.',
      'La latenza input del controller N64 era inferiore a 16ms, equivalente a un frame a 60fps, la più bassa mai misurata su console dell\'era analogica.',
      'Wave Race 64 simulava l\'idrodinamica dell\'acqua con un motore fisico proprietario SGI così realistico che viene ancora citato nei corsi universitari di grafica.',
      'Il suono dell\'N64 usava DSP a 16-bit a 44.1kHz, superiore al CD audio standard, con fino a 100 canali audio simultanei grazie al coprocessore SP.',
      'F-Zero X girava a 60fps costanti con 30 veicoli sullo schermo contemporaneamente su hardware a 93MHz: un record di ottimizzazione rimasto imbattuto.',
      'Super Smash Bros. originale fu sviluppato come progetto personale segreto da Masahiro Sakurai nel tempo libero, presentato a Nintendo solo quando era completo.',
      'Il controller N64 aveva 283 pezzi distinti e pesava 320 grammi: la maniglia centrale con la levetta analogica e lo Z-trigger erano completamente inediti.',
      'Kirby 64: The Crystal Shards usava un renderer 2.5D che mischiava sprite bidimensionali e poligoni 3D in modo talmente fluido da sembrare un 2D classico.',
      'La RAM RDRAM dell\'N64 era la più veloce disponibile nel 1996 (2.1 GB/s) ma anche la più costosa: ogni chip costava quasi quanto l\'intera CPU.',
      'Animal Crossing (Dōbutsu no Mori) fu il primo N64 a salvare l\'ora reale interna con una batteria: la data e l\'ora cambiano gli eventi del gioco in tempo reale.'
    ],
    deepDives: [
      'Nintendo scelse le cartucce rispetto ai CD per azzerare i tempi di caricamento, costringendo sviluppatori ad autentiche prodezze di compressione per i titoli più ambiziosi.',
      'Il Reality Coprocessor sviluppato da Silicon Graphics integrava Z-buffering hardware, antialiasing ed interpolazione trilineare dei poligoni direttamente nel silicio.',
      'GoldenEye 007 di Rare ridefinì per sempre gli sparatutto in prima persona su console, dimostrando che i controlli pad potevano rivaleggiare con mouse e tastiera.',
      'La memoria RDRAM richiedeva inizializzazione precisa e operava in burst sincronizzati: il jitter del clock era limitato a meno di 200 picosecondi per garantire stabilità.',
      'Il microcode RSP (Reality Signal Processor) era programmabile: ogni software house poteva scrivere il proprio motore grafico direttamente sul chip di segnale al silicio.',
      'L\'architettura di texturing con mip-mapping trilineare dell\'N64 era identica alle workstation grafiche Silicon Graphics da 100.000 dollari usate da Hollywood nel 1996.',
      'Il controller N64 era progettato per essere tenuto in due modi: con la mano sinistra sulla maniglia sinistra (per giochi 2D) o sulla centrale (per giochi 3D con levetta).',
      'Il SN64 (development kit) includeva 8MB di RAM espansa e tool custom di Silicon Graphics che costavano decine di migliaia di dollari per licenza annuale.',
      'La modalità HighRes 640x480 richiedeva l\'Expansion Pak obbligatoriamente e dimezzava il frame rate: pochi titoli la usarono per intero (Majora\'s Mask, Perfect Dark).',
      'Il Joybus Protocol del controller N64 usa una linea seriale bidirezionale a 250kbps con CRC checksum integrato per rilevare interferenze sui lunghi cavi.',
      'Il processore audio RSP dell\'N64 è un MIPS a 94MHz con 8KB di DMEM/IMEM che svolge sia audio DSP che operazioni geometriche 3D della pipeline grafica.',
      'Banjo-Kazooie di Rare fu il primo gioco N64 a usare texture animate per simulare l\'acqua corrente: la sequenza di texture alternata a 30fps creava l\'illusione di flusso.'
    ]
  },
  'NGC':   { 
    color: '#06b6d4', accent: '#67e8f9', emoji: '🟣', 
    cpu: 'IBM PowerPC Gekko @ 485 MHz', ram: '24 MB 1T-SRAM + 16 MB A-RAM', 
    gpu: 'ATI Flipper @ 162 MHz', media: 'miniDVD proprietario Panasonic (1.5 GB)',
    topGame: 'Super Smash Bros. Melee (7.4M)', resolution: '480p (Progressive Scan)',
    unitsSold: '21.7', score: 84, tags: ['Mini-DVD','Compatto','Hardware Potente','Cult'],
    funFacts: [
      'Era tecnologicamente più performante di PlayStation 2 con bandwidth memoria molto superiore e shading hardware più avanzato.',
      'La melodia all\'avvio cambia completamente se tieni premuto il tasto Z su uno o quattro controller contemporaneamente!',
      'Il suo celebre controller con tasti A/B asimmetrici è così perfetto da essere tuttora lo standard ufficiale dei tornei mondiali di Super Smash Bros.',
      'Il GameCube originale aveva una maniglia per il trasporto integrata nel telaio, unica tra le home console di quella generazione.',
      'Metroid Prime fu lo studio Retro Studios\'s primo gioco mai rilasciato dopo essere rimasto in sviluppo segreto per 3 anni senza che Nintendo lo rivelasse.',
      'The Legend of Zelda: Wind Waker usava cel-shading grafico animato così avanzato che inizialmente i fan erano furiosi per lo stile "cartoonesco".',
      'Il GameCube supportava un modem broadband via adattatore opzionale: solo 3 giochi lo usarono (PSO, Kirby Air Ride online e NBA 2K2).',
      'Resident Evil 4 nacque come esclusiva GameCube dopo che Shinji Mikami promise di "tagliarsi la testa" se fosse mai uscito su PS2 - promessa che non mantenne.',
      'La miniDVD da 1.5GB del GameCube era intenzionalmente incompatibile con i DVD standard per impedire facilmente la pirateria tramite lettori modificati.',
      'Il controller GameCube aveva il Z-trigger direttamente sopra il R-trigger, una scelta ergonomica studiata per 18 mesi da Shigeru Miyamoto con ergonomisti professionisti.',
      'F-Zero GX fu sviluppato da Sega (Amusement Vision): fu uno dei rarissimi casi nella storia in cui Nintendo affidò una IP di punta a un rivale concorrente.',
      'Il GameCube fu la prima console Nintendo a supportare il Progressive Scan 480p nativo via cavo Componente, standardizzando l\'HD entry-level su console.',
      'Super Monkey Ball 1 e 2 giravano a 60fps stabili con fisica newtoniana per 4 scimmie simultanee: il motore fisico era un primato tecnico assoluto per il 2001.',
      'Nintendo vendette un adattatore GBA-GCN che trasformava il portatile in un controller aggiuntivo con schermo privato per giochi come The Legend of Zelda: Four Swords Adventures.',
      'Eternal Darkness: Sanity\'s Requiem fu il primo gioco della storia a introdurre effetti meta-horror: il gioco finge di cancellare i salvataggi o di mandare in crash la console.',
      'Il GameCube costava 250$ al lancio contro i 299$ di PS2 e i 299$ di Xbox: era la console più economica ma vendette meno della metà di entrambe.',
      'Wave Bird fu il primo controller wireless ufficiale Nintendo: usava frequenze radio invece dell\'infrarosso, con un range di quasi 6 metri e 60 ore di autonomia.',
      'Pikmin fu creato da Shigeru Miyamoto dopo che iniziò a coltivare piante nel suo giardino: l\'idea di guidare piccole creature nacque letteralmente guardando le formiche.',
      'Il Game Boy Player si collegava alla porta d\'espansione sotto il GameCube per giocare a tutti i titoli GBA, GBC e GB originale su grande schermo TV.',
      'Paper Mario: The Thousand-Year Door usa quasi zero texture pre-renderizzate: tutti i fondali sono geometria 3D disegnata come cartone, un capolavoro tecnico di ottimizzazione.'
    ],
    deepDives: [
      'Caratterizzato dalla celebre maniglia per il trasporto, il GameCube vantava una delle architetture più pulite ed efficienti mai realizzate da IBM e ArtX/ATI.',
      'La memoria 1T-SRAM proprietaria di MoSys forniva una latenza di soli 10 nanosecondi, eliminando quasi del tutto i colli di bottiglia nel rendering geometrico.',
      'L\'adozione dei mini-disco da 8 cm limitò la pirateria ma impedì filmati compressi ad alta risoluzione e la riproduzione di comuni film DVD.',
      'Il chip grafico ATI Flipper integrava TEV (Texture Environment Unit) con 8 stadi di processing, permettendo effetti di per-pixel lighting impossibili su PS2.',
      'La CPU Gekko era una versione custom del PowerPC 750CX di IBM con 256KB di L2 cache, un bus di sistema a 162MHz e istruzioni SIMD paired-single per la matematica 3D.',
      'Il Flipper includeva un sistema di anti-aliasing multisample a 2x nativo, eliminando lo jagging sui bordi senza il costo di risoluzione dei pixel shaders tradizionali.',
      'Il GameCube poteva riprodurre musica ADPCM campionata a 48kHz su 64 canali simultanei usando il DSP ARAM dedicato, completamente separato dalla CPU.',
      'Nintendo progettò il sistema di sicurezza IPL (Initial Program Loader) con checksum hardware per impedire che codice non certificato venisse eseguito senza chip mod.',
      'Il connettore di espansione Hi-Speed Port sotto il GameCube fu pensato per future periferiche: solo il Game Boy Player e il modem broadband vennero effettivamente prodotti.',
      'Metroid Prime usava un sistema di iluminazione per-vertex con 8 luci hardware simultanee, creando ambienti 3D atmosferici con ombre colorate in tempo reale a 60fps.',
      'Il memory card del GameCube usava memoria flash da 59 a 1019 blocchi: ogni blocco era 8KB, il che significava che un salvataggio di 59 blocchi occupava 472KB totali.',
      'Wind Waker fu il primo Zelda a usare il motore Zelda completamente riscritto da zero: la demo Spaceworld 2000 con Link realistico non aveva nulla a che fare con il gioco finale.'
    ]
  },
  'GBC':   { 
    color: '#84cc16', accent: '#bef264', emoji: '🟢', 
    cpu: 'Sharp LR35902 (Z80-like) @ 8.38 MHz (doppia velocità)', ram: '32 KB RAM + 16 KB VRAM', 
    gpu: 'Display LCD a colori 160 x 144 (palette 32.768)', media: 'Cartucce Game Boy / GBC (fino a 8 MB)', 
    topGame: 'Pokémon Oro e Argento (23.1M)', resolution: '160 x 144 px',
    unitsSold: '32.9', score: 78, tags: ['Portatile','Colore','Retrocompatibile','Porta IR'],
    funFacts: [
      'Piena retrocompatibilità: ricolorava al volo i giochi del Game Boy originale premendo combinazioni di tasti all\'avvio!',
      'La cartuccia di Kirby Tilt \'n\' Tumble conteneva un sensore di movimento ad accelerometro, antesignano del motion gaming.',
      'La porta a infrarossi permetteva lo scambio del "Dono Segreto" in Pokémon Oro e Argento avvicinando due console a pochi centimetri.',
      'Pokémon Oro e Argento conteneva segretamente l\'intera regione di Kanto della prima generazione come bonus post-game, raddoppiando la dimensione del gioco.',
      'La console era disponibile in 7 colori diversi al lancio: trasparente, viola, verde, rosso, teal, giallo e blu, inaugurando la tendenza dei colori consumer.',
      'Wario Land 3 fu il primo gioco per Game Boy Color a non avere un sistema di vite: il personaggio non poteva morire ma solo essere spinto indietro.',
      'Il Game Boy Camera per GBC aveva la risoluzione fotografica di 128x112 pixel: fu il più piccolo apparecchio fotografico digitale certificato da Guinness nel 1998.',
      'La batteria della GBC durava fino a 40 ore con due semplici pile stilo AA: un primato di efficienza energetica rimasto imbattuto per anni.',
      'Pokémon Cristallo fu il primo gioco Pokémon a introdurre le scene animate dei Pokémon all\'inizio del combattimento e la possibilità di giocare come protagonista femmina.',
      'Il Dragon Warrior Monsters su GBC usava un sistema di breeding dei mostri con genetica simulata: i figli ereditavano le mosse dei genitori tramite algoritmi di crossover.',
      'Metal Gear Solid per Game Boy Color fu un remake isometrico del primo Metal Gear con sistema di radar e allarme, tutto compresso in una cartuccia da 8 Megabyte.',
      'Zelda: Oracle of Ages e Oracle of Seasons erano due giochi distinti con un sistema di password condivisa: completando entrambi si sbloccava un finale segreto aggiuntivo.',
      'La GBC era retrocompatibile ma le cartucce esclusivamente colore avevano un bordo della scocca diverso (rientrato) per impedire fisicamente l\'inserimento in un GB originale.',
      'Rayman per GBC fu portato in 6 mesi da un programmatore solitario: usava una tecnica di compressione delle tile grafiche inedita per risparmiare ROM.',
      'Il multiplayer GBC via cavo link supportava fino a 4 giocatori con un hub collegabile: Pokémon Trading Card Game usava tutti e 4 i giocatori in tornei locali.'
    ],
    deepDives: [
      'Dotato di una CPU raddoppiata a 8.38 MHz e 4 volte la RAM dell\'originale, permise la consacrazione del boom mondiale di Pokémon.',
      'La palette cromatica gestiva 56 colori simultanei da una tavolozza di oltre 32.000 sfumature senza gravare sull\'autonomia di oltre 10 ore con sole due pile stilo.',
      'Le speciali cartucce semitrasparenti con la gobba superiore "Game Boy Color only" segnalavano l\'uso esclusivo delle istruzioni a 8 MHz.',
      'Il chip IR della GBC usava modulazione a 32kHz con protocollo proprietario Nintendo: un frame dati trasferiva fino a 64 bit di informazione per sessione.',
      'La palette di colorazione automatica del firmware convertiva i 4 toni di grigio in 4 colori dalla palette interna: erano disponibili 12 palette diverse attivabili da menu.',
      'Le cartucce GBC-only contenevano nell\'header un flag speciale che disabilitava il boot screen grigio del firmware classico, avviando direttamente in modalità colore.',
      'Il sistema di compressione sprite del GBC permetteva grafiche più dettagliate grazie alle 40 tile sprite visibili per linea (contro le 10 del Game Boy originale).',
      'Pokémon Oro e Argento comprimevano più dati del mondo nella cartuccia di 2 Megabyte originale tramite una tecnica di map compression proprietaria chiamata "screen data tiling".'
    ]
  },
  'GBA':   { 
    color: '#10b981', accent: '#6ee7b7', emoji: '🎮', 
    cpu: 'ARM7TDMI (32-bit RISC) @ 16.78 MHz', ram: '32 KB interna + 256 KB esterna WRAM', 
    gpu: '2D Hardware Rendering con rotazione e scaling', media: 'Cartucce 32 MB ROM', 
    topGame: 'Pokémon Rubino e Zaffiro (16.2M)', resolution: '240 x 160 px TFT',
    unitsSold: '81.5', score: 86, tags: ['32-bit','Portatile Iconico','Pixel Art Supremo'],
    funFacts: [
      'Soprannominato "lo SNES tascabile", era in realtà un sistema a 32-bit ben più agile e con frequenza quadrupla del predecessore.',
      'Il display orizzontale widescreen fu disegnato dal designer francese Gwénaël Nicolas ispirandosi a un cruscotto di auto sportiva.',
      'Poteva connettersi al Nintendo GameCube tramite un cavo speciale per fungere da secondo schermo interattivo in The Wind Waker.',
      'L\'assenza iniziale della retroilluminazione spinse milioni di giocatori a dotarsi delle celebri lampade a collo d\'oca (WormLight) a clip.',
      'Castlevania: Aria of Sorrow fu il primo capitolo della saga ad avere la possibilità di assorbire i poteri dei nemici sconfitti, gameplay che influenzò Hollow Knight.',
      'La batteria interna del GBA non era ricaricabile: richiedeva due pile AA che garantivano circa 15 ore di autonomia su un display non retroilluminato.',
      'Mother 3 fu sviluppato esclusivamente per GBA in Giappone ma non uscì mai ufficialmente in Occidente nonostante anni di campagne da parte dei fan.',
      'The Legend of Zelda: A Link to the Past per GBA aggiungeva un gioco multiplayer inedito (Four Swords) mai apparso sull\'originale SNES.',
      'Fire Emblem non uscì mai in Occidente prima del GBA (2003): il personaggio di Marth e Roy in Smash Bros. spinsero i fan americani a richiedere la localizzazione.',
      'Metroid Fusion era così atmosferico e narrativo che divenne la base del concept di Metroid Dread per Nintendo Switch, 19 anni dopo.',
      'Pokémon Rubino e Zaffiro fu il primo capitolo con battaglie multiple 2v2, con effetti meteo in combattimento e con le abilità passive dei Pokémon.',
      'Il GBA SP (versione successiva) fu progettato con il form factor a conchiglia dopo ricerche condotte su 1000 giocatori in 8 paesi: il 73% preferiva il design chiuso.',
      'Kirby & The Amazing Mirror aveva 4 giocatori in co-op wireless simultaneo con cavi link, un primato per un platform portatile del 2004.',
      'Golden Sun usava un sistema di Djinn (elementi) così profondo che i creator di Genshin Impact hanno citato direttamente Golden Sun come ispirazione principale.',
      'La versione GBA di Doom girò a 20fps in 160x128: per comprimere il 3D ray-casting in un chip da 16MHz richiese algoritmi di ottimizzazione pubblicati successivamente in papers accademici.'
    ],
    deepDives: [
      'Ha ospitato la massima espressione artistica della pixel art bidimensionale moderna, con capolavori intramontabili della serie Castlevania, Metroid Fusion e Golden Sun.',
      'Il core ARM7TDMI a 32-bit consumava pochissima energia e divenne il punto di partenza per l\'architettura dei futuri processori mobile da smartphone.',
      'L\'assenza iniziale della retroilluminazione spinse milioni di giocatori a dotarsi delle celebri lampadine a collo d\'oca a pile (WormLight).',
      'L\'architettura ARM Thumb a 16-bit riduceva la dimensione del codice del 30% rispetto alle istruzioni ARM a 32-bit, permettendo di comprimere più logica nella stessa ROM.',
      'Il bus ROM del GBA operava a 8/16 bit con latenza variabile: i developer dovevano copiare il codice time-critical nella IWRAM interna per velocità massima.',
      'La GPU Mode 3 del GBA permetteva un framebuffer bitmap a 240x160 in colori diretti a 15-bit: la prima volta che una console portatile supportava il disegno pixel-per-pixel.',
      'Il sistema di sicurezza del GBA includeva una sezione ROM interna con Nintendo logo: all\'avvio la console verificava la presenza del logo nella cartuccia tramite CRC.',
      'Super Mario Advance 4 per GBA includeva 38 livelli extra e-Reader sbloccabili via schede cartacee scannerizzabili, mai distribuiti in Europa e finalmente disponibili dal 2016 su Virtual Console.'
    ]
  },
  'GBASP': { 
    color: '#14b8a6', accent: '#5eead4', emoji: '📟', 
    cpu: 'ARM7TDMI @ 16.78 MHz + Z80 per retrocompatibilità', ram: '288 KB totale', 
    gpu: 'Display TFT retroilluminato (modello AGS-101 a luce diretta)', media: 'Cartucce GBA e Game Boy classiche', 
    topGame: 'Pokémon Rosso Fuoco / Verde Foglia (12.0M)', resolution: '240 x 160 px',
    unitsSold: '43.5', score: 82, tags: ['Design Clamshell','Batteria Ricaricabile','Frontlit/Backlit'],
    funFacts: [
      'La prima console portatile Nintendo ad abbandonare le pile usa e getta per una batteria agli ioni di litio ricaricabile via USB proprietario.',
      'La sigla "SP" sta ufficialmente per "Special Project", mai chiarito da Nintendo in comunicati ufficiali.',
      'Il modello tardivo AGS-101 del 2005 aveva un display a retroilluminazione diretta brillante quanto un moderno display smartphone.',
      'Il GBA SP era l\'unica console portatile a quel tempo con un design perfettamente simmetrico: era identica vista da sinistra o da destra.',
      'Rimuovendo il jack audio da 3.5mm anticipò di oltre un decennio la mossa analoga degli smartphone moderni; serviva un adattatore proprietario.',
      'La batteria AGS-003 durava circa 10 ore senza retroilluminazione e 7 ore a schermo pieno: Nintendo la chiamò "la prima batteria infinita portatile".',
      'Il peso di soli 143 grammi e lo spessore chiuso di 24mm la rendevano la console portatile più compatta sul mercato al momento del lancio nel 2003.',
      'Gli utenti GBA SP potevano collegare 4 console via link cable con multiplayer a 4 giocatori: un singolo giocatore con la cartuccia poteva ospitare gli altri 3 in multi-boot.'
    ],
    deepDives: [
      'Il design a conchiglia pieghevole proteggeva lo schermo dai graffi e inaugurò il form factor che avrebbe dominato la successiva generazione con la famiglia Nintendo DS.',
      'Rimuovendo per la prima volta il jack audio a favore di un adattatore proprietario, anticipò di oltre un decennio la mossa analoga degli smartphone moderni.',
      'Manteneva al 100% l\'hardware fisico Z80 a 5V per la retrocompatibilità nativa con le cartucce grigie del primissimo Game Boy del 1989.',
      'Il sistema di ricarica usava un connector proprietario a 5 pin che trasferiva 5V a 320mA: equivalente ai caricabatterie per telefoni Nokia dell\'epoca.',
      'La tastiera frontlit del modello AGS-001 illuminava lo schermo dall\'alto: la versione AGS-101 lo illuminava dal retro con effetto molto più luminoso e uniforme.',
      'Nintendo vietò ai retailer di accettare Game Boy originali in permuta dopo il lancio del GBA SP, per disincentivare i consumatori a tenere il vecchio hardware.',
      'L\'SP era compatibile con tutte le 1.000+ cartucce GBA e con le circa 700 cartucce Game Boy e GBC originali, per un catalogo totale di quasi 1.700 titoli disponibili.'
    ]
  },
  'NDS':   { 
    color: '#f59e0b', accent: '#fcd34d', emoji: '📺', 
    cpu: 'ARM946E-S @ 67 MHz + ARM7TDMI @ 33 MHz', ram: '4 MB RAM (espansi a 16MB su DSi)', 
    gpu: 'Processore 3D dedicato (120k poligoni/sec) + 2 schermi', media: 'Schede DS (fino a 512 MB) + slot GBA', 
    topGame: 'New Super Mario Bros. (30.8M)', resolution: '256 x 192 px (doppio schermo)',
    unitsSold: '154.0', score: 85, tags: ['Doppio Schermo','Touch Screen Resistivo','Wi-Fi Locale'],
    funFacts: [
      'È la console portatile più venduta della storia dell\'umanità con oltre 154 milioni di pezzi.',
      'Inizialmente era chiamato in codice "Project Iris", perché Nintendo lo considerava il "terzo occhio" dei giocatori.',
      'Con PictoChat potevi scambiare disegni a mano libera e messaggi wireless senza internet fino a 30 metri di distanza già nel 2004.',
      'Il touch screen resistivo funzionava con qualsiasi oggetto rigido: uno stuzzicadenti, un dito, una matita o persino un coltello (sconsigliato da Nintendo).',
      'Brain Training del Dr. Kawashima vendette oltre 19 milioni di copie trasformando milioni di adulti over-50 in giocatori regolari per la prima volta.',
      'Il microfono integrato era usato per azioni di gameplay come soffiare nelle candele in Mario Party o urlare per svegliare il cane in Nintendogs.',
      'Il Wi-Fi del DS usava il protocollo 802.11b a 2.4GHz ma era limitato a reti WEP: le reti WPA2 moderne sono incompatibili senza un router intermedio.',
      'Phantom Hourglass e Spirit Tracks di Zelda usavano esclusivamente il pennino: spostare Link richiedeva di disegnare il percorso sullo schermo tattile.',
      'Elite Beat Agents fu il gioco DS più venduto negli USA per 8 settimane consecutive nel 2006, un fenomeno inatteso per un rhythm game basato su un titolo giapponese.',
      'Il DSi (2009) aggiungeva due fotocamere da 0.3 megapixel, un lettore SD e il DSiWare shop: rimuoveva però il leggendario slot GBA della versione originale.',
      'Super Mario 64 DS era il remake del classico N64 con grafica migliorata, 150 stelle invece di 120 e la possibilità di giocare come Wario, Yoshi e Luigi.',
      'Advance Wars: Dual Strike usava entrambi i display contemporaneamente: lo schermo inferiore mostrava la mappa tattica, quello superiore la visuale di battaglia.',
      'Pokémon Diamante e Perla per NDS introdusse il Pokétch, un orologio virtuale touch che occupava lo schermo inferiore con 25 mini-applicazioni selezionabili.',
      'The World Ends with You usava i due schermi per due personaggi che combattevano contemporaneamente in due piani sovrapposti della stessa realtà.',
      'Nintendo DS vendette il primo milione di unità nelle 24 ore di lancio americano del novembre 2004, stabilendo un record per l\'azienda.',
      'Le reti Nintendo Wi-Fi Connection (WFC) per DS vennero spente ufficialmente il 20 maggio 2014: il servizio aveva gestito oltre 3 miliardi di sessioni online.',
      'Hotel Dusk: Room 215 si giocava tenendo il DS ruotato di 90 gradi come un libro, con le pagine del romanzo-grafico suddivise tra i due schermi verticali.',
      'Il software di sviluppo ufficiale Nintendo DS costava 30.000 dollari per licenza: solo le major software house potevano permetterselo inizialmente.',
      'Electroplankton era un software interattivo di composizione musicale, non un gioco: potevi creare musica toccando creature bioluminescenti con il pennino.',
      'La modalità Download Play del DS permetteva di avere fino a 16 console collegate localmente con una sola cartuccia: Mario Kart DS supportava 8 giocatori in questo modo.'
    ],
    deepDives: [
      'Inizialmente presentato come un "terzo pilastro" sperimentale accanto a Game Boy e GameCube, il Nintendo DS ha rivoluzionato il casual gaming con pennino touch e microfono.',
      'La presenza di due CPU distinte (ARM9 per il rendering e la logica di gioco, ARM7 per audio, touch e gestione Wi-Fi) garantiva prestazioni fluide e senza lag.',
      'Titoli pionieristici come Brain Training e Nintendogs allargarono il pubblico del gaming a intere fasce demografiche fino ad allora del tutto estranee ai videogiochi.',
      'Il GPU 3D del DS usava una pipeline di renderizzazione software custom sulla CPU ARM9, senza hardware shader dedicato: ogni effetto luminoso era calcolato via CPU.',
      'Il sistema Wi-Fi usava chip Marvell 88W8686: supportava trasferimento dati a 11Mbps ma le applicazioni Nintendo lo limitavano a 2Mbps per ridurre il consumo della batteria.',
      'Il cartridge DS includeva un flash RAM EEPROM per i salvataggi: la dimensione variava da 256KB a 8MB nei titoli più recenti, senza bisogno di Memory Card separate.',
      'Il firmware del DS includeva piccole applicazioni integrate: orologio con sveglia, calcolatrice, Pictochat e la possibilità di impostare una foto profilo Mii-like tramite pittura.',
      'Lo schermo superiore del DS non aveva touchscreen: era una ragione di costo ma anche una scelta intenzionale per separare la lettura dall\'interazione col pennino.',
      'Il Nintendo Wi-Fi Connection server usava una rete di server dedicati gestita da GameSpy Technologies fino alla chiusura del 2014; non esisteva un sistema peer-to-peer.',
      'Le schede del DS contenevano un chip di autenticazione hardware: solo le cartucce firmate con la chiave privata Nintendo potevano avviarsi senza modifiche al firmware.'
    ]
  },
  'WII':   { 
    color: '#8b5cf6', accent: '#c4b5fd', emoji: '🕹️', 
    cpu: 'IBM Broadway (PowerPC 750CL) @ 729 MHz', ram: '88 MB 1T-SRAM totale (24MB + 64MB GDDR3)', 
    gpu: 'ATI Hollywood @ 243 MHz', media: 'Disco ottico 12 cm proprietario (4.7 GB/8.5 GB)', 
    topGame: 'Wii Sports (82.9M)', resolution: '480p / 576i (EDTV)',
    unitsSold: '101.6', score: 82, tags: ['Motion Control','WiiMote','Fenomeno Culturale Pop'],
    funFacts: [
      'Ha fatto giocare contemporaneamente bambini di 5 anni e nonni di 80 anni in case di riposo di tutto il mondo.',
      'Nei primi mesi le cinghie da polso si spezzavano durante i lanci energici di bowling, spingendo Nintendo a sostituirne gratuitamente milioni con modelli rinforzati.',
      'Il nome in codice durante lo sviluppo era "Revolution", poi cambiato in "Wii" per simboleggiare due persone vicine (le due "i").',
      'Wii Sports divenne il gioco più venduto della storia per molti anni, bundlato gratuitamente con ogni console venduta in quasi tutto il mondo tranne il Giappone.',
      'Il canale Mii Channel permetteva di creare avatar caricaturali della propria faccia che poi apparivano come spettatori in Wii Sports Baseball e Golf.',
      'La console consumava solo 20 watt in funzionamento: meno di una lampada da comodino e circa il 90% in meno rispetto a PS3 o Xbox 360.',
      'WiiConnect24 permetteva di ricevere aggiornamenti notturni, messaggi dagli amici e nuovi canali Web mentre la console era in standby con la spia verde lampeggiante.',
      'Guitar Hero III: Legends of Rock usava i sensori di movimento del WiiMote per il tapping sulle corde: era una funzione bonus rispetto alla versione PS3.',
      'Il canale Meteo e il canale Notizie erano applicazioni internet in tempo reale disponibili gratuitamente dal day one, anni prima degli smartphone comuni.',
      'Wii Music permetteva di suonare virtualmente 60 strumenti diversi usando i gesti del WiiMote: il percussionista batteva il telecomando nell\'aria per suonare la batteria.',
      'The Legend of Zelda: Twilight Princess era originariamente un gioco GameCube specchiato orizzontalmente per la versione Wii: Link era originariamente mancino.',
      'Nintendo Wii ha venduto oltre 600.000 unità il solo primo giorno americano del 19 novembre 2006, esaurendo quasi completamente le scorte mondiali.',
      'Shigeru Miyamoto presentò il WiiMote nascondendolo inizialmente in tasca durante la conferenza Nintendo E3 2005: la reazione del pubblico fu di pura sorpresa.',
      'Il Nunchuk si connetteva al WiiMote via cavo a 3.5mm: all\'interno aveva gli stessi sensori accelerometrici del WiiMote ma senza infrarossi.',
      'Super Mario Galaxy usava sensori di accelerazione per raccogliere le stelle di polvere cosmica con il puntatore: un tipo di interazione tattica mai visto prima su platform.',
      'Il canale Shopping Wii chiuse il 30 gennaio 2019 dopo 12 anni di servizio: era il primo digital storefront ufficiale Nintendo della storia.',
      'Goldeneye 007 per Wii puntava il WiiMote verso il sensore bar per mirare e aveva il giroscopio per la rotazione: il risultato era più preciso della versione N64 originale.',
      'La porta SD card del Wii permetteva di copiare i salvataggi di gioco e i canali: fu usata da milioni di utenti per installare homebrew tramite la celebre Homebrew Channel.',
      'Il Wii Balance Board per Wii Fit era uno dei dispositivi di input più venduti della storia: oltre 43 milioni di copie vendute rendendolo il controller periferico più diffuso mai prodotto.'
    ],
    deepDives: [
      'Focalizzandosi sull\'esperienza di gioco invece che sulla corsa ai pixel HD (strategia Blue Ocean), Wii ha generato profitti record per Nintendo fin dal primo giorno.',
      'Il telecomando WiiMote univa accelerometri triassiali a una telecamera a infrarossi puntata sulla Sensor Bar della TV, calcolando la posizione spaziale a 100Hz.',
      'I canali Wii (Mii Channel, News, Meteo) anticiparono il concetto di dashboard a widget connessa continuamente a internet in modalità standby a basso consumo WiiConnect24.',
      'La CPU Broadway era un IBM PowerPC 750CL overclockato da 729MHz con 256KB di L2 cache: tecnicamente inferiore a PS3 e Xbox 360 ma sufficiente per il motion gaming.',
      'Il chip grafico Hollywood era un ATI RV530 personalizzato: operava a 243MHz con supporto OpenGL ES 2.0 e TEV come il GameCube, ma con il doppio di Texture Units.',
      'La Sensor Bar non trasmetteva dati: era solo una doppia fila di LED infrarossi che il WiiMote usava come punti di riferimento fissi per calcolare la propria posizione.',
      'Il protocollo di comunicazione del WiiMote usava Bluetooth 2.0 a 2.4GHz: poteva connettere fino a 4 controller simultaneamente con una latenza inferiore a 5ms.',
      'L\'unità ottica del Wii leggeva solo dischi proprietari: le versioni europee avevano il laser aggiornato per supportare sia DVD-R che DVD+R per le edizioni speciali.',
      'Nintendo creò internamente un nuovo formato audio BRSTM (Binary Revolution Sound Track) per il Wii che permetteva loop perfetti senza pop audio.'
    ]
  },
  'WIIU':  { 
    color: '#7c3aed', accent: '#a78bfa', emoji: '🎮', 
    cpu: 'IBM Espresso (Triple-Core PowerPC) @ 1.24 GHz', ram: '2 GB DDR3 (1 GB riservato ai giochi)', 
    gpu: 'AMD Radeon Latte @ 550 MHz', media: 'Dischi ottici proprietari ad alta densità (25 GB)', 
    topGame: 'Mario Kart 8 (8.46M)', resolution: '1080p Full HD',
    unitsSold: '13.6', score: 76, tags: ['GamePad Touch','Off-TV Play','Rarità Collezionistica'],
    funFacts: [
      'Commercialmente sfortunata, ma possiede uno dei tassi di capolavori first-party per unità venduta più alti di sempre.',
      'La latenza di streaming video wireless tra console e GamePad era inferiore a 16 millisecondi, più veloce di molte televisioni moderne via cavo!',
      'I bordi dei dischi del Wii U erano arrotondati e lisci al tatto per impedire che i bambini si tagliassero maneggiandoli.',
      'Il GamePad era il controller con schermo più grande mai incluso in bundle con una console: display LCD da 6.2 pollici resistivo.',
      'Nintendo Network ID era il primo sistema di account online Nintendo persistente della storia: gli acquisti digitali erano legati alla console, non all\'account.',
      'Splatoon nacque come prototipo di Wii U dove i personaggi erano Tofu bianchi che si dipingevano di colori: il motore di gioco precede la narrativa.',
      'Super Mario Maker consentiva di creare e condividere livelli con le dita sul GamePad: in 3 anni i giocatori caricarono oltre 7 milioni di livelli personalizzati.',
      'Bayonetta 2 era un\'esclusiva finanziata interamente da Nintendo: Platinum Games aveva cercato publisher per anni senza successo prima che Nintendo salvasse il progetto.',
      'Il GamePad includeva accelerometro, giroscopio, bussola, telecamera frontale, microfono, altoparlante, NFC per le amiibo e vibrazione motorizzata.',
      'Mario Kart 8 fu il primo gioco di corse della storia a far guidare personaggi sulle pareti e sul soffitto con gravità invertita a 60fps stabili.',
      'Xenoblade Chronicles X aveva una mappa del mondo esplorabile così grande che conteneva aree non raggiungibili normalmente senza i Mech (Doll): 400 km² totali.',
      'Il Miiverse era una rete sociale globale con disegni a mano libera integrati nei giochi: chiuse nel 2017 con oltre 3 miliardi di post pubblicati.',
      'The Wind Waker HD su Wii U era un remaster con texture upscalate da zero ad alta risoluzione e un sistema di illuminazione globale completamente riscritto.',
      'La modalità off-TV Play fu usata massivamente negli ospedali pediatrici per permettere ai bambini ricoverati di giocare nel letto senza occupare la TV della stanza.'
    ],
    deepDives: [
      'Il GamePad permetteva di giocare senza accendere la TV con latenza video pari a zero, gettando le basi concettuali della futura Nintendo Switch.',
      'Ha tenuto a battesimo franchise iconici moderni come Splatoon e Mario Maker, nati proprio per sfruttare l\'interazione tattile immediata a due schermi.',
      'La rete sociale Miiverse, con i suoi disegni a mano libera integrati direttamente nei livelli di gioco, rimane uno degli esperimenti di community più rimpianti della storia Nintendo.',
      'La CPU Espresso era un PowerPC 750 triple-core a 1.24GHz: progettato da IBM con cache L2 di 512KB per core e istruzionni SIMD per la matematica 3D.',
      'Il chip grafico AMD Latte operava a 550MHz con 512MB di eDRAM dedicata: permetteva effetti DirectX 10-equivalenti che PS3 e Xbox 360 non potevano replicare.',
      'Il sistema di sicurezza del Wii U usava cifratura AES-128 sia per i dischi ottici che per i download digitali, con chiavi uniche per ogni console prodotta.',
      'La modalità di streaming video al GamePad usava il protocollo Wi-Fi 802.11n a 5GHz con compressione H.264 hardware dedicata per mantenere la latenza sotto 16ms.',
      'Nintendo spese oltre 50 milioni di dollari in pubblicità per il lancio del Wii U, ma molti consumatori credevano fosse semplicemente un accessorio aggiuntivo del Wii originale.',
      'Fast Racing Neo/RMX su Wii U girava a 1080p/60fps con grafica che molti consideravano migliore di giochi PS4 equivalenti: dimostrava le capacità nascoste della GPU Latte.'
    ]
  },
  '3DS':   { 
    color: '#ec4899', accent: '#f9a8d4', emoji: '🎲', 
    cpu: 'Dual-Core ARM11 MPCore @ 268 MHz', ram: '128 MB FCRAM + 6 MB VRAM', 
    gpu: 'DMP PICA200 @ 134 MHz (illuminazione e texture per-pixel)', media: 'Schede 3DS (fino a 8 GB)', 
    topGame: 'Mario Kart 7 (18.9M)', resolution: '800 x 240 (400 x 240 per occhio in 3D)',
    unitsSold: '76.0', score: 83, tags: ['3D Autostereoscopico','StreetPass','Giroscopio'],
    funFacts: [
      'Visualizzava mondi tridimensionali profondi a occhio nudo senza bisogno di alcun paio di occhiali.',
      'Dopo un avvio di vendite lento a $250, Nintendo tagliò il prezzo a $170 e regalò 20 giochi gratuiti ai primi acquirenti (Programma Fedeltà Ambassadors).',
      'Le schede di Realtà Aumentata (AR Cards) incluse nella scatola facevano emergere bersagli e draghi tridimensionali dal tavolo del salotto.',
      'StreetPass scambiava automaticamente dati con ogni 3DS incrociato: nei grandi eventi gaming internazionali si ricevevano centinaia di tag in un solo pomeriggio.',
      'Il New 3DS XL aggiungeva un secondo stick analogico (C-Stick), due tasti aggiuntivi e una CPU più veloce da 804MHz esclusivamente per alcuni giochi.',
      'Fire Emblem: Awakening salvò il franchise dalla cancellazione: era stato deciso internamente che se non avesse venduto 250.000 copie, la serie si sarebbe conclusa.',
      'The Legend of Zelda: A Link Between Worlds introduceva la meccanica inedita di fondersi con le pareti come disegno bidimensionale in un mondo altrimenti 3D.',
      'Monster Hunter 4 Ultimate vendette così bene da sola da finanziare due generazioni di sviluppo di Monster Hunter World su PS4.',
      'Kid Icarus: Uprising aveva un sistema di dialogo mid-game unico: Pit e Palutena conversavano di tutto mentre combattevi, con oltre 2.000 linee registrate.',
      'Pokémon X e Y (2013) furono i primi capitoli 3D della saga: girando in 3D a 30fps in combattimento e 60fps nella mappa del mondo.\'',
      'Il 3DS supportava 3D a barriera di parallasse: due immagini leggermente sfasate venivano mostrate alternativamente a occhio sinistro e destro a 60Hz.',
      'Il New 3DS (2014) aveva il tracking facciale a infrarossi che regolava automaticamente la profondità 3D seguendo i movimenti della testa dell\'utente.',
      'Super Smash Bros. for 3DS girava a 60fps stabili mantenendo tutti i personaggi dalla versione Wii U, una prodezza tecnica considerata impossibile prima del lancio.',
      'Xenoblade Chronicles 3D fu portato su New 3DS esclusivamente: l\'originale Wii era diventato una rarità costosissima e il porting fu visto come un regalo ai fan.',
      'Il servizio Nintendo eShop del 3DS chiuse il 27 marzo 2023: in 12 anni aveva ospitato oltre 1.500 giochi digitali tra retail e indie.'
    ],
    deepDives: [
      'La funzionalità StreetPass trasformò le città in giganteschi hub di incontro asincrono per giocatori, scambiando personaggi e puzzle camminando con la console nello zaino.',
      'La GPU giapponese PICA200 gestiva effetti shader avanzati, illuminazione per-pixel e rendering autostereoscopico a barriera di parallasse.',
      'La versione New 3DS aggiunse il tracking oculare via infrarossi per mantenere il 3D perfetto anche muovendo la testa.',
      'Il sistema 3D autostereoscopico della barriera di parallasse del 3DS funzionava sovrapponendo due schermi: uno principale LCD e una maschera con fenditure che separavano le immagini per occhio.',
      'La CPU ARM11 dual-core era equivalente a quella dell\'iPhone 3G: Nintendo scelse un chip del 2007 per mantenere costi bassi e batteria lunga, non per potenza massima.',
      'Il PICA200 di DMP (Digital Media Professionals) era una GPU pensata per applicazioni embedded con supporto a shader di vertice e frammento programmabili a GLSL-ES.',
      'Il sistema di aggiornamento firmware del 3DS usava un sistema di partizioni NAND crittografate con AES-128-CTR: ogni regione aveva chiavi diverse per prevenire la pirateria cross-region.',
      'Il 3DS includeva un pedometro integrato nel firmware: ogni passo faceva guadagnare "Punti Gioco" spendibili nei StreetPass Games come Find Mii.',
      'Il chip WiFi del 3DS era un Atheros AR9000 con supporto 802.11b/g: la stessa famiglia di chip usata in molti notebook del periodo, scelta per la robustezza del driver.',
      'Corsi di sviluppo universitari citano il DSP audio del 3DS come esempio eccellente di architettura Harvard separata (istruzioni separate dai dati) in un sistema embedded moderno.'
    ]
  },
  'NSW':   { 
    color: '#f43f5e', accent: '#fda4af', emoji: '🟥', 
    cpu: 'Nvidia Tegra X1 (4x Cortex-A57) @ 1.02 GHz', ram: '4 GB LPDDR4 @ 1600 MHz condivisa', 
    gpu: 'Nvidia Maxwell 256 CUDA Core (fino a 768 MHz in dock)', media: 'Schede flash ROM (fino a 64 GB)', 
    topGame: 'Mario Kart 8 Deluxe (61.9M+)', resolution: '720p portatile / 1080p su Dock TV',
    unitsSold: '143.0', score: 91, tags: ['Console Ibrida','Joy-Con Rimovibili','HD Rumble'],
    funFacts: [
      'Le cartucce dei giochi sono cosparse di benzoato di denatonio (la sostanza più amara al mondo) per evitare che i bambini le ingeriscano.',
      'I sensori HD Rumble dei Joy-Con sono così precisi da poter simulare la sensazione di cubetti di ghiaccio che sbattono dentro un bicchiere.',
      'Permette di passare istantaneamente dal grande schermo TV del salotto alle mani in mobilità con un semplice "click" del dock.',
      'The Legend of Zelda: Breath of the Wild è il primo gioco open world dove ogni elemento dell\'ambiente risponde a leggi fisiche e chimiche realistiche coerenti.',
      'Nintendo Switch è la prima console Nintendo con un account system che lega gli acquisti all\'account utente e non alla console, consentendo il trasferimento.',
      'Il Joy-Con destro è più corto di 4mm rispetto al sinistro: una scelta ergonomica per bilanciare i pesi diversi dovuti al giroscopio IR aggiuntivo del modello destro.',
      'Animal Crossing: New Horizons fu rilasciato il 20 marzo 2020 durante i lockdown globali: divenne il gioco più venduto dell\'anno in molti paesi del mondo.',
      'Suika Game (il gioco delle angurie) è diventato il download eShop più veloce della storia Nintendo: oltre 5 milioni di copie in 2 settimane solo in Giappone.',
      'Il dock del Nintendo Switch include un chip USB 3.0 per ricaricare via USB-C standard: qualsiasi alimentatore Power Delivery compatibile funziona per ricaricare.',
      'Il Tegra X1 della Switch in dock porta la GPU a 768MHz, mentre in modalità portatile scende a 307MHz per risparmiare batteria: una differenza del 60% di potenza.',
      'Super Mario Odyssey vendette oltre 2 milioni di copie nel primo week-end mondiale, diventando il lancio Nintendo più veloce della storia fino a quel momento.',
      'Nintendo Switch Lite (2019) è la prima console Nintendo portatile fixed-controller senza TV mode da Game Boy: è il 40% più leggera e dura 7 ore di autonomia.',
      'Ring Fit Adventure vendette oltre 14 milioni di copie nel 2020: durante la pandemia era esaurita in tutto il mondo per mesi consecutivi.',
      'Metroid Dread (2021) fu annunciato per la prima volta nel 2005 per Nintendo DS e sviluppato segretamente per 16 anni prima di uscire su Switch.',
      'Il Joy-Con sinistro include un NFC reader nascosto nel D-pad per scansionare le amiibo: il destro ha invece una fotocamera IR da 320x240 per rilevare le mani.',
      'Splatoon 3 vendette 3.45 milioni di copie nel solo Giappone nelle prime 3 settimane: fu il lancio più veloce della storia videoludica giapponese.',
      'Nintendo Switch OLED (2021) ha un display Samsung OLED da 7 pollici con 1000:1 contrasto: i neri sono 100 volte più profondi dell\'LCD originale.',
      'La risoluzione interna massima del dock è 1080p60fps: alcuni titoli come Xenoblade Chronicles 3 usano DLSS temporale proprietario per scalare da 720p a 900p.',
      'Il bundle Nintendo Switch Sports (2022) ha avvicinato alla console milioni di famiglie che ricordavano con nostalgia Wii Sports del 2006.',
      'Il chip Wi-Fi della Switch supporta 802.11ac dual-band 5GHz ma il firmware lo limita al gaming per ridurre le interferenze nei tornei eSport su reti affollate.'
    ],
    deepDives: [
      'Grazie a capolavori immortali come Zelda: Breath of the Wild e una transizione fluidissima tra casa e viaggio, Switch ha unificato per sempre lo sviluppo fisso e portatile di Nintendo.',
      'L\'architettura Nvidia Tegra X1 basata su API NVN ha permesso conversioni insperate di engine moderni come Unreal Engine 4, id Tech e DOOM.',
      'I due Joy-Con possono funzionare sia come gamepad tradizionale unico che come due controller completamente separati per sfidare al volo un amico.',
      'Il SoC Tegra X1 integra CPU ARM Cortex-A57 e GPU Maxwell su un singolo die da 20nm TSMC: è lo stesso chip usato nello Nvidia Shield TV del 2015.',
      'Il sistema operativo della Switch è un microkernel proprietario Nintendo basato su Horizon OS: il boot avviene in circa 6 secondi, il wake-from-sleep è istantaneo.',
      'Il sistema di sicurezza Horizon OS usa TrustZone ARM con chiavi crittografate nel chip: la master key è memorizzata in un\'area one-time programmable (OTP) fisica non riscrivibile.',
      'Nintendo ha implementato il Dynamic Clock Frequency Scaling: il chip riduce automaticamente il clock a 307/460/768MHz in base al carico termico rilevato dalla sonda di temperatura.',
      'La batteria da 4310 mAh della Switch originale garantisce 2.5-6.5 ore in base al titolo: Zelda BotW la scarica in 3 ore, mentre Minecraft la tiene 6 ore.',
      'Il protocollo NFC delle amiibo sulla Switch usa NTAG215 con memoria da 540 byte: i dati del personaggio occupano 360 byte, i restanti 180 sono riservati al salvataggio del gioco.',
      'L\'HDMI del dock trasmette video tramite l\'interfaccia DisplayPort Alt Mode del connettore USB-C: la console converte automaticamente il segnale a seconda del display collegato.',
      'Ring Fit Adventure richiede il Joy-Con nel Ring-Con e nella fascia gamba per rilevare separatamente due punti del corpo: la fusione dei dati calcola postura, ritmo e forza.',
      'Il team di Switch ha sviluppato un sistema di firmware update OTA (Over-the-Air) che supporta il rollback: un update fallito può essere annullato automaticamente.'
    ]
  },

  // Sony PlayStation
  'PS1':   { 
    color: '#3b82f6', accent: '#93c5fd', emoji: '🔵', 
    cpu: 'MIPS R3000A (32-bit RISC) @ 33.87 MHz', ram: '2 MB RAM principale + 1 MB VRAM + 512 KB Audio', 
    gpu: 'Sony GPU (360k poligoni/sec texturizzati)', media: 'CD-ROM 2x (fino a 650 MB)', 
    topGame: 'Gran Turismo (10.85M)', resolution: '256 x 224 fino a 640 x 480',
    unitsSold: '102.5', score: 96, tags: ['Nascita del 3D Moderno','CD-ROM Audio','Memory Card'],
    funFacts: [
      'Nata dopo un clamoroso tradimento commerciale di Nintendo su un lettore CD per SNES annunciato a sorpresa con Philips.',
      'I simboli dei tasti non sono casuali: il Triangolo è il punto di vista, il Quadrato un foglio di carta, Cerchio Sì e Croce No.',
      'I dischi originali avevano il retro completamente nero lucido per contrastare la pirateria e dare un look premium alle stampe prime.',
      'Metal Gear Solid fu il primo videogioco a ricevere una colonna sonora registrata con orchestra sinfonica dal vivo in studio di registrazione professionale.',
      'Gran Turismo prese 5 anni di sviluppo da un team di soli 9 persone: il director Kazunori Yamauchi scrisse di persona quasi tutto il codice del motore fisico.',
      'Final Fantasy VII fu il primo JRPG a vendere oltre 10 milioni di copie globalmente, trasformando definitivamente il genere da nicchia a fenomeno mainstream.',
      'Il Dualshock originale fu introdotto nel 1997 come risposta diretta al controller con vibrazione di Nintendo 64 (Rumble Pak) brevettato un anno prima.',
      'PlayStation Network non esisteva per PS1: i salvataggi erano su Memory Card a 128KB con soli 15 blocchi disponibili che costavano 30 dollari l\'una.',
      'Crash Bandicoot fu creato specificatamente per essere il personaggio mascotte di Sony in risposta diretta a Super Mario 64 di Nintendo.',
      'Silent Hill generava la nebbia non per atmosfera ma per nascondere le limitazioni del motore 3D che non poteva renderizzare ambienti lontani.',
      'Tony Hawk\'s Pro Skater 2 fu valutato 98/100 da GameSpot e 100/100 da GameFan: rimane uno dei giochi più votati della storia del medium.',
      'Il chip GTE (Geometry Transformation Engine) della PS1 calcolava 1.5 milioni di trasformazioni di vettori al secondo per il rendering 3D dei poligoni.',
      'Twisted Metal Black originariamente era Twisted Metal 4 su PS1: il progetto fu così ambizioso da essere rimandato interamente alla PS2.',
      'Konami usò la PS1 per creare un training tool di calcio usato dalla Nazionale Giapponese nella preparazione ai Mondiali del 2002.',
      'Spyro the Dragon aveva un sistema di audio posizionale 3D così avanzato che i dev di Insomniac Games lo riutilizzarono come base per i loro titoli PS2.',
      'Final Fantasy Tactics richiese di girare i modelli poligonali isometrici di 30 gradi: era impossibile con un normale renderer 3D e richiedeva un motore proprietario.',
      'L\'audio ADPCM della PS1 supportava 24 canali simultanei a 44.1kHz: fu la prima console a supportare musica in qualità CD nativa direttamente dalla SPU dedicata.',
      'Ridge Racer fu il gioco di lancio PS1 più impressionante: caricava l\'intera pista in 9 secondi e poi girò un Galaxian arcade completo mentre aspettavi.',
      'Parappa the Rapper fu il primo rhythm game della storia su console: vendette così bene da generare l\'intero genere dei giochi ritmici moderni.',
      'Il chip CD-ROM della PS1 era identico a quello dei lettori Sony per PC: Sony poteva produrli in quantità enormi abbassando il costo unitario.'
    ],
    deepDives: [
      'Con costi dei CD ridotti a 2-3 dollari rispetto ai 30 dollari delle cartucce, Sony ha attratto centinaia di sviluppatori terzi e trasformato i videogiochi in un fenomeno pop.',
      'Il Geometry Transformation Engine (GTE) integrato nella CPU era capace di calcolare 1.5 milioni di trasformazioni di vettori al secondo per il 3D.',
      'Ha dato i natali a franchise storici che hanno fondato la narrazione cinematografica moderna: Metal Gear Solid, Resident Evil, Silent Hill e Tomb Raider.',
      'Il bus di sistema a 32-bit con DMA separato per CPU, GPU, CD-ROM e SPU permetteva trasferimenti paralleli che sfruttavano la larghezza di banda senza colli di bottiglia.',
      'La VRAM da 1MB era condivisa tra framebuffer, z-buffer e texture: era compito del developer ottimizzare l\'allocazione manualmente con i tool Sony.',
      'Il processore audio SPU era completamente indipendente dalla CPU: gestiva 24 canali ADPCM con riverbero hardware, pitch-shift e tremolo senza consumare cicli CPU.',
      'Il BIOS della PS1 includeva il font PlayStation, le routine di lettura CD e un menù di gestione Memory Card completo accessibile anche senza giochi inseriti.',
      'La GPU della PS1 non aveva z-buffering hardware: l\'ordine di disegno dei poligoni era determinato dal software, causando il tipico "texture flickering" dell\'era.',
      'Ken Kutaragi (padre della PlayStation) negoziò con Sony la creazione di una divisione videogame separata dalla divisione consumer electronics, contro ogni opposizione interna.',
      'Il lettore CD della PS1 usava un meccanismo di slitta più economico del laser su guide: si usurava nel tempo, causando il tipico problema di inclinare la console per far leggere i dischi.'
    ]
  },
  'PS2':   { 
    color: '#6366f1', accent: '#a5b4fc', emoji: '💿', 
    cpu: 'Emotion Engine (128-bit SIMD MIPS) @ 294.9 MHz', ram: '32 MB RDRAM @ 3.2 GB/s', 
    gpu: 'Graphics Synthesizer @ 147 MHz (4 MB eDRAM a 48 GB/s)', media: 'DVD-ROM 4x (4.7 GB / 8.5 GB)', 
    topGame: 'Grand Theft Auto: San Andreas (17.3M)', resolution: '480i / 480p (alcuni titoli 1080i)',
    unitsSold: '155.0', score: 97, tags: ['La più venduta di sempre','Lettore DVD integrato','Hardware da Leggenda'],
    funFacts: [
      'È la console casalinga più venduta della storia (155+ milioni di pezzi venduti in 13 anni di ciclo vitale ininterrotto).',
      'Il logo PS2 frontale può essere ruotato a mano di 90 gradi per posizionare la console sia in orizzontale che in verticale.',
      'Le torri bianche nella schermata di caricamento iniziale corrispondono al numero e alla dimensione dei salvataggi presenti sulla tua Memory Card!',
      'Al lancio nel 2000 costava meno di un comune lettore DVD standalone da salotto: Sony usò deliberatamente la PS2 per diffondere il formato DVD.',
      'Shadow of the Colossus aveva solo 16 nemici nell\'intero gioco: ogni colosso era un puzzle ambientale unico con decine di comportamenti programmati.',
      'Kingdom Hearts nacque da un brainstorming tra un producer Square e un dirigente Disney in ascensore: l\'idea era mescolare Final Fantasy con Topolino.',
      'God of War fu sviluppato in 2.5 anni da un team di 100 persone: Kratos fu disegnato ispirandosi all\'attore Vin Diesel per la mascella prominente.',
      'Grand Theft Auto: San Andreas aveva un motore fisico così avanzato che l\'IA dei pedoni seguiva un ciclo giorno/notte con routine comportamentali randomizzate.',
      'Ico fu il primo gioco a usare l\'effetto di motion blur fotografico sulle inquadrature cinematografiche per simulare l\'estetica di un film live-action.',
      'La PS2 continuò a ricevere nuovi giochi fino al 2013 in Brasile, 13 anni dopo il lancio: fu l\'ultimo mercato attivo al mondo per la console.',
      'L\'Emotion Engine aveva 10.5 milioni di transistor su 250nm: nel 2000 era uno dei chip più complessi e densi mai prodotti per uso consumer.',
      'Zone of the Enders fu pubblicato principalmente come demo di Metal Gear Solid 2: Kojima sapeva che nessuno avrebbe comprato ZoE senza un demo MGS2 incluso.',
      'Il network adapter per PS2 trasformava la console in un client online: SOCOM: U.S. Navy SEALs fu il primo fps online su console con oltre 1 milione di giocatori.',
      'La versione "Slim" del 2004 ridusse il peso da 2.4kg a 900g eliminando il modulo di espansione e utilizzando un alimentatore esterno.',
      'Shadow of the Colossus usava una tecnica di rendering per il pelo e le piume che richiedeva 80% della potenza del processore grafico per singolo colosso.',
      'Burnout 3: Takedown fu il gioco racing PS2 più venduto con oltre 5 milioni di copie: Electronic Arts acquisì Criterion proprio per ottenere il franchise.',
      'La PS2 era la console preferita dell\'esercito americano per simulazioni di guida e training: il DoD ne acquistò oltre 3.000 unità per sistemi embedded.',
      'Yakuza (Ryū ga Gotoku) nacque dalla PS2 nel 2005: il director Toshihiro Nagoshi girò personalmente le strade di Kabukichō per creare la mappa digitale.',
      'Il chip IOP della PS2 era l\'intera CPU della PS1 riciclata per la retrocompatibilità: giocando ai giochi PS1 la PS2 disabilitava l\'Emotion Engine e usava solo l\'IOP.',
      'Gran Turismo 3 A-Spec aveva 150 vetture modellate da zero con 3.000 poligoni ciascuna: il team trascorse 3 mesi a fotografare le auto reali da ogni angolazione possibile.'
    ],
    deepDives: [
      'Al lancio costava meno di un comune lettore DVD da salotto; l\'architettura Emotion Engine con 2 unità vettoriali VPU richiedeva mesi di studio, ma offriva un fill-rate mostruoso per l\'epoca.',
      'La memoria video eDRAM integrata direttamente sul chip grafico garantiva un incredibile bandwidth di 48 GB/s senza precedenti per l\'anno 2000.',
      'La vastità della sua libreria (oltre 3.800 giochi ufficiali) ha segnato l\'apice creativo dell\'era PlayStation prima dell\'avvento dei costi di sviluppo moderni.',
      'L\'Emotion Engine usava due VU (Vector Units) paralleli: VU0 gestiva la fisica e la trasformazione geometrica, VU1 gestiva il rasterizzazione e il clipping.',
      'La SPU2 della PS2 gestiva 48 canali audio a 48kHz con riverbero hardware e DSP programmabile: era tecnicamente superiore a molte schede audio PC del 2000.',
      'Il bus di dati interno era a 128-bit con larghezza di banda di 3.2 GB/s: ogni frame poteva essere popolato con trasformazioni geometriche massicce senza colli di bottiglia.',
      'Il chip IOP integrava la CPU della PS1, il DMA controller, e tutti i chip di I/O in un unico die: permetteva retrocompatibilità quasi perfetta al 99% dei titoli PS1.',
      'Il BIOS della PS2 includeva un player DVD completo con telecomando opzionale: Sony vendeva separatamente il Remote Commander che si inseriva nel port memory card.',
      'La GPU Graphics Synthesizer aveva una bandwidth di 48 GB/s sulla eDRAM interna ma solo 3.2 GB/s verso la RAM principale: i developer dovevano ottimizzare la gerarchia.',
      'Il motore fisico custom di GTA: San Andreas simulava la densità del traffico veicolare in base all\'ora del giorno usando un sistema a agente con memoria di breve termine.'
    ]
  },
  'PS3':   { 
    color: '#8b5cf6', accent: '#c4b5fd', emoji: '🔮', 
    cpu: 'Cell Broadband Engine (1 PPE + 7 SPE) @ 3.2 GHz', ram: '256 MB XDR RAM + 256 MB GDDR3 VRAM', 
    gpu: 'Nvidia RSX "Reality Synthesizer" @ 500 MHz', media: 'Blu-ray Disc 2x (25 GB / 50 GB) + HDD interno', 
    topGame: 'Grand Theft Auto V (29.5M)', resolution: '1080p Full HD nativo / 720p',
    unitsSold: '87.4', score: 80, tags: ['Processore Cell','Lettore Blu-ray','Hard Disk di Serie'],
    funFacts: [
      'L\'US Air Force collegò 1.760 console PS3 per creare il "Condor Cluster", un supercomputer federato per elaborazione radar militare a basso costo.',
      'Il primo modello "Fat" del 2006 pesava ben 5 chilogrammi ed era compatibile con l\'installazione di distribuzioni Linux ufficiali tramite OtherOS.',
      'Il font usato per la scritta "PLAYSTATION 3" era lo stesso del logo dei film di Spider-Man di Sam Raimi: font "Spider-Man" di Ray Cruz.',
      'Il processore Cell fu sviluppato congiuntamente da Sony, IBM e Toshiba con un investimento di oltre 400 milioni di dollari in 4 anni di ricerca.',
      'Uncharted 2: Among Thieves ricevette 32 premi Game of the Year 2009 dalla critica internazionale: un record che tenne fino a The Last of Us.',
      'The Last of Us aveva cicli di IA nemici così complessi che i design document dell\'intelligenza artificiale erano più lunghi del manuale di gioco completo.',
      'PlayStation Plus fu lanciato nel 2010 per PS3 come servizio mensile opzionale con giochi gratuiti: trasformò il modello di abbonamento nel nuovo standard dell\'industria.',
      'BlazBlue: Calamity Trigger aveva la storia più lunga di un picchiaduro: 30 ore di testo letto a voce da doppiatori professionisti per ogni personaggio.',
      'La PlayStation 3 fu hackerata pubblicamente da George Hotz nel 2010 usando solo PlayStation Network e un exploit hardware: Sony intentò una causa che creò un caso legale internazionale.',
      'Il modello 60GB originale della PS2 includeva chip hardware PS2 completo: i successivi modelli usavano emulazione software sempre meno accurata.',
      'Heavy Rain ricevette il Motion Capture più articolato mai usato su PS3: attori reali recitarono le scene in un set vero con 64 marker di rilevamento contemporaneamente.',
      'La PS3 usava il controller SixAxis con giroscopio a 6 assi ma senza vibrazione: l\'assenza fu causata da una causa legale con Immersion Corporation sul brevetto rumble.',
      'Metal Gear Solid 4 richiedeva installa obbligatoria di 9GB sull\'HDD: il gioco mostrava Snake che fumava durante l\'installazione come scena narrativa.',
      'Demons\' Souls fu rifiutato da Sony per la distribuzione occidentale: Atlus USA lo pubblicò autonomamente e divenne il culto che portò al franchise Souls.',
      'Il PlayStation Move fu sviluppato dopo che Sony acquistò la brevettazione del tracking ottico con sfera colorata dalla startup SixSense Technologies nel 2006.',
      'Resistance: Fall of Man conteneva una ricostruzione digitale ultra-dettagliata della Cattedrale di Manchester: la chiesa fece causa a Sony per uso non autorizzato.',
      'La PS3 aveva un chip helper CELL aggiuntivo chiamato "Southbridge" che gestiva audio, Bluetooth e USB separatamente dalla CPU principale.',
      'L\'aggiornamento firmware 3.21 del 2010 rimosse la feature OtherOS dai modelli Slim: Sony fu accusata di "bait and switch" e perse alcune cause legali negli USA.',
      'Little Big Planet vendette 5.5 milioni di copie ma generò oltre 10 milioni di livelli utente: Media Molecule dovette scalare i server 100x rispetto alle previsioni.'
    ],
    deepDives: [
      'Il Cell processor era un mostro di calcolo parallelo in virgola mobile; superate le difficoltà iniziali di programmazione, permise a Naughty Dog di plasmare capolavori visivi come Uncharted 2 e The Last of Us.',
      'L\'integrazione nativa del lettore Blu-ray Disc fu il fattore decisivo che permise a Sony di vincere la sanguinosa guerra dei formati contro l\'HD-DVD di Toshiba e Microsoft.',
      'I 7 coprocessori SPE gestivano fisica, post-processing e particelle con velocità superiori a qualsiasi CPU desktop concorrente di quel decennio.',
      'Il Cell Broadband Engine aveva la PPE principale a 3.2GHz e 7 SPE a 3.2GHz ciascuno: in totale era capace di 218 GFLOPS in virgola mobile singola, paragonabile a workstation del 2006.',
      'La GPU RSX di Nvidia era basata su G70 (GeForce 7800) con 244M transistor su 90nm TSMC: supportava Shader Model 3.0 con 24 pixel shader units.',
      'Il bus di interconnessione FlexIO tra Cell e RSX aveva bandwidth di 20 GB/s bidirezionale: un primato per un sistema consumer del 2006.',
      'Il Hypervisor della PS3 eseguiva il sistema operativo Sony e (originariamente) Linux in ambienti virtuali separati con accesso limitato alla GPU.',
      'L\'unità Blu-ray della PS3 usava un laser a diodo InGaN blu da 405nm: la stessa lunghezza d\'onda usata nei lettori Blu-ray Sony standalone da 1000 dollari.',
      'Il firmware della PS3 includeva un emulatore PS1 software completo integrato: funzionava con quasi tutti i 3.000 giochi PS1 tramite la libreria interna.',
      'Sony fece collaborare Guerrilla Games con Naughty Dog per condividere tecnologie grafiche: il Killzone engine e il Drake engine condividevano il sistema di illuminazione globale.'
    ]
  },
  'PS4':   { 
    color: '#2563eb', accent: '#60a5fa', emoji: '🎮', 
    cpu: 'AMD Jaguar 8-Core x86-64 @ 1.6 GHz', ram: '8 GB GDDR5 unificata @ 176 GB/s', 
    gpu: 'AMD Radeon GCN (18 Compute Unit, 1.84 TFLOPS)', media: 'Blu-ray BD-ROM 6x + HDD rimovibile', 
    topGame: 'Marvel\'s Spider-Man (20M+)', resolution: '1080p nativo a 60fps',
    unitsSold: '117.2', score: 78, tags: ['Architettura x86','Tasto Share','GDDR5 Unificata'],
    funFacts: [
      'Fu la prima console a integrare un pulsante fisico dedicato al livestreaming immediato (Share), generando miliardi di clip video online.',
      'La barra luminosa Lightbar del DualShock 4 cambiava colore dinamicamente: blu per P1, rosso per P2, verde per P3, rosa per P4.',
      'L\'architettura fu guidata da Mark Cerny che consultò decine di software house per renderla la console più amata dai programmatori.',
      'Sony annunciò alla conferenza PS4 del 2013 la console senza mostrare la scocca: fu rivelata fisicamente solo 4 mesi dopo all\'E3.',
      'God of War (2018) fu girato interamente in un piano sequenza senza tagli: Cory Barlog rifiutò ogni proposta di dissolvenza o transizione.',
      'Bloodborne fu sviluppato in collaborazione con FromSoftware come esclusiva finanziata: fu il gioco che portò l\'estetica gothic-horror nel franchise Souls.',
      'L\'aggiornamento PS4 Pro del 2016 aggiungeva GPU da 4.2 TFLOPS e supporto 4K con tecnica di upscaling Checkerboard Rendering per simulare la risoluzione nativa.',
      'Horizon Zero Dawn vendette 7.6 milioni di copie in 6 mesi: fu il lancio PS4 più veloce per un nuovo franchise originale nella storia Sony.',
      'Il DualShock 4 fu il primo controller PlayStation con touchpad fisico: Surface Multi-touch a 1300 DPI che registrava due tocchi simultanei.',
      'The Last of Us Part I aveva un sistema di IA nemici basato su 300 behaivor tree distinti: ogni personaggio IA aveva 15 stati mentali diversi.',
      'Persona 5 fu sviluppato su PS3 ma publishato principalmente su PS4 nel 2017: la versione PS4 aveva texture ad alta risoluzione che la PS3 non poteva caricare.',
      'PlayStation VR fu l\'HMD VR consumer più venduto al lancio: 915.000 unità nelle prime 2 settimane mondiali del 2016.',
      'Detroit: Become Human aveva oltre 40 finali diversi e 4 ore di cutscene non visionabili in una singola partita: il grafo delle scene aveva 2.000 nodi.',
      'La PS4 usava un SSD opzionale su alcune versioni: sostituendo l\'HDD interno con un SSD i tempi di caricamento si riducevano del 40-60% in molti titoli.',
      'Sekiro: Shadows Die Twice richiese un anno aggiuntivo di sviluppo dopo il completamento: l\'intero sistema di parry fu riscritto da zero durante la fase di polish.',
      'L\'unità ottica Blu-ray della PS4 era prodotta da Sony DADC: leggeva dischi a 6x con throughput di 27 MB/s, sufficiente per streaming video 4K da disco.',
      'The Last Guardian fu in sviluppo per 8 anni: Team Ico iniziò su PS3 nel 2007 e portò il progetto su PS4 nel 2013 ricominciando da zero il motore grafico.',
      'Marvel\'s Spider-Man aveva un sistema procedurale di traversal: Peter Parker si aggrappava automaticamente agli angoli degli edifici in base alla geometria urbana.',
      'PlayStation Now (ora PS Plus Premium) fu il primo servizio di cloud gaming su console: permetteva di streammare titoli PS3 direttamente su PS4 dal 2015.',
      'Red Dead Redemption 2 aveva una mappa del mondo 4x più grande del primo capitolo con 200 specie animali distinte e un ciclo meteorologico a 12 zone geografiche.'
    ],
    deepDives: [
      'Sony abbandonò le architetture proprietarie esotiche a favore di un solido x86 da PC gaming con 8GB di velocissima memoria GDDR5 unificata, facilitando immensamente il lavoro di programmatori terzi.',
      'La funzione "Sospendi/Riprendi" in modalità riposo permise ai giocatori di interrompere e riavviare istantaneamente una partita complessa in pochi secondi.',
      'Ha consolidato il primato delle grandi produzioni narrative per giocatore singolo (God of War, Horizon Zero Dawn, Bloodborne).',
      'La GPU GCN con 1.84 TFLOPS superava di oltre 4 volte la potenza teorica del Cell PS3: l\'era dei porting difficili era finalmente terminata.',
      'L\'architettura APU AMD con CPU e GPU sullo stesso die condividevano la stessa pool da 8GB GDDR5: eliminava i colli di bottiglia di trasferimento tra i due chip.',
      'Il sistema di shading GPGPU della PS4 permetteva compute shader per simulazione fisica, ambient occlusion e anti-aliasing temporale senza caricare la CPU principale.',
      'Il DualShock 4 usava un chip Bluetooth 2.1+EDR con latenza di 12ms: inferiore ai 16ms di un frame a 60fps, garantendo input responsivo per i giochi competitivi.',
      'Sony progettò la memoria GDDR5 a 176 GB/s unificata risolvendo il problema del bandwidth eterogeneo che affliggeva la PS3 con le sue due RAM separate.',
      'Il sistema di remote play della PS4 trasmetteva in streaming H.264 a 1080p60fps tramite PS Vita, PS TV o app mobile: usava il codec H.265 su connessioni rapide.',
      'Il Knack engine di Mark Cerny processava fino a 10.000 frammenti individuali per personaggio usando compute shaders per collisioni e fisica in tempo reale.'
    ]
  },
  'PSP':   { 
    color: '#ec4899', accent: '#f9a8d4', emoji: '📱', 
    cpu: 'MIPS R4000 32-bit @ 333 MHz', ram: '32 MB RAM principale (64 MB su PSP-2000/3000) + 2 MB VRAM', 
    gpu: 'Processore grafico con curve di Bezier e rendering 3D', media: 'Disco ottico miniaturizzato UMD (1.8 GB)', 
    topGame: 'Grand Theft Auto: Liberty City Stories (8M)', resolution: '480 x 272 px panoramico 16:9',
    unitsSold: '80.0', score: 83, tags: ['Schermo 16:9','Supporto UMD','Grafica Livello PS2'],
    funFacts: [
      'Portò la qualità cinematografica e la grafica 3D da home console in tasca già nel 2004, quando i telefoni cellulari giocavano a Snake.',
      'I dischi UMD potevano contenere film interi hollywoodiani come Spider-Man 2 e Final Fantasy VII: Advent Children ad alta risoluzione.',
      'La community di sviluppatori creò un florido ecosistema di firmware custom che trasformò la console nella regina dell\'emulazione portatile.',
      'Monster Hunter Freedom Unite in Giappone creò un fenomeno culturale: studenti si riunivano in parchi per cacce cooperative con le PSP.',
      'La PSP aveva un browser web integrato: poteva navigare siti reali tramite Wi-Fi, una funzionalità rivoluzionaria per il 2005.',
      'Crisis Core: Final Fantasy VII vendette 2 milioni di copie in Giappone in 3 giorni: le scorte mondiali si esaurirono completamente alla release.',
      'La PSP-3000 aveva uno schermo LCD con rivestimento anti-riflesso ottimizzato: riduceva il glare del 60% rispetto ai modelli precedenti per uso all\'aperto.',
      'Grand Theft Auto: Liberty City Stories fu originariamente esclusiva PSP ma l\'immensa domanda costrinse Rockstar a portarlo su PS2 6 mesi dopo.',
      'I dev kit PSP costavano 4.000 dollari nel 2004: permettevano sviluppatori indipendenti di creare giochi PSP senza investimenti da milioni di dollari.',
      'Loco Roco aveva una meccanica di tilt totale: tutta la mappa rotava usando i tasti LR, eliminando la necessità di un d-pad fisico per il movimento.'
    ],
    deepDives: [
      'Con uno sbalorditivo display widescreen a 16:9, uscita TV video e capacità di riprodurre MP3 e film, fu considerata anni avanti rispetto ai suoi tempi.',
      'In Giappone divenne un autentico fenomeno sociale grazie a Monster Hunter Freedom Unite, radunando milioni di giocatori nei parchi per cacce cooperative.',
      'La CPU era limitata via software a 222 MHz per risparmiare batteria, ma Sony sbloccò i pieni 333 MHz con aggiornamenti successivi per i titoli più esigenti.',
      'Il chip multimediale Media Engine della PSP gestiva decodifica video MPEG-4/H.264 in hardware: permetteva la riproduzione di film UMD senza caricare la CPU principale.',
      'L\'infrastruttura wireless della PSP usava 802.11b a 11Mbps: supportava ad-hoc tra console vicine e infrastruttura via access point per online gaming.',
      'La batteria sostituibile della PSP era da 1800mAh: Sony vendeva una batteria estesa da 2200mAh che aggiungeva una gobba posteriore ma raddoppiava l\'autonomia.',
      'Il sistema di sicurezza PSP usava la crittografia AES-128 per i dati dei giochi sulla Memory Stick: fu aggirato nel 2005 tramite exploit del firmware 1.50.',
      'God of War: Chains of Olympus sulla PSP fu considerato impossibile da portare su hardware portatile: Santa Monica Studio sviluppò tecniche di LOD (Level of Detail) mai usate prima su console.'
    ]
  },
  'VITA':  { 
    color: '#a855f7', accent: '#d8b4fe', emoji: '💎', 
    cpu: 'Quad-Core ARM Cortex-A9 MPCore @ 444 MHz', ram: '512 MB RAM + 128 MB VRAM dedicata', 
    gpu: 'PowerVR SGX543MP4+ Quad-Core', media: 'Schede proprietarie NVG Card (fino a 4 GB)', 
    topGame: 'Minecraft (oltre 2.5M su Vita)', resolution: '960 x 544 px (16:9 qHD)',
    unitsSold: '15.0', score: 89, tags: ['Display OLED da urlo','Doppio Stick Analogico','Retro Touchpad'],
    funFacts: [
      'Il suo display OLED originale del 2011 offre neri assoluti e saturazione che battevano gli smartphone di fascia alta del periodo.',
      'Consentiva il Remote Play totale per giocare a tutti i titoli PlayStation 4 in streaming Wi-Fi direttamente nel palmo della mano.',
      'Disponeva di un touchpad capacitivo posteriore che permetteva di interagire con il retro dei mondi virtuali senza coprire la visuale.',
      'Persona 4 Golden è considerato il gioco JRPG definitivo: vendette più copie su Vita che su PS2 nonostante la base installata dieci volte inferiore.',
      'Gravity Rush era l\'unico gioco al mondo dove la gravità si invertiva in qualsiasi direzione usando il giroscopio: non esistevano piani fissi nel gameplay.',
      'Le schede proprietarie NVG erano 10 volte più costose delle equivalenti MicroSD: una card da 32GB costava 100 dollari contro i 10 dollari delle MicroSD del periodo.',
      'Killzone: Mercenary su Vita era tecnicamente impressionante: Guerrilla Cambridge creò uno shader deferred lighting mai usato su hardware portatile precedente.',
      'La PS Vita aveva un processore di sicurezza separato (F00D) completamente indipendente dalla CPU principale per gestire crittografia e autenticazione.',
      'Danganronpa fu tradotto in occidente solo grazie alla PS Vita: senza il pubblico occidentale della console probabilmente non avremmo mai visto il franchise fuori dal Giappone.',
      'Il chip Ernie (security processor) della Vita non fu mai compromesso ufficialmente: l\'exploit hacker usato per l\'homebrewing funzionava solo sulla CPU ARM principale.'
    ],
    deepDives: [
      'Console sopraffina e amatissima dai collezionisti per il display OLED, doppio stick analogico puro e touchpad posteriore; penalizzata dal costo spropositato delle memorie proprietarie.',
      'La GPU quad-core PowerVR era la stessa usata nei tablet iPad di punta, garantendo una fedeltà grafica stupefacente per il 2011 con titoli come Uncharted: L\'Abisso d\'Oro.',
      'È diventata la dimora di culto per indie game acclamati, visual novel e capolavori JRPG (in primis Persona 4 Golden).',
      'Il SoC della PS Vita combinava CPU ARM Cortex-A9 quad-core con GPU SGX543MP4 su un unico die: un livello di integrazione che anticipò i futuri SoC per smartphone.',
      'Il sistema di Remote Play via Wi-Fi trasmetteva video H.264 a 60fps con latenza inferiore a 100ms su rete domestica: sufficiente per giochi non competitivi su PS4.',
      'Il display OLED da 5 pollici aveva risoluzione 960x544: superiore a tutti gli smartphone del 2012 (il Samsung Galaxy S3 aveva 720p su 4.8 pollici).',
      'Sony prodotto il modello Slim con display LCD nel 2013 per ridurre i costi: il display era tecnicamente inferiore all\'OLED ma consumava meno batteria.',
      'La PS Vita fu la prima console con un sistema di Trophies sincronizzato con PSN: i trofei ottenuti su Vita apparivano sul profilo PlayStation Network principale.'
    ]
  },

  // Sega
  'SMD':   { 
    color: '#06b6d4', accent: '#67e8f9', emoji: '🔵', 
    cpu: 'Motorola 68000 @ 7.67 MHz + Zilog Z80 @ 3.58 MHz', ram: '64 KB RAM + 64 KB VRAM + 8 KB Audio', 
    gpu: 'Yamaha YM2612 (FM Synth a 6 canali) + VDP video', media: 'Cartucce ROM fino a 40 Mbit', 
    topGame: 'Sonic the Hedgehog (15M+ bundled)', resolution: '320 x 224 px',
    unitsSold: '30.7', score: 87, tags: ['Blast Processing','Sonic Mania','16-bit Pura Adrenalina'],
    funFacts: [
      'Il termine pubblicitario "Blast Processing" nacque per evidenziare la maggiore frequenza di clock del chip Motorola rispetto al processore dello SNES.',
      'Michael Jackson compose segretamente gran parte della leggendaria colonna sonora di Sonic the Hedgehog 3, mai accreditato ufficialmente.',
      'Sega consentì il sangue non censurato nella versione Mega Drive di Mortal Kombat tramite il codice segreto ABACABB, stravincendo la battaglia commerciale su Nintendo.',
      'Streets of Rage 2 è considerato il picchiaduro a scorrimento più perfetto tecnicamente mai realizzato: la OST di Yuzo Koshiro fu prodotta su Amiga 500.',
      'Sonic the Hedgehog fu creato come alternativa a Super Mario: Yuji Naka volle un mascotte che potesse attraversare lo schermo così velocemente da essere impossibile da vedere.',
      'Il Mega Drive aveva due CPU: il 68000 gestiva il gioco principale mentre lo Z80 era dedicato esclusivamente all\'audio FM, permettendo musica di qualità senza impatto sulle performance.',
      'Earthworm Jim fu una delle poche cartucce Mega Drive con un chip audio migliorato (PCM stereo) integrato direttamente nel circuito stampato della cartuccia.',
      'Toejam & Earl fu rifiutato da Sega of Japan e approvato solo da Sega of America: la scena rap e hip-hop del gioco era incomprensibile per il mercato giapponese.',
      'Il Sega Channel fu il primo servizio di download giochi su cavo coassiale al mondo: 50 titoli Mega Drive mensili per 14,95 dollari mensili dal 1994 al 1998.',
      'Vectorman fu l\'ultimo grande gioco first-party Mega Drive e tecnicamente il più avanzato: usava metaball rendering e sprite scalati con tecnica mai usata prima su 16-bit.',
      'Phantasy Star IV conteneva più testo di qualsiasi altro JRPG su console 16-bit: la traduzione americana fu lunga quanto un romanzo di 200 pagine.',
      'Il connettore EXT del Mega Drive serviva per periferiche non distribuite in occidente: in Giappone esistevano un modem e un sintetizzatore MIDI collegabili.',
      'Aladdin per Mega Drive fu sviluppato da Virgin Games con animatori Disney reali: ogni fotogramma del personaggio era disegnato da mani dello stesso studio.',
      'Il Mega Drive Model 2 del 1993 era il 40% più piccolo e leggero del Model 1: Sega lo realizzò per competere con il lancio del Super Nintendo in Occidente.',
      'Comix Zone fu il gioco Mega Drive con il concept più originale: si giocava letteralmente dentro le vignette di un fumetto con pannelli che si rompevano durante la lotta.'
    ],
    deepDives: [
      'Guidata da Tom Kalinske in Nord America col celebre slogan "Genesis does what Nintendon\'t", ha sconfitto temporaneamente il monopolio Nintendo negli USA.',
      'Il sintetizzatore FM Yamaha YM2612 donava alla console quel sound metallico, ritmico ed energico tipico dell\'eurodance e dei club techno degli anni \u201990.',
      'Fu la prima ad esplorare espansioni modulari a torre con il Sega CD (lettore ottico) e il 32X (doppio processore SH-2).',
      'Il processore 68000 era un CISC a 32-bit internamente ma con bus dati a 16-bit verso la memoria: permetteva operazioni matematiche a 32-bit con due cicli di fetch.',
      'Il chip VDP (Video Display Processor) del Mega Drive supportava 4 piani parallasse ma mancava del Mode 7 dello SNES: le rotazioni erano simulate con raster interrupt.',
      'Il Sega CD aggiungeva una CPU 68000 aggiuntiva da 12.5MHz, 6MB di RAM totale e un chip ASIC dedicato per scaling e rotation hardware delle immagini.',
      'Il 32X aggiungeva due SH-2 a 23MHz con 256KB di SDRAM dedicata: i giochi 32X gestivano entrambi i processori in pipeline per splitting del lavoro.',
      'La tecnica del "Blast Processing" esisteva davvero: il 68000 del Mega Drive era free-running sul bus dati, permettendo burst di 16MB/s contro gli 8MB/s dello SNES a clock sincronizzato.',
      'La colonna sonora di Streets of Rage 2 fu compositata su sequencer Amiga 500 da Yuzo Koshiro e poi trascrtta manualmente per il chip FM YM2612 nota per nota.',
      'Il Mega Drive non aveva audio campionato nativo: i dev usavano il canale PCM del YM2612 per riprodurre campioni a 8kHz, creando suoni vocali limitati ma riconoscibili.'
    ]
  },
  'SAT':   { 
    color: '#10b981', accent: '#6ee7b7', emoji: '🪐', 
    cpu: 'Doppio Hitachi SH-2 (32-bit RISC) @ 28.6 MHz', ram: '2 MB RAM + 1.5 MB VRAM + 512 KB Audio', 
    gpu: 'VDP1 (rendering sprite/quadrilateri) + VDP2 (sfondi)', media: 'CD-ROM 2x (fino a 650 MB)', 
    topGame: 'Virtua Fighter 2 (2.2M)', resolution: '320 x 224 fino a 704 x 480',
    unitsSold: '9.5', score: 85, tags: ['Doppio CPU','Re dei Picchiaduro 2D','Gemma dei Collezionisti'],
    funFacts: [
      'È universalmente riconosciuta come la console definitiva per i picchiaduro 2D arcade Capcom e SNK con conversioni fedeli al 100%.',
      'Negli USA Sega annunciò il lancio a sorpresa durante l\'E3 1995 al prezzo di $399; pochi minuti dopo Steve Race di Sony disse solo "$299" e andò via.',
      'Il mitico personaggio pubblicitario Segata Sanshiro picchiava i giovani giapponesi che non giocavano al Sega Saturn in memorabili spot TV.',
      'Nights into Dreams fu il gioco Saturn più importante per Yuji Naka: considerato il capolavoro personale del creatore di Sonic, mai portato su altre piattaforme.',
      'Panzer Dragoon Saga ha solo 6.000 copie distribuite negli USA: oggi vale tra 400 e 800 dollari per una copia completa in buono stato.',
      'La Saturn supportava un'espansione RAM da 4MB venduta solo in Giappone: permetteva conversioni arcade perfette di King of Fighters e Vampire Savior.',
      'Virtua Cop per Saturn fu il primo light gun game della storia a supportare una pistola con puntamento preciso su display CRT senza calibrazione manuale.',
      'Il Saturn fu la console preferita dei torneisti di picchiaduro giapponesi per tutta la fine degli anni \u201990: i pad analogici e la precisione del d-pad erano insuperabili.',
      'Dragon Force era un gioco di strategia con battaglie da 100 vs 100 soldati contemporaneamente sullo schermo, un primato assoluto per hardware del 1996.',
      'Il modello Saturn griglio NTSC-J originale aveva un controller con d-pad identico all\'arcade MVS di SNK: ogni diagonale era perfettamente registrata.',
      'Sega vendette un adattatore Saturn-NETLINK per connettersi a internet via modem 28.8kbps nel 1996: permetteva gaming online anni prima di Xbox Live.',
      'Capcom portò su Saturn l\'esatta ROM arcade di X-Men vs Street Fighter con l\'espansione RAM: il porting era pixel-perfect al 100%, impresa impossibile su PS1.',
      'Guardian Heroes fu il beat-em-up con il cast di personaggi più grande della storia console: oltre 40 personaggi selezionabili con 21 finali alternativi.',
      'Il Saturn aveva un clock real-time integrato con batteria di backup: permetteva timer di gioco reali, sistemi di rarità temporale e salvataggi con data e ora.'
    ],
    deepDives: [
      'I suoi due chip video (VDP1 e VDP2) manipolavano poligoni quadrangolari anziché triangolari: era una macchina 2D insuperabile, ma la complessità del doppio processore mise in crisi gli sviluppatori.',
      'L\'espansione RAM cartridge da 4 MB permetteva conversioni arcade perfette al 100% con frame di animazione completi mai visti su altre piattaforme da casa.',
      'Capolavori visionari come Nights into Dreams e Panzer Dragoon Saga rimangono pietre miliari irraggiungibili della storia videoludica.',
      'Il VDP1 della Saturn renderizzava sprite come quadrilateri texturizzati con prospettiva corretta: era perfetto per sprite HD 2D ma inefficiente per poligoni 3D puri.',
      'Il doppio SH-2 a 28.6MHz era collegato in modalità master-slave via bus condiviso con arbitraggio hardware: solo uno alla volta poteva accedere alla RAM video.',
      'Il SCSP (Saturn Custom Sound Processor) gestiva 32 canali audio PCM a 44.1kHz con riverbero hardware integrato basato sul chip Yamaha FH1.',
      'La shell del Saturn rivestita in grigio scuro fu scelta per distinguerla dalla PS1 bianca: Sega voleva evocare l\'estetica delle workstation professionali SGI.',
      'Il sistema di sicurezza hardware del Saturn usava un chip dedicato che verificava il country code del disco e la firma digitale Sega prima di avviare qualsiasi titolo.',
      'Segagaga per Sega Saturn fu un gioco meta-parodia dove il giocatore gestiva Sega come CEO cercando di salvare l\'azienda dalla bancarotta: mai uscito fuori dal Giappone.',
      'Il bus dati interno del Saturn aveva larghezza di 64-bit verso la VRAM: permetteva al VDP2 di scorrere sfondi a 60fps con tile da 8x8 pixel in modalità hardware.'
    ]
  },
  'DC':    { 
    color: '#f59e0b', accent: '#fcd34d', emoji: '🌀', 
    cpu: 'Hitachi SH-4 (128-bit FPU) @ 200 MHz (360 MIPS)', ram: '16 MB RAM principale + 8 MB VRAM + 2 MB Audio', 
    gpu: 'NEC PowerVR Series 2 (rendering Deferred a piastrelle)', media: 'GD-ROM proprietario Yamaha (1.2 GB)', 
    topGame: 'Sonic Adventure (2.5M)', resolution: '640 x 480 con cavo VGA Box a 60Hz',
    unitsSold: '9.1', score: 89, tags: ['Modem 56k di Serie','VMU Controller','Addio Leggendario Sega'],
    funFacts: [
      'Prima console domestica dotata di modem internet integrato di serie e controller con memory card a schermo interattivo (VMU).',
      'La data di lancio americana era la combinazione perfetta: 09/09/99 al prezzo aggressivo di $199.',
      'Con la Visual Memory Unit (VMU) potevi allevare piccoli Chao di Sonic staccandola dal controller e portarla in tasca durante la giornata.',
      'Shenmue aveva il budget di sviluppo più alto di qualsiasi gioco della storia al momento del lancio: 47 milioni di dollari nel 1999.',
      'Phantasy Star Online fu il primo MMORPG console con matchmaking online di massa: un primato che anticipa World of Warcraft di 4 anni.',
      'Il Dreamcast fu crackato in pochi mesi usando CD masterizzati: Sega non aveva incluso la protezione hardware CD come Saturn, rendendo la pirateria triviale.',
      'Il cavo VGA Box trasformava il Dreamcast nell\'unica console del 2000 in grado di produrre segnale RGB progressivo 480p su monitor PC: una qualità impossibile sulle TV CRT dell\'epoca.',
      'Marvel vs Capcom 2 fu il gioco Dreamcast più costoso oggi: le copie sigillate raggiungono i 400 dollari, simbolo della fedeltà della community alla console.',
      'Il Dreamcast includeva un browser internet Dreamkey per navigare il web a 56k: in Giappone aveva un servizio news e cartoline digitali.',
      'Soul Calibur per Dreamcast ricevette 40/40 da Famitsu: fu il primo gioco nella storia della rivista giapponese a ottenere il punteggio perfetto.',
      'Il joystick arcade Dreamcast usava un trasduttore a magneti permanenti Hall Effect: non si usurava mai meccanicamente a differenza dei potenziometri classici.',
      'Sega annunciò l\'uscita di produzione del Dreamcast il 31 gennaio 2001 tramite un comunicato di sole 2 frasi: fu uno dei momenti più tristi della storia dei videogiochi.',
      'Skies of Arcadia aveva un sistema di battaglie navali via dirigibili così apprezzato che rimane il JRPG Dreamcast più richiesto su port petitions dopo 25 anni.',
      'Il Dreamcast supportava Memory Card VMU da 128KB con 200 blocchi: ogni VMU aveva il proprio processore Z80 da 0.9MHz e uno schermo LCD da 48x32 pixel.'
    ],
    deepDives: [
      'Capace di produrre segnale video VGA a 480p di limpidezza abbacinante, Dreamcast ha introdotto il multiplayer online di massa con Phantasy Star Online e le basi dell\'open world moderno con Shenmue.',
      'Il chip grafico PowerVR CLX2 con rendering a tasselli scartava i pixel nascosti prima di disegnarli, offrendo prestazioni teoriche pari a GPU con fill-rate quadruplo.',
      'Nonostante la prematura uscita di Sega dal mercato hardware, conserva una delle community di fedeli appassionati e produzioni homebrew più vivaci al mondo.',
      'Il rendering Tile-Based Deferred (TBDR) del PowerVR CLX2 divideva lo schermo in piccole tessere da 32x32 pixel e processava visibilità prima del rendering finale.',
      'Il chip SH-4 di Hitachi aveva un coprocessore FPU a 128-bit che eseguiva operazioni su vettori a 4 elementi in singolo ciclo: la base dei moderni SIMD per gaming.',
      'Il protocollo GD-ROM usava una spirale di dati a densità variabile: la parte esterna del disco era a bassa densità (standard CD) e quella interna ad alta densità proprietaria.',
      'Il modem 56k della Dreamcast usava il protocollo V.90 standard: in Giappone fu sostituito da un broadband adapter 10Mbps che permetteva online gaming senza latenza.',
      'Il sistema di sicurezza GD-ROM fu aggirato tramite trucchi di spinning del laser: la protezione fisica che Sega pensava fosse inviolabile cedette in meno di 6 mesi.',
      'Soul Calibur usava un sistema di physics della fisica del personaggio avanzato per il 1999: capelli, gonne e mantelli si comportavano con inerzia realistica basata sulla velocità.',
      'Il firmware del Dreamcast includeva un menù di gestione VMU accessibile senza giochi: permetteva di rinominare, copiare e cancellare i salvataggi dall\'interfaccia principale.'
    ]
  },
  'SMS':   { 
    color: '#0ea5e9', accent: '#7dd3fc', emoji: '📦', 
    cpu: 'Zilog Z80A @ 3.58 MHz', ram: '8 KB RAM + 16 KB VRAM', 
    gpu: 'Texas Instruments TMS9918A derivato (palette a 64 colori)', media: 'Cartucce ROM + Sega Card ultrasottili', 
    topGame: 'Alex Kidd in Miracle World', resolution: '256 x 192 px',
    unitsSold: '13.0', score: 74, tags: ['8-bit Sega','Sega Card','Dominio Europeo e Brasiliano'],
    funFacts: [
      'In Brasile è diventata un fenomeno immortale: prodotta su licenza da TecToy, è stata venduta continuativamente per oltre 30 anni!',
      'Molti modelli avevano un gioco completo memorizzato direttamente nel BIOS di sistema, giocabile senza inserire cartucce.',
      'Disponeva degli occhiali 3D shutter "SegaScope 3-D" già nel 1987, anticipando di decenni la stereoscopia su console.',
      'Alex Kidd in Miracle World era il sistema integrato nella BIOS ROM: veniva avviato automaticamente quando nessuna cartuccia era inserita.',
      'Il Master System batté il NES nelle classifiche di vendita europee grazie ai bundle con giochi di calcio e al canale di distribuzione nel mercato PAL.',
      'Snail Maze era nascosto nei firmware di alcuni modelli giapponesi: premendo Up+1+2 al logo di avvio si avviava il labirinto nascosto.',
      'La versione brasiliana prodotta da TecToy ricevette oltre 150 giochi esclusivi sviluppati localmente, inclusi titoli basati su soap opera televisive.',
      'Il Sega Master System aveva un chipset video superiore al NES: 16 colori per sprite contro 4 del NES, e palette da 64 colori contro i 52 di Nintendo.',
      'Il gioco Wonder Boy in Monster Land per SMS era il secondo capitolo di una saga di 7 titoli con meccaniche RPG progressive uniche per l\'era 8-bit.',
      'Phantasy Star per Master System era l\'unico JRPG 8-bit con dungeon 3D a visuale soggettiva: anticipò i dungeon crawler 3D di un decennio.'
    ],
    deepDives: [
      'Superava l\'originale NES per brillantezza dei colori e memoria video; in Europa e Sud America ha goduto di una popolarità enorme contrapponendosi alla dominanza americana di Nintendo.',
      'Lo slot aggiuntivo per le compatte Sega Card (simili a carte di credito) offriva giochi a basso costo prima che le capacità delle cartucce ROM prendessero il sopravvento.',
      'Ha tenuto a battesimo saghe storiche come Phantasy Star e Wonder Boy, introducendo la prima protagonista femminile di rilievo nei giochi di ruolo (Alis Landale).',
      'Il chip VDP del Master System era derivato dal TI TMS9918A usato nel Texas Instruments TI-99/4A e nel Colecovision: una scelta economica che limitò i piani grafici a 2.',
      'Il processore Z80A era identico a quello usato nello ZX Spectrum di Sinclair: i developer britannici che conoscevano il Spectrum riuscivano a programmare per SMS facilmente.',
      'Il sistema di cartucce del Master System aveva un header ROM fisso nei primi 16 byte: il firmware leggeva questo header per determinare nome, dimensione e paese del titolo.',
      'La porta di espansione anteriore del Master System supportava il SegaScope 3D shutter glasses: i cristalli LCD si oscuravano alternativamente a 60Hz sincronizzati col refresh.',
      'Il modello Power Base Converter di Genesis/Mega Drive permetteva ai giochi SMS di girare su Mega Drive: usava solo lo Z80 del Mega Drive come emulatore hardware.'
    ]
  },

  // Microsoft Xbox
  'XBOX':  { 
    color: '#22c55e', accent: '#86efac', emoji: '🟩', 
    cpu: 'Intel Pentium III Custom Coppermine @ 733 MHz', ram: '64 MB DDR SDRAM condivisa @ 6.4 GB/s', 
    gpu: 'Nvidia NV2A @ 233 MHz (supporto Shader Model 1.1)', media: 'DVD-ROM 5x + Hard Disk interno da 8 o 10 GB', 
    topGame: 'Halo 2 (8.49M)', resolution: '480p / 720p / 1080i HD',
    unitsSold: '24.0', score: 79, tags: ['Disco Fisso di Serie','Xbox Live','Halo Revolution'],
    funFacts: [
      'Era letteralmente un PC Pentium III da combattimento travestito da mastodontica console da salotto.',
      'Il primo controller "The Duke" era così gigantesco che fu premiato scherzosamente come il controller più ingombrante della storia dai gamer giapponesi.',
      'Potevi copiare interi CD musicali sull\'hard disk della console e ascoltare le tue canzoni personalizzate mentre guidavi in Project Gotham Racing.',
      'Halo: Combat Evolved fu il gioco di lancio Xbox più importante: Bungie aveva originariamente annunciato Halo come gioco Mac/PC prima dell\'acquisizione Microsoft.',
      'Il controller S "Akira" fu sviluppato dal team giapponese Xbox specificamente per le mani più piccole del mercato asiatico, poi adottato globalmente.',
      'Xbox Live fu lanciato nel novembre 2002 con 150.000 abbonati: a fine anno aveva 400.000 utenti, un primato assoluto per il gaming online su console.',
      'Il disco fisso interno dell\'Xbox consentiva di installare i giochi parzialmente per ridurre i tempi di caricamento: una funzionalità unicamente Xbox di quel periodo.',
      'Ninja Gaiden Xbox fu il gioco d\'azione più difficile mai realizzato fino al 2004: Team Ninja dichiarò pubblicamente che nessun developer interno era riuscito a completarlo.',
      'PGR2 usava il GPS reale di Londra e New York per creare le mappe di gioco: Bizarre Creations aveva mappato le città con auto strumentate.',
      'Jet Set Radio Future era un porting e sequel di Sega, sviluppato come esclusiva Xbox: dimostrava le capacità della console con cel-shading avanzato a 60fps.',
      'Il Xbox originale pesava 3.86 kg: era la console domestica più pesante mai prodotta per uso consumer in quel periodo.',
      'Il chip Nvidia NV2A aveva 64MB di RAM video dedicata separata: il doppio rispetto a PS2, permettendo texture ad alta risoluzione impensabili su PS2.',
      'Fable di Peter Molyneux fu ampiamente ridimensionato rispetto alle promesse: ogni villaggio doveva essere distruttibile, la crescita fisica avveniva in tempo reale anno per anno.'
    ],
    deepDives: [
      'Con un hard disk integrato per salvare tracce audio ed eliminare le Memory Card, unito all\'infrastruttura Xbox Live e a Halo 2, Microsoft ha riscritto le regole del multiplayer su console.',
      'La GPU Nvidia NV2A con pixel shader programmabili era due generazioni avanti rispetto a PS2, permettendo normal mapping e illuminazione in tempo reale.',
      'La prima Xbox pose le basi per la nascita della dashboard unificata per account giocatore, gamertag e liste amici che usiamo tuttora.',
      'Il SoC NV2A era un chip personalizzato basato su GeForce 3 con supporto Shader Model 1.1: era il primo chip consumer a supportare vertex e pixel shader programmabili.',
      'L\'hard disk IDE da 8GB usato nella prima Xbox era un Western Digital Caviar prodotto in serie: i modder potevano sostituirlo con dischi più grandi facilmente.',
      'Il BIOS dell\'Xbox era cifrato con RSA-512 e verificava l\'integrità del kernel ad ogni boot: fu compromesso nel 2003 tramite exploit dell\'hard disk tramite save game.',
      'Il chip audio MCPX (Media Communications Processor) gestiva 64 canali audio 3D con HRTF (Head-Related Transfer Function) per il surround sound virtuale.',
      'Il processore Pentium III Coppermine custom di Intel era in produzione speciale per Microsoft: aveva modifiche al prefetcher e alla gestione della cache L2 per il gaming.',
      'Xbox Live usava il protocollo VoIP proprietario con headset in-box: era il primo sistema di comunicazione vocale in-game integrato di default su una console consumer.',
      'Il framework DirectX dell\'Xbox era una versione hardware di DirectX 8.1 per PC: i developer Windows potevano compilare versioni Xbox con modifiche minime al codice.'
    ]
  },
  'X360':  { 
    color: '#16a34a', accent: '#4ade80', emoji: '🎯', 
    cpu: 'IBM Xenon (Triple-Core PowerPC a 3.2 GHz con 6 thread)', ram: '512 MB GDDR3 unificata @ 700 MHz', 
    gpu: 'ATI Xenos @ 500 MHz (con 10 MB eDRAM per anti-aliasing gratuito)', media: 'DVD-ROM 12x DL (fino a 8.5 GB)', 
    topGame: 'Kinect Adventures (24M bundled) / Halo 3 (14.5M)', resolution: '720p / 1080p HD nativo',
    unitsSold: '84.0', score: 81, tags: ['Era HD','Gamerscore & Obiettivi','Xbox Live Arcade'],
    funFacts: [
      'Ha inventato il sistema dei "Gamerscore" e degli "Obiettivi sbloccati" (Achievements) con l\'inconfondibile suono "Bleep!", oggi standard su ogni piattaforma.',
      'Il celebre difetto "Red Ring of Death" (RROD) costò a Microsoft oltre 1.15 miliardi di dollari per estendere la garanzia a tutti gli utenti del mondo.',
      'Le mascherine frontali della console originale erano intercambiabili per personalizzare l\'estetica della console a piacimento.',
      'Gears of War fu il gioco di lancio Xbox 360 più importante: Epic Games mostrò il motore Unreal Engine 3 in tutto il suo splendore per la prima volta.',
      'Il controller Xbox 360 wireless fu il primo della storia a usare le batterie AA ricaricabili standard invece di una batteria interna non sostituibile.',
      'Halo 3 vendette 3.3 milioni di copie il solo giorno di lancio: fu l\'apertura cinematografica più grande nella storia dell\'intrattenimento nel 2007, superando molti film.',
      'Xbox Live Arcade divenne la casa di capolavori indie come Braid, Limbo, Super Meat Boy e Castle Crashers: cambiò il panorama dello sviluppo indipendente.',
      'Il Kinect per Xbox 360 fu il dispositivo elettronico di consumo venduto più rapidamente in assoluto: 8 milioni di unità in 60 giorni nel 2010.',
      'Mass Effect aveva un sistema di conversazione a scelta multipla così rivoluzionario che ogni singola frase di risposta era stata registrata da attori professionisti.',
      'L\'Xbox 360 E (2013) era la terza revisione hardware: ridusse le dimensioni del 20%, eliminò la porta SCART e introdusse la porta HDMI di serie su tutti i modelli.',
      'Alan Wake fu annunciato nel 2005 e rilasciato nel 2010: i 5 anni di sviluppo furono influenzati da Stephen King e Twin Peaks, creando un genere narrativo nuovo.',
      'Il chip Xenon di IBM era la prima CPU a 3 core prodotta per uso consumer gaming: ogni core eseguiva due thread hardware simultanei per 6 thread totali.',
      'Il Xenos di ATI fu il primo chip grafico con shader unificati nella storia: la stessa architettura fu adottata da tutte le GPU PC nei successivi 5 anni.',
      'Il servizio Xbox Live Arcade vendette oltre 100 milioni di giochi indie digitali tra 2005 e 2010: democratizzò la distribuzione per i piccoli sviluppatori.'
    ],
    deepDives: [
      'Ha dato vita alla rinascita del gaming indie attraverso Xbox Live Arcade (Braid, Limbo, Super Meat Boy) e ha dominato la prima metà della settima generazione.',
      'La GPU ATI Xenos fu la prima nella storia dell\'informatica ad adottare un\'architettura a shader unificati, poi adottata da tutte le schede video PC del decennio successivo.',
      'Con il sensore Kinect nel 2010 divenne il dispositivo elettronico di consumo venduto più rapidamente nella storia del Guinness World Records.',
      'La CPU Xenon aveva 3 core PowerPC in-order a 3.2GHz con 1MB di L2 cache condivisa: ogni core eseguiva istruzioni SIMD VMX a 128-bit per la matematica vettoriale.',
      'Il chip Xenos operava con architettura a shader unificati: 48 shader processor eseguivano sia vertex che pixel shader dinamicamente allocati dal geometry shader.',
      'Il sistema RROD fu causato da saldature a piombo-free che si criccolavano per le alte temperature: Microsoft usava saldature BGA sotto la CPU che si staccavano nel tempo.',
      'La eDRAM da 10MB integrata nel Xenos era usata come resolve buffer per l\'MSAA: generava anti-aliasing 4x gratuitamente senza il costo di risoluzione tipico.',
      'Il firmware del 360 era crittografato con AES-128 e verificato con SHA-1: fu compromesso nel 2009 tramite exploit del bootloader JTAG che non poteva essere patchato via aggiornamento.',
      'Il servizio Xbox Live usava server dedicati Demonware per il matchmaking: per la prima volta una console aveva un\'infrastruttura network paragonabile ai servizi MMO PC.',
      'La dashboard del 360 fu aggiornata 15 volte in 8 anni: ogni aggiornamento portava nuove funzioni come Netflix, ESPN e YouTube senza costi aggiuntivi per gli abbonati Gold.'
    ]
  },
  'XONE':  { 
    color: '#15803d', accent: '#34d399', emoji: '🎮', 
    cpu: 'AMD Jaguar 8-Core x86-64 @ 1.75 GHz', ram: '8 GB DDR3 + 32 MB ESRAM ultraveloce', 
    gpu: 'AMD Radeon GCN (12 Compute Unit, 1.31 TFLOPS)', media: 'Blu-ray Disc + HDD 500GB/1TB', 
    topGame: 'Grand Theft Auto V (oltre 11M su Xbox)', resolution: '900p / 1080p',
    unitsSold: '51.0', score: 72, tags: ['Game Pass Pioneer','Retrocompatibilità 360/Xbox','Centro Multimediale'],
    funFacts: [
      'Ha visto la nascita del servizio Xbox Game Pass, ridefinendo il modello economico di fruizione videoludica moderno.',
      'Il controller integrava motori di vibrazione dedicati nei grilletti (Impulse Triggers) per farti percepire i giri del motore e l\'attrito delle gomme nei giochi di guida.',
      'Poteva collegare il decoder TV via porta HDMI pass-through per guardare la televisione e giocare contemporaneamente con la funzione Snap.',
      'Il reveal del maggio 2013 fu considerato il peggiore nella storia: l\'intera conferenza parlò di TV, sport e serie TV invece di videogiochi.',
      'Sunset Overdrive fu lo shooter platformer esclusivo più originale della generazione: la mobilità ipercinetica era completamente assente in qualsiasi altro titolo.',
      'Il Kinect 2.0 era obbligatorio al lancio e spingeva il prezzo a $499: Microsoft lo rese opzionale dopo 8 mesi per competere con PS4 a $399.',
      'La retrocompatibilità Xbox 360 usava una virtual machine: i giochi del 360 giravano in un emulatore software che interpretava le istruzioni PowerPC su x86.',
      'Forza Horizon 3 era ambientato in Australia con una mappa aperta più grande di tutti i Forza precedenti combinati: fu il primo open world racing con festival come setting.',
      'Xbox Game Preview fu il primo programma di Early Access console: permise a giochi come DayZ e Game Preview di vendere versioni incomplete prima della release.',
      'Il controller Xbox One usava materiali di qualità superiore al 360: texture gommata antigraffio, grilletti asimmetrici e batteria con cover rimovibile per AA.',
      'Halo 5: Guardians non aveva campagna cooperativa in split-screen dopo 14 anni di tradizione: la scelta fu controversa e rimase una delle critiche più dure alla serie.',
      'Sea of Thieves fu il gioco online più giocato degli abbonati Game Pass: oltre 25 milioni di giocatori totali dal lancio grazie al modello free-to-play via abbonamento.',
      'Ori and the Blind Forest fu il gioco indie più acclamato della generazione: Moon Studios compose la colonna sonora in 3 anni con un orchestra di 85 elementi.'
    ],
    deepDives: [
      'Dopo un reveal iniziale controverso incentrato sulla TV, Phil Spencer ne ha riorientato il focus investendo sull\'ingegneria di retrocompatibilità nativa a risoluzioni 4K.',
      'Ha introdotto Xbox Play Anywhere per condividere progressi e acquisti senza costi tra console e PC Windows.',
      'La presenza della memoria ultra-rapida embedded ESRAM a 204 GB/s sul silicio centrale richiedeva ottimizzazioni specifiche per il frame buffer.',
      'La CPU AMD Jaguar a 8 core era la stessa usata nella PS4: entrambe le console condividevano la stessa microarchitettura, rendendo i porting cross-platform banali.',
      'L\'ESRAM da 32MB era integrata nello stesso package del SOC: operava a 204 GB/s per il frame buffer, compensando la lentezza della DDR3 per i dati critici.',
      'Il sistema operativo Xbox One eseguiva tre ambienti virtuali simultanei: Xbox OS per i giochi, Windows RT per le app e un hypervisor per la gestione sicura delle risorse.',
      'La GPU GCN aveva 12 Compute Unit con 768 shader processor totali: significativamente meno dei 18 CU della PS4, causando la differenza di risoluzione nelle multipiattaforma.',
      'Il controller Xbox One fu l\'unico nella storia progettato con la collaborazione di atleti professionisti: Microsoft usò test ergonomici con tennisti e calciatori.',
      'Xbox Game Pass fu lanciato nel 2017 come risposta diretta al modello Netflix: i giochi erano disponibili dal day one compreso i first-party, cambiando l\'industria.',
      'L\'aggiornamento Xbox One X (Project Scorpio) portò 6 TFLOPS GPU e 12GB GDDR5: era la console più potente del mondo al lancio nel 2017, 4x la GPU originale.'
    ]
  },

  // SNK & Atari
  'NEO':   { 
    color: '#f97316', accent: '#fb923c', emoji: '👑', 
    cpu: 'Motorola 68000 @ 12 MHz + Zilog Z80A @ 4 MHz', ram: '64 KB RAM + 68 KB VRAM + 2 KB Audio', 
    gpu: 'Chip custom SNK capace di 380 sprite simultanei', media: 'Gigantesche cartucce arcade MVS (fino a 716 Mbit)', 
    topGame: 'The King of Fighters \'98 / Metal Slug', resolution: '320 x 224 px arcade puro',
    unitsSold: '1.0', score: 98, tags: ['Arcade 1:1 Perfetto','La Rolls-Royce delle Console','Cartucce da 300+ Mega'],
    funFacts: [
      'Costava oltre 650 dollari nel 1990 e le singole cartucce potevano costare fino a 300 dollari l\'una!',
      'Le cartucce erano enormi quanto un libro enciclopedico e contenevano due schede madri separate all\'interno del guscio plastico.',
      'Lo slogan pubblicitario recitava: "Bigger, Badder, Better" — prometteva e offriva l\'esatta esperienza delle sale giochi senza compromessi.',
      'Il Neo Geo MVS (Multi Video System) era la versione arcade: i board erano identici all\'AES casalinga, i giochi interamente intercambiabili.',
      'The King of Fighters \'98 è ancora oggi giocato in tornei mondiali: considerato il picchiaduro più perfettamente bilanciato della storia del genere.',
      'La Memory Card a 68 pin del Neo Geo permetteva di salvare la partita nelle sale giochi e continuarla a casa sulla console AES domestica.',
      'Metal Slug 2 aveva talmente tante esplosioni a schermo che rallentava drasticamente: SNK rilasciò Metal Slug X come patch ufficiale con il motore ottimizzato.',
      'Il chip LSPC2-A2 gestiva fino a 380 sprite hardware simultanei: era il doppio della PS1 e 10 volte il SNES, rendendolo insuperabile per l\'animazione 2D fluida.',
      'Fatal Fury Special aveva un sistema di taunt che serviva da command training: ogni provocazione era un tutorial camuffato per imparare le mosse speciali del personaggio avversario.',
      'La cartuccia di Garou: Mark of the Wolves del 1999 era la più grande mai prodotta: 716 Mbit di ROM con animazioni per personaggio da record per l\'hardware 2D.',
      'Samurai Shodown V Special conteneva tutti i finish moves violenti ripristinati dopo essere stati censurati nella versione originale: disponibile solo in edizione limitata.',
      'Il Neo Geo CD (1994) era la versione a disco del sistema AES: i giochi caricavano lentamente ma costavano il 90% in meno rispetto alle cartucce originali.',
      'SNK dichiarò bancarotta nel 2001 ma il brand fu acquistato da Playmore: oggi SNK è di proprietà di un fondo saudita che ha riportato in vita il franchise.',
      'Il matchmaking dei tornei Neo Geo usava un sistema di crediti fisici identico ai cabinati: ogni sfida si pagava con una moneta reale inserita nella console AES.'
    ],
    deepDives: [
      'Nessun compromesso: conteneva l\'esatto hardware da sala giochi MVS. I giocatori a casa avevano sprite mastodontici, animazioni a 60fps ed effetti sonori identici alla sala giochi.',
      'Gestiva uno scaling hardware in tempo reale degli sprite bidimensionali che rese storiche saghe come Samurai Shodown e Art of Fighting.',
      'La Memory Card a 68 pin permetteva di salvare la partita nelle sale giochi e continuare a casa sulla propria console Neo Geo AES casalinga.',
      'Il chip custom LSPC2-A2 era un hardware sprite engine dedicato: gestiva fino a 380 sprite da 16x16 pixel con palette indipendente di 16 colori per sprite.',
      'La CPU 68000 a 12MHz era overclockato del 50% rispetto alla versione standard: permetteva logica di gioco arcade a piena velocità senza compromessi.',
      'Il chip audio YM2610 (OPNB) aveva canali FM, PSG e ADPCM simultanei: permetteva musica con timbri orchestrali, rumori di sparo e voce campionata allo stesso tempo.',
      'Il sistema di sicurezza delle cartucce MVS usava un chip PRG crittografato denominato P-ROM: le cartucce pirata senza questo chip mostravano grafica corrotta.',
      'Lo Z80 a 4MHz gestiva esclusivamente l\'audio: comunicava con il 68000 tramite shared RAM e un sistema di interrupt per sincronizzare la musica agli eventi di gioco.',
      'Il Neo Geo CD-ROM aveva un lettore mono-speed da 150 KB/s: i tempi di caricamento potevano superare i 60 secondi per i giochi con sprite più numerosi.',
      'Il sistema di palette del Neo Geo usava 16 palette da 16 colori per sprite: 256 colori per frame disponibili da una tavolozza globale da 65.536 colori.'
    ]
  },
  'A2600': { 
    color: '#d97706', accent: '#fbbf24', emoji: '🕹️', 
    cpu: 'MOS 6507 @ 1.19 MHz', ram: 'Soltanto 128 Byte di RAM integrati nel chip RIOT', 
    gpu: 'TIA (Television Interface Adaptor) senza frame-buffer', media: 'Cartucce ROM da 2 KB a 4 KB (con bank-switch)', 
    topGame: 'Pac-Man (7.7M) / Space Invaders (6M)', resolution: '160 x 192 px (senza bitmap reale)',
    unitsSold: '30.0', score: 82, tags: ['Padre dei Videogiochi da Casa','1977','Leggenda Assoluta'],
    funFacts: [
      'Aveva solo 128 BYTE di memoria RAM: i programmatori dovevano sincronizzarsi riga per riga con il fascio di elettroni della TV tubo catodico.',
      'Le cartucce invendute di E.T. the Extra-Terrestrial furono sepolte nel deserto del New Mexico e dissotterrate decenni dopo come reperto archeologico.',
      'L\'iconica mascherina frontale era realizzata in finto-legno, per abbinarsi ai mobili di salotto degli anni \'70 e far sembrare l\'Atari un elettrodomestico.',
      'David Crane (creatore di Pitfall!) sviluppò il suo capolavoro in 5 mesi con solo 128 byte di RAM: ogni byte era prezioso come oro.',
      'Pitfall! fu il primo gioco con scrolling di mappa aperta: il livello era lungo 20 schermate ed era memorizzato tramite un algoritmo matematico deterministico, non come dati.',
      'La porta joystick DB9 del 2600 divenne lo standard de facto dei computer degli anni \'80: il Commodore 64, l\'Amiga e il Mega Drive usano lo stesso identico connettore.',
      'Warren Robinett nascose il primo Easter Egg della storia in Adventure (1979): il proprio nome era nascosto in una stanza segreta che nessuno trovò per un anno.',
      'Lo stesso chip TIA era presente nel successivo Atari 5200 e Atari 7800: la compatibilità hardware permetteva di giocare ai titoli 2600 su console successive.',
      'Activision fu fondato nel 1979 da 4 programmatori fuggiti da Atari dopo che il management rifiutò di riconoscerli come autori dei loro giochi.',
      'Kaboom! di Activision fu il primo gioco con highscore persistente: il punteggio veniva memorizzato anche dopo lo spegnimento grazie a una batteria CR2032.',
      'River Raid di Carol Shaw fu il primo gioco di guerra proceduralmente generato: il fiume infinito era generato algoritmicamente da un singolo valore seed.',
      'La versione 2600 di Pac-Man fu sviluppata in 2 mesi da un singolo programmatore: il risultato deludente scatenò il crash del mercato del 1983.',
      'Yars\' Revenge fu il gioco originale di Atari più venduto della storia: il designer Howard Scott Warshaw lo creò come esperimento di programmazione estrema con i 128 byte.',
      'L\'Atari 2600 rimase in produzione fino al 1992: 15 anni di produzione continua per un\'architettura progettata per il 1977 fu un record che non sarà mai superato.'
    ],
    deepDives: [
      'Creata da Nolan Bushnell e venduta con l\'iconico joystick monoleva CX40, ha popolarizzato l\'idea stessa che una console potesse riprodurre infiniti giochi diversi.',
      'La totale assenza di chip di protezione software portò all\'inondazione incontrollata di giochi scadenti che scatenò il disastroso collasso del mercato del 1983.',
      'Programmatori geniali come David Crane riuscirono a spremere animazioni e paesaggi memorabili da un hardware progettato originariamente solo per Pong e Tank.',
      'Il chip TIA operava in modalità "racing the beam": il programma doveva aggiornare i registri di visualizzazione esattamente mentre il fascio CRT disegnava ogni riga.',
      'I 128 byte di RAM erano gestiti dal chip RIOT (RAM-I/O-Timer): condividevano lo spazio con i registri dello stack CPU e le variabili di stato dell\'hardware.',
      'La tecnica del bankswitching permetteva cartucce oltre i 4KB: il software commutava porzioni della ROM nel window di indirizzamento da 4KB della CPU.',
      'Il joystick CX40 aveva un meccanismo di fire button laterale con 1.000.000 di click garantiti: era progettato per resistere alle sessioni di Space Invaders più aggressive.',
      'Adventure di Warren Robinett fu il primo action adventure della storia: il game world era composto da 30 stanze con oggetti persistenti e nemici con IA basica.',
      'Nolan Bushnell vendette Atari a Warner Communications nel 1976 per 28 milioni di dollari: rimpianse la decisione per decenni vedendo Atari valere miliardi negli anni successivi.',
      'Il Supercharger di Starpath era un accessorio per 2600 con 6KB di RAM: permetteva giochi fino a 8 volte più complessi caricati da cassetta audio standard.',
      'Il monitor delle temperature termiche del chip TIA doveva essere tenuto sotto controllo: girare il gioco Barnstorming per 8 ore consecutive poteva surriscaldare il chip.',
      'La specifica tecnica del chip TIA fu tenuta segreta da Atari per anni: solo nel 1996 Andrew Towers pubblicò il datasheet completo grazie alla decompilazione dell\'hardware.'
    ]
  },
};

  'SNES':  { 
    color: '#f97316', accent: '#fdba74', emoji: '🕹️', 
    cpu: 'Ricoh 5A22 (16-bit) @ 3.58 MHz', ram: '128 KB DRAM + 64 KB SRAM', 
    gpu: 'PPU1 + PPU2 (Mode 7 affine scaling)', media: 'Cartucce ROM fino a 48 Mbit (con chip Super FX)', 
    topGame: 'Super Mario World (20.6M)', resolution: '256 x 224 (fino a 512 x 448 interlacciato)',
    unitsSold: '49.1', score: 92, tags: ['JRPG Era','16-bit','Mode 7','Capolavori'],
    funFacts: [
      'Il chip Mode 7 permetteva rotazioni e pseudo-3D impensabili su rivali a 16-bit.',
      'I tasti dorsali L e R furono inventati per la prima volta sul pad dello SNES e sono presenti su ogni gamepad moderno.',
      'Il chip Super FX integrato nella cartuccia di Star Fox era un processore RISC 3D più potente della CPU della console stessa!'
    ],
    deepDives: [
      'Grazie al chip audio DSP di Sony programmato da Ken Kutaragi e l\'incredibile palette a 32.768 colori, lo SNES è considerata la regina dell\'era d\'oro del 2D e dei JRPG classici.',
      'L\'architettura a doppio coprocessore video consentiva lo scorrimento parallattico su 4 piani indipendenti, creando profondità visive ineguagliate.',
      'La rivalità feroce con il Sega Genesis portò alla storica "Console War" degli anni \'90, costringendo Nintendo ad adottare grafiche prerenderizzate come in Donkey Kong Country.'
    ]
  },
  'N64':   { 
    color: '#eab308', accent: '#fde047', emoji: '🎯', 
    cpu: 'NEC VR4300 (64-bit MIPS) @ 93.75 MHz', ram: '4 MB RDRAM (espandibile a 8 MB con Expansion Pak)', 
    gpu: 'SGI RCP (Reality Coprocessor) @ 62.5 MHz', media: 'Cartucce ROM ad alta velocità (fino a 64 MB)', 
    topGame: 'Super Mario 64 (11.9M)', resolution: '320 x 240 (fino a 640 x 480i)',
    unitsSold: '32.9', score: 88, tags: ['3D Pioneer','64-bit','4 Giocatori','Z-Buffering'],
    funFacts: [
      'Super Mario 64 ha introdotto la levetta analogica a 360° e la telecamera dinamica tridimensionale.',
      'Il controller dell\'N64 fu il primo a supportare il Rumble Pak, portando la vibrazione tattile nei videogiochi.',
      'I designer Silicon Graphics testarono l\'hardware renderizzando una demo del dinosauro di Jurassic Park in tempo reale.'
    ],
    deepDives: [
      'Nintendo scelse le cartucce rispetto ai CD per azzerare i tempi di caricamento, costringendo sviluppatori ad autentiche prodezze di compressione (come Resident Evil 2 compresso su 64MB).',
      'Il Reality Coprocessor sviluppato da Silicon Graphics integrava Z-buffering hardware, antialiasing ed interpolazione trilineare dei poligoni.',
      'GoldenEye 007 di Rare ridefinì per sempre gli sparatutto in prima persona su console, dimostrando che i controlli pad potevano rivaleggiare con mouse e tastiera.'
    ]
  },
  'NGC':   { 
    color: '#06b6d4', accent: '#67e8f9', emoji: '🟣', 
    cpu: 'IBM PowerPC Gekko @ 485 MHz', ram: '24 MB 1T-SRAM + 16 MB A-RAM', 
    gpu: 'ATI Flipper @ 162 MHz', media: 'miniDVD proprietario Panasonic (1.5 GB)', 
    topGame: 'Super Smash Bros. Melee (7.4M)', resolution: '480p (Progressive Scan)',
    unitsSold: '21.7', score: 84, tags: ['Mini-DVD','Compatto','Hardware Potente','Cult'],
    funFacts: [
      'Era tecnologicamente più performante e con bandwidth memoria molto superiore a PlayStation 2.',
      'La melodia all\'avvio cambia se tieni premuto il tasto Z su uno o quattro controller contemporaneamente!',
      'Il suo celebre controller con tasti A/B asimmetrici è così perfetto da essere tuttora lo standard ufficiale dei tornei di Smash Bros.'
    ],
    deepDives: [
      'Caratterizzato dalla celebre maniglia per il trasporto, il GameCube vantava una delle architetture più pulite ed efficienti realizzate da IBM e ArtX/ATI.',
      'La memoria 1T-SRAM proprietaria di MoSys forniva una latenza di soli 10 nanosecondi, eliminando quasi del tutto i colli di bottiglia nel rendering geometrico.',
      'L\'adozione dei mini-disco da 8 cm limitò la pirateria ma impedì filmati compressi ad alta risoluzione e la riproduzione di comuni film DVD.'
    ]
  },
  'GBC':   { 
    color: '#84cc16', accent: '#bef264', emoji: '🟢', 
    cpu: 'Sharp LR35902 (Z80-like) @ 8.38 MHz (doppia velocità)', ram: '32 KB RAM + 16 KB VRAM', 
    gpu: 'Display LCD a colori 160 x 144 (palette 32.768)', media: 'Cartucce Game Boy / GBC (fino a 8 MB)', 
    topGame: 'Pokémon Oro e Argento (23.1M)', resolution: '160 x 144 px',
    unitsSold: '32.9', score: 78, tags: ['Portatile','Colore','Retrocompatibile','Porta IR'],
    funFacts: [
      'Piena retrocompatibilità: ricolorava al volo i giochi del Game Boy originale premendo combinazioni di tasti all\'avvio!',
      'La cartuccia di Kirby Tilt \'n\' Tumble conteneva un sensore di movimento ad accelerometro, antesignano del motion gaming.',
      'La porta a infrarossi permetteva lo scambio del "Dono Segreto" in Pokémon Oro e Argento avvicinando due console a pochi centimetri.'
    ],
    deepDives: [
      'Dotato di una CPU raddoppiata a 8.38 MHz e 4 volte la RAM dell\'originale, permise la consacrazione del boom mondiale di Pokémon.',
      'La palette cromatica gestiva 56 colori simultanei da una tavolozza di oltre 32.000 sfumature senza gravare sull\'autonomia di oltre 10 ore con sole due pile stilo.',
      'Le speciali cartucce semitrasparenti con la gobba superiore "Game Boy Color only" segnalavano l\'uso esclusivo delle istruzioni a 8 MHz.'
    ]
  },
  'GBA':   { 
    color: '#10b981', accent: '#6ee7b7', emoji: '🎮', 
    cpu: 'ARM7TDMI (32-bit RISC) @ 16.78 MHz', ram: '32 KB interna + 256 KB esterna WRAM', 
    gpu: '2D Hardware Rendering con rotazione e scaling', media: 'Cartucce 32 MB ROM', 
    topGame: 'Pokémon Rubino e Zaffiro (16.2M)', resolution: '240 x 160 px TFT',
    unitsSold: '81.5', score: 86, tags: ['32-bit','Portatile Iconico','Pixel Art Supremo'],
    funFacts: [
      'Soprannominato "lo SNES tascabile", era in realtà un sistema a 32-bit ben più agile e con frequenza quadrupla.',
      'Il display orizzontale widescreen fu disegnato dal leggendario designer francese Gwénaël Nicolas ispirandosi a un cruscotto sportivo.',
      'Poteva connettersi al Nintendo GameCube tramite un cavo speciale per fungere da secondo schermo interattivo in The Wind Waker e Four Swords.'
    ],
    deepDives: [
      'Ha ospitato la massima espressione artistica della pixel art bidimensionale moderna, con capolavori intramontabili della serie Castlevania, Metroid Fusion e Golden Sun.',
      'Il core ARM7TDMI a 32-bit consumava pochissima energia e divenne il punto di partenza per l\'architettura dei futuri processori mobile da smartphone.',
      'L\'assenza iniziale della retroilluminazione spinse milioni di giocatori a dotarsi delle celebri lampadine a collo d\'oca a pile (WormLight).'
    ]
  },
  'GBASP': { 
    color: '#14b8a6', accent: '#5eead4', emoji: '📟', 
    cpu: 'ARM7TDMI @ 16.78 MHz + Z80 per retrocompatibilità', ram: '288 KB totale', 
    gpu: 'Display TFT retroilluminato (modello AGS-101 a luce diretta)', media: 'Cartucce GBA e Game Boy classiche', 
    topGame: 'Pokémon Rosso Fuoco / Verde Foglia (12.0M)', resolution: '240 x 160 px',
    unitsSold: '43.5', score: 82, tags: ['Design Clamshell','Batteria Ricaricabile','Frontlit/Backlit'],
    funFacts: [
      'La prima console portatile Nintendo ad abbandonare le pile usa e getta per una batteria agli ioni di litio ricaricabile.',
      'La sigla "SP" sta ufficialmente per "Special Project".',
      'Il modello tardivo AGS-101 del 2005 aveva un display a retroilluminazione diretta brillante quanto un moderno display smartphone.'
    ],
    deepDives: [
      'Il design a conchiglia pieghevole proteggeva lo schermo dai graffi e inaugurò il form factor che avrebbe dominato la successiva generazione con la famiglia Nintendo DS.',
      'Rimuovendo per la prima volta il jack audio da 3.5mm a favore di un adattatore proprietario, anticipò di oltre un decennio la mossa analoga degli smartphone moderni.',
      'Manteneva al 100% l\'hardware fisico Z80 a 5V per la retrocompatibilità nativa con le cartucce grigie del primissimo Game Boy del 1989.'
    ]
  },
  'NDS':   { 
    color: '#f59e0b', accent: '#fcd34d', emoji: '📺', 
    cpu: 'ARM946E-S @ 67 MHz + ARM7TDMI @ 33 MHz', ram: '4 MB RAM (espansi a 16MB su DSi)', 
    gpu: 'Processore 3D dedicato (120k poligoni/sec) + 2 schermi', media: 'Schede DS (fino a 512 MB) + slot GBA', 
    topGame: 'New Super Mario Bros. (30.8M)', resolution: '256 x 192 px (doppio schermo)',
    unitsSold: '154.0', score: 85, tags: ['Doppio Schermo','Touch Screen Resistivo','Wi-Fi Locale'],
    funFacts: [
      'È la console portatile più venduta della storia dell\'umanità con oltre 154 milioni di pezzi.',
      'Inizialmente era chiamato in codice "Project Iris", perché Nintendo lo considerava il "terzo occhio" dei giocatori.',
      'Con PictoChat potevi scambiare disegni a mano libera e messaggi wireless senza internet fino a 30 metri di distanza già nel 2004.'
    ],
    deepDives: [
      'Inizialmente presentato come un "terzo pilastro" sperimentale accanto a Game Boy e GameCube, il Nintendo DS ha rivoluzionato il casual gaming con pennino touch e microfono.',
      'La presenza di due CPU distinte (ARM9 per il rendering e la logica di gioco, ARM7 per audio, touch e gestione Wi-Fi) garantiva prestazioni fluide e senza lag.',
      'Titoli pionieristici come Brain Training e Nintendogs allargarono il pubblico del gaming a intere fasce demografiche fino ad allora del tutto estranee ai videogiochi.'
    ]
  },
  'WII':   { 
    color: '#8b5cf6', accent: '#c4b5fd', emoji: '🕹️', 
    cpu: 'IBM Broadway (PowerPC 750CL) @ 729 MHz', ram: '88 MB 1T-SRAM totale (24MB + 64MB GDDR3)', 
    gpu: 'ATI Hollywood @ 243 MHz', media: 'Disco ottico 12 cm proprietario (4.7 GB/8.5 GB)', 
    topGame: 'Wii Sports (82.9M)', resolution: '480p / 576i (EDTV)',
    unitsSold: '101.6', score: 82, tags: ['Motion Control','WiiMote','Fenomeno Culturale Pop'],
    funFacts: [
      'Ha fatto giocare contemporaneamente bambini di 5 anni e nonni di 80 anni in case di riposo di tutto il mondo.',
      'Nei primi mesi le cinghie da polso si spezzavano durante i lanci energici di bowling, spingendo Nintendo a sostituirne gratuitamente milioni con modelli rinforzati!',
      'Il nome in codice durante lo sviluppo era "Revolution", poi cambiato in "Wii" per simboleggiare due persone vicine (le due "i").'
    ],
    deepDives: [
      'Focalizzandosi sull\'esperienza di gioco invece che sulla corsa ai pixel HD dell\'era PS3/Xbox 360 (strategia Blue Ocean), Wii ha generato profitti record per Nintendo fin dal primo giorno.',
      'Il telecomando WiiMote univa accelerometri triassiali a una telecamera a infrarossi puntata sulla Sensor Bar della TV, calcolando la posizione spaziale a 100Hz.',
      'I canali Wii (Mii Channel, News, Meteo) anticiparono il concetto di dashboard a widget connessa continuamente a internet in modalità standby a basso consumo WiiConnect24.'
    ]
  },
  'WIIU':  { 
    color: '#7c3aed', accent: '#a78bfa', emoji: '🎮', 
    cpu: 'IBM Espresso (Triple-Core PowerPC) @ 1.24 GHz', ram: '2 GB DDR3 (1 GB riservato ai giochi)', 
    gpu: 'AMD Radeon Latte @ 550 MHz', media: 'Dischi ottici proprietari ad alta densità (25 GB)', 
    topGame: 'Mario Kart 8 (8.46M)', resolution: '1080p Full HD',
    unitsSold: '13.6', score: 76, tags: ['GamePad Touch','Off-TV Play','Rarità Collezionistica'],
    funFacts: [
      'Commercialmente sfortunata, ma possiede uno dei tassi di capolavori first-party per unità venduta più alti di sempre.',
      'La latenza di streaming video wireless tra console e GamePad era inferiore a 16 millisecondi, più veloce di molte televisioni moderne via cavo!',
      'I bordi dei dischi del Wii U erano arrotondati e lisci al tatto per impedire che i bambini si tagliassero maneggiandoli.'
    ],
    deepDives: [
      'Il GamePad permetteva di giocare senza accendere la TV con latenza video pari a zero, gettando le basi concettuali della futura Nintendo Switch.',
      'Ha tenuto a battesimo franchise iconici moderni come Splatoon e Mario Maker, nati proprio per sfruttare l\'interazione tattile immediata a due schermi.',
      'La rete sociale Miiverse, con i suoi disegni a mano libera integrati direttamente nei livelli di gioco, rimane uno degli esperimenti di community più rimpianti della storia Nintendo.'
    ]
  },
  '3DS':   { 
    color: '#ec4899', accent: '#f9a8d4', emoji: '🎲', 
    cpu: 'Dual-Core ARM11 MPCore @ 268 MHz', ram: '128 MB FCRAM + 6 MB VRAM', 
    gpu: 'DMP PICA200 @ 134 MHz (illuminazione e texture per-pixel)', media: 'Schede 3DS (fino a 8 GB)', 
    topGame: 'Mario Kart 7 (18.9M)', resolution: '800 x 240 (400 x 240 per occhio in 3D)',
    unitsSold: '76.0', score: 83, tags: ['3D Autostereoscopico','StreetPass','Giroscopio'],
    funFacts: [
      'Visualizzava mondi tridimensionali profondi a occhio nudo senza bisogno di alcun paio di occhiali.',
      'Dopo un avvio di vendite lento a $250, Nintendo tagliò il prezzo a $170 e regalò 20 giochi gratuiti (Programma Fedeltà) ai primi acquirenti.',
      'Le schede di Realtà Aumentata (AR Cards) incluse nella scatola facevano emergere bersagli e draghi tridimensionali dal tavolo del salotto.'
    ],
    deepDives: [
      'La funzionalità StreetPass trasformò le città in giganteschi hub di incontro asincrono per giocatori, scambiando personaggi e puzzle camminando con la console nello zaino.',
      'La GPU giapponese PICA200 gestiva effetti shader avanzati, illuminazione per-pixel e rendering autostereoscopico a barriera di parallasse.',
      'La versione New 3DS aggiunse il tracking oculare via infrarossi per mantenere il 3D perfetto anche muovendo la testa.'
    ]
  },
  'NSW':   { 
    color: '#f43f5e', accent: '#fda4af', emoji: '🟥', 
    cpu: 'Nvidia Tegra X1 (4x Cortex-A57) @ 1.02 GHz', ram: '4 GB LPDDR4 @ 1600 MHz condivisa', 
    gpu: 'Nvidia Maxwell 256 CUDA Core (fino a 768 MHz in dock)', media: 'Schede flash ROM (fino a 64 GB)', 
    topGame: 'Mario Kart 8 Deluxe (61.9M+)', resolution: '720p portatile / 1080p su Dock TV',
    unitsSold: '143.0', score: 91, tags: ['Console Ibrida','Joy-Con Rimovibili','HD Rumble'],
    funFacts: [
      'Le cartucce dei giochi sono cosparse di benzoato di denatonio (la sostanza più amara al mondo) per evitare che i bambini le ingeriscano.',
      'I sensori HD Rumble dei Joy-Con sono così precisi da poter simulare la sensazione di cubetti di ghiaccio che sbattono dentro un bicchiere.',
      'Permette di passare istantaneamente dal grande schermo TV del salotto alle mani in mobilità con un semplice "click".'
    ],
    deepDives: [
      'Grazie a capolavori immortali come Zelda: Breath of the Wild e una transizione fluidissima tra casa e viaggio, Switch ha unificato per sempre lo sviluppo fisso e portatile di Nintendo.',
      'L\'architettura Nvidia Tegra X1 basata su API NVN ha permesso conversioni insperate di engine moderni come Unreal Engine 4, id Tech e DOOM.',
      'I due Joy-Con possono funzionare sia come gamepad tradizionale unico che come due controller completamente separati per sfidare al volo un amico.'
    ]
  },

  // Sony PlayStation
  'PS1':   { 
    color: '#3b82f6', accent: '#93c5fd', emoji: '🔵', 
    cpu: 'MIPS R3000A (32-bit RISC) @ 33.87 MHz', ram: '2 MB RAM principale + 1 MB VRAM + 512 KB Audio', 
    gpu: 'Sony GPU (360k poligoni/sec texturizzati)', media: 'CD-ROM 2x (fino a 650 MB)', 
    topGame: 'Gran Turismo (10.85M)', resolution: '256 x 224 fino a 640 x 480',
    unitsSold: '102.5', score: 96, tags: ['Nascita del 3D Moderno','CD-ROM Audio','Memory Card'],
    funFacts: [
      'Nata dopo un clamoroso tradimento commerciale di Nintendo su un lettore CD per SNES annunciato a sorpresa con Philips.',
      'I simboli dei tasti non sono casuali: il Triangolo rappresenta il punto di vista, il Quadrato un foglio di carta (menu), Cerchio e Croce significano Sì e No.',
      'I dischi originali avevano il retro completamente nero lucido per contrastare la pirateria e dare un look premium.'
    ],
    deepDives: [
      'Con costi dei CD ridotti a 2-3 dollari rispetto ai 30 dollari delle cartucce, Sony ha attratto centinaia di sviluppatori terzi e trasformato i videogiochi in un fenomeno pop.',
      'Il Geometry Transformation Engine (GTE) integrato nella CPU era capace di calcolare 1.5 milioni di trasformazioni di vettori al secondo per il 3D.',
      'Ha dato i natali a franchise storici che hanno fondato la narrazione cinematografica moderna: Metal Gear Solid, Resident Evil, Silent Hill e Tomb Raider.'
    ]
  },
  'PS2':   { 
    color: '#6366f1', accent: '#a5b4fc', emoji: '💿', 
    cpu: 'Emotion Engine (128-bit SIMD MIPS) @ 294.9 MHz', ram: '32 MB RDRAM @ 3.2 GB/s', 
    gpu: 'Graphics Synthesizer @ 147 MHz (4 MB eDRAM a 48 GB/s)', media: 'DVD-ROM 4x (4.7 GB / 8.5 GB)', 
    topGame: 'Grand Theft Auto: San Andreas (17.3M)', resolution: '480i / 480p (alcuni titoli 1080i)',
    unitsSold: '155.0', score: 97, tags: ['La più venduta di sempre','Lettore DVD integrato','Hardware da Leggenda'],
    funFacts: [
      'È la console casalinga più venduta della storia (155+ milioni di pezzi venduti in 13 anni di ciclo vitale ininterrotto).',
      'Il logo PS2 frontale può essere ruotato a mano di 90 gradi per posizionare la console sia in orizzontale che in verticale.',
      'Le torri bianche nella schermata di caricamento iniziale corrispondono al numero e alla dimensione dei salvataggi presenti sulla tua Memory Card!'
    ],
    deepDives: [
      'Al lancio costava meno di un comune lettore DVD da salotto; l\'architettura Emotion Engine con 2 unità vettoriali VPU richiedeva mesi di studio, ma offriva un fill-rate mostruoso per l\'epoca.',
      'La memoria video eDRAM integrata direttamente sul chip grafico garantiva un incredibile bandwidth di 48 GB/s senza precedenti per l\'anno 2000.',
      'La vastità della sua libreria (oltre 3.800 giochi ufficiali) ha segnato l\'apice creativo dell\'era PlayStation prima dell\'avvento dei costi di sviluppo moderni.'
    ]
  },
  'PS3':   { 
    color: '#8b5cf6', accent: '#c4b5fd', emoji: '🔮', 
    cpu: 'Cell Broadband Engine (1 PPE + 7 SPE) @ 3.2 GHz', ram: '256 MB XDR RAM + 256 MB GDDR3 VRAM', 
    gpu: 'Nvidia RSX "Reality Synthesizer" @ 500 MHz', media: 'Blu-ray Disc 2x (25 GB / 50 GB) + HDD interno', 
    topGame: 'Grand Theft Auto V (29.5M)', resolution: '1080p Full HD nativo / 720p',
    unitsSold: '87.4', score: 80, tags: ['Processore Cell','Lettore Blu-ray','Hard Disk di Serie'],
    funFacts: [
      'L\'US Air Force collegò 1.760 console PS3 per creare il "Condor Cluster", un supercomputer di calcolo federato per l\'elaborazione radar a basso costo.',
      'Il primo modello "Fat" del 2006 pesava ben 5 chilogrammi ed era compatibile con l\'installazione di distribuzioni Linux ufficiali (OtherOS).',
      'Il font usato per la scritta "PLAYSTATION 3" sulla scocca era lo stesso identico font utilizzato da Sony per i film cinematografici di Spider-Man di Sam Raimi.'
    ],
    deepDives: [
      'Il Cell processor era un mostro di calcolo parallelo in virgola mobile; superate le difficoltà iniziali di programmazione, permise a Naughty Dog di plasmare capolavori visivi come Uncharted 2 e The Last of Us.',
      'L\'integrazione nativa del lettore Blu-ray Disc fu il fattore decisivo che permise a Sony di vincere la sanguinosa guerra dei formati contro l\'HD-DVD di Toshiba e Microsoft.',
      'I 7 coprocessori SPE gestivano fisica, post-processing e particelle con velocità superiori a qualsiasi CPU desktop concorrente di quel decennio.'
    ]
  },
  'PS4':   { 
    color: '#2563eb', accent: '#60a5fa', emoji: '🎮', 
    cpu: 'AMD Jaguar 8-Core x86-64 @ 1.6 GHz', ram: '8 GB GDDR5 unificata @ 176 GB/s', 
    gpu: 'AMD Radeon GCN (18 Compute Unit, 1.84 TFLOPS)', media: 'Blu-ray BD-ROM 6x + HDD rimovibile', 
    topGame: 'Marvel\'s Spider-Man (20M+)', resolution: '1080p nativo a 60fps',
    unitsSold: '117.2', score: 78, tags: ['Architettura x86','Tasto Share','GDDR5 Unificata'],
    funFacts: [
      'Fu la prima console a integrare un pulsante fisico dedicato al livestreaming immediato (Share), generando miliardi di clip video.',
      'La barra luminosa Lightbar del DualShock 4 cambiava colore a seconda della vita del personaggio o per indicare la polizia in fuga.',
      'L\'architettura fu guidata dal leggendario game designer Mark Cerny, che consultò decine di software house per renderla la console più amata dagli sviluppatori.'
    ],
    deepDives: [
      'Sony abbandonò le architetture proprietarie esotiche a favore di un solido x86 da PC gaming con 8GB di velocissima memoria GDDR5 unificata, facilitando immensamente il lavoro di programmatori terzi.',
      'La funzione "Sospendi/Riprendi" in modalità riposo permise ai giocatori di interrompere e riavviare istantaneamente una partita complessa in pochi secondi.',
      'Ha consolidato il primato delle grandi produzioni narrative per giocatore singolo (God of War, Horizon Zero Dawn, Bloodborne).'
    ]
  },
  'PSP':   { 
    color: '#ec4899', accent: '#f9a8d4', emoji: '📱', 
    cpu: 'MIPS R4000 32-bit @ 333 MHz', ram: '32 MB RAM principale (64 MB su PSP-2000/3000) + 2 MB VRAM', 
    gpu: 'Processore grafico con curve di Bezier e rendering 3D', media: 'Disco ottico miniaturizzato UMD (1.8 GB)', 
    topGame: 'Grand Theft Auto: Liberty City Stories (8M)', resolution: '480 x 272 px panoramico 16:9',
    unitsSold: '80.0', score: 83, tags: ['Schermo 16:9','Supporto UMD','Grafica Livello PS2'],
    funFacts: [
      'Portò la qualità cinematografica e la grafica 3D da home console in tasca già nel 2004.',
      'I dischi UMD potevano contenere film interi hollywoodiani come Spider-Man 2 e Final Fantasy VII: Advent Children.',
      'La community di sviluppatori indipendenti creò un florido ecosistema di firmware custom che trasformò la console nella regina dell\'emulazione portatile.'
    ],
    deepDives: [
      'Con uno sbalorditivo display widescreen a 16:9, uscita TV video e capacità di riprodurre MP3 e film, fu considerata anni avanti rispetto ai suoi tempi.',
      'In Giappone divenne un autentico fenomeno sociale grazie a Monster Hunter Freedom Unite, radunando milioni di giocatori nei parchi per cacce cooperative.',
      'La CPU era limitata via software a 222 MHz per risparmiare batteria, ma Sony sbloccò i pieni 333 MHz con aggiornamenti successivi per i titoli più esigenti.'
    ]
  },
  'VITA':  { 
    color: '#a855f7', accent: '#d8b4fe', emoji: '💎', 
    cpu: 'Quad-Core ARM Cortex-A9 MPCore @ 444 MHz', ram: '512 MB RAM + 128 MB VRAM dedicata', 
    gpu: 'PowerVR SGX543MP4+ Quad-Core', media: 'Schede proprietarie NVG Card (fino a 4 GB)', 
    topGame: 'Minecraft (oltre 2.5M su Vita)', resolution: '960 x 544 px (16:9 qHD)',
    unitsSold: '15.0', score: 89, tags: ['Display OLED da urlo','Doppio Stick Analogico','Retro Touchpad'],
    funFacts: [
      'Il suo display OLED originale del 2011 offre neri assoluti e saturazione che battevano gli smartphone di fascia alta del periodo.',
      'Consentiva il Remote Play totale per giocare a tutti i titoli PlayStation 4 in streaming Wi-Fi direttamente nel palmo della mano.',
      'Disponeva di un touchpad capacitivo posteriore che permetteva di interagire con il retro dei mondi virtuali senza coprire la visuale dello schermo con le dita.'
    ],
    deepDives: [
      'Console sopraffina e amatissima dai collezionisti per il display OLED, doppio stick analogico puro e touchpad posteriore; penalizzata dal costo spropositato delle memorie proprietarie.',
      'La GPU quad-core PowerVR era la stessa usata nei tablet iPad di punta, garantendo una fedeltà grafica stupefacente per il 2011 con titoli come Uncharted: L\'Abisso d\'Oro.',
      'È diventata la dimora di culto per indie game acclamati, visual novel e capolavori JRPG (in primis Persona 4 Golden).'
    ]
  },

  // Sega
  'SMD':   { 
    color: '#06b6d4', accent: '#67e8f9', emoji: '🔵', 
    cpu: 'Motorola 68000 @ 7.67 MHz + Zilog Z80 @ 3.58 MHz', ram: '64 KB RAM + 64 KB VRAM + 8 KB Audio', 
    gpu: 'Yamaha YM2612 (FM Synth a 6 canali) + VDP video', media: 'Cartucce ROM fino a 40 Mbit', 
    topGame: 'Sonic the Hedgehog (15M+ bundled)', resolution: '320 x 224 px',
    unitsSold: '30.7', score: 87, tags: ['Blast Processing','Sonic Mania','16-bit Pura Adrenalina'],
    funFacts: [
      'Il termine pubblicitario "Blast Processing" nacque per evidenziare la maggiore frequenza di clock del chip Motorola rispetto al processore dello SNES.',
      'Michael Jackson compose segretamente gran parte della leggendaria colonna sonora di Sonic the Hedgehog 3.',
      'Sega consentì il sangue non censurato nella versione Mega Drive di Mortal Kombat tramite il codice segreto ABACABB, stravincendo la battaglia commerciale su Nintendo.'
    ],
    deepDives: [
      'Guidata da Tom Kalinske in Nord America col celebre slogan "Genesis does what Nintendon\'t", ha sconfitto temporaneamente il monopolio Nintendo negli USA grazie a titoli sportivi d\'autore e al fulmineo Sonic.',
      'Il sintetizzatore FM Yamaha YM2612 donava alla console quel sound metallico, ritmico ed energico tipico dell\'eurodance e dei club techno degli anni \'90.',
      'Fu la prima ad esplorare espansioni modulari a torre con il Sega CD (lettore ottico) e il 32X (doppio processore SH-2).'
    ]
  },
  'SAT':   { 
    color: '#10b981', accent: '#6ee7b7', emoji: '🪐', 
    cpu: 'Doppio Hitachi SH-2 (32-bit RISC) @ 28.6 MHz', ram: '2 MB RAM + 1.5 MB VRAM + 512 KB Audio', 
    gpu: 'VDP1 (rendering sprite/quadrilateri) + VDP2 (sfondi)', media: 'CD-ROM 2x (fino a 650 MB)', 
    topGame: 'Virtua Fighter 2 (2.2M)', resolution: '320 x 224 fino a 704 x 480',
    unitsSold: '9.5', score: 85, tags: ['Doppio CPU','Re dei Picchiaduro 2D','Gemma dei Collezionisti'],
    funFacts: [
      'È universalmente riconosciuta come la console definitiva per i picchiaduro 2D arcade Capcom e SNK.',
      'Negli USA Sega annunciò il lancio a sorpresa durante l\'E3 1995 al prezzo di $399; pochi minuti dopo Steve Race di Sony salì sul palco, pronunciò "$299" e se ne andò, segnando la storia del marketing!',
      'Il mitico personaggio pubblicitario Segata Sanshiro picchiava i giovani giapponesi che non giocavano al Sega Saturn in memorabili spot televisivi.'
    ],
    deepDives: [
      'I suoi due chip video (VDP1 e VDP2) manipolavano poligoni quadrangolari anziché triangolari: era una macchina 2D insuperabile, ma la complessità del doppio processore mise in crisi gli sviluppatori occidentali.',
      'L\'espansione RAM cartridge da 4 MB permetteva conversioni arcade perfette al 100% con frame di animazione completi mai visti su altre piattaforme da casa.',
      'Capolavori visionari come Nights into Dreams e Panzer Dragoon Saga rimangono pietre miliari irraggiungibili della storia videoludica.'
    ]
  },
  'DC':    { 
    color: '#f59e0b', accent: '#fcd34d', emoji: '🌀', 
    cpu: 'Hitachi SH-4 (128-bit FPU) @ 200 MHz (360 MIPS)', ram: '16 MB RAM principale + 8 MB VRAM + 2 MB Audio', 
    gpu: 'NEC PowerVR Series 2 (rendering Deferred a piastrelle)', media: 'GD-ROM proprietario Yamaha (1.2 GB)', 
    topGame: 'Sonic Adventure (2.5M)', resolution: '640 x 480 con cavo VGA Box a 60Hz',
    unitsSold: '9.1', score: 89, tags: ['Modem 56k di Serie','VMU Controller','Addio Leggendario Sega'],
    funFacts: [
      'Prima console domestica dotata di modem internet integrato di serie e controller con memory card a schermo interattivo (VMU).',
      'La data di lancio americana era la combinazione perfetta: 09/09/99 al prezzo aggressivo di $199.',
      'Con la visual memory unit (VMU) potevi allevare piccoli animaletti virtuali (Chao di Sonic) staccandola dal controller e portandola a scuola in tasca!'
    ],
    deepDives: [
      'Capace di produrre segnale video VGA a 480p di limpidezza abbacinante, Dreamcast ha introdotto il multiplayer online di massa con Phantasy Star Online e le basi dell\'open world moderno con Shenmue di Yu Suzuki.',
      'Il chip grafico PowerVR CLX2 con rendering a tasselli scartava i pixel nascosti prima di disegnarli, offrendo prestazioni teoriche pari a GPU con fill-rate quadruplo.',
      'Nonostante la prematura uscita di Sega dal mercato hardware, conserva una delle community di fedeli appassionati e produzioni homebrew più vivaci al mondo.'
    ]
  },
  'SMS':   { 
    color: '#0ea5e9', accent: '#7dd3fc', emoji: '📦', 
    cpu: 'Zilog Z80A @ 3.58 MHz', ram: '8 KB RAM + 16 KB VRAM', 
    gpu: 'Texas Instruments TMS9918A derivato (palette a 64 colori)', media: 'Cartucce ROM + Sega Card ultrasottili', 
    topGame: 'Alex Kidd in Miracle World', resolution: '256 x 192 px',
    unitsSold: '13.0', score: 74, tags: ['8-bit Sega','Sega Card','Dominio Europeo e Brasiliano'],
    funFacts: [
      'In Brasile è diventata un fenomeno immortale: prodotta su licenza da TecToy, è stata venduta continuativamente per oltre 30 anni!',
      'Molti modelli avevano un gioco completo (come Alex Kidd o Snail Maze) memorizzato direttamente nel BIOS di sistema, giocabile senza inserire cartucce.',
      'Disponeva degli occhiali 3D shutter "SegaScope 3-D" già nel 1987, anticipando di decenni la stereoscopia su console.'
    ],
    deepDives: [
      'Superava l\'originale NES per brillantezza dei colori e memoria video; in Europa e Sud America ha goduto di una popolarità enorme contrapponendosi alla dominanza americana di Nintendo.',
      'Lo slot aggiuntivo per le compatte Sega Card (simili a carte di credito) offriva giochi a basso costo prima che le capacità delle cartucce ROM prendessero il sopravvento.',
      'Ha tenuto a battesimo saghe storiche come Phantasy Star e Wonder Boy, introducendo la prima protagonista femminile di rilievo nei giochi di ruolo (Alis Landale).'
    ]
  },

  // Microsoft Xbox
  'XBOX':  { 
    color: '#22c55e', accent: '#86efac', emoji: '🟩', 
    cpu: 'Intel Pentium III Custom Coppermine @ 733 MHz', ram: '64 MB DDR SDRAM condivisa @ 6.4 GB/s', 
    gpu: 'Nvidia NV2A @ 233 MHz (supporto Shader Model 1.1)', media: 'DVD-ROM 5x + Hard Disk interno da 8 o 10 GB', 
    topGame: 'Halo 2 (8.49M)', resolution: '480p / 720p / 1080i HD',
    unitsSold: '24.0', score: 79, tags: ['Disco Fisso di Serie','Xbox Live','Halo Revolution'],
    funFacts: [
      'Era letteralmente un PC Pentium III da combattimento travestito da mastodontica console da salotto.',
      'Il primo controller "The Duke" era così gigantesco che fu premiato scherzosamente come il controller più ingombrante della storia dai gamer giapponesi.',
      'Potevi copiare interi CD musicali sull\'hard disk della console e ascoltare le tue canzoni personalizzate mentre guidavi nelle radio di Project Gotham Racing!'
    ],
    deepDives: [
      'Con un hard disk integrato per salvare tracce audio ed eliminare le Memory Card, unito all\'infrastruttura Xbox Live e all\'invenzione del matchmaking con Halo 2, Microsoft ha riscritto le regole del multiplayer su console.',
      'La GPU Nvidia NV2A con pixel shader programmabili era due generazioni avanti rispetto a PS2, permettendo normal mapping e illuminazione in tempo reale.',
      'La prima Xbox pose le basi per la nascita della dashboard unificata per account giocatore, gamertag e liste amici che usiamo tuttora.'
    ]
  },
  'X360':  { 
    color: '#16a34a', accent: '#4ade80', emoji: '🎯', 
    cpu: 'IBM Xenon (Triple-Core PowerPC a 3.2 GHz con 6 thread)', ram: '512 MB GDDR3 unificata @ 700 MHz', 
    gpu: 'ATI Xenos @ 500 MHz (con 10 MB eDRAM per anti-aliasing gratuito)', media: 'DVD-ROM 12x DL (fino a 8.5 GB)', 
    topGame: 'Kinect Adventures (24M bundled) / Halo 3 (14.5M)', resolution: '720p / 1080p HD nativo',
    unitsSold: '84.0', score: 81, tags: ['Era HD','Gamerscore & Obiettivi','Xbox Live Arcade'],
    funFacts: [
      'Ha inventato il sistema dei "Gamerscore" e degli "Obiettivi sbloccati" (Achievements) con l\'inconfondibile suono "Bleep!", oggi standard su ogni piattaforma.',
      'Il celebre difetto "Red Ring of Death" (RROD) costò a Microsoft oltre 1.15 miliardi di dollari per estendere la garanzia a tutti gli utenti del mondo.',
      'Le mascherine frontali della console originale erano intercambiabili per personalizzare l\'estetica della console a piacimento.'
    ],
    deepDives: [
      'Ha dato vita alla rinascita del gaming indie attraverso Xbox Live Arcade (Braid, Limbo, Super Meat Boy) e ha dominato la prima metà della settima generazione grazie a strumenti di sviluppo DirectX eccelsi.',
      'La GPU ATI Xenos fu la prima nella storia dell\'informatica ad adottare un\'architettura a shader unificati, poi adottata da tutte le schede video PC del decennio successivo.',
      'Con il sensore Kinect nel 2010 divenne il dispositivo elettronico di consumo venduto più rapidamente nella storia del Guinness World Records.'
    ]
  },
  'XONE':  { 
    color: '#15803d', accent: '#34d399', emoji: '🎮', 
    cpu: 'AMD Jaguar 8-Core x86-64 @ 1.75 GHz', ram: '8 GB DDR3 + 32 MB ESRAM ultraveloce', 
    gpu: 'AMD Radeon GCN (12 Compute Unit, 1.31 TFLOPS)', media: 'Blu-ray Disc + HDD 500GB/1TB', 
    topGame: 'Grand Theft Auto V (oltre 11M su Xbox)', resolution: '900p / 1080p',
    unitsSold: '51.0', score: 72, tags: ['Game Pass Pioneer','Retrocompatibilità 360/Xbox','Centro Multimediale'],
    funFacts: [
      'Ha visto la nascita del servizio Xbox Game Pass, ridefinendo il modello economico di fruizione videoludica moderno.',
      'Il controller integrava motori di vibrazione dedicati nei grilletti (Impulse Triggers) per farti percepire i giri del motore e l\'attrito delle gomme nei giochi di guida.',
      'Poteva collegare il decoder TV via porta HDMI pass-through per guardare la televisione e giocare a schermo diviso contemporaneamente con la funzione Snap.'
    ],
    deepDives: [
      'Dopo un reveal iniziale controverso incentrato sulla TV, Phil Spencer ne ha riorientato il focus investendo sull\'ingegneria di retrocompatibilità nativa a risoluzioni 4K con Xbox originale e 360.',
      'Ha introdotto Xbox Play Anywhere per condividere progressi e acquisti senza costi tra console e PC Windows.',
      'La presenza della memoria ultra-rapida embedded ESRAM a 204 GB/s sul silicio centrale richiedeva ottimizzazioni specifiche per il frame buffer.'
    ]
  },

  // SNK & Atari
  'NEO':   { 
    color: '#f97316', accent: '#fb923c', emoji: '👑', 
    cpu: 'Motorola 68000 @ 12 MHz + Zilog Z80A @ 4 MHz', ram: '64 KB RAM + 68 KB VRAM + 2 KB Audio', 
    gpu: 'Chip custom SNK capace di 380 sprite simultanei', media: 'Gigantesche cartucce arcade MVS (fino a 716 Mbit)', 
    topGame: 'The King of Fighters \'98 / Metal Slug', resolution: '320 x 224 px arcade puro',
    unitsSold: '1.0', score: 98, tags: ['Arcade 1:1 Perfetto','La Rolls-Royce delle Console','Cartucce da 300+ Mega'],
    funFacts: [
      'Costava oltre 650 dollari nel 1990 e le singole cartucce potevano costare fino a 300 dollari l\'una!',
      'Le cartucce erano enormi quanto un libro enciclopedico e contenevano due schede madri separate all\'interno del guscio plastico.',
      'Lo slogan pubblicitario recitava: "Bigger, Badder, Better" — prometteva e offriva l\'esatta esperienza delle sale giochi senza compromessi.'
    ],
    deepDives: [
      'Nessun compromesso: conteneva l\'esatto hardware da sala giochi da bar SNES MVS. I giocatori a casa avevano sprite mastodontici, animazioni a 60fps ed effetti sonori identici alla sala giochi senza alcuna degradazione.',
      'Gestiva uno scaling hardware in tempo reale degli sprite bidimensionali che rese storiche saghe come Samurai Shodown e Art of Fighting.',
      'La Memory Card a 68 pin permetteva di salvare la partita nelle sale giochi e continuare a casa sulla propria console Neo Geo AES casalinga.'
    ]
  },
  'A2600': { 
    color: '#d97706', accent: '#fbbf24', emoji: '🕹️', 
    cpu: 'MOS 6507 @ 1.19 MHz', ram: 'Soltanto 128 Byte di RAM integrati nel chip RIOT', 
    gpu: 'TIA (Television Interface Adaptor) senza frame-buffer', media: 'Cartucce ROM da 2 KB a 4 KB (con bank-switch)', 
    topGame: 'Pac-Man (7.7M) / Space Invaders (6M)', resolution: '160 x 192 px (senza bitmap reale)',
    unitsSold: '30.0', score: 82, tags: ['Padre dei Videogiochi da Casa','1977','Leggenda Assoluta'],
    funFacts: [
      'Aveva solo 128 BYTE di memoria RAM: i programmatori dovevano sincronizzarsi riga per riga con il fascio di elettroni della TV tubo catodico ("racing the beam").',
      'Le cartucce invendute del gioco E.T. the Extra-Terrestrial furono sepolte nel deserto del New Mexico e dissotterrate decenni dopo come reperto archeologico.',
      'L\'iconica mascherina frontale era realizzata in autentico finto-legno, per abbinarsi ai mobili di salotto degli anni \'70.'
    ],
    deepDives: [
      'Creata da Nolan Bushnell e venduta con l\'iconico joystick monoleva CX40, ha popolarizzato l\'idea stessa che una console potesse riprodurre infiniti giochi diversi semplicemente sostituendo una cartuccia.',
      'La totale assenza di chip di protezione software portò all\'inondazione incontrollata di giochi scadenti che scatenò il disastroso collasso del mercato del 1983.',
      'Programmatori geniali come David Crane (fondatore di Activision e creatore di Pitfall!) riuscirono a spremere animazioni e paesaggi memorabili da un hardware progettato originariamente per far girare solo Pong e Tank.'
    ]
  },
};

function getMeta(code: string) {
  return PLATFORM_META[code] ?? {
    color: '#64748b', accent: '#94a3b8', emoji: '📦',
    cpu: 'N/A', ram: 'N/A',
    gpu: 'Chip custom dedicato', media: 'Supporto originale',
    topGame: 'Vari titoli di lancio', resolution: 'Standard Definition',
    unitsSold: '0', score: 70,
    tags: ['Classico'],
    funFacts: ['Una console storica che ha segnato un\'epoca del gaming.', 'Pietra miliare del collezionismo retrogame.', 'Design ingegneristico che ha ispirato generazioni.'],
    deepDives: [
      'Un sistema che fa parte della storia e dell\'evoluzione del gaming hardware moderno.',
      'Ha contribuito allo sviluppo di standard industriali per periferiche e architetture.',
      'Rimane un pilastro per l\'archeologia informatica e la conservazione del software.'
    ],
  };
}

function RadarChart({ values, color, size = 150 }: {
  values: { label: string; val: number }[];
  color: string;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.68;
  const n = values.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, radius: number) => ({
    x: cx + radius * Math.cos(angle(i)),
    y: cy + radius * Math.sin(angle(i)),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = values.map((v, i) => point(i, r * (Math.max(5, v.val) / 100)));
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => point(i, r * level));
        return <polygon key={level} points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />;
      })}
      {Array.from({ length: n }, (_, i) => {
        const outer = point(i, r);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />;
      })}
      <polygon points={polygon} fill={color + '30'} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />)}
      {values.map((v, i) => {
        const lp = point(i, r + 16);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fontSize={8} fill="rgba(255,255,255,0.45)" fontFamily="var(--font-sans)">
            {v.label}
          </text>
        );
      })}
    </svg>
  );
}

function platformRadarValues(plat: PlatformDTO) {
  const meta = getMeta(plat.code);
  return [
    { label: 'Collezion.', val: meta.score },
    { label: 'Rarità',     val: Math.min(100, Math.max(10, 100 - parseFloat(meta.unitsSold) / 2)) },
    { label: 'Vendite',    val: Math.min(100, parseFloat(meta.unitsSold) / 1.6) },
    { label: 'Gen.',       val: Math.min(100, plat.generation * 11) },
    { label: 'Longevità',  val: Math.min(100, (2024 - plat.releaseYear) / 0.48) },
  ];
}

const GENERATION_COLORS: Record<number, string> = {
  2: '#f43f5e', 3: '#f97316', 4: '#eab308', 5: '#84cc16',
  6: '#10b981', 7: '#06b6d4', 8: '#6366f1', 9: '#ec4899',
};

export const PlatformsWikiView: React.FC<PlatformsWikiViewProps> = ({ platforms, onSelectPlatform }) => {
  const [search, setSearch] = useState('');
  const [leftId, setLeftId] = useState<number | null>(null);
  const [rightId, setRightId] = useState<number | null>(null);
  const [mode, setMode] = useState<'explore' | 'compare'>('explore');
  const [activeGen, setActiveGen] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  // Indici dinamici per rotazione frasi e curiosità (cambiano ad ogni click o rotazione)
  const [factOffsets, setFactOffsets] = useState<Record<number, number>>({});

  const getCardOffset = (platId: number) => factOffsets[platId] ?? 0;

  const shuffleFact = (platId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFactOffsets((prev) => ({
      ...prev,
      [platId]: (prev[platId] ?? 0) + 1,
    }));
  };

  const shuffleAll = () => {
    setFactOffsets((prev) => {
      const nextOffsets: Record<number, number> = {};
      platforms.forEach((p) => {
        // Increment by exactly 1 to guarantee a visible change (avoids (x+3)%3 === x%3 problem)
        nextOffsets[p.id] = (prev[p.id] ?? 0) + 1;
      });
      return nextOffsets;
    });
  };

  const leftPlat  = platforms.find((p) => p.id === leftId) ?? null;
  const rightPlat = platforms.find((p) => p.id === rightId) ?? null;
  const leftMeta  = leftPlat  ? getMeta(leftPlat.code)  : null;
  const rightMeta = rightPlat ? getMeta(rightPlat.code) : null;

  const generations = Array.from(new Set(platforms.map((p) => p.generation))).sort((a, b) => a - b);

  const filtered = platforms.filter((p) => {
    const q = search.toLowerCase();
    const genMatch = activeGen === null || p.generation === activeGen;
    return genMatch && (p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.manufacturer.toLowerCase().includes(q));
  });

  function pickForCompare(plat: PlatformDTO) {
    if (leftId === plat.id)  { setLeftId(null);  return; }
    if (rightId === plat.id) { setRightId(null); return; }
    if (!leftId)  { setLeftId(plat.id);  return; }
    if (!rightId) { setRightId(plat.id); return; }
    setLeftId(plat.id); setRightId(null);
  }

  function CompareBar({ label, leftVal, rightVal, maxVal, lColor, rColor }: {
    label: string; leftVal: number; rightVal: number; maxVal: number; lColor: string; rColor: string;
  }) {
    const lPct = maxVal > 0 ? Math.round((leftVal  / maxVal) * 100) : 0;
    const rPct = maxVal > 0 ? Math.round((rightVal / maxVal) * 100) : 0;
    return (
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
          <span style={{ color: lColor, fontWeight: 700 }}>{typeof leftVal === 'number' && !Number.isInteger(leftVal) ? leftVal.toFixed(1) : leftVal}</span>
          <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
          <span style={{ color: rColor, fontWeight: 700 }}>{typeof rightVal === 'number' && !Number.isInteger(rightVal) ? rightVal.toFixed(1) : rightVal}</span>
        </div>
        <div style={{ display: 'flex', gap: '3px', height: '7px', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '100%', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: `${lPct}%`, height: '100%', background: lColor, borderRadius: '99px', transition: 'width 0.9s cubic-bezier(0.34,1.56,0.64,1)' }} />
          </div>
          <div style={{ width: '4px', height: '14px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '100%', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ width: `${rPct}%`, height: '100%', background: rColor, borderRadius: '99px', transition: 'width 0.9s cubic-bezier(0.34,1.56,0.64,1)' }} />
          </div>
        </div>
      </div>
    );
  }

  const renderPlatformSlot = (side: 'left' | 'right') => {
    const plat = side === 'left' ? leftPlat : rightPlat;
    const setId = side === 'left' ? setLeftId : setRightId;
    const meta = plat ? getMeta(plat.code) : null;
    const radarVals = plat ? platformRadarValues(plat) : [];
    const borderStyle = side === 'left'
      ? { borderRight: '1px solid rgba(255,255,255,0.06)' }
      : { borderLeft: '1px solid rgba(255,255,255,0.06)' };

    if (!plat) return (
      <div style={{ padding: '2.5rem 1.5rem', ...borderStyle, minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Nessuna console selezionata</div>
          <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', opacity: 0.6 }}>Clicca su una scheda nella griglia</div>
        </div>
      </div>
    );

    return (
      <div style={{ padding: '1.75rem 1.5rem', ...borderStyle, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '1.8rem' }}>{meta!.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>{plat.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{plat.manufacturer} · {plat.releaseYear}</div>
          </div>
          <button onClick={() => setId(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RadarChart values={radarVals} color={meta!.color} size={150} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {[
            ['CPU', meta!.cpu],
            ['GPU / Video', meta!.gpu],
            ['RAM', meta!.ram],
            ['Supporto', meta!.media],
            ['Risoluzione', meta!.resolution],
            ['Gioco Più Venduto', meta!.topGame],
            ['Unità Vendute', meta!.unitsSold + ' M'],
            ['Anno di Lancio', String(plat.releaseYear)]
          ].map(([k, v]) => (
            <div key={k} style={{ padding: '0.55rem 0.75rem', background: 'rgba(255,255,255,0.035)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</div>
              <div style={{ fontSize: '0.82rem', color: k.includes('Vendut') ? meta!.color : '#e2e8f0', fontWeight: 700, wordBreak: 'break-word', lineHeight: 1.35 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Fun Fact Badge with Dynamic Shuffle Button */}
        {(() => {
          const off = getCardOffset(plat.id);
          const currentFact = meta!.funFacts[off % meta!.funFacts.length];
          const currentDeep = meta!.deepDives[off % meta!.deepDives.length];
          return (
            <>
              <div style={{ padding: '0.75rem 0.95rem', borderRadius: '12px', background: meta!.color + '15', border: `1px solid ${meta!.color}35`, fontSize: '0.78rem', color: meta!.accent, lineHeight: 1.55 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <strong style={{ color: '#fff', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    💡 Curiosità Storica
                  </strong>
                  <button
                    onClick={(e) => shuffleFact(plat.id, e)}
                    title="Genera un'altra curiosità storica casuale"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Shuffle size={11} /> Cambia frase
                  </button>
                </div>
                {currentFact}
              </div>

              {/* Deep Dive Historical Breakdown */}
              <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <strong style={{ color: '#38bdf8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    📜 Impatto & Architettura
                  </strong>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Approfondimento archivio</span>
                </div>
                {currentDeep}
              </div>
            </>
          );
        })()}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>

      {/* HERO */}
      <div style={{
        position: 'relative', borderRadius: '28px', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 30% 0%, rgba(99,102,241,0.28) 0%, rgba(6,182,212,0.12) 45%, rgba(11,15,23,0.97) 80%)',
        border: '1px solid rgba(99,102,241,0.25)', padding: '3rem 2.5rem', marginBottom: '2rem',
      }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%',
            width: `${4 + (i % 3) * 3}px`, height: `${4 + (i % 3) * 3}px`,
            background: i % 2 === 0 ? 'rgba(99,102,241,0.5)' : 'rgba(6,182,212,0.45)',
            top: `${10 + (i * 17) % 80}%`, left: `${5 + (i * 13) % 90}%`,
            animation: `floatSlow ${4 + (i % 4)}s ease-in-out infinite alternate`, filter: 'blur(1px)',
          }} />
        ))}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)',
            borderRadius: '999px', padding: '0.4rem 1rem', fontSize: '0.78rem',
            fontWeight: 800, color: '#a5b4fc', letterSpacing: '0.06em', marginBottom: '1.2rem',
          }}>
            <GitCompare size={14} /> HARDWARE DNA EXPLORER
          </div>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800,
            fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #67e8f9 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Confronta il DNA<br />di ogni Console Storica
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.75rem', maxWidth: '500px' }}>
            Modalità <strong style={{ color: '#a5b4fc' }}>Esplora</strong>: clicca una scheda per espanderla. Modalità <strong style={{ color: '#f9a8d4' }}>Confronta DNA</strong>: seleziona due console per un duello hardware animato con radar chart e statistiche.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => { setMode('explore'); setLeftId(null); setRightId(null); }} style={{
              padding: '0.65rem 1.4rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              background: mode === 'explore' ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'rgba(255,255,255,0.06)',
              border: mode === 'explore' ? 'none' : '1px solid rgba(255,255,255,0.12)', color: '#fff', transition: 'all 0.2s',
            }}>🗺️ Esplora</button>
            <button onClick={() => setMode('compare')} style={{
              padding: '0.65rem 1.4rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              background: mode === 'compare' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'rgba(255,255,255,0.06)',
              border: mode === 'compare' ? 'none' : '1px solid rgba(255,255,255,0.12)', color: '#fff', transition: 'all 0.2s',
            }}>⚔️ Confronta DNA</button>
            <button onClick={shuffleAll} title="Mescola e genera nuovi aneddoti e curiosità storiche per tutte le console" style={{
              padding: '0.65rem 1.25rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: '#f8fafc',
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.2s',
            }}>
              <Shuffle size={15} color="var(--accent-amber)" /> 🎲 Nuove Curiosità Casuali
            </button>
          </div>
        </div>
      </div>

      {/* GENERATIONAL TIMELINE */}
      <div style={{ padding: '1.2rem 1.5rem', borderRadius: '16px', marginBottom: '2rem', background: 'rgba(18,25,39,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
          <Layers size={15} color="var(--accent-violet)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>FILTRA PER GENERAZIONE</span>
          {activeGen !== null && (
            <button onClick={() => setActiveGen(null)} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.07)', border: 'none', color: '#94a3b8', borderRadius: '8px', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem' }}>✕ Reset</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {generations.map((gen) => {
            const count = platforms.filter((p) => p.generation === gen).length;
            const col = GENERATION_COLORS[gen] ?? '#64748b';
            const active = activeGen === gen;
            return (
              <button key={gen} onClick={() => setActiveGen(active ? null : gen)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '0.45rem 0.8rem', borderRadius: '12px', cursor: 'pointer', minWidth: '54px',
                background: active ? col + '22' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${active ? col : 'rgba(255,255,255,0.08)'}`,
                color: active ? col : 'var(--text-muted)', transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{gen}ª</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{count} sist.</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPARE PANEL */}
      {mode === 'compare' && (
        <div style={{ borderRadius: '24px', border: '1px solid rgba(236,72,153,0.25)', overflow: 'hidden', background: 'rgba(18,25,39,0.88)', marginBottom: '2rem' }}>
          {/* header */}
          <div style={{
            padding: '1.1rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(90deg, rgba(139,92,246,0.12), rgba(236,72,153,0.08))',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <GitCompare size={17} color="#ec4899" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc' }}>Confronto Hardware DNA</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {!leftId ? '👇 Seleziona la prima console dalla griglia' : !rightId ? '👇 Seleziona anche la seconda' : '✅ Confronto attivo'}
            </span>
          </div>

          {/* Two columns side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {renderPlatformSlot('left')}
            {renderPlatformSlot('right')}
          </div>

          {/* VS bar in between stats */}
          {leftPlat && rightPlat && leftMeta && rightMeta && (
            <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', fontSize: '0.78rem', fontWeight: 900, color: '#fff',
                  fontFamily: 'var(--font-display)', boxShadow: '0 0 16px rgba(236,72,153,0.4)', flexShrink: 0,
                }}>VS</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>CONFRONTO STATISTICHE</span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    <span style={{ color: leftMeta.color, fontWeight: 700 }}>◀ {leftPlat.name}</span>
                    {' vs '}
                    <span style={{ color: rightMeta.color, fontWeight: 700 }}>{rightPlat.name} ▶</span>
                  </div>
                </div>
              </div>
              <CompareBar label="Collezionabilità (0–100)" leftVal={leftMeta.score} rightVal={rightMeta.score} maxVal={100} lColor={leftMeta.color} rColor={rightMeta.color} />
              <CompareBar label="Unità vendute (M)" leftVal={parseFloat(leftMeta.unitsSold)} rightVal={parseFloat(rightMeta.unitsSold)} maxVal={Math.max(parseFloat(leftMeta.unitsSold), parseFloat(rightMeta.unitsSold)) * 1.1 || 1} lColor={leftMeta.color} rColor={rightMeta.color} />
              <CompareBar label="Generazione hardware" leftVal={leftPlat.generation} rightVal={rightPlat.generation} maxVal={9} lColor={leftMeta.color} rColor={rightMeta.color} />
              <CompareBar label="Anno di lancio" leftVal={leftPlat.releaseYear} rightVal={rightPlat.releaseYear} maxVal={2024} lColor={leftMeta.color} rColor={rightMeta.color} />
            </div>
          )}
        </div>
      )}

      {/* SEARCH */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(18,25,39,0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '0.65rem 1.1rem', marginBottom: '1.75rem', maxWidth: '420px' }}>
        <Search size={16} color="var(--accent-cyan)" />
        <input type="text" placeholder="Cerca per nome, sigla, produttore…" value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '0.9rem', width: '100%' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}><X size={14} /></button>}
      </div>

      {/* GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
        {filtered.map((plat) => {
          const meta = getMeta(plat.code);
          const genColor = GENERATION_COLORS[plat.generation] ?? '#64748b';
          const isLeft  = leftId  === plat.id;
          const isRight = rightId === plat.id;
          const isSelected = isLeft || isRight;
          const isExpanded = activeCard === plat.id;

          return (
            <div key={plat.id} style={{
              borderRadius: '18px', overflow: 'hidden', position: 'relative',
              background: isSelected ? `rgba(${isLeft ? '99,102,241' : '236,72,153'},0.12)` : 'rgba(18,25,39,0.82)',
              border: `1.5px solid ${isSelected ? (isLeft ? '#6366f1' : '#ec4899') : 'rgba(255,255,255,0.07)'}`,
              transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: isSelected ? `0 0 22px ${isLeft ? 'rgba(99,102,241,0.3)' : 'rgba(236,72,153,0.3)'}` : 'none',
              cursor: 'pointer',
            }} onClick={() => {
              if (mode === 'compare') pickForCompare(plat);
              else setActiveCard(isExpanded ? null : plat.id);
            }}>
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${meta.color}, ${meta.accent})` }} />
              <div style={{ padding: '1.25rem 1.35rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{meta.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#fff', lineHeight: 1.2 }}>{plat.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{plat.manufacturer}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '999px', background: meta.color + '22', color: meta.accent, border: `1px solid ${meta.color}44` }}>{plat.code}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.18rem 0.5rem', borderRadius: '7px', background: genColor + '18', color: genColor, border: `1px solid ${genColor}33` }}>Gen {plat.generation}ª</span>
                  </div>
                </div>

                {/* Score bar */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Collezionabilità</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: meta.accent }}>{meta.score}/100</span>
                  </div>
                  <div style={{ height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: `${meta.score}%`, height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${meta.color}, ${meta.accent})` }} />
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {meta.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.18rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.08)' }}>{tag}</span>
                  ))}
                </div>

                {/* Expanded detail (explore mode) */}
                {isExpanded && mode === 'explore' && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeSlideIn 0.22s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                      {[
                        ['CPU', meta.cpu],
                        ['GPU', meta.gpu],
                        ['RAM', meta.ram],
                        ['Supporto', meta.media],
                        ['Top Game', meta.topGame],
                        ['Risoluzione', meta.resolution],
                        ['Vendite', meta.unitsSold + ' M'],
                        ['Anno', String(plat.releaseYear)]
                      ].map(([k, v]) => (
                        <div key={k} style={{ padding: '0.45rem 0.6rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</div>
                          <div style={{ fontSize: '0.75rem', color: k.includes('Vendite') ? meta.color : '#e2e8f0', fontWeight: 700, wordBreak: 'break-word', lineHeight: 1.3 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    {(() => {
                      const off = getCardOffset(plat.id);
                      const currentFact = meta.funFacts[off % meta.funFacts.length];
                      const currentDeep = meta.deepDives[off % meta.deepDives.length];
                      return (
                        <>
                          <div style={{ padding: '0.65rem 0.85rem', borderRadius: '9px', background: meta.color + '15', border: `1px solid ${meta.color}30`, fontSize: '0.75rem', color: meta.accent, lineHeight: 1.5 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                              <strong style={{ fontSize: '0.7rem', color: '#fff', textTransform: 'uppercase' }}>💡 Curiosità Storica</strong>
                              <button
                                onClick={(e) => shuffleFact(plat.id, e)}
                                title="Cambia aneddoto storico"
                                style={{
                                  background: 'rgba(255,255,255,0.08)',
                                  border: '1px solid rgba(255,255,255,0.15)',
                                  borderRadius: '6px',
                                  color: '#fff',
                                  fontSize: '0.64rem',
                                  fontWeight: 700,
                                  padding: '0.12rem 0.45rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                }}
                              >
                                <Shuffle size={10} /> Altro aneddoto
                              </button>
                            </div>
                            {currentFact}
                          </div>
                          <div style={{ padding: '0.65rem 0.85rem', borderRadius: '9px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                            <strong style={{ display: 'block', fontSize: '0.7rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.15rem' }}>📜 Impatto & Architettura</strong>
                            {currentDeep}
                          </div>
                        </>
                      );
                    })()}
                    <button onClick={(e) => { e.stopPropagation(); onSelectPlatform(plat.id); }} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                      padding: '0.55rem', borderRadius: '9px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                      border: 'none', background: `linear-gradient(135deg, ${meta.color}cc, ${meta.accent}66)`, color: '#fff',
                    }}>
                      Vedi annunci in catalogo <ArrowRight size={13} />
                    </button>
                  </div>
                )}

                {/* Footer */}
                {mode === 'compare' && (
                  <div style={{ fontSize: '0.75rem', textAlign: 'center', fontWeight: 700, color: isSelected ? (isLeft ? '#a5b4fc' : '#f9a8d4') : 'var(--text-muted)', paddingTop: '0.25rem' }}>
                    {isLeft ? '◀ Lato Sinistro' : isRight ? 'Lato Destro ▶' : '+ Seleziona per confrontare'}
                  </div>
                )}
                {mode === 'explore' && !isExpanded && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                    <span>📅 {plat.releaseYear}</span>
                    <span style={{ color: meta.accent, fontWeight: 700 }}>Espandi ↓</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Nessuna piattaforma trovata</div>
          <div style={{ fontSize: '0.85rem' }}>Prova con un altro termine o resetta il filtro generazionale.</div>
        </div>
      )}
    </div>
  );
};
