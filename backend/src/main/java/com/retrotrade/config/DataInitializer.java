package com.retrotrade.config;

import com.retrotrade.model.*;
import com.retrotrade.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PlatformRepository platformRepository;
    private final CategoryRepository categoryRepository;
    private final ListingRepository listingRepository;
    private final OrderRepository orderRepository;
    private final ReviewRepository reviewRepository;

    public DataInitializer(UserRepository userRepository,
                           PlatformRepository platformRepository,
                           CategoryRepository categoryRepository,
                           ListingRepository listingRepository,
                           OrderRepository orderRepository,
                           ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.platformRepository = platformRepository;
        this.categoryRepository = categoryRepository;
        this.listingRepository = listingRepository;
        this.orderRepository = orderRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        // =====================================================================
        // 1. ACCOUNT ADMIN (fisso, non registrabile dall'utente)
        // =====================================================================
        User admin = userRepository.save(new User("admin", "admin@gmail.com", "admin123", Role.ROLE_ADMIN));

        // =====================================================================
        // 2. CINQUE ACCOUNT UTENTE
        // =====================================================================
        User luca    = userRepository.save(new User("luca_retro",     "luca@retrotrade.it",    "password123", Role.ROLE_USER));
        User sara    = userRepository.save(new User("sara_collector",  "sara@retrotrade.it",    "password123", Role.ROLE_USER));
        User marco   = userRepository.save(new User("marco_gamer",    "marco@retrotrade.it",   "password123", Role.ROLE_USER));
        User giulia  = userRepository.save(new User("giulia_vintage", "giulia@retrotrade.it",  "password123", Role.ROLE_USER));
        User andrea  = userRepository.save(new User("andrea_bits",    "andrea@retrotrade.it",  "password123", Role.ROLE_USER));

        // =====================================================================
        // 3. PIATTAFORME (27 console iconiche)
        // =====================================================================
        Platform nes      = platformRepository.save(new Platform("Nintendo Entertainment System", "NES",   "Nintendo",  1983, 3));
        Platform snes     = platformRepository.save(new Platform("Super Nintendo (SNES)",         "SNES",  "Nintendo",  1990, 4));
        Platform n64      = platformRepository.save(new Platform("Nintendo 64",                   "N64",   "Nintendo",  1996, 5));
        Platform gamecube = platformRepository.save(new Platform("Nintendo GameCube",             "NGC",   "Nintendo",  2001, 6));
        Platform gbc      = platformRepository.save(new Platform("Game Boy Color",               "GBC",   "Nintendo",  1998, 5));
        Platform gba      = platformRepository.save(new Platform("Game Boy Advance",             "GBA",   "Nintendo",  2001, 6));
        Platform gbasp    = platformRepository.save(new Platform("Game Boy Advance SP",          "GBASP", "Nintendo",  2003, 6));
        Platform nds      = platformRepository.save(new Platform("Nintendo DS",                  "NDS",   "Nintendo",  2004, 7));
        Platform wii      = platformRepository.save(new Platform("Nintendo Wii",                 "WII",   "Nintendo",  2006, 7));
        Platform wiiu     = platformRepository.save(new Platform("Nintendo Wii U",               "WIIU",  "Nintendo",  2012, 8));
        Platform n3ds     = platformRepository.save(new Platform("Nintendo 3DS",                 "3DS",   "Nintendo",  2011, 8));
        Platform nswitch  = platformRepository.save(new Platform("Nintendo Switch",              "NSW",   "Nintendo",  2017, 9));
        Platform ps1      = platformRepository.save(new Platform("Sony PlayStation 1",           "PS1",   "Sony",      1994, 5));
        Platform ps2      = platformRepository.save(new Platform("Sony PlayStation 2",           "PS2",   "Sony",      2000, 6));
        Platform ps3      = platformRepository.save(new Platform("Sony PlayStation 3",           "PS3",   "Sony",      2006, 7));
        Platform ps4      = platformRepository.save(new Platform("Sony PlayStation 4",           "PS4",   "Sony",      2013, 8));
        Platform psp      = platformRepository.save(new Platform("PlayStation Portable (PSP)",   "PSP",   "Sony",      2004, 7));
        Platform psvita   = platformRepository.save(new Platform("PlayStation Vita",             "VITA",  "Sony",      2011, 8));
        Platform megaDrive = platformRepository.save(new Platform("Sega Mega Drive",            "SMD",   "Sega",      1988, 4));
        Platform saturn   = platformRepository.save(new Platform("Sega Saturn",                  "SAT",   "Sega",      1994, 5));
        Platform dreamcast = platformRepository.save(new Platform("Sega Dreamcast",             "DC",    "Sega",      1998, 6));
        Platform xbox     = platformRepository.save(new Platform("Microsoft Xbox",               "XBOX",  "Microsoft", 2001, 6));
        Platform xbox360  = platformRepository.save(new Platform("Microsoft Xbox 360",           "X360",  "Microsoft", 2005, 7));
        Platform xboxone  = platformRepository.save(new Platform("Microsoft Xbox One",           "XONE",  "Microsoft", 2013, 8));
        Platform neogeo   = platformRepository.save(new Platform("SNK Neo Geo AES",             "NEO",   "SNK",       1990, 4));
        Platform atari    = platformRepository.save(new Platform("Atari 2600",                   "A2600", "Atari",     1977, 2));
        Platform masterSystem = platformRepository.save(new Platform("Sega Master System",      "SMS",   "Sega",      1985, 3));

        // =====================================================================
        // 4. CATEGORIE
        // =====================================================================
        Category catGames       = categoryRepository.save(new Category("Videogiochi (Cartucce/Dischi)", "Software videoludico originale in formato cartuccia o supporto ottico"));
        Category catConsoles    = categoryRepository.save(new Category("Console & Sistemi Hardware", "Console da tavolo e portatili originali revisionate o da collezione"));
        Category catAccessories = categoryRepository.save(new Category("Accessori & Controller", "Gamepad originali, cavi RGB, memory card e alimentatori ufficiali"));
        Category catBoxes       = categoryRepository.save(new Category("Scatole & Manuali", "Packaging esterno d'epoca, libretti d'istruzione e inserti cartacei originali"));

        // =====================================================================
        // 5. ANNUNCI — LUCA (5 oggetti)
        // =====================================================================
        listingRepository.save(new Listing(
            "The Legend of Zelda: A Link to the Past",
            "Versione PAL Italiana originale per SNES. Cartuccia, scatola e manuale in condizioni superbe. Salva-batteria testata e perfettamente funzionante.",
            new BigDecimal("149.99"), ItemCondition.MINT, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80",
            luca, snes, catGames
        ));
        listingRepository.save(new Listing(
            "Super Mario World - CIB Completo",
            "Copia PAL completa di scatola, manuale e cartuccia. Contatti puliti, etichetta intatta. Bundle SNES originale.",
            new BigDecimal("95.00"), ItemCondition.GOOD, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=700&q=80",
            luca, snes, catGames
        ));
        listingRepository.save(new Listing(
            "Console Nintendo 64 Charcoal Grey",
            "Console N64 funzionante con 2 controller originali e cavi AV. Testata con Super Mario 64. Alimentatore europeo.",
            new BigDecimal("110.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=700&q=80",
            luca, n64, catConsoles
        ));
        listingRepository.save(new Listing(
            "Controller Nintendo 64 Grigio",
            "Controller originale N64 PAL. Joystick sostituito con ricambio OEM a bassa usura. Tutti i tasti perfettamente reattivi.",
            new BigDecimal("28.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=80",
            luca, n64, catAccessories
        ));
        listingRepository.save(new Listing(
            "Chrono Trigger SNES - Solo Cartuccia",
            "Rara cartuccia SNES PAL di Chrono Trigger. Etichetta integra al 95%, salva-batteria nuova. Collezionabile imperdibile.",
            new BigDecimal("210.00"), ItemCondition.MINT, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
            luca, snes, catGames
        ));

        // =====================================================================
        // 6. ANNUNCI — SARA (5 oggetti)
        // =====================================================================
        listingRepository.save(new Listing(
            "Metal Gear Solid - Edizione 2 CD Black Label",
            "Capolavoro Kojima per PS1. Custodia intatta senza crepe, libretto a colori perfetto, dischi senza graffi. Pezzo da museo.",
            new BigDecimal("85.00"), ItemCondition.GOOD, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80",
            sara, ps1, catGames
        ));
        listingRepository.save(new Listing(
            "Castlevania: Symphony of the Night PS1",
            "Copia collezionistica PlayStation 1. Manuale a colori integro, disco senza graffi. Uno dei giochi più quotati del retro-gaming.",
            new BigDecimal("180.00"), ItemCondition.MINT, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=700&q=80",
            sara, ps1, catGames
        ));
        listingRepository.save(new Listing(
            "PlayStation 1 Gray - Modello SCPH-5502",
            "PS1 PAL funzionante con memoria card originale, 2 controller DualShock, cavi AV e alimentatore. Laser testato con 10 titoli diversi.",
            new BigDecimal("75.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=700&q=80",
            sara, ps1, catConsoles
        ));
        listingRepository.save(new Listing(
            "Memory Card PlayStation 1 Originale",
            "Memory card originale Sony per PS1. Capacità 15 blocchi, testata e funzionante. Nessun dado corrotto.",
            new BigDecimal("12.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80",
            sara, ps1, catAccessories
        ));
        listingRepository.save(new Listing(
            "Final Fantasy VII - 3 CD PAL ITA",
            "Versione italiana completa con 3 dischi, manuale e scatola in ottime condizioni. Dischi specchiati senza graffi profondi.",
            new BigDecimal("120.00"), ItemCondition.GOOD, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80",
            sara, ps1, catGames
        ));

        // =====================================================================
        // 7. ANNUNCI — MARCO (5 oggetti)
        // =====================================================================
        listingRepository.save(new Listing(
            "Sega Mega Drive Modello 1 HD Graphics",
            "Console funzionante con switch stereo, completa di cavo SCART schermato e controller 3 tasti originale Sega. Nessun difetto.",
            new BigDecimal("99.50"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=700&q=80",
            marco, megaDrive, catConsoles
        ));
        listingRepository.save(new Listing(
            "Sonic the Hedgehog 2 - Mega Drive",
            "Cartuccia originale Sega Mega Drive. Etichetta perfetta, PCB pulita senza ossidazioni. Uno dei platform più iconici della storia.",
            new BigDecimal("32.00"), ItemCondition.MINT, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80",
            marco, megaDrive, catGames
        ));
        listingRepository.save(new Listing(
            "Streets of Rage 2 - Mega Drive CIB",
            "Copia completa con scatola e manuale originale. Considerato uno dei migliori beat'em up di sempre. Condizioni eccellenti.",
            new BigDecimal("78.00"), ItemCondition.GOOD, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
            marco, megaDrive, catGames
        ));
        listingRepository.save(new Listing(
            "Controller Sega 6 Tasti (Arcade Pad)",
            "Gamepad originale Sega a 6 tasti per Mega Drive. Perfetto per picchiaduro come Street Fighter II. Cavo integro.",
            new BigDecimal("35.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=80",
            marco, megaDrive, catAccessories
        ));
        listingRepository.save(new Listing(
            "Sega Saturn Bianco - PAL",
            "Console Saturn PAL funzionante. Include controller originale, cavi AV e alimentatore. Lettore CD testato su 8 titoli.",
            new BigDecimal("145.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=700&q=80",
            marco, saturn, catConsoles
        ));

        // =====================================================================
        // 8. ANNUNCI — GIULIA (5 oggetti)
        // =====================================================================
        listingRepository.save(new Listing(
            "Game Boy Color Atomic Purple Trasparente",
            "Schermo polarizzatore originale senza linee, vano batterie pulito senza ossidazione. Tasti reattivi al tocco. Icona del gaming portatile.",
            new BigDecimal("110.00"), ItemCondition.MINT, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=700&q=80",
            giulia, gbc, catConsoles
        ));
        listingRepository.save(new Listing(
            "Pokémon Oro - Game Boy Color",
            "Cartuccia originale GBC Pokémon Oro con batteria nuova installata. Salvataggi funzionanti. Etichetta integra al 90%.",
            new BigDecimal("55.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=700&q=80",
            giulia, gbc, catGames
        ));
        listingRepository.save(new Listing(
            "Game Boy Advance SP - Flame Red",
            "GBA SP modello AGS-001 colore rosso. Schermo perfetto senza pixel morti. Cerniera integra. Caricatore originale Nintendo incluso.",
            new BigDecimal("88.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80",
            giulia, gbasp, catConsoles
        ));
        listingRepository.save(new Listing(
            "Tetris - Game Boy Originale (CIB)",
            "Il gioco che ha reso celebre il Game Boy. Scatola originale con manuale giapponese e cartuccia. Raro trovarlo completo.",
            new BigDecimal("42.00"), ItemCondition.GOOD, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
            giulia, gbc, catGames
        ));
        listingRepository.save(new Listing(
            "Manuale Originale Pokémon Rosso - Game Boy",
            "Solo manuale italiano originale di Pokémon Rosso per Game Boy. Condizioni ottime, nessuna pagina strappata o scritta.",
            new BigDecimal("18.00"), ItemCondition.GOOD, PackagingStatus.MANUAL_ONLY,
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80",
            giulia, gbc, catBoxes
        ));

        // =====================================================================
        // 9. ANNUNCI — ANDREA (5 oggetti)
        // =====================================================================
        listingRepository.save(new Listing(
            "PlayStation 2 Slim Silver - Mod Chip",
            "PS2 Slim modello SCPH-77004 colore silver. Mod chip pre-installato, lettore DVD perfetto. Include 2 controller DualShock 2 e memory card 8MB.",
            new BigDecimal("95.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=700&q=80",
            andrea, ps2, catConsoles
        ));
        listingRepository.save(new Listing(
            "God of War II - PlayStation 2",
            "Capolavoro Sony Santa Monica per PS2. Versione PAL italiana, 2 dischi, manuale e scatola perfetti. Uno dei migliori action di sempre.",
            new BigDecimal("38.00"), ItemCondition.MINT, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80",
            andrea, ps2, catGames
        ));
        listingRepository.save(new Listing(
            "Shadow of the Colossus PS2 - ITA",
            "Edizione italiana completa. Uno dei videogiochi più artistici mai prodotti. Disco senza graffi, manuale integro.",
            new BigDecimal("65.00"), ItemCondition.GOOD, PackagingStatus.CIB,
            "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=700&q=80",
            andrea, ps2, catGames
        ));
        listingRepository.save(new Listing(
            "DualShock 2 Originale Sony - Nero",
            "Controller originale Sony DualShock 2 per PS2. Testato su 5 titoli, tutte le levette e i tasti perfettamente funzionanti. Cavo integro.",
            new BigDecimal("22.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=80",
            andrea, ps2, catAccessories
        ));
        listingRepository.save(new Listing(
            "PSP 3004 Piano Black - 32GB",
            "PSP 3004 nera con schermo IPS senza dead pixel. MicroSD da 32GB con adattatore. Batteria aftermarket nuova con autonomia aumentata.",
            new BigDecimal("85.00"), ItemCondition.GOOD, PackagingStatus.LOOSE,
            "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=700&q=80",
            andrea, psp, catConsoles
        ));

        // =====================================================================
        // 10. ORDINE DI ESEMPIO CON RECENSIONE (per mostrare lo storico)
        //     Giulia compra da Luca, poi lascia una recensione
        // =====================================================================
        // Prendiamo il primo annuncio di Luca e lo marchiamo come venduto
        listingRepository.findAll().stream()
            .filter(l -> l.getSeller().getUsername().equals("luca_retro") && l.getStatus() == ListingStatus.AVAILABLE)
            .findFirst()
            .ifPresent(listing -> {
                listing.setStatus(ListingStatus.SOLD);
                Listing savedListing = listingRepository.save(listing);

                Order order = orderRepository.save(new Order(
                    savedListing.getPrice(),
                    "Via Roma 42, 20121 Milano (MI)",
                    giulia,
                    savedListing
                ));
                order.setStatus(OrderStatus.COMPLETED);
                orderRepository.save(order);

                Review review = reviewRepository.save(new Review(
                    5,
                    "Venditore fantastico! Articolo imballato con pluriball a triplo strato. Stato perfettamente corrispondente alla descrizione.",
                    giulia,
                    luca,
                    order
                ));
                order.setReview(review);
                orderRepository.save(order);
            });
    }
}
