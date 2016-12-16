<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Registration.aspx.cs" MasterPageFile="~/LoginMaster.Master"
    Inherits="TeamExpeditors.PMD.Client.Registration" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="Styles/Styles.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <form id="form1" runat="server">
    <div>
        <div class="accountInfo">
            <fieldset class="register">
                <legend>User Registration</legend>
                <p>
                    <asp:Label ID="CompanyIDLabel" runat="server" AssociatedControlID="CompanyID">Company:</asp:Label>
                    <asp:TextBox ID="CompanyID" runat="server" CssClass="textEntry"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="CompanyIDRequired" runat="server" ControlToValidate="CompanyID"
                        CssClass="failureNotification" ToolTip="Company Name is required.">*</asp:RequiredFieldValidator>
                </p>
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
                        Display="Dynamic" ID="ConfirmPasswordRequired" runat="server" ToolTip="Confirm Password is required.">*</asp:RequiredFieldValidator>
                    <asp:CompareValidator ID="PasswordCompare" runat="server" ControlToCompare="Password"
                        ControlToValidate="ConfirmPassword" CssClass="failureNotification" ToolTip="E-mail is required.">*</asp:CompareValidator>
                </p>
                <div class="ButtonDiv">
                    <div>
                        <asp:Button ID="RegisterButton" runat="server" Text="Register" CssClass="button "
                            OnClick="RegisterButton_Click" />
                        <asp:Button ID="CancelButton" runat="server" Text="Cancel" CausesValidation="false"
                            CssClass="button right" OnClick="CancelButton_Click" /></div>
                </div>
            </fieldset>
        </div>
    </div>
    </form>
</asp:Content>
