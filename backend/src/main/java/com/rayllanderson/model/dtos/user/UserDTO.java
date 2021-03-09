package com.rayllanderson.model.dtos.user;

import com.rayllanderson.model.entities.User;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
public class UserDTO {

    private Long id;
    private String email;
    private String password;
    private String name;

    public static UserDTO create(User user){
        return new ModelMapper().map(user, UserDTO.class);
    }
}
