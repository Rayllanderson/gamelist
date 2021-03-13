package com.rayllanderson.api.controllers;

import com.rayllanderson.api.util.UserUtil;
import com.rayllanderson.model.dtos.game.GameDTO;
import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<UserDetailsDTO> register(@RequestBody UserDTO user) {
        UserDetailsDTO dto = userService.register(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/update/password")
    public ResponseEntity<Void> updatePassword(@RequestBody UserDTO user,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        userService.updatePassword(user, UserUtil.getUserId(userDetails, userRepository));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/username")
    public ResponseEntity<Void> updateNameOrUsername(@RequestBody UserDetailsDTO user, @AuthenticationPrincipal UserDetails userDetails) {
        userService.update(user, UserUtil.getUserId(userDetails, userRepository));
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
