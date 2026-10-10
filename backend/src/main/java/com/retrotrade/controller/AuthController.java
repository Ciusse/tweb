package com.retrotrade.controller;

import com.retrotrade.dto.AuthResponseDTO;
import com.retrotrade.dto.LoginRequestDTO;
import com.retrotrade.dto.UserDTO;
import com.retrotrade.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Login autenticazione: verifica credenziali e restituisce token e dettagli utente/ruolo.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Registrazione nuovo account con ruolo (ROLE_USER o ROLE_ADMIN).
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody com.retrotrade.dto.RegisterRequestDTO request) {
        AuthResponseDTO response = authService.register(request);
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(response);
    }

    /**
     * Recupera il profilo dell'utente correntemente loggato dall'ID nell'header.
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long currentUserId
    ) {
        UserDTO user = authService.getUserById(currentUserId);
        return ResponseEntity.ok(user);
    }

    /**
     * Elenco di tutti gli utenti di sistema (permette switch rapido per demo di test tra USER e ADMIN).
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
