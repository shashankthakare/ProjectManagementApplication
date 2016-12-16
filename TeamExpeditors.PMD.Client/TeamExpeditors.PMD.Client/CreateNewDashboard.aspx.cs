using System;
using TeamExpeditors.PMD.ClientProxy;

namespace TeamExpeditors.PMD.Client
{
    public partial class CreateNewDashboard : System.Web.UI.Page
    {
        public int UserId;
        public void Page_Load(object sender, EventArgs e)
        {

            UserDetails user = new UserDetails();
            user = (UserDetails)Session["LoggedUser"];
            if (user == null)
                Response.Redirect("Login.aspx");
            UserLoginClient client = new UserLoginClient();
            UserId = user.UserId;
        }

        protected void endYear_TextChanged(object sender, EventArgs e)
        {


            string startmonth = startMonth.SelectedValue;
            string endmonth = endMonth.SelectedValue;
            string day = "1";

            string startY = startYear.Text;
            string endY = endYear.Text;

            string concatedStartDate = day + "-" + startmonth + "-" + startY;
            string concatedEndDate = day + "-" + endmonth + "-" + endY;


            SDate.Text = Convert.ToDateTime(concatedStartDate).ToShortDateString();
            EDate.Text = Convert.ToDateTime(concatedEndDate).ToShortDateString();


            EDate.Text = Convert.ToDateTime(concatedEndDate).ToShortDateString();

        }

        protected void Testbutton_Click(object sender, EventArgs e)
        {

        }
    }
}