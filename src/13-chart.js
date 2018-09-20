import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  var height = 500
  var width = 400

  var margin = { top: 20, right: 50, bottom: 30, left: 70 }

  var width = 400 - margin.left - margin.right

  var height = 500 - margin.top - margin.bottom

  var svg = d3
    .select('#chart13')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var widthScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'dog', 'cow'])
    .range(['#e66101', '#fdb863', '#b2abd2', '#5e3c99'])

  var yScale = d3.scaleBand().range([height, 0])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    var names = datapoints.map(function(d) {
      console.log(d.name)
      return d.name
    })

    yScale.domain(names)

    // Add and style your marks here

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('width', function(d) {
        return widthScale(d.hamburgers)
      })
      .attr('height', yScale.bandwidth())
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })
      .attr('y', function(d) {
        return yScale(d.name)
      })

    /* Code for the axis */

    var yAxis = d3.axisLeft(yScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(widthScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
