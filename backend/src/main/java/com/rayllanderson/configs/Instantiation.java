package com.rayllanderson.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;

import java.util.Arrays;

@Configuration
public class Instantiation implements CommandLineRunner {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        gameRepository.deleteAll();

        User user = new User(1L, "rayllanderson@gmail.com", "whatever123", "Ray");
        User user2 = new User(null, "João@gmail.com", "whatever123", "João");
        User user3 = new User(null, "José@gmail.com", "123", "José");

        userRepository.save(user);
        userRepository.save(user2);
        userRepository.save(user3);

        Game g1 = new Game(null, "Death Stranding", GameStatus.WISH, user);
        Game g2 = new Game(null, "Little Nightmares", GameStatus.WISH, user2);
        Game g3 = new Game(null, "GTA V", GameStatus.COMPLETED, user3);
        Game g4 = new Game(null, "Nier Automata", GameStatus.PLAYING, user);

        gameRepository.saveAll(Arrays.asList(g1, g2, g3, g4));
    }

}
