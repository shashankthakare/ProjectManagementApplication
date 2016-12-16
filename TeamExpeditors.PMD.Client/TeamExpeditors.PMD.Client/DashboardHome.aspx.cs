using System;
using System.Linq;
using System.Web;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class DashboardHome : System.Web.UI.Page
    {

        public int UserId;
        public void Page_Load(object sender, EventArgs e)
        {
            Dashboard[] UserDashboards;
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            lblDashboardHeader.Text = user.FirstName + " " + user.LastName;
            UserLoginClient client = new UserLoginClient();
            UserId = user.UserId;
            user.UserDashboards = client.GetUserDashboards(user.UserId);
            UserDashboards = new Dashboard[user.UserDashboards.Count()];
            UserDashboards = user.UserDashboards;
            if (UserDashboards.Length == 0)
            {

                System.Web.UI.HtmlControls.HtmlGenericControl newDashboard = new System.Web.UI.HtmlControls.HtmlGenericControl("DIV");
                newDashboard.InnerHtml = "<div>You Have NO Dashboards... Create your Dashboards </div>";
                this.DashContainer.Controls.Add(newDashboard);
                return;
            }
            string colorOFdiv = "";
            string imageUrl = "";
            for (int i = 0; i < UserDashboards.Length; i++)
            {
                if (UserDashboards.ElementAt(i).UserAccessRight.AccessRightName.Equals("READ"))
                {
                    colorOFdiv = "#4a8bc2";
                    imageUrl = "'Images/Read.png'";
                }
                if (UserDashboards.ElementAt(i).UserAccessRight.AccessRightName.Equals("WRITE"))
                {
                    colorOFdiv = "#91929E";
                    imageUrl = "'Images/Write.png'";
                }
                if (UserDashboards.ElementAt(i).UserAccessRight.AccessRightName.Equals("ADMIN"))
                {
                    colorOFdiv = "#f37b53";
                    imageUrl = "'Images/Admin.gif'";

                }
                System.Web.UI.HtmlControls.HtmlGenericControl newDashboard = new System.Web.UI.HtmlControls.HtmlGenericControl("DIV");
                newDashboard.InnerHtml = "<a><div id=\"" + UserDashboards.ElementAt(i).DashboardId + "\" class=\"dashboard\" data-accessRight=\"" + UserDashboards.ElementAt(i).UserAccessRight.AccessRightName + "\" style=\"background-color:" + colorOFdiv + "\"><p class=left>" + UserDashboards.ElementAt(i).DashboardName + "</p><div class=right><img src=" + imageUrl + " class='rotateImage'/></div></div></a>";
                this.DashContainer.Controls.Add(newDashboard);


            }
            if (user.IsOwner == true)
            {
                System.Web.UI.HtmlControls.HtmlGenericControl linkAdminControl = new System.Web.UI.HtmlControls.HtmlGenericControl("DIV");
                linkAdminControl.InnerHtml = "<a href=\"Teams.aspx?companyID=" + user.CompanyId + "\"><div class='button right font16'> Admin Operations </div></a>";
                this.DashContainer.Controls.Add(linkAdminControl);
            }
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SetSession(string sessionName, string sessionValue)
        {
            HttpContext.Current.Session[sessionName] = Convert.ToInt32(sessionValue);

        }
    }
}
