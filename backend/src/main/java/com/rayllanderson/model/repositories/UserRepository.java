package com.rayllanderson.model.repositories;

import com.rayllanderson.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("select u.id from User as u where u.username = ?1")
    Optional<Long> getIdByUsername(String username);

    @Query("select count(u)>0 from User u where u.username = :username")
    boolean existsByUsername(@Param("username") String username);

    @Query("select count(u)>0 from User u where u.email = :email")
    boolean existsByEmail(@Param("email") String email);

}
