using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class Dashboard
    {
        [DataMember]
        public int DashboardId { get; set; }

        [DataMember]
        public string DashboardName { get; set; }

        [DataMember]
        public int StartMonth { get; set; }

        [DataMember]
        public int StartYear { get; set; }

        [DataMember]
        public int EndMonth { get; set; }

        [DataMember]
        public int EndYear { get; set; }
        
        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public AccessRight UserAccessRight { get; set; }
    }
}
