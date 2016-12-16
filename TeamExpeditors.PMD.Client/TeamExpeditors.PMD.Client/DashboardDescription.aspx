<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Main.Master" CodeBehind="DashboardDescription.aspx.cs"
    Inherits="TeamExpeditors.PMD.Client.DashboardDescription" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <title>jQuery UI Tabs - Collapse content</title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/DashboardGrid.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <form runat="server">
    <div>
        <asp:Label runat="server" Text="Dashboard Name ::  " ID="Name" CssClass="labelHeading"
            AutoGenerateEditButton="True"></asp:Label>
        <asp:Label runat="server" Text="" ID="LblDashboardName" name="dashboardName" CssClass="labelBody"></asp:Label><br />
        <asp:Label runat="server" Text="Description ::  " ID="Description" CssClass="labelHeading"></asp:Label>
        <asp:Label runat="server" Text="" ID="lblDescription" CssClass="labelBody"></asp:Label><br />
        <asp:Label runat="server" Text="Start Date ::  " ID="StartDate" CssClass="labelHeading"></asp:Label>
        <asp:Label runat="server" Text="" ID="lblStartDate" CssClass="labelBody"></asp:Label><br />
        <asp:Label runat="server" Text="End Date ::  " ID="EndDate" CssClass="labelHeading"></asp:Label>
        <asp:Label runat="server" Text="" ID="lblEndDate" CssClass="labelBody"></asp:Label>
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Edit" />
        <asp:Label runat="server" Text="Add Sources :: " ID="lblSource"></asp:Label>
        <asp:TextBox runat="server" ID="txtSources"></asp:TextBox>
        <asp:Button Text="+" ID="addSource" runat="server" />
        <br />
    </div>
    </form>
</asp:Content>
