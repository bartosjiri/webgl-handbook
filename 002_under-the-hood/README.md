# Under the hood

WebGL is slightly more complicated than typical web tech since it is designed to work directly with the GPU. Eventhough it was purposely left very low-level, allowing it to rapidly do complex rendering, essentially it is still just a set of JavaScript functions which wrap around the OpenGL ES specification. 

There are several [frameworks and libraries](https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc) available, hiding away some of the core complexities, making it accessible to more people as well as saving time on boilerplate code.
However, even a basic understanding of how WebGL works under the hood can be useful to find your way around problems and solutions in your projects.

The process of generating an WebGL image is following:

1) The JavaScript code gets a specified context from a HTML5 canvas element.

2) A set of shaders written in GLSL is registered. This specifies where and how elements will be created, how they will look etc.

3) The rest of information about our graphics is then fed into the graphics pipeline, processed and rendered. There is a lot of action condensed in this step, so let's take a closer look at it.

> ![Clip space visualization](./assets/rendering-pipeline.jpg)
>
> ***Rendering pipeline***
>
> *Source: Luz Caballero ([link][R002])*

We are starting with our data created in JavaScript in one or more ways. These can be 3D model files, procedurally created data or instructions used through libraries. All of this is put into vertex arrays that contain vertex attributes like the location of the vertex in space and information about texture, color and lighting features (vertex normal). Such vertex arrays are sent to GPU in a set of vertex buffers.

Once inside the GPU, it selects each vertex out of the vertex buffer and runs it through the vertex shader. As a result we receive a mesh coordinates. Usually, the process performed on the vertex shader looks similar to this:

  ```js
  gl_Position = PROJECTION_MATRIX * VIEW_MATRIX * MODEL_MATRIX * VERTEX_POSITION
  ```

  - `PROJECT_MATRIX`: camera's lens representation
  - `VIEW_MATRIX`: a 4x4 matrix representing camera's view
  - `MODEL_MATRIX`: a 4x4 matrix which transforms object-space coordinates (= coordinates before translations) into world-space coordinates 
  - `VERTEX_POSITION`: a 4D vector (x, y, z, w)

As `gl_Position` provides clip coordinates, WebGL will divide the result by `gl_Position.w`, producing normalized device coordinates. These coordinates are then translated into space coordinates to connect verteces and display individual pixels in specified viewport.

The generated pixel-sized fragments are then passed through the fragment shader. The shader is called for each individual pixel to calculate its actual color and depth values. This can be done in various ways, ranging from hard-coding a specific color, through color interpolation and texture lookups, to more advanced mappings.

> `@TODO: Fragment shader image explanation`

These values are put into the framebuffer. This is where pixels are filtered by their depth, meaning that depth of pixels relative to the camera is compared and all pixels that are hidden behind others will be discarded. Finally, as a result of all of this, the complete view can be drawn.

---

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| WebGL How It Works | [Greggman](https://github.com/greggman) | [Link][R001] |
| An Introduction to WebGL — Part 1 | [Luz Caballero](https://dev.opera.com/authors/luz-caballero/) | [Link][R002] |
| How WebGL works? | [sinisterchipmunk](https://stackoverflow.com/users/367371/sinisterchipmunk) | [Link][R003] |
| An intro to modern OpenGL. Chapter 1: The Graphics Pipeline | [Joe Groff](https://twitter.com/jckarter/) | [Link][R004] |


[R001]: https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html
[R002]: https://dev.opera.com/articles/introduction-to-webgl-part-1/
[R003]: https://stackoverflow.com/a/7374194
[R004]: http://duriansoftware.com/joe/An-intro-to-modern-OpenGL.-Chapter-1:-The-Graphics-Pipeline.html

