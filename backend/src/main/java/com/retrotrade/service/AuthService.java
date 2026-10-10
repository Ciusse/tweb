package com.retrotrade.service;

import com.retrotrade.dto.AuthResponseDTO;
import com.retrotrade.dto.LoginRequestDTO;
import com.retrotrade.dto.UserDTO;
import com.retrotrade.exception.ResourceNotFoundException;
import com.retrotrade.exception.UnauthorizedException;
import com.retrotrade.model.User;
import com.retrotrade.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Credenziali non valide. Utente non trovato."));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new UnauthorizedException("Credenziali non valide. Password errata.");
        }

        if (!user.isActive()) {
            throw new UnauthorizedException("Questo account è stato disabilitato dall'amministratore.");
        }

        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        String dummyToken = "token_" + user.getRole().name() + "_" + UUID.randomUUID();

        return new AuthResponseDTO(dummyToken, userDTO);
    }

    @Transactional
    public AuthResponseDTO register(com.retrotrade.dto.RegisterRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new com.retrotrade.exception.BadRequestException("Lo username '" + request.getUsername() + "' è già registrato.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new com.retrotrade.exception.BadRequestException("L'indirizzo email '" + request.getEmail() + "' è già in uso.");
        }

        // La registrazione crea SEMPRE un utente base (ROLE_USER).
        // Solo il DataInitializer può creare account ROLE_ADMIN.
        com.retrotrade.model.Role role = com.retrotrade.model.Role.ROLE_USER;
        User user = new User(
                request.getUsername().trim(),
                request.getEmail().trim(),
                request.getPassword().trim(),
                role
        );

        User saved = userRepository.save(user);
        UserDTO userDTO = new UserDTO(saved.getId(), saved.getUsername(), saved.getEmail(), saved.getRole());
        String dummyToken = "token_" + saved.getRole().name() + "_" + UUID.randomUUID();

        return new AuthResponseDTO(dummyToken, userDTO);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utente con ID " + id + " non trovato."));
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> new UserDTO(u.getId(), u.getUsername(), u.getEmail(), u.getRole()))
                .collect(Collectors.toList());
    }
}
