package com.rayllanderson.gamelist.api.util;

import com.rayllanderson.gamelist.domain.entities.enums.GameStatus;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, GameStatus> {

    @Override
    public GameStatus convert(String source) {
        return GameStatus.valueOf(source.toUpperCase());
    }
}
