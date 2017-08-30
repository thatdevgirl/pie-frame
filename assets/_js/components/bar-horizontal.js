import PFBar from '../base/bar';

class PFBarHorizontal {
  constructor() {
    this.pfBar = new PFBar();
  }

  display(chart, orientation) {
    this.pfBar.display(chart, this.height);
    this.create();
  }

  /* ---
   * Helper: Determines height of the SVG by the number of bars.
   */
  getHeight() {
    this.height = this.chart.data.counts.length * (this.pfBar.barThickness + this.pfBar.barGutter);
  }

  /* ---
   * Displays the chart!
   */
  create() {
    let chart = this.pfBar.createBase();

    // Draw the bars.
    chart.append('rect')
      .attr('height', this.pfBar.barThickness)
      .attr('width',  (d) => { return this.pfBar.getBarSize(d) + '%'; })
      .attr('x',      this.pfBar.labelWidth)
      .attr('y',      (d, i) => { return this.barY(i); })
      .attr('fill',   (d, i) => { return this.pfBar.chart.colors[i] });

    // Draw the chart labels.
    chart.append('text')
      .text((d, i) => { return this.pfBar.chart.data.labels[i]; })
      .attr('height', this.pfBar.barThickness)
      .attr('y',      (d, i) => { return this.barY(i, this.pfBar.labelBaseline); })
      .attr('fill',   this.pfBar.labelColor);

    // Draw the counter text on top of the bars.
    chart.append('text')
      .text((d) => { return d; })
      .attr('height', this.pfBar.barThickness)
      .attr('x',      this.pfBar.labelWidth + this.pfBar.barGutter)
      .attr('y',      (d, i) => { return this.barY(i, this.pfBar.labelBaseline); })
      .attr('fill',   this.pfBar.countColor);

    return chart;
  }

  /* ---
   * Returns the y value (as px) of the bar, based on iterator.
   */
  barY(i, offset=-7) {
    return (i * this.pfBar.barThickness) + (i * this.pfBar.barGutter) + offset;
  }
}

module.exports = PFBarHorizontal;
