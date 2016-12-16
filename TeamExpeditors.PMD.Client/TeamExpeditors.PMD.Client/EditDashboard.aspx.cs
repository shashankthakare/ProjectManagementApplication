using System;
using System.Collections.Generic;
using System.Linq;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class EditDashboard : System.Web.UI.Page
    {
        public int dashboardID = 0;
        public int UserID = 0;
        public string AccessRight = "";
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
            UserLoginClient client=new UserLoginClient();
            if (Request.UrlReferrer.AbsolutePath.Equals("/CreateNewDashboard.aspx"))
            {
                user.UserDashboards = client.GetUserDashboards(user.UserId);
            }
            dashboardlist = user.UserDashboards.ToList();
            currentDashboard = dashboardlist.Find(dash => dash.DashboardId == dashboardID);
            dashboardName.Text = currentDashboard.DashboardName;
            startMonth.Text =currentDashboard.StartMonth.ToString();
            endMonth.Text = currentDashboard.EndMonth.ToString();
            startYear.Text = currentDashboard.StartYear.ToString();
            endYear.Text = currentDashboard.EndYear.ToString();
            Description.Text = currentDashboard.Description;
            AccessRight = currentDashboard.UserAccessRight.AccessRightName;
        }
    }
}