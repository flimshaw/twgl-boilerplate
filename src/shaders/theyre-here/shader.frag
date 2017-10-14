precision mediump float;

uniform sampler2D noise;
uniform vec2 resolution;
uniform float time;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  float ts = time * .001;

  vec2 uv = gl_FragCoord.xy / resolution.xy;

  vec4 n = texture2D(noise, uv+time);
  vec4 n2 = texture2D(noise, n.rg*50.+time);

  float m = abs(sin(uv.y * 480.));

  vec3 c = vec3(m *rand(n2.rb * vec2(4., 1.)));

  c *= 1.8 * vec3(1., 1., 1.05) + fract(time);

  gl_FragColor = vec4(c, 1.);

}
