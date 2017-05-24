import twgl from 'twgl.js';
require('../css/main.scss');

var el = document.getElementById('app');
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;// * window.devicePixelRatio;
canvas.height = window.innerHeight;// * window.devicePixelRatio;
el.appendChild(canvas);

var gl = canvas.getContext("webgl2");
var programInfo = twgl.createProgramInfo(gl, [require('./shaders/default.vert'), require('./shaders/default.frag')]);

const s = 1000;

var arrays = {
  position: { numComponents: 2, data: [-1, -1, 1, -1, 0, 1] },
  color: { numComponents: 3, data: [
    1,0,0,
    0,1,0,
    0,0,1
  ]}
};
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

// var bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);
// var bufferInfo = twgl.createBufferInfoFromArrays(gl, attrs);

var offset = Math.random() * 40;
function render(time) {
  if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  var uniforms = {
    time: offset + time * 0.0005,
    resolution: [gl.canvas.width, gl.canvas.height]
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
