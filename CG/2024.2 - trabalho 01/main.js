
import vertShaderSrc from './simple.vert.js';
import fragShaderSrc from './simple.frag.js';

import Shader from './shader.js';

class Scene {
  constructor(gl) {
    this.data = [];

    this.delta = 0;
    this.mat = mat4.create();
    this.matLoc = -1;

    this.vertShd = null;
    this.fragShd = null;
    this.program = null;

    this.vaoLoc = -1;

    this.init(gl);
  }

  init(gl) {
    this.createShaderProgram(gl);
    this.createVAO(gl);
    this.createUniforms(gl);
  }

  createShaderProgram(gl) {
    this.vertShd = Shader.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
    this.fragShd = Shader.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
    this.program = Shader.createProgram(gl, this.vertShd, this.fragShd);

    gl.useProgram(this.program);
  }

  createUniforms(gl) {
    this.matLoc = gl.getUniformLocation(this.program, "u_mat");
  }

  loadModel() {
    this.data = [
      // posição (x,y)
      0.10, 0.80,
      0.10, 0.90,
      0.25, 0.80,
      0.25, 0.80,
      0.40, 0.90,
      0.40, 0.80,
      0.10, 0.50,
      0.40, 0.80,
      0.10, 0.80,
      0.10, 0.50,
      0.40, 0.50,
      0.40, 0.80,
      0.40, 0.10,
      0.80, 0.50,
      0.40, 0.50,
      0.40, 0.10,
      0.80, 0.10,
      0.80, 0.50,
      0.80, 0.10,
      0.90, 0.10,
      0.80, 0.30,
      // Cor (rgb)
      1.0, 0.0, 0.0, 
      1.0, 0.0, 0.0, 
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
    ];
  }
  

  createVAO(gl) {
    this.loadModel();

    var coordsAttributeLocation = gl.getAttribLocation(this.program, "position");
    var colorsAttributeLocation = gl.getAttribLocation(this.program, "color");

    // Criação do VBO (Shader.createBuffer)
    const dataBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(this.data));

    // Criação do VAO
    // Q1) Escreva a implementação da função abaixo, que constroi um VAO contendo informações de posicão e
    // cores, e esteja de acordo com a estrutura do array "this.data"
    // FEITO
    this.vaoLoc = Shader.createVAO(gl, coordsAttributeLocation, colorsAttributeLocation, dataBuffer);
  }

  objectTransformation() {
    const coords = [];
    for (let i = 0; i < 42; i += 2) {
        coords.push(this.data[i], this.data[i + 1]); // (x, y)
    }

    const minX = Math.min(...coords.filter((_, index) => index % 2 === 0));
    const maxX = Math.max(...coords.filter((_, index) => index % 2 === 0));
    const minY = Math.min(...coords.filter((_, index) => index % 2 === 1));
    const maxY = Math.max(...coords.filter((_, index) => index % 2 === 1));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Largura e altura atuais
    const width = maxX - minX;
    const height = maxY - minY;

    // Fator de escala
    const scaleX = 1.8 / width;
    const scaleY = 1.8 / height;

    // Criação das matrizes de transformação
    mat4.identity(this.mat);

    // Escala
    mat4.scale(this.mat, this.mat, [scaleX, scaleY, 1]); // Escala em x, y e z

    // Translação
    mat4.translate(this.mat, this.mat, [-centerX, -centerY, 0]); // Translada para o centro
}


  

  draw(gl) {  
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vaoLoc);

    this.objectTransformation();
    gl.uniformMatrix4fv(this.matLoc, false, this.mat);

    // Q3) Implemente o comando gl.drawArrays adequado para o programa em questão
    gl.drawArrays(gl.TRIANGLES, 0, 21);
  }
}

class Main {
  constructor() {
    const canvas = document.querySelector("#glcanvas");
    this.gl = canvas.getContext("webgl2");

    var devicePixelRatio = window.devicePixelRatio || 1;
    this.gl.canvas.width = 1024 * devicePixelRatio;
    this.gl.canvas.height = 768 * devicePixelRatio;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.scene = new Scene(this.gl);
  }

  draw() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.scene.draw(this.gl);

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  const app = new Main();
  app.draw();
}
