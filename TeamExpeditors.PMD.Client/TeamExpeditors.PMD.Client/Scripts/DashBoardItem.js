function ServiceSucceeded(result,functionName) {
    if (functionName == "updateItems")
        alert("Items Updated");
}
function ServiceFailed(result) {
     alert("Error:");
}
function ServiceSucceededGet(result) {
  
}
function ServiceFailedGet(result) {
     alert("Error:");
}
function CallAjaxGet(varUrl, vartype,callingFunction) {
    $.ajax({
        cache: false,
        type: vartype,
        async: false,
        dataType: "json",
        url: varUrl,
        success: function (result) {
            ServiceSucceededGet(result);
            if (callingFunction == "GetTeams")
                GetTeams = result;
            else
                GetResult = result;
        },
        error: function (result) {
            ServiceFailedGet(result);
        }
    });
}
function CallAjax(varUrl, vartype, jData,functionName) {
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
        },
        error: function (result) {
            ServiceFailed(result);
        }
    });
}
function documentReady() {
    
    var NumberOfDashweeks = 53;
    var NumberofDashboardItems = GetResult.length;
    var DashboardItemName = "";
    var workingTeams = "";
    
    var currentWeekJs = document.getElementById("currentWeek").value;
    var WeekWidthByUser=document.getElementById("WeekWidth").value;
    var modifiedRowWidth=(WeekWidthByUser*53)+100;
    if((WeekWidthByUser<10) || (WeekWidthByUser>300))
   {
     return;
   }
    var j = 0;
    var i = 0;
    var k = 0;
    var currentDiv = parseInt(currentWeekJs) + 5;
    window.location.hash = '#' + currentDiv;
       var dashboardId = document.getElementById("dashboardID").value;

     document.getElementById('weekWrapper').setAttribute("style","width:"+(modifiedRowWidth+100)+"px");

    $('#wrapperGrid').append('<div class="ItemnameWrapper"></div>');
    $('#ItemnameWrapper').append('<div class="itemName">Dashboard Items </div>');
    for (i = 1; i <= NumberOfDashweeks; i++) {
        $('#weekWrapper').append('<div id=' + i + ' style="border:1px solid gray;width:'+WeekWidthByUser+'px;height:30px;float:left;text-align:center;background-color:#4b6c9e;color:white; padding:8px 0px 0px 0px;">Week ' + i + '</div>');
    }
    for (j = 1; j <= NumberofDashboardItems; j++) {
        DashboardItemName = GetResult[j - 1].ItemName;
        workingTeams="";
        for (var noOfWorkingTeams = 0; noOfWorkingTeams < GetResult[j - 1].WorkingTeams.length; noOfWorkingTeams++)
            workingTeams += "\n"+GetResult[j - 1].WorkingTeams[noOfWorkingTeams].TeamName + " ";
   
        $('#ItemnameWrapper').append('<div class="itemNameContent" id="itemNameContent' + j + '" title="TEAMS WORKING : '+workingTeams.toUpperCase()+'"><a href="CreateItem.aspx?id='+dashboardId+'&itemId='+GetResult[j - 1].ItemID+'"> <asp:Label runat="server" id="DashboardItemName">' + DashboardItemName + '</asp:Label> </a> </div>');
        $("#weekWrapper").append('<div class="clear"></div><div class="itemRow" id="itemRow' + j + '" style="width:'+(modifiedRowWidth+100)+'px;"></div>')
    }

for (k = 1; k <= 53; k++) {
        if (k == currentWeekJs)
            $('.itemRow').append('<div id=' + k + ' style="border: 1px solid gray;width:'+WeekWidthByUser+'px;height: 40px;float: left;text-align: center;z-index:-1;opacity:0.5;"></div>');
        else
            $('.itemRow').append('<div id=' + k + ' style="border: 1px solid gray;width:'+WeekWidthByUser+'px;height: 40px;float: left;text-align: center;z-index:-1;opacity:0.5;"></div>');
    }

    for (var itemCount = 1; itemCount <= NumberofDashboardItems; itemCount++) {
        var startDate = new Date(parseInt(GetResult[itemCount - 1].StartDate.substr(6)));
        var endDate = new Date(parseInt(GetResult[itemCount - 1].EndDate.substr(6)));
        var date = $("#itemRow".concat(itemCount));
        var statusColor = GetResult[itemCount - 1].StatusColor;
        date.dateRangeSlider({
            defaultValues: {
                min: startDate,
                max: endDate
            },
            range: {
                min: { days: 0 },
                max: { days: 365 }
            },
            bounds: {
                min: new Date(2012, 11, 31),
                max: new Date(2014, 0, 1)
            },
            valueLabels: "change",
            delayOut: 2000

        });

        $("#itemRow".concat(itemCount)).find('.ui-rangeSlider-bar').css("background-color", "#"+statusColor);
    }
    $(".modalbox").fancybox();
    $('#' + currentWeekJs).addClass("colorGreen");
    $(function () {
        $("#from").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3,
            onClose: function (selectedDate) {
                $("#to").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3,
            onClose: function (selectedDate) {
                $("#from").datepicker("option", "maxDate", selectedDate);
            }
        });
    });
}
var ServerAddress = "";
$(document).ready(function () {
    $(".modalbox").fancybox();
    var AccessRight = document.getElementById("AccessRight").value;
    if (AccessRight == "READ") {
        $("#DashboardItemContainer").append("<div class=\"overlay\"></div>");
        $("#createItem").hide();
    }
    this.GetResult = "";
    this.GetTeams = "";
    var search_string = window.location.search.substring(1);
    var DashboardID = search_string.split("=");
    var CompanyId = document.getElementById("CompanyId").value;
    var GetTeamsUrl = ServerAddress + "TeamsOperations.svc/TeamsOperations/RetreiveTeams/" + CompanyId;
    CallAjaxGet(GetTeamsUrl, "GET", "GetTeams");
    var newOption = "";
    for (var i = 0; i < GetTeams.length; i++) {
        newOption = "<option value='" + GetTeams[i].TeamID + "'>" + GetTeams[i].TeamName + "</option>";
        $("#selectTeams").append(newOption);
    }
    var TeamIDsToFilter = "";
    for (var i = 0; i < GetTeams.length; i++)
        TeamIDsToFilter = TeamIDsToFilter + ',' + GetTeams[i].TeamID;
    var GetItemsUrl=""
    if (TeamIDsToFilter=="")
        GetItemsUrl = ServerAddress + 'DashboardService.svc/DashboardItemOperations/RetreiveExistingDashboardItems/id=' + DashboardID[1] + '&sortBy=Nothing';
    else
        GetItemsUrl = ServerAddress + 'DashboardService.svc/DashboardItemOperations/RetreiveExistingDashboardItemsByTeamID/id=' + DashboardID[1] + '&TeamID=' + TeamIDsToFilter + '&sortBy=Nothing';
    CallAjaxGet(GetItemsUrl, "GET", "GetResult");
    if (GetResult.length == 0) {
        $("#DashboardItemContainer").empty();
        $("#DashboardItemContainer").append("<div>You Have not Created any Item for this Dashboard....create An Item</div>");
        if (AccessRight == "READ") {
            $("#DashboardItemContainer").append("<div class=\"overlay\"></div>");
            $("#createItem").hide();
        }
        return false;
    }
    documentReady();

    $("#save").on("click", function () {
        var NumberofDashboardItems = GetResult.length;
        for (var itemCount = 1; itemCount <= NumberofDashboardItems; itemCount++) {
            var date = $("#itemRow".concat(itemCount));
            var dateValues = date.dateRangeSlider("values");
            var from = new Date(dateValues.min);
            GetResult[itemCount - 1].StartDate = "/Date(" + from.getTime() + ")/";
            var to = new Date(dateValues.max);
            GetResult[itemCount - 1].EndDate = "/Date(" + to.getTime() + ")/";
        }
        var jData = {};
        jData.modified = GetResult;
        var updateItemsUrl = ServerAddress + "DashboardService.svc/DashboardItemOperations/ModifyDashboardItem";
        CallAjax(updateItemsUrl, "PUT", jData, "updateItems");
    });
  
    $("#FilterType").change(function () {
        var selectedOption = $("#FilterType").val();
        TeamIDsToFilter = document.getElementById("teamsSelectedID").value;
        if (TeamIDsToFilter == "") {
            for (var i = 0; i < GetTeams.length; i++)
                TeamIDsToFilter = TeamIDsToFilter + ',' + GetTeams[i].TeamID;

        }
        TeamIDsToFilter = TeamIDsToFilter.substring(0, TeamIDsToFilter.length - 1);
        var search_string = window.location.search.substring(1);
        var DashboardID = search_string.split("=");
        var GetItems = ServerAddress + 'DashboardService.svc/DashboardItemOperations/RetreiveExistingDashboardItemsByTeamID/id=' + DashboardID[1] + '&TeamID=' + TeamIDsToFilter + '&sortBy=' + selectedOption;
        CallAjaxGet(GetItems, "GET", "GetResult");
        $('#ItemnameWrapper').empty();
        $('#weekWrapper').empty();
        documentReady();
    });
    $("#selectTeams").change(function () {
        var selectedTeamID = $("#selectTeams").val();
        var selectedTeamName = $("#selectTeams option:selected").text();
        if (selectedTeamID != "") {
            document.getElementById("teamsSelected").value += selectedTeamName + ',';
            document.getElementById("teamsSelectedID").value += selectedTeamID + ',';
        }
        var TeamIDsToFilter = document.getElementById("teamsSelectedID").value;
        if (TeamIDsToFilter == "") {
            for (var i = 0; i < GetTeams.length; i++)
                TeamIDsToFilter += GetTeams[i].TeamID + ',';
        }
        TeamIDsToFilter = TeamIDsToFilter.substring(0, TeamIDsToFilter.length - 1);
        var selectedOption = $("#FilterType").val();
        var search_string = window.location.search.substring(1);
        var DashboardID = search_string.split("=");
        var GetItems = ServerAddress + 'DashboardService.svc/DashboardItemOperations/RetreiveExistingDashboardItemsByTeamID/id=' + DashboardID[1] + '&TeamID=' + TeamIDsToFilter + '&sortBy=' + selectedOption;
        CallAjaxGet(GetItems, "GET", "GetResult");
        $('#ItemnameWrapper').empty();
        $('#weekWrapper').empty();
        if (GetResult.length == 0) {
            $("#DashboardItemGrid").hide();
            $("#DashboardItemContainer").append("<div>You Have no item.. for the selected Team </div>");
            return false;
        }
        $("#DashboardItemGrid").show();
        documentReady();
    });
    $("#WeekWidth").change(function () {
        $('#ItemnameWrapper').empty();
        $('#weekWrapper').empty(); documentReady();
    });
    $("#teamsSelected").change(function () {
        document.getElementById("teamsSelected").value = "";
        document.getElementById("teamsSelectedID").value = "";
        $('select option[value="0"]').attr("selected", true);
    });
});