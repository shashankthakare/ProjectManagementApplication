using System;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class DashboardItemTeams : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
        }
    }
}