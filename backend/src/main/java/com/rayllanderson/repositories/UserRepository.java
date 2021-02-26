package com.rayllanderson.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.entities.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("from User as u LEFT JOIN FETCH u.games where u.id = ?1")
    Optional<User> findByIdWithGames(Long id);
}
