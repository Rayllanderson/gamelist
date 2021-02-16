package com.rayllanderson.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.GameList;
import com.rayllanderson.entities.enums.Status;
import com.rayllanderson.repositories.GameRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

    @Autowired
    private GameRepository repository;

    @Override
    public void run(String... args) throws Exception {
	GameList gameList = new GameList();
	gameList.add(new Game(null, "Death Stranding", Status.WISHED));
	gameList.add(new Game(null, "Little Nightmares", Status.WISHED));
	gameList.add(new Game(null, "GTA V", Status.COMPLETED));
	gameList.add(new Game(null, "Nier Automata", Status.PLAYING));
	repository.saveAll(gameList.getGames());
    }

}
