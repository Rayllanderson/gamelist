package com.rayllanderson.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rayllanderson.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
