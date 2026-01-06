'use client'; // Required for Next.js App Router

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FilesetResolver, FaceDetector } from '@mediapipe/tasks-vision';

const SmartSelfie = () => {
  const webcamRef = useRef(null);
  const [guideMessage, setGuideMessage] = useState("Loading AI...");
  const [isPositioned, setIsPositioned] = useState(false);
  const [faceDetector, setFaceDetector] = useState(null);

  // 1. Initialize MediaPipe Face Detector
  useEffect(() => {
    const initializeDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
      });
      setFaceDetector(detector);
      setGuideMessage("Position face in circle");
    };
    initializeDetector();
  }, []);

  // 2. The Detection Loop
  useEffect(() => {
    let intervalId;

    if (faceDetector && webcamRef.current?.video?.readyState === 4) {
      intervalId = setInterval(() => {
        detectFace();
      }, 200); // Check every 200ms
    }

    return () => clearInterval(intervalId);
  }, [faceDetector, webcamRef.current?.video?.readyState]);

  const detectFace = () => {
    if (!webcamRef.current?.video) return;

    const video = webcamRef.current.video;
    const startTimeMs = performance.now();
    const detections = faceDetector.detectForVideo(video, startTimeMs).detections;

    if (detections.length === 0) {
      setGuideMessage("No face detected");
      setIsPositioned(false);
      return;
    }

    // Get the first detected face
    const box = detections[0].boundingBox;
    
    // Video Dimensions
    const vWidth = video.videoWidth;
    const vHeight = video.videoHeight;

    // Calculate Face Center & Size
    const faceCenterX = box.originX + box.width / 2;
    const faceCenterY = box.originY + box.height / 2;
    const facePercentOfFrame = box.width / vWidth;

    // --- LOGIC: CHECK IF FACE FITS IN CIRCLE ---
    
    // 1. Check Centering (Accept 10% deviation from center)
    const isCenteredX = Math.abs(faceCenterX - vWidth / 2) < vWidth * 0.1;
    const isCenteredY = Math.abs(faceCenterY - vHeight / 2) < vHeight * 0.1;

    // 2. Check Closeness (Face must take up ~35-60% of screen width)
    const isCloseEnough = facePercentOfFrame > 0.35;
    const isTooClose = facePercentOfFrame > 0.65;

    if (!isCenteredX || !isCenteredY) {
      setGuideMessage("Center your face");
      setIsPositioned(false);
    } else if (!isCloseEnough) {
      setGuideMessage("Move Closer");
      setIsPositioned(false);
    } else if (isTooClose) {
      setGuideMessage("Too Close!");
      setIsPositioned(false);
    } else {
      setGuideMessage("Perfect! Hold still...");
      setIsPositioned(true);
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured:", imageSrc);
    alert("Photo Taken!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.cameraWrapper}>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          style={styles.webcam}
        />
        
        {/* The Circular Overlay */}
        <div style={{
          ...styles.overlay,
          borderColor: isPositioned ? '#4ade80' : '#ffffff', // Green if ready, White otherwise
        }}></div>
      </div>

      <div style={styles.controls}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{guideMessage}</p>
        <button 
          onClick={capturePhoto} 
          disabled={!isPositioned}
          style={{
            ...styles.button,
            opacity: isPositioned ? 1 : 0.5,
            cursor: isPositioned ? 'pointer' : 'not-allowed'
          }}
        >
          Take Selfie
        </button>
      </div>
    </div>
  );
};

// Simple Inline CSS for the demo
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' },
  cameraWrapper: { position: 'relative', width: '320px', height: '320px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' },
  webcam: { width: '100%', height: '100%', objectFit: 'cover' },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    border: '4px solid white', borderRadius: '50%', zIndex: 10
  },
  controls: { textAlign: 'center' },
  button: { padding: '12px 24px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '25px', fontSize: '16px' }
};

export default SmartSelfie;