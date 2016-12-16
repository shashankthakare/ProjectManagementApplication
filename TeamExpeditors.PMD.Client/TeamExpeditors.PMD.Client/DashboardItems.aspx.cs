using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.Configuration;
using TeamExpeditors.PMD.ClientProxy;


namespace TeamExpeditors.PMD.Client
{
    public partial class DashboardItems : System.Web.UI.Page
    {
        public int currentWeek = 0;
        public int UserID = 0;
        public int dashboardID = 0;
        public int count = 0;
        public string AccessRight = "";
        public int CompanyId = 0;
        public void Page_Load(object sender, EventArgs e)
        {
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            if (Request.QueryString["id"] == null)
                Response.Redirect("DashboardHome.aspx");
            dashboardID = int.Parse(Request.QueryString["id"]);
            List<Dashboard> dashboardlist = new List<Dashboard>();
            dashboardlist = user.UserDashboards.ToList();
            count = dashboardlist.Count;
            Dashboard currentDashboard = new Dashboard();
            currentDashboard = dashboardlist.Find(dash => dash.DashboardId == dashboardID);
            LblDashboardName.Text = currentDashboard.DashboardName;
            CalendarWeekRule weekRule = CalendarWeekRule.FirstFourDayWeek;
            DayOfWeek firstWeekDay = DayOfWeek.Monday;
            Calendar calendar = System.Threading.Thread.CurrentThread.CurrentCulture.Calendar;

            currentWeek = calendar.GetWeekOfYear(DateTime.Now, weekRule, firstWeekDay);
            UserID = user.UserId;
            AccessRight = currentDashboard.UserAccessRight.AccessRightName;
            CompanyId = user.CompanyId;
        }

        protected void AddItem_Click(object sender, EventArgs e)
        {
        }

        protected void ManageUsers_Click(object sender, EventArgs e)
        {
            Response.Redirect("EditDashboardUser.aspx", false);
        }
    }
}