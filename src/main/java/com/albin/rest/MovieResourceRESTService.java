package com.albin.rest;

import com.albin.data.IStore;
import com.albin.data.qualifiers.Hybernate;
import com.albin.data.qualifiers.Json;
import com.albin.model.Movie;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.ValidationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by albinblent on 2016-02-24.
 */
@Path("/movies")
@RequestScoped
public class MovieResourceRESTService {

    @Inject
    private Logger log;

    @Inject @Hybernate
    private IStore storage;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Movie> listAllMovies(){ return storage.findAllOrderdByName(); }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Movie lookupMovieById(@PathParam("id") long id){
        log.info("Client called GET with id: " + id);
        Movie movie = storage.findById(id);
        if (movie == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return movie;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createMovie(Movie movie){
        Response.ResponseBuilder responseBuilder = null;
        log.info("Client posted movie: " + movie.getName());

        try {
            validateMovie(movie);
            storage.register(movie);
            responseBuilder = Response.ok();
        } catch (ValidationException e) {
            Map<String, String> responseObject = new HashMap<String, String>();
            responseObject.put("name", "Name taken");
            responseBuilder = Response.status(Response.Status.CONFLICT).entity(responseObject);
        } catch (Exception e) {
            Map<String, String> responseObject = new HashMap<String, String>();
            responseObject.put("error", e.getMessage());
            responseBuilder = Response.status(Response.Status.BAD_REQUEST).entity(responseObject);
        }

        return responseBuilder.build();
    }

    public boolean nameAlreadyExists(String name){
        Movie movie = null;
        try {
            movie = storage.findByName(name);
        } catch (NoResultException e) {
            // ignore
        }
        return movie != null;
    }

    private void validateMovie(Movie movie) throws ValidationException {



        if (nameAlreadyExists(movie.getName())){
            throw new ValidationException("Unique Name Violation");
        }
    }
}
