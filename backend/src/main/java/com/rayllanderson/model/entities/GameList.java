package com.rayllanderson.model.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.rayllanderson.model.entities.enums.GameStatus;

public class GameList {

    private List<Game> games = new ArrayList<>();

    public GameList() {
    }

    public List<Game> getGames() {
	return games;
    }

    public List<Game> getCompletedGames() {
	List<Game> completedGames = new ArrayList<>(games);
	completedGames.removeIf(x -> !(x.getStatus().equals(GameStatus.COMPLETED)));
	return completedGames;
    }

    public List<Game> getPlayingGames() {
	List<Game> playingGames = new ArrayList<>(games);
	playingGames.removeIf(x -> !(x.getStatus().equals(GameStatus.PLAYING)));
	return playingGames;
    }

    public List<Game> getWishedGames() {
	List<Game> whisedGames = new ArrayList<>(games);
	whisedGames.removeIf(x -> !(x.getStatus().equals(GameStatus.WISHED)));
	return whisedGames;
    }

    public void add(Game game) {
	this.games.add(game);
    }

    public void addAll(Collection<? extends Game> c) {
	this.games.addAll(c);
    }
}
