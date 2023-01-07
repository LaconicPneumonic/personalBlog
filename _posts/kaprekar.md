---
title: "Kaprekar's Constant"
excerpt: "Visualizing patterns in generating functions"
coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2023-01-01T18:40:07.322Z"
author:
  name: Anthony Rolland
  picture: "https://media.licdn.com/dms/image/D4D35AQEZyxo_dMjbMA/profile-framedphoto-shrink_100_100/0/1670519479753?e=1672977600&v=beta&t=nCsjIhV8KTriCxjJQ9kLcxs5exT26xquyISF7NQwtNQ"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

# Kaprekar's Constant

[_this article was pulled from a twitter thread that I wrote here_](https://twitter.com/Anthony52182757/status/1521280144018661378)

Math is really magical.

Take the number 6174. Turn it into two numbers with digits ascending (1476) and descending (7641). Subtract the larger from the smaller to get 7641 - 1467 = 6174. What if we start with 8028?

1. 8820 - 0288 = 8532
2. 8532 - 2358 = 6174

If we start with 1111, it does not converge.

1. 1111 - 1111 = 0000

This process and the values for which it converges was discovered in by a 20th century mathematician named [D. R. Kaprekar](https://en.wikipedia.org/wiki/D._R._Kaprekar). The eponymous routine, "Kaprekar's Routine" was proven to converge to "Kaprekar's Constant", 6174, for all 4 digit values. With different inputs, we can see that they converge with different amount of iterations. Some 1, some 5 ...etc.

Here's an example for base 10 and length 4:

![Convergence](/assets/blog/kaprekar/convergence.jpg "Convergence")

So what if we took this process a step further and took the first 100 kaprekar numbers of length 4 and base 10 and arranged them into a square. This square would have ten rows and ten columns with varying times to convergence. Here's an example image:

![Matrix](/assets/blog/kaprekar/matrix.jpg "Matrix")

Then using a linear interpolation over the range of the convergence values, we can apply a color scheme to the convergence values in the matrix. It looks something like this:

![matrixColored](/assets/blog/kaprekar/matrixColored.jpg "matrixColored")

Without much massaging, we can generate seemingly random and complex patterns. We can change the way we construct the matrix, change the base, change the length, change the color interpolation ... etc. We can even take the matrices and tessalate them to provide symmetry beyond that provided by the initial input.

Here are a few more examples:
![large](/assets/blog/kaprekar/large.jpg "large")
![differentBases](/assets/blog/kaprekar/differentBases.jpg "differentBases")
![tessalate](/assets/blog/kaprekar/tessalate.png "tessalate")

In service of learning more about the visualizations you can make from kaprekar's routine, I've created a website that allows you to make these images within the frontend. Here's the [link](https://onlyvibes.web.app/?base=10&length=4&rows=100&cols=100&wrappingRows=10&wrappingCols=10&limit=100&colorSpace=interpolateYlGnBu).
