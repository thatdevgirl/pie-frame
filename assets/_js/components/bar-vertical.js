import PFBar from '../base/bar';

class PFBarVertical {
  constructor() {
    this.pfBar = new PFBar();
  }

  display(chart) {
    this.base = this.pfBar.display(chart, this.pfBar.chartHeight);

    this.drawAxis();
    this.drawBars();
    this.drawLabels();

    return this.base;
  }

  /* ---
   * Helper: Draw the chart's axis.
   */
  drawAxis() {
    const y = d3.scaleLinear().range([this.pfBar.chartHeight - this.pfBar.labelHeight, 0]);
    this.base.attr('transform', 'translate(40,10)');
    this.base.call(d3.axisLeft(y));
  }
  
  /* ---
   * Helper: Draw the chart's bars.
   */
  drawBars() {
    this.base.append('rect')
      .attr('height', (d) => { return this.barHeight(d) + 'px'; })
      .attr('width',  () => { return this.barWidth() + '%'; })
      .attr('x',      (d, i) => { return this.barX(i) + '%'; })
      .attr('y',      (d) => { return this.barY(d); })
      .attr('fill',   (d, i) => { return this.pfBar.chart.colors[i] });
  }

  /* ---
   * Helper: Draw the chart's labels.
   */
  drawLabels() {
    this.base.append('text')
      .text((d, i) => { return this.pfBar.chart.data.labels[i]; })
      .attr('height', this.pfBar.barThickness)
      .attr('transform', 'translate(60,0)')
      .attr('x',      (d, i) => { return this.barX(i) + '%'; })
      .attr('y',      this.pfBar.chartHeight - this.pfBar.labelHeight/2)
      .attr('fill',   this.pfBar.labelColor);
  }

  /* ---
   * Helper: Returns the height (as px) of the bar.
   */
  barHeight(d) {
    const size = this.pfBar.getBarSize(d);
    const chartHeight = this.pfBar.chartHeight - this.pfBar.labelHeight;
    return (size / 100 * chartHeight);
  }

  /* ---
   * Helper: Returns the width (as %) of the bar.
   */
  barWidth() {
    const gutters = this.pfBar.chart.data.counts.length;
    return ((100 - gutters) / this.pfBar.chart.data.counts.length);
  }

  /* ---
   * Helper: Returns the y value (as px) of the bar.
   */
  barY(d) {
    const height = this.barHeight(d);
    const chartHeight = this.pfBar.chartHeight - this.pfBar.labelHeight;
    return chartHeight - height;
  }

  /* ---
   * Helper: Returns the x value (as %) of the bar, based on iterator.
   */
  barX(i) {
    return (i * (this.barWidth() + 1));
  }
}

module.exports = PFBarVertical;
