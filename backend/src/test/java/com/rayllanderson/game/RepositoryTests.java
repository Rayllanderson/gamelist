package com.rayllanderson.game;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class RepositoryTests {

    @Autowired
    private GameRepository repository;
    
    @Autowired
    private UserRepository userRepository;

    private Long userId;
    
    @BeforeAll
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void instantiateEntities() {
	User user = new User(null, "rayllanderson@gmail.com", "rayllanderson", "whatever123", "Ray");
	userId  = userRepository.save(user).getId();
	Date date = new Date();
	Game g1 = new Game(1L, "Death Stranding",  date, date, GameStatus.WISH, user);
	Game g2 = new Game(2L, "Little Nightmares",  date, date,GameStatus.WISH, user);
	Game g3 = new Game(3L, "GTA V",  date, date,GameStatus.COMPLETED, user);
	Game g4 = new Game(4L, "Nier Automata", date, date, GameStatus.PLAYING, user);
	repository.saveAll(Arrays.asList(g1, g2, g3, g4));
    }
    
    @Test
    void search() {
	List<Game> games = repository.findByNameIgnoreCaseContainingAndUserId("a", userId);
	assertEquals(4, games.size());
    }

    @Test
    void search2() {
	List<Game> games = repository.findByNameIgnoreCaseContainingAndUserId("G", userId);
	assertEquals(3, games.size());
    }

    @Test
    void search3() {
	List<Game> games = repository.findByNameIgnoreCaseContainingAndUserId("nier", userId);
	assertEquals(1, games.size());
    }
    
    @Test
    void searchByStatus() {
	List<Game> games = repository.findByStatusAndUserId(GameStatus.PLAYING, userId);
	assertEquals(1, games.size());
    }
    
    @Test
    void searchByStatus2() {
	List<Game> games = repository.findByStatusAndUserId(GameStatus.WISH, userId);
	assertEquals(2, games.size());
    }
    
    
    @Test
    void searchByStatus3() {
	List<Game> games = repository.findByStatusAndUserId(GameStatus.COMPLETED, userId);
	assertEquals(1, games.size());
    }

}
