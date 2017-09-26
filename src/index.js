import twgl from 'twgl.js';
require('../css/main.scss');

var el = document.getElementById('app');
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
el.appendChild(canvas);

var gl = canvas.getContext("webgl");
var programInfo = twgl.createProgramInfo(gl, [require('./shaders/default.vert'), require('./shaders/default.frag')]);

var boxSize = 1.;

var arrays = {
  position: [-boxSize, -boxSize, 0, boxSize, -boxSize, 0, -boxSize, boxSize, 0, -boxSize, boxSize, 0, boxSize, -boxSize, 0, boxSize, boxSize, 0],
};
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

// var fboTex = twgl.createTexture(gl);
var textures = twgl.createTextures(gl, {
  noise: {
    src: 'assets/textures/noise2048.png',
  },
})

var offset = Math.random() * 40;
function render(time) {
  if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  var uniforms = {
    time: offset + time * 0.0005,
    resolution: [gl.canvas.width, gl.canvas.height],
    noise: textures.noise
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
