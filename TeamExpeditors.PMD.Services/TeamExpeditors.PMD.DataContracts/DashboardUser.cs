using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class DashboardUser
    {
        [DataMember]
        public int DashboardId { get; set; }

        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public AccessRight AccessRight;

        [DataMember]
        public string Name { get; set; }
    }
}
