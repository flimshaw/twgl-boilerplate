precision mediump float;
uniform vec2 resolution;
uniform float time;
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: worley3D = require(glsl-worley/worley3D.glsl)
#define STEPS 32

float map(vec3 p) {
  // return length(p) - .25;
  float x = (snoise4(vec4(p*2., 1.)) + .425) + .25;
  float y = (snoise4(vec4(p*14., time)) + .425) * .1;
  // float x = worley3D(p*8., 1.0, false).y * .1;
  // x += (snoise4(vec4(p*40., time)) * .1 - .05) * 2.;
  // x += (snoise4(vec4(p*0., time+234.)) * .1 - .05) * .1;
  // float y = snoise3(p*2. - time * .05) + .5;
  return x + y;
}

float sphereSDF(vec3 p) {
    return length(p) - 1.0;
}

float trace(vec3 o, vec3 r) {
  float t = 0.0;
  for( int i = 0; i < STEPS; ++i) {
    vec3 p = o + r * t;
    float d = map(p);
    t += d * 0.05;
  }
  return abs(t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  uv = uv * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;

  vec3 o = vec3(0.,0.,time*.125);
  vec3 r = normalize(vec3(uv, 1.));

  float t = trace(o, r);
  // t = t*t*t;
  // float fog = .5 / (t * t + .1);
  gl_FragColor = vec4(vec3(1. - t) * vec3(.8, .4, .5) + vec3(.3, 0., 0.), 1.0); //vec4(.5 * (sin(2.*time+uv.x*1.3) + 1.), .5 * (sin(.9*-time+uv.x*1.4) + 1.), .5 * (sin(1.5*time+uv.x+uv.y) + 1.), 1.);// mandelbrot(gl_FragCoord.xy);
}
