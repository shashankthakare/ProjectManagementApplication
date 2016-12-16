using System.Collections.Generic;
using System.ServiceModel;
using TeamExpeditors.PMD.DataContracts;

namespace TeamExpeditors.PMD.ServiceContracts
{
    [ServiceContract]
    public interface IUserLogin
    {
        [OperationContract]
        UserDetails Authentication(string userid, string pass);
        [OperationContract]
        List<Dashboard> GetUserDashboards(int userID);
        [OperationContract]
        bool CreateNewDashboardByExistingDashboard(int dashboardID,int userID,string dashboardName,string description);
        [OperationContract]
        bool ChangePassword(int userid,string oldPassword,string newPassword);
    }
}
