package com.rayllanderson.game;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.GameList;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class GameListDatabaseTests {

    private GameList gameList = new GameList();

    @Autowired
    private GameRepository repository;

    @BeforeAll
    void instantiateGames() {
	User user = new User(1L, "rayllanderson@gmail.com", "rayllanderson", "whatever123", "Ray");
	gameList.add(new Game(null, "Death Stranding", GameStatus.WISH, user));
	gameList.add(new Game(null, "Little Nightmares", GameStatus.WISH, user));
	gameList.add(new Game(null, "GTA V", GameStatus.COMPLETED, user));
	gameList.add(new Game(null, "Nier Automata", GameStatus.PLAYING, user));
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
