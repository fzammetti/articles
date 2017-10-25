package dvwebapp;

import java.io.InputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import jimm.datavision.layout.HTMLLE;
import jimm.datavision.Parameter;
import jimm.datavision.Report;

public class DVWebappServlet extends HttpServlet {

  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

    // Simple exception handling, which is to say virtually none!  We'll just
    // display the exception and be done with it.
    try {

      // First thing we'll do is read in the report XML.  We'll do this by
      // getting a reference to it through the servlet.  Just read it in to a
      // StringBuffer for later.
      ServletContext sc = getServletContext();
      InputStream is = sc.getResourceAsStream("dvtest.xml");

      // Next we'll get a connection to our database.  I made them servlet init
      // parameters so you can play with new reports and database easy.
      // They mimic the parameters you enter in the DataVision report designer.
      String jdbcDriverClassName = getInitParameter("JDBCDriverClassName");
      String connectionInfo = getInitParameter("ConnectionInfo");
      String userName = getInitParameter("UserName");
      String password = getInitParameter("Password");
      Class.forName(jdbcDriverClassName);
      Connection conn =
        DriverManager.getConnection(connectionInfo, userName, password);

      // Now we'll set up DataVision.  We instantiate a report instance and
      // hand it the database connection and the XML, and tell it we want HTML
      // as our output and pipe it to the servlets response output stream.
      Report report = new Report();
      report.setDatabaseConnection(conn);
      report.read(new org.xml.sax.InputSource(is));
      report.setLayoutEngine(new HTMLLE(new PrintWriter(
        response.getOutputStream())));

      // Finally, run the report!
      report.runReport();

      // Make sure we close that database connection!
      conn.close();

    } catch (Exception e) {
      System.out.println("Exception in DVWebappServlet: " + e);
    }

  } // End doPost().

} // End class.
