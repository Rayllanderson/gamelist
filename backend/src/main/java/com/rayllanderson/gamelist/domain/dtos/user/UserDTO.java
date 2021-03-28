package com.rayllanderson.gamelist.domain.dtos.user;

import com.rayllanderson.gamelist.domain.entities.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@NoArgsConstructor
/**
 * Used to register an user
 */
public class UserDTO {

    private Long id;
    private String email;
    private String username;
    private String password;
    private String name;

    public static UserDTO create(User user){
        return new ModelMapper().map(user, UserDTO.class);
    }

    public static UserDTO create(UserDetailsDTO user){
        return new ModelMapper().map(user, UserDTO.class);
    }
}
