package com.albin.data;

import com.albin.model.Movie;

import java.util.List;

/**
 * Created by albinblent on 2016-02-24.
 */
public interface IStore {
    public Movie findById(Long id);
    public List<Movie> findAllOrderdByName();
    public Movie findByName(String name);
    public void register(Movie movie) throws Exception;
}
