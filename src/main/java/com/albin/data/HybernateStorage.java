package com.albin.data;

import com.albin.data.qualifiers.Hybernate;
import com.albin.model.Movie;
import com.albin.service.HibernateRegistrationService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by albinblent on 2016-02-24.
 */
@Hybernate
@ApplicationScoped
public class HybernateStorage implements IStore {

    @Inject
    private EntityManager entityManager;

    @Inject
    private Logger log;

    @Inject
    private HibernateRegistrationService registrationService;

    @Override
    public Movie findById(Long id) {
        return entityManager.find(Movie.class, id);
    }

    @Override
    public List<Movie> findAllOrderdByName() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Movie> criteria = cb.createQuery(Movie.class);
        Root<Movie> movie = criteria.from(Movie.class);

        criteria.select(movie).orderBy(cb.asc(movie.get("name")));
        return entityManager.createQuery(criteria).getResultList();
    }

    @Override
    public Movie findByName(String name) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Movie> criteria = cb.createQuery(Movie.class);
        Root<Movie> movie = criteria.from(Movie.class);

        criteria.select(movie).where(cb.equal(movie.get("name"), name));
        return entityManager.createQuery(criteria).getSingleResult();
    }

    @Override
    public void register(Movie movie) throws Exception {
        log.info("MovieRegistration: Regestering " + movie.getName());
        registrationService.register(movie);
    }
}
