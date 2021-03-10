package com.rayllanderson.model.services;


import com.rayllanderson.model.dtos.GameDTO;
import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.util.Assert;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Transactional(propagation = Propagation.REQUIRED)
    public UserDetailsDTO save(UserDTO user) throws IllegalArgumentException {
        verifyUser(user);
        return UserDetailsDTO.create(repository.save(fromDTO(user)));
    }

    public UserDetailsDTO register(UserDTO user) throws IllegalArgumentException {
        if (user.getId() != null)
            throw new IllegalArgumentException("id must be null");
        return this.save(user);
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public UserDetailsDTO findById(Long id) throws ObjectNotFoundException {
        return UserDetailsDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on " +
                "database")));
    }

    public UserDTO find(Long id) throws ObjectNotFoundException {
        return UserDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on " +
                "database")));
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

    public UserDetailsDTO updateUsernameOrEmail(UserDetailsDTO user, Long userId) {
        UserDTO userFromDataBase = this.find(userId);
        updateUsernameOrEmail(user, userFromDataBase);
        return save(userFromDataBase);
    }

    public UserDetailsDTO updatePassword(UserDTO user, Long userId) {
        UserDTO userFromDataBase = this.find(userId);
        updatePassword(user, userFromDataBase);
        return this.save(userFromDataBase);
    }


    public User fromDTO(UserDTO dto) {
        return new ModelMapper().map(dto, User.class);
    }

    public User fromDTO(UserDetailsDTO dto) {
        return new ModelMapper().map(dto, User.class);
    }

    private void verifyUser(UserDTO user) throws IllegalArgumentException {
        Assert.notNull(user.getEmail(), "email");
        Assert.notNull(user.getName(), "name");
        Assert.notNull(user.getPassword(), "password");
    }

    private void updateUsernameOrEmail(UserDetailsDTO source, UserDTO target) {
        BeanUtils.copyProperties(source, target, "id", "password");
    }

    private void updatePassword(UserDTO source, UserDTO target) {
        BeanUtils.copyProperties(source, target, "id", "name", "email");
    }

}
