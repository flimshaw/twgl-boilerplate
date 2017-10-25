precision highp float;
#pragma glslify: colormap = require("glsl-colormap/warm")

uniform sampler2D noise;
uniform vec2 resolution;
uniform float time;

const int STEPS = 512;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 map(vec2 uv) {
  vec2 z = vec2(0.);
  vec2 c = (uv);
  for(int i = 0; i < STEPS; i++) {
    float x = (z.x * z.x - z.y * z.y) + c.x;
    float y = (z.y * z.x + z.x * z.y) + c.y;

    if((x * x + y * y) > 2.0) break;
    z.x = x;
    z.y = y;
  }
  return z;
}

void main() {
  float ts = time * .01;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv = (uv - .5) * 2.;
  uv.y *= resolution.y / resolution.x;

  vec2 n = map(vec2(.26, .0016) + uv*(1./pow(ts, 2.)));

  gl_FragColor = vec4(colormap(length(n*.5)));

}
