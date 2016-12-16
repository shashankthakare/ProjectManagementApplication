using System.Collections.Generic;
using System.ServiceModel;
using TeamExpeditors.PMD.DataContracts;

namespace TeamExpeditors.PMD.ServiceContracts
{
    [ServiceContract]
    public interface IUserRegistration
    {

        [OperationContract]
        bool UserRegistration(UserDetails userDetails);
        [OperationContract]
        List<Company> RetriveCompanyNames();
        [OperationContract]
        int CompanyRegistration(Company company);
      
    }
}
