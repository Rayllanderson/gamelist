package com.rayllanderson.model.services;

import java.util.List;


import com.rayllanderson.model.dtos.GameDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.repositories.GameRepository;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    @Transactional(propagation = Propagation.REQUIRED)
    public GameDTO save(GameDTO game) {
        return GameDTO.create(repository.save(fromDTO(game)));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public GameDTO findById(Long id) throws ObjectNotFoundException {
        return GameDTO.create(repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado")));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Long id) throws ObjectNotFoundException {
        findById(id);
        repository.deleteById(id);
    }

    /**
     * Seta os dados do objeto @source no objeto @target
     *
     * @param source - objeto que contém os novos dados
     * @param target - objeto que receberá os novos dados
     */
    public void updateData(GameDTO source, Game target) {
        BeanUtils.copyProperties(source, target, "id");
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Game> searchByName(String name, Long userId) {
        return repository.findByNameIgnoreCaseContainingAndUserId(name, userId);
    }

    public Game fromDTO(GameDTO dto){
        return new ModelMapper().map(dto, Game.class);
    }

}
