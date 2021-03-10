package com.rayllanderson.api.controllers;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import com.rayllanderson.model.dtos.GameDTO;
import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1.0/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDetailsDTO>> findAll() {
        List<UserDetailsDTO> users = userRepository.findAll().stream().map(UserDetailsDTO::create).collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/{id}/games")
    public ResponseEntity<List<GameDTO>> findGamesByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findGamesByUserId(id));
    }

    @PostMapping
    public ResponseEntity<UserDetailsDTO> register(@Valid @RequestBody UserDTO user) {
        UserDetailsDTO dto = userService.register(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}/update/password")
    public ResponseEntity<Void> updatePassword(@PathVariable Long id, @RequestBody UserDTO user) {
        userService.updatePassword(user, id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/update/data")
    public ResponseEntity<Void> updateNameOrUsername(@PathVariable Long id, @RequestBody UserDetailsDTO user) {
        userService.updateUsernameOrEmail(user, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
