# Model data

To effectively describe and discuss base principles for WebGL development, we need to define individual elements it consists of. This material will guide us through its virtual world and model properties of each object in it, such as:

  - location: where is an object in reference to the scene
  - orientation: which way is the object turned or facing
  - volume: what 3D space does the object take up
  - surface: what color and structure is the object

As WebGL is a math-based tool, the description of the world will be in mathematical values, symbols and operations that a computer is capable of manipulating and rendering. Please, feel free to visit previous chapter to refresh or understand better some underlying logic.

### Location

Location is always in relationship to something else. This point of reference can be either *a global origin*, indicating a unique locatiion in a scene from which all objects are located, or *a local origin* from which locations relative to that point/object are referenced. Objects in a scene are positioned by specifying the relationship between their local origin and the scene's global origin.

To specify a unique location we use a coordinate system, which allows us to describe a position in any dimensional space through methods like going along lines of references, using angles and distances, or drawing vectors. For 3D space WebGL, same as most engineers and mathematicians, uses a right-handed Cartesian coordinate system. The first two axes are depicted as horizontal with the third axis pointing up.

> ![Right hand rule](assets/right-hand-rule.png)
>
> ***Right hand rule***
>
> *Source: [Design and Software International ](https://dsi-mfg.com/right-hand-rule/)*

WebGL describes a location in homogeneous coordinates, which is a 4-component value `(x, y, z, w)`. The first three values are distances along the axes of the coordinate system. The last value `w` is used for perspective calculations, which will be described later. When creating models in WebGL programs, it can sometimes save memory by storing and specifying only the values you care about and letting WebGL fill in the other values. This is especailly useful in 2D graphics rendering, where the `z` value is omitted and automatically set to zero.

For normal 3D models, the program will store three floating point values for each point. The `w` component will not be stored and always set to `1.0`. 

---

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| Modeling Location | [Dr. Wayne Brown][A006] | [Link][L006] |


<!-- Resource links -->
[L006]: http://learnwebgl.brown37.net/model_data/model_points.html (Modeling Location)
[A006]: http://learnwebgl.brown37.net/acknowledgements/author.html (Dr. Wayne Brown)