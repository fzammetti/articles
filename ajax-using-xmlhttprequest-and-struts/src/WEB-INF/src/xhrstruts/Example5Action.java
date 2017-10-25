package xhrstruts;


import java.util.Iterator;
import java.util.StringTokenizer;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.codec.net.URLCodec;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


public class Example5Action extends Action {


  public ActionForward execute(ActionMapping mapping, ActionForm inForm, HttpServletRequest request, HttpServletResponse response) throws Exception {

    // Get the CSV string submitted and get the components of it
    String          csv        = (String)request.getParameter("csv");
                    csv        = new URLCodec().decode(csv);
    StringTokenizer st         = new StringTokenizer(csv, ",");
    String          firstName  = st.nextToken();
    String          middleName = st.nextToken();
    String          lastName   = st.nextToken();
    String          age        = st.nextToken();

    // "Properize" the names
    firstName  = firstName.substring(0, 1).toUpperCase() +
                 firstName.substring(1).toLowerCase();
    middleName = middleName.substring(0, 1).toUpperCase() +
                 middleName.substring(1).toLowerCase();
    lastName   = lastName.substring(0, 1).toUpperCase() +
                 lastName.substring(1).toLowerCase();

    // Our response.  Note that this obviously isn't the best way to be
    // doing this, but I wanted an example that shows you can forward to a
    // JSP from an Action like usual and use the rendered response as the
    // reply to XMLHttpRequest.  This was a simple way to do it.
    request.setAttribute("greeting", "Hello, " + firstName + " " +
                         middleName + " " + lastName + "!  I am so glad to " +
                         "hear that you are " + age + " years old! " +
                         "(Actually I couldn't care less, but I needed a " +
                         "response, so here it is!)");

    return mapping.findForward("default");

  } // End execute()


} // End class
