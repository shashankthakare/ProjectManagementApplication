function setSession(Name,id) {
    var args = {
        sessionName: Name, sessionValue: id
    }
    $.ajax({
        type: "POST",
        url: "DashboardHome.aspx/SetSession",
        data: JSON.stringify(args),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {           
            window.location.href = "DashboardItems.aspx?id=" + id;
        },
        error: function () {
            alert("Fail");
        }
    });

}
$(document).ready(function () {
    $('.dashboard').click(function () {
        var dashboardID = $(this).attr("id");
        setSession("CurrentDasboardID", dashboardID);   
    });
});




