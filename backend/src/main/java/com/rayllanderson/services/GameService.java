package com.rayllanderson.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rayllanderson.entities.Game;
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

    public Game findById(Long id) throws ObjectNotFoundException {
	return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
    }

    public void deleteById(Long id) throws ObjectNotFoundException {
	repository.delete(this.findById(id));
    }
}
