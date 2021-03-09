package com.rayllanderson.model.dtos;

import com.rayllanderson.model.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String email;
    private String password;
    private String name;
    private List<GameDTO> games = new ArrayList<>();

    public static UserDTO create(User user){
        return new ModelMapper().map(user, UserDTO.class);
    }

    public void addGame(GameDTO game){
        games.add(game);
    }

    public void addGames(List<GameDTO> games){
        games.addAll(games);
    }
}
