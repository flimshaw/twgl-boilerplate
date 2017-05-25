#version 300 es
precision mediump float;
#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
in vec2 position;
in vec3 color;
in float idx;

out vec3 v_color;

uniform float u_time;

void main() {
  // v_color = hsl2rgb(sin(.1*u_time+idx*3.1415*.5), .5, .55);
  v_color = color;
  gl_Position = vec4(position.xy, 0., 1.);
}
