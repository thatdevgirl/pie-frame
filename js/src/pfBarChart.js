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

    switch (this.orientation) {
      case 'horizontal':
        this.createHorizontalChart();
        break;
      case 'vertical':
        this.createVerticalChart();
        break;
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
        break;
    }

    this.svg.append('desc').text(this.chart.desc);
  },

  /* ---
   * Helper function to create horizontal bar chart
   */
  createHorizontalChart: function() {
    let groups = this.svg.selectAll('g').data(this.chart.data.counts).enter().append('g');

    groups.append('title')
      .text((d, i) => { return 'Data for ' + this.chart.data.labels[i]; });

    groups.append('desc')
      .text((d, i) => { return 'The number of ' + this.chart.data.labels[i] + ' is ' + d + ', which is ' + this.getBarSize(d) + '% of the total.'});

    // Draw the bars.
    groups.append('rect')
      .attr('height', this.config.barThickness)
      .attr('width',  (d) => { return this.getBarSize(d) + '%'; })
      .attr('x',      this.config.labelWidth)
      .attr('y',      (d, i) => { return this.getBarLocation(i); })
      .attr('fill',   (d, i) => { return this.chart.colors[i] });

    // Draw the chart labels.
    groups.append('text')
      .text((d, i) => { return this.chart.data.labels[i]; })
      .attr('height', this.config.barThickness)
      .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
      .attr('fill',   this.config.labelColor);

    // Draw the counter text on top of the bars.
    groups.append('text')
      .text((d) => { return d; })
      .attr('height', this.config.barThickness)
      .attr('x',      this.config.labelWidth + this.config.barGutter)
      .attr('y',      (d, i) => { return this.getBarLocation(i, this.config.labelBaseline); })
      .attr('fill',   this.config.labelColor);

    return groups;
  },

  /* ---
   * Helper function to create vertical bar chart
   */
  createVerticalChart: function() {
    return false;
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
    if (!this.width) { return 0; }

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
