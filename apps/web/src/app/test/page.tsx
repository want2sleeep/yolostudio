'use client'

import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const [progress, setProgress] = useState(0)

  // We'll drive progress from wheel/touch so the page itself can remain visually fixed.
  const progressRef = useRef(progress)
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const clamp = (v: number) => Math.min(1, Math.max(0, v))

    // Wheel handler: convert deltaY to progress delta
    const onWheel = (e: WheelEvent) => {
      // deltaY > 0 => user scrolls down / swipes up (want to advance animation)
      const sensitivity = 0.0025 // tuning: how much wheel moves the progress
      const cur = progressRef.current
      const next = clamp(cur + e.deltaY * sensitivity)
      if (next !== cur) {
        e.preventDefault()
        setProgress(next)
      }
      // if next === cur, allow native scrolling (we're at boundary)
    }

    // Touch handlers for mobile
    let touchStartY = 0
    let lastY = 0
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY
        lastY = touchStartY
      }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return
      const y = e.touches[0].clientY
      const dy = lastY - y // positive when user swipes up (want to increase progress)
      lastY = y
      const sensitivity = 1 / window.innerHeight // swipe full screen -> full progress
      const cur = progressRef.current
      const next = clamp(cur + dy * sensitivity)
      if (next !== cur) {
        e.preventDefault()
        setProgress(next)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const text = 'You Only Live Once'
  const letters = Array.from(text)

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
  // YOLO overlay removed; 保持 Studio 渐入
  // 当 progress 达到一定阈值后，隐藏初始字母，仅显示两行最终文本
  // finalOpacity 用于控制最终 "YOLO Studio" 的淡入
  const finalOpacity = clamp((progress - 0.65) / 0.35, 0, 1) // 0.65 -> 1 渐入

  return (
    <div style={{ minHeight: '200vh', background: '#000', color: '#fff' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', lineHeight: 1 }}>
          {/* 顶部区域：初始文本（居中，动画幅度减小） */}
          <div style={{ position: 'relative' }}>
            {/* 初始文本（按字母缩放）。基线字号调大以便 Y/O/L/O 在最终态与 Studio 大小一致 */}
            <div style={{
              position: 'relative',
              display: 'inline-block',
              whiteSpace: 'pre',
              fontSize: 'clamp(40px, 10vw, 120px)',
              fontWeight: 600,
              textAlign: 'center',
            }}>
              {letters.map((ch, i) => {
                // 初始文本在整个过程中缓慢变化（缩放与淡出）
                // 保留原始句子中的 Y/O/L/O（大写字母）为目标字母，始终可见
                const isTarget = ch === 'Y' || ch === 'O' || ch === 'L'
                if (ch === ' ') {
                  return <span key={i} style={{ display: 'inline-block', width: '0.5em' }}>{ch}</span>
                }
                // 目标字母保持可见并稍微放大（以匹配最终的 YOLO 大小），非目标字母逐渐淡出
                const targetScale = 1 + finalOpacity * 0.12 // 目标字母稍微放大
                const nonTargetScale = Math.max(1 - progress * 0.12, 0.9)
                const scale = isTarget ? targetScale : nonTargetScale
                const opacity = isTarget ? 1 : clamp(1 - progress * 1.1, 0, 1)
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      transform: `scale(${scale})`,
                      opacity,
                      transformOrigin: '50% 70%',
                      transition: 'transform 120ms linear, opacity 120ms linear',
                    }}
                  >
                    {ch}
                  </span>
                )
              })}
            </div>
            {/* YOLO overlay removed */}
          </div>

          {/* 最终显示为两行：上 YOLO，下 Studio（只在最终态显示） */}
          <div style={{
            marginTop: '0.75em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25em',
            opacity: finalOpacity,
            transition: 'opacity 200ms linear, transform 200ms linear',
            transform: `translateY(${(1 - finalOpacity) * 8}px)`,
          }}>
            {/* 只渐入 Studio（YOLO 由上方的字母保留并放大形成） */}
            <div style={{
              fontSize: 'clamp(40px, 10vw, 120px)',
              fontWeight: 800,
              lineHeight: 1,
            }}>Studio</div>
          </div>
        </div>
      </div>
    </div>
  )
}