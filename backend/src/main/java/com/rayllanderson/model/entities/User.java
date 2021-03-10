package com.rayllanderson.model.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long id;

    @Email(message = "Email must be a valid email.")
    @NotBlank(message = "Email must not be empty or null")
    private String email;

    @NotBlank(message = "Password must not be empty or null")
    private String password;

    @NotBlank(message = "Name must not be empty or null")
    private String name;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "user")
    private List<Game> games = new ArrayList<>();

    public User(Long id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public void addGame(Game game) {
        this.games.add(game);
    }

    public void addGames(List<Game> games){
        games.addAll(games);
    }
}
