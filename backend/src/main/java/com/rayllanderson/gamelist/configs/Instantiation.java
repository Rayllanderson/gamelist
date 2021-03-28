package com.rayllanderson.gamelist.configs;

import com.rayllanderson.gamelist.domain.entities.Game;
import com.rayllanderson.gamelist.domain.entities.Role;
import com.rayllanderson.gamelist.domain.entities.User;
import com.rayllanderson.gamelist.domain.entities.enums.GameStatus;
import com.rayllanderson.gamelist.domain.entities.enums.RoleType;
import com.rayllanderson.gamelist.domain.repositories.GameRepository;
import com.rayllanderson.gamelist.domain.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.Date;

@Configuration
public class Instantiation implements CommandLineRunner{

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        userRepository.deleteAll();
        gameRepository.deleteAll();

        String password = encoder.encode("123");

        Role admin = new Role(RoleType.ROLE_ADMIN);
        Role padrao = new Role(RoleType.ROLE_USER);

        User user = new User(null, "rayllanderson@gmail.com", "rayllanderson", password, "Ray");
        user.getRoles().add(admin);
        user.getRoles().add(padrao);

        User user2 = new User(null, "João@gmail.com", "joao", password, "João");
        user2.getRoles().add(padrao);

        User user3 = new User(null, "José@gmail.com", "jose", password, "José");
        user3.getRoles().add(padrao);

        userRepository.save(user);
        userRepository.save(user2);
        userRepository.save(user3);

        Date date = new Date();
        Game g1 = new Game(null, "Death Stranding", date, date, GameStatus.WISH, user);
        Game g2 = new Game(null, "Little Nightmares",  date, date,GameStatus.WISH, user2);
        Game g3 = new Game(null, "GTA V",  date, date,GameStatus.COMPLETED, user3);
        Game g4 = new Game(null, "Nier Automata", date, date, GameStatus.PLAYING, user);

        gameRepository.saveAll(Arrays.asList(g1, g2, g3, g4));
    }
}