package com.rayllanderson.game;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.rayllanderson.model.dtos.game.GameDTO;
import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.services.GameService;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

@SpringBootTest
class ServiceTests {

    @Autowired
    private GameService service;

    @Autowired
    private UserService userService;

    @Test
   void crud (){
        User user = new User(null, "rayllanderson@gmail.com", "whatever123", "Ray");
        user = userService.fromDTO(userService.save(UserDTO.create(user)));
        Game  game = new Game(null, "Nier automata", GameStatus.COMPLETED, user);
        GameDTO gameDTO = service.save(GameDTO.create(game));

        assertNotNull(gameDTO);
        assertTrue(gameDTO.getId() >= 1);

        Long id = gameDTO.getId();
        GameDTO gameFromDatabase = service.findById(id);

        assertNotNull(gameFromDatabase);
        assertEquals(id, gameFromDatabase.getId());

        gameFromDatabase.setName("GTA V");
        gameFromDatabase = service.save(gameFromDatabase);

        assertEquals("GTA V", gameFromDatabase.getName());

        service.deleteById(id, user.getId());

        assertThatThrownBy(() -> {
            service.findById(id);
        }).isInstanceOf(ObjectNotFoundException.class);
   }

}
