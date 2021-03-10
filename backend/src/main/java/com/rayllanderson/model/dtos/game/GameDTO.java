package com.rayllanderson.model.dtos.game;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.GameStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@Data
@NoArgsConstructor
public class GameDTO {

    private Long id;
    private String name;
    private GameStatus status;

    public static GameDTO create(Game game) {
        return new ModelMapper().map(game, GameDTO.class);
    }

}