package com.rayllanderson.gamelist.domain.dtos.game;

import com.rayllanderson.gamelist.domain.entities.Game;
import com.rayllanderson.gamelist.domain.entities.enums.GameStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import java.util.Date;

@Data
@NoArgsConstructor
@ToString
public class GameDTO {

    private Long id;
    private String name;
    private GameStatus status;
    private Date startDate;
    private Date endDate;

    public static GameDTO create(Game game) {
        return new ModelMapper().map(game, GameDTO.class);
    }
}