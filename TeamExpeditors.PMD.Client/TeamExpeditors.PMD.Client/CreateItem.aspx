<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true"
    CodeBehind="CreateItem.aspx.cs" Inherits="TeamExpeditors.PMD.Client.CreateItem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="Styles/DashBoardCSS.css" rel="Stylesheet" type="text/css" />
    <link href="Styles/Styles.css" rel="Stylesheet" type="text/css" />
     <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="Scripts/CreateItem.js"></script>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js" type="text/javascript"></script>
     <script type="text/javascript">
     $( ".from .to" ).datepicker( "option", "altFormat", "dd-mm-yy" );
         $(function () {
             $("#from").datepicker({
                 numberOfMonths: 2,
                 dateFormat: "dd/mm/yy"
               
             });
             $("#to").datepicker({
                 numberOfMonths: 2,
                 dateFormat: "dd/mm/yy"
                 
             });
         });
  </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="FieldsetContainerCreateTeam">
        <form id="Form1" runat="server">
        <fieldset class="fieldsetCreateTeam">
            <legend>Create New Item</legend>
            <label for="dashboardItemName">
                <span class="required">*</span>Item Name</label>
            <input name="dashboardItemName" id="dashboardItemName" class="txt" maxlength="35"/>
            <br />
            <label for="from">
                From</label>
            <input type="text" id="from" name="from" />
            <label for="to">
                to</label>
            <input type="text" id="to" name="to" />
        </fieldset>
        <div>
            <fieldset class="fieldsetCreateTeam">
                <legend>Enter Status:</legend>
                <select id="itemStatus" class="">
                    <option value="">Select A status</option>
                </select>
            </fieldset>
            <div id="sourcesDiv">
                <fieldset class="fieldsetCreateTeam">
                    <legend>Sources:</legend>
                    <select id="sources" class="">
                        <option value="">Select A source</option>
                    </select>
                    <div id="SourceAdded" style="text-align: center;">
                    </div>
                    <div id="SourcesDeletebuttondiv" style="width: 50px; float: left">
                    </div>
                </fieldset>
            </div>
            <div id="teamsDiv">
                <fieldset class="fieldsetCreateTeam" id="fieldsetClass">
                    <legend>Teams:</legend>
                    <select id="teams" class="">
                        <option value="">Select A Team</option>
                    </select>
                    <div id="teamsAdded" style="text-align: center">
                    </div>
                    <div id="teamsDeletebuttondiv" style="width: 50px; float: left">
                    </div>
                </fieldset>
            </div>
        </div>
        <input id="CompanyId" value="<%=CompanyId %>" type="hidden" />
         <div class="createbuttonDiv">
            <button id="send" class="button" style="position:relative;right:168px">
                Create</button>
                 <button id="deleteItem" class="button" style="position:relative;right:168px">
                Delete</button>
        </div>
        </form>
       
    </div>
</asp:Content>
