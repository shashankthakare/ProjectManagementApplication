using System;
using System.Collections.Generic;
using System.Linq;
using TeamExpeditors.PMD.ClientProxy;


namespace TeamExpeditors.PMD.Client
{
    public partial class DashboardDescription : System.Web.UI.Page
    {
        public int dashboardID = 0;
        public int UserID = 0;
        public UserDetails user = new UserDetails();

        protected void Page_Load(object sender, EventArgs e)
        {
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            if (Request.QueryString["id"] == null)
                Response.Redirect("DashboardHome.aspx");
            dashboardID = int.Parse(Request.QueryString["id"]);
            Dashboard currentDashboard = new Dashboard();
            List<Dashboard> dashboardlist = new List<Dashboard>();
            dashboardlist = user.UserDashboards.ToList();
            currentDashboard = dashboardlist.Find(dash => dash.DashboardId == dashboardID);
            LblDashboardName.Text = currentDashboard.DashboardName;
            lblStartDate.Text = currentDashboard.StartMonth + " / " + currentDashboard.StartYear;
            lblEndDate.Text = currentDashboard.EndMonth + " / " + currentDashboard.EndYear;
            lblDescription.Text = currentDashboard.Description;

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect("EditDashboard.aspx?id=" + dashboardID);
        }

    }
}