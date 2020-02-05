// $(document).ready(function(){
// });

const D3 = require('d3');
const Sugar = require('sugar');
const Nunjucks = require('nunjucks');
const Venn = require('venn.js');

const data = `Exclusive_donors,Candidate,Candidate_full,Most_popular,Overlap,Bennet,Biden,Booker,Bullock,Buttigieg,Castro,de Blasio,Delaney,Gabbard,Gillibrand,Gravel,Harris,Hickenlooper,Inslee,Klobuchar,Messam,Moulton,Ojeda,O’Rourke,Patrick,Ryan,Sanders,Sestak,Steyer,Swalwell,Warren,Williamson,Yang,Total
634,Bennet,Michael Bennet,Buttigieg,27.25%,,448,376,273,549,316,14,46,70,198,18,282,46,257,491,5,44,0,169,6,63,154,36,259,95,397,64,109,2015
16551,Biden,Joe Biden,Buttigieg,9.94%,448,,1206,296,2371,763,20,58,204,448,11,1604,52,333,1468,9,61,0,753,15,112,913,170,1195,189,1912,121,269,23848
3321,Booker,Cory Booker,Warren,25.76%,376,1206,,236,1920,1408,28,45,174,673,41,1649,58,550,1137,12,75,0,488,20,80,810,113,605,167,2248,155,349,8728
438,Bullock,Steve Bullock,Buttigieg,26.34%,273,296,236,,369,199,8,44,70,115,15,163,46,192,353,1,31,0,133,7,55,137,38,198,37,262,43,85,1401
15431,Buttigieg,Pete Buttigieg,Warren,16.11%,549,2371,1920,369,,1450,27,84,383,782,116,2395,82,710,1771,13,100,2,1176,31,108,1705,136,1033,224,4211,260,773,26146
1692,Castro,Julián Castro,Warren,35.97%,316,763,1408,199,1450,,25,42,191,662,81,1282,47,543,790,12,70,0,385,12,72,762,85,430,181,2170,149,314,6033
135,de Blasio,Bill de Blasio,Warren,19.91%,14,20,28,8,27,25,,2,19,22,6,23,1,25,21,2,3,0,10,1,5,43,6,23,6,46,14,16,231
158,Delaney,John Delaney,Klobuchar,23.14%,46,58,45,44,84,42,2,,41,25,3,30,26,48,87,5,13,0,17,1,26,34,7,32,16,40,18,29,376
4596,Gabbard,Tulsi Gabbard,Sanders,24.51%,70,204,174,70,383,191,19,41,,173,502,175,18,179,215,9,23,2,76,4,29,1902,32,168,25,471,307,743,7761
1335,Gillibrand,Kirsten Gillibrand,Warren,31.96%,198,448,673,115,782,662,22,25,173,,41,807,31,333,616,8,53,0,205,10,40,479,51,316,79,1270,144,168,3974
913,Gravel,Mike Gravel,Sanders,56.02%,18,11,41,15,116,81,6,3,502,41,,24,7,94,27,5,7,0,17,1,9,1623,5,25,9,368,221,218,2897
4372,Harris,Kamala Harris,Warren,30.81%,282,1604,1649,163,2395,1282,23,30,175,807,24,,48,404,1256,9,58,0,657,21,75,916,91,563,173,3445,171,311,11181
167,Hickenlooper,John Hickenlooper,Buttigieg,22.22%,46,52,58,46,82,47,1,26,18,31,7,48,,52,82,1,12,0,23,0,16,20,8,18,15,66,10,32,369
984,Inslee,Jay Inslee,Warren,32.22%,257,333,550,192,710,543,25,48,179,333,94,404,52,,437,12,53,1,190,6,67,622,67,356,78,1074,126,229,3333
2897,Klobuchar,Amy Klobuchar,Buttigieg,23.46%,491,1468,1137,353,1771,790,21,87,215,616,27,1256,82,437,,9,72,1,398,13,109,449,140,528,133,1553,131,260,7549
13,Messam,Wayne Messam,Warren,35.85%,5,9,12,1,13,12,2,5,9,8,5,9,1,12,9,,1,0,5,0,5,18,2,6,6,19,5,13,53
118,Moulton,Seth Moulton,Buttigieg,28.41%,44,61,75,31,100,70,3,13,23,53,7,58,12,53,72,1,,1,21,0,20,37,11,63,33,74,17,20,352
5,Ojeda,Richard Ojeda,Sanders,55.56%,0,0,0,0,2,0,0,0,2,0,0,0,0,1,1,0,1,,0,0,0,10,0,1,0,3,1,2,18
2013,O’Rourke,Beto O’Rourke,Buttigieg,24.97%,169,753,488,133,1176,385,10,17,76,205,17,657,23,190,398,5,21,0,,8,47,520,43,298,84,950,79,177,4709
36,Patrick,Deval Patrick,Buttigieg,32.98%,6,15,20,7,31,12,1,1,4,10,1,21,0,6,13,0,0,0,8,,1,4,1,8,0,17,3,3,94
193,Ryan,Tim Ryan,Biden,21.29%,63,112,80,55,108,72,5,26,29,40,9,75,16,67,109,5,20,0,47,1,,57,15,52,16,87,29,29,526
37639,Sanders,Bernie Sanders,Warren,9.99%,154,913,810,137,1705,762,43,34,1902,479,1623,916,20,622,449,18,37,10,520,4,57,,129,868,66,4880,658,1373,48861
828,Sestak,Joe Sestak,Warren,13.58%,36,170,113,38,136,85,6,7,32,51,5,91,8,67,140,2,11,0,43,1,15,129,,87,14,196,21,26,1443
3853,Steyer,Tom Steyer,Biden,16.00%,259,1195,605,198,1033,430,23,32,168,316,25,563,18,356,528,6,63,1,298,8,52,868,87,,100,1064,169,226,7469
85,Swalwell,Eric Swalwell,Buttigieg,37.40%,95,189,167,37,224,181,6,16,25,79,9,173,15,78,133,6,33,0,84,0,16,66,14,100,,213,29,43,599
18132,Warren,Elizabeth Warren,Sanders,15.07%,397,1912,2248,262,4211,2170,46,40,471,1270,368,3445,66,1074,1553,19,74,3,950,17,87,4880,196,1064,213,,441,853,32383
2383,Williamson,Marianne Williamson,Sanders,16.67%,64,121,155,43,260,149,14,18,307,144,221,171,10,126,131,5,17,1,79,3,29,658,21,169,29,441,,291,3947
9072,Yang,Andrew Yang,Sanders,11.11%,109,269,349,85,773,314,16,29,743,168,218,311,32,229,260,13,20,2,177,3,29,1373,26,226,43,853,291,,12362
`

