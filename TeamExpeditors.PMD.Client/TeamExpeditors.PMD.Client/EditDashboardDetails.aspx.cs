using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Tavisca.PMD.ClientProxy;

namespace Tavisca.PMD.Client
{
    public partial class EditDashboard : System.Web.UI.Page
    {
        public int dashboardID = 0;
        public int UserID = 0;
        public UserDetails user = new UserDetails();
        
        protected void Page_Load(object sender, EventArgs e)
        {
            dashboardID = int.Parse(Request.QueryString["id"]);
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            Dashboard currentDashboard = new Dashboard();
            List<Dashboard> dashboardlist = new List<Dashboard>();
            dashboardlist = user.UserDashboards.ToList();
            currentDashboard = dashboardlist.Find(dash => dash.DashboardId == dashboardID);
            dashboardName.Text = currentDashboard.DashboardName;
            txtStartDate.Text = currentDashboard.StartMonth + " / " + currentDashboard.StartYear;
            txtEndDate.Text = currentDashboard.EndMonth + " / " + currentDashboard.EndYear;
            txtDescription.Text = currentDashboard.Description;
        }
    }
}