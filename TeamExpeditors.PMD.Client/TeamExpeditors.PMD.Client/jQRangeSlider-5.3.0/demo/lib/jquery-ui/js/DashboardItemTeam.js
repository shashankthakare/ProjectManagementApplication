function ServiceSucceeded(incoming_dashboard_rights) {
    var NumberOfDashBoardUsers = incoming_dashboard_rights.length;
    console.log("length" + incoming_dashboard_rights.Length);
    var i = 0;
    $('#EditdashboardUserContainer').append('<div Id="Header"style="height:30pt;width:100%;border-style:outset;float:left;margin-right:10px; margin-bottom:10px;text-align:center;color:Black;font-size:large"></div>');
    $('#Header').append('<asp:Label class="UserNameTitle" Id="UserNameLabel" runat="server" >User Name</asp:Label>');
    $('#Header').append('<asp:Label class="DeleteButton" Id="DeleteLabel" runat="server" style="width:75px" >Delete</asp:Label>');
    $('#Header').append('<asp:Label style="float:right;margin-top:5px " Id="AccessRightsLabel" runat="server" >Access rights</asp:Label>');

    for (i = 0; i < NumberOfDashBoardUsers; i++) {
       
        var UserName = incoming_dashboard_rights[i].Name;
        var UserId = incoming_dashboard_rights[i].UserId;
        console.log(incoming_dashboard_rights[i].Name);
        $('#EditdashboardUserContainer').append('<div class="Userdata" Id="Userdata' + i + '"style="height:30pt;width:100%;border-style:outset;float:left;margin-right:10px; margin-bottom:10px;text-align:center;color:Black;font-size:large"></div>');

        $("#Userdata" + i).append('<div Id="UserName" class="UserName" data-id="'+UserId+'" runat="server">' + UserName + '</div>');
        $("#Userdata" + i).append('<asp:Button class="DeleteButton" Id="DeleteButton' + i + '" runat="server" style="border-style:outset;width:30px">X</asp:button>');
        $("#Userdata" + i).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + i + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
        //alert("abc....");


    }
    alert("sucess!!");
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
    alert("auto complete success!");
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
    alert("sucess:");
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
$(document).ready(function () {
    var search_string = window.location.search.substring(1);
    var DashboardID = search_string.split("=");
    var incoming_dashboard_rights = {};
    var AutoCompleteList = {};
    var CompanyId = document.getElementById("CompanyId").value;
    //var SendUsers = "http://localhost:45475/DashboardUserOperations.svc/DashboardUserOperations/ShowAllAccessRights/" + DashboardID[1];
    var teams = "http://localhost:45475/DashboardUserOperations.svc/DashboardUserOperations/GetAllTeamsOfCompany/" + CompanyId;
    //CallAjax(SendUsers, "GET", incoming_dashboard_rights);
    CallAjaxForGetting teams(SendAutoCompleteList, "GET", AutoCompleteList);
    console.log("incoming ajax " + incoming_dashboard_rights);
    alert(incoming_dashboard_rights);
    //this.catch_response = result;

    $("#send").on("click", function () {

        //code to retreive userlist and access rights
        var projectusers = [];
        var names = document.getElementsByClassName("UserName");
        var idTosend = $(".UserName").map(function () {
            return $(this).data("id");
        }).get();
        //var accessRights = $('.dropDown', this).val();
        var access = document.getElementsByClassName("AccessRight");
        for (var l = 0; l < names.length; l++) {
            var ctx = access[l];
            var AccessRight = { };
            AccessRight.AccessRightName = $('.dropDown :selected', ctx).val();
            projectusers.push({ DashboardId: 2, UserId: idTosend[l], AccessRight: AccessRight, Name: names[l].innerHTML });
        }
        var jData = {};
        jData.DashboardUser = projectusers;
        var CreateDashboardItemUrl = "http://localhost:45475/DashboardUserOperations.svc/DashboardUserOperations/WriteAllAccessRights";
        CallAjaxPost(CreateDashboardItemUrl, "POST", jData);

    });

    $(".AddToExistingList").click(function () {
        var i = 0;

       
        var names = new Array();
        $("li").each(function (index) {
            var len = $("li").length;
            if (len - 1 != i) {
                var temp = $(this).text();
                var id1 = $(this).data().tokeninput.UserId;
                var nameAndId = {}
                if (temp != "") {
                    nameAndId.name = temp.substring(0, temp.length - 1);
                    nameAndId.UserId = id1;
                    names[i++] = nameAndId;
                }
            }
        });

        console.log("names newly added" + names);
        //now we add already db exisiting entries

        var existing_names = document.getElementsByClassName("UserName");
        
        var existing_ids = $(".UserName").map(function () {
            return $(this).data("id");
        }).get();
        var nameAndId_existing = [];
        console.log("existing_names " + existing_names[0]);
        for (var l = 0; l < existing_names.length; l++) {
            nameAndId_existing.push({ name: existing_names[l].innerHTML, UserId: existing_ids[l] });
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
            var UserId = nameAndId_existing[iterator].UserId;
            var UserName1 = nameAndId_existing[iterator].name;
            if (UserName1 == "") {
                UserName1 = final_array[++iterator].name;
            }

            $('#EditdashboardUserContainer').append('<div class="Userdata" Id="Userdata' + i + '"style="height:30pt;width:100%;border-style:outset;float:left;margin-right:10px; margin-bottom:10px;text-align:center;color:Black;font-size:large"></div>');

            $("#Userdata" + i).append('<div Id="UserName" class="UserName" data-id="' + UserId + '" runat="server">' + UserName1 + '</div>');

            $("#Userdata" + i).append('<asp:Button class="DeleteButton" Id="DeleteButton' + i + '" runat="server" style="border-style:outset;width:30px">X</asp:button>');

            $("#Userdata" + i++).append('<asp:DropDownList class="AccessRight" Id="AccessRights' + i + '" runat="server" ><select class="dropDown" style="width:100px"><option value="READ">READ</option><option value="WRITE">WRITE</option><option value="ADMIN">ADMIN</option></select> </asp:DropDownList>');
        }
        $('.token-input-token').remove();
    });

    $(".DeleteButton").live("click", "button", function () {

        var UserDataId = $(this).parent().attr("id");
        $('#' + UserDataId).remove();
        console.log(UserDataId);

    });
});

