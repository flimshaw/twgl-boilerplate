precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.141592653589793;

void main() {
  float ts = time * .0005;

  vec2 uv = gl_FragCoord.xy / resolution.xy;

  gl_FragColor = vec4(sin(gl_FragCoord.xy*PI), abs(sin(ts)), 1.);
}