const templateString = `<p>That's about {{ percentA }}% of <span class="colorA">{{ candidateA | safe }}</span> {{ totalA }} donors and {{ percentB }}% of <span class="colorB">{{ candidateB | safe }}</span> {{ totalB }} donors.</p>`;


Sugar.extend();


const lerp = function( a, b, t )
{
  return (1 - t) * a + t * b
}

const donors = [];
const startingSelection = ['Warren', 'Buttigieg'];

D3.csvParse( data, row => donors.push(row) );
D3.selectAll("select.main").html( null );


donors.forEach( ( row ) => D3.selectAll("select.main")
  .append("option")
    .attr("value", row.Candidate)
    .text( row.Candidate_full )
    .attr('selected', (d, i) => row.Candidate == startingSelection[i] ? 'selected' : null )
);


function sizeSelect( select )
{
  var targetId = "#" + $("#"+select).attr( "id" )+"-temp";
  console.log( $( targetId ).html() );
  $(targetId).find("option").html( $("#" + $("#"+select).attr( "id" ) + " option:selected").text() );
  $("#"+select).width( $(targetId).width() );
  $("#"+select).blur();
}

D3.selectAll("select")
  .on("change", (d) => refresh() );



const template = Nunjucks.compile( templateString );


const canvasWidth = 730;
const canvasHeight = 300;

const svg = D3.select("figure svg")
  // .attr( "width", canvasWidth )
  .attr( "height", canvasHeight );


const group = svg.append("g");

const circles = group
  .selectAll("circle")
  .data( [1, 2] )
  .enter()
  .append("circle")

const labels = group
  .selectAll("text")
  .data( [{ Candidate: 'Warren', Total: 14881}, { Candidate:'Buttigieg', Total: 13409}] )
  .enter()
  .append("text")


//
// D3.select("svg")
//   .append("line")
//   .attr( "x1", canvasWidth/2)
//   .attr( "y1", 0)
//   .attr( "x2", canvasWidth/2)
//   .attr( "y1", canvasHeight);
//
//   D3.select("svg")
//     .append("line")
//     .attr( "x1", 0)
//     .attr( "y1", canvasHeight/2)
//     .attr( "x2", canvasWidth)
//     .attr( "y2", canvasHeight/2);


refresh();
center();


function center()
{
  // console.log( group.node().getBBox() );
    window.requestAnimationFrame( () => {
      const rect = group.node().getBBox();
      const cX = rect.x + rect.width/2;
      const cY = rect.y + rect.height/2;
      const dX = canvasWidth/2 - cX;
      const dY = canvasHeight/2 - cY;

      group
        .attr('transform', `translate(${dX}, ${dY})`);

      center();
    });
}


function circleArea(r, width) {
    return r * r * Math.acos(1 - width/r) - (r - width) * Math.sqrt(width * (2 * r - width));
}


