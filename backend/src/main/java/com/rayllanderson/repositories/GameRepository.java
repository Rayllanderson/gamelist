package com.rayllanderson.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rayllanderson.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long>{

}
