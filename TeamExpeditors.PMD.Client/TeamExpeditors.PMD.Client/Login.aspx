<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" MasterPageFile="~/LoginMaster.Master"
    Inherits="TeamExpeditors.PMD.Client.Login" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/LoginPage.css" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <form runat="server">
    <div class="Sign-in">
        <div class="signin-box">
            <p>
                Sign In</p>
            <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">Email:</asp:Label>
            <asp:TextBox ID="UserName" runat="server" CssClass="textEntry"></asp:TextBox>
            <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                CssClass="failureNotification" ToolTip="User Name is required." ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
            <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
            <asp:TextBox ID="Password" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
            <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                CssClass="failureNotification" ToolTip="Password is required." ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
            <div class="ButtonDiv">
                <asp:Button ID="LoginButton" class="button" runat="server" CommandName="Login" Text="Log In"
                    ValidationGroup="LoginUserValidationGroup" OnClick="LoginButton_Click" />
            </div>
        </div>
    </div>
    <div class="SignIn-Options-LoginPage">
        <div style="height: 20px">
        </div>
        <div class="signin-box-Options">
            <p>
                <asp:HyperLink ID="RegisterHyperLink" runat="server" EnableViewState="false" NavigateUrl="~/Registration.aspx">Register</asp:HyperLink>
                if you don't have an account.
            </p>
            <p>
                <a href="CompanyRegistration.aspx">Register Company</a></p>
            <p>
            </p>
        </div>
    </div>
    </form>
</asp:Content>
