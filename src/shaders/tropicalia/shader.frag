precision lowp float;
#pragma glslify: colormap = require("glsl-colormap/warm")
uniform vec2 resolution;
uniform float time;

const float PI = 3.141592653589793;
const float STEPS = 6.;
const float STEP_DIV = 1. / STEPS;

void main() {
  float ts = time * .0005;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv = (uv * 2.0) - 1.0;
  uv.x *= (resolution.x / resolution.y);

  // uv.x += (resolution.x / resolution.y) * .125;
  float d = fract(distance(uv, vec2(0.,0.)) * 5. + -ts);
  d = floor(d * STEPS) * STEP_DIV;
  // d = floor(d) * .1;
  // d = step(d, .5);
  // d =
  gl_FragColor = colormap(d);
}
