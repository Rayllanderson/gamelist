package com.rayllanderson.model.services;


import java.util.List;
import java.util.stream.Collectors;

import com.rayllanderson.model.dtos.GameDTO;
import com.rayllanderson.model.dtos.user.SaveUserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
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
    public UserDetailsDTO save(SaveUserDTO user) {
        return UserDetailsDTO.create(repository.save(fromDTO(user)));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public UserDetailsDTO findById(Long id) throws ObjectNotFoundException {
        return UserDetailsDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on database")));
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

    public User fromDTO(SaveUserDTO dto){
        return new ModelMapper().map(dto, User.class);
    }

    public User fromDTO(UserDetailsDTO dto){
        return new ModelMapper().map(dto, User.class);
    }

}
