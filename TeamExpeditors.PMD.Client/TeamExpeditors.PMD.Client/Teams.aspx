<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Teams.aspx.cs" MasterPageFile="~/Main.Master"
    Inherits="TeamExpeditors.PMD.Client.Teams" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
 <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="Scripts/Teams.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/EditdashboardUser.css" />
    <script type="text/javascript" src="Scripts/jquery.tokeninput.js"></script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
<div class="textarea" style="width: 400px; height: auto; margin-bottom:60px;">
<label>ADD TEAMS HERE...</label>
        <input type="text" id="txtTeamName" class="addUser" name="blah" style="width:275px;" />
        <input type="button" value="Add Teams" class="AddToExistingList button" />
    </div>
    <div class="margin-20"></div>
    <form id="form1" runat="server">
    <span class="failureNotification">
        <asp:Literal ID="ErrorMessage" runat="server"></asp:Literal>
    </span>
    <asp:ValidationSummary ID="RegisterUserValidationSummary" runat="server" CssClass="failureNotification"
        ValidationGroup="RegisterUserValidationGroup" />
    <div class="accountInfo">      
    </div>
    <div class="EditdashboardUserContainer" id="teamsContainer">
    </div>
    <div class="margin-20"></div>
    <div class="margin-20"></div>
    <input type="button" id="send" value="Submit" class="button" />
    </form>
    <input id="companyID" value="<%=companyID%>" type="hidden"/>
</asp:Content>
