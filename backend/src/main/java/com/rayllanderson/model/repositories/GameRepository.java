package com.rayllanderson.model.repositories;


import com.rayllanderson.model.entities.Game;
import com.rayllanderson.model.entities.enums.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findByNameIgnoreCaseContainingAndUserId(String name, Long userId);

    List<Game> findByStatusAndUserId(GameStatus status, Long userId);

    List<Game> findGamesByUserId(Long userId);

    Optional<Game> findGameByIdAndUserId(Long gameId, Long userId);

    void deleteByIdAndUserId(Long id, Long userId);
}
