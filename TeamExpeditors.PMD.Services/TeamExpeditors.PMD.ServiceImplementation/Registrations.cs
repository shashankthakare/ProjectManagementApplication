using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Activation;
using System.ServiceModel;
using TeamExpeditors.PMD.Database;
using TeamExpeditors.PMD.DataContracts;
using TeamExpeditors.PMD.ServiceContracts;

namespace TeamExpeditors.PMD.ServiceImplementation
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class Registrations : IUserRegistration
    {
        public bool UserRegistration(DataContracts.UserDetails userDetails)
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();

            dbmlObject.InsertUserDetails(userDetails.CompanyId, userDetails.FirstName, userDetails.LastName, userDetails.UserEmail, userDetails.IsOwner, userDetails.EncryptedPassword);
            dbmlObject.SubmitChanges();
            return true;
        }



        public List<Company> RetriveCompanyNames()
        {
            StoredProcedureDataContext dbmlObject = new StoredProcedureDataContext();
            var ResultCompanies = dbmlObject.RetreiveCompanies();
            List<Company> list = new List<Company>();
            foreach (var i in ResultCompanies)
            {
                list.Add(new Company
                {
                    CompanyID = i.CompanyID,
                    Name = i.Name

                });
            }
            return list;
        }


        public int CompanyRegistration(Company company)
        {
            StoredProcedureDataContext dbml = new StoredProcedureDataContext();
            var result = dbml.CompanyRegisteration(company.Account, company.Name, company.Url).ToList();
            dbml.SubmitChanges();
            var cID = result.First();
            int companyID = Convert.ToInt32(cID.Column1);
            return companyID;
        }
    }
}
