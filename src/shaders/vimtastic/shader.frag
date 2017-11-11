// Writing a little shader in vim
precision mediump float;
//
uniform vec2 resolution;
uniform float time;
uniform vec2 mousePos;
uniform vec2 mouseVel;
uniform sampler2D noise;
uniform sampler2D fbo;

void main() {
  float ts = time * .0007;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  //uv.x *= resolution.x / resolution.y ;
	float px = 1./resolution.y;
  vec2 uv2 = uv * 20.;
	vec2 mouseDir = normalize(uv - mousePos);
	vec4 n = texture2D(noise, uv);
	vec4 f = texture2D(fbo, .005 * (n.rb-vec2(0.25)) + uv + mouseDir * -.002 );
  vec4 c = vec4(.5 * (sin(2.*ts+uv2.x*1.3) + 1.825), .5 * (sin(.9*-ts+uv2.x*2.4) + 1.), .5 * (sin(1.5*ts+uv2.x+uv2.y) + 1.), 1.);// mandelbrot(gl_FragCoord.xy);
	if(distance(uv, mousePos) <= 2.*px) {
		c = vec4(100.) * c;
	}
	float v = float(uv.y<=(px)) + .01;
	gl_FragColor = .985 * f + v * c;
}
