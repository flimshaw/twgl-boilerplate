precision mediump float;

uniform sampler2D fbi;

uniform vec2 resolution;

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec4 t = texture2D(fbi, uv);
 gl_FragColor = t; //texture2D(fbi, uv);
}
