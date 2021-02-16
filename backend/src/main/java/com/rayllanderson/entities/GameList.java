package com.rayllanderson.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.rayllanderson.entities.enums.Status;

public class GameList {

    private List<Game> games = new ArrayList<>();

    public GameList() {
    }

    public List<Game> getGames() {
	return games;
    }

    public List<Game> getCompletedGames() {
	List<Game> completedGames = games;
	completedGames.removeIf(x -> !(x.getStatus().equals(Status.COMPLETED)));
	return completedGames;
    }

    public List<Game> getPlayingGames() {
	List<Game> playingGames = games;
	playingGames.removeIf(x -> !(x.getStatus().equals(Status.PLAYING)));
	return playingGames;
    }

    public List<Game> getWishedGames() {
	List<Game> whisedGames = games;
	whisedGames.removeIf(x -> !(x.getStatus().equals(Status.WISHED)));
	return whisedGames;
    }

    public void addGame(Game game) {
	this.games.add(game);
    }

    public void addAll(Collection<? extends Game> c) {
	this.games.addAll(c);
    }

}
