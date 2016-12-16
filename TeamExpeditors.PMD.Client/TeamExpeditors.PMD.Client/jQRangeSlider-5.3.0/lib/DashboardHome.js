$(document).ready(function () {
     $('.dashboard').click(function () {
            var dashboardID = $(this).attr("id");
            window.location.href = "DashboardDetails.aspx?id=" + dashboardID;
        });
});




