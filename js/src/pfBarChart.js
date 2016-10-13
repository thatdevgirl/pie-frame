var pfBarChart = {

  /* ---
   * Chart configuration values
   */
  config: {
    barThickness:   25,  // thickness of individual bars
    barGutter:      8,   // space between bars
    labelWidth:     100, // label width
    labelBaseline:  20   // label text baseline
  },

  /* ---
   * Function that creates a horizontal bar chart from the chartInfo object.
   */
  display: function(chart) {
    let config = this.config;
    this.chart = chart;

    this.processChartData();

    // SVG width is the largest value in the dataset.
    this.width = Math.max(...this.dataset);

    // SVG height is based on n umber of values in dataset.
    this.height = this.dataset.length * (config.barThickness + config.barGutter);

    // Create the chart.
    this.createSvg();
    this.createBars();
    this.createLabels();
  },

  /* ---
   * Helper function to process chart data.
   */
  processChartData: function() {
    this.labels = [];
    this.dataset = [];

    for (let value of this.chart.data.values) {
      this.labels.push(value[0]);
      this.dataset.push(value[1]);
    }
  },

  /* ---
   * Helper function that returns the base SVG object
   */
  createSvg: function() {
    this.svg = d3.select(this.chart.el).append('svg')
                 .attr('width', '100%')
                 .attr('height', this.height);
  },

  /* ---
   * Helper function to create bar chart bars
   */
  createBars: function() {
    return this.svg.selectAll('rect').data(this.dataset).enter().append('rect')
                   .attr('height', this.config.barThickness)
                   .attr('width',  (d) => { return this.getBarSize(d); })
                   .attr('x',      this.config.labelWidth)
                   .attr('y',      (d, i) => { return this.getBarLocation(i); })
                   .attr('fill',   'blue');
  },

  /* ---
   * Helper function to create bar chart labels.
   */
  createLabels: function() {
    return this.svg.selectAll('text').data(this.labels).enter().append('text')
                   .text(function(d) { return d; })
                   .attr('height', this.config.barThickness)
                   .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
                   .attr('fill',   'black');
  },

  /* ---
   * Helper function that returns the size of the bar based on passed-in data.
   */
  getBarSize: function(d) {
    return (d / this.width * 100) + '%';
  },

  /* ---
   * Helper function that returns the location of the bar based on passed-in iterator.
   */
  getBarLocation: function(i, offset=0) {
    return i * this.config.barThickness + i * this.config.barGutter + offset;
  }

};
