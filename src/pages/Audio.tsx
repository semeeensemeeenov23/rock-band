import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaYoutube, 
  FaPlay, 
  FaPause,
  FaMusic,
  FaHeadphones,
  FaDiscord,
  FaSpotify,
  FaApple,
  FaYoutube as FaYoutubeMusic,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaTimes,
  FaBars
} from "react-icons/fa";

const basePath = import.meta.env.BASE_URL;

interface AudioProps {
  setCurrentPage: (page: string) => void;
}

export default function Audio({ setCurrentPage }: AudioProps) {
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const discography = [
    {
      id: 1,
      year: "2025",
      title: "Новое Дыхание",
      description: "Свежий звук и энергия нового поколения. Альбом, который задает тренды современного рока.",
      image: `${basePath}page2-img1.jpg`,
      audioFile: `${basePath}music.mp3`,
      tracks: [
        "01. Восход новой эры",
        "02. Электрический шторм",
        "03. Бесконечный драйв",
        "04. Рок навсегда",
        "05. Пульс нового города",
        "06. Свободное падение",
        "07. Металлические крылья",
        "08. Гром среди ясного неба",
        "09. Цифровой рассвет",
        "10. Энергия будущего",
        "11. Новая надежда"
      ]
    },
    {
      id: 2,
      year: "2024",
      title: "Возрождение",
      description: "Коллекция лучших композиций, объединяющая классический рок с современным звучанием.",
      image: `${basePath}page2-img2.jpg`,
      audioFile: `${basePath}music.mp3`,
      tracks: [
        "01. Путь воина",
        "02. Зов предков",
        "03. Стальной кулак",
        "04. Рассвет новой эры",
        "05. Бунтари",
        "06. Огненный дождь",
        "07. Власть музыки",
        "08. Бесконечный драйв",
        "09. Рок навсегда",
        "10. Последний герой"
      ]
    },
    {
      id: 3,
      year: "2023",
      title: "Начало",
      description: "Дебютный альбом, с которого всё началось. Чистая энергия и искренность молодости.",
      image: `${basePath}page2-img3.jpg`,
      audioFile: `${basePath}music.mp3`,
      tracks: [
        "01. Рок-н-ролл жив",
        "02. Зажигай",
        "03. Гитарное соло",
        "04. Барабанная дробь",
        "05. Гимн рока",
        "06. Электрический шторм",
        "07. Легенды рока",
        "08. Новое поколение",
        "09. Рок на века",
        "10. Вечное движение",
        "11. Сила звука"
      ]
    }
  ];

  const streamingPlatforms = [
    { name: "Spotify", icon: FaSpotify, color: "hover:text-[#1DB954]", url: "#" },
    { name: "Apple Music", icon: FaApple, color: "hover:text-[#FA243C]", url: "#" },
    { name: "YouTube Music", icon: FaYoutubeMusic, color: "hover:text-[#FF0000]", url: "#" },
    { name: "Discord", icon: FaDiscord, color: "hover:text-[#5865F2]", url: "#" },
  ];

  const menuItems = [
    { name: "О НАС", page: "home" },
    { name: "АУДИО", page: "audio", active: true },
    { name: "ВИДЕО", page: "video" },
    { name: "ГАЛЕРЕЯ", page: "gallery" },
    { name: "ТУРЫ", page: "tour-dates" },
    { name: "КОНТАКТЫ", page: "contacts" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setShowPlayer(false);
    setCurrentAlbum(null);
    setCurrentTrack(0);
  };

  const playAlbum = (albumId: number, trackIndex: number = 0) => {
    if (currentAlbum !== albumId || currentTrack !== trackIndex) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      setCurrentAlbum(albumId);
      setCurrentTrack(trackIndex);
      setShowPlayer(true);
      
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play().catch(e => console.log("Audio play error:", e));
          setIsPlaying(true);
        }
      }, 100);
    } else {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(e => console.log("Audio play error:", e));
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
        setIsPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    if (currentAlbum) {
      const currentAlbumData = discography.find(a => a.id === currentAlbum);
      if (currentAlbumData) {
        const nextTrackIndex = (currentTrack + 1) % currentAlbumData.tracks.length;
        setCurrentTrack(nextTrackIndex);
        
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Audio play error:", e));
          }
        }
      }
    }
  };

  const prevTrack = () => {
    if (currentAlbum) {
      const currentAlbumData = discography.find(a => a.id === currentAlbum);
      if (currentAlbumData) {
        const prevTrackIndex = (currentTrack - 1 + currentAlbumData.tracks.length) % currentAlbumData.tracks.length;
        setCurrentTrack(prevTrackIndex);
        
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Audio play error:", e));
          }
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      if (dur) setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentAlbumData = discography.find(a => a.id === currentAlbum);

  return (
    <div className="bg-black text-gray-400 min-h-screen font-sans overflow-x-hidden">
      {currentAlbumData && (
        <audio
          ref={audioRef}
          src={currentAlbumData.audioFile}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={nextTrack}
          preload="auto"
        />
      )}

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
              Наша <span className="text-white">Дискография</span>
            </h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Нажмите на любой трек, чтобы начать прослушивание
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/30"
          >
            <h4 className="text-center text-white text-lg mb-4 flex items-center justify-center gap-2">
              <FaHeadphones /> Слушать на платформах:
            </h4>
            <div className="flex justify-center gap-6 flex-wrap">
              {streamingPlatforms.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`flex items-center gap-2 text-gray-300 ${platform.color} transition-all duration-300`}
                >
                  <platform.icon size={24} />
                  <span className="text-sm">{platform.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="space-y-12 pb-24">
            {discography.map((album, albumIndex) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: albumIndex * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border transition-all duration-300 ${
                  currentAlbum === album.id 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                    : 'border-gray-700 hover:border-purple-500/50'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 p-6">
                    <div className="relative group overflow-hidden rounded-xl">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full rounded-xl transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          console.error("Image not found:", album.image);
                          e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                      {currentAlbum === album.id && isPlaying && (
                        <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center"
                          >
                            <FaMusic className="text-white text-2xl" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:w-2/3 p-6">
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      <strong className="text-purple-400">{album.year}.</strong> {album.title}
                    </h4>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {album.description}
                    </p>

                    <div className="mb-6">
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <FaMusic /> Треки:
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {album.tracks.map((track, trackIndex) => (
                          <motion.div
                            key={trackIndex}
                            whileHover={{ x: 5 }}
                            className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer group ${
                              currentAlbum === album.id && currentTrack === trackIndex
                                ? 'bg-purple-900/50 border-l-4 border-purple-500'
                                : 'hover:bg-purple-900/20'
                            }`}
                            onClick={() => playAlbum(album.id, trackIndex)}
                          >
                            <span className={`text-sm transition-colors ${
                              currentAlbum === album.id && currentTrack === trackIndex
                                ? 'text-purple-400 font-semibold'
                                : 'text-gray-300 group-hover:text-white'
                            }`}>
                              {track}
                            </span>
                            <button className="text-purple-400 hover:text-purple-300 transition-colors">
                              {currentAlbum === album.id && currentTrack === trackIndex && isPlaying ? (
                                <FaPause size={14} />
                              ) : (
                                <FaPlay size={14} />
                              )}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showPlayer && currentAlbumData && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black border-t border-purple-500/50 z-50 shadow-2xl"
          >
            <div className="max-w-[1200px] mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-1/4">
                  <img
                    src={currentAlbumData.image}
                    alt={currentAlbumData.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-white text-sm font-semibold truncate">
                      {currentAlbumData.tracks[currentTrack]}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {currentAlbumData.title} ({currentAlbumData.year})
                    </p>
                  </div>
                  <button
                    onClick={closePlayer}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 w-full md:w-2/4 justify-center">
                  <button onClick={prevTrack} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <FaBackward size={20} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                  >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
                  </button>
                  <button onClick={nextTrack} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <FaForward size={20} />
                  </button>
                </div>

                <div className="w-full md:w-1/4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
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
                    <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <button onClick={toggleMute} className="text-gray-400 hover:text-purple-400">
                        {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
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
            </div>
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