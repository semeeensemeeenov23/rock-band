import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaTimes } from "react-icons/fa";

const basePath = import.meta.env.BASE_URL;

interface FloatingGifProps {
  isVideoPlaying?: boolean;
}

export default function FloatingGif({ isVideoPlaying = false }: FloatingGifProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  const floatRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVideoPlayingRef = useRef(isVideoPlaying);

  const getRandomPosition = useCallback(() => {
    const padding = 50;
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 200;
    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;
    return { 
      x: Math.max(0, Math.min(maxX, randomX)), 
      y: Math.max(0, Math.min(maxY, randomY)) 
    };
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!isVideoPlaying) {
        setPosition(getRandomPosition());
        setIsVisible(true);
      }
    }, 15000);
  }, [isVideoPlaying, getRandomPosition]);

  useEffect(() => {
    isVideoPlayingRef.current = isVideoPlaying;
  }, [isVideoPlaying]);

  useEffect(() => {
    if (isVideoPlaying) return;
    
    resetTimer();

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      if (isVisible) {
        setIsVisible(false);
      }
      if (!isVideoPlayingRef.current) {
        resetTimer();
      }
    };

    events.forEach(event => window.addEventListener(event, handleActivity));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [isVisible, resetTimer, isVideoPlaying]);

  useEffect(() => {
    if (isVideoPlaying && isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 0);
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      
      return () => clearTimeout(timeoutId);
    }
  }, [isVideoPlaying, isVisible]);

  useEffect(() => {
    if (!isVideoPlaying && timerRef.current === null && !isVisible) {
      resetTimer();
    }
  }, [isVideoPlaying, isVisible, resetTimer]);

  useEffect(() => {
    if (!isVisible || isDragging) return;

    let time = 0;
    let animationId: number;

    const animate = () => {
      if (!floatRef.current) return;
      time += 0.02;
      
      const moveX = Math.sin(time) * 40;
      const moveY = Math.cos(time * 1.3) * 35;
      const rotate = Math.sin(time * 0.8) * 12;
      const scale = 1 + Math.sin(time * 1.5) * 0.05;
      
      floatRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, isDragging]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    let newX = startPos.x + deltaX;
    let newY = startPos.y + deltaY;
    
    newX = Math.max(0, Math.min(window.innerWidth - 200, newX));
    newY = Math.max(0, Math.min(window.innerHeight - 200, newY));
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart.x, dragStart.y, startPos.x, startPos.y]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartPos({ x: position.x, y: position.y });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClose = () => {
    setIsVisible(false);
    if (!isVideoPlaying) {
      resetTimer();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 200;
        setPosition(prev => ({
          x: Math.max(0, Math.min(maxX, prev.x)),
          y: Math.max(0, Math.min(maxY, prev.y))
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.3, rotate: 180 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 9999,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
        >
          <div ref={floatRef} className="relative group">
            <img
              src={`${basePath}floating-gif.gif`}
              alt="Floating"
              className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-full shadow-2xl cursor-grab active:cursor-grabbing"
              onDragStart={(e) => e.preventDefault()}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center';
                  fallback.innerHTML = '<span className="text-white text-4xl">🎸</span>';
                  parent.appendChild(fallback);
                }
              }}
            />
            
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl group-hover:bg-purple-500/30 transition-all duration-300" />
            
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            >
              <FaTimes size={12} />
            </button>
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg">
              🖱️ Перетащи меня!
            </div>
          </div>
          
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black/30 rounded-full blur-md transition-all duration-300 group-hover:w-32 group-hover:bg-black/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}