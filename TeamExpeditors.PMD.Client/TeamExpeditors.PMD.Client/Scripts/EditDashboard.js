function GetStatusList(GetStatusList) {
    this.StatusList = GetStatusList;
    var newOption = "";
    for (var i = 0; i < GetStatusList.length; i++) {
        newOption = '<div style="margin-top:5px" class="Status" id="Status' + GetStatusList[i].StatusID + '" data-id="' + GetStatusList[i].StatusID + '" data-name="' + GetStatusList[i].Status + '" data-color="' + GetStatusList[i].Color + '">' + GetStatusList[i].Status + '<div style="background-color:#' + GetStatusList[i].Color + ';"  class="StatusColorCss"> </div></div>';
        $("#StatusAdded").append(newOption);
        $("#Status" + GetStatusList[i].StatusID).append('<asp:Button class="DeleteButton" Id="DeleteButton' + GetStatusList[i].StatusID + '" runat="server" style="float:right;width:25px">X</asp:button>');
    }
}
function GetSourcesList(GetSourcesList) {
    this.SourcesList = GetSourcesList;
    var newOption = "";
    for (var i = 0; i < GetSourcesList.length; i++) {
        newOption = '<div class="Source" id="Source' + GetSourcesList[i].SourceID + '" data-id="' + GetSourcesList[i].SourceID + '" data-name="' + GetSourcesList[i].Source + '" >' + GetSourcesList[i].Source + '</div>';
        $("#SourcesAdded").append(newOption);
        $("#Source" + GetSourcesList[i].SourceID).append('<asp:Button class="DeleteButton" Id="DeleteButton' + GetSourcesList[i].SourceID + '" runat="server" style="float:right;width:25px">X</asp:button>');
    }
}
function EditDashboard() {
    alert("Dashboard Edited Successfully");
    window.location.href = "DashboardHome.aspx";
}
function deleteDashboard() {

    
}
function ServiceSucceeded(result, functionName) {
    
}
function ServiceFailed(result, functionName) {
    alert("Error:Source/Status You are trying to delete is referenced by some items");
}
function CallAjax(varUrl, vartype, jData, functionName) {
    $.ajax({
        cache: false,
        type: vartype,
        async: false,
        dataType: "json",
        data: JSON.stringify(jData),
        contentType: "application/json",
        url: varUrl,
        success: function (result) {
            ServiceSucceeded(result, functionName);
            if (functionName == "GetTeams")
                GetTeams(result);
            else if (functionName == "GetStatusList")
                GetStatusList(result);
            else if (functionName == "GetSourcesList")
                GetSourcesList(result);
            else if (functionName == "EditItemCall")
                EditItemCall(result);
            else if (functionName == "EditDashboard")
                EditDashboard();
            else if (functionName == "deleteDashboard")
                deleteDashboard(result);
        },
        error: function (result) {
            ServiceFailed(result, functionName);
        }
    });
}
function GetStatusListOfDashboard(DashboardID) {
    var GetStatusListUrl = ServerAddress+"DashboardService.svc/DashboardItemOperations/GetStatusList/" + DashboardID;
    var jData = {};
    CallAjax(GetStatusListUrl, "GET", jData, "GetStatusList");
}
function GetSourcesListOfDashboard(DashboardID) {
    var GetSourcesListUrl = ServerAddress + "DashboardService.svc/DashboardItemOperations/GetSourcesList/" + DashboardID;
    var jData = {};
    CallAjax(GetSourcesListUrl, "GET", jData, "GetSourcesList");
}
var ServerAddress = "";
$(document).ready(function () {
    $("#pickerPanel").hide();
    Global();
});
var Global = function () {
    var urlData = window.location.search.substring(1).split("=");
    var dashboardID = urlData[1];
    GetSourcesListOfDashboard(dashboardID);
    GetStatusListOfDashboard(dashboardID);
    var AccessRight = document.getElementById("AccessRight").value;
    if (AccessRight == "READ" || AccessRight == "WRITE") {
        $("#CreateDashboard").append("<div class=\"overlay\"></div>");
    }
    $("#send").on("click", function () {
        var editDashboardUrl = ServerAddress + "DashboardService.svc/DashboardOperations/EditDashboard";
        var dash = {};
        dash.DashboardName = $("#MainContent_dashboardName").val();
        dash.StartMonth = $("#MainContent_startMonth").val();
        dash.StartYear = $("#MainContent_startYear").val();
        dash.EndMonth = $("#MainContent_endMonth").val();
        dash.EndYear = $("#MainContent_endYear").val();
        dash.Description = $("#MainContent_Description").val();
        dash.DashboardId = dashboardID;

        var allSource = $(".Source").map(function () { return $(this).data("name"); }).get();
        var newSource = $(".SourceNew").map(function () { return $(this).data("name"); }).get();
        var deletedSource = new Array();
        var dCount = 0;
        for (var i = 0; i < SourcesList.length; i++) {
            if (jQuery.inArray(SourcesList[i].Source, allSource) == -1) {
                deletedSource[dCount++] = SourcesList[i].SourceID;
            }
        }
        var allStatus = $(".Status").map(function () { return $(this).data("id"); }).get();
        var newStatusName = $(".StatusNew").map(function () { return $(this).data(); }).get();
        var deletedStatus = new Array();
        dCount = 0;
        for (var i = 0; i < StatusList.length; i++) {
            if (jQuery.inArray(StatusList[i].StatusID, allStatus) == -1) {
                deletedStatus[dCount++] = StatusList[i].StatusID;
            }
        }
        var newStatus = [];
        for (var i = 0; i < newStatusName.length; i++) {
            newStatus.push({ Status: newStatusName[i].name, Color: newStatusName[i].color });
        }
        var jData = {};
        jData.dashboardDetails = dash;
        jData.UserDetails = document.getElementById("UserID").value; ;
        jData.newSource = newSource;
        jData.newStatus = newStatus;
        jData.deletedSource = deletedSource;
        jData.deletedStatus = deletedStatus;
        CallAjax(editDashboardUrl, "POST", jData, "EditDashboard");
        return false;
    });
    this.CounterForNewItem = 1;  //id needed to delete button
    $("#addSource").on("click", function () {
        var newSource = document.getElementById("txtaddSource").value;
        if (newSource == "") {
            alert("Write A Source Name");
            return false;
        }
        var sourceExist = $(".Source").map(function () { return $(this).data("name"); }).get().concat($(".SourceNew").map(function () { return $(this).data("name"); }).get());
        var newOption = "";
        if (jQuery.inArray(newSource, sourceExist) == -1) {
            newOption = '<div class="SourceNew" id="SourceNew' + CounterForNewItem + '" data-id="New' + CounterForNewItem + '" data-name="' + newSource + '">' + newSource + '</div>';
            $("#SourcesAdded").append(newOption);
            $("#SourceNew" + CounterForNewItem).append('<asp:Button class="DeleteButton" Id="DeleteButtonNew' + CounterForNewItem + '" runat="server" style="float:right;width:25px">X</asp:button>');
            CounterForNewItem++;
            document.getElementById("txtaddSource").value = "";
        }
        else
            alert("same Source Name exist");
    });
    $("#addStatus").on("click", function () {
        var newStatus = document.getElementById("txtaddStatus").value;
        var newColor = document.getElementById("pickerhexval").value;
        if (newStatus == "") {
            alert("Write A Status Name");
            return false;
        }
        if (newColor == "") {
            alert("Please Provide a Color");
            return false;
        }
        var StatusExist = $(".Status").map(function () { return $(this).data("name"); }).get().concat($(".StatusNew").map(function () { return $(this).data("name"); }).get());
        var newOption = "";
        if (jQuery.inArray(newStatus, StatusExist) == -1) {
            newOption = '<div class="StatusNew" id="StatusNew' + CounterForNewItem + '" data-id="New' + CounterForNewItem + '" data-name="' + newStatus + '" data-color="' + newColor + '">' + newStatus + '<div style="background-color:#' + newColor + ';" class="StatusColorCss"></div></div>';
            $("#StatusAdded").append(newOption);
            $("#StatusNew" + CounterForNewItem).append('<asp:Button class="DeleteButton" Id="DeleteButtonNew' + CounterForNewItem + '" runat="server" style="float:right;width:25px;margin-left:10px">X</asp:button>');
            CounterForNewItem++;
            document.getElementById("txtaddStatus").value = "";
            $("#pickerSwatch").css("background-color", "#FFFFFF");
            document.getElementById("pickerhexval").value = "FFFFFF";
        }
        else
            alert("same Source Name exist");
    });
    $(".DeleteButton").live("click", "button", function () {
        var UserDataId = $(this).parent().attr("id");
        $('#' + UserDataId).remove();
    });
    $("#deletedashboard").on("click", function () {
        var x;
        var r = confirm("Are you sure you want to delete dashboard?");
        if (r == true) {
            var deleteDashboardUrl = ServerAddress + "DashboardService.svc/DashboardOperations/deleteDashboard";
            var jData = {};
            jData.dashboardID = dashboardID;
            CallAjax(deleteDashboardUrl, "POST", jData, "deleteDashboard");
            window.location.href = "DashboardHome.aspx";
            return false;
        }
        else {
            return false;
        }

    });
    $("#pickerSwatch").on("click", function () {
        $("#pickerPanel").show();
    });
    $("#pickerPanel").on("mouseleave", function () {
        $("#pickerPanel").hide();
    });
}