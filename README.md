# IE307.P11.Group-6.Seminar

An **Expo & React Native** application implementing features for **camera capture, QR code scanning, screenshot management, and audio/video playback** with speech-to-text and text-to-speech functionality.

## Table of Contents
1. [Features](#features)  
2. [Prerequisites](#prerequisites)  
3. [Installation](#installation)  
4. [Usage](#usage)

---

## Features

### Camera Features
- **Capture Photos/Videos** using `expo-camera`.
- **Scan QR Codes** using `expo-camera`.
- **Screenshot** using `react-native-view-shot`
- **Prevent Screenshots** for sensitive screens with `expo-screen-capture`.

### Audio/Video Features
- **Play Music and Audio** using `expo-av`.
- **Play Video** using `expo-av`.
- **Speech-to-Text** using `expo-speech` or Google API for natural speech input.
- **Text-to-Speech** using `expo-speech` or Google API for natural speech output.

---

## Prerequisites
1. **Node.js** (>=16.0.0) installed.  
2. **Expo CLI** installed globally:
   ```bash
   npm install -g expo-cli
   ```
3. Google Cloud API Key: Enable Speech-to-Text and Text-to-Speech APIs in the Google Cloud Console.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/NunNunIT/IE307.P11.Group6-Seminar.git
   ```
2. Navigate to the project directory:
   ```
   cd IE307.P11.Group6-Seminar
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the project:
   ```
   npx expo start
   ```

--- 

## Usage

1. Camera Features
   - Photo/Video Capture
  
      Access the camera by navigating to the Camera screen.
   - QR Code Scanning

      Automatically detects and decodes QR codes in the camera view.
   - Screenshot

   - Prevent Screenshots
     Protected screens prevent screenshots using expo-screen-capture.

2. Audio/Video Features
   - Play Music/Sound
   - Play Video
   - Speech-to-Text

     Convert speech into text using expo-speech or Google API.
   - Text-to-Speech
   
     Convert text into spoken words using expo-speech or Google API.
