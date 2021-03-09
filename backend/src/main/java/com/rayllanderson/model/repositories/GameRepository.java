package com.rayllanderson.model.repositories;


import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.enums.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findByNameIgnoreCaseContainingAndUserId(String name, Long userId);

    List<Game> findByStatusAndUserId(GameStatus status, Long userId);

    List<Game> findGamesByUserId(Long userId);
}
