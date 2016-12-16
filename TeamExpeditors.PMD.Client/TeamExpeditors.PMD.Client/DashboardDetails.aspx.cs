using System;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class DashboardDetails : System.Web.UI.Page
    {
        public int dashboardID = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            if (Request.QueryString["id"] == null)
                Response.Redirect("DashboardHome.aspx");
            dashboardID = int.Parse(Request.QueryString["id"]);

        }
    }
}