var pfBarChart = {

  /* ---
   * Chart configuration values
   */
  config: {
    barThickness:   25,  // thickness of individual bars
    barGutter:      8,   // space between bars
    labelWidth:     100, // label width
    labelHeight:    100, // label height
    labelBaseline:  20,  // label text baseline
    labelColor:     'black'
  },

  /* ---
   * Function that creates a horizontal bar chart from the chartInfo object.
   */
  display: function(chart, orientation) {
    this.chart = chart;
    this.orientation = orientation;

    this.processChartData();
    this.getSvgDimensions();

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
    switch (this.orientation) {
      case 'horizontal':
        this.svg = d3.select(this.chart.el).append('svg')
                     .attr('width', '100%')
                     .attr('height', this.height);
        break;
      case 'vertical':
        this.svg = d3.select(this.chart.el).append('svg')
                     .attr('width', '100%')
                     .attr('height', this.height);
        break;
    }

  },

  /* ---
   * Helper function to create bar chart bars
   */
  createBars: function() {
    switch (this.orientation) {
      case 'horizontal':
        return this.svg.selectAll('rect').data(this.dataset).enter().append('rect')
                       .attr('height', this.config.barThickness)
                       .attr('width',  (d) => { return this.getBarSize(d) + '%'; })
                       .attr('x',      this.config.labelWidth)
                       .attr('y',      (d, i) => { return this.getBarLocation(i); })
                       .attr('fill',   'blue');
      case 'vertical':
        return this.svg.selectAll('rect').data(this.dataset).enter().append('rect')
                       .attr('height', (d) => { return this.getBarSize(d) + '%'; })
                       .attr('width',  this.config.barThickness)
                       .attr('x',      (d, i) => { return this.getBarLocation(i); })
                       .attr('y',      (d) => { return this.getVerticalBarBase(d); })
                       .attr('fill',   'blue');
    }
  },

  /* ---
   * Helper function to create bar chart labels.
   */
  createLabels: function() {
    return this.svg.selectAll('text').data(this.labels).enter().append('text')
                   .text(function(d) { return d; })
                   .attr('height', this.config.barThickness)
                   .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
                   .attr('fill',   this.config.labelColor);
  },

  /* ---
   * Helper function to determine width and height of SVG based on chart orientation.
   */
  getSvgDimensions: function() {
    if (this.orientation == 'horizontal') {
      // SVG width is the largest value in the dataset.
      this.width = Math.max(...this.dataset);
      // SVG height is based on number of values in dataset.
      this.height = this.dataset.length * (this.config.barThickness + this.config.barGutter);

    } else if (this.orientation == 'vertical') {
      // SVG width is based on number of values in dataset.
      this.width = this.dataset.length * (this.config.barThickness + this.config.barGutter);
      // SVG height is the largest value in the dataset.
      this.height = Math.max(...this.dataset) + this.labelHeight;
    }
  },

  /* ---
   * Helper function that returns the size of the bar based on passed-in data.
   */
  getBarSize: function(d) {
    return (d / this.width * 100);
  },

  /* ---
   * Helper function that returns the location of the bar based on passed-in iterator.
   */
  getBarLocation: function(i, offset=0) {
    return i * this.config.barThickness + i * this.config.barGutter + offset;
  },

  /* ---
   * Helper function that determines the baseline of the bar for a vertical bar chart.
   */
  getVerticalBarBase: function(d) {
    return this.height - this.getBarSize(d) / 100 * this.height + this.labelHeight;
  }

};
