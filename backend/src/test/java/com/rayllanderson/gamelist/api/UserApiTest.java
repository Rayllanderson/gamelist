package com.rayllanderson.gamelist.api;

import com.rayllanderson.gamelist.GameListApplication;
import com.rayllanderson.gamelist.domain.dtos.user.UserDTO;
import com.rayllanderson.gamelist.domain.dtos.user.UserDetailsDTO;
import com.rayllanderson.gamelist.domain.entities.User;
import com.rayllanderson.gamelist.domain.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static junit.framework.TestCase.*;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = GameListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserApiTest extends BaseApiTest {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserService userService;

    private final String API_URL = "/api/v1.0/users";

    private ResponseEntity<UserDetailsDTO> getUser(String url) {
        return get(url, UserDetailsDTO.class);
    }

    private ResponseEntity<List<UserDetailsDTO>> getUsers(String url) {
        HttpHeaders headers = getHeaders();
        return rest.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<List<UserDetailsDTO>>() {
                });
    }

    @Test
    public void testUpdatePassword(){
        Long userId = 1L;

        String newPassword = encoder.encode("ray123");
        String oldPassword = userService.find(userId).getPassword();

        assertThat(newPassword.equals("ray123")).isFalse();
        assertTrue(encoder.matches("ray123", newPassword));
        assertTrue(encoder.matches("123", oldPassword));

        String name = "any name";
        UserDTO user = new UserDTO();
        user.setName(name); //bov se vai mudar o nome ou apenas a senha
        user.setPassword(newPassword);

        assertEquals(HttpStatus.NO_CONTENT, put(API_URL + "/update/password", user, null).getStatusCode());

        String newPasFromDB = userService.find(userId).getPassword();
        assertThat(encoder.matches(oldPassword, newPassword)).isFalse();
        assertTrue(encoder.matches(newPassword, newPasFromDB));
        assertThat(name.equals(getUser(API_URL + "/" + userId).getBody().getName())).isFalse(); //confirmando que não alterou o nome
    }


    @Test
    public void testcrud() {

        String username = "rayllanderson32";
        String password = encoder.encode("123");

        User user = new User(null, "whatever@gmail.com", username, password, "Carlos");


        // Insert
        ResponseEntity response = post(API_URL, UserDTO.create(user), null);
        System.out.println(response);

        // Verifica se criou
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Buscar o objeto
        String location = response.getHeaders().get("location").get(0);
        UserDetailsDTO u = getUser(location).getBody();

        assertNotNull(u);
        assertEquals("Carlos", u.getName());
    }

    @Test
    public void testLista() {
        List<UserDetailsDTO> users = getUsers(API_URL).getBody();
        assertNotNull(users);
        assertEquals(3, users.size());
    }


    @Test
    public void testGetOk() {

        ResponseEntity<UserDetailsDTO> response = getUser(API_URL + "/2");
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        UserDetailsDTO c = response.getBody();
        assertNotNull(c);
        assertEquals("João", c.getName());
    }

    /*
    @Test
    public void testUpdateUsername(){
        Long userId = 1L;
        String name = "Ray67dowmoclwm";

        UserDetailsDTO user = new UserDetailsDTO();
        String username = "rayllanderson"; //mantendo o mesmo username
        String email = "any@email.com";
        user.setUsername(username);
        user.setEmail("José@gmail.com");
        user.setName(name);

        assertEquals(HttpStatus.BAD_REQUEST, put(API_URL + "/update", user, null).getStatusCode()); //email existe teste FAIL

        user.setEmail(email);
        assertEquals(HttpStatus.NO_CONTENT, put(API_URL + "/update", user, null).getStatusCode()); //email nao existe teste OK


        UserDetailsDTO userFromAPI = getUser(API_URL + "/" + userId).getBody();

        assertNotNull(userFromAPI);
        assertEquals(email, userFromAPI.getEmail());
        assertEquals(username, userFromAPI.getUsername());
        assertEquals(name, userFromAPI.getName());

        String existingUsername = "joao";
        userFromAPI.setUsername(existingUsername);
        assertEquals(HttpStatus.BAD_REQUEST, put(API_URL + "/update", userFromAPI, null).getStatusCode());
    }
    */

    @Test
    public void deleteTest(){
        assertEquals(HttpStatus.NO_CONTENT, delete(API_URL, null).getStatusCode());
        //forbidden pq vai deletar o user logado, ou seja, não tem mais user autenticado.
        assertEquals(HttpStatus.FORBIDDEN, delete(API_URL, null).getStatusCode());
    }

}
