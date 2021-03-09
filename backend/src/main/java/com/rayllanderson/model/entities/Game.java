package com.rayllanderson.model.entities;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rayllanderson.model.entities.enums.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "nome não pode ser vazio")
    @NotEmpty(message = "nome não pode ser vazio")
    private String name;

    @NotNull(message = "status deve ser informado")
    @Enumerated(EnumType.STRING)
    private GameStatus status;

    @ManyToOne
    @JsonIgnore
    private User user;

}
