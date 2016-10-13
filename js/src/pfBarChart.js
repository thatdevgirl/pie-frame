var pfBarChart = {

  /* ---
   * Chart configuration values
   */
  config: {
    barThickness:   20,  // thickness of individual bars
    barGutter:      4,   // space between bars
    labelWidth:     100, // label width
    labelBaseline:  16   // label text baseline
  },

  /* ---
   * Function that creates a horizontal bar chart from the chartInfo object.
   */
  display: function(chart) {
    let config = this.config;
    this.labels = [];
    this.dataset = [];

    for (let value of chart.data.values) {
      this.labels.push(value[0]);
      this.dataset.push(value[1]);
    }

    // SVG width is the largest value in the dataset.
    let width = Math.max(...this.dataset);

    // SVG height is based on n umber of values in dataset.
    let height = this.dataset.length * (config.barThickness + config.barGutter);

    // Create the chart.
    this.svg = this.createSvg({ chart: chart, height: height });
    let bars = this.createBarChartBars({ width: width });
    let axis = this.createLabels();
  },

  /* ---
   * Helper function that returns the base SVG object
   */
  createSvg: function(obj) {
    return d3.select(obj.chart.el).append('svg')
             .attr('width', '100%')
             .attr('height', obj.height);
  },

  /* ---
   * Helper function to create bar chart bars
   */
  createBarChartBars: function(obj) {
    let bars = this.svg.selectAll('rect').data(this.dataset).enter().append('rect');
    bars.attr('height', this.config.barThickness)
        .attr('width',  (d) => { return this.getBarSize(d, obj.width); })
        .attr('x',      this.config.labelWidth)
        .attr('y',      (d, i) => { return this.getBarLocation(i); })
        .attr('fill',   'blue');
    return bars;
  },

  /* ---
   * Helper function to create bar chart labels.
   */
  createLabels: function(obj) {
    let labels = this.svg.selectAll('text').data(this.labels).enter().append('text');
    labels.text(function(d) { return d; })
        .attr('height', this.config.barThickness)
        .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
        .attr('fill',   'black');
    return labels;
  },

  /* ---
   * Helper function that returns the size of the bar based on passed-in data.
   */
  getBarSize: function(d, width) {
    return (d / width * 100) + '%';
  },

  /* ---
   * Helper function that returns the location of the bar based on passed-in iterator.
   */
  getBarLocation: function(i, offset=0) {
    return i * this.config.barThickness + i * this.config.barGutter + offset;
  }

};
