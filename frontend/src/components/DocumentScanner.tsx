import React, { useRef, useState } from 'react';
import { Camera, RotateCcw, Check, X } from 'lucide-react';

interface DocumentScannerProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export default function DocumentScanner({ onCapture, onClose }: DocumentScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError('');
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        
        // Apply image processing for document enhancement
        applyImageProcessing(context, canvas.width, canvas.height);
        
        // Get processed image data
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const applyImageProcessing = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Get image data
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Apply contrast enhancement
    const contrast = 1.2; // Increase contrast by 20%
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      // Enhance contrast for RGB channels
      data[i] = factor * (data[i] - 128) + 128; // Red
      data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
      data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue

      // Apply adaptive thresholding for better text recognition
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (brightness > 180) {
        data[i] = data[i + 1] = data[i + 2] = 255;
      }
    }

    // Put processed image data back
    context.putImageData(imageData, 0, 0);
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const confirmCapture = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="relative flex-1">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-red-50 text-red-700 p-4 rounded-lg max-w-md">
              {error}
            </div>
          </div>
        )}
        
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {isStreaming && (
              <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center space-x-4 bg-gradient-to-t from-black/50">
                <button
                  onClick={captureImage}
                  className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  <Camera className="h-8 w-8 text-gray-900" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <canvas ref={canvasRef} className="hidden" />
            <img
              src={capturedImage}
              alt="Captured document"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center space-x-4 bg-gradient-to-t from-black/50">
              <button
                onClick={retake}
                className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <RotateCcw className="h-8 w-8 text-gray-900" />
              </button>
              <button
                onClick={confirmCapture}
                className="p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600"
              >
                <Check className="h-8 w-8 text-white" />
              </button>
            </div>
          </>
        )}
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/75"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}