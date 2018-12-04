
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
  $.fn.dataTable.moment("MM/DD/YYYY");
  $('#eventTable').DataTable({});
} );

$("input").prop('required',true);

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

var today = new Date().toLocaleDateString().split(',')[0];
document.getElementById("datepicker").setAttribute('min', formatDate(today));