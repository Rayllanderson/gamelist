package com.rayllanderson.game;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.services.GameService;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class ServiceTests {

    @Autowired
    private GameService service;

    private Long id;
    private final Long INEXISTENT_ID = 99899898L;

    @BeforeAll
    void instantiateGames() {
	User user = new User(1L, "rayllanderson@gmail.com", "whatever123");
	id = service.save(new Game(null, "Death Stranding", GameStatus.WISHED, user)).getId();
    }

    @Test
    void findById() {
	assertEquals("Death Stranding", service.findById(id).getName());
    }

    @Test
    void findAnInexistentId() {
	assertThatThrownBy(() -> {
	    service.findById(INEXISTENT_ID);
	}).isInstanceOf(ObjectNotFoundException.class);
    }

    @Test
    void deleteAnInexistentId() {
	assertThatThrownBy(() -> {
	    service.deleteById(INEXISTENT_ID);
	}).isInstanceOf(ObjectNotFoundException.class);
    }

    @Test
    void deleteById() {
	service.deleteById(id);

	assertThatThrownBy(() -> {
	    service.findById(id);
	}).isInstanceOf(ObjectNotFoundException.class);
    }

}
