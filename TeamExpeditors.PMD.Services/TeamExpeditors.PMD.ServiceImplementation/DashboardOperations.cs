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
    public class DashboardOperations : IDashboardOperations, IDashboardItemOperations
    {

        public int CreateDashboard(Dashboard dashboardDetails, UserDetails UserDetails)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var res=dbmlObject.CreateDashboard(dashboardDetails.DashboardName, dashboardDetails.StartMonth, dashboardDetails.StartYear, dashboardDetails.EndMonth, dashboardDetails.EndYear, UserDetails.UserId, "ADMIN", dashboardDetails.Description);
            dbmlObject.SubmitChanges();
            var resTemp = res.FirstOrDefault();
            int NewDashID =Convert.ToInt32(resTemp.Column1);
            return NewDashID;

        }
        public bool deleteDashboard(int dashboardID)
        {
            try
            {
                StoredProcedureDataContext dbmlobject = new StoredProcedureDataContext();
                var result = dbmlobject.RetreiveExistingDashboardItems(dashboardID, "nothing").ToList();
                foreach (var item in result)
                    dbmlobject.DeleteDashboardItem(item.ItemID);
                dbmlobject.DeleteDashboard(dashboardID);
                dbmlobject.SubmitChanges();
            }
            catch (Exception e) { throw e; }
            return true;
        }
        public bool AddDashboardItem(DashboardItem Item, int[] Sources, int[] WorkingTeams)
        {
            try
            {
                StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
                if (Item.ItemID != 0) //if it is a Edit Option
                {
                    dbmlObject.DeleteDashboardItem(Item.ItemID);
                }
                var resItemID = dbmlObject.AddDataItem(Item.ItemName, Item.StartDate, Item.EndDate, Item.DashboardID, Item.StatusID).ToList();
                dbmlObject.SubmitChanges();
                int itemID = Convert.ToInt32(resItemID.FirstOrDefault().Column1);
                AddDashboardItemTeams(WorkingTeams, itemID);
                AddDashboardItemSource(Sources, itemID);
            }
            catch (Exception e) { Console.WriteLine(e); }
            return true;
        }
        public void AddDashboardItemTeams(int[] dashboardItemTeam, int itemID)
        {
            try
            {
                StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
                for (var j = 0; j < dashboardItemTeam.Length; j++)
                {
                    dbmlObject.AddTeamToDashboardItem(itemID, dashboardItemTeam[j]);
                    dbmlObject.SubmitChanges();
                }
            }
            catch (Exception e) { Console.WriteLine(e); }
        }
        public void AddDashboardItemSource(int[] sources, int itemID)
        {

            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            for (var j = 0; j < sources.Length; j++)
            {
                dbmlObject.AddDataItemSource(itemID, sources[j]);
                dbmlObject.SubmitChanges();
            }
        }
        public bool DeleteDataItem(string ItemName)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            dbmlObject.DeleteDataItem(ItemName);
            dbmlObject.SubmitChanges();
            return true;
        }

        public bool EditDataItemLength(DashboardItem dashboardItem)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            dbmlObject.EditDataItemLength(dashboardItem.StartDate, dashboardItem.EndDate, dashboardItem.DashboardID, dashboardItem.ItemID);
            dbmlObject.SubmitChanges();
            return true;
        }

        public bool EditDataItemName(string ItemName, int ItemID, int DashboardID)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            dbmlObject.EditDataItemName(ItemName, ItemID, DashboardID);
            dbmlObject.SubmitChanges();
            return true;
        }
        public List<DashboardItem> RetreiveExistingDashboardItems(string DashboardID, string sortBy)
        {
            List<DashboardItem> list = new List<DashboardItem>();
            int DashID = Convert.ToInt32(DashboardID);
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            var result = dbml.RetreiveExistingDashboardItems(DashID, sortBy).ToList();
            try
            {
                foreach (var i in result)
                {
                    DateTime startdatestring = i.StartDate;
                    DateTime endDatestring = i.EndDate;
                    list.Add(new DashboardItem { ItemID = i.ItemID, DashboardID = DashID, ItemName = i.ItemName, EndDate = endDatestring, StartDate = startdatestring, WorkingTeams = RetreiveTeamsWorkingOnItem(i.ItemID) });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex); }
            return list;
        }
        public List<Team> RetreiveTeamsWorkingOnItem(int dashboardItemID)
        {
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            var result = dbml.RetreiveTeamsWorkingOnItem(dashboardItemID).ToList();
            List<Team> list = new List<Team>();
            try
            {
                foreach (var i in result)
                {
                    list.Add(new Team { TeamID = i.TeamID, TeamName = i.TeamName });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex); }
            return list;
        }

        public bool ModifyDashboardItem(DashboardItem[] modified)
        {
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            for (int i = 0; i < modified.Length; i++)
            {
                dbml.EditDataItemLength(modified[i].StartDate, modified[i].EndDate, modified[i].DashboardID, modified[i].ItemID);
            }
            dbml.SubmitChanges();
            return true;
        }


        public List<DashboardItem> RetreiveExistingDashboardItemsByTeamID(string DashboardID, string teamid, string sortby)
        {
            int DashID = Convert.ToInt32(DashboardID);
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            var result = dbml.RetreiveExistingDashboardItemsSortedAndFilteredDistinctColor(DashID, sortby, teamid).ToList();
            List<DashboardItem> list = new List<DashboardItem>();
            try
            {
                foreach (var i in result)
                {
                    DateTime startdatestring = i.StartDate;
                    DateTime endDatestring = i.EndDate;
                    list.Add(new DashboardItem { ItemID = i.ItemID, DashboardID = DashID, ItemName = i.ItemName, EndDate = endDatestring, StartDate = startdatestring, StatusID = i.StatusID, Status = i.Status, StatusColor = i.Color, WorkingTeams = RetreiveTeamsWorkingOnItem(i.ItemID) });
                }
            }
            catch (Exception e) { return null; }
            return list;
        }
        public List<DashboardStatus> GetStatusList(string id)
        {
            int dashboardID = Convert.ToInt32(id);
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var result = dbmlObject.RetreiveStatus(dashboardID).ToList();
            List<DashboardStatus> list = new List<DashboardStatus>();
            foreach (var i in result)
            {
                list.Add(new DashboardStatus
                {
                    DashboardID = dashboardID,
                    Color = i.Color,
                    Status = i.Status,
                    StatusID = i.StatusID
                });
            }
            return list;
        }

        public List<DashboardSource> GetSourcesList(string id)
        {
            int dashboardID = Convert.ToInt32(id);
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var result = dbmlObject.RetreiveSource(dashboardID).ToList();
            List<DashboardSource> list = new List<DashboardSource>();
            foreach (var i in result)
            {
                list.Add(new DashboardSource
                {
                    DashboardID = dashboardID,
                    SourceID = i.SourceID,
                    Source = i.Source
                });
            }
            return list;
        }
        public DashboardItem RetreiveDashboardItem(string id)
        {
            int itemID = Convert.ToInt32(id);
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            var result = dbml.RetreiveDashboardItem(itemID).ToList();
            var i = result.FirstOrDefault();
            DateTime startdatestring = i.StartDate;
            DateTime endDatestring = i.EndDate;
            DashboardItem item = new DashboardItem { ItemID = i.ItemID, DashboardID = i.DashboardID, ItemName = i.ItemName, EndDate = endDatestring, StartDate = startdatestring, StatusID = i.StatusID, WorkingTeams = RetreiveTeamsWorkingOnItem(itemID), Sources = GetSourcesByItemID(itemID) };
            return item;
        }
        public List<DashboardSource> GetSourcesByItemID(int itemID)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var result = dbmlObject.GetSourcesByItemID(itemID).ToList();
            List<DashboardSource> list = new List<DashboardSource>();
            foreach (var i in result)
            {
                list.Add(new DashboardSource
                {
                    SourceID = i.SourceID,
                    Source = i.Source
                });
            }
            return list;
        }
        public bool EditDashboard(Dashboard dashboardDetails, int UserDetails, string[] newSource, int[] deletedSource, DashboardStatus[] newStatus, int[] deletedStatus)
        {
            try
            {
                StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
                dbmlObject.EditDashboard(dashboardDetails.DashboardId, dashboardDetails.DashboardName, dashboardDetails.StartMonth, dashboardDetails.StartYear, dashboardDetails.EndMonth, dashboardDetails.EndYear, dashboardDetails.Description);
                int dashboardID = dashboardDetails.DashboardId;
                foreach (var source in newSource)
                    dbmlObject.AddDashboardSources(source, dashboardID);
                foreach (int sid in deletedSource)
                    dbmlObject.DeleteDashboardSource(sid);
                foreach (var status in newStatus)
                    dbmlObject.AddDashboardStatus(status.Status, status.Color, dashboardID);
                foreach (int sid in deletedStatus)
                    dbmlObject.DeleteDashboardStatus(sid);
                dbmlObject.SubmitChanges();
            }
            catch (Exception e) { throw e; }
            return true;
        }
        public bool deleteDashboardItem(int itemID)
        {
            try
            {
                StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
                dbmlObject.DeleteDashboardItem(itemID);
                dbmlObject.SubmitChanges();
            }
            catch (Exception e) { throw e; }
            return true;
        }
    }
}
