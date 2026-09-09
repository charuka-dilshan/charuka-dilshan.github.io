# Digital Audio & Sound Processing (Lecture 06)


<!--more-->

> **Academic Note:** This master study guide covers **Lecture 06: Digital Audio**, explaining how continuous acoustic sound waves are captured, sampled, quantized, and encoded into digital data for computer processing[cite: 5].

---

## 1. Fundamentals of Sound and Digitization

* **Sound Waves:** Sound is a continuous longitudinal pressure wave where air molecules compress and expand[cite: 5]. Acoustics is the study of sound generation, transmission, and reception[cite: 5].
* **Digitization Process:** To input sound into a computer, microphones convert acoustic waves into continuous analog signals, which a sound card then digitizes into a stream of numbers through three main steps[cite: 5]:
  1. **Sampling:** Recording values at distinct time points[cite: 5].
  2. **Quantizing:** Measuring and converting amplitude/voltage into discrete integer levels[cite: 5].
  3. **Encoding:** Converting integer numbers into binary code (bits $0$ and $1$)[cite: 5].

---

## 2. Sampling and the Nyquist Theorem

* **Sampling Rate:** Frequency measured in Hertz ($\text{Hz}$), representing the number of samples taken per second (e.g., standard audio ranges from $8\text{ kHz}$ to $48\text{ kHz}$)[cite: 5].
* **Nyquist Theorem:** States that the sampling frequency must be at least twice the highest frequency component in the signal to accurately recover the original sound without aliasing[cite: 5]:
  $$\text{Sampling Frequency} \ge 2 \times f_{\max}$$[cite: 5]
* **Anti-Aliasing Filters:** Most systems use filters to restrict input frequencies at or below the Nyquist frequency to prevent distorted alias frequencies[cite: 5].

---

## 3. Quantization and Signal Quality

* **Quantization:** The process of representing sample amplitudes using discrete integers[cite: 5]. 
  * **8-bit quantization:** Divides the vertical range into $256$ levels[cite: 5].
  * **16-bit quantization:** Divides the vertical range into $65,536$ levels[cite: 5].
* **Quantization Noise:** Round-off error introduced by forcing continuous voltages into discrete bins[cite: 5].
* **SQNR (Signal-to-Quantization Noise Ratio):** Characterizes digital audio precision based on the number of quantization bits ($Q$)[cite: 5]:
  $$\text{SQNR} = 20 \log_{10} 2^{Q} \approx 6.02 \cdot Q \text{ dB}$$[cite: 5]
