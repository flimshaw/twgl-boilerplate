precision mediump float;
#pragma glslify: colormap = require("glsl-colormap/temperature")
//
uniform vec2 resolution;
uniform sampler2D noise;
uniform float time;
//
// void main() {
//   vec2 uv = gl_FragCoord.xy / resolution;
//   float color = 0.0;
//   // lifted from glslsandbox.com
//   color += sin( uv.x * cos( time / 3.0 ) * 60.0 ) + cos( uv.y * cos( time / 2.80 ) * 10.0 );
//   color += sin( uv.y * sin( time / 2.0 ) * 40.0 ) + cos( uv.x * sin( time / 1.70 ) * 40.0 );
//   color += sin( uv.x * sin( time / 1.0 ) * 10.0 ) + sin( uv.y * sin( time / 3.50 ) * 80.0 );
//   color *= sin( time / 10.0 ) * 0.5;
//
//   gl_FragColor = vec4( vec3( color * 0.5, sin( color + time / 2.5 ) * 0.75, color ), 1.0 );
// }

void main() {
  float ts = time * .00005;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  // uv.x *= resolution.x / resolution.y;

  vec4 c = texture2D(noise, uv + vec2(ts, .2));

  vec4 c2 = texture2D(noise, uv - vec2(c.r+ts, c.g-ts));
  // vec4 c3 = texture2D(noise, 15. * uv + ts);

  float n = c.b + c2.r;

  const float m = .4;

  n = (n * m) + (1. - m);

  n = n * (1. - uv.y * .6);

  gl_FragColor = colormap(clamp(n, 0., 1.));
}
