package xhrstruts;


import java.io.InputStream;
import java.net.URL;
import java.io.BufferedReader;
import java.io.PrintWriter;
import javax.servlet.http.HttpSession;
import java.io.InputStreamReader;
import org.apache.struts.action.Action;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.codec.net.URLCodec;
import org.apache.struts.action.ActionMapping;


public class Example7Action extends Action {


  public ActionForward execute(ActionMapping mapping, ActionForm inForm, HttpServletRequest request, HttpServletResponse response) throws Exception {

    String feedURL = (String)request.getParameter("feedURL");

    if (feedURL == null || feedURL.equalsIgnoreCase("")) {
      return null; // Trivial error handling... if no URL sent in, essentially do nothing
    }
    feedURL = new URLCodec().decode(feedURL);

    // Go get the feed
    StringBuffer xml = new StringBuffer(4096);
    try {
      URL               u   = new URL(feedURL);
      InputStream       in  = u.openStream();
      InputStreamReader isr = new InputStreamReader(in);
      BufferedReader    br  = new BufferedReader(isr);
      String theLine;
      while ((theLine = br.readLine()) != null) {
        xml.append(theLine);
      }
    } catch (Exception e) {
      System.err.println("Example7Action Exception: " + e);
    }

    // Write the XML to response
    response.setContentType("text/xml");
    PrintWriter out = response.getWriter();
    out.println(xml);
    out.flush();

    return null;

  } // End execute()


} // End class
