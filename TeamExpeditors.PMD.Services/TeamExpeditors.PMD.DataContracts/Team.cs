using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class Team
    {
        [DataMember]
        public int TeamID { get; set; }

        [DataMember]
        public string TeamName { get; set; }

        [DataMember]
        public int CompanyID { get; set; }
        
    }
}
