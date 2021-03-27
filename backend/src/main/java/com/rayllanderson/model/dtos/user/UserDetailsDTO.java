package com.rayllanderson.model.dtos.user;

import com.rayllanderson.model.entities.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDetailsDTO {

    private Long id;
    private String email;
    private String username;
    private String name;

    public static UserDetailsDTO create(User user){
        return new ModelMapper().map(user, UserDetailsDTO.class);
    }

    public static UserDetailsDTO create(UserDTO user){
        return new ModelMapper().map(user, UserDetailsDTO.class);
    }
}
