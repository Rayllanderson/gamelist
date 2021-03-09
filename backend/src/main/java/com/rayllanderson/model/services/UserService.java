package com.rayllanderson.model.services;


import java.util.List;
import java.util.stream.Collectors;

import com.rayllanderson.model.dtos.GameDTO;
import com.rayllanderson.model.dtos.user.UserDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Transactional(propagation = Propagation.REQUIRED)
    public UserDTO save(UserDTO user) {
        return UserDTO.create(repository.save(fromDTO(user)));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public UserDTO findById(Long id) throws ObjectNotFoundException {
        return UserDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on database")));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<GameDTO> findGamesByUserId(Long id) throws ObjectNotFoundException {
        User user = repository.findByIdWithGames(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on database"));
        return user.getGames().stream().map(GameDTO::create).collect(Collectors.toList());
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Long id) throws ObjectNotFoundException {
        findById(id);
        repository.deleteById(id);
    }

    public User fromDTO(UserDTO dto){
        return new ModelMapper().map(dto, User.class);
    }

}
