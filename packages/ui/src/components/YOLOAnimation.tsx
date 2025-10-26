import { useState, useEffect, useRef } from 'react';
import { View, Text, styled } from 'tamagui';

// 黑色背景容器
const Container = styled(View, {
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', // 防止文字溢出
});

// 单个字母样式（带过渡动画）
const AnimatedLetter = styled(Text, {
  color: 'white',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', // 平滑过渡曲线
});

// "Studio"文字样式（带渐入过渡）
const StudioText = styled(Text, {
  color: 'white',
  fontSize: 36,
  opacity: 0,
  transition: 'opacity 0.6s ease 0.2s', // 延迟0.2s渐入
  marginTop: 20,
});

export default function YOLOAnimation() {
  const [progress, setProgress] = useState(0); // 动画进度（0-1）
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);

  // 监听滚轮事件，更新进度（动画期间阻止页面滚动，完成后恢复滚动）
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 保持一个 progress 的 ref 副本，供事件处理器稳定读取
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY > 0 ? 0.15 : -0.15;

      // 如果动画未完成，始终拦截并阻止页面滚动
      if (progressRef.current < 1) {
        e.preventDefault();
        setProgress(prev => Math.max(0, Math.min(1, prev + delta)));
        return;
      }

      // 只在向上滚动时尝试重启动画
      if (delta >= 0) return;

      // 确保在浏览器环境
      if (typeof window === 'undefined') return;

      // 跨浏览器读取页面滚动位置并允许小容差（<=2px）
      let scrollTop = 0;
      if (typeof window.pageYOffset !== 'undefined') {
        scrollTop = window.pageYOffset as number;
      } else if (document.documentElement && typeof document.documentElement.scrollTop !== 'undefined') {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop || 0;
      }
      if (Math.abs(scrollTop) > 2) return; // 未到顶部，不触发

      // 只有当容器在视口内时才拦截并启动反向动画
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      // 拦截滚动并开始反向动画
      e.preventDefault();
      setProgress(prev => Math.max(0, Math.min(1, prev + delta)));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [progress]);

  // 根据动画进度控制页面滚动条显示（动画期间隐藏，结束后恢复）
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = progress < 1 ? 'hidden' : '';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [progress]);

  // 将 ref 与 state 同步，以便已注册的处理器读取到最新值
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // 计算单个字母的样式
  const getLetterProps = (char: string) => {
    const isKeyLetter = ['Y', 'O', 'L', 'O'].includes(char); // 需要放大的字母

    // 字体大小动画：关键字母从28→56，其他从28→10
    const fontSize = isKeyLetter 
      ? 28 + progress * 28 
      : 28 - progress * 18;

    // 透明度动画：非关键字母逐渐消失（进度1时完全透明）
    const opacity = isKeyLetter ? 1 : 1 - progress * 1.2;

    // 间距动画：字母逐渐靠拢（进度1时间距为0）
    const letterSpacing = 2 - progress * 2;

    return { fontSize, opacity, letterSpacing };
  };

  return (
    <Container ref={containerRef}>
      <View>
        {/* 第一行：You Only Live Once */}
        <View flexDirection="row" alignItems="center">
          {['Y', 'o', 'u', ' ', 'O', 'n', 'l', 'y', ' ', 'L', 'i', 'v', 'e', ' ', 'O', 'n', 'c', 'e']
            .map((char, index) => (
              <AnimatedLetter 
                key={index} 
                {...getLetterProps(char)} // 动态应用样式
              >
                {char}
              </AnimatedLetter>
            ))}
        </View>

        {/* 第二行：Studio（进度>0.6时渐入） */}
        <StudioText 
          style={{ 
            opacity: progress > 0.6 ? (progress - 0.6) / 0.4 : 0 // 进度0.6→1时，透明度0→1
          }}
        >
          Studio
        </StudioText>
      </View>
    </Container>
  );
}