<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditDashboardUser.aspx.cs"
    MasterPageFile="~/Main.Master" Inherits="TeamExpeditors.PMD.Client.EditDashboardUser" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="Scripts/DashboardItemTeams.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/DashboardItemTeams.css" />
    <link rel="stylesheet" type="text/css" media="all" href="fancybox/jquery.fancybox.css" />
    <script type="text/javascript" src="fancybox/jquery.fancybox.js?v=2.0.6"></script>
    <script type="text/javascript" src="Scripts/jquery.tokeninputteam.js"></script>
</asp:Content>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="MainContent">
    <div class="textarea" style="width: 400px; height: auto; margin-bottom: 20px; margin-left: 450px;
        text-align: center">
        <label>
            Edit Teams Here</label>
        <input type="text" id="AddUserTextArea" class="addUser" name="blah" style="margin-bottom: 5px;" />
        <input type="button" value="Add Teams To Item" class="AddToExistingList button" />
    </div>
    <form id="Form1" runat="server">
    <div class="EditdashboardUserContainer" id="EditdashboardUserContainer">
        <div id="inline">
        </div>
    </div>
    </form>
    <input id="CompanyId" value="<%=CompanyId %>" type="hidden" />
</asp:Content>
