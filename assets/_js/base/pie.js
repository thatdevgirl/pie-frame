class PFPie {
  constructor() {
    this.size = 500;
    this.radius = 250;
  }

  /* ---
   * Creates a pie chart from the chartInfo object.
   */
  display(chart) {
    this.chart = chart;

    this.createSvg();
    this.createPie();
    this.createLabels();
  }

  /* ---
   * Helper: Returns the base SVG object.
   */
  createSvg() {
    this.svg = d3.select(this.chart.el).append('svg').attr('width', this.size).attr('height', this.size);

    if (this.chart.desc) {
      this.svg.append('desc').text(this.chart.desc);
    }
  }

  /* ---
   * Helper: Creates the actual pie chart.
   */
  createPie() {
    const arc = d3.arc().innerRadius(0).outerRadius(this.radius);
    const pie = d3.pie().value(function(d) { return d; }).sort(null);

    this.svg.append('g')
            .attr('transform', 'translate(' + this.radius +  ',' + this.radius + ')')
            .selectAll('path')
            .data(pie(this.chart.data.counts))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => { return this.chart.colors[d.index]; });
  }

  /* ---
   * Helper: Creates chart labels.
   */
  createLabels() {
    const total = this.chart.data.counts.reduce((sum, current) => { return sum + parseInt(current) }, 0);
    let html = '';

    for (let i=0; i<this.chart.data.labels.length; i++) {
      let color = this.chart.colors[i],
          label = this.chart.data.labels[i],
          count = Math.round(this.chart.data.counts[i] / total * 100);

      html += `<p>
                 <span class="legend" style="background: ${color}"></span>
                 ${label} (${count}%)
               </p>`;
    }

    $(this.chart.el).append(html);
  }
}

module.exports = PFPie;
