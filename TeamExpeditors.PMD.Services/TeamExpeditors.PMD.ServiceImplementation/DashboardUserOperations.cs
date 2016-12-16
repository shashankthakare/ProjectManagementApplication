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
    public class DashboardUserOperations : IDashboardUserOperations
    {
        public List<DashboardUser> ShowAllAccessRights(string dashboard)
        {
            int dashboardID = Convert.ToInt32(dashboard);
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var ShowAccessRightResult = dbmlObject.ShowAllAccessRights(dashboardID).ToList();
            List<DashboardUser> UserList = new List<DashboardUser>();
            //proper conversion logic
            foreach (var i in ShowAccessRightResult)
            {
                UserList.Add(new DashboardUser
                {
                    DashboardId = dashboardID,
                    Name = i.FirstName,
                    UserId = i.UserID,
                    AccessRight = new AccessRight() { AccessRightName = i.AccessRight }
                });
            }
            return UserList;

        }

        public void WriteAllAccessRights(DashboardUser[] DashboardUser)
        {

            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            dbmlObject.DeleteUsersFromDashboard(DashboardUser[0].DashboardId);
            dbmlObject.SubmitChanges();
            for (var i = 0; i < DashboardUser.Length; i++)
            {
                dbmlObject.AddUserToDashboard(DashboardUser[i].AccessRight.AccessRightName, DashboardUser[i].DashboardId, DashboardUser[i].UserId);
                dbmlObject.SubmitChanges();
            }
        }

        public List<UserDetails> ShowAllUsersInCompany(string companyId)
        {
            int companyID = Convert.ToInt32(companyId);
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var ShowAllUsersInCompanyResult = dbmlObject.ShowAllUsersInCompany(companyID).ToList();
            dbmlObject.SubmitChanges();
            List<UserDetails> userDetails = new List<UserDetails>();
            foreach (var i in ShowAllUsersInCompanyResult)
            {
                userDetails.Add(new UserDetails
                                    {
                                        FirstName = i.FirstName,
                                        UserId = i.UserId
                                    });
            }
            return userDetails;
        }
    }
}
