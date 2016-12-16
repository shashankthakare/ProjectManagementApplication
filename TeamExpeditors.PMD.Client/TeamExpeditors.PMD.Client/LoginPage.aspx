<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginPage.aspx.cs" MasterPageFile="~/Main.Master"
    Inherits="Tavisca.PMD.Client.LoginPage" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/LoginPage.css" />
</asp:Content>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="MainContent">
    <form id="Form1" runat="server">
    <div class="Sign-in">
        <div class="signin-box">
            <h2>
                Sign in <strong></strong>
            </h2>
            <div class="email-div">
                <label for="Email">
                    <strong class="email-label">Username</strong></label>
                <input type="email" class="form-error" name="Email" id="Email" value="" />
            </div>
            <div class="passwd-div">
                <label for="Passwd">
                    <strong class="passwd-label">Password</strong></label>
                <input type="password" name="Passwd" id="Passwd" />
            </div>
            <input type="submit" class="g-button g-button-submit" name="signIn" id="signIn" value="Sign in" />
        </div>
    </div>
    <div class="SignIn-Options">
        <div class="signin-box">
            <p>
                <asp:HyperLink ID="RegisterHyperLink" runat="server" EnableViewState="false" NavigateUrl="~/Registration.aspx">Register</asp:HyperLink>
                if you don't have an account.
            </p>
            <a href="CompanyRegistration.aspx">Register Company</a>
            <p>
                <asp:HyperLink ID="ForgotPasswordHyperLink" runat="server" EnableViewState="false"
                    NavigateUrl="~/ForgotPassword.aspx">Forgot password</asp:HyperLink>
            </p>
        </div>
    </div>
    </form>
</asp:Content>
