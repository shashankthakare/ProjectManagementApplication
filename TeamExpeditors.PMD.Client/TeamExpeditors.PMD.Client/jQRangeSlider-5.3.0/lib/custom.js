function ServiceSucceeded(result, functionName) {
    if (result==true) {
        alert("Successfully created dashboard");
    }

    else {
        alert("Unable to create!");
    }
}
function ServiceFailed(result, functionName) {
    alert("Error:" + result.CompanyName);
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
        },
        error: function (result) {
            ServiceFailed(result, functionName);
        }
    });
}
$(document).ready(function () {

    $(".modalbox").fancybox();
    $("#contact").submit(function () {
        return false;
    });
    $("#send").on("click", function () {

        var descriptionVal = $("#description").val();
        $("#send").on("click", function () { location.reload(true) });
        var CreateDashboardUrl = "http://localhost:45475/DashboardService.svc/DashboardOperations/CreateDashboard";
        var dash = {};
        dash.DashboardName = $("#dashboardName").val();
        dash.StartMonth = $("#startMonth").val();
        dash.StartYear = $("#startYear").val();
        dash.EndMonth = $("#endMonth").val();
        dash.EndYear = $("#endYear").val();
        dash.Description = $("#Description").val();
        var user = {};
        user.UserId = document.getElementById("UserID").value;
        var jData = {};
        jData.dashboardDetails = dash;
        jData.UserDetails = user;
        CallAjax(CreateDashboardUrl, "POST", jData);
    });
});