package com.rayllanderson.model.dtos.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rayllanderson.model.entities.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class UserTokenDTO {

    private String username;
    private String name;
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
