# Math primer

Before we get into describing the virtual world of WebGL, we should make sure to learn or refresh some basic math principles that make it all possible. 

Please note that there are some differences between concepts used for regular mathematics and for WebGL's implementation. This material is focused on the former while the later will be introduced in following chapters.


### Coordinate systems

To describe where objects are in space, where they are in relation to each other and how big they are we usually use a coordinate system. A linear coordinate system has unit and dimensional properties. 

The dimensions correspond to how many different combinations are possible to make with positions in the given space and are usually referred to by canonical variables `x`, `y`, `z` and so on.

There are infinitely many points in the other corresponding dimensions for a single point on one dimension. For example, in a two dimensional space, for constant `x = 1` there are indifinitely many points to choose from on the `y` dimension.

If first dimension can be represented by a number line made up of every possible point, the two dimensional space would be a coordinate plane made up of very possible line, and in three dimensional space there would be a volume made up of every possible plane. Dimensions above the third are hard to visualize, but the pattern continues and the logic will generalize to an n-dimensional space.

> ![3D coordinate system](assets/coordinate-system.png)
>
> ***3D coordinate system***
>
> *Source: Custom*

In this material we will also asume that all coordinate systems use the same units. Therefore a movement of one step along one dimension and one step for another dimension in a rotated system (meaning that one dimension would became another) will correspond.

### Position

To describe a spacial location of an object, we always use a position in relationship to something else. This point of reference can be anything, but requires further knowledge of its location. To simplify description of all objects in a scene, a global origin is defined most of the times. In a 3D coordinate system this would typically be `[0,0,0]` (which means `x=0`, `y=0`. `z=0`).

In addition, every object will also have a local origin from which positions relative to that object (pieces of the object) are referenced. For example, a cinema room can have a projection screen as local origin, which is then used to locate individual seats inside the room.

Each object in a scene is positioned by specifying the relationship between its local and global origin. A position is then always a relation between two points. A description of location in n-dimensional space using an origin point always requires at least two types of information: distance and direction. 

We could specify the location of an object by saying *"x units from origin"*, but there are many or infinite number of points with the same specification - in 2D space this would essentially compose a circle. Therefore, to specify a unique location, we also need a line of reference from which we measure distances. We can then measure the distance from one or more reference lines that determine the direction. 

Also note that the direction can be provided in form of a negative distance - in our representation this means to travel along line of reference but in the opposite direction. There are multiple ways to go from the origin to the goal location, such as going directly along reference lines, using angles to reference lines with distance, working with a vector and others.

> ![Position along reference lines](assets/position-lines.png)
>
> ***Position through reference lines***
>
> *Source: Custom*

> ![Position with angles and distance](assets/position-angles.png)
>
> ***Position through angles and distance***
>
> *Source: Custom*

> ![Position with vector](assets/position-vector.png)
>
> ***Position through vector***
>
> *Source: Custom*

### Angles

To further understand different systems for measuring angles, we are going to review various trigonometric functions on a unit circle - a circle of radius 1 unit that is centered on the origin of the coordinate plane. 

Every point on the unit circle corresponds to a right triangle with vertices at the origin and the point on the unit circle. The right triangle has leg lengths that are equal to the absolute values of the `x` and `y` coordinates.

> ![Unit circle](assets/unit-circle.png)
>
> ***Unit circle***
>
> *Source: Custom*

This right triangle is then used to apply trigonometric relations:

  - `sinα = opposite/hypotenuse = b/c`
  - `consα = adjacent/hypotenuse = a/c`
  - `tanα = opposite/ adjacent = b/a`

Since the hypotenuse of the right triangle is always 1 unit long, the values of the `x`, `y` coordinates of a point on the circle are always equal to the cosine and sine of the angle α respectively.

There are two different systems for measuring angles:

  - degrees: a full revolution is `360°`
  - radians: a full revolution is `2π rad`

In radians (rad) we measure an angle by measuring the arc length of the unit circle. Since the arc length of a full unit circle is `2π`, its size in radians is arc length multiplied by the circumference `2π * 1 = 2π rad`. 

Any other angle less than `360°` can be represented as some fraction of `2π`. For example, 1/4 of a unit circle is `360° * (1/4) = 90°` or `2π * (1/4) = π/2 rad`. An angle bigger than `360°` or `2π rad` is also similar to the full circle modulo.

### Vectors

A location tells us where something is in relationship to a reference. That's only a part of the whole picture though, since the orientation of the object can be equally important. Direction can be referenced in two ways:

  - relative: directions are in relationship to an object's current location and orientation
  - absolute: directions are relative to a fixed frame of reference 

Similarly to a description of position, there are many ways to specify object's direction, including combinations of angles and distances or distances along reference lines. In fact, the standard representation for direction, vectors, use this latter method as well.

A vector can be visually represented as a line with an arrow on one end, where the end with no arrow is called *tail* and the end with arrow is called *head*. It is then defined by the change along each line of reference to get from the tail to the head. To easier distinguish vectors from other elements we use angle brackets `<...>` to wrap its values. 

> ![Vector](assets/vector.png)
>
> ***Vector***
>
> *Source: Custom*

