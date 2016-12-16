function EditItemCall(result) {
    document.getElementById("dashboardItemName").value = result.ItemName;
    var from = new Date(parseInt(result.StartDate.substr(6)));
   document.getElementById("from").value = from.getDate() + "/" + (from.getMonth()+1) + "/" + from.getFullYear();
    var to= new Date(parseInt(result.EndDate.substr(6)));
    document.getElementById("to").value = to.getDate()+ "/" + (to.getMonth()+1) + "/" + to.getFullYear();
    $('select option[value="' + result.StatusID + '"]').attr("selected", true);
    for (var i = 0; i < result.Sources.length; i++) {
        var selectedSourceID = result.Sources[i].SourceID;
        var selectedSourceText = result.Sources[i].Source;
        var newSource = '<div class="source" id="source' + selectedSourceID + '" data-id="' + selectedSourceID + '" style="margin-bottom:5px;">' + selectedSourceText + '</div>';
        $("#SourceAdded").append(newSource);
        $("#source" + selectedSourceID).append('<asp:Button class="DeleteButton deleteButtonOnCreateItem" Id="DeleteButton' + selectedSourceID + '" runat="server">X</asp:button>');
    }
    for (var i = 0; i < result.WorkingTeams.length; i++) {
        var selectedTeamID = result.WorkingTeams[i].TeamID;
        var selectedTeamText = result.WorkingTeams[i].TeamName;
        var newSource = '<div class="team" id="team' + selectedTeamID + '" data-id="' + selectedTeamID + '" style="margin-bottom:5px;">' + selectedTeamText + '</div>';
        $("#teamsAdded").append(newSource);
        $("#team" + selectedTeamID).append('<asp:Button class="DeleteButton deleteButtonOnCreateItem" Id="DeleteButton' + selectedTeamID + '" runat="server">X</asp:button>');
    }
}
function GetTeams(GetTeams) {
    var newOption = "";
    for (var i = 0; i < GetTeams.length; i++) {
        newOption = "<option value='" + GetTeams[i].TeamID + "'>" + GetTeams[i].TeamName + "</option>";
        $("#teams").append(newOption);
    }
}
function GetStatusList(GetStatusList) {
    var newOption = "";
    for (var i = 0; i < GetStatusList.length; i++) {
        newOption = "<option value='" + GetStatusList[i].StatusID + "'>" + GetStatusList[i].Status + "</option>";
        $("#itemStatus").append(newOption);
    }
}
function GetSourcesList(GetSourcesList) {
    var newOption = "";
    for (var i = 0; i < GetSourcesList.length; i++) {
        newOption = "<option value='" + GetSourcesList[i].SourceID + "'>" + GetSourcesList[i].Source + "</option>";
        $("#sources").append(newOption);
    }
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

            if (functionName == "GetTeams")
                GetTeams(result);
            else if (functionName == "GetStatusList")
                GetStatusList(result);
            else if (functionName == "GetSourcesList")
                GetSourcesList(result);
            else if (functionName == "EditItemCall")
                EditItemCall(result);
            else if (functionName == "deleteDashboardItem")
                alert("sucessFully Deleted");
        },
        error: function (result) {
            //ServiceFailed(result, functionName);
            alert("error");
        }
    });
}
function GetAllTeamsInCompany() {
    var CompanyId = document.getElementById("CompanyId").value;
    var GetTeamsUrl = ServerAddress + "TeamsOperations.svc/TeamsOperations/RetreiveTeams/" + CompanyId;
    var jData = {};
    CallAjax(GetTeamsUrl, "GET", jData, "GetTeams");
}
function GetStatusListOfDashboard(DashboardID) {

    var GetStatusListUrl = ServerAddress + "DashboardService.svc/DashboardItemOperations/GetStatusList/" + DashboardID;
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
    var urlData = window.location.search.substring(1).split("&");
    var dashboardID = "";
    var item = {};
    var itemID = "";
    if (urlData.length == 2) {
        DashboardID = urlData[0].split("=")[1];
        itemID = urlData[1].split("=")[1];
        item.ItemID = itemID;
        var jData = {};
        GetAllTeamsInCompany();
        GetStatusListOfDashboard(DashboardID);
        GetSourcesListOfDashboard(DashboardID);
        var GetItemUrl = ServerAddress+'DashboardService.svc/DashboardItemOperations/RetreiveDashboardItem/id=' + itemID;
        CallAjax(GetItemUrl, "GET", jData, "EditItemCall");
    }
    else {
        item.ItemID = 0;
        DashboardID = urlData[0].split("=")[1];
        GetAllTeamsInCompany();
        GetStatusListOfDashboard(DashboardID);
        GetSourcesListOfDashboard(DashboardID);
        $("#deleteItem").hide();
    }
    $("#sources").change(function () {
        var selectedSourceID = $("#sources").val();
        if (selectedSourceID == "")
            return false;
        var selectedSourceText = $("#sources option:selected").text();
        var sourceIDs = $(".source").map(function () { return $(this).data("id"); }).get();
        if (jQuery.inArray(parseInt(selectedSourceID), sourceIDs) == -1) {
            var newSource = '<div class="source" id="source' + selectedSourceID + '" data-id="' + selectedSourceID + '" style="margin-bottom:5px;">' + selectedSourceText + '</div>';
            $("#SourceAdded").append(newSource);
            $("#source" + selectedSourceID).append('<asp:Button class="DeleteButton" Id="DeleteButton' + selectedSourceID + '" runat="server" style="width:30px;margin-bottom:5px;float:right;">X</asp:button>');
        }
    });
    $("#teams").change(function () {
        var selectedTeamID = $("#teams").val();
        if (selectedTeamID == "")
            return false;
        var selectedTeamText = $("#teams option:selected").text();
        var teams = $(".team").map(function () { return $(this).data("id"); }).get();
        if (jQuery.inArray(parseInt(selectedTeamID), teams) == -1) {
            var newTeam = '<div class="team" id="team' + selectedTeamID + '" data-id="' + selectedTeamID + '" style="margin-bottom:5px;">' + selectedTeamText + '</div>';
            $("#teamsAdded").append(newTeam);
            $("#team" + selectedTeamID).append('<asp:Button class="DeleteButton" Id="DeleteButton' + selectedTeamID + '" runat="server" style="width:30px;margin-bottom:5px;float:right;">X</asp:Button>');
        }
    });
    $("#send").on("click", function () {
        item.ItemName = $("#dashboardItemName").val();
        var ddmmFormatString = $("#from").val().split("/");
        var from = new Date(ddmmFormatString[1] + "/" + ddmmFormatString[0] + "/" + ddmmFormatString[2]);
        ddmmFormatString = $("#to").val().split("/");
        var to = new Date(ddmmFormatString[1] + "/" + ddmmFormatString[0] + "/" + ddmmFormatString[2]); 
        item.StartDate = "/Date(" + (from.getTime() + 86400000) + ")/";
        item.EndDate = "/Date(" + (to.getTime() + 86400000) + ")/";
        item.DashboardID = DashboardID;
        item.StatusID = $("#itemStatus").val();
        var sourceIDs = $(".source").map(function () { return $(this).data("id"); }).get();
        var teams = $(".team").map(function () { return $(this).data("id"); }).get();
        var jData = {};
        jData.Item = item;
        jData.Sources = sourceIDs;
        jData.WorkingTeams = teams;
        var CreateDashboardItemUrl = ServerAddress + "DashboardService.svc/DashboardItemOperations/AddDashboardItem";
        CallAjax(CreateDashboardItemUrl, "POST", jData, "AddDashboardItem");
        window.location.href = "DashboardItems.aspx?id=" + DashboardID;
        return false;
    });
    $(".DeleteButton").live("click", "button", function () {
        var UserDataId = $(this).parent().attr("id");
        $('#' + UserDataId).remove();
    });
    $("#deleteItem").on("click", function () {
        var deleteDashboardItemUrl = ServerAddress + "DashboardService.svc/DashboardItemOperations/deleteDashboardItem";
        var jData = {};
        jData.itemID = itemID;
        CallAjax(deleteDashboardItemUrl, "POST", jData, "deleteDashboardItem");
        window.location.href = "DashboardItems.aspx?id=" + DashboardID;
        return false;
    });
});
