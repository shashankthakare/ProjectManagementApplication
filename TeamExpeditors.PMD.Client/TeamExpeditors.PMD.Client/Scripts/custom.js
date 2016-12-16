function ServiceSucceeded(result) {
        alert("Successfully created dashboard");
        window.location.href = "EditDashboard.aspx?id="+result;
        return false;
    }
function ServiceFailed(result) {
    alert("Error");
}
function CallAjax(varUrl, vartype, jData) {
    $.ajax({
        cache: false,
        type: vartype,
        async: false,
        dataType: "json",
        data: JSON.stringify(jData),
        contentType: "application/json",
        url: varUrl,
        success: function (result) {
            ServiceSucceeded(result);
        },
        error: function (result) {
            ServiceFailed(result);
        }
    });
}
var ServerAddress = "";
$(document).ready(function () {

    $(".modalbox").fancybox();
    $("#contact").submit(function () {
        return false;
    });
    $("#send").on("click", function () {
        //$("#send").on("click", function () { //location.reload(true) });// y we used ..??
        var CreateDashboardUrl = ServerAddress + "DashboardService.svc/DashboardOperations/CreateDashboard";
        var dash = {};
        dash.DashboardName = $("#MainContent_dashboardName").val();
        dash.StartMonth = $("#MainContent_startMonth").val();
        dash.StartYear = $("#MainContent_startYear").val();
        dash.EndMonth = $("#MainContent_endMonth").val();
        dash.EndYear = $("#MainContent_endYear").val();
        dash.Description = $("#Description").val();
        var user = {};
        user.UserId = document.getElementById("UserID").value;
        var jData = {};
        jData.dashboardDetails = dash;
        jData.UserDetails = user;
        CallAjax(CreateDashboardUrl, "POST", jData);
        //window.location.href = "EditDashboard.aspx?id=";
        return false;
    });
});