package com.rayllanderson.model.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Transactional(propagation = Propagation.REQUIRED)
    public User save(User User) {
        return repository.save(User);
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public User findById(Long id) throws ObjectNotFoundException {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on database"));
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Game> findGames(Long id) throws ObjectNotFoundException {
        User user = repository.findByIdWithGames(id).orElseThrow(() -> new ObjectNotFoundException("Object not found on database"));
        return user.getGames();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Long id) throws ObjectNotFoundException {
        repository.delete(this.findById(id));
    }

}
