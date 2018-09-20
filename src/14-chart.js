import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  var height = 400
  var width = 600

  var margin = { top: 20, right: 50, bottom: 30, left: 50 }

  var width = 600 - margin.left - margin.right

  var height = 400 - margin.top - margin.bottom

  var svg = d3
    .select('#chart14')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'dog', 'cow'])
    .range(['#e66101', '#fdb863', '#b2abd2', '#5e3c99'])

  var yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 0])

  var xScale = d3.scaleBand().range([0, width])

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

    xScale.domain(names)

    // Add and style your marks here
    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })
      .attr('y', function(d) {
        return yPositionScale(d.hamburgers)
      })
      .attr('height', function(d) {
        return height - yPositionScale(d.hamburgers)
      })
      .attr('x', function(d) {
        return xScale(d.name)
      })

    /* Code for the axis */

    var xAxis = d3.axisLeft(yPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .call(xAxis)

    var yAxis = d3.axisBottom(xScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(yAxis)
  }
})()
