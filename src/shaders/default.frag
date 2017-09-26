precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D noise;
#pragma glslify: colormap = require("glsl-colormap/bathymetry")

// #pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
// #pragma glslify: worley3D = require(glsl-worley/worley3D.glsl)
#define STEPS 64

float map(vec3 p) {
  // return length(p) - .25;
  // float x = .5;//(snoise4(vec4(p*2., 1.)) + .425) + .25;
  // vec4 c = texture2D(noise, (p.rg) + vec2(p.z, 0.));
  // vec4 c2 = texture2D(noise, vec2(c.b, p.z*.5));
  // float x = c2.g - c.r;

  // compute a 3D noise value based on texture
  vec4 a = texture2D(noise, vec2(p.x, p.y) * .5);
  vec4 b = texture2D(noise, vec2(p.x-a.g, p.z+a.r) * .25);
  // vec4 c = a-b;
  float x = (a.a - b.b);
  return x;
}

float sphereSDF(vec3 p) {
    return length(p) - 1.0;
}

float trace(vec3 o, vec3 r) {
  float t = 0.0;
  for( int i = 0; i < STEPS; ++i) {
    vec3 p = o + r * t;
    float d = map(p);
    t += d * 0.5;
  }
  return abs(t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  uv = uv * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;

  vec3 o = vec3(0.,sin(time)*.1,-time*.1);
  vec3 r = normalize(vec3(uv, 1.));

  float t = trace(o, r);
  // t = t*t*t;
  // float fog = .5 / (t * t + .1);
  gl_FragColor = colormap(min(1., t));//vec4(blackbody, 1.0); //vec4(.5 * (sin(2.*time+uv.x*1.3) + 1.), .5 * (sin(.9*-time+uv.x*1.4) + 1.), .5 * (sin(1.5*time+uv.x+uv.y) + 1.), 1.);// mandelbrot(gl_FragCoord.xy);
}
