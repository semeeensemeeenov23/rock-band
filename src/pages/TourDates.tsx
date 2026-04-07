import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaYoutube,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaPhone,
  FaGlobe,
  FaClock,
  FaBars,
  FaTimes
} from "react-icons/fa";

interface TourDatesProps {
  setCurrentPage: (page: string) => void;
}

export default function TourDates({ setCurrentPage }: TourDatesProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const upcomingTours = [
    {
      id: 1,
      date: "15",
      month: "апр",
      year: "2025",
      city: "Москва",
      venue: "Крокус Сити Холл",
      description: "Большой сольный концерт",
      tickets: "#",
      phone: "+7 (495) XXX-XX-XX",
      status: "Билеты в продаже"
    },
    {
      id: 2,
      date: "20",
      month: "апр",
      year: "2025",
      city: "Санкт-Петербург",
      venue: "Ледовый Дворец",
      description: "Юбилейный тур",
      tickets: "#",
      phone: "+7 (812) XXX-XX-XX",
      status: "Билеты в продаже"
    },
    {
      id: 3,
      date: "28",
      month: "апр",
      year: "2025",
      city: "Екатеринбург",
      venue: "Теле-Клуб",
      description: "Энергия рока",
      tickets: "#",
      phone: "+7 (343) XXX-XX-XX",
      status: "Скоро в продаже"
    },
    {
      id: 4,
      date: "05",
      month: "май",
      year: "2025",
      city: "Казань",
      venue: "Корстон",
      description: "Новая программа",
      tickets: "#",
      phone: "+7 (843) XXX-XX-XX",
      status: "Скоро в продаже"
    },
    {
      id: 5,
      date: "12",
      month: "май",
      year: "2025",
      city: "Новосибирск",
      venue: "ДК Железнодорожников",
      description: "Сибирский тур",
      tickets: "#",
      phone: "+7 (383) XXX-XX-XX",
      status: "Предзаказ"
    },
    {
      id: 6,
      date: "18",
      month: "май",
      year: "2025",
      city: "Краснодар",
      venue: "Баскет-Холл",
      description: "Южный рок",
      tickets: "#",
      phone: "+7 (861) XXX-XX-XX",
      status: "Предзаказ"
    }
  ];

  const pastTours = [
    { id: 1, year: "2024", tour: "Осенний тур", city: "Москва, СПб, Екатеринбург" },
    { id: 2, year: "2024", tour: "Летний фестиваль", city: "Сочи, Ростов-на-Дону" },
    { id: 3, year: "2023", tour: "Юбилейный тур", city: "10 городов России" },
    { id: 4, year: "2023", tour: "Весеннее пробуждение", city: "Казань, Самара, Уфа" },
    { id: 5, year: "2022", tour: "Рок-марафон", city: "По всей России" },
    { id: 6, year: "2022", tour: "Зимний тур", city: "Сибирь и Дальний Восток" },
    { id: 7, year: "2021", tour: "Возвращение", city: "Москва, Санкт-Петербург" },
    { id: 8, year: "2021", tour: "Акустический вечер", city: "Камерные залы" },
    { id: 9, year: "2020", tour: "Онлайн-концерты", city: "Весь мир" },
    { id: 10, year: "2019", tour: "Большой тур", city: "15 городов России" },
    { id: 11, year: "2019", tour: "Европейское турне", city: "Берлин, Париж, Лондон" }
  ];

  const menuItems = [
    { name: "О НАС", page: "home" },
    { name: "АУДИО", page: "audio" },
    { name: "ВИДЕО", page: "video" },
    { name: "ГАЛЕРЕЯ", page: "gallery" },
    { name: "ТУРЫ", page: "tour-dates", active: true },
    { name: "КОНТАКТЫ", page: "contacts" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Билеты в продаже":
        return "bg-green-600";
      case "Скоро в продаже":
        return "bg-yellow-600";
      case "Предзаказ":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleTicketClick = (e: React.MouseEvent, city: string) => {
    e.preventDefault();
    alert(`Билеты на концерт в ${city} скоро появятся в продаже. Следите за обновлениями!`);
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Для получения контактной информации, пожалуйста, свяжитесь с нами через форму обратной связи');
  };

  const handlePastTourClick = (e: React.MouseEvent, tour: string) => {
    e.preventDefault();
    alert(`Архив тура "${tour}" будет доступен в разделе "Видео" и "Галерея"`);
  };

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
              Концерты <span className="text-white">и Туры</span>
            </h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Не пропустите наши выступления в вашем городе
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-400" />
                  Ближайшие концерты
                </h4>
              </motion.div>

              <div className="space-y-4">
                {upcomingTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex flex-col items-center justify-center text-white">
                        <span className="text-2xl font-bold">{tour.date}</span>
                        <span className="text-sm uppercase">{tour.month}</span>
                        <span className="text-xs opacity-80">{tour.year}</span>
                      </div>

                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-purple-400 text-sm" />
                          {tour.city}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">{tour.venue}</p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <FaClock size={12} />
                          {tour.description}
                        </p>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <div className="mb-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tour.status)} text-white`}>
                            {tour.status}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <button
                            onClick={(e) => handleTicketClick(e, tour.city)}
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-1 justify-end transition-colors w-full"
                          >
                            <FaTicketAlt size={12} />
                            Билеты
                          </button>
                          <button
                            onClick={handlePhoneClick}
                            className="text-gray-400 hover:text-white flex items-center gap-1 justify-end transition-colors w-full"
                          >
                            <FaPhone size={12} />
                            {tour.phone}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaClock className="text-purple-400" />
                  Прошедшие туры
                </h4>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                  <ul className="space-y-3">
                    {pastTours.map((tour, index) => (
                      <motion.li
                        key={tour.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="group cursor-pointer"
                      >
                        <button
                          onClick={(e) => handlePastTourClick(e, tour.tour)}
                          className="w-full text-left p-2 rounded-lg hover:bg-purple-900/20 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-purple-400 font-bold text-sm min-w-[45px]">
                              {tour.year}
                            </span>
                            <div className="flex-grow">
                              <div className="text-white text-sm font-semibold group-hover:text-purple-400 transition-colors">
                                {tour.tour}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {tour.city}
                              </div>
                            </div>
                          </div>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl text-center border border-purple-500/30"
          >
            <FaGlobe className="text-5xl text-purple-400 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">
              Хотите, чтобы мы выступили в вашем городе?
            </h4>
            <p className="text-gray-300 mb-4">
              Оставьте заявку на проведение концерта, и мы свяжемся с вами
            </p>
            <button
              onClick={() => setCurrentPage("contacts")}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold"
            >
              Подать заявку
            </button>
          </motion.div>
        </div>
      </section>

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