/*jshint esversion: 6 */

$(document).ready( function () {
  $('#example').DataTable();
} );


const updateTables = ((weatherData) => {
  // do stuff to update the DOM here
  console.log(weatherData);
  let tableHeads = [];
  let tableHeadHtml = '';

  // getting the first response and taking its keys
  for (var key of Object.keys(weatherData[0])) {
    tableHeads.push(key);
  }

  // opening the table header, then populating it with the column names
  tableHeadHtml += '<thead><tr>';
  for (var header of tableHeads) {
    tableHeadHtml += `<th>${header}</th>`;
  }
  tableHeadHtml += '</tr></thead>';
  // applying the headers to the table
  document.getElementById('example').innerHTML += tableHeadHtml;


  let tableRowData = '';
  tableRowData += '<tbody>';
  // for every row of weather data, make a row of table data
  for (var period of weatherData){
    tableRowData += '<tr>';
    for (var value of Object.values(period)) {
      tableRowData += `<td>${value}</td>`;
    }
    tableRowData += '</tr>';
  }
  tableRowData += '</tbody>';

  document.getElementById('example').innerHTML += tableRowData;


});



const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.weather.gov/gridpoints/CLE/102,78/forecast",
  "method": "GET",
  "headers": {}
};

$.ajax(settings).done(function (response) {
  let weatherData = response.properties.periods;
  updateTables(weatherData);
  // console.log(response.properties.periods);
});