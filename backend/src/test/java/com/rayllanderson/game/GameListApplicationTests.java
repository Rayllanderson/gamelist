package com.rayllanderson.game;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.GameList;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;

class GameListApplicationTests {

    private GameList gameList = new GameList();;

    @BeforeEach
    void instantiateGames() {
	User user = new User(2L, "rayllanderson@gmail.com", "rayllanderson", "whatever123", "Ray");
	
	Game g1 = new Game(1L, "Death Stranding", GameStatus.WISH, user);
	Game g2 = new Game(2L, "Little Nightmares", GameStatus.WISH, user);
	Game g3 = new Game(3L, "GTA V", GameStatus.COMPLETED, user);
	Game g4 = new Game(4L, "Nier Automata", GameStatus.PLAYING, user);

	gameList.addAll(Arrays.asList(g1, g2, g3, g4));
    }

    @Test
    void printAllGames() {
	System.out.println("ALL");
	gameList.getGames().forEach(x -> System.out.println(x.getName()));
	printSeparatorLines();
    }

    @Test
    void printPlayingGames() {
	System.out.println("PLAYING");
	gameList.getPlayingGames().forEach(x -> System.out.println(x.getName()));
	printSeparatorLines();
    }
    

    @Test
    void printWishedGames() {
	System.out.println("WHISED");
	gameList.getWishedGames().forEach(x -> System.out.println(x.getName()));
	printSeparatorLines();
    }

    @Test
    void printCompletedGames() {
	System.out.println("COMPLETED");
	gameList.getCompletedGames().forEach(x -> System.out.println(x.getName()));
	printSeparatorLines();
    }

    private void printSeparatorLines() {
	System.out.println("---------------------------------");
    }

}