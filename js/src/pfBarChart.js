var pfBarChart = {

  /* ---
   * Chart configuration values
   */
  config: {
    barThickness:   40,  // thickness of individual bars
    barGutter:      8,   // space between bars
    labelWidth:     120, // label width
    labelHeight:    100, // label height
    labelBaseline:  20,  // label text baseline
    labelColor:     'black'
  },

  /* ---
   * Function that creates a bar chart from the chartInfo object.
   */
  display: function(chart, orientation) {
    this.chart = chart;
    this.orientation = orientation;

    this.getSvgDimensions();
    this.createSvg();
    this.createBars();
    this.createLabels();
    this.createCounts();
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
        break;
    }
  },

  /* ---
   * Helper function to create bar chart bars
   */
  createBars: function() {
    switch (this.orientation) {
      case 'horizontal':
        return this.svg.selectAll('rect').data(this.chart.data.counts).enter().append('rect')
                       .attr('height', this.config.barThickness)
                       .attr('width',  (d) => { return this.getBarSize(d) + '%'; })
                       .attr('x',      this.config.labelWidth)
                       .attr('y',      (d, i) => { return this.getBarLocation(i); })
                       .attr('fill',   (d, i) => { return this.chart.colors[i] });
      case 'vertical':
        return false;
    }
  },

  /* ---
   * Helper function to create bar chart labels.
   */
  createLabels: function() {
    return this.svg.selectAll('g').enter().data(this.chart.data.labels).enter().append('text')
                   .text(function(d) { return d; })
                   .attr('height', this.config.barThickness)
                   .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
                   .attr('fill',   this.config.labelColor);
  },

  /* ---
   * Helper function to display bar chart counts.
   */
  createCounts: function() {
    return this.svg.selectAll('g').data(this.chart.data.counts).enter().append('text')
                   .text(function(d) { return d; })
                   .attr('height', this.config.barThickness)
                   .attr('x',      this.config.labelWidth + this.config.barGutter)
                   .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
                   .attr('fill',   this.config.labelColor);

  },

  /* ---
   * Helper function to determine width and height of SVG based on chart orientation.
   */
  getSvgDimensions: function() {
    if (this.orientation == 'horizontal') {
      // SVG width is the largest value in the dataset.
      this.width = Math.max(...this.chart.data.counts);
      // SVG height is based on number of values in dataset.
      this.height = this.chart.data.counts.length * (this.config.barThickness + this.config.barGutter);

    } else if (this.orientation == 'vertical') {
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
  getBarLocation: function(i, offset=-7) {
    return (i * this.config.barThickness) + (i * this.config.barGutter) + offset;
  },

  /* ---
   * Helper function that determines the baseline of the bar for a vertical bar chart.
   */
  getVerticalBarBase: function(d) {
    return this.height - this.getBarSize(d) / 100 * this.height + this.labelHeight;
  }

};
