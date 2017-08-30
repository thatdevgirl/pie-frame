var pfBarChart = {

  /* ---
   * Chart configuration values
   */
  config: {
    barThickness:   40,      // thickness of individual bars
    barGutter:      8,       // space between bars
    labelWidth:     120,     // label width
    labelHeight:    50,      // label height
    labelBaseline:  20,      // label text baseline
    labelColor:     'black', // text color for bar labels
    countColor:     'white', // text color for bar count text
    chartHeight:    500      // set height for vertical bar charts
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
        pfHorizonal.create();
        break;
      case 'vertical':
        pfVertical.create();
        break;
    }
  },

  /* ---
   * Helper function that returns the base SVG object
   */
  createSvg: function() {
    this.svg = d3.select(this.chart.el).append('svg')
                 .attr('width', '100%')
                 .attr('height', this.height);

    if (this.chart.desc) {
      this.svg.append('desc').text(this.chart.desc);
    }
  },

  /* ---
   * Helper function for initial chart setup.
   */
  createBase: function() {
    let base = this.svg.selectAll('g').data(this.chart.data.counts).enter().append('g');

    base.append('title')
      .text((d, i) => { return 'Data for ' + this.chart.data.labels[i]; });

    base.append('desc')
      .text((d, i) => { return 'The number of ' + this.chart.data.labels[i] + ' is ' + d + ', which is ' + this.getBarSize(d) + '% of the total.'});

    return base;
  },

  /* ---
   * Helper function to determine width and height of SVG based on chart orientation.
   */
  getSvgDimensions: function() {
    // SVG max size is the largest value in the dataset.
    //   Used for width in horizonal charts; bar height in vertical charts.
    this.maxSize = Math.max(...this.chart.data.counts);

    if (this.orientation == 'horizontal') {
      // Based on number of values in dataset for horizontal charts.
      this.height = this.chart.data.counts.length * (this.config.barThickness + this.config.barGutter);

    } else if (this.orientation == 'vertical') {
      // Fixed height for vertical charts.
      this.height = this.config.chartHeight;
    }
  },

  /* ---
   * Helper function that returns the size of the bar based on passed-in data.
   */
  getBarSize: function(d) {
    if (!this.maxSize) { return 0; }
    return (d / this.maxSize * 100);
  }
}
