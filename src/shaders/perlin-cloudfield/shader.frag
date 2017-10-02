precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D noise;
#pragma glslify: colormap = require("glsl-colormap/bathymetry")
#pragma glslify: rotateY = require(glsl-y-rotate/rotateY)

const float DEG_TO_RAD = 3.141592653589793 / 180.0;

#define STEPS 16

float map(vec3 p) {
  // compute a 3D noise value based on texture
  vec4 a = texture2D(noise, vec2(p.x, p.y));
  float x = p.z / a.r;
  return x;
}

float sphereSDF(vec3 p, float ts) {
  // p *= rotateY(.1 * time * DEG_TO_RAD);
  vec4 a = texture2D(noise, 2. * vec2(p.x, p.y) - vec2(-ts * .0022, ts * .005));
  vec4 b = texture2D(noise, 5. * vec2(p.y, p.x) + vec2(ts*.0015, ts*.002));
  vec4 c = texture2D(noise, 25. * vec2(p.y, p.x) + vec2(ts*.0015, ts*.002));
  vec3 pp = fract(p*2.0) - .5;
  return length(pp) - a.g - ((a.g * (b.r * .5) + (c.b*.125)) * .75);
}

float trace(vec3 o, vec3 r, float ts) {
  float t = 0.0;
  for( int i = 0; i < STEPS; ++i) {
    vec3 p = o + r * t;
    float d = sphereSDF(p, ts);
    t += d * 0.4;
  }
  return t;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  uv = uv * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;

  float ts = time * .05;

  vec3 o = vec3(0.,0.,ts*.01);
  vec3 r = normalize(vec3(uv, 1.));

  float t = trace(o, r, ts);
  gl_FragColor = colormap(min(1., t));//vec4( vec3(1. - t), 1.0);//vec4(blackbody, 1.0); //vec4(.5 * (sin(2.*time+uv.x*1.3) + 1.), .5 * (sin(.9*-time+uv.x*1.4) + 1.), .5 * (sin(1.5*time+uv.x+uv.y) + 1.), 1.);// mandelbrot(gl_FragCoord.xy);
}
