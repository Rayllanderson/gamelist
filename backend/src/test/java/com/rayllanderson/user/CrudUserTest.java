package com.rayllanderson.user;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.UserService;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

@SpringBootTest
public class CrudUserTest {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserService service;

    @Autowired
    private GameRepository gameRepository;

    private User user;

    @BeforeEach
    @Transactional
    public void instantiateEntities() {
	User user = new User(null, "rayllanderson@gmail.com", "whatever123");
	user = service.save(user);
	Game g1 = new Game(1L, "Death Stranding", GameStatus.WISHED, user);
	Game g2 = new Game(2L, "Little Nightmares", GameStatus.WISHED, user);
	Game g3 = new Game(3L, "GTA V", GameStatus.COMPLETED, user);
	Game g4 = new Game(4L, "Nier Automata", GameStatus.PLAYING, user);
	gameRepository.saveAll(Arrays.asList(g1, g2, g3, g4));
	this.user = user;
    }

    @Test
    public void save() {
	User user = new User(null, "rayllanderson@gmail.com", "whatever123");
	service.save(user);
    }

    @Test
    public void editUser() {
	User user = repository.findById(this.user.getId()).get();
	user.setEmail("aa@gmail.com");
	service.save(user);

	assertEquals("aa@gmail.com", user.getEmail());
	assertEquals(4, gameRepository.findGamesByUserId(user.getId()).size());

    }

    @Test
    public void deleteUser() {
	Long id = user.getId();
	service.deleteById(id);

	assertThatThrownBy(() -> {
	    service.findById(id);
	}).isInstanceOf(ObjectNotFoundException.class);

	//assertEquals(0, gameRepository.findGamesByUserId(id).size());
    }
}
