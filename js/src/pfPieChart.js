var pfPieChart = {

  config: {
    size: 500,
    radius: 250
  },

  /* ---
   * Function that creates a horizontal bar chart from the chartInfo object.
   */
  display: function(chart) {
    this.chart = chart;

    this.createSvg();
    this.createPie();
  },

  /* ---
   * Helper function that returns the base SVG object
   */
  createSvg: function() {
    this.svg = d3.select(this.chart.el).append('svg')
                 .attr('width', this.config.size)
                 .attr('height', this.config.size);
  },

  /* ---
   * Helper function that creates the actual pie chart
   */
  createPie: function() {
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(this.config.radius);

    var pie = d3.pie()
                .value(function(d) { return d; })
                .sort(null);

    this.svg.append('g')
            .attr('transform', 'translate(' + this.config.radius +  ',' + this.config.radius + ')')
            .selectAll('path')
            .data(pie(this.chart.data.counts))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => { return this.chart.colors[d.index]; });
  }

}
