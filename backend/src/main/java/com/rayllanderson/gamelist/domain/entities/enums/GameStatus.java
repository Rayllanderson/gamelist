package com.rayllanderson.gamelist.domain.entities.enums;


import com.fasterxml.jackson.annotation.JsonProperty;

public enum GameStatus {
    @JsonProperty("Em espera") WISH,
    @JsonProperty("Jogando") PLAYING,
    @JsonProperty("Completo") COMPLETED;
}



