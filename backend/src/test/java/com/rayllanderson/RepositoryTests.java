package com.rayllanderson;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.enums.GameStatus;
import com.rayllanderson.repositories.GameRepository;

@SpringBootTest
class RepositoryTests {

    @Autowired
    private GameRepository repository;

    @Test
    void search() {
	List<Game> games = repository.findByNameIgnoreCaseContaining("a");
	assertEquals(4, games.size());
    }

    @Test
    void search2() {
	List<Game> games = repository.findByNameIgnoreCaseContaining("G");
	assertEquals(3, games.size());
    }

    @Test
    void search3() {
	List<Game> games = repository.findByNameIgnoreCaseContaining("nier");
	assertEquals(1, games.size());
    }
    
    @Test
    void searchByStatus() {
	List<Game> games = repository.findByStatus(GameStatus.PLAYING);
	assertEquals(1, games.size());
    }
    
    @Test
    void searchByStatus2() {
	List<Game> games = repository.findByStatus(GameStatus.WISHED);
	assertEquals(2, games.size());
    }
    
    
    @Test
    void searchByStatus3() {
	List<Game> games = repository.findByStatus(GameStatus.COMPLETED);
	assertEquals(1, games.size());
    }

}
