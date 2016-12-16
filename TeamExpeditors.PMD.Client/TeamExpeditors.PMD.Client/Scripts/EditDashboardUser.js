function ServiceSucceeded(incoming_dashboard_rights) {
    var NumberOfDashBoardUsers = incoming_dashboard_rights.length;
    console.log("length" + incoming_dashboard_rights.Length);
    var i = 0;
    $('#EditdashboardUserContainer').append('<div Id="Header" class="button-row"style="height:30pt;width:100%;float:left;margin-right:10px; margin-bottom:10px;margin-top:20px;text-align:center;color:White;font-size:large"></div>');
    $('#Header').append('<asp:Label class="UserNameTitle" Id="UserNameLabel" runat="server" >User Name</asp:Label>');
    $('#Header').append('<asp:Label class="DeleteButton" Id="DeleteLabel" runat="server" style="width:75px;cursor:pointer;" >Delete</asp:Label>');
    $('#Header').append('<asp:Label style="float:right;margin-top:5px " Id="AccessRightsLabel" runat="server" >Access rights</asp:Label>');

    for (i = 0; i < NumberOfDashBoardUsers; i++) {

        var UserName = incoming_dashboard_rights[i].Name;
        var UserId = incoming_dashboard_rights[i].UserId;
        var accessRight = incoming_dashboard_rights[i].AccessRight.AccessRightName;
        console.log("Accessright "+ incoming_dashboard_rights[i].AccessRight.AccessRightName);

        $('#EditdashboardUserContainer').append('<div class="Userdata button-row" Id="Userdata' + i + '" style="height:20pt;width:100%;float:left;margin-right:10px; margin-bottom:5px;text-align:center;color:White;font-size:large;margin-top: 5px;"></div>');

        $("#Userdata" + i).append('<div Id="UserName" class="UserName" data-id="' + UserId + '" runat="server">' + UserName + '</div>');
        $("#Userdata" + i).append('<asp:Button class="DeleteButton" Id="DeleteButton' + i + '" runat="server" style="border-style:outset;width:30px">X</asp:button>');
        if (accessRight == "READ") {
            $("#Userdata" + i).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + i + '" runat="server" ><select class="dropDown" style="width:100px"><option selected="selected" value="READ">READ</option><option value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
        }
        else if (accessRight == "WRITE") {
            $("#Userdata" + i).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + i + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option selected="selected" value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
        }
        else if (accessRight == "ADMIN") {
            $("#Userdata" + i).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + i + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option value="WRITE">WRITE</option><option selected="selected" value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
        }
        else {
            $("#Userdata" + i).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + i + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
        }
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
    alert("Error:autocomplete");
}
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
    alert("User List Updated");
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
    var AccessRight = document.getElementById("AccessRight").value;
    if (AccessRight == "READ" || AccessRight == "WRITE") {
        $("#EditdashboardUserContainer").append("<div class=\"overlay\"></div>");
       // $("#btnAddUser").hide();
        $("#AddUserTextAreadiv").hide();
    }
    var search_string = window.location.search.substring(1);
    var DashboardID = search_string.split("=");
    var incoming_dashboard_rights = {};
    var AutoCompleteList = {};
    var CompanyId = document.getElementById("CompanyId").value;
    var SendUsers = ServerAddress+"DashboardUserOperations.svc/DashboardUserOperations/ShowAllAccessRights/" + DashboardID[1];
    var SendAutoCompleteList =ServerAddress+"DashboardUserOperations.svc/DashboardUserOperations/ShowAllUsersInCompany/" + CompanyId;
    CallAjax(SendUsers, "GET", incoming_dashboard_rights);
    CallAjaxForAutoComplete(SendAutoCompleteList, "GET", AutoCompleteList);
    console.log("incoming ajax " + incoming_dashboard_rights);
    $("#send").on("click", function () {
        var projectusers = [];
        var names = document.getElementsByClassName("UserName");
        var idTosend = $(".UserName").map(function () {
            return $(this).data("id");
        }).get();
        var access = document.getElementsByClassName("AccessRight");
        for (var l = 0; l < names.length; l++) {
            var ctx = access[l];
            var AccessRight = {};
            AccessRight.AccessRightName = $('.dropDown :selected', ctx).val();
            projectusers.push({ DashboardId: DashboardID[1], UserId: idTosend[l], AccessRight: AccessRight, Name: names[l].innerHTML });
        }
        var jData = {};
        jData.DashboardUser = projectusers;
        var CreateDashboardItemUrl = ServerAddress + "DashboardUserOperations.svc/DashboardUserOperations/WriteAllAccessRights";
        CallAjaxPost(CreateDashboardItemUrl, "POST", jData);

    });

    $("#btnAddUser").click(function () {
        var i = 0;
        var names = new Array();     
        $(".token-input-token").each(function (index) {      
            var len = $("li").length;
            if (len - 1 != i) {
                var temp = $(this).text();
                var id1 = $(this).data().tokeninput.UserId;
                var nameAndId = {}
                if (temp != "") {
                    nameAndId.name = temp.substring(0, temp.length - 1);
                    nameAndId.UserId = id1;
                    nameAndId.AccessRight = "READ";
                    names[i++] = nameAndId;
                }
            }
        });
        var existing_names = document.getElementsByClassName("UserName");
        var existing_ids = $(".UserName").map(function () {
            return $(this).data("id");
        }).get();
        var access = document.getElementsByClassName("AccessRight");
        var nameAndId_existing = [];
        var AccessRightName = "";
        for (var l = 0; l < existing_names.length; l++) {
            var ctx = access[l];
            AccessRightName = $('.dropDown :selected', ctx).val();
            nameAndId_existing.push({ name: existing_names[l].innerHTML, UserId: existing_ids[l], AccessRight: AccessRightName });
        }

        for (var namecount = 0; namecount < names.length; namecount++) {
            for (var existingcount = 0; existingcount < nameAndId_existing.length; existingcount++) {
                if (names[namecount].UserId == nameAndId_existing[existingcount].UserId) {
                    break;
                }
            }
            if (existingcount == nameAndId_existing.length)
                nameAndId_existing[existingcount] = names[namecount];
        }
        $('.Userdata').remove();
        for (var iterator = 0; iterator < nameAndId_existing.length; iterator++) {
            var accessRight_existing = nameAndId_existing[iterator].AccessRight;
            var UserId = nameAndId_existing[iterator].UserId;
            var UserName1 = nameAndId_existing[iterator].name;
            if (UserName1 == "") {
                UserName1 = nameAndId_existing[++iterator].name;
            }
            $('#EditdashboardUserContainer').append('<div class="Userdata button-row" Id="Userdata' + iterator + '"style="height:30pt;width:100%;float:left;margin-right:10px; margin-bottom:10px;text-align:center;color:White;font-size:large"></div>');

            $("#Userdata" + iterator).append('<div Id="UserName" class="UserName" data-id="' + UserId + '" runat="server">' + UserName1 + '</div>');

            $("#Userdata" + iterator).append('<asp:Button class="DeleteButton" Id="DeleteButton' + iterator + '" runat="server" style="border-style:outset;width:30px">X</asp:button>');

            if (accessRight_existing == "READ") {
                $("#Userdata" + iterator).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + iterator + '" runat="server" ><select class="dropDown" style="width:100px"><option selected="selected" value="READ">READ</option><option value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
            } else if (accessRight_existing == "WRITE") {
                $("#Userdata" + iterator).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + iterator + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option selected="selected" value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
            } else if (accessRight_existing == "ADMIN") {
                $("#Userdata" + iterator).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + iterator + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option value="WRITE">WRITE</option><option selected="selected" value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
            } else {
                $("#Userdata" + iterator).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + iterator + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
            }
            $('.token-input-token').remove();
        }
    });

    $(".DeleteButton").live("click", "button", function () {
        var UserDataId = $(this).parent().attr("id");
        $('#' + UserDataId).remove();
        console.log(UserDataId);
    });
});

