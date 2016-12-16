using System;
using System.Configuration;
using System.Web.UI;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class Main : System.Web.UI.MasterPage
    {
        public int currentDashboardID = 0;
        public string pageName = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string ServerAddress = ConfigurationManager.AppSettings["ServerAddress"];
            ScriptManager.RegisterStartupScript(this, this.GetType(), new Guid().ToString(), string.Format("ServerAddress = \"{0}\";", ServerAddress), true); 
            bool checkSessionPage = false;
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user != null)
            {
                Name.Text = user.FirstName + " " + user.LastName;
                Company.Text = user.CompanyName;
                pageName = this.MainContent.Page.GetType().FullName;


                if ((pageName.Equals("ASP.dashboardhome_aspx")))
                    checkSessionPage = true;
                if (pageName.Equals("ASP.createnewdashboard_aspx"))
                    checkSessionPage = true;
                if (pageName.Equals("ASP.teams_aspx"))
                    checkSessionPage = true;
                if (pageName.Equals("ASP.changepassword_aspx"))
                    checkSessionPage = true;
                if (checkSessionPage == false)
                {
                    if (Session["CurrentDasboardID"] !=null)
                        currentDashboardID = (int)Session["CurrentDasboardID"];
                }
            }

        }
    }
}