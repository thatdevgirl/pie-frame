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


/* ******************************
 * Namespace for helper functions for HORIZONTAL bar charts only.
 */
var pfHorizonal = {

  /* ---
   * Displays the chart!
   */
  create: function() {
    let chart = pfBarChart.createBase();

    // Draw the bars.
    chart.append('rect')
      .attr('height', pfBarChart.config.barThickness)
      .attr('width',  (d) => { return pfBarChart.getBarSize(d) + '%'; })
      .attr('x',      pfBarChart.config.labelWidth)
      .attr('y',      (d, i) => { return this.barY(i); })
      .attr('fill',   (d, i) => { return pfBarChart.chart.colors[i] });

    // Draw the chart labels.
    chart.append('text')
      .text((d, i) => { return pfBarChart.chart.data.labels[i]; })
      .attr('height', pfBarChart.config.barThickness)
      .attr('y',      (d, i) => { return this.barY(i, pfBarChart.config.labelBaseline); })
      .attr('fill',   pfBarChart.config.labelColor);

    // Draw the counter text on top of the bars.
    chart.append('text')
      .text((d) => { return d; })
      .attr('height', pfBarChart.config.barThickness)
      .attr('x',      pfBarChart.config.labelWidth + pfBarChart.config.barGutter)
      .attr('y',      (d, i) => { return this.barY(i, pfBarChart.config.labelBaseline); })
      .attr('fill',   pfBarChart.config.countColor);

    return chart;
  },

  /* ---
   * Returns the y value (as px) of the bar, based on iterator.
   */
  barY: function(i, offset=-7) {
    return (i * pfBarChart.config.barThickness) + (i * pfBarChart.config.barGutter) + offset;
  }

};


/* ******************************
 * Namespace for helper functions for VERTICAL bar charts only.
 */
var pfVertical = {

  /* ---
   * Displays the chart!
   */
  create: function() {
    let chart = pfBarChart.createBase();

    let y = d3.scaleLinear().range([pfBarChart.config.chartHeight - pfBarChart.config.labelHeight, 0]);
    chart.attr('transform', 'translate(40,10)');
    chart.call(d3.axisLeft(y));


    // Draw the bars.
    chart.append('rect')
      .attr('height', (d) => { return this.barHeight(d) + 'px'; })
      .attr('width',  () => { return this.barWidth() + '%'; })
      .attr('x',      (d, i) => { return this.barX(i) + '%'; })
      .attr('y',      (d) => { return this.barY(d); })
      .attr('fill',   (d, i) => { return pfBarChart.chart.colors[i] });

    // Draw the chart labels.
    chart.append('text')
      .text((d, i) => { return pfBarChart.chart.data.labels[i]; })
      .attr('height', pfBarChart.config.barThickness)
      .attr('transform', 'translate(60,0)')
      .attr('x',      (d, i) => { return this.barX(i) + '%'; })
      .attr('y',      pfBarChart.config.chartHeight - pfBarChart.config.labelHeight/2)
      .attr('fill',   pfBarChart.config.labelColor);

    return chart;
  },

  /* ---
   * Returns the height (as px) of the bar.
   */
  barHeight: function(d) {
    let size = pfBarChart.getBarSize(d);
    let chartHeight = pfBarChart.config.chartHeight - pfBarChart.config.labelHeight;
    return (size / 100 * chartHeight);
  },

  /* ---
   * Returns the width (as %) of the bar.
   */
  barWidth: function() {
    let gutters = pfBarChart.chart.data.counts.length;
    return ((100 - gutters) / pfBarChart.chart.data.counts.length);
  },

  /* ---
   * Returns the y value (as px) of the bar.
   */
  barY: function(d) {
    let height = this.barHeight(d);
    let chartHeight = pfBarChart.config.chartHeight - pfBarChart.config.labelHeight;
    return chartHeight - height;
  },

  /* ---
   * Returns the x value (as %) of the bar, based on iterator.
   */
  barX: function(i) {
    return (i * (this.barWidth() + 1));
  }

};
