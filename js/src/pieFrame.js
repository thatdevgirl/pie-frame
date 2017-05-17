var pieFrame = {

  // --- Google API information
  apiKey: 'AIzaSyDwOQMIN3mLy9xyaiWrYJz1jZbozHB81Co',

  /* ---
   * Function to create all charts for the page.
   *   - Charts are defined by the (not real) HTML <chart> tag.
   *   - Makes async AJAX calls for each chart.
   */
  create: function() {
    let charts = $('chart');
    for (let c of charts) {
      let chart = this.getChartInfo(c);
      let url   = this.getSheetUrl(chart.id);

      $.ajax(url, {
        success: (data) => {
          chart.data = this.processData(data);
          chart.colors = this.generateColors(chart);
          this.displayChart(chart);
        },
        error: (xhr)  => { console.log(xhr); return false; }
      });
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
      id:        $(c).attr('data-id'),
      type:      $(c).attr('data-type'),
      colorseed: $(c).attr('data-colorseed'),
      hue:       $(c).attr('data-hue'),
      desc:      $(c).html()
    };

    let rand = Math.floor(Math.random() * 1000) + '';

    $(c).replaceWith($('<div class="chart" data-id="' + chart.id + '" id="chart-' + rand + '"></div>'));
    chart.el = $('div#chart-' + rand)[0];

    return chart;
  },

  /* ---
   * Function that constructs the Google sheet API url.
   */
  getSheetUrl: function(id) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/A2%3AZ1000/?key=' + this.apiKey;
  },

  /* ---
   * Function that saves out labels and chart data.
   */
  processData: function(data) {
    let labels = [], counts = [];

    for (let value of data.values) {
      labels.push(value[0]);
      counts.push(value[1]);
      // TODO: Eventually get dataset to support multiple bars per row.
    }

    return { 'labels': labels, 'counts': counts };
  },

  /* ---
   * Function that generates an array of colors for the chart
   */
  generateColors: function(chart) {
    let count = chart.data.counts.length;
    let attrs = { count: count };

    if (chart.colorseed) {
      attrs.seed = chart.colorseed;
    };

    if (chart.hue) {
      attrs.hue = chart.hue;
    };

    // We want darker colors for bar charts for contrast reasons.
    if (chart.type == 'horizontal-bar' || chart.type == 'vertical-bar') {
      attrs.luminosity = 'dark';
    }

    return randomColor(attrs);
  },

  /* ---
   * Function that calls the correct function to display cart.
   */
  displayChart: function(chart) {
    switch(chart.type) {
      case 'horizontal-bar':
        pfBarChart.display(chart, 'horizontal');
        break;
      case 'vertical-bar':
        pfBarChart.display(chart, 'vertical');
        break;
      case 'pie':
        pfPieChart.display(chart);
        break;
    }
  }
};

$(document).ready(function() {
  pieFrame.create();
});
