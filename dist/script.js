const dataUrl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

getDataset();

// Retrieve the dataset
function getDataset() {
  // Instanciate XMLHttpRequest Object
  req = new XMLHttpRequest();
  // Initialize GET request
  req.open("GET", dataUrl, true);
  // Send the request
  req.send();
  // onload event handler
  req.onload = function() {
    // Parse the returned JSON string to JavaScript object
    json = JSON.parse(req.responseText);
    // use the value of "data" only
    drawChart(json["data"]);
  }
}


// Draw chart
function drawChart(dataset) {
  // dataset should be an array
  // Example:
  // const dataset = [
  //   ["1947-01-01", 243.1],
  //   ["1947-04-01", 246.3],
  //   ["1947-07-01", 250.1]
  // ];

  const w = 800;
  const h = 500;
  const padding = 30;

  // data-date
  const xScale = d3.scaleLinear()
                   .domain([0, 300])
                   .range([padding, w - padding]);

  // data-gdp
  const yScale = d3.scaleLinear()
                   .domain([0, 400])
                   .range([h - padding, padding]);

  const svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("class", "bar") // required for the fcc test
     .attr("data-date", (d, i) => i * 10 + padding) // for the fcc test
     .attr("x", (d, i) => i * 10 + padding)
     .attr("data-gdp", (d, i) => (h - padding) - d) // for the fcc test
     .attr("y", (d, i) => (h - padding) - d) // 下端にそろえる
     .attr("width", 8)
     .attr("height", (d) => d)
     .attr("fill", "navy")
     .append("title") // Tooltip
     .text("data-date");

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .attr("transform", "translate(0," + (h - padding) + ")")
     .attr("id", "x-axis") // required for the fcc test
     .call(xAxis);

  svg.append("g")
     .attr("transform", "translate(" + padding + ", 0)")
     .attr("id", "y-axis") // required for the fcc test
     .call(yAxis);
};

// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would
    like to complete from the dropdown
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank
    pen.
  - Click the "TESTS" button to see
    the individual test cases.
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go
    from red to green.
  - As you start to build out your
    project, when tests are failing,
    you should get helpful errors
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.
