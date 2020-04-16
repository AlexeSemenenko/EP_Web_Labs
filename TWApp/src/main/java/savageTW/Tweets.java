package savageTW;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

public class Tweets extends HttpServlet {
    private static Posts posts = new Posts();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");

        String[] uris = request.getRequestURI().split("/");

        if (uris.length == 3 && uris[2].equals("search")) {
            Gson gson = new Gson();

            response.getWriter().print(posts.getAll().stream().map(gson::toJson).
                    collect(Collectors.joining("\n")));
        } else {
            response.getWriter().print((new Gson()).toJson(posts.add((new Gson()).fromJson(request.getReader().readLine(), Post.class))));
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(posts.get(request.getParameter("id"))));
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(posts.remove(request.getParameter("id"))));
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(posts.edit(request.getParameter("id"),
                (new Gson()).fromJson(request.getReader().readLine(), Post.class))));
    }
}
