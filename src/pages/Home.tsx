import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaYoutube, 
  FaPlay, 
  FaPause,
  FaCalendarAlt, 
  FaNewspaper, 
  FaTicketAlt,
  FaVideo,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaVolumeUp,
  FaVolumeMute
} from "react-icons/fa";

const basePath = import.meta.env.BASE_URL;

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    { id: 1, image: `${basePath}slider-img1.jpg`, title: "Рок-концерт", description: "Мощь и энергия на сцене" },
    { id: 2, image: `${basePath}slider-img2.jpg`, title: "Живое выступление", description: "Незабываемые эмоции" },
    { id: 3, image: `${basePath}slider-img3.jpg`, title: "Фанаты", description: "Вместе мы сила" },
  ];

  const menuItems = [
    { name: "О НАС", page: "home" },
    { name: "АУДИО", page: "audio" },
    { name: "ВИДЕО", page: "video" },
    { name: "ГАЛЕРЕЯ", page: "gallery" },
    { name: "ТУРЫ", page: "tour-dates" },
    { name: "КОНТАКТЫ", page: "contacts" },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openVideoPlayer = () => {
    setShowVideoPlayer(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }, 100);
  };

  const closeVideoPlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoPlayer(false);
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setCurrentTime(0);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      if (dur) setVideoProgress((current / dur) * 100);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newTime = percentage * duration;
      videoRef.current.currentTime = newTime;
      setVideoProgress(percentage * 100);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-black text-gray-400 min-h-screen font-sans overflow-x-hidden">
      <header className="relative z-20">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-[100px] md:min-h-[131px] bg-no-repeat bg-center-top bg-cover"
          style={{ backgroundImage: `url(${basePath}bg-top.jpg)` }}
        >
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="pt-[20px] md:pt-[39px] pl-[20px] md:pl-[357px]">
              <button 
                onClick={() => setCurrentPage("home")} 
                className="block w-[180px] md:w-[246px] h-[50px] md:h-[62px] bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${basePath}logo.png)`, textIndent: '-5000px' }}
              />
            </h1>
          </div>
        </motion.div>

        <div className="repeat-x" style={{ backgroundImage: `url(${basePath}menu-bg-tail.gif)` }}>
          <div className="bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${basePath}menu-bg.jpg)` }}>
            <div className="max-w-[960px] mx-auto px-4">
              <div className="flex justify-between items-center py-2 md:py-[10px]">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-white text-2xl z-50 relative p-2 hover:text-[#93ceee] transition-colors"
                  aria-label="Меню"
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                
                <div className="md:hidden w-10"></div>
                
                <nav className="hidden md:block w-full">
                  <ul className="flex justify-center items-center">
                    {menuItems.map((item, index) => (
                      <li
                        key={item.name}
                        className="relative"
                        style={index !== 0 ? { 
                          paddingLeft: '34px',
                          backgroundImage: `url(${basePath}menu-li-line.png)`, 
                          backgroundRepeat: 'no-repeat', 
                          backgroundPosition: 'left top' 
                        } : { paddingLeft: '0' }}
                      >
                        <button
                          onClick={() => setCurrentPage(item.page)}
                          className={`
                            inline-block text-xl xl:text-2xl uppercase text-white tracking-tight
                            hover:text-[#93ceee] transition-colors whitespace-nowrap
                            ${item.name === "О НАС" ? "text-[#93ceee]" : ""}
                            ${index !== menuItems.length - 1 ? 'pr-[34px]' : 'pr-0'}
                          `}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black/95 z-40 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        setCurrentPage(item.page);
                        closeMenu();
                      }}
                      className={`
                        text-2xl uppercase text-white tracking-wider
                        hover:text-[#93ceee] transition-colors block py-2
                        ${item.name === "О НАС" ? "text-[#93ceee]" : ""}
                      `}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Слайдер */}
        <div className="relative max-w-[960px] mx-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-4 md:mt-8 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mx-4 md:mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-8 md:bottom-20 left-4 md:left-8 lg:left-16 text-white"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600/80 text-white w-8 h-8 md:w-10 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-sm text-sm md:text-base"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600/80 text-white w-8 h-8 md:w-10 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-sm text-sm md:text-base"
          >
            →
          </button>

          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index
                    ? "w-4 md:w-8 h-1 md:h-2 bg-purple-500"
                    : "w-1 md:w-2 h-1 md:h-2 bg-white/50 hover:bg-white/80"
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Контент - замени все img src на ${basePath}... */}
      <section id="content" className="relative z-10 py-8 md:py-12">
        <div className="max-w-[960px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Новости - без изменений */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6 flex items-center gap-2">
                <FaNewspaper className="text-lg md:text-xl" /> Последние <span className="text-white">Новости</span>
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                {[
                  { date: "09", text: "Рок-группа представляет новый бесплатный веб-шаблон, созданный профессиональной командой." },
                  { date: "07", text: "Шаблон включает PSD файлы и готовые решения для вашего сайта." },
                  { date: "02", text: "PSD исходные файлы доступны для зарегистрированных пользователей." },
                ].map((news, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-base md:text-xl font-bold">{news.date}</span>
                      <span className="text-[10px] md:text-xs">ноя</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm md:text-base group-hover:text-white transition-colors">
                        {news.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Туры - без изменений */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-lg md:text-xl" /> Туры <span className="text-white">и Даты</span>
              </h3>

              <div className="space-y-3 md:space-y-4">
                {[
                  { date: "09", month: "ноя", city: "Москва", venue: "Крокус Сити Холл" },
                  { date: "05", month: "ноя", city: "Санкт-Петербург", venue: "Ледовый Дворец" },
                  { date: "01", month: "ноя", city: "Екатеринбург", venue: "Теле-Клуб" },
                ].map((tour, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-purple-900/20 transition-all cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-purple-900/50 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-lg md:text-2xl font-bold text-purple-400">{tour.date}</span>
                      <span className="text-[10px] md:text-xs text-gray-400">{tour.month}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-white text-sm md:text-base">{tour.city}</h4>
                      <p className="text-xs md:text-sm text-gray-400">{tour.venue}</p>
                    </div>
                    <FaTicketAlt className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-base" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* В продаже */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6">
                В Продаже <span className="text-white">Сейчас!</span>
              </h3>
              <div className="relative group overflow-hidden rounded-lg md:rounded-xl">
                <img src={`${basePath}page1-img1.jpg`} alt="Альбом" className="w-full rounded-lg md:rounded-xl transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-3 md:mt-4 text-gray-300 text-sm md:text-base">
                Новый альбом уже в продаже! Слушайте на всех цифровых платформах.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Ближайшие события */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3 md:mb-4">Ближайшие События</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex gap-2 md:gap-3 group">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xl md:text-2xl font-bold text-purple-400">09</div>
                    <div className="text-[10px] md:text-xs text-gray-500">ноя</div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs md:text-sm group-hover:text-white transition-colors">
                      Презентация нового альбома в Москве. Встреча с фанатами.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3 group">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xl md:text-2xl font-bold text-purple-400">03</div>
                    <div className="text-[10px] md:text-xs text-gray-500">ноя</div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs md:text-sm group-hover:text-white transition-colors">
                      Автограф-сессия в Санкт-Петербурге. Ждем всех!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Новое Видео */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3 md:mb-4 flex items-center gap-2">
                <FaVideo className="text-base md:text-xl" /> Новое Видео
              </h3>
              <div 
                className="relative group cursor-pointer rounded-lg md:rounded-xl overflow-hidden"
                onClick={openVideoPlayer}
              >
                <img src={`${basePath}page1-img2.jpg`} alt="Видео" className="w-full rounded-lg md:rounded-xl transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-sm md:text-2xl ml-0.5 md:ml-1" />
                  </div>
                </div>
              </div>
              <p className="mt-2 md:mt-3 text-center text-gray-400 text-xs md:text-sm">
                "ROCK ENERGY" - официальный клип
              </p>
            </motion.div>

            {/* О нас */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3 md:mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-base md:text-xl" /> О Нас
              </h3>
              <h6 className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">Мы - рок-группа, создающая энергию</h6>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Наша музыка - это мощь, страсть и искренность. Мы дарим эмоции и заряжаем энергией. 
                Присоединяйтесь к нашему рок-движению и станьте частью большой семьи рок-музыки!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Модальное окно видео плеера */}
      <AnimatePresence>
        {showVideoPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={closeVideoPlayer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoPlayer}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full"
                  src={`${basePath}intro.mp4`}
                  onTimeUpdate={handleVideoTimeUpdate}
                  onLoadedMetadata={handleVideoLoadedMetadata}
                  onEnded={closeVideoPlayer}
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-xs">{formatTime(currentTime)}</span>
                      <div
                        className="flex-grow h-1 bg-gray-700 rounded-full cursor-pointer relative group"
                        onClick={handleVideoSeek}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                          style={{ width: `${videoProgress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <span className="text-white text-xs">{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleVideoPlay}
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      {isVideoPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleVideoMute}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {isVideoMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  "ROCK ENERGY" - официальный клип
                </h3>
                <p className="text-gray-300">
                  Премьера нового клипа от рок-группы. Энергия, драйв и мощь в каждом кадре!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 md:mt-16 bg-gradient-to-b from-gray-900 to-black border-t border-purple-900/50 relative z-20">
        <div className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} | Все права защищены
            </p>
            <div className="flex gap-4 md:gap-6">
              {[
                { icon: FaTwitter, name: "Twitter", color: "hover:text-blue-400" },
                { icon: FaFacebook, name: "Facebook", color: "hover:text-blue-600" },
                { icon: FaYoutube, name: "Youtube", color: "hover:text-red-600" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`text-gray-400 ${social.color} transition-all duration-300`}
                >
                  <social.icon size={20} className="md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}