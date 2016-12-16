    function ServiceSucceeded(result) {
        alert("success");
    }
    function ServiceFailed(result) {
        alert("Error:");
    }
    function ServiceSucceededGet(result) {
        alert("success");
    }
    function ServiceFailedGet(result) {
        alert("Error:");
    }

    function CallAjaxGet(varUrl, vartype) {
        $.ajax({
            cache: false,
            type: vartype,
            async: false,
            dataType: "json",
            url: varUrl,
            success: function (result) {
                ServiceSucceededGet(result);
                GetResult = result;
            },
            error: function (result) {
                ServiceFailedGet(result);
            }
        });
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
    $(document).ready(function () {
        this.GetResult = "";
        var search_string = window.location.search.substring(1);
        var DashboardID = search_string.split("=");
        //var link = 'http://capi.travelnxt.com/api/tcs/Hotels?q=' + DataFromPreviousPage[1] + '&' + DashboardID[1];
        var GetItems = 'http://localhost:45475/DashboardService.svc/DashboardItemOperations/RetreiveExistingDashboardItems/' + DashboardID[1];
        CallAjaxGet(GetItems, "GET");
        var NumberOfDashweeks = 53;
        var NumberofDashboardItems = GetResult.length;
        var DashboardItemName = "";
        var currentWeekJs = document.getElementById("currentWeek").value;
        var j = 0;
        var i = 0;
        var k = 0;
        //                $('#wrapper').append('<div class="dashboardItemName"> Items </div>');

        //                for (i = 1; i <= NumberOfDashweeks; i++) {
        //                    $('#wrapper').append('<div id=' + i + ' class="dashboardWeekName">Week ' + i + '</div>');
        //                }

        //                for (j = 1; j <= NumberofDashboardItems; j++) {
        //                    DashboardItemName = GetResult[j-1].ItemName;
        //                    $('#wrapper').append('<div class="dashboardItemName"> <asp:Label runat="server" id="DashboardItemName"> ' + DashboardItemName +' </asp:Label> </div>');

        //                    for (k = 1; k <= NumberOfDashweeks; k++) {
        //                        if (k == currentWeekJs)
        //                            $('#wrapper').append('<div id=' + k + ' style=" border:1px solid gray;width:100px;height:40px;float:left;text-align:center" class="colorGreen cell">' + k + '</div>');
        //                        else
        //                            $('#wrapper').append('<div id=' + k + ' style=" border:1px solid gray;width:100px;height:40px;float:left;text-align:center" class="cell">' + k + '</div>');
        //                    }
        //                }


        $('#wrapperGrid').append('<div class="ItemnameWrapper"></div>');
      
        $('#ItemnameWrapper').append('<div style=" border:1px solid black;width:200px;height:30px;float:left;text-align:center;background-color:#4b6c9e;color:white;padding:8px 0px 0px 0px;">Dashboard Items </div>');

        for (i = 1; i <= NumberOfDashweeks; i++) {
            $('#weekWrapper').append('<div id=' + i + ' style=" border:1px solid gray;width:100px;height:30px;float:left;text-align:center;background-color:#4b6c9e;color:white; padding:8px 0px 0px 0px;">Week ' + i + '</div>');
        }

        for (j = 1; j <= NumberofDashboardItems; j++) {
            DashboardItemName = GetResult[j - 1].ItemName;
            $('#ItemnameWrapper').append('<div style=" border:1px solid gray;width:200px;height:40px;float:left;text-align:center"> <asp:Label runat="server" id="DashboardItemName"> ' + DashboardItemName + j + ' </asp:Label> </div>');
        }
        for (j = 1; j <= NumberofDashboardItems; j++) {
            for (k = 1; k <= NumberOfDashweeks; k++) {
                if (k == currentWeekJs)
                    $('#weekWrapper').append('<div id=' + k + ' style=" border:1px solid gray;width:100px;height:40px;float:left;text-align:center" class="colorGreen cell">' + k + '</div>');
                else
                    $('#weekWrapper').append('<div id=' + k + ' style=" border:1px solid gray;width:100px;height:40px;float:left;text-align:center" class="cell">' + k + '</div>');

            }
        }


        $('#' + currentWeekJs).addClass("colorGreen");
        $(".cell").attr('title', 'Dashboard:  ' + DashboardItemName + j);
        $(".modalbox").fancybox();
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
        $("#send").on("click", function () {
            var it = {};
            it.ItemName = $("#dashboardItemName").val();
            var from1 = $("#from").val();
            from = new Date(from1);
            var to = new Date($("#to").val());
            it.StartDate = "/Date(" + from.getTime() + ")/";
            it.EndDate = "/Date(" + to.getTime() + ")/";
            it.DashboardID = $("#dashboardID").val();
            var jData = {};
            jData.Item = it;
            var CreateDashboardItemUrl = "http://localhost:45475/DashboardService.svc/DashboardItemOperations/AddDashboardItem";
            CallAjax(CreateDashboardItemUrl, "POST", jData);
        });
    });

    
