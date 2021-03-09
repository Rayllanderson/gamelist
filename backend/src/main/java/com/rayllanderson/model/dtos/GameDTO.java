package com.rayllanderson.model.dtos;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.enums.GameStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class GameDTO {

    private Long id;
    private String name;
    private GameStatus status;

    public static GameDTO create (Game game){
        return new ModelMapper().map(game, GameDTO.class);
    }
}
