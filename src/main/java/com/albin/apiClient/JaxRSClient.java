package com.albin.apiClient;

/**
 * Created by albinblent on 2016-03-17.
 */

import com.albin.model.Movie;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class JaxRSClient {

    Client client = Client.create();

    //String url = "http://localhost:8080/movies-v3/rest/movies/";
    String url = "https://api.themoviedb.org/3/movie/popular/?api_key=faaa6c3ebaa452fd1ec718993594dd22&page=1";

    public String getRequest() {
        client.setFollowRedirects(true);

        WebResource webResource = client.resource(url);
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);

        if (response.getStatus() == 301 || response.getStatus() == 302) {

            webResource = client.resource(response.getLocation());
            response = webResource.accept("application/json").get(ClientResponse.class);
        }

        if (response.getStatus() != 200) {
            System.out.printf(response.toString());
            throw new RuntimeException("HTTP Error: " + response.getStatus());
        }

        String result = response.getEntity(String.class);
        return result;
    }

    public Map<Long, Movie> parseJson(String json) {

        JSONParser parser = new JSONParser();

        Map<Long, Movie> movieModelMap = new HashMap<Long, Movie>();
        try {
            Object obj = parser.parse(json);

            JSONObject jsonObject = (JSONObject) obj;
            JSONArray jsonArray = (JSONArray) jsonObject.get("results");

            Iterator<JSONObject> iterator = jsonArray.iterator();
            while (iterator.hasNext()) {
                JSONObject movie = iterator.next();
                long id = (Long) movie.get("id");
                String name = (String) movie.get("title");
                String overview = (String) movie.get("overview");
                String poster_path = (String) movie.get("poster_path");
                double popularity = (Double) movie.get("popularity");
                Movie movieModel = new Movie();
                movieModel.setId(id);
                movieModel.setName(name);
                //movieModel.setOverview(overview);
                movieModel.setPopularity(popularity);
                movieModel.setPoster_path(poster_path);
                movieModelMap.put(movieModel.getId(), movieModel);
            }
        } catch (Exception e) {

        }
        return movieModelMap;
    }
}
