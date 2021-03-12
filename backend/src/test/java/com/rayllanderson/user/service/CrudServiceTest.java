package com.rayllanderson.user.service;

import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.entities.Role;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.RoleType;
import com.rayllanderson.model.exceptions.UsernameExistsException;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.UserService;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CrudServiceTest {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserService service;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    @Qualifier("userDetailsService")
    UserDetailsService userDetailsService;

    @Test
    public void crud() {
        User user = new User(null, "rayllanderson@gmail.com", "rayllanderson1", "whatever123", "Ray");
        UserDetailsDTO userDTO = service.save(UserDTO.create(user));

        assertNotNull(userDTO);
        assertTrue(userDTO.getId() >= 1);

        Long id = userDTO.getId();
        UserDTO userFromDatabase = service.find(id);

        assertNotNull(userFromDatabase);
        assertEquals(id, userFromDatabase.getId());

        userFromDatabase.setName("João");
        userFromDatabase = UserDTO.create(service.save(userFromDatabase));

        assertEquals("João", userFromDatabase.getName());

        service.deleteById(id);

        assertThatThrownBy(() -> {
            service.findById(id);
        }).isInstanceOf(ObjectNotFoundException.class);
    }

    @Test
    public void register() {
        String username = "rayllanderson1";
        User u = new User(null, "rayllanderson@gmail.com", username, "whatever123", "Ray");
        UserDetailsDTO userDTO = service.register(UserDTO.create(u));

        User user = (User) userDetailsService.loadUserByUsername(username);

        assertTrue(user.getRoles().contains(new Role(RoleType.ROLE_USER)));
        assertFalse(user.getRoles().contains(new Role(RoleType.ROLE_ADMIN)));
        assertEquals("Ray", user.getName());

        //username exists ->
        User u2 = new User(null, "fernando@gmail.com", username, "354", "Ray");
        assertThatThrownBy(() ->{
            UserDetailsDTO userDTO2 = service.register(UserDTO.create(u));
        }).isInstanceOf(UsernameExistsException.class);
    }


}
