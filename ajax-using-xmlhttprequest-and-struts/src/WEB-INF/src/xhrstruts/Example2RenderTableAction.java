package xhrstruts;


import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


public class Example2RenderTableAction extends Action {


  public ActionForward execute(ActionMapping mapping, ActionForm inForm, HttpServletRequest request, HttpServletResponse response) throws Exception {

    String sortField = (String)request.getParameter("sortField");
    if (sortField == null) {
      sortField = "";
    }
    ArrayList sortedPresidentsList = getSortedPresidentsList(sortField);

    // And yes, I know creating HTML in an Action is generally very bad form,
    // but I wanted to keep this exampel simple.
    String html = "<table border=\"1\" align=\"center\" cellpadding=\"2\" cellspacing=\"0\">";
    html += "<tr>";
    html += "<th onClick=\"retrieveURL('example2RenderTable.do?sortField=firstName');\" onMouseOver=\"style.background='#c0c0c0';\" onMouseOut=\"style.background='';\">First Name</th>";
    html += "<th onClick=\"retrieveURL('example2RenderTable.do?sortField=middleName');\" onMouseOver=\"style.background='#c0c0c0';\" onMouseOut=\"style.background='';\">Middle Name</th>";
    html += "<th onClick=\"retrieveURL('example2RenderTable.do?sortField=lastName');\" onMouseOver=\"style.background='#c0c0c0';\" onMouseOut=\"style.background='';\">Last Name</th>";
    html += "<th onClick=\"retrieveURL('example2RenderTable.do?sortField=firstYearInOffice');\" onMouseOver=\"style.background='#c0c0c0';\" onMouseOut=\"style.background='';\">First Year In Office</th>";
    html += "<th onClick=\"retrieveURL('example2RenderTable.do?sortField=lastYearInOffice');\" onMouseOver=\"style.background='#c0c0c0';\" onMouseOut=\"style.background='';\">Last Year In Office</th>";
    html += "</tr>";
    for (Iterator it = sortedPresidentsList.iterator(); it.hasNext();) {
      HashMap hm = (HashMap)it.next();
      html += "<tr>";
      html += "<td>" + (String)hm.get("firstName")         + "</td>";
      html += "<td>" + (String)hm.get("middleName")        + "</td>";
      html += "<td>" + (String)hm.get("lastName")          + "</td>";
      html += "<td>" + (String)hm.get("firstYearInOffice") + "</td>";
      html += "<td>" + (String)hm.get("lastYearInOffice")  + "</td>";
      html += "</tr>";
    }
    html += "</table>";

    // Write the HTML to response
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println(html);
    out.flush();

    return null; // Not forwarding to anywhere, response is fully-cooked

  } // End execute()


  // This method returns a sorted list of five presidents.
  // Ok, look, I'm lazy... I did't feel like doing a real sort, so I cheated...
  // Based on which header was clicked, if any, we'll simply add the
  // presidents into our ArrayList in the appropriate order.  So shoot me!
  // Of course, don't go changing the presidents or the "sorting" won't work
  // right!
  private ArrayList getSortedPresidentsList(String sortField) {

    ArrayList al = new ArrayList();

    // No "sort", initial page display
    if (sortField.equalsIgnoreCase("")) {
      al.add(president1());
      al.add(president2());
      al.add(president3());
      al.add(president4());
      al.add(president5());
    }

    // "Sort" by first name
    if (sortField.equalsIgnoreCase("FirstName")) {
      al.add(president3());
      al.add(president5());
      al.add(president4());
      al.add(president2());
      al.add(president1());
    }

    // "Sort" by middle name
    if (sortField.equalsIgnoreCase("MiddleName")) {
      al.add(president5());
      al.add(president3());
      al.add(president4());
      al.add(president1());
      al.add(president2());
    }

    // "Sort" by last name
    if (sortField.equalsIgnoreCase("LastName")) {
      al.add(president1());
      al.add(president5());
      al.add(president3());
      al.add(president4());
      al.add(president2());
    }

    // "Sort" by first year in office
    if (sortField.equalsIgnoreCase("FirstYearInOffice")) {
      al.add(president3());
      al.add(president5());
      al.add(president4());
      al.add(president2());
      al.add(president1());
    }

    // "Sort" by last year in office
    if (sortField.equalsIgnoreCase("LastYearInOffice")) {
      al.add(president3());
      al.add(president5());
      al.add(president4());
      al.add(president2());
      al.add(president1());
    }

    return al;

  } // End getSortedPresidentsList()


  // Get the details of president #1
  private HashMap president1() {

    HashMap hm = new HashMap();
    hm.put("firstName",         "William");
    hm.put("middleName",        "Jefferson");
    hm.put("lastName",          "Clinton");
    hm.put("firstYearInOffice", "1993");
    hm.put("lastYearInOffice",  "2001");
    return hm;

  } // president1()


  // Get the details of president #2
  private HashMap president2() {

    HashMap hm = new HashMap();
    hm.put("firstName",         "Ronald");
    hm.put("middleName",        "Wilson");
    hm.put("lastName",          "Reagen");
    hm.put("firstYearInOffice", "1981");
    hm.put("lastYearInOffice",  "1989");
    return hm;

  } // president2()


  // Get the details of president #3
  private HashMap president3() {

    HashMap hm = new HashMap();
    hm.put("firstName",         "John");
    hm.put("middleName",        "Fitzgerald");
    hm.put("lastName",          "Kennedy");
    hm.put("firstYearInOffice", "1961");
    hm.put("lastYearInOffice",  "1963");
    return hm;

  } // president3()


  // Get the details of president #4
  private HashMap president4() {

    HashMap hm = new HashMap();
    hm.put("firstName",         "Richard");
    hm.put("middleName",        "Millhouse");
    hm.put("lastName",          "Nixon");
    hm.put("firstYearInOffice", "1969");
    hm.put("lastYearInOffice",  "1974");
    return hm;

  } // president4()


  // Get the details of president #5
  private HashMap president5() {

    HashMap hm = new HashMap();
    hm.put("firstName",         "Lyndon");
    hm.put("middleName",        "Baines");
    hm.put("lastName",          "Johnson");
    hm.put("firstYearInOffice", "1963");
    hm.put("lastYearInOffice",  "1969");
    return hm;

  } // president5()


} // End class
