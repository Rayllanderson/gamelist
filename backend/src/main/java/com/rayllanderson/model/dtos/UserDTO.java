package com.rayllanderson.model.dtos;

import com.rayllanderson.model.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@Data
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String email;
    private String password;
    private String name;

    public static UserDTO create(User user){
        return new ModelMapper().map(user, UserDTO.class);
    }
}
