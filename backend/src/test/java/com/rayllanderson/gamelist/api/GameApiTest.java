package com.rayllanderson.gamelist.api;


import com.rayllanderson.gamelist.GameListApplication;
import com.rayllanderson.gamelist.domain.dtos.game.GameDTO;
import com.rayllanderson.gamelist.domain.entities.Game;
import com.rayllanderson.gamelist.domain.entities.User;
import com.rayllanderson.gamelist.domain.entities.enums.GameStatus;
import junit.framework.TestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = GameListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GameApiTest extends BaseApiTest {

    private final String API_URL = "/api/v1.0/games";

    private ResponseEntity<GameDTO> getGame(String url) {
        return get(url, GameDTO.class);
    }

    private ResponseEntity<List<GameDTO>> getGames(String url) {
        HttpHeaders headers = getHeaders();
        return rest.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<List<GameDTO>>() {
                });
    }

    @Test
    public void testcrud() {

        Date date = new Date();
        Game game = new Game(null, "GTA V",  date, date, GameStatus.WISH, new User(1L, null, null, null, null));

        // Insert
        ResponseEntity response = post(API_URL, game, null);
        System.out.println(response);

        // Verifica se criou
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Buscar o objeto
        String location = response.getHeaders().get("location").get(0);
        GameDTO g = getGame(location).getBody();

        assertNotNull(g);
        assertEquals("GTA V", g.getName());
        TestCase.assertEquals(GameStatus.WISH ,g.getStatus());

        // Deletar o objeto
        delete(location, null);

        // Verificar se deletou
//        assertEquals(HttpStatus.NOT_FOUND, getGame(location).getStatusCode());
    }

        @Test
        public void testLista() {
            List<GameDTO> games = getGames(API_URL).getBody();
            assertNotNull(games);
            assertEquals(2, games.size());
        }


    @Test
    public void testGetOk() {

        ResponseEntity<GameDTO> response = getGame(API_URL + "/4");
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        GameDTO c = response.getBody();
        assertNotNull(c);
        assertEquals("Death Stranding", c.getName());
    }

}
