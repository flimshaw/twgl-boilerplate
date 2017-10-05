precision lowp float;
#pragma glslify: colormap = require("glsl-colormap/warm")
#pragma glslify: rotateZ = require(glsl-y-rotate/rotateZ)

uniform vec2 resolution;
uniform float time;
uniform sampler2D noise;

const float PI = 3.141592653589793;
const float STEPS = 64.;
const float STEP_DIV = 1. / STEPS;

// #4E277A
const vec3 purp = vec3(78./256.,39./256.,122./256.);
const float DEG_TO_RAD = 3.141592653589793 / 180.0;


void main() {
  float ts = -time * .00025;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv = (uv * 2.0) - 1.0;
  uv += vec2(sin(ts), cos(ts)) * .24;
  // uv = abs;
  uv = vec3(rotateZ( pow(distance(uv*.2, vec2(0.,0.)), -.4) * 2. + ts * 40. * DEG_TO_RAD) * vec3(uv, 1.)).xy;
  // uv.x *= (resolution.x / resolution.y);
  uv *= fract(uv * .125) - .5;
  uv = pow(.25 * uv + .85, vec2(8.));
  // uv *= .5;
  // uv = abs(uv);
  // uv *= sin(uv.x);
  // uv *= cos(uv.y * 4.);
  // uv += fract(uv);
  // uv.x += (resolution.x / resolution.y) * .125;
  // float d = fract(pow(1. - distance( 14.*(uv+vec2(sin(ts*2.4), cos(ts))*.2)*sin(ts), vec2(0.,0.)), .85) * 1. + -ts);
  // d = fract(distance(uv + sin(ts), vec2(0.0, 0.0));
  float d = abs(uv.x + sin(-ts));

  vec4 n1 = texture2D(noise, uv + vec2((1.-d)*ts * .12, ts * .12));
  vec4 n2 = texture2D(noise, 4. * n1.rg + vec2(n1.b, ts * .62));
  vec4 n4 = texture2D(noise, vec2(-n2.b, n2.g + ts));
  // vec4 n4 = texture2D(noise, uv * time * 10000.);
  float n3 = n2.r - (n2.g * .25) - ((n2.b + n2.r) * .125);

  n3 *= n1.r * 4.;
  // float n3 = n2.r;
  // float d = n.r/
  // d = floor(d * STEPS) * STEP_DIV;
  // d = floor(d) * .1;
  // d = step(d, .5);
  // d =
  // gl_FragColor = colormap(d * .25);
  gl_FragColor = vec4( purp * (((.4+n2.g*2.)*n4.b-.15)* 6.)+.05, 1.0);
}
