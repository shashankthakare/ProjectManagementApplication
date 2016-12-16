using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using TeamExpeditors.PMD.DataContracts;

namespace TeamExpeditors.PMD.ServiceContracts
{
    [ServiceContract]
    public interface IDashboardUserOperations
    {
        

        [OperationContract]
        [WebGet(UriTemplate = "ShowAllAccessRights/{dashboard}")]
        List<DashboardUser> ShowAllAccessRights(string dashboard);

        [OperationContract]
        [WebGet(UriTemplate = "ShowAllUsersInCompany/{companyId}")]
        List<UserDetails> ShowAllUsersInCompany(string companyId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "WriteAllAccessRights", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        void WriteAllAccessRights(DashboardUser[] DashboardUser);

        
    }
}
