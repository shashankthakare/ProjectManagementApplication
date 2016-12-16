<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CreateNewDashboard.aspx.cs"
    MasterPageFile="~/Main.Master" Inherits="TeamExpeditors.PMD.Client.CreateNewDashboard" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="Scripts/DashboardHome.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/styleDashboardPopUp.css" />
    <link rel="stylesheet" type="text/css" media="all" href="fancybox/jquery.fancybox.css" />
    <link rel="stylesheet" type="text/css" href="Styles/CreateNewDashboard.css" />
    <script type="text/javascript" src="fancybox/jquery.fancybox.js?v=2.0.6"></script>
    <script type="text/javascript" src="Scripts/custom.js"></script>
</asp:Content>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="MainContent">
    <form id="CreateDashboard" name="CreateDashboard" action="#" method="post" runat="server">
    <div id="FieldsetContainerdiv" class="FieldsetContainerdiv">
        <a href="CreateNewDashboardByExistingDashboard.aspx" class="button" style="margin-right: 75px">
            Duplicate Dashboard</a>
        <fieldset class="NewDashboard">
            <legend>Create your Dashboard</legend>
            <div class="LabelContainer">
                <label for="dashboardName" style="height: 20px">
                    <span class="required">*</span> Enter Dashboard Name</label>
                <div class="spacewithinlabel">
                </div>
                <label for="comments">
                    <span class="required">*</span>Start Month</label>
                <div class="spacewithinlabel">
                </div>
                <label for="comments">
                    <span class="required">*</span>Start Year</label>
                <div class="spacewithinlabel">
                </div>
                <label for="comments">
                    <span class="required">*</span>End Month</label>
                <div class="spacewithinlabel">
                </div>
                <label for="comments">
                    <span class="required">*</span>End Year</label>
                <div class="spacewithinlabel">
                </div>
                <label for="comments">
                    <span class="required"></span>Description</label>
            </div>
            <div class="TextContainer">
                <asp:TextBox ID="dashboardName" class="txt" runat="server" MaxLength="15"></asp:TextBox>
                <div class="space">
                </div>
                <asp:DropDownList runat="server" ID="startMonth" class="DateDropDown">
                    <asp:ListItem Value="1">1</asp:ListItem>
                    <asp:ListItem Value="2">2</asp:ListItem>
                    <asp:ListItem Value="3">3</asp:ListItem>
                    <asp:ListItem Value="4">4</asp:ListItem>
                    <asp:ListItem Value="5">5</asp:ListItem>
                    <asp:ListItem Value="6">6</asp:ListItem>
                    <asp:ListItem Value="7">7</asp:ListItem>
                    <asp:ListItem Value="8">8</asp:ListItem>
                    <asp:ListItem Value="9">9</asp:ListItem>
                    <asp:ListItem Value="10">10</asp:ListItem>
                    <asp:ListItem Value="11">11</asp:ListItem>
                    <asp:ListItem Value="12">12</asp:ListItem>
                </asp:DropDownList>
                <div class="space">
                </div>
                <asp:TextBox ID="startYear" runat="server" class="txt"></asp:TextBox>
                <div class="space">
                </div>
                <asp:DropDownList ID="endMonth" class="DateDropDown" runat="server">
                    <asp:ListItem Value="1">1</asp:ListItem>
                    <asp:ListItem Value="2">2</asp:ListItem>
                    <asp:ListItem Value="3">3</asp:ListItem>
                    <asp:ListItem Value="4">4</asp:ListItem>
                    <asp:ListItem Value="5">5</asp:ListItem>
                    <asp:ListItem Value="6">6</asp:ListItem>
                    <asp:ListItem Value="7">7</asp:ListItem>
                    <asp:ListItem Value="8">8</asp:ListItem>
                    <asp:ListItem Value="9">9</asp:ListItem>
                    <asp:ListItem Value="10">10</asp:ListItem>
                    <asp:ListItem Value="11">11</asp:ListItem>
                    <asp:ListItem Value="12">12</asp:ListItem>
                </asp:DropDownList>
                <div class="space">
                </div>
                <asp:TextBox ID="endYear" class="txt" runat="server" OnTextChanged="endYear_TextChanged"></asp:TextBox>
                <div class="space">
                </div>
                <textarea name="Description" id="Description" class="txtarea" rows="3" cols=""></textarea>
                <br />
                <br />
                <div style="text-align: right">
                    <button id="send" class="button" style="margin-right: 30px">
                        Next</button>
                </div>
            </div>
            <div>
                <asp:Label ID="displayWeeks" Text="" runat="server"></asp:Label>
            </div>
        </fieldset>
        <div>
            <asp:TextBox ID="SDate" class="txt" runat="server" type="hidden"></asp:TextBox>
            <asp:TextBox ID="EDate" class="txt" runat="server" type="hidden"></asp:TextBox>
        </div>
    </div>
    <input id="UserID" value="<%=UserId %>" type="hidden" />
    </form>
</asp:Content>
