
precision mediump float;
#pragma glslify: colormap = require("glsl-colormap/cubehelix")
uniform vec2 resolution;
uniform sampler2D noise;
uniform float time;

void main() {
  float ts = time * .001;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 c = vec3(abs(1.));
  float n = c.r * abs(sin((uv.y)*200.+ts));
  n = pow(n, 6.);
  vec4 n2 = texture2D(noise, uv + vec2(ts*.6, -ts*.14));
  vec4 n3 = texture2D(noise, uv + n2.g * 2. - n2.b * .2);
  gl_FragColor = vec4(colormap(n * (n2.r * n3.b)-.05)) * 6.;
}
