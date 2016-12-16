using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class CreateNewDashboardByExistingDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Dashboard[] UserDashboards;
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            UserLoginClient client = new UserLoginClient();
            user.UserDashboards = client.GetUserDashboards(user.UserId);
            UserDashboards = new Dashboard[user.UserDashboards.Count()];
            UserDashboards = user.UserDashboards;
            for (int i = 0; i < UserDashboards.Length; i++)
            {
                string dashboardName = UserDashboards.ElementAt(i).DashboardName;
                string dashboardID = UserDashboards.ElementAt(i).DashboardId.ToString();
                dashboard.Items.Add(new ListItem(dashboardName, dashboardID));
            }
        }

        protected void submit_Click(object sender, EventArgs e)
        {
            UserLoginClient client = new UserLoginClient();
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            int dashboardID = Convert.ToInt32(dashboard.SelectedValue);
            bool result = client.CreateNewDashboardByExistingDashboard(dashboardID, user.UserId, txtName.Text, txtDescription.Text);
            if (result)
            {
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('Dashboard Created');", true);
                Response.Redirect("DashboardHome.aspx");
            }
            else
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('error');", true);
        }
    }
}