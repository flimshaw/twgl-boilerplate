import twgl from 'twgl.js';
require('../css/main.scss');

var el = document.getElementById('app');
var canvas = document.createElement('canvas');
let res = [Math.floor(window.innerWidth*window.devicePixelRatio),Math.floor(window.innerHeight*window.devicePixelRatio)]
canvas.width = res[0];
canvas.height = res[1];
el.appendChild(canvas);

init();

function init() {

  var gl = canvas.getContext("webgl2");
  // let res = [Math.floor(gl.canvas.width*window.devicePixelRatio),Math.floor(gl.canvas.height*window.devicePixelRatio)]
  // canvas.width = res[0];
  // canvas.height = res[1];
  debugger;

  var programInfo = twgl.createProgramInfo(gl, [require('./shaders/default.vert'), require('./shaders/default.frag')]);

  const s = 1000;

  var arrays = {
    position: { numComponents: 2, data: [-1, -1, 1, -1, 0, 1] },
    color: { numComponents: 3, data: [
      1,0,0,
      0,1,0,
      0,0,1
    ]},
    idx: { numComponents: 1, data: [0,1,2]}
  };
  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  var offset = Math.random() * 40;
  console.log(res)
  gl.viewport(0, 0, res[0], res[1]);
  function render(time) {
    // if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
    // res = [gl.canvas.width,gl.canvas.height]

    // }


    var uniforms = {
      u_time: offset + time * 0.0005,
      resolution: res//[gl.canvas.width, gl.canvas.height]
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
