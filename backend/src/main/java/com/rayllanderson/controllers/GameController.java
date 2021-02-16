package com.rayllanderson.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rayllanderson.entities.Game;
import com.rayllanderson.repositories.GameRepository;
import com.rayllanderson.services.GameService;

@RestController
@RequestMapping("/games")
public class GameController {
    
    @Autowired
    private GameRepository repository;
   
    @Autowired
    private GameService service;
    
    @GetMapping
    public ResponseEntity<List<Game>> findAll(){
	return ResponseEntity.ok(repository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Game> findById(@PathVariable Long id){
	return ResponseEntity.ok(service.findById(id));
    }
    
    @PostMapping
    public ResponseEntity<Void> save(@RequestBody Game game){
	game = service.save(game);
	URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(game.getId()).toUri();
	return ResponseEntity.created(uri).build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Void> save(@PathVariable Long id, @RequestBody Game game){
	Game gameFromDatabase = service.findById(id);
	service.updateData(game, gameFromDatabase);
	service.save(gameFromDatabase);
	return ResponseEntity.ok().build();
    }


}
