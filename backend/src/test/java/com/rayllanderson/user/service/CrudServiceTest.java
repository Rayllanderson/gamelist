package com.rayllanderson.user.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.UserService;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CrudServiceTest {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserService service;

    @Autowired
    private GameRepository gameRepository;

    @Test
    public void crud() {
        User user = new User(null, "rayllanderson@gmail.com", "whatever123", "Ray");
        UserDetailsDTO userDTO = service.save(UserDTO.create(user));

        assertNotNull(userDTO);
        assertTrue(userDTO.getId() >= 1);

        Long id = userDTO.getId();
        UserDetailsDTO userFromDatabase = service.findById(id);

        assertNotNull(userFromDatabase);
        assertEquals(id, userFromDatabase.getId());

        userFromDatabase.setName("João");
        userFromDatabase = service.save(UserDTO.create(userFromDatabase));

        assertEquals("João", userFromDatabase.getName());

        service.deleteById(id);

        assertThatThrownBy(() -> {
            service.findById(id);
        }).isInstanceOf(ObjectNotFoundException.class);

    }


}
