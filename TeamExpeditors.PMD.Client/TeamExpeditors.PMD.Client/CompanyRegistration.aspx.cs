using System;
using System.Web.UI;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class CompanyRegistration : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

    
        protected void RegisterButton_Click(object sender, EventArgs e)
        {
           UserDetails NewUser = new UserDetails();
           Company newcompany = new Company();
           newcompany.Name = CompanyName.Text;
           newcompany.Account = txtCompanyAccount.Text;
           newcompany.Url = txtCompanyURL.Text;
           UserRegistrationClient client = new UserRegistrationClient();
           NewUser.CompanyId = client.CompanyRegistration(newcompany);
           NewUser.FirstName = FirstName.Text;
           NewUser.LastName= LastName.Text;
           NewUser.UserEmail = Email.Text;
           NewUser.EncryptedPassword = Password.Text;
           NewUser.IsOwner = true;
           bool success = client.UserRegistration(NewUser);
           if(success)
               ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('Welcome to Roadmunk!!!');", true);
           else
               ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('error');", true);
            Response.Redirect("Login.aspx");
        }

        protected void CancelButton_Click(object sender, EventArgs e)
        {
            Response.Redirect("Login.aspx");
        }
    }
}