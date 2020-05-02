package savageTW;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class GetNameServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter pw = response.getWriter();

        String name = request.getParameter("name");

        if(name.length() < 100) {
            pw.println("<big>The name is " + name + "</big>");
        }
        else {
            pw.println("<big>The name is too long</big>");
        }
    }
}
