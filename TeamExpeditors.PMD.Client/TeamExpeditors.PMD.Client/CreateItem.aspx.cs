using System;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class CreateItem : System.Web.UI.Page
    {
        public int CompanyId = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            CompanyId = user.CompanyId;
        }
    }
}