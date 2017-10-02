import twgl from 'twgl.js';
import { Component, h } from 'preact';

export class TwglScene extends Component {

  constructor() {
    super();
    // set initial time:
    this.state = {
      time: Date.now()
    };
    this.glRender = this.glRender.bind(this);
  }

  componentDidMount() {

    const canvas = this.el;
    // canvas.width = window.innerWidth * window.devicePixelRatio * 0.5;
    // canvas.height = window.innerHeight * window.devicePixelRatio * 0.5;

    this.gl = canvas.getContext("webgl");
    this.programInfo = twgl.createProgramInfo(this.gl, [require('./shaders/perlin-cloudfield/shader.vert'), require('./shaders/perlin-cloudfield/shader.frag')]);

    const boxSize = 1.;

    const arrays = {
      position: [-boxSize, -boxSize, 0, boxSize, -boxSize, 0, -boxSize, boxSize, 0, -boxSize, boxSize, 0, boxSize, -boxSize, 0, boxSize, boxSize, 0],
    };
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

    this.textures = twgl.createTextures(this.gl, {
      noise: {
        src: 'assets/textures/noise256.jpg',
      },
    });

    // update time every second
    this.glRender();
  }

  glRender(time) {
    // twgl.resizeCanvasToDisplaySize(gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    const uniforms = {
      time: time,
      resolution: [this.gl.canvas.width, this.gl.canvas.height],
      noise: this.textures.noise
    };

    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);

    requestAnimationFrame(this.glRender);
  }

	render() {

		return (<span><canvas ref={(canvas) => { this.el = canvas; }}/></span>);
	}

}