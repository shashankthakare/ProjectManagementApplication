<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true"
    CodeBehind="EditDashboard.aspx.cs" Inherits="TeamExpeditors.PMD.Client.EditDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="Scripts/DashboardHome.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="Styles/styleDashboardPopUp.css" />
    <link rel="stylesheet" type="text/css" media="all" href="fancybox/jquery.fancybox.css" />
    <link rel="stylesheet" type="text/css" href="Styles/CreateNewDashboard.css" />
    <script type="text/javascript" src="fancybox/jquery.fancybox.js?v=2.0.6"></script>
    <script type="text/javascript" src="Scripts/EditDashboard.js"></script>
    <link rel="stylesheet" type="text/css" href="ColorCodes/css/screen.css" />
    <script type="text/javascript" src="ColorCodes/js/ddcolorposter.js"></script>
    <script type="text/javascript" src="ColorCodes/js/YAHOO.js"></script>
    <script type="text/javascript2" src="ColorCodes/js/log.js"></script>
    <script type="text/javascript" src="ColorCodes/js/color.js"></script>
    <script type="text/javascript" src="ColorCodes/js/event.js"></script>
    <script type="text/javascript" src="ColorCodes/js/dom.js"></script>
    <script type="text/javascript" src="ColorCodes/js/animation.js"></script>
    <script type="text/javascript" src="ColorCodes/js/dragdrop.js"></script>
    <script type="text/javascript" src="ColorCodes/js/slider.js"></script>
    <link href="Styles/DashBoardCSS.css" rel="Stylesheet" type="text/css" />
    <script type="text/javascript">

        var hue;
        var picker;

        var dd1, dd2;
        var r, g, b;

        function init() {
            if (typeof (ygLogger) != "undefined")
                ygLogger.init(document.getElementById("logDiv"));
            pickerInit();
            ddcolorposter.fillcolorbox("colorfield1", "colorbox1") //PREFILL "colorbox1" with hex value from "colorfield1"
            ddcolorposter.fillcolorbox("colorfield2", "colorbox2") //PREFILL "colorbox1" with hex value from "colorfield1"
        }

        // Picker ---------------------------------------------------------

        function pickerInit() {
            hue = YAHOO.widget.Slider.getVertSlider("hueBg", "hueThumb", 0, 180);
            hue.onChange = function (newVal) { hueUpdate(newVal); };

            picker = YAHOO.widget.Slider.getSliderRegion("pickerDiv", "selector",
				0, 180, 0, 180);
            picker.onChange = function (newX, newY) { pickerUpdate(newX, newY); };

            hueUpdate();

            dd1 = new YAHOO.util.DD("pickerPanel");
            dd1.setHandleElId("pickerHandle");
            dd1.endDrag = function (e) {

            };
        }

        executeonload(init);

        function pickerUpdate(newX, newY) {
            pickerSwatchUpdate();
        }


        function hueUpdate(newVal) {

            var h = (180 - hue.getValue()) / 180;
            if (h == 1) { h = 0; }

            var a = YAHOO.util.Color.hsv2rgb(h, 1, 1);

            document.getElementById("pickerDiv").style.backgroundColor =
			"rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")";

            pickerSwatchUpdate();
        }

        function pickerSwatchUpdate() {
            var h = (180 - hue.getValue());
            if (h == 180) { h = 0; }
            document.getElementById("pickerhval").value = (h * 2);

            h = h / 180;

            var s = picker.getXValue() / 180;
            document.getElementById("pickersval").value = Math.round(s * 100);

            var v = (180 - picker.getYValue()) / 180;
            document.getElementById("pickervval").value = Math.round(v * 100);

            var a = YAHOO.util.Color.hsv2rgb(h, s, v);

            document.getElementById("pickerSwatch").style.backgroundColor = "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")";

            document.getElementById("pickerrval").value = a[0];
            document.getElementById("pickergval").value = a[1];
            document.getElementById("pickerbval").value = a[2];
            var hexvalue = document.getElementById("pickerhexval").value = YAHOO.util.Color.rgb2hex(a[0], a[1], a[2]);
            ddcolorposter.initialize(a[0], a[1], a[2], hexvalue);
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <form id="CreateDashboard" name="CreateDashboard" action="#" method="post" runat="server">
    <div id="FieldsetContainerdiv" class="container">
        <div style="text-align: center">
            <fieldset class="fieldsetClassMain">
                <legend>Edit your Dashboard</legend>
                <div class="LabelContainer">
                    <label for="dashboardName" style="height: 20px">
                        <span class="required">*</span> Enter Dashboard Name</label>
                    <div class="spacewithinlabel">
                    </div>
                    <label for="comments">
                        <span class="required">*</span>Start Month</label>
                    <div class="spacewithinlabel">
                    </div>
                    <label for="comments">
                        <span class="required">*</span>Start Year</label>
                    <div class="spacewithinlabel">
                    </div>
                    <label for="comments">
                        <span class="required">*</span>End Month</label>
                    <div class="spacewithinlabel">
                    </div>
                    <label for="comments">
                        <span class="required">*</span>End Year</label>
                    <div class="spacewithinlabel">
                    </div>
                    <label for="comments">
                        <span class="required"></span>Description</label>
                </div>
                <div class="TextContainer">
                    <asp:TextBox ID="dashboardName" class="txt" runat="server" MaxLength="15"></asp:TextBox>
                    <div class="space">
                    </div>
                    <asp:DropDownList runat="server" ID="startMonth" class="DateDropDown">
                        <asp:ListItem Value="1">1</asp:ListItem>
                        <asp:ListItem Value="2">2</asp:ListItem>
                        <asp:ListItem Value="3">3</asp:ListItem>
                        <asp:ListItem Value="4">4</asp:ListItem>
                        <asp:ListItem Value="5">5</asp:ListItem>
                        <asp:ListItem Value="6">6</asp:ListItem>
                        <asp:ListItem Value="7">7</asp:ListItem>
                        <asp:ListItem Value="8">8</asp:ListItem>
                        <asp:ListItem Value="9">9</asp:ListItem>
                        <asp:ListItem Value="10">10</asp:ListItem>
                        <asp:ListItem Value="11">11</asp:ListItem>
                        <asp:ListItem Value="12">12</asp:ListItem>
                    </asp:DropDownList>
                    <div class="space">
                    </div>
                    <asp:TextBox ID="startYear" runat="server" class="txt"></asp:TextBox>
                    <div class="space">
                    </div>
                    <asp:DropDownList ID="endMonth" class="DateDropDown" runat="server">
                        <asp:ListItem Value="1">1</asp:ListItem>
                        <asp:ListItem Value="2">2</asp:ListItem>
                        <asp:ListItem Value="3">3</asp:ListItem>
                        <asp:ListItem Value="4">4</asp:ListItem>
                        <asp:ListItem Value="5">5</asp:ListItem>
                        <asp:ListItem Value="6">6</asp:ListItem>
                        <asp:ListItem Value="7">7</asp:ListItem>
                        <asp:ListItem Value="8">8</asp:ListItem>
                        <asp:ListItem Value="9">9</asp:ListItem>
                        <asp:ListItem Value="10">10</asp:ListItem>
                        <asp:ListItem Value="11">11</asp:ListItem>
                        <asp:ListItem Value="12">12</asp:ListItem>
                    </asp:DropDownList>
                    <div class="space">
                    </div>
                    <asp:TextBox ID="endYear" class="txt" runat="server"></asp:TextBox>
                    <div class="space">
                    </div>
                    <asp:TextBox runat="server" name="Description" ID="Description" TextMode="MultiLine"></asp:TextBox>
                </div>
            </fieldset>
        </div>
        <fieldset class="fieldsetClass" id="fieldsetClass2">
            <div id="divSource" style="text-align: left">
                <asp:Label runat="server" Text="Add Sources :: " ID="lblSource"></asp:Label>
                <input id="txtaddSource" type="text" />
                <button id="addSource" type="button" style="float: right; width: 20px">
                    +</button>
                <div style="clear: both">
                </div>
            </div>
            <div id="SourcesAdded" style="text-align: center">
            </div>
        </fieldset>
        <fieldset class="fieldsetClass" id="fieldsetClass1" style="margin-left: 20px">
            <div id="divStatus">
                <asp:Label runat="server" Text="Add Status :: " ID="lblStatus"></asp:Label>
                <input id="txtaddStatus" type="text" /><br />
                <asp:Label runat="server" Text="Select status Color :: " ID="lblStatusColor"></asp:Label>
                <button id="addStatus" type="button" style="float: right; margin-right: 30px; width: 20px">
                    +</button>
                <div id="pickerSwatch" style="">
                    <div id="pickerPanel" class="dragPanel">
                        <h4 id="pickerHandle">
                        </h4>
                        <div id="pickerDiv">
                            <img id="pickerbg" src="ColorCodes/img/pickerbg.png" alt="" />
                            <div id="selector">
                                <img src="ColorCodes/img/select.gif" alt="" /></div>
                        </div>
                        <div id="hueBg">
                            <div id="hueThumb">
                                <img src="ColorCodes/img/hline.png" alt="" /></div>
                        </div>
                        <div id="pickervaldiv">
                        </div>
                    </div>
                </div>
            </div>
            <form name="pickerform" onsubmit="return pickerUpdate()" action="">
            <input name="pickerrval" id="pickerrval" type="hidden" value="0" />
            <input name="pickerhval" id="pickerhval" type="hidden" value="0" />
            <input name="pickergval" id="pickergval" type="hidden" value="0" />
            <input name="pickergsal" id="pickersval" type="hidden" value="0" />
            <input name="pickerbval" id="pickerbval" type="hidden" value="0" />
            <input name="pickervval" id="pickervval" type="hidden" value="0" />
            <input name="pickerhexval" id="pickerhexval" type="hidden" value="0" size="6" maxlength="6" />
            </form>
            <div id="StatusAdded" style="text-align: left">
            </div>
        </fieldset>
        <div style="text-align: right">
            <button id="send" class="button">
                Save</button>
            <button id="deletedashboard" class="button">
                Delete</button></div>
    </div>
    <input id="UserID" value="<%=UserID %>" type="hidden" />
    <input id="DashboardID" value="<%=dashboardID %>" type="hidden" />
    <input id="AccessRight" value="<%=AccessRight%>" type="hidden" />
    </form>
</asp:Content>
