<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true"
    CodeBehind="CreateNewDashboardByExistingDashboard.aspx.cs" Inherits="TeamExpeditors.PMD.Client.CreateNewDashboardByExistingDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <link rel="stylesheet" type="text/css" href="Styles/CreateNewDashboard.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <form id="CreateDashboard" name="CreateDashboard" action="#" method="post" runat="server">
    <div class="Containerdiv">
        <br />
        <br />
        <div style="float: left; height: 100%; width: 45%; text-align: right">
            <asp:Label ID="Label1" Text="DashboardToBeCopied" runat="server"></asp:Label>
            <br />
            <br />
            <asp:Label ID="Label2" runat="server" Text="DashboardName"></asp:Label>
            <br />
            <br />
            <asp:Label ID="Label3" runat="server" Text="Description"></asp:Label>
        </div>
        <div style="float: left; height: 100%; width: 45%; text-align: left; margin-left: 30px">
            <asp:DropDownList ID="dashboard" runat="server">
                <asp:ListItem Value="nil">select a Dashboard</asp:ListItem>
            </asp:DropDownList>
            <br />
            <br />
            <asp:TextBox runat="server" ID="txtName" MaxLength="15"></asp:TextBox>
            <br />
            <br />
            <asp:TextBox runat="server" TextMode="MultiLine" ID="txtDescription"></asp:TextBox>
            <br />
            <div style="text-align: right; margin-right: 20px">
                <asp:Button ID="submit" runat="server" Text="create" class="button" OnClick="submit_Click" />
            </div>
        </div>
    </div>
    </form>
</asp:Content>
