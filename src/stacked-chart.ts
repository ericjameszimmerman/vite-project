import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  current: number;  // RMS Current in Amperes
  voltage: number;  // RMS Voltage in Volts
}

// Generate 30 seconds of sample RMS data
const baseTime = new Date();
const data: DataPoint[] = Array.from({ length: 31 }, (_, i) => {
  const time = new Date(baseTime.getTime() + i * 1000);
  return {
    date: time,
    current: 5 + Math.sin(i * 0.2) * 0.5,
    voltage: 220 + Math.cos(i * 0.3) * 5,
  };
});

// Set up dimensions
const totalWidth = 800;
const totalHeight = 500;
const margin = { top: 20, right: 60, bottom: 40, left: 60 };
const spacing = 40; // Space between the two charts

// Calculate dimensions for each chart
const width = totalWidth - margin.left - margin.right;
const height = (totalHeight - margin.top - margin.bottom - spacing) / 2;

// Create main SVG
const svg = d3.select('#chart')
  .attr('width', totalWidth)
  .attr('height', totalHeight);

// Create scales
const x = d3.scaleTime()
  .domain(d3.extent(data, d => d.date) as [Date, Date])
  .range([margin.left, totalWidth - margin.right]);

// Voltage scale
const yVoltage = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.voltage) as number])
  .range([height, 0]);

// Current scale
const yCurrent = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.current) as number])
  .range([height, 0]);

// Create top (voltage) chart group
const voltageChart = svg.append('g')
  .attr('transform', `translate(0,${margin.top})`);

// Create bottom (current) chart group
const currentChart = svg.append('g')
  .attr('transform', `translate(0,${margin.top + height + spacing})`);

// Create line generators
const voltageLine = d3.line<DataPoint>()
  .x(d => x(d.date))
  .y(d => yVoltage(d.voltage));

const currentLine = d3.line<DataPoint>()
  .x(d => x(d.date))
  .y(d => yCurrent(d.current));

// Add voltage chart elements
voltageChart.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', '#1f77b4')
  .attr('stroke-width', 2)
  .attr('d', voltageLine);

voltageChart.selectAll('.voltage-point')
  .data(data)
  .join('circle')
  .attr('class', 'voltage-point')
  .attr('cx', d => x(d.date))
  .attr('cy', d => yVoltage(d.voltage))
  .attr('r', 3)
  .attr('fill', '#1f77b4');

// Add current chart elements
currentChart.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', '#ff7f0e')
  .attr('stroke-width', 2)
  .attr('d', currentLine);

currentChart.selectAll('.current-point')
  .data(data)
  .join('circle')
  .attr('class', 'current-point')
  .attr('cx', d => x(d.date))
  .attr('cy', d => yCurrent(d.current))
  .attr('r', 3)
  .attr('fill', '#ff7f0e');

// Add axes for voltage chart
voltageChart.append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(yVoltage))
  .append('text')
  .attr('x', -40)
  .attr('y', height / 2)
  .attr('fill', '#1f77b4')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Voltage (V)');

// Add axes for current chart
currentChart.append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(yCurrent))
  .append('text')
  .attr('x', -40)
  .attr('y', height / 2)
  .attr('fill', '#ff7f0e')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Current (A)');

// Add x-axis at the bottom
currentChart.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x)
    .ticks(10)
    .tickFormat(d => `${d.getSeconds()}s`));

// Add chart titles
voltageChart.append('text')
  .attr('x', totalWidth / 2)
  .attr('y', -5)
  .attr('text-anchor', 'middle')
  .attr('font-weight', 'bold')
  .text('RMS Voltage');

currentChart.append('text')
  .attr('x', totalWidth / 2)
  .attr('y', -5)
  .attr('text-anchor', 'middle')
  .attr('font-weight', 'bold')
  .text('RMS Current');

// Add X-axis label at the bottom
svg.append('text')
  .attr('x', totalWidth / 2)
  .attr('y', totalHeight - 5)
  .attr('text-anchor', 'middle')
  .text('Time (seconds)');
