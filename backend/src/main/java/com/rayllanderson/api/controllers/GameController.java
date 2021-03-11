package com.rayllanderson.api.controllers;

import com.rayllanderson.model.dtos.game.GameDTO;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.GameService;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1.0/games")
public class GameController {

    @Autowired
    private GameRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameService service;

    @GetMapping
    public ResponseEntity<List<GameDTO>> findAll(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(service.findAll(getUserId(user)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDTO> findById(@PathVariable Long id, @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(service.findById(id, getUserId(user)));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<GameDTO>> findByStatus(@PathVariable GameStatus status, @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(service.findByStatus(status, getUserId(user)));
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody GameDTO game, @AuthenticationPrincipal UserDetails user) {
        game = service.save(game, getUserId(user));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(game.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody GameDTO game, @AuthenticationPrincipal UserDetails user) {
        service.update(game, id, getUserId(user));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/{status}")
    public ResponseEntity<Void> setWished(@PathVariable Long id, @PathVariable GameStatus status, @AuthenticationPrincipal UserDetails user) {
        service.updateStatus(id, status, getUserId(user));
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id, @AuthenticationPrincipal UserDetails user) {
        service.deleteById(id, getUserId(user));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<GameDTO>> searchByName(@RequestParam String q, @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(service.searchByName(q, getUserId(user)));
    }

    private Long getUserId(UserDetails user) {
        return userRepository.getIdByUsername(user.getUsername()).orElseThrow(() -> new ObjectNotFoundException("user " +
                "not found"));
    }

}
