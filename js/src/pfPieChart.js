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
    this.createLabels();
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
  },

  /* ---
   * Helper function that creates chart labels
   */
  createLabels: function() {
    let html = '',
        total = this.chart.data.counts.reduce((sum, current) => { return sum + parseInt(current) }, 0);

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
