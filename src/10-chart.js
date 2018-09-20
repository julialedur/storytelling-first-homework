/* global d3 */

import * as d3 from 'd3'
;(function() {
  var margin = { top: 20, right: 50, bottom: 30, left: 50 }

  var width = 400 - margin.left - margin.right

  var height = 400 - margin.top - margin.bottom

  // Build your SVG here
  // using all of that cut-and-paste magic

  var svg = d3
    .select('#chart10')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 0])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    console.log('Data is', datapoints)
    // Add and style your marks here

    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', 7)
      .attr('cx', function(d) {
        return xPositionScale(d.hamburgers)
      })
      .attr('cy', function(d) {
        return yPositionScale(d.hotdogs)
      })
      .attr('fill', '#F5B7B1')
  }

  var yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
})()
