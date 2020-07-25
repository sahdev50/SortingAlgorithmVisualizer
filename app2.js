$("#btn1").click(function() {
    $("#btn2").prop('disabled', !$("#btn2").prop("disabled"))
    document.getElementById("btn2").style.color = "red";
    $("#btn3").prop('disabled', !$("#btn3").prop("disabled"))
    document.getElementById("btn3").style.color = "red";
    $("#btn4").prop('disabled', !$("#btn4").prop("disabled"))
    document.getElementById("btn4").style.color = "red";
  });

  $("#btn2").click(function() {
    $("#btn1").prop('disabled', !$("#btn1").prop("disabled"))
    document.getElementById("btn1").style.color = "red";
    $("#btn3").prop('disabled', !$("#btn3").prop("disabled"))
    document.getElementById("btn3").style.color = "red";
    $("#btn4").prop('disabled', !$("#btn4").prop("disabled"))
    document.getElementById("btn4").style.color = "red";
  });

  $("#btn3").click(function() {
    $("#btn2").prop('disabled', !$("#btn2").prop("disabled"))
    document.getElementById("btn2").style.color = "red";
    $("#btn1").prop('disabled', !$("#btn1").prop("disabled"))
    document.getElementById("btn1").style.color = "red";
    $("#btn4").prop('disabled', !$("#btn4").prop("disabled"))
    document.getElementById("btn4").style.color = "red";
  });

  $("#btn4").click(function() {
    $("#btn2").prop('disabled', !$("#btn2").prop("disabled"))
    document.getElementById("btn2").style.color = "red";
    $("#btn3").prop('disabled', !$("#btn3").prop("disabled"))
    document.getElementById("btn3").style.color = "red";
    $("#btn1").prop('disabled', !$("#btn1").prop("disabled"))
    document.getElementById("btn1").style.color = "red";
  });
  
