precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
  float ts = time * .0005;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= resolution.x / resolution.y;

  gl_FragColor = vec4(uv.xy, 1., 1.);
}
