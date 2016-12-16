<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DashboardHome.aspx.cs"
    MasterPageFile="~/Main.Master" Inherits="TeamExpeditors.PMD.Client.DashboardHome" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="Scripts/DashboardHome.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/styleDashboardPopUp.css" />
    <link rel="stylesheet" type="text/css" media="all" href="fancybox/jquery.fancybox.css" />
    <script type="text/javascript" src="fancybox/jquery.fancybox.js?v=2.0.6"></script>
    <script type="text/javascript" src="Scripts/custom.js"></script>
</asp:Content>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="MainContent">
    <div class="DashBoardHeader">
        <asp:Label runat="server" ID="lblDashboardHeader" Text="" CssClass="LabelFont left"></asp:Label>
        <div class="SpaceDiv">
        </div>
    </div>
    <div class="Space30">
    </div>
    <div id="DashContainer" class="DashboardContainer" runat="server">
    </div>
    <div id="wrapper">
    </div>
    <input id="UserID" value="<%=UserId %>" type="hidden" />
</asp:Content>
