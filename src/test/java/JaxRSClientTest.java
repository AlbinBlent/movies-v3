/**
 * Created by albinblent on 2016-03-17.
 */
import com.albin.apiClient.JaxRSClient;
import com.albin.model.Movie;
import org.json.simple.JSONObject;
import org.junit.Test;

import java.util.Map;

public class JaxRSClientTest {

    @Test
    public void test_api_client_can_fetch_movies_from_rest_api(){
        JaxRSClient client = new JaxRSClient();

        String result = client.getRequest();

        Map<Long, Movie> movieMap = client.parseJson(result);

        for (Map.Entry<Long, Movie>  movie : movieMap.entrySet()) {
            System.out.println(movie.getValue().getName());
            System.out.println(movie.getValue().getId());
            System.out.println(movie.getValue().getOverview());
            System.out.println(movie.getValue().getPopularity());
            System.out.println(movie.getValue().getPoster_path());
            System.out.println("---");
        }
    }
}
