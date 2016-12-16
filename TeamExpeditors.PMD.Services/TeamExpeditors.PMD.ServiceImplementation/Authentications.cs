using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using TeamExpeditors.PMD.Database;
using TeamExpeditors.PMD.DataContracts;
using TeamExpeditors.PMD.ServiceContracts;

namespace TeamExpeditors.PMD.ServiceImplementation
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class Authentications : IUserLogin
    {
        public UserDetails Authentication(string userEmail, string pass)
        {
            try
            {
                StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
                var databaseResult = dbmlObject.LoginAuthenticationWithCompanyDetails(userEmail, pass).ToList();
                if (databaseResult.Count == 0)
                    throw new Exception();
                var loggedUser = databaseResult.First();
                UserDetails user = new UserDetails();
                user.CompanyId = loggedUser.CompanyID;
                user.FirstName = loggedUser.FirstName;
                user.IsOwner = loggedUser.IsOwner;
                user.LastName = loggedUser.LastName;
                user.UserId = loggedUser.UserID;
                user.UserDashboards = GetUserDashboards(loggedUser.UserID);
                user.CompanyName = loggedUser.Name;
                return user;
            }
            catch (Exception e) { throw e; }
        }
        public List<Dashboard> GetUserDashboards(int userID)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var userDashboardsResult = dbmlObject.RetreiveExistingDashboards(userID).ToList();
            List<Dashboard> list = new List<Dashboard>();
            foreach (var i in userDashboardsResult)
            {
                list.Add(new Dashboard
                {
                    DashboardId = i.DashboardID,
                    DashboardName = i.DashboardName,
                    EndMonth = i.EndMonth,
                    StartMonth = i.StartMonth,
                    EndYear = i.EndYear,
                    StartYear = i.StartYear,
                    Description = i.Description,
                    UserAccessRight = new AccessRight() { AccessRightName = i.AccessRight }
                });
            }
            return list;
        }
        public bool CreateNewDashboardByExistingDashboard(int dashboardID, int userID, string dashboardName, string description)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var result = dbmlObject.GetDashboardByID(dashboardID).ToList();
            var dashboardDetails = result.FirstOrDefault();
            var resNewDashboardID = dbmlObject.CreateDashboard(dashboardName, dashboardDetails.StartMonth, dashboardDetails.StartYear, dashboardDetails.EndMonth, dashboardDetails.EndYear, userID, "ADMIN", description).ToList();
            int newDashboardID = Convert.ToInt32(resNewDashboardID.FirstOrDefault().Column1);
            //Dashboard Source
            var resDashboardSources = dbmlObject.RetreiveSource(dashboardID).ToList();
            foreach (var i in resDashboardSources)
            {
                dbmlObject.AddDashboardSources(i.Source, newDashboardID);
            }
            //dashboard Status
            var resStatus = dbmlObject.RetreiveStatus(dashboardID);
            foreach (var i in resStatus)
            {
                dbmlObject.AddDashboardStatus(i.Status, i.Color, newDashboardID);
            }
            var resultItems = dbmlObject.RetreiveExistingDashboardItems(dashboardID, "StartDate").ToList();
            foreach (var i in resultItems)
            {
                var resItemID = dbmlObject.AddDataItem(i.ItemName, i.StartDate, i.EndDate, newDashboardID, i.StatusID).ToList();
                int itemID = Convert.ToInt32(resItemID.FirstOrDefault().Column1);
                var resTeams = dbmlObject.RetreiveTeamsWorkingOnItem(i.ItemID).ToArray();
                for (var j = 0; j < resTeams.Length; j++)
                {
                    dbmlObject.AddTeamToDashboardItem(itemID, resTeams[j].TeamID);
                }
                var resSources = dbmlObject.GetSourcesByItemID(i.ItemID).ToArray();
                for (var j = 0; j < resSources.Length; j++)
                {
                    dbmlObject.AddDataItemSource(itemID, resSources[j].SourceID);
                }
            }
            dbmlObject.SubmitChanges();
            return true;
        }

        public bool ChangePassword(int userid, string oldPassword, string newPassword)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            try
            {
                var res = dbmlObject.AuthenticationByID(userid, oldPassword).ToList();
                if (res.Count == 0)
                    return false;
                dbmlObject.ChangePassword(userid, newPassword);
            }
            catch (Exception e) { return false; }
            return true;
        }
    }
}