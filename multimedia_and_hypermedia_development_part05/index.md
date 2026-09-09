# Color Models in Images (Lecture 05)


<!--more-->

> **Academic Note:** This master study guide covers **Lecture 05: Color Models in Images**, exploring how different color spaces represent light, pigment, and perceptual attributes for displays, print, and video engineering[cite: 4].

---

## 1. Core Color Models Overview

- **RGB (Red, Green, Blue):** An **additive** color model used for electronic displays, Digital Image Processing (DIP), OpenCV, and online graphics[cite: 4]. Colors are added to black[cite: 4]. Range is typically $0-255$ for 8-bit images[cite: 4]. _Limitation:_ Not perceptually uniform[cite: 4].
- **CMYK (Cyan, Magenta, Yellow, Black):** A **subtractive** color model used for color printing[cite: 4]. Reflects and selectively absorbs light[cite: 4]. Black ($K$) is added to improve depth and contrast[cite: 4].
- **HSB / HSL (Hue, Saturation, Brightness/Luminance):** Describes colors the way humans perceive them[cite: 4].
  - **Hue:** Position around the color spectrum wheel[cite: 4].
  - **Saturation:** Intensity or purity of a color relative to gray[cite: 4].
  - **Brightness/Lightness:** Amount of black or white mixed in[cite: 4].

---

## 2. RGB to CMYK Conversion Math

1. **Normalize RGB Values:**
   $$R' = \frac{R}{255}, \quad G' = \frac{G}{255}, \quad B' = \frac{B}{255}$$[cite: 4]
2. **Compute Black ($K$):**
   $$K = 1 - \max(R', G', B')$$[cite: 4]
3. **Compute CMY (if $K < 1$):**
   $$C = \frac{1 - R' - K}{1 - K}, \quad M = \frac{1 - G' - K}{1 - K}, \quad Y = \frac{1 - B' - K}{1 - K}$$[cite: 4]
   _(Note: If $K = 1$, then $C=0, M=0, Y=0$ representing pure black)_[cite: 4].

---

## 3. Video Color Models (Separating Luminance & Chrominance)

Video engineering separates luminance ($Y$, brightness) from chrominance ($U, V$ or color differences) to match human visual perception and maintain backward compatibility with monochrome systems[cite: 4].

- **YUV:** Used in European PAL/SECAM video coding[cite: 4]. Chrominance is derived from blue-yellow and red-cyan differences ($U = B' - Y'$, $V = R' - Y'$[cite: 4]). For gray images where $R'=G'=B'$, chrominance is zero[cite: 4].
- **YIQ:** Used in North American and Japanese NTSC color TV broadcasting[cite: 4]. $I$ and $Q$ are rotated versions of $U$ and $V$ by $33^\circ$[cite: 4].
- **YCbCr:** The standard for digital video, JPEG image compression, and MPEG video compression[cite: 4]. Scaled and offset version of YUV where $C_b$ and $C_r$ have specific coefficients and offsets[cite: 4].

