#version 300 es
precision mediump float;
uniform vec2 resolution;
uniform float time;

in vec3 v_color;

out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  outColor = vec4(v_color, 1.);
}
