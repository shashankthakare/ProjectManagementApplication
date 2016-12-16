function ServiceSucceeded(incoming_teams_and_items) {
    //alert("sucess from team ops get");
    window.incoming_teams_and_items = incoming_teams_and_items;
    console.log("length" + incoming_teams_and_items.Length);
    itemname_temporary = incoming_teams_and_items[0].ItemName;
    var teams = [];
    var TeamID = [];
    var team_variable = 0;
    var combine_var = 0;
    var one_div = {};
    var all_divs = new Array();
    for (k = 0; k < incoming_teams_and_items.length; k++) {
        if (incoming_teams_and_items[k].ItemName == itemname_temporary) {
            teams[team_variable] = incoming_teams_and_items[k].TeamName;
            TeamID[team_variable++] = incoming_teams_and_items[k].TeamID;
            if (k == incoming_teams_and_items.length - 1) {
                one_div.ItemName = incoming_teams_and_items[k].ItemName;
                one_div.Teams = teams;
                one_div.ItemID = incoming_teams_and_items[k].ItemID;
                one_div.TeamID = TeamID;
                all_divs[combine_var++] = one_div;
            }
        }
        else {
            itemname_temporary = incoming_teams_and_items[k].ItemName;
            one_div.ItemName = incoming_teams_and_items[k - 1].ItemName;
            one_div.Teams = teams;
            one_div.ItemID = incoming_teams_and_items[k - 1].ItemID;
            one_div.TeamID = TeamID;
            team_variable = 0;
            teams = [];
            TeamID = [];
            all_divs[combine_var++] = one_div;
            one_div = {};
            teams[team_variable] = incoming_teams_and_items[k].TeamName;
            TeamID[team_variable++] = incoming_teams_and_items[k].TeamID;
            if (k == incoming_teams_and_items.length - 1) {
                one_div.ItemName = incoming_teams_and_items[k].ItemName;
                one_div.Teams = teams;
                one_div.ItemID = incoming_teams_and_items[k].ItemID;
                one_div.TeamID = TeamID;
                all_divs[combine_var++] = one_div;
            }
        }
    }
    window.all_divs = all_divs;
    $('#EditdashboardUserContainer').append('<div Id="Header" class="button-row" style="height:30pt;width:98%;float:left;margin-right:10px; margin-bottom:10px; margin-top:10px; text-align:center;color:White;font-size:large"></div>');
    $('#Header').append('<asp:Label class="ItemNameTitle" Id="ItemNameLabel" runat="server" >Item Name</asp:Label>');
    $('#Header').append('<asp:Label class="EditButton" Id="DeleteLabel" runat="server" style="width:75px" ></asp:Label>');
    $('#Header').append('<asp:Label class="TeamsOnIt"style="float:right;margin-top:5px " Id="AccessRightsLabel" runat="server" >Teams working</asp:Label>');
    var NumberOfDashboardItems = all_divs.length;
    var external_count = 1;
    var TeamsString = "";
    for (var i = 0; i < NumberOfDashboardItems; i++) {

        var ItemName = all_divs[i].ItemName;
        var ItemId = all_divs[i].ItemID;
        var Teams = all_divs[i].Teams.toString();
        $('#EditdashboardUserContainer').append('<div class="Userdata button-row" Id="Userdata' + i + '"style="height:25pt;width:98%;float:left;margin-right:10px; margin-bottom:10px;text-align:center;color:White;font-size:large"></div>');
        $("#Userdata" + i).append('<div Id="ItemName" class="ItemName" data-id="' + ItemId + '" runat="server">' + ItemName + '</div>');
        $("#Userdata" + i).append('<asp:Button class="EditButton" Id="EditButton' + i + '" runat="server" style="border-style:outset;width:40px">Edit</asp:button>');
        $("#Userdata" + i).append('<asp:Label class="TeamsOnIt" Id="TeamsOnIt' + i + '" runat="server" >' + Teams + '</asp:Label>');
    }
}
function ServiceFailed(result) {
    alert("Error:");
}
function CallAjax(varUrl, vartype, jData) {
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        dataType: "json",
        url: varUrl,
        success: function (result) {
            var l = result.length;
            if(l>0)
                ServiceSucceeded(result);
        },
        error: function (result) {
            ServiceFailed(result);
        }
    });
}
function ServiceSucceededAutoComplete(AutoCompleteList) {
    $("#AddUserTextArea").tokenInput(AutoCompleteList);
}
function ServiceFailedAutoComplete(result) {
    alert("Error:autocomplete");}
