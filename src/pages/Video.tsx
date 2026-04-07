import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaYoutube, 
  FaPlay, 
  FaPause,
  FaTimes,
  FaCalendarAlt,
  FaEye,
  FaVolumeUp,
  FaVolumeMute,
  FaBars
} from "react-icons/fa";

const basePath = import.meta.env.BASE_URL;

interface VideoProps {
  setCurrentPage: (page: string) => void;
  setIsVideoPlaying?: (value: boolean) => void;
}

export default function Video({ setCurrentPage, setIsVideoPlaying }: VideoProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videos = [
  {
    id: 1,
    title: "Восход новой эры",
    description: "Премьера клипа с нового альбома 'Новое Дыхание'",
    image: `${basePath}page3-img1.jpg`,
    videoFile: `${basePath}intro.mp4`,
    date: "15 марта 2025",
    views: "125K",
    category: "Премьера"
  },
  {
    id: 2,
    title: "Электрический шторм",
    description: "Живое выступление на фестивале 'Рок-Волна'",
    image: `${basePath}page3-img2.jpg`,
    videoFile: `${basePath}intro.mp4`,
    date: "10 февраля 2025",
    views: "89K",
    category: "Live"
  },
  {
    id: 3,
    title: "Бесконечный драйв",
    description: "Закулисные моменты тура по городам России",
    image: `${basePath}page3-img3.jpg`,
    videoFile: `${basePath}intro.mp4`,
    date: "25 января 2025",
    views: "67K",
    category: "Backstage"
  },
  {
    id: 4,
    title: "Рок навсегда",
    description: "Акустическая версия главного хита",
    image: `${basePath}page3-img4.jpg`,
    videoFile: `${basePath}intro.mp4`,
    date: "05 декабря 2024",
    views: "234K",
    category: "Acoustic"
  },
  {
    id: 5,
    title: "Путь воина",
    description: "Клип с элементами анимации и спецэффектов",
    image: `${basePath}page3-img5.jpg`,
    videoFile: `${basePath}intro.mp4`,
    date: "18 ноября 2024",
    views: "156K",
    category: "Клип"
  },
  {
    id: 6,
    title: "Сила звука",
    description: "Мастер-класс от гитариста группы",
    image: `${basePath}page3-img6.jpg`,
    videoFile: `${basePath}intro.mp4`,
    date: "02 октября 2024",
    views: "78K",
    category: "Мастер-класс"
  }
];

  const menuItems = [
    { name: "О НАС", page: "home" },
    { name: "АУДИО", page: "audio" },
    { name: "ВИДЕО", page: "video", active: true },
    { name: "ГАЛЕРЕЯ", page: "gallery" },
    { name: "ТУРЫ", page: "tour-dates" },
    { name: "КОНТАКТЫ", page: "contacts" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  // Управление скроллом при открытии модального окна
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setIsVideoPlaying?.(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsVideoPlaying?.(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, setIsVideoPlaying]);

  const openVideo = (videoId: number) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
  };

  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsModalOpen(false);
    setSelectedVideo(null);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      if (dur && !isNaN(dur)) {
        setProgress((current / dur) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newTime = percentage * duration;
      videoRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const selectedVideoData = videos.find(v => v.id === selectedVideo);

  // Синхронизация громкости при открытии
  useEffect(() => {
    if (videoRef.current && !isMuted) {
      videoRef.current.volume = volume;
    }
  }, [volume, isMuted]);

  return (
    <div className="bg-black text-gray-400 min-h-screen font-sans overflow-x-hidden">
      <header className="relative z-20">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[url('/bg-top.jpg')] bg-no-repeat bg-center-top min-h-[100px] md:min-h-[131px] bg-cover"
        >
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="pt-[20px] md:pt-[39px] pl-[20px] md:pl-[357px]">
              <button onClick={() => setCurrentPage("home")} className="block w-[180px] md:w-[246px] h-[50px] md:h-[62px] text-indent-[-5000px] bg-[url('/logo.png')] bg-no-repeat bg-contain" />
            </h1>
          </div>
        </motion.div>

        <div className="bg-[url('/menu-bg-tail.gif')] repeat-x">
          <div className="bg-[url('/menu-bg.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="max-w-[960px] mx-auto px-4">
              <div className="flex justify-between items-center py-2 md:py-[10px]">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-white text-2xl z-50 relative p-2 hover:text-[#93ceee] transition-colors"
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <div className="md:hidden w-10"></div>
                <nav className="hidden md:block w-full">
                  <ul className="flex justify-center items-center">
                    {menuItems.map((item, index) => (
                      <li
                        key={item.name}
                        className={`
                          relative
                          ${index === 0 ? "pl-0" : "bg-[url('/menu-li-line.png')] bg-no-repeat bg-left-top pl-[34px]"}
                          ${index === menuItems.length - 1 ? "pr-0" : "pr-[34px]"}
                        `}
                      >
                        <button
                          onClick={() => setCurrentPage(item.page)}
                          className={`
                            inline-block text-xl xl:text-2xl uppercase text-white tracking-tight
                            hover:text-[#93ceee] transition-colors whitespace-nowrap
                            ${item.active ? "text-[#93ceee]" : ""}
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
                        ${item.active ? "text-[#93ceee]" : ""}
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
      </header>

      <section id="content" className="relative z-10 py-8 md:py-12">
        <div className="max-w-[960px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4 text-center">
              Наши <span className="text-white">Музыкальные Видео</span>
            </h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Смотрите эксклюзивные клипы, живые выступления и закулисные кадры
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openVideo(video.id)}
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <FaPlay className="text-white text-2xl ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      {video.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt size={12} />
                        <span>{video.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEye size={12} />
                        <span>{video.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 mb-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl text-center border border-purple-500/30"
          >
            <FaYoutube className="text-5xl text-red-500 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">
              Подпишитесь на наш YouTube канал
            </h4>
            <p className="text-gray-300 mb-4">
              Еженедельные новые видео, клипы и live-выступления
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all duration-300"
            >
              <FaYoutube size={20} />
              Подписаться
            </motion.a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedVideoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden video-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full"
                  src={selectedVideoData.videoFile}
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-xs">{formatTime(currentTime)}</span>
                      <div
                        className="flex-grow h-1 bg-gray-700 rounded-full cursor-pointer relative group"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <span className="text-white text-xs">{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #a855f7 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedVideoData.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt size={12} />
                    {selectedVideoData.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye size={12} />
                    {selectedVideoData.views} просмотров
                  </span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {selectedVideoData.category}
                  </span>
                </div>
                <p className="text-gray-300">
                  {selectedVideoData.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 md:mt-16 bg-gradient-to-b from-gray-900 to-black border-t border-purple-900/50 relative z-20">
        <div className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs md:text-sm">
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