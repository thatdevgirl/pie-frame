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