A vector defined as `<Vx, Vy>` values has no position, it represents an absolute direction relative to the fixed frame of reference, usually `x` and `y`-axis. Therefore two vectors can be identical even though they might be displayed on completely different coordinates. 

Two properties can be read from every vector: a direction, which is indicated by the arrow at its head, and a magnitude, the length from the tail to the head. If a vector has a length of exactly 1 unit, it is called a unit vector. Typically vectors are converted to unit vectors in order to simplify mathematical calculations that manipulate them. It also makes the representation of a particular direction unique, which is called *normalizing*.

To describe relative directions using a vector, a specific tail location is needed. Also note that vector's position cannot be moved, since it has no location in first place - it is always relative to something and has direction and magnitude only. 

Not all operations on vectors are defined in the usual sense:

  - `<Vx, Vy>`: 2D vector
  - `\|<Vx, Vy>\|`: magnitude of 2D vector
  - `v`: normalized vector
  - `n`: scalar

| Operation | Equation |
| :--- | :--- |
| Vector addition/subtraction | `<Vx, Vy, Vz> + <Wx, Wy, Wz> = <Vx+Wx, Vy+Wy, Vz+Wz>` |  |
| Scalar multiplication/division | `n * <Vx, Vy, Vz> = <n*Vx, n*Vy, n*Vz>` |  |
| Vector magnitude | `\|<Vx, Vy>\| = sqrt((Vx^2)+(Vy^2))` |  |
| Vector normalization | `v = <Vx, Vy> / \|<Vx, Vy>\|` |  |
| Vector multiplication - dot product | `<Vx, Vy> . <Wx, Wy> = \|<Vx, Vy>\| * \|<Wx, Wy>\| * cosα` |
| Vector multiplication - cross product | `<Vx, Vy> x <Wx, Wy> = \|<Vx, Vy>\| * \|<Wx, Wy>\| * sinα` |

An equation for vector multiplication does not provide enough information to fully understand it. While the dot product is a scalar, the cross product is a unit vector. A better explanation can be found in [this video](https://www.youtube.com/watch?v=E34CftP455k).

### Matrices

A matrix is a data representation of linear equations or other elements, commonly wrapped in box brackets. The horizontal lines of entries are called *rows* and the vertical are *columns*. The size of a matrix is then defined by the number of rows and columns that it contains. Matrices can also represent vectors. If a matrix has a single row it's called *row vector*, if it has a single column it's called *column vector*. A matrix which has the same number of rows and columns is called *square matrix*.

There won't be much explanation for matrix use in WebGL in this material yet, since it is focused more on math part itself and also there are some differences between regular and WebGL matrices.

We are going to demonstrate a few of available matrix operations and transformations:

- Addition/subtraction
  - Matricies must have the same size

  ```
  A = [ a b c ]    B = [ 1 2 3 ]    A + B = [ a+1 b+2 c+3 ]
      [ d e f ]        [ 4 5 6 ]            [ d+4 e+5 f+6 ]
  ```

- Scalar multiplication
  ```
  A = [ a b c ]    3 * A = [ 3*a 3*b 3*c ]
      [ d e f ]            [ 3*d 3*e 3*f ]
  ```

- Matrix multiplication
  - First matrix must have same number of columns as second matrix has rows
  - Similar to dot product of vector multiplication
  - A\*B is not equal to B\*A

  ```
  A = [ a b c ]    B = [ 1 2 ]    A * B = [ (a*1 + b*3 + c*5) (a*2 + b*4 + c*6) ]
      [ d e f ]        [ 3 4 ]            [ (d*1 + e*3 + f*5) (d*2 + e*4 + f*6) ]
                       [ 5 6 ]
  ```

- Vector scaling
  - If entries on the diagonal are all 1s, the *identity matrix* transforms a vector into itself
  ```
      [ 1 0 0 ]        [ a ]            [ 1*a ]
  A = [ 0 2 0 ]    v = [ b ]    A * v = [ 2*b ]
      [ 0 0 3 ]        [ c ]            [ 3*c ]
  ```

- Matrix transposition
  ```
      [ a b c ]          [ a d g ] 
  A = [ d e f ]    A^T = [ b e h ]
      [ g h i ]          [ c f i ]
  ```

---

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| Intuitive Math | [Sam Spilsbury][E001] | [Link][E001] |
| Modeling Location | [Dr. Wayne Brown][A006] | [Link][L006] |
| Basic Trigonometric Functions | [Brilliant][E004] | [Link][E003] |


<!-- Resource links -->
[L006]: http://learnwebgl.brown37.net/model_data/model_points.html (Modeling Location)
[A006]: http://learnwebgl.brown37.net/acknowledgements/author.html (Dr. Wayne Brown)

<!-- Extra links -->
[E001]: https://www.intuitive-math.club/ (Intuitive Math)
[E002]: https://github.com/smspillaz (Sam Spilsbury)
[E003]: https://brilliant.org/wiki/basic-trigonometric-functions/ (Basic Trigonometric Functions)
[E004]: https://brilliant.org (Brilliant)
