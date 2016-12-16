using System.Collections.Generic;
using System.ServiceModel.Web;
using System.ServiceModel;
using TeamExpeditors.PMD.DataContracts;

namespace TeamExpeditors.PMD.ServiceContracts
{
    [ServiceContract]
    public interface IDashboardItemOperations
    {

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddDashboardItem", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool AddDashboardItem(DashboardItem Item,int[]Sources,int[]WorkingTeams);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "DeleteDataItem", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool DeleteDataItem(string ItemName);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "EditDataItemLength", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool EditDataItemLength(DashboardItem dashboardItem);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "EditDataItemName", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool EditDataItemName(string ItemName, int ItemID, int DashboardID);

        [OperationContract]
        [WebGet(UriTemplate = "RetreiveExistingDashboardItems/id={DashboardID}&sortBy={sortBy}")]
        List<DashboardItem> RetreiveExistingDashboardItems(string DashboardID, string sortBy);

        [OperationContract]
        [WebInvoke(Method = "PUT", UriTemplate = "ModifyDashboardItem", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool ModifyDashboardItem(DashboardItem[] modified);
        
        [OperationContract]
        [WebGet(UriTemplate = "RetreiveExistingDashboardItemsByTeamID/id={DashboardID}&TeamID={teamid}&sortBy={sortby}")]
        List<DashboardItem> RetreiveExistingDashboardItemsByTeamID(string DashboardID, string teamid,string sortby);


        [OperationContract]
        [WebGet(UriTemplate = "GetStatusList/{id}")]
        List<DashboardStatus> GetStatusList(string id);

        [OperationContract]
        [WebGet(UriTemplate = "GetSourcesList/{id}")]
        List<DashboardSource> GetSourcesList(string id);

        [OperationContract]
        [WebGet(UriTemplate = "RetreiveDashboardItem/id={id}")]
        DashboardItem RetreiveDashboardItem(string id);

        [WebInvoke(Method = "POST", UriTemplate = "deleteDashboardItem", BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool deleteDashboardItem(int itemID);
    }
}
