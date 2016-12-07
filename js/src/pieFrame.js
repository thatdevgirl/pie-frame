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
          this.displayChart(chart);
        },
        error:   (xhr)  => { console.log(xhr); return false; }
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
      id:   $(c).attr('data-id'),
      type: $(c).attr('data-type')
    };

    $(c).replaceWith($('<div class="chart" data-id="' + chart.id + '"></div>'));
    chart.el = $('div[data-id=' + chart.id + ']')[0];

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
