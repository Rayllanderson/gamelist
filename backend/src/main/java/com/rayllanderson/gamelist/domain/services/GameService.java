package com.rayllanderson.gamelist.domain.services;

import com.rayllanderson.gamelist.domain.dtos.game.GameDTO;
import com.rayllanderson.gamelist.domain.entities.Game;
import com.rayllanderson.gamelist.domain.entities.User;
import com.rayllanderson.gamelist.domain.entities.enums.GameStatus;
import com.rayllanderson.gamelist.domain.repositories.GameRepository;
import com.rayllanderson.gamelist.domain.repositories.UserRepository;
import com.rayllanderson.gamelist.domain.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public GameDTO save(GameDTO game) {
        return GameDTO.create(repository.save(fromDTO(game)));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public GameDTO save(GameDTO dto, Long userId) {
        Game game = fromDTO(dto);
        User user = new User();
        user.setId(userId);
        game.setUser(user);
        return GameDTO.create(repository.save(game));
    }

    public GameDTO update(GameDTO game, Long id, Long userId) {
        GameDTO gameFromDatabase = findById(id);
        updateData(game, gameFromDatabase);
        return this.save(gameFromDatabase, userId);
    }

    public void updateStatus(Long id, GameStatus status, Long userId) {
        GameDTO game = findById(id);
        game.setStatus(status);
        this.save(game, userId);
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<GameDTO> findAll(Long userId) {
        return repository.findGamesByUserId(userId).stream().map(GameDTO::create).collect(Collectors.toList());
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<GameDTO> findByStatus(GameStatus status, Long userId) {
        return repository.findByStatusAndUserId(status, userId).stream().map(GameDTO::create).collect(Collectors.toList());
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public GameDTO findById(Long id) throws ObjectNotFoundException {
        return GameDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Jogo não encontrado.")));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public GameDTO findById(Long id, Long userId) throws ObjectNotFoundException {
        return GameDTO.create(repository.findGameByIdAndUserId(id, userId).orElseThrow(() -> new ObjectNotFoundException("Jogo não encontrado.")));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<GameDTO> searchByName(String name, Long userId) {
        return repository.findByNameIgnoreCaseContainingAndUserId(name, userId).stream().map(GameDTO::create).collect(Collectors.toList());
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Long id, Long userId) throws ObjectNotFoundException {
        findById(id, userId);
        repository.deleteByIdAndUserId(id, userId);
    }

    public Game fromDTO(GameDTO dto) {
        return new ModelMapper().map(dto, Game.class);
    }

    /**
     * Seta os dados do objeto @source no objeto @target
     *
     * @param source - objeto que contém os novos dados
     * @param target - objeto que receberá os novos dados
     */
    private void updateData(GameDTO source, GameDTO target) {
        BeanUtils.copyProperties(source, target, "id");
    }
}
