# Graphics & Image Data Representation (Lecture 03)


<!--more-->

> **Academic Note:** This master study guide covers **Lecture 03: Graphics and Image Data Representation**, explaining how continuous optical scenes are digitized into numerical data structures for computer processing[cite: 2].

---

## 1. Digital Image Fundamentals

- **Definition:** A digital image is a numeric representation of a two-dimensional image, expressed mathematically as a sampled, quantized function $f(x,y)$[cite: 2].
- **Matrix Structure:** In linear algebra terms, $f(x,y)$ functions as a matrix where each row or column acts as a vector[cite: 2].
- **Digitization Steps:** Converting an optical image into digital format requires two core operations[cite: 2]:
  1. **Sampling:** Discretizing spatial coordinates $x$ and $y$[cite: 2].
  2. **Quantization:** Assigning integer gray/brightness levels to pixels[cite: 2].

---

## 2. Sampling and Spatial Resolution

- **Sampling:** Measures the value of the image function $f(x,y)$ at discrete spatial intervals, where each sample forms a pixel[cite: 2].
- **Spatial Resolution:** Defined by the sampling rate and measured in pixels or pixels per inch (PPI)[cite: 2]. Lowering spatial resolution too much introduces blocky artifacts and graininess[cite: 2].
- **Core Image Size Formula:**
  $$\text{Image Size} = \text{width} \times \text{height} \times \text{bits per pixel}$$[cite: 2]

---

## 3. Quantization and Color Depths

- **Quantization:** Replaces continuous brightness values with a discrete set of integers[cite: 2]. Using too few levels causes **false contours** (visible banding) in smooth tonal transitions[cite: 2].
- **Bitmap Storage Types:**
  - **Monochrome:** 1 bit per pixel ($0$ or $1$ for black/white); a $640\times480$ image requires $37.5\text{ KB}$[cite: 2].
  - **Grayscale:** 8 bits (1 byte) per pixel, yielding 256 gray levels ($300\text{ KB}$)[cite: 2].
  - **8-Bit Color:** Uses 1 byte per pixel pointing to a **Color Look-Up Table (LUT)** containing 3-byte RGB definitions ($300\text{ KB}$)[cite: 2].
  - **24-Bit Color:** Uses 3 bytes per pixel (Red, Green, Blue) to support $16,777,216$ colors ($900\text{ KB}$)[cite: 2]. Often stored as 32-bit to include an alpha channel for transparency[cite: 2].

---

## 4. Bitmap vs. Vector Graphics

| Feature            | Bitmap (Raster) Graphics                                 | Vector Graphics                                                      |
| :----------------- | :------------------------------------------------------- | :------------------------------------------------------------------- |
| **Core Structure** | A rectangular grid of colored pixels[cite: 2].           | Mathematical primitives (lines, curves, arcs, polygons)[cite: 2].    |
| **Primary Use**    | Digital photographs and continuous-tone images[cite: 2]. | Line drawings, logos, and typographies[cite: 2].                     |
| **Scalability**    | Loses quality and becomes pixelated when enlarged.       | Infinitely scalable without losing resolution or sharpness[cite: 2]. |

