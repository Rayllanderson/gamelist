package com.rayllanderson.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rayllanderson.entities.enums.GameStatus;

@Entity
public class Game implements Serializable{

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
  
    @NotBlank(message = "nome não pode ser vazio")
    @NotEmpty(message = "nome não pode ser vazio")
    private String name;
    
    @NotNull(message = "status deve ser informado")
    private GameStatus status;

    public Game() {
    }

    public Game(Long id, String name, GameStatus status) {
	this.id = id;
	this.name = name;
	this.status = status;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public GameStatus getStatus() {
	return status;
    }

    public void setStatus(GameStatus status) {
	this.status = status;
    }

    @Override
    public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((id == null) ? 0 : id.hashCode());
	return result;
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (obj == null)
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	Game other = (Game) obj;
	if (id == null) {
	    if (other.id != null)
		return false;
	} else if (!id.equals(other.id))
	    return false;
	return true;
    }
}
