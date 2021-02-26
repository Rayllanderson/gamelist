package com.rayllanderson.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rayllanderson.entities.Game;
import com.rayllanderson.entities.enums.GameStatus;

public interface GameRepository extends JpaRepository<Game, Long>{

    public List<Game> findByNameIgnoreCaseContaining(String name);
    
    public List<Game> findByStatus(GameStatus status);
    
    public List<Game> findGamesByUserId(Long userId);
}
