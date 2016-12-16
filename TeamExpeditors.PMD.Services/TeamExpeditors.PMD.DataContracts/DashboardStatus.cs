using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class DashboardStatus
    {
        [DataMember]
        public int StatusID { get; set; }

        [DataMember]
        public string Status { get; set; }

        [DataMember]
        public string Color { get; set; }

        [DataMember]
        public int DashboardID { get; set; }
    }
}
