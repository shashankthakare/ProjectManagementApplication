using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using TeamExpeditors.PMD.DataContracts;

namespace TeamExpeditors.PMD.ServiceContracts
{
    [ServiceContract]
    public interface ITeamsOperations
    {

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "DeleteTeams", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool DeleteTeams(Team[] teams);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddTeams", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool AddTeams(Team[] teamsToAdd, int[] deletedTeams);

        [OperationContract]
        [WebGet(UriTemplate = "RetreiveTeams/{id}")]
        List<Team> RetreiveTeams(string id);
    }
}
