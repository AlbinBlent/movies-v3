package com.albin.data;

import com.albin.data.qualifiers.Json;
import com.albin.model.Movie;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by albinblent on 2016-02-25.
 */
@Json
@ApplicationScoped
public class JsonStorage implements IStore{

    @Inject
    private Logger log;

    @Override
    public Movie findById(Long id) {
        return getContentOfJsonFile().get(id);
    }

    @Override
    public List<Movie> findAllOrderdByName() {
        return null;
    }

    @Override
    public Movie findByName(String name) {
        return null;
    }

    @Override
    public void register(Movie movie) throws Exception {
        Map<Long, Movie> movieMap = getContentOfJsonFile();
        movieMap.put(movie.getId(), movie);
        writeContentToJsonFile(movieMap);
    }

    public void writeContentToJsonFile(Map<Long, Movie> movieMap){
        JSONArray list = new JSONArray();

        for (Map.Entry<Long, Movie>  movie : movieMap.entrySet()) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", new Long(movie.getValue().getId()));
            jsonObject.put("name", movie.getValue().getName());
            list.add(jsonObject);
        }

        try {

            FileWriter file = new FileWriter("data.json");
            file.write(list.toJSONString());
            file.flush();
            file.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Map<Long, Movie> getContentOfJsonFile(){
        JSONParser parser = new JSONParser();

        Map<Long, Movie> movieModelMap = new HashMap<Long, Movie>();

        try {
            Object obj = parser.parse(new FileReader("data.json"));

            JSONArray jsonArray = (JSONArray) obj;

            Iterator<JSONObject> iterator = jsonArray.iterator();
            while (iterator.hasNext()) {
                JSONObject movie = iterator.next();
                long id = (Long) movie.get("id");
                String name = (String) movie.get("name");
                Movie movieModel = new Movie();
                movieModel.setId(id);
                movieModel.setName(name);
                movieModelMap.put(movieModel.getId(), movieModel);
                System.out.println(movieModel.getId());
                System.out.println(movieModel.getName());
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return movieModelMap;
    }
}
