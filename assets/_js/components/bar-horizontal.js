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
