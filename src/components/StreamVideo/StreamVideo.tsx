import React, { useRef, useEffect } from 'react'

import s from './streamVideo.module.css';

function StreamVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    async function initWebcam() {
      try {
        const stream = await window.navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        })
        const setCanvas = () => {
          if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth
            canvasRef.current.height = videoRef.current.videoHeight
            const ctx = canvasRef.current.getContext('2d')
            videoRef.current.play()
            const animate = () => {
              if (ctx && videoRef.current) {
                ctx.drawImage(videoRef.current, 0, 0)
              }
              requestAnimationFrame(animate)
            };
            requestAnimationFrame(animate)
          }
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = setCanvas
        }
      } catch (err) {
        console.log(err);
      }
    }
    initWebcam();
  }, [])
  return (
    <div className={s.streamVideo}>
      <video className={s.video} ref={videoRef} muted autoPlay />
      <canvas className={s.canvas} ref={canvasRef} />
    </div>
  )
}

export default StreamVideo