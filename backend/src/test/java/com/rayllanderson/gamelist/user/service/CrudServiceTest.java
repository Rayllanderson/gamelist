package com.rayllanderson.gamelist.user.service;

import com.rayllanderson.gamelist.domain.dtos.user.UserDTO;
import com.rayllanderson.gamelist.domain.dtos.user.UserDetailsDTO;
import com.rayllanderson.gamelist.domain.entities.Role;
import com.rayllanderson.gamelist.domain.entities.User;
import com.rayllanderson.gamelist.domain.entities.enums.RoleType;
import com.rayllanderson.gamelist.domain.exceptions.EmailExistsException;
import com.rayllanderson.gamelist.domain.exceptions.UsernameExistsException;
import com.rayllanderson.gamelist.domain.repositories.GameRepository;
import com.rayllanderson.gamelist.domain.repositories.UserRepository;
import com.rayllanderson.gamelist.domain.services.UserService;
import com.rayllanderson.gamelist.domain.services.exceptions.ObjectNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    private PasswordEncoder encoder;

    @Autowired
    @Qualifier("userDetailsService")
    UserDetailsService userDetailsService;

    @Test
    public void crud() {
        User user = new User(null, "rayllanderson542@gmail.com", "rayllanderson154", "whatever123", "Ray");
        UserDetailsDTO userDTO = service.save(UserDTO.create(user));

        assertNotNull(userDTO);
        assertTrue(userDTO.getId() >= 1);

        Long id = userDTO.getId();
        UserDetailsDTO userFromDatabase = service.findById(id);

        assertNotNull(userFromDatabase);
        assertEquals(id, userFromDatabase.getId());

        userFromDatabase.setName("João");
        userFromDatabase = service.update(userFromDatabase, id);

        assertEquals("João", userFromDatabase.getName());

        service.deleteById(id);

        assertThatThrownBy(() -> {
            service.findById(id);
        }).isInstanceOf(ObjectNotFoundException.class);
    }

    @Test
    public void register() {
        String username = "rayllanderson12";
        User u = new User(null, "rayllanderson@gmail.com", username, "whatever123", "Ray");

        assertThatThrownBy(() -> {
            service.register(UserDTO.create(u));
        }).isInstanceOf(EmailExistsException.class);

        u.setEmail("anotherone@email.com");

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

    @Test
    public void registerAdmin() {
        String username = "rayllanderson1";
        User u = new User(null, "rayllanderson2@gmail.com", username, "whatever123", "Ray");
        UserDetailsDTO userDTO = service.registerAnAdmin(UserDTO.create(u));

        User user = (User) userDetailsService.loadUserByUsername(username);

        assertTrue(user.getRoles().contains(new Role(RoleType.ROLE_USER)));
        assertTrue(user.getRoles().contains(new Role(RoleType.ROLE_ADMIN)));

        assertEquals("Ray", user.getName());
    }

    @Test
    public void update(){
        String username = "joao321";
        User user = new User();
        user.setUsername(username);
        user.setName("whatever");
        user.setEmail("bla@gmail.com");
        user.setPassword("123");

        UserDetailsDTO userDetailsDTO = service.save(UserDTO.create(user));
        Long userId = userDetailsDTO.getId();

        assertNotNull(userId);

        String password = encoder.encode("321");
        UserDTO userDTO = new UserDTO();
        userDTO.setPassword(password);
        service.updatePassword(userDTO, userId);

        UserDTO newUser = service.find(userId);

        assertNotNull(newUser);
        assertEquals(newUser.getUsername(), username);
        assertTrue(encoder.matches(password, newUser.getPassword()));

        String existingUsername = "rayllanderson";

        newUser.setUsername(existingUsername);

       /*
        função de alterar username desativada for while.
        assertThatThrownBy(() ->{
            service.update(UserDetailsDTO.create(newUser), userId);
        }).isInstanceOf(UsernameExistsException.class);

        assertEquals(service.find(userId).getUsername(), username);
*/
//
//        //agora vamos mudar
//        String inexistentUsername = "432424242d";
//        newUser.setUsername(inexistentUsername);

//        assertNotNull(service.update(UserDetailsDTO.create(newUser), userId));
//        assertEquals(service.find(userId).getUsername(), inexistentUsername);
    }

    @Test
    void testeEmail(){
        String username = "rayllanderson1421";
        User u = new User(null, "rayllanderson@gmail.com", username, "whatever123", "Ray");
        assertThatThrownBy(() -> {
            service.save(UserDTO.create(u));
        }).isInstanceOf(EmailExistsException.class);
        u.setEmail("another@email.com");
        UserDetailsDTO dto = service.save(UserDTO.create(u));
        assertNotNull(dto);
    }

}
