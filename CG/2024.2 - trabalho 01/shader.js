export default class Shader {
  static createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var info = gl.getShaderInfoLog(shader);
      console.log('Could not compile WebGL program:' + info);
    }

    return shader;
  }

  static createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var info = gl.getProgramInfoLog(program);
      console.log('Could not compile WebGL program:' + info);
    }

    return program;
  }

  static isArrayBuffer(value) {
    return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
  }

  static createBuffer(gl, type, data) {
    if (data.length == 0)
      return null;

    if (!Shader.isArrayBuffer(data)) {
      console.warn('Data is not an instance of ArrayBuffer');
      return null;
    }

    var buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, data, gl.STATIC_DRAW);

    return buffer;
  }

  static createVAO(gl, posAttribLoc, colorAttribLoc, dataBuffer) {
    const vao = gl.createVertexArray(); 
    gl.bindVertexArray(vao);           
  

    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);

    gl.enableVertexAttribArray(posAttribLoc);
    gl.vertexAttribPointer(
      posAttribLoc,        
      2,                   // (x, y)
      gl.FLOAT,            
      false,               
      0,                   
      0                    // Offset inicial no buffer para as posições
    );

    const contador = 21 * 2; // 21 coordenadas, cada uma com (x, y)
    const positionBytes = contador * Float32Array.BYTES_PER_ELEMENT; // Tamanho total das posições em bytes

    gl.enableVertexAttribArray(colorAttribLoc);
    gl.vertexAttribPointer(
      colorAttribLoc,      
      3,                   //(r, g, b)
      gl.FLOAT,            
      false,               
      0,                   
      positionBytes        // Offset inicial no buffer para as cores
    );

  
    gl.bindVertexArray(null); 
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
    return vao; // Retorna o VAO criado
  }
  
}