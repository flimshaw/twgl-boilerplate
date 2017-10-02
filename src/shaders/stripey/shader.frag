precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
  float ts = time * .001;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 c = vec3(0.2,1.,0.2) * .8 * abs(sin(uv.y*2.+ts));
  gl_FragColor = vec4(c * abs(sin((uv.y+sin(12.*uv.x+ts)*.0125)*100.+ts)), 1.);
}
