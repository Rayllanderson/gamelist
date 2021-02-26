package com.rayllanderson.services;

import java.util.List;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.enums.GameStatus;
import com.rayllanderson.repositories.GameRepository;
import com.rayllanderson.services.exceptions.ObjectNotFoundException;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    @Transactional
    public Game save(Game game) {
	return repository.save(game);
    }

    @Transactional(readOnly = true)
    public Game findById(Long id) throws ObjectNotFoundException {
	return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
    }

    public void deleteById(Long id) throws ObjectNotFoundException {
	repository.delete(this.findById(id));
    }
    
    /**
     * Seta os dados do objeto @source no objeto @target
     * @param source - objeto que contém os novos dados
     * @param target - objeto que receberá os novos dados
     */
    public void updateData(Game source, Game target) {
    	BeanUtils.copyProperties(source, target, "id"); 
    }

    public void setStatus(Long id, GameStatus status) {
	Game game = this.findById(id);
	game.setStatus(status);
	repository.save(game);
    }
    
    public List<Game> searchByName(String name){
	return repository.findByNameIgnoreCaseContaining(name);
    }

}
