import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaYoutube,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCamera,
  FaImage,
  FaBars
} from "react-icons/fa";

const basePath = import.meta.env.BASE_URL;

interface GalleryProps {
  setCurrentPage: (page: string) => void;
}

export default function Gallery({ setCurrentPage }: GalleryProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const galleryImages = [
    {
      id: 1,
      src: `${basePath}page4-img1.jpg`,
      thumbnail: `${basePath}thumb-1.jpg`,
      title: "Концерт в Москве",
      description: "Выступление на стадионе 'Лужники'. Полный зал и невероятная энергия!",
      date: "15 марта 2025",
      category: "Концерты"
    },
    {
      id: 2,
      src: `${basePath}page4-img2.jpg`,
      thumbnail: `${basePath}thumb-2.jpg`,
      title: "За кулисами",
      description: "Подготовка к выступлению. Настройка оборудования и репетиция.",
      date: "10 февраля 2025",
      category: "За кадром"
    },
    {
      id: 3,
      src: `${basePath}page4-img3.jpg`,
      thumbnail: `${basePath}thumb-3.jpg`,
      title: "Фотосессия",
      description: "Профессиональная фотосессия для нового альбома 'Новое Дыхание'.",
      date: "25 января 2025",
      category: "Фотосессии"
    },
    {
      id: 4,
      src: `${basePath}page4-img2.jpg`,
      thumbnail: `${basePath}thumb-2.jpg`,
      title: "Фан-встреча",
      description: "Встреча с фанатами после концерта. Автограф-сессия и общение с поклонниками.",
      date: "05 декабря 2024",
      category: "Фанаты"
    },
    {
      id: 5,
      src: `${basePath}page4-img3.jpg`,
      thumbnail: `${basePath}thumb-3.jpg`,
      title: "Студийная запись",
      description: "Работа в студии звукозаписи над новыми треками.",
      date: "18 ноября 2024",
      category: "Студия"
    },
    {
      id: 6,
      src: `${basePath}page4-img1.jpg`,
      thumbnail: `${basePath}thumb-1.jpg`,
      title: "Фестиваль 'Рок-Волна'",
      description: "Выступление на главной сцене фестиваля. 50 000 зрителей!",
      date: "02 октября 2024",
      category: "Фестивали"
    },
    {
      id: 7,
      src: `${basePath}page4-img2.jpg`,
      thumbnail: `${basePath}thumb-2.jpg`,
      title: "Тур по России",
      description: "Концерт в Санкт-Петербурге. Ледовый Дворец полон.",
      date: "20 сентября 2024",
      category: "Концерты"
    },
    {
      id: 8,
      src: `${basePath}page4-img3.jpg`,
      thumbnail: `${basePath}thumb-3.jpg`,
      title: "Интервью",
      description: "Интервью для музыкального канала. Рассказ о новом альбоме.",
      date: "15 августа 2024",
      category: "Медиа"
    },
    {
      id: 9,
      src: `${basePath}page4-img1.jpg`,
      thumbnail: `${basePath}thumb-1.jpg`,
      title: "Репетиция",
      description: "Подготовка к новому туру. Оттачивание каждого аккорда.",
      date: "01 июля 2024",
      category: "Репетиции"
    }
  ];

  const menuItems = [
    { name: "О НАС", page: "home" },
    { name: "АУДИО", page: "audio" },
    { name: "ВИДЕО", page: "video" },
    { name: "ГАЛЕРЕЯ", page: "gallery", active: true },
    { name: "ТУРЫ", page: "tour-dates" },
    { name: "КОНТАКТЫ", page: "contacts" },
  ];

  // Автоматическое переключение слайдов
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isAutoPlaying && isModalOpen && selectedImage !== null) {
      interval = setInterval(() => {
        setSelectedImage((prev) => {
          if (prev !== null) {
            const next = (prev + 1) % galleryImages.length;
            return next;
          }
          return prev;
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isModalOpen, selectedImage, galleryImages.length]);

  const closeMenu = () => setIsMenuOpen(false);

  const openImage = (imageId: number) => {
    setSelectedImage(imageId);
    setIsModalOpen(true);
    setIsAutoPlaying(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsAutoPlaying(true);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0));
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0));
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const selectedImageData = selectedImage !== null ? galleryImages[selectedImage] : null;

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
              Наша <span className="text-white">Галерея</span>
            </h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Фотографии с концертов, закулисные кадры и моменты нашей жизни
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group cursor-pointer h-full"
                onClick={() => openImage(image.id - 1)}
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-square flex-shrink-0">
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <FaCamera className="text-white text-2xl" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      {image.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                      {image.title}
                    </h4>
                    <div className="flex-grow">
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">
                        {image.description}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-800">
                      {image.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-purple-600/80 rounded-full p-3 transition-all duration-300"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-purple-600/80 rounded-full p-3 transition-all duration-300"
              >
                <FaChevronRight size={24} />
              </button>

              <div className="relative">
                <img
                  src={selectedImageData.src}
                  alt={selectedImageData.title}
                  className="w-full max-h-[80vh] object-contain"
                />
                
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-1 bg-gray-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={selectedImage}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedImageData.title}
                  </h3>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageData.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-2">
                  {selectedImageData.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{selectedImageData.date}</span>
                  <span className="flex items-center gap-1">
                    <FaImage size={12} />
                    {selectedImage !== null && `${selectedImage + 1} / ${galleryImages.length}`}
                  </span>
                </div>
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