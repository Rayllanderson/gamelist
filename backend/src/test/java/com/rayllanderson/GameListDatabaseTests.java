package com.rayllanderson;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.GameList;
import com.rayllanderson.entities.enums.GameStatus;
import com.rayllanderson.repositories.GameRepository;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class GameListDatabaseTests {

    private GameList gameList = new GameList();

    @Autowired
    private GameRepository repository;

    @BeforeAll
    void instantiateGames() {
	gameList.add(new Game(null, "Death Stranding", GameStatus.WISHED));
	gameList.add(new Game(null, "Little Nightmares", GameStatus.WISHED));
	gameList.add(new Game(null, "GTA V", GameStatus.COMPLETED));
	gameList.add(new Game(null, "Nier Automata", GameStatus.PLAYING));
	repository.saveAll(gameList.getGames());
    }

    @Test
    void printAllGames() {
	assertEquals(4, gameList.getGames().size());
    }

    @Test
    void printPlayingGames() {
	assertEquals(1, gameList.getPlayingGames().size());
    }

    @Test
    void printWishedGames() {
	assertEquals(2, gameList.getWishedGames().size());
    }

    @Test
    void printCompletedGames() {
	assertEquals(1, gameList.getCompletedGames().size());
    }

    @AfterAll
    void deleteData() {
	repository.deleteAll(gameList.getGames());
    }

}
