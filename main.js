let d = 200;
let total = 0;
let totalCircle = 0;
let pi;
let xyValues = [];
let recentData;
let xMin;
let xMax;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight/3);
    canvas.parent('canvasContainer')
    background(255);
    // draw a square then circle
    // square(x_left, y_top, width/height)
    square(0, 0, d)
    circle(d/2, d/2, d)

  const ctx = document.getElementById("myChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: 'Estimate',
        data: [], // start empty
        borderColor: "pink",
        fill: false,
        showLine: true,
      },
      {
        label: "True π",
        data: [], // array of {x, y: Math.PI}
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
        showLine: true,
        fill: false
      }]
    },
    options: {
      animation: false,
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Total Points'
          }
        },
        y: {
          min: 2.5,
          max: 3.5,
          title: {
            display: true,
            text: 'Estimated \({\pi}\)'
          }
        }
      }
    }
  });
}

function withinCircle(x,y) {
  distance = ((d/2-x)**2+(d/2-y)**2)**0.5
  return distance <= d/2
}
  
function draw() {

    //make lilac colour
    total++
    //plot random points
    x = random(0,d)
    y = random(0,d)
    fill(115, 173, 217)
    noStroke();
  
    if (withinCircle(x,y)) {
      fill(217, 115, 115)
      totalCircle++
    }
  
    circle(x, y, 2)

    pi = 4*(totalCircle/total)


    document.getElementById('pi').innerHTML = pi
    document.getElementById('points').innerHTML = total


    if (total%10 == 0) {
      // chart stuff
      chart.data.datasets[0].data.push({x: total, y: pi});
      
      recentData = chart.data.datasets[0].data;
      xMin = recentData[0].x;
      xMax = recentData[recentData.length - 1].x;
      chart.options.scales.x.min = xMin;
      chart.options.scales.x.max = xMax;

      chart.data.datasets[0].data.push({ x: total, y: pi });       // π estimate
      chart.data.datasets[1].data.push({ x: total, y: Math.PI });  // flat pi line

      chart.update();
    }


}


setup()
draw()