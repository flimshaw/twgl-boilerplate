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

  // uv *= distance(uv, vec2(.5, .5))

  float m = abs(sin(uv.y * 480.)) - .2;

  float m2 = abs(sin(uv.y-time*.0005)) + .2;


    vec4 n = texture2D(noise, uv+time);
    vec4 n2 = texture2D(noise, n.rg+time);


  vec3 c = vec3(m * rand(4. * fract(n2.rb) * vec2(4., 1.)));

  c *= 1.8 * vec3(1., 1., 1.15) + fract(time) - n2.rgb * .2;

  gl_FragColor = vec4(vec3(c*m2), 1.);

}
