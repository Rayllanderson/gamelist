package com.rayllanderson.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rayllanderson.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long>{

    public List<Game> findByNameIgnoreCaseContaining(String name);
}
