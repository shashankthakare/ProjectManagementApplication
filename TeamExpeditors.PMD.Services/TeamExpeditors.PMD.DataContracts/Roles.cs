using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace PMD.DataContracts
{[DataContract]
   public class Roles
    {
    [DataMember]
    public int RoleId { get; set;}
    [DataMember]
    public string RoleName { get; set; }
    }
}
