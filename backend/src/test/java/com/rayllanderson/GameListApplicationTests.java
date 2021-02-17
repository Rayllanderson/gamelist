package com.rayllanderson;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.GameList;
import com.rayllanderson.entities.enums.GameStatus;

class GameListApplicationTests {

    private GameList gameList = new GameList();;

    @BeforeEach
    void instantiateGames() {
	Game g1 = new Game(1L, "Death Stranding", GameStatus.WISHED);
	Game g2 = new Game(2L, "Little Nightmares", GameStatus.WISHED);
	Game g3 = new Game(3L, "GTA V", GameStatus.COMPLETED);
	Game g4 = new Game(4L, "Nier Automata", GameStatus.PLAYING);

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
