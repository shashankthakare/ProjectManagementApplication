<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditDashboardDetails.aspx.cs" Inherits="Tavisca.PMD.Client.EditDashboard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="Scripts/DashboardSource.js"></script>
</head>
<body>
    <form id="form2" runat="server">
    <div>
    <asp:Label runat="server" Text="Dashboard Name ::  " ID="Name" CssClass="labelHeading" AutoGenerateEditButton="True"></asp:Label>
   <asp:TextBox runat="server" Text="" ID="dashboardName" CssClass="labelBody"></asp:TextBox><br />
  
   <asp:Label runat="server" Text="Description ::  " ID="Description" CssClass="labelHeading"></asp:Label>
   <asp:TextBox runat="server" Text="" ID="txtDescription" CssClass="labelBody"></asp:TextBox><br />
    <asp:Label runat="server" Text="Start Date ::  " ID="StartDate" CssClass="labelHeading"></asp:Label>
   <asp:TextBox runat="server" Text="" ID="txtStartDate" CssClass="labelBody"></asp:TextBox><br />
    <asp:Label runat="server" Text="End Date ::  " ID="EndDate" CssClass="labelHeading"></asp:Label>
   <asp:TextBox runat="server" Text="" ID="txtEndDate" CssClass="labelBody"></asp:TextBox><br />
   <asp:Label runat="server" Text="Edit Sources :: " ID="lblSource"></asp:Label>
   <asp:TextBox runat="server" ID="txtSources"></asp:TextBox>
   <asp:Button text="+" ID="addSource" runat="server"/>

   <div id="existingSources"></div>
    </div>
    </form>
</body>
</html>
