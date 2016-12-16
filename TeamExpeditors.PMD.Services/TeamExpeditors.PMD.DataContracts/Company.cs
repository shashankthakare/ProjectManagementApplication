using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class Company
    {
        [DataMember]
        public int CompanyID { get; set; }

        [DataMember]
        public string Account { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Url { get; set; }
    }
}
