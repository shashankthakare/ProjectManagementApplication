using System;
using System.Web.UI;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class ChangePassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void ChangePasswordPushButton_Click(object sender, EventArgs e)
        {

            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            UserLoginClient client = new UserLoginClient();
            string currentP = CurrentPassword.Text;
            string newP = NewPassword.Text;
            bool res = client.ChangePassword(user.UserId, currentP, newP);
            if (res)
            {
                ScriptManager.RegisterStartupScript(this, GetType(), "showalert", "alert('Password set successfully!!!');", true);

            }
            else
            {
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('error');", true);
            }
        }
    }
}