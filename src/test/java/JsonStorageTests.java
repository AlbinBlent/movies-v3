import com.albin.data.JsonStorage;
import com.albin.model.Movie;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by albinblent on 2016-02-25.
 */
public class JsonStorageTests {

    @Test
    public void test_reading_and_writing_content_to_json_file(){
        JsonStorage storage = new JsonStorage();

        Map<Long, Movie> movieModelMap = new HashMap<Long, Movie>();

        Movie movie = new Movie();
        movie.setId((long) 3);
        movie.setName("Test movie name");

        movieModelMap.put(movie.getId(), movie);
        storage.writeContentToJsonFile(movieModelMap);

        System.out.printf("Content of json file" + storage.getContentOfJsonFile().get((long) 3).getName());
    }

    @Test
    public void test_reading_from_json_file(){
        JsonStorage storage = new JsonStorage();
        long id = new Long(3);
        System.out.printf(String.valueOf(storage.findById(id)));
    }
}
