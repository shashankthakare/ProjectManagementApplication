var ServerAddress = "";
$(document).ready(function () {
    Global();
});
var Global = function () {
    ready();
    this.counterForNewTeams = 1000;
    function ServiceSucceeded(teams) {
        var NumberOfTeams = teams.length;
        var i = 0;
        $('#teamsContainer').append('<div Id="Header"class="button-row"style="height:30pt;width:100%;float:left;margin-right:10px; margin-bottom:10px;text-align:center;color:White;font-size:large"></div>');
        $('#Header').append('<asp:Label class="UserNameTitle" Id="UserNameLabel" runat="server" >Team Name</asp:Label>');
        for (i = 0; i < NumberOfTeams; i++) {
            var teamName = teams[i].TeamName;
            var teamID = teams[i].TeamID;
            $('#teamsContainer').append('<div class="Userdata button-row" Id="teamID' + teamID + '"style="height:20pt;width:99%;float:left;margin-right:10px; margin-bottom:5px;text-align:center;color:White;font-size:large"></div>');
            $("#teamID" + teamID).append('<div Id="UserName" class="UserName " data-id="' + teamID + '" runat="server">' + teamName + '</div>');
            $("#teamID" + teamID).append('<asp:Button class="DeleteButton" Id="DeleteButton' + teamID + '" runat="server" style="width:30px">X</asp:button>');
        }
    }
    function ServiceFailed(result) {
        alert("Error:");
    }
    function CallAjax(varUrl, vartype) {
        $.ajax({
            cache: false,
            type: "GET",
            async: false,
            dataType: "json",
            url: varUrl,
            success: function (result) {
                ServiceSucceeded(result);
                teamsInDatabase = result;
            },
            error: function (result) {
                ServiceFailed(result);
            }
        });
    }
    function ServiceSucceededPost(result) {
        alert("Team Updated:");
    }
    function ServiceFailedPost(result) {
        alert("Error:");
    }
    function CallAjaxPost(varUrl, vartype, jData) {
        $.ajax({
            cache: false,
            type: vartype,
            async: false,
            dataType: "json",
            data: JSON.stringify(jData),
            contentType: "application/json",
            url: varUrl,
            success: function (result) {
                ServiceSucceededPost(result);
            },
            error: function (result) {
                ServiceFailedPost(result);
            }
        });
    }
    function ready() {
        var search_string = window.location.search.substring(1);
        var DashboardID = search_string.split("=");
        var incoming_dashboard_rights = {};
        var AutoCompleteList = {};
        var companyID = document.getElementById("companyID").value;
        var getTeams = ServerAddress + "TeamsOperations.svc/TeamsOperations/RetreiveTeams/" + companyID;
        this.teamsInDatabase = "";
        CallAjax(getTeams, "GET");
        $("#send").on("click", function () {
            var teams = [];
            var allTeams = $(".UserName").map(function () { return $(this).data("id"); }).get();
            var newTeams = $(".UserNameNew").map(function () { return $(this).data("name"); }).get();
            var deletedTeams = new Array();
            var dCount = 0;
            for (var i = 0; i < teamsInDatabase.length; i++) {
                if (jQuery.inArray(teamsInDatabase[i].TeamID, allTeams) == -1) {
                    deletedTeams[dCount++] = teamsInDatabase[i].TeamID;
                }
            }
            for (var l = 0; l < newTeams.length; l++) {
                teams.push({ TeamName: newTeams[l], CompanyID: companyID });
            }

            var jData = {};
            jData.teamsToAdd = teams;
            jData.deletedTeams = deletedTeams;
            var AddTeamUrl = ServerAddress + "TeamsOperations.svc/TeamsOperations/AddTeams";
            CallAjaxPost(AddTeamUrl, "POST", jData);
        });
        $(".AddToExistingList").click(function () {
            var teamNameEntered = document.getElementById("txtTeamName").value;
            if (teamNameEntered == "") {
                alert("Give a name to The Team");
                return false;
            }
            document.getElementById("txtTeamName").value = "";
            $('#teamsContainer').append('<div class="Userdata button-row" Id="teamID' + counterForNewTeams + '"style="height:20pt;width:99%;float:left;margin-right:10px; margin-bottom:5px;text-align:left;color:White;font-size:large"></div>');
            $("#teamID" + counterForNewTeams).append('<div Id="UserName" class="UserNameNew" data-name="' + teamNameEntered + '" runat="server">' + teamNameEntered + '</div>');
            $("#teamID" + counterForNewTeams).append('<asp:Button class="DeleteButton" Id="DeleteButton' + counterForNewTeams + '" runat="server" style="width:30px">X</asp:button>');
            counterForNewTeams++;
        });
        $(".DeleteButton").live("click", "button", function () {
            var UserDataId = $(this).parent().attr("id");
            $('#' + UserDataId).remove();
        });
    }
}