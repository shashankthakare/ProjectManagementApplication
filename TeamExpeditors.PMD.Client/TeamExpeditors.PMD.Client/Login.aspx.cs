using System;
using System.Web.UI;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session.Clear();

        }

        protected void LoginButton_Click(object sender, EventArgs e)
        {
            try
            {
                UserDetails user = new UserDetails();
                string userEmail = UserName.Text;
                string password = Password.Text;
                UserLoginClient client = new UserLoginClient();
                user = client.Authentication(userEmail, password);
                if (user != null)
                {
                    Session["LoggedUser"] = user;
                    Response.Redirect("DashboardHome.aspx");
                }

            }
            catch (Exception ex)
            {
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert(Login ID"+ex+");", true);
            }
        }
    }
}