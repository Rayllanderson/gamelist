package com.rayllanderson.api.controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.rayllanderson.model.dtos.GameDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rayllanderson.model.entities.User;

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
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user) {
        return null;
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id) {
        return null;
    }


}
