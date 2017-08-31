class PFBar {
  constructor() {
    this.barThickness  = 40,      // thickness of individual bars
    this.barGutter     = 8,       // space between bars
    this.labelWidth    = 120,     // label width
    this.labelHeight   = 50,      // label height
    this.labelBaseline = 20,      // label text baseline
    this.labelColor    = 'black', // text color for bar labels
    this.countColor    = 'white', // text color for bar count text
    this.chartHeight   = 500      // set height for vertical bar charts
  }

  /* ---
   * Creates a base bar chart from the chartInfo object.
   */
  display(chart, height) {
    this.chart = chart;
    this.createSvg(height);
    return this.createBase();
  }

  /* ---
   * Helper: Returns the base SVG object.
   */
  createSvg(height) {
    this.svg = d3.select(this.chart.el).append('svg').attr('width', '100%').attr('height', height);

    if (this.chart.desc) {
      this.svg.append('desc').text(this.chart.desc);
    }
  }

  /* ---
   * Helper: Initial chart setup.
   */
  createBase() {
    let base = this.svg.selectAll('g').data(this.chart.data.counts).enter().append('g');

    base.append('title')
      .text((d, i) => { return `Data for ${this.chart.data.labels[i]}`; });

    base.append('desc')
      .text((d, i) => { return `The number of ${this.chart.data.labels[i]} is ${d}, which is ${this.getBarSize(d)}% of the total.`; });

    return base;
  }

  /* ---
   * Helper: Returns the size of the bar based on passed-in data.
   */
  getBarSize(d) {
    const maxSize = Math.max(...this.chart.data.counts);
    return (!maxSize) ? 0 : (d / maxSize * 100);
  }
}

module.exports = PFBar;
