using System.Collections.Generic;
using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class UserDetails
    {
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public int CompanyId { get; set; }
        [DataMember]
        public string CompanyName { get; set; }
        [DataMember]
        public string UserEmail { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public bool IsOwner { get; set; }
        [DataMember]
        public string EncryptedPassword { get; set; }
        [DataMember]
        public List<Dashboard> UserDashboards { get; set; }

    }
}
