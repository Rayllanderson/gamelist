package com.rayllanderson;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.enums.GameStatus;
import com.rayllanderson.services.GameService;
import com.rayllanderson.services.exceptions.ObjectNotFoundException;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class ServiceTests {

    @Autowired
    private GameService service;

    private Long id;
    private final Long INEXISTENT_ID = 99899898L;

    @BeforeAll
    void instantiateGames() {
	id = service.save(new Game(null, "Death Stranding", GameStatus.WISHED)).getId();
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
