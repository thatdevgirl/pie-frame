import PFBar from '../base/bar';

class PFBarHorizontal {
  constructor() {
    this.pfBar = new PFBar();
  }

  /* ---
   * Display the chart!
   */
  display(chart) {
    this.base = this.pfBar.display(chart, this.getHeight(chart));

    this.drawBars();
    this.drawLabels();
    this.drawCounters();

    return this.base;
  }

  /* ---
   * Helper: Determines height of the SVG by the number of bars.
   */
  getHeight(chart) {
    return chart.data.counts.length * (this.pfBar.barThickness + this.pfBar.barGutter);
  }

  /* ---
   * Helper: Draw the chart's bars.
   */
  drawBars() {
    this.base.append('rect')
      .attr('height', this.pfBar.barThickness)
      .attr('width',  (d) => { return this.pfBar.getBarSize(d) + '%'; })
      .attr('x',      this.pfBar.labelWidth)
      .attr('y',      (d, i) => { return this.barY(i); })
      .attr('fill',   (d, i) => { return this.pfBar.chart.colors[i] });
  }

  /* ---
   * Helper: Draw the chart's labels.
   */
  drawLabels() {
    this.base.append('text')
      .text((d, i) => { return this.pfBar.chart.data.labels[i]; })
      .attr('height', this.pfBar.barThickness)
      .attr('y',      (d, i) => { return this.barY(i, this.pfBar.labelBaseline); })
      .attr('fill',   this.pfBar.labelColor);
  }

  /* ---
   * Helper: Draw the counter text on top of the bars.
   */
  drawCounters() {
    this.base.append('text')
      .text((d) => { return d; })
      .attr('height', this.pfBar.barThickness)
      .attr('x',      this.pfBar.labelWidth + this.pfBar.barGutter)
      .attr('y',      (d, i) => { return this.barY(i, this.pfBar.labelBaseline); })
      .attr('fill',   this.pfBar.countColor);
  }

  /* ---
   * Returns the y value (as px) of the bar, based on iterator.
   */
  barY(i, offset=-7) {
    return (i * this.pfBar.barThickness) + (i * this.pfBar.barGutter) + offset;
  }
}

module.exports = PFBarHorizontal;
