package com.rayllanderson.game;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.GameList;
import com.rayllanderson.entities.User;
import com.rayllanderson.entities.enums.GameStatus;

class GameListApplicationTests {

    private GameList gameList = new GameList();;

    @BeforeEach
    void instantiateGames() {
	User user = new User(2L, "rayllanderson@gmail.com", "whatever123");
	
	Game g1 = new Game(1L, "Death Stranding", GameStatus.WISHED, user);
	Game g2 = new Game(2L, "Little Nightmares", GameStatus.WISHED, user);
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
