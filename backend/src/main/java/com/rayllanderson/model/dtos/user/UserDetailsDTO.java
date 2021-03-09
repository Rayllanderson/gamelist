package com.rayllanderson.model.dtos.user;

import com.rayllanderson.model.entities.User;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
public class UserDetailsDTO {

    private Long id;
    private String email;
    private String name;

    public static UserDetailsDTO create(User user){
        return new ModelMapper().map(user, UserDetailsDTO.class);
    }
}
