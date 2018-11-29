
function toggle(){
  var x = document.getElementById("toggle1");
  var y = document.getElementById("toggle2");
  var map = document.getElementById("map");
  var listView = document.getElementById("listing");
  if(map.style.display === "none"){
    map.style.display = "block";
    listView.style.display = "none";
    y.style.display = "block";
    x.style.display = "none";
  }else{
    map.style.display = "none";
    listView.style.display = "block";
    y.style.display = "none";
    x.style.display = "block";
  }
}

$(document).ready(function() {
  $('#eventTable').DataTable();
} );
