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

  var programInfo = twgl.createProgramInfo(gl, [require('./shaders/default.vert'), require('./shaders/default.frag')]);

  const s = 1000;
  const particleCount = 2e2;

  var pos = [];
  var color = [];
  var idx = [];

  for(var i = 0; i < particleCount; i++) {
    pos.push(i * .005 - (particleCount * .0025));
    pos.push(0.);
    const c = Math.random();
    color.push(c);
    color.push(c*.5);
    color.push(c);
    idx.push(i);
  }

  var arrays = {
    position: { numComponents: 2, data: pos },
    color: { numComponents: 3, data: color },
    idx: { numComponents: 1, data: idx}
  };
  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  var offset = Math.random() * 40;
  // console.log(res)
  gl.viewport(0, 0, res[0], res[1]);
  function render(time) {

    var uniforms = {
      u_time: offset + time * 0.0005,
      resolution: res//[gl.canvas.width, gl.canvas.height]
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLE_FAN );

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
