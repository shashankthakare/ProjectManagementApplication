<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DashboardItems.aspx.cs"
    Inherits="TeamExpeditors.PMD.Client.DashboardItems" MasterPageFile="~/Main.Master" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <title>Dashboard page</title>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/styleDashboardPopUp.css" />
    <link rel="stylesheet" type="text/css" media="all" href="fancybox/jquery.fancybox.css" />
    <link rel="stylesheet" type="text/css" media="all" href="Styles/DashboardGrid.css" />
    <link rel="stylesheet" id="themeCSS" href="jQRangeSlider-5.3.0/css/ithing.css" />
    <link rel="stylesheet" href="jQRangeSlider-5.3.0/demo/style.css" />
    <link rel="stylesheet" href="jQRangeSlider-5.3.0/demo/lib/jquery-ui/css/smoothness/jquery-ui-1.8.10.custom.css" />
    <link rel="stylesheet" type="text/css" media="all" href="fancybox/jquery.fancybox.css" />
    <link rel="stylesheet" type="text/css" media="all" href="Styles/Styles.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="Scripts/DashBoardItem.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="jQRangeSlider-5.3.0/demo/lib/jquery-ui/js/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="jQRangeSlider-5.3.0/lib/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="jQRangeSlider-5.3.0/jQAllRangeSliders-min.js"></script>
    <script type="text/javascript" src="fancybox/jquery.fancybox.js?v=2.0.6"></script>
    <script language="javascript" type="text/javascript">


    </script>
</asp:Content>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="MainContent">
    <form runat="server">
    <a class="button right " style="margin-bottom: 5px;" id="createItem" href="CreateItem.aspx?id=<%=dashboardID%>">
        Create Item</a>
    <div id="DashboardItemContainer" class="DashboardItemContainer">
        <div class="DashboardItemHeader button-row">
            <asp:Label runat="server" Text="Dashboard : " ID="LblDashboardNameLabel" class="LabelButton left"></asp:Label>
            <asp:Label runat="server" Text="" ID="LblDashboardName" class="LabelButton left"></asp:Label>
            <div class="horizontalSpaceDiv">
            </div>
            <div class="horizontalSpaceDiv">
            </div>
            <label id="WeekWidthLabel" class="WeekWidthInputLabel left">
                Insert Week Width</label>
            <input type="text" id="WeekWidth" class="WeekWidthInput left" value="100" onchange="return WeekWidth_onclick()" />
            <label id="PxLabel" class="PixelLabel left">
                Px</label>
            <div class="horizontalSpaceDiv">
            </div>
            <select id="FilterType" class="Filter">
                <option value="Nothing">Select a Option</option>
                <option value="StartDate">Start Date</option>
                <option value="EndDate">End Date</option>
            </select>
            <select id="selectTeams" class="Filter">
                <option value="0">Select Team</option>
            </select>
            <input type="text" id="teamsSelected" value="" size="30px" />
            <input type="hidden" id="teamsSelectedID" value="" />
        </div>
        <div>
            <div class="blankSpace">
            </div>
            <div class="DashboardItemGrid" id="DashboardItemGrid">
                <div id="wrapperGrid">
                    <div id="ItemnameWrapper" class="ItemnameWrapper">
                    </div>
                    <div class="WeekContainer" id="WeekContainer">
                        <div id="weekWrapper" class="weekWrapper">
                        </div>
                    </div>
                </div>
                <div style="text-align: center">
                    <input type="button" id="save" value="Save" class="button" style="width: 100px; height: 30px;
                        margin-top: 20px" /></div>
            </div>
        </div>
    </div>
    <input id="UserID" value="<%=UserID%>" type="hidden" />
    <input id="currentWeek" value="<%=currentWeek %>" type="hidden" />
    <input id="dashboardID" value="<%=dashboardID%>" type="hidden" />
    <input id="AccessRight" value="<%=AccessRight%>" type="hidden" />
    <input id="CompanyId" value="<%=CompanyId %>" type="hidden" />
    </form>
    <div id="inline">
    </div>
</asp:Content>
