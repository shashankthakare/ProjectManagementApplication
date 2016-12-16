using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using TeamExpeditors.PMD.DataContracts;

namespace TeamExpeditors.PMD.ServiceContracts
{
    [ServiceContract]
    public interface IDashboardTeamOperations
    {

        [OperationContract]
        [WebGet(UriTemplate = "ShowAllItemsAndTeams/{DashboardID}")]
        List<ShowAllDashboardItemTeams> ShowAllItemsAndTeams(string DashboardID);
    
        [OperationContract]
        [WebGet(UriTemplate = "ShowAllTeamsInCompany/{companyID}")]
        List<Team> ShowAllTeamsInCompany(string companyID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "WriteAllDashboardItemTeams", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        void WriteAllDashboardItemTeams(DashboardItemTeam[] dashboardItemTeam);
    }
}
