package com.rayllanderson.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        gameRepository.deleteAll();

        User user = new User(1L, "rayllanderson@gmail.com", "whatever123");
        userRepository.save(user);

        user.addGame(new Game(null, "Death Stranding", GameStatus.WISHED, user));
        user.addGame(new Game(null, "Little Nightmares", GameStatus.WISHED, user));
        user.addGame(new Game(null, "GTA V", GameStatus.COMPLETED, user));
        user.addGame(new Game(null, "Nier Automata", GameStatus.PLAYING, user));

        gameRepository.saveAll(user.getGames());
    }

}