function CallAjaxForAutoComplete(varUrl, vartype, jData) {
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        dataType: "json",
        url: varUrl,
        success: function (result) {
            ServiceSucceededAutoComplete(result);
        },
        error: function (result) {
            ServiceFailedAutoComplete(result);
        }
    });
}
function ServiceSucceededPost(result) {
    alert("sucess: ");
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
var ServerAddress = "";
$(document).ready(function () {
    $(".modalbox").fancybox();
    var search_string = window.location.search.substring(1);
    var DashboardID = search_string.split("=");
    var incoming_teams_and_items = {};
    var AutoCompleteList = {};
    var CompanyId = document.getElementById("CompanyId").value;
    var SendUsers = ServerAddress+"DashboardTeamOperations.svc/DashboardTeamOperations/ShowAllItemsAndTeams/" + DashboardID[1];
    var SendAutoCompleteList = ServerAddress + "DashboardTeamOperations.svc/DashboardTeamOperations/ShowAllTeamsInCompany/" + CompanyId;
    CallAjax(SendUsers, "GET", incoming_teams_and_items);
    CallAjaxForAutoComplete(SendAutoCompleteList, "GET", AutoCompleteList);
    $(".AddToExistingList").click(function () {

        var TeamnamesAndId = [];
        var one_teamAndId = {};
        var i = 0;
        $("li").each(function (index) {
            var len = $("li").length;
            if (len - 1 != i) {
                var temp = $(this).text();
                var correspondingid = $(this).data('id');
                if (temp != "") {
                    one_teamAndId.TeamName = temp.substring(0, temp.length - 1);
                    one_teamAndId.TeamID = correspondingid;
                    TeamnamesAndId[i++] = one_teamAndId;
                    one_teamAndId = {};
                }
            }
        } 
        );

        var itemidpost = window.itemid;
        var uniqueNames = [];
        $.each(TeamnamesAndId, function (i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        var incoming_json = window.incoming_teams_and_items;

        var teamsunique = [];
        for (var i = 0; i < uniqueNames.length; i++) {
            teamsunique[i] = uniqueNames[i].TeamName;
        }
        $("#TeamsOnIt" + $(".token-input-token").attr("caller-id")).html($(this).html().replace(/ \d/, ""));
        $("#TeamsOnIt" + $(".token-input-token").attr("caller-id")).append(teamsunique.toString());

        var one_object = {};
        var post_object = [];
        var test = 90;
        for (var items = 0; items < uniqueNames.length; items++) {
            one_object.ItemID = itemidpost,
            one_object.TeamID = uniqueNames[items].TeamID; 
            post_object[items] = one_object;
            one_object = {};
        }
        var jData = {};

        jData.dashboardItemTeam = post_object;
        var dashboardItemTeamUrl = ServerAddress + "DashboardTeamOperations.svc/DashboardTeamOperations/WriteAllDashboardItemTeams";
        CallAjaxPost(dashboardItemTeamUrl, "POST", jData);
        $('.token-input-token').remove();
        location.reload();
    });

    $(".EditButton").live("click", "button", function () {
        $('.token-input-token').remove();
        var teams_data = window.all_divs;
        var dataids = teams_data[$(this).attr('id').slice(-1)].TeamID//team id array
        var teams = teams_data[$(this).attr('id').slice(-1)].Teams;
        var itemid = teams_data[$(this).attr('id').slice(-1)].ItemID;

        window.itemid = itemid;

        for (var i = 0; i < teams.length; i++) {

            $('.token-input-list').prepend('<li class="token-input-token" data-id="' + dataids[i] + '" caller-id="' + $(this).attr('id').slice(-1) + '"><p id="token-input-token' + i + '" data-id="' + dataids[i] + '">' + teams[i] + '</p><span class="token-input-delete-token">×</span></li>');
        }
    });
    $(".token-input-delete-token").live("click", function () {
        $(this).parent().remove();
    });
});