function circleOverlap(r1, r2, d) {
    // no overlap
    if (d >= r1 + r2) {
        return 0;
    }

    // completely overlapped
    if (d <= Math.abs(r1 - r2)) {
        return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
    }

    var w1 = r1 - (d * d - r2 * r2 + r1 * r1) / (2 * d),
        w2 = r2 - (d * d - r1 * r1 + r2 * r2) / (2 * d);
    return circleArea(r1, w1) + circleArea(r2, w2);
}

function redraw( data, circles )
{
  const margin = 10;
  const targetHeight = canvasHeight * .75 - margin * 2;

  const totals = data.map( d => Math.sqrt(parseInt(d.Total)) );
  const scale = targetHeight / totals.max() / 2;

  const radius = donorCount => Math.sqrt(donorCount) * scale;


  const radii = data.map( d => radius( parseInt(d.Total) ) );
  const maxHeight = radii.max() * scale;

  const cX = canvasWidth/2;
  const cY = canvasHeight/2;

  const maxOverlapDistance = radii[0] - radii[1];
  const minOverlapDistance = radii[0] + radii[1];

  const overlap = parseInt( data[0][ data[1].Candidate ] ) / parseInt( data[0].Total );
  const ov = parseInt( data[0][ data[1].Candidate ] );
  // const spacing = 0;//lerp( minOverlapDistance, maxOverlapDistance, overlap );

  var spacing = 0;

  var failsafe = 2000;
  var overlapCalculated = circleOverlap( radii[0], radii[1], spacing ) / (Math.PI * radii[0] * radii[0]);


  var shouldDecrease = overlapCalculated > overlap;
  // console.log( overlapCalculated, overlap, shouldDecrease);

  var overlapDistance = Math.abs( overlap - overlapCalculated );
  var lastOverlapDistance = overlapDistance;

  while( failsafe >= 0 && ov > 0 && overlapDistance <= lastOverlapDistance  )
  {
    overlapCalculated = circleOverlap( radii[0], radii[1], spacing ) / (Math.PI * radii[0] * radii[0]);
    spacing += 1;
    failsafe--;

    lastOverlapDistance = overlapDistance;
    overlapDistance = Math.abs( overlap - overlapCalculated );

  }

  // console.log( ov, overlapCalculated, overlap, spacing, failsafe);

  if( ov == 0 )
    spacing = minOverlapDistance + 10;



  const width = radii[0] + Math.min( radii[0] + radii[1], spacing ) + radii[1];
  // const currentX = -radii[0] + width/2;
  const offsetX = cX + radii[0] - width/2;


  circles
    .data( data )
    .attr( "cx", (d, i) => i * spacing )
    .attr( "cy", d => cY  )
    .attr( "r", (d,i) => radii[i] );

  labels
    .data( data )
    .classed( "offset", (d, i) => radii[i] < 40)
    .attr( "y", d => cY  )
    .attr( "dy", 0)
    .html( ({Candidate, Total}, i) => `<tspan x="${ i * spacing }" dy="-4">${Candidate}</tspan><tspan x="${ i * spacing }" dy="16">${ parseInt( Total ).format(0)  }</tspan>` )
    .attr( "style", (data, i, elements) => {
      const bounds = elements[i].getBBox();
      const direction = i == 0 ? -1 : 1;
      const textMargin = 10;
      const offset = radii[i] < 40
        ? direction * (radii[i] + bounds.width/2 + textMargin)
        : 0;

      return `transform: translate(${offset}px, 0)`;
    })


}

function refresh()
{
  sizeSelect( "candidate-a" );
  sizeSelect( "candidate-b" );

  const values = Array.from( document.getElementsByTagName( "select" ) ).map( 'value' );
  const [ candidateA, candidateB ] = values;

  const datumA = donors.find( donor => donor.Candidate == candidateA );
  const datumB = donors.find( donor => donor.Candidate == candidateB );
  const candidates = [ datumA, datumB ];


  redraw( candidates, circles );


  const percentA = ( parseInt( datumA[ candidateB ] ) / parseInt( datumA[ "Total" ] ) ) * 100;
  const percentB = ( parseInt( datumB[ candidateA ] ) / parseInt( datumB[ "Total" ] ) ) * 100;

  const view = {
    candidateA: candidateA + (candidateA.last() == 's' ? '&rsquo;' : '&rsquo;s'),
    candidateB: candidateB + (candidateB.last() == 's' ? '&rsquo;' : '&rsquo;s'),
    percentA: percentA < 0.1 ? "<1" : percentA.format(0),
    percentB: percentB < 0.1 ? "<1" : percentB.format(0),
    totalA: parseInt( datumA[ "Total" ] ).format(0),
    totalB: parseInt( datumB[ "Total" ] ).format(0),
    overlap: parseInt(datumA[ candidateB ]).format(0)
  }

  document.getElementById("number").innerHTML = Nunjucks.renderString( "{{ overlap }} Pennsylvanians", view );
  document.getElementById("description").innerHTML = template.render( view );
}
