package com.rayllanderson.gamelist.domain.services;


import com.rayllanderson.gamelist.domain.dtos.user.UserDTO;
import com.rayllanderson.gamelist.domain.dtos.user.UserDetailsDTO;
import com.rayllanderson.gamelist.domain.entities.Role;
import com.rayllanderson.gamelist.domain.entities.User;
import com.rayllanderson.gamelist.domain.entities.enums.RoleType;
import com.rayllanderson.gamelist.domain.exceptions.UsernameExistsException;
import com.rayllanderson.gamelist.domain.repositories.UserRepository;
import com.rayllanderson.gamelist.domain.services.exceptions.ObjectNotFoundException;
import com.rayllanderson.gamelist.domain.utils.Assert;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private GameService gameService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private EmailService emailService;

    @Transactional(propagation = Propagation.REQUIRED)
    public UserDetailsDTO save(UserDTO userDto) throws IllegalArgumentException {
        Assert.usernameNotExists(userDto.getUsername(), repository);
        Assert.thatEmailNotExists(userDto.getEmail(), repository);
        Assert.validPassword(userDto);
        User user = fromDTO(userDto);
        user.addRole(new Role(RoleType.ROLE_USER));
        user.setPassword(encoder.encode(user.getPassword()));
        return UserDetailsDTO.create(repository.save(user));
    }

    public UserDetailsDTO register(UserDTO user) throws IllegalArgumentException {
        if (user.getId() != null)
            throw new IllegalArgumentException("id precisa ser nulo");
        return this.save(user);
    }

    public UserDetailsDTO registerAnAdmin(UserDTO userDto) throws IllegalArgumentException {
        Assert.usernameNotExists(userDto.getUsername(), repository);
        Assert.thatEmailNotExists(userDto.getEmail(), repository);
        Assert.validPassword(userDto);
        User user = fromDTO(userDto);
        user.addRole(new Role(RoleType.ROLE_USER));
        user.addRole(new Role(RoleType.ROLE_ADMIN));
        user.setPassword(encoder.encode(user.getPassword()));
        return UserDetailsDTO.create(repository.save(user));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public UserDetailsDTO findById(Long id) throws ObjectNotFoundException {
        return UserDetailsDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado.")));
    }

    public UserDTO find(Long id) throws ObjectNotFoundException {
        return UserDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado.")));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Long id) throws ObjectNotFoundException {
        findById(id);
        gameService.findAll(id).forEach(x -> gameService.deleteById(x.getId(), id));
        repository.deleteById(id);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void resetPassword(String email) {
        User user = repository.findByEmail(email).orElseThrow(() ->
                new ObjectNotFoundException("Email não cadastrado na base de dados."));
        String newPassword = generateNewPassword();
        emailService.sendResetPassEmail(user.getEmail(), newPassword);
        user.setPassword(encoder.encode(newPassword));
        repository.save(user);
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
        boolean hasUpdateEmail = !Assert.sameField(user.getEmail(), userFromDataBase.getEmail());
        if (hasUpdateEmail) {
            Assert.thatEmailNotExists(user.getEmail(), repository);
        }
        updateData(user, userFromDataBase);
        return update(userFromDataBase);
    }

    /**
     * Use this method if you want to update ONLY password.
     *
     *
     * @throws IllegalArgumentException if password is empty or null
     */
    public UserDetailsDTO updatePassword(UserDTO user, Long userId) throws IllegalArgumentException {
        UserDTO userFromDataBase = this.find(userId);
        Assert.validPassword(user);
        updatePassword(user, userFromDataBase);
        userFromDataBase.setPassword(encoder.encode(userFromDataBase.getPassword()));
        return this.update(userFromDataBase);
    }

    public User fromDTO(UserDTO dto) {
        return new ModelMapper().map(dto, User.class);
    }

    public User fromDTO(UserDetailsDTO dto) {
        return new ModelMapper().map(dto, User.class);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    private UserDetailsDTO update(UserDTO userDto) throws IllegalArgumentException {
        return UserDetailsDTO.create(repository.save(fromDTO(userDto)));
    }

    private void updateData(UserDetailsDTO source, UserDTO target) {
        BeanUtils.copyProperties(source, target, "id", "password", "username", "roles");
    }

    private void updatePassword(UserDTO source, UserDTO target) {
        BeanUtils.copyProperties(source, target, "id", "name", "email", "username", "roles");
    }

    private String generateNewPassword() {
        return Long.toHexString(Double.doubleToLongBits(Math.random()));
    }
}
