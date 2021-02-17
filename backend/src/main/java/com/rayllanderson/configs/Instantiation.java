package com.rayllanderson.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.GameList;
import com.rayllanderson.entities.enums.GameStatus;
import com.rayllanderson.repositories.GameRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

    @Autowired
    private GameRepository repository;

    @Override
    public void run(String... args) throws Exception {
	repository.deleteAll();

	GameList gameList = new GameList();
	gameList.add(new Game(null, "Death Stranding", GameStatus.WISHED));
	gameList.add(new Game(null, "Little Nightmares", GameStatus.WISHED));
	gameList.add(new Game(null, "GTA V", GameStatus.COMPLETED));
	gameList.add(new Game(null, "Nier Automata", GameStatus.PLAYING));
	
	repository.saveAll(gameList.getGames());
    }

}
