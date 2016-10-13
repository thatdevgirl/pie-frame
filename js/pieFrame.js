var pieFrame = {

  // --- Google API information
  apiKey: 'AIzaSyDwOQMIN3mLy9xyaiWrYJz1jZbozHB81Co',


  /* ---
   * Function to create all charts for the page.
   *   - Charts are defined by the (not real) HTML <chart> tag
   */
  create: function() {
    let charts = $('chart');
    for (let c of charts) {
      let chart = this.getChartInfo(c);
      this.getData(chart);
    }
  },

  /* ---
   * Function that gets information about a given chart.
   *   - id:   Google sheet ID
   *   - type: What kind of visual chart should display
   *   - el:   Chart container element (converted from <chart> to <div>)
   */
  getChartInfo: function(c) {
    let chart = {
      id:   $(c).attr('data-id'),
      type: $(c).attr('data-type')
    };

    $(c).replaceWith($('<div class="chart" data-id="' + chart.id + '"></div>'));
    chart.el = $('div[data-id=' + chart.id + ']')[0];

    return chart;
  },

  /* ---
   * Function that retrieves data from a specific chart.
   *   - Upon success, the data is processed to create the visual chart.
   */
  getData: function(chart) {
    let url = 'https://sheets.googleapis.com/v4/spreadsheets/' + chart.id + '/values/A2%3AZ1000/?key=' + this.apiKey;
    // TODO: Find a better way of determining range

    $.ajax(url, {
      async: false,
      success: (data) => {
        chart.data = data;
        this.processData(chart);
      },
      error: (xhr) => {
        console.log(xhr);
        return false;
      }
    });
  },

  /* ---
   * Function that processes the chart data to create the visual chart.
   */
  processData: function(chart) {
    switch(chart.type) {
      case 'horizontal-bar':
        this.displayHorizontalBar(chart);
        break;
      case 'vertical-bar':
        break;
    }
  },

  /* ---
   * Function that creates a horizontal bar chart from the chartInfo object.
   */
  displayHorizontalBar: function(chart) {
    let labels = [],
        dataset = [];

    for (let value of chart.data.values) {
      labels.push(value[0]);
      dataset.push(value[1]);
    }

    // Set up chart variables.
    let barHeight = 20;
    let barSpacing = 4;
    let barX = 100;
    let axisBaseline = barSpacing * 4;
    let svgWidth = 1000;
    let svgHeight = dataset.length * (barHeight + barSpacing);

    // Create SVG canvas.
    let svg = d3.select(chart.el).append('svg').attr('width', svgWidth).attr('height', svgHeight);

    // Draw the bars.
    let bars = svg.selectAll('rect').data(dataset).enter().append('rect');
    bars.attr('height', barHeight)
        .attr('width', function(d) { return d; })
        .attr('x', barX)
        .attr('y', function(d, i) { return i * barHeight + i * barSpacing})
        .attr('fill', 'blue');

    // Draw the axis labels.
    let axis = svg.selectAll('text').data(labels).enter().append('text');
    axis.text(function(d) { return d; })
        .attr('height', barHeight)
        .attr('y', function(d, i) { return i * barHeight + i * barSpacing + axisBaseline})
        .attr('fill', 'black');
  }

};

$(document).ready(function() {
  pieFrame.create();
});
