using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Activation;
using System.ServiceModel;
using TeamExpeditors.PMD.Database;
using TeamExpeditors.PMD.DataContracts;
using TeamExpeditors.PMD.ServiceContracts;

namespace TeamExpeditors.PMD.ServiceImplementation
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class DashboardTeamOperations : IDashboardTeamOperations
    {


        public List<Team> ShowAllTeamsInCompany(string companyID)
        {
            int compantIDInt = Convert.ToInt32(companyID);
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            var result = dbml.ShowAllTeamsInCompany(compantIDInt);
            List<Team> teams = new List<Team>();
            foreach (var i in result)
            {
                teams.Add(new Team
                {
                    TeamID = i.TeamID,
                    TeamName = i.TeamName
                });
            }
            return teams;
        }

        public void WriteAllDashboardItemTeams(DashboardItemTeam[] dashboardItemTeam)
        {

            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            for (var i = 0; i < dashboardItemTeam.Length; i++)
            {
                dbmlObject.DeleteTeamsFromDashboardItem(dashboardItemTeam[i].ItemID);
            }
            dbmlObject.SubmitChanges();
            for (var j = 0; j < dashboardItemTeam.Length; j++)
            {
                dbmlObject.AddTeamToDashboardItem(dashboardItemTeam[j].ItemID, dashboardItemTeam[j].TeamID);
                dbmlObject.SubmitChanges();
            }
        }

        public List<ShowAllDashboardItemTeams> ShowAllItemsAndTeams(string DashboardID)
        {


            int dashboardID = Convert.ToInt32(DashboardID);
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var ShowAllItemsAndTeamsResult = dbmlObject.ShowAllItemsAndTeamsOuterJoin(dashboardID).ToList();
            List<ShowAllDashboardItemTeams> UserList = new List<ShowAllDashboardItemTeams>();

            foreach (var i in ShowAllItemsAndTeamsResult)
            {
                UserList.Add(new ShowAllDashboardItemTeams
                {
                    ItemID = i.ItemID,
                    ItemName = i.ItemName,
                    TeamID = Convert.ToInt32(i.TeamID),
                    TeamName = i.TeamName

                });
            }
            return UserList;
        }
    }
}
