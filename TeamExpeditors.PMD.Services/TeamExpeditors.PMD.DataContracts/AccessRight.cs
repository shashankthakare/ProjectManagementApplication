using System.Runtime.Serialization;

namespace TeamExpeditors.PMD.DataContracts
{
    [DataContract]
    public class AccessRight
    {
        [DataMember]
        public string AccessRightName { get; set; }

    }
}
