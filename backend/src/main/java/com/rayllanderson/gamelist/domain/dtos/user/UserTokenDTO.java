package com.rayllanderson.gamelist.domain.dtos.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rayllanderson.gamelist.domain.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@Data
@NoArgsConstructor
public class UserTokenDTO {

    private String username;
    private String name;
    private String email;
    private String token;

    public static UserTokenDTO create(User user, String token){
        UserTokenDTO userDetails = create(user);
        userDetails.setToken(token);
        return userDetails;
    }

    public static UserTokenDTO create(User user){
        return new ModelMapper().map(user, UserTokenDTO.class);
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper m = new ObjectMapper();
        return m.writeValueAsString(this);
    }
}
