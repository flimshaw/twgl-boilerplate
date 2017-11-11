// Writing a little shader in vim
precision mediump float;
//
uniform vec2 resolution;
uniform float time;
uniform vec2 mousePos;
uniform sampler2D fbo;
uniform sampler2D noise;

const float brushRadius = 1.0;
float checkerboard(vec2 uv) {
	bool v = fract(uv.x) > .5 ^^ fract(uv.y) > .5;
	return float(v);
}
void main() {
  float ts = time * .0007;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
	float px = 1./resolution.y;
	vec2 uv0 = uv;
  vec2 uv2 = (uv-.5) * 8.;
	float mouseDist = distance(uv, mousePos);
	//uv += (normalize(mousePos-uv)) * px;
	//uv -= .5;
	uv2 = abs(uv2);
	uv2 -= 2.;
	uv2 = abs(uv2);
	uv2 -= 1.5;
	uv2 = abs(uv2);
	vec4 n = texture2D(noise, .2*ts+uv2/8.);
	vec4 f = texture2D(fbo, uv+normalize(uv)-.5);
  // vec4 c = vec4(.5 * (sin(2.*ts+uv2.x*1.3) + 1.825), .5 * (sin(.9*-ts+uv2.x*2.4) + 1.), .5 * (sin(1.5*ts+uv2.x+uv2.y) + 1.), 1.);// mandelbrot(gl_FragCoord.xy);
	float c = checkerboard(uv2-ts);
  
	float v = 0.5;//float(uv.y<=(px)) + .01;
	gl_FragColor = mix(vec4(c), f, distance(uv0, vec2(.5, .5))*2.);//vec4(1.0);
}
