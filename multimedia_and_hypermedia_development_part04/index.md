# Graphics & Image File Formats (Lecture 04)


<!--more-->

> **Academic Note:** This master study guide covers **Lecture 04: Graphics and Image File Formats**, examining how different file standards manage compression, color depth, transparency, and metadata for specific applications[cite: 3].

---

## 1. Overview of Common Image File Formats

- **GIF (Graphics Interchange Format):** Developed by UNISYS and CompuServe for phone-line transmission[cite: 3]. It features 8-bit color (limited to 256 colors), lossless LZW compression, simple frame-based animation, and a four-pass interlacing method for progressive display[cite: 3].
- **JPEG (Joint Photographic Experts Group):** The dominant standard for photographic compression[cite: 3]. It leverages a human vision model (exploiting the eye-brain limitation regarding fine detail) to provide adjustable lossy compression without animation or transparency support[cite: 3].
- **PNG (Portable Network Graphics):** Designed as a web-ready replacement for GIF[cite: 3]. It supports up to 48-bit color depth, full alpha-channel transparency, 2D interlacing across seven passes, and superior lossless/lossy compression modes[cite: 3].
- **TIFF (Tagged Image File Format):** Created by Aldus and Microsoft using a flexible tag-based architecture[cite: 3]. It supports multiple image types (1-bit, grayscale, 8-bit, 24-bit RGB) and flexible compression options including optional JPEG tags[cite: 3].
- **BMP (Bitmap / Device Independent Bitmap):** A Windows system standard supporting indexed color up to 8 bits, plus 16, 24, and 32-bit color[cite: 3]. It utilizes Run-Length Encoding (RLE) or uncompressed storage (with 16/32-bit alpha channel images always stored uncompressed)[cite: 3].
- **EXIF (Exchangeable Image File):** A digital camera format designed to store rich metadata (exposure, flash, white balance) to aid printer color-correction algorithms, typically embedded within JPEG files[cite: 3].

---

## 2. Image Format Comparison Matrix

| Format   | Animation    | Transparency        | Compression Type                  | Color Depth                     |
| :------- | :----------- | :------------------ | :-------------------------------- | :------------------------------ |
| **GIF**  | Yes[cite: 3] | Basic[cite: 3]      | LZW Lossless[cite: 3]             | 8-bit (256 colors)[cite: 3]     |
| **JPEG** | No[cite: 3]  | No[cite: 3]         | Lossy / Adjustable[cite: 3]       | 24-bit[cite: 3]                 |
| **PNG**  | No[cite: 3]  | Full Alpha[cite: 3] | Lossless / Lossy[cite: 3]         | Up to 48-bit[cite: 3]           |
| **TIFF** | No[cite: 3]  | Optional[cite: 3]   | Flexible (Lossless/JPEG)[cite: 3] | Multiple Types[cite: 3]         |
| **BMP**  | No[cite: 3]  | No[cite: 3]         | None / RLE[cite: 3]               | Various (up to 32-bit)[cite: 3] |

---

## 3. Practical Rule of Thumb

- Use **JPEG** for photographs[cite: 3].
- Use **PNG** for graphics requiring transparency[cite: 3].
- Use **GIF** for simple animations[cite: 3].
- Use **TIFF** for archival or print-quality images[cite: 3].

