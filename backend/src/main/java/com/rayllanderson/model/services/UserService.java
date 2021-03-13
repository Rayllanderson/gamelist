package com.rayllanderson.model.services;


import com.rayllanderson.model.dtos.game.GameDTO;
import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.entities.Role;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.entities.enums.RoleType;
import com.rayllanderson.model.exceptions.UsernameExistsException;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import com.rayllanderson.model.util.Assert;
import org.modelmapper.ModelMapper;
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
    public UserDetailsDTO save(UserDTO userDto) throws IllegalArgumentException {
        validateUser(userDto);
        User user = fromDTO(userDto);
        user.addRole(new Role(RoleType.ROLE_USER));
        return UserDetailsDTO.create(repository.save(user));
    }

    public UserDetailsDTO register(UserDTO user) throws IllegalArgumentException {
        if (user.getId() != null)
            throw new IllegalArgumentException("id must be null");
        return this.save(user);
    }

    public UserDetailsDTO registerAnAdmin(UserDTO userDTO) throws IllegalArgumentException {
        validateUser(userDTO);
        User user = fromDTO(userDTO);
        user.addRole(new Role(RoleType.ROLE_USER));
        user.addRole(new Role(RoleType.ROLE_ADMIN));
        return UserDetailsDTO.create(repository.save(user));
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

    /**
     * Use this method if you want to update username, email or name
     *
     * @param user user from the body;
     * @param userId recovery data from old data
     *
     * @return user updated
     *
     * @throws UsernameExistsException - if user update username and username has already taken.
     */
    public UserDetailsDTO update(UserDetailsDTO user, Long userId) throws UsernameExistsException {
        UserDTO userFromDataBase = this.find(userId);
        boolean hasUpdateUsername = !Assert.sameUsername(user.getUsername(), userFromDataBase.getUsername());
        if (hasUpdateUsername) {
            com.rayllanderson.model.util.Assert.usernameNotExists(user.getUsername(), repository);
        }
        updateData(user, userFromDataBase);
        return update(userFromDataBase);
    }

    /**
     * Use this method if you want to update ONLY password.
     *
     * @param user
     * @param userId
     *
     * @return
     *
     * @throws IllegalArgumentException if password is empty or null
     */
    public UserDetailsDTO updatePassword(UserDTO user, Long userId) throws IllegalArgumentException {
        UserDTO userFromDataBase = this.find(userId);
        Assert.notBlank(user.getPassword(), "password");
        updatePassword(user, userFromDataBase);
        return this.update(userFromDataBase);
    }

    public User fromDTO(UserDTO dto) {
        return new ModelMapper().map(dto, User.class);
    }

    public User fromDTO(UserDetailsDTO dto) {
        return new ModelMapper().map(dto, User.class);
    }

    private void validateUser(UserDTO user) throws IllegalArgumentException, UsernameExistsException {
        Assert.notBlank(user.getEmail(), "email");
        Assert.notBlank(user.getName(), "name");
        Assert.notBlank(user.getPassword(), "password");
        Assert.usernameNotExists(user.getUsername(), repository);
    }

    private void updateData(UserDetailsDTO source, UserDTO target) {
        BeanUtils.copyProperties(source, target, "id", "password");
    }

    private void updatePassword(UserDTO source, UserDTO target) {
        BeanUtils.copyProperties(source, target, "id", "name", "email", "username");
    }

    @Transactional(propagation = Propagation.REQUIRED)
    private UserDetailsDTO update(UserDTO userDto) throws IllegalArgumentException {
        return UserDetailsDTO.create(repository.save(fromDTO(userDto)));
    }

}
