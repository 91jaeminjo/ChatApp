var stompClient = null;
var input = "anonymous";
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/myTopic', function (message) {
            showMessageLog(JSON.parse(message.body).user,JSON.parse(message.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	console.log("inside sendName(), jsonInput = "+$("#content").val());
	var jsonInput={'user':input,'content':$("#content").val()};
	
    stompClient.send("/app/message", {}, JSON.stringify(jsonInput));
}

function showMessageLog(name,content) {
    $("#messageLog").append("<tr><td>" + name + "</td><td>" + content + "</td></tr>");
}

function inputUserName() {
    input = prompt("Please enter user name","");
    alert(input);
}

$(function () {
	$()
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); inputUserName(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});