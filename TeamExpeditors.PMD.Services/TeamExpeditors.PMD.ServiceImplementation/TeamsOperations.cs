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
    public class TeamsOperations : ITeamsOperations
    {

        public bool DeleteTeams(Team[] teams)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            for (int i = 0; i < teams.Length; i++)
            {
                dbmlObject.DeleteTeam(teams[i].TeamID);
            }
            dbmlObject.SubmitChanges();
            return true;
        }

        public bool AddTeams(Team[] teamsToAdd, int[] deletedTeams)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            for (int i = 0; i < deletedTeams.Length; i++)
            {
                dbmlObject.DeleteTeam(deletedTeams[i]);
            }
            for (int i = 0; i < teamsToAdd.Length; i++)
            {
                dbmlObject.AddTeams(teamsToAdd[i].TeamName, teamsToAdd[i].CompanyID);
            }
            dbmlObject.SubmitChanges();
            return true;
        }


        public List<Team> RetreiveTeams(string id)
        {
            int companyID = Convert.ToInt32(id);
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var result = dbmlObject.RetreiveTeams(companyID).ToList();
            List<Team> teamList = new List<Team>();
            foreach (var i in result)
            {
                teamList.Add(new Team
                {
                    TeamID = i.TeamID,
                    TeamName = i.TeamName,
                    CompanyID = i.CompanyID
                });
            }
            return teamList;
        }
    }
}
