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

WebGL describes a location in homogeneous coordinates, which is a 4-component value `(x, y, z, w)`. The first three values are distances along the axes of the coordinate system. The last value `w` is used for perspective calculations, which will be described later. When creating models in WebGL programs, it can sometimes save memory by storing and specifying only the values you care about and letting WebGL fill in the other values. This is especailly useful in 2D graphics rendering, where the `z` value is omitted and automatically set to zero. For normal 3D models, the program will store three floating point values for each point. The `w` component will not be stored and always set to `1.0`. 

### Orientation

While the location tells us where an object is in relationship to an agreed frame of reference, its orientation is equally important. Direction can be either:

  - relative: directions are in relationship to an object's current location and orientation (meaning from the POV of the object)
  - absolute: directions are relative to a fixed frame of reference and always point in the same direction regardless of their location

The standard tool for direction representation are vectors. In WebGL they are extensively used for model descriptions and object motion. Depending on space dimensionality, they are represented by multiple component values using floating point numbers - for example as `<dx, dy, dz>` in 3D space. Similarly to coordinates, individual component values can be omitted in some cases to safe memory.

A vector can be manipulated to change its directon and length. Some of manipulations that make physical sense are:

  - rotation: change vector's direction
  - scaling: change vector's length
  - normalization: keep vector's direction unchanged but change its length to 1 unit
  - addition: create vector representing a direction that is the sum of the originals
  - subtraction: create vector representing a direction that is the difference of the originals
  - addition/substraction of a vector to a point: create a new point at a new location

### Volume & surfaces

Objects in space take on an infinite variety of shape and forms. An object might be a square, cube, sphere, plane, complex blob or something completely different. To describe each of these objects in a unique way, it would require a special rendering algorithm for each one. In order to define any type of object regardless of the complexity of its form, we use triangles.

A triangle is the simplest geometric shape that defines an enclosed area, having an inside and an outside area. It is always planar, defining a flat surface and also dividing 3D space into three distinct regions. All 3 points lie in the plane defined by the triangle and also simultaneosly are on both sides of that plane. It is also always convex and impossible to be concave, which would be harder to render. These properties make the rendering process straightforward and fast, enabling realtime 3D graphics.

While almost any 3 points in space can be used to define a traingle, there are two cases that must be looked out for. Three points that are on top of each other or along a line do not define an enclosed area or divide 3D space into 3 regions. These are called *degenerate cases* and cause the mathematics that manipulate the triangles to fail.



---

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| Modeling Location | [Dr. Wayne Brown][A006] | [Link][L006] |


<!-- Resource links -->
[L006]: http://learnwebgl.brown37.net/model_data/model_points.html (Modeling Location)
[A006]: http://learnwebgl.brown37.net/acknowledgements/author.html (Dr. Wayne Brown)