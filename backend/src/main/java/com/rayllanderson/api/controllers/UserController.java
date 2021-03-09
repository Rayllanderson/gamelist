package com.rayllanderson.api.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;

@RestController
@RequestMapping("/api/v1.0/users")
public class UserController {

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        return null;
    }

    @GetMapping("/{id}/games")
    public ResponseEntity<List<Game>> findGamesByUserId(@PathVariable Long id) {
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<List<Game>> register(@RequestBody User user) {
        return null;
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<List<Game>> edit(@PathVariable Long id) {
        return null;
    }


}
