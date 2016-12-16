<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CompanyRegistration.aspx.cs"
    MasterPageFile="~/LoginMaster.Master" Inherits="TeamExpeditors.PMD.Client.CompanyRegistration" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <form id="form1" runat="server">
    <div class="CompanyaccountInfo">
        <div class="companydetails">
            <fieldset class="NewCompanyregister">
                <legend>Company Registration</legend>
                <p>
                    <asp:Label ID="CompanyNameLabel" runat="server" AssociatedControlID="CompanyName">Company Name:</asp:Label>
                    <asp:TextBox ID="CompanyName" runat="server" CssClass="textEntry"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="CompanyNameRequired" runat="server" ControlToValidate="CompanyName"
                        CssClass="failureNotification" ToolTip="Company Name is required.">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="lblCompanyAccount" runat="server" AssociatedControlID="CompanyAccountRequired">Company Account:</asp:Label>
                    <asp:TextBox ID="txtCompanyAccount" runat="server" CssClass="textEntry"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="CompanyAccountRequired" runat="server" ControlToValidate="txtCompanyAccount"
                        CssClass="failureNotification" ToolTip="Company Account is required.">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="lblCompanyURL" runat="server">Company URL:</asp:Label>
                    <asp:TextBox ID="txtCompanyURL" runat="server" CssClass="textEntry"></asp:TextBox>
                </p>
            </fieldset>
        </div>
        <div class="admindetails">
            <fieldset class="register">
                <legend>Admin Details</legend>
                <p>
                    <asp:Label ID="FirstNameLabel" runat="server" AssociatedControlID="FirstName">First Name:</asp:Label>
                    <asp:TextBox ID="FirstName" runat="server" CssClass="textEntry"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="FirstNameRequired" runat="server" ControlToValidate="FirstName"
                        CssClass="failureNotification" ToolTip="First Name is required.">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="LaststNameLabel" runat="server" AssociatedControlID="LastName">Last Name:</asp:Label>
                    <asp:TextBox ID="LastName" runat="server" CssClass="textEntry"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="LastName"
                        CssClass="failureNotification" ToolTip="Last Name is required.">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="EmailLabel" runat="server" AssociatedControlID="Email">E-mail:</asp:Label>
                    <asp:TextBox ID="Email" runat="server" CssClass="textEntry"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email"
                        CssClass="failureNotification" ToolTip="E-mail is required.">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                    <asp:TextBox ID="Password" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                        CssClass="failureNotification" ToolTip="Password is required.">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="ConfirmPasswordLabel" runat="server" AssociatedControlID="ConfirmPassword">Confirm Password:</asp:Label>
                    <asp:TextBox ID="ConfirmPassword" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ControlToValidate="ConfirmPassword" CssClass="failureNotification"
                        Display="Dynamic" ID="ConfirmPasswordRequired" runat="server" ToolTip="Confirm Password is required."
                        ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                    <asp:CompareValidator ID="PasswordCompare" runat="server" ControlToCompare="Password"
                        ControlToValidate="ConfirmPassword" CssClass="failureNotification">*</asp:CompareValidator>
                </p>
            </fieldset>
        </div>
    </div>
    <div class="ButtonDivforRegistration">
        <p class="ButtonDivforRegistration">
            <asp:Button ID="RegisterButton" runat="server" Text="Register" OnClick="RegisterButton_Click"
                class="button" />
            <asp:Button ID="CancelButton" runat="server" Text="Cancel" CausesValidation="false"
                OnClick="CancelButton_Click" class="button" />
        </p>
    </div>
    </form>
</asp:Content>
