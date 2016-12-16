using System;
using System.Web.UI;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class Registration : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void RegisterButton_Click(object sender, EventArgs e)
        {
            UserDetails NewUser = new UserDetails();
            UserRegistrationClient ClientCompany = new UserRegistrationClient();
            Company[] Companynames = ClientCompany.RetriveCompanyNames();
            string companyName = CompanyID.Text;
            int i = 0;
            for (i = 0; i < Companynames.Length; i++)
            {
                int res = string.Compare(Companynames[i].Name, companyName, true);
                if (res == 0)
                {
                    NewUser.CompanyId = Companynames[i].CompanyID;
                    break;
                }
            }
            if (i == Companynames.Length)
            {
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('Enter correct company name or Register your Company.');", true);
                return;
            }
            NewUser.FirstName = FirstName.Text;
            NewUser.LastName = LastName.Text;
            NewUser.UserEmail = Email.Text;
            NewUser.EncryptedPassword = Password.Text;
            NewUser.IsOwner = false;
            UserRegistrationClient client = new UserRegistrationClient();
            bool success = client.UserRegistration(NewUser);
            if (success)
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('You are registered');window.location='Login.aspx'", true);
            else
                ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "alert('error');", true);
            return;
        }

        protected void CancelButton_Click(object sender, EventArgs e)
        {
            Response.Redirect("Login.aspx");
        }
    }
}