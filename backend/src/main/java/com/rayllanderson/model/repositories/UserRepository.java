package com.rayllanderson.model.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.rayllanderson.model.entities.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("from User as u LEFT JOIN FETCH u.games where u.id = ?1")
    Optional<User> findByIdWithGames(Long id);

    Optional<User> findByUsername(String username);

    @Query("select u.id from User as u where u.username = ?1")
    Optional<Long> getIdByUsername(String username);

}
