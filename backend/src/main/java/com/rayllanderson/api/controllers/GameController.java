package com.rayllanderson.api.controllers;

import java.net.URI;
import java.util.List;

import com.rayllanderson.model.dtos.game.GameDTO;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rayllanderson.model.repositories.GameRepository;

@RestController
@RequestMapping("/api/v1.0/games")
public class GameController {

    @Autowired
    private GameRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameService service;

   private Long authUserId = 1L;

    @GetMapping
    public ResponseEntity<List<GameDTO>> findAll() {
        //get user autenticado aqui
        return ResponseEntity.ok(service.findAll(authUserId));
    }


    @GetMapping("/{id}")
    public ResponseEntity<GameDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id, authUserId));
    }


    @PostMapping
    public ResponseEntity<Void> save(@RequestBody GameDTO game) {
        game = service.save(game, authUserId);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(game.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody GameDTO game) {
        service.update(game, id, authUserId);
        return ResponseEntity.noContent().build();
    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
//        service.deleteById(id);
//        return ResponseEntity.noContent().build();
//    }
//
    @PutMapping("/{id}/{status}")
    public ResponseEntity<Void> setWished(@PathVariable Long id, @PathVariable GameStatus status) {
        service.updateStatus(id, status, authUserId);
        return ResponseEntity.noContent().build();
    }
//
//    @PutMapping("/{id}/playing")
//    public ResponseEntity<Void> setPlaying(@PathVariable Long id) {
//        service.setStatus(id, GameStatus.PLAYING, null);
//        return ResponseEntity.ok().build();
//    }
//
//    @PutMapping("/{id}/completed")
//    public ResponseEntity<Void> setCompleted(@PathVariable Long id) {
//        service.setStatus(id, GameStatus.COMPLETED, null);
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/search")
//    public ResponseEntity<List<Game>> searchByName(@RequestParam String q) {
//        Long userId = 1L;
//        return ResponseEntity.ok(service.searchByName(q, userId));
//    }

}
