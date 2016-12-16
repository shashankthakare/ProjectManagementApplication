<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs"
    MasterPageFile="~/Main.Master" Inherits="TeamExpeditors.PMD.Client.ForgotPassword" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <form id="Form1" runat="server">
    <h2>
        Forgot Password
    </h2>
    <span class="failureNotification">
        <asp:Literal ID="FailureText" runat="server"></asp:Literal>
    </span>
    <asp:ValidationSummary ID="ForgotPasswordSummary" runat="server" CssClass="failureNotification"
        ValidationGroup="ForgotPasswordValidationGroup" />
    <div class="accountInfo">
        <fieldset class="login">
            <legend>Security Question/Answer</legend>
            <p>
                <asp:Label ID="SecurityQuestionLabel" runat="server" AssociatedControlID="SecurityQuestion">SecurityQuestion:</asp:Label>
                <asp:DropDownList ID="SecurityQuestion" runat="server" CssClass="textEntry DropdownList">
                    <asp:ListItem>Nick Name</asp:ListItem>
                    <asp:ListItem>Best friend</asp:ListItem>
                    <asp:ListItem>Best Teacher</asp:ListItem>
                    <asp:ListItem></asp:ListItem>
                </asp:DropDownList>
                <asp:RequiredFieldValidator ID="SecurityQuestionRequired" runat="server" ControlToValidate="SecurityQuestion"
                    CssClass="failureNotification" ErrorMessage="Select SecurityQuestion." ToolTip="SecurityQuestion is required."
                    ValidationGroup="ForgotPasswordValidationGroup">*</asp:RequiredFieldValidator>
            </p>
            <p>
                <asp:Label ID="AnswerLabel" runat="server" AssociatedControlID="Answer">Answer:</asp:Label>
                <asp:TextBox ID="Answer" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                <asp:RequiredFieldValidator ID="AnswerRequired" runat="server" ControlToValidate="Answer"
                    CssClass="failureNotification" ErrorMessage="Answer is required." ToolTip="Answer is required."
                    ValidationGroup="ForgotPasswordValidationGroup">*</asp:RequiredFieldValidator>
            </p>
        </fieldset>
        <div class="ButtonDiv">
            <asp:Button ID="SubmitButton" runat="server" CommandName="Login" Text="Submit" ValidationGroup="ForgotPasswordValidationGroup"
                OnClick="SubmitButton_Click" />
            <asp:Button ID="CancelButton" runat="server" Text="Cancel" />
        </div>
    </div>
    </form>
</asp:Content>
