<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserList.aspx.cs" MasterPageFile="~/Main.Master"
    Inherits="TeamExpeditors.PMD.Client.UserList" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="Scripts/UserList.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/UserList.css" />
</asp:Content>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="MainContent">
    <form id="Form1" runat="server">
    <div class="EditdashboardUserContainer" id="EditdashboardUserContainer">
    </div>
    </form>
</asp:Content>
