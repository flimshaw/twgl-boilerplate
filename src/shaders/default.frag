precision highp float;
//
uniform vec2 resolution;
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



vec4 mainImage( vec2 fragCoord )
{
  vec2 p = -1.0 + 2.0 * fragCoord.xy / resolution.xy;
  p.x *= resolution.x/resolution.y;

    // animation
	float tz = 1.05;// (.005*cos(0.225*time))*20.;
  float zoo = pow( 0.5, 13.0*tz );
	vec2 c = vec2(-0.05 + sin(time * .001) * .005,.6805+ sin(-.1 + time * .0003) * .005) + p*zoo;

  // iterate
  float di =  1.0;
  vec2 z  = vec2(0.0);
  float m2 = 0.0;
  vec2 dz = vec2(0.0);
  for( int i=0; i<128; i++ )
  {
      if( m2>128.0 ) { di=0.0; break; }
      dz = 2.0*vec2(z.x*dz.x-z.y*dz.y, z.x*dz.y + z.y*dz.x) + vec2(1.0,0.0);
      z = vec2( z.x*z.x - z.y*z.y, 2.*z.x*z.y ) + c;
      m2 = dot(z,z);
  }

  // distance
	float d = 0.5*sqrt(dot(z,z)/dot(dz,dz))*log(dot(z,z));
  if( di>0.05 ) d=0.0;

  // do some soft coloring based on distance
	d = clamp( pow(4.0*d/zoo,.15), 0.0, 1.0 );
  vec3 col = vec3( d );

  return vec4( col, 1.0 );
}

void main() {

  gl_FragColor = mainImage(gl_FragCoord.xy);

}
