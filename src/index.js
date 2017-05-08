import twgl from 'twgl.js';
require('../css/main.scss');

var el = document.getElementById('app');
var canvas = document.createElement('canvas');
// canvas.setAttribute('width', window.innerWidth * window.devicePixelRatio);
// canvas.setAttribute('height', window.innerHeight * window.devicePixelRatio);
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
el.appendChild(canvas);

var gl = canvas.getContext("webgl");
var programInfo = twgl.createProgramInfo(gl, [require('./shaders/default.vert'), require('./shaders/default.frag')]);

var arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

var fboTex = twgl.createTexture(gl);
//
// var fbi = twgl.createFramebufferInfo(gl);
// // gl.bindFramebuffer(gl.FRAMEBUFFER, fbi.framebuffer, fboTex);

function render(time) {
  if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
    // resize the attachments to match
    // twgl.resizeFramebufferInfo(gl, fbi, attachments);
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  var uniforms = {
    time: time * 0.001,
    resolution: [gl.canvas.width, gl.canvas.height]
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
