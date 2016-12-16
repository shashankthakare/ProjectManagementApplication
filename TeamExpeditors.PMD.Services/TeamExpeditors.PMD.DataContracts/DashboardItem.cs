using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class DashboardItem
    {
        [DataMember]
        public int ItemID { get; set; }

        [DataMember]
        public string ItemName { get; set; }

        [DataMember]
        public DateTime StartDate { get; set; }

        [DataMember]
        public DateTime EndDate { get; set; }

        [DataMember]
        public int DashboardID { get; set; }

        [DataMember]
        public int StatusID { get; set; }

        [DataMember]
        public string Status { get; set; }

        [DataMember]
        public string StatusColor { get; set; }

        [DataMember]
       public List<Team> WorkingTeams { get; set; }

        [DataMember]
        public List<DashboardSource> Sources { get; set; }
    }
}
