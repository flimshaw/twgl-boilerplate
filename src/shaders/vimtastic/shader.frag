// Writing a little shader in vim
precision mediump float;
//
uniform vec2 resolution;
uniform float time;
uniform vec2 mousePos;
uniform sampler2D fbo;
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
  float ts = time * .0007;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  //uv.x *= resolution.x / resolution.y ;
	float px = 1./resolution.y;
  vec2 uv2 = uv * 20.;
	vec4 f = texture2D(fbo, uv + vec2(sin(ts)*px, -px));
  vec4 c = vec4(.5 * (sin(2.*ts+uv2.x*1.3) + 1.825), .5 * (sin(.9*-ts+uv2.x*2.4) + 1.), .5 * (sin(1.5*ts+uv2.x+uv2.y) + 1.), 1.);// mandelbrot(gl_FragCoord.xy);
	//vec4 c = vec4(mousePos, 1. ,1.);
	if(distance(uv, mousePos) <= 15.*px) {
		c = vec4(10.);
	}
	float v = float(uv.y<=(px)) + .01;
	gl_FragColor = .985 * f + v * c;//vec4(1.0);
}
