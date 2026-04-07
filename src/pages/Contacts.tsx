import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";

interface ContactsProps {
  setCurrentPage: (page: string) => void;
}

export default function Contacts({ setCurrentPage }: ContactsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const menuItems = [
    { name: "О НАС", page: "home" },
    { name: "АУДИО", page: "audio" },
    { name: "ВИДЕО", page: "video" },
    { name: "ГАЛЕРЕЯ", page: "gallery" },
    { name: "ТУРЫ", page: "tour-dates" },
    { name: "КОНТАКТЫ", page: "contacts", active: true },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
      setIsSubmitting(false);
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", message: "" });
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
              Свяжитесь <span className="text-white">с нами</span>
            </h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Мы всегда рады новым знакомствам и сотрудничеству
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaEnvelope className="text-purple-400" />
                  Форма обратной связи
                </h4>

                <AnimatePresence>
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-4 p-3 bg-green-600/20 border border-green-600 rounded-lg flex items-center gap-2 text-green-400"
                    >
                      <FaCheckCircle />
                      <span className="text-sm">Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</span>
                    </motion.div>
                  )}
                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded-lg flex items-center gap-2 text-red-400"
                    >
                      <FaTimesCircle />
                      <span className="text-sm">Пожалуйста, заполните все поля.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <FaUser className="inline mr-2 text-purple-400" />
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <FaEnvelope className="inline mr-2 text-purple-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <FaPaperPlane className="inline mr-2 text-purple-400" />
                      Сообщение
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      placeholder="Напишите ваше сообщение..."
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors font-semibold"
                    >
                      Очистить
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Отправка..." : "Отправить"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-400" />
                  Контактная информация
                </h4>

                <div className="mb-6 rounded-xl overflow-hidden border border-gray-700">
                  <iframe
                    title="Карта"
                    width="100%"
                    height="200"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://maps.google.com/maps?f=q&source=s_q&hl=ru&geocode=&q=Москва,+Кремль&aq=0&ie=UTF8&hq=&hnear=Москва,+Центральный+федеральный+округ&z=12&output=embed"
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Адрес</div>
                      <div className="text-gray-400 text-sm">
                        г. Москва,<br />
                        ул. Рок-н-ролла, д. 7<br />
                        БЦ "Rock Plaza", офис 707
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaPhone className="text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Телефон</div>
                      <div className="text-gray-400 text-sm">
                        +7 (495) XXX-XX-XX<br />
                        +7 (812) XXX-XX-XX
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Email</div>
                      <a href="mailto:info@rockband.ru" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                        info@rockband.ru
                      </a>
                      <br />
                      <a href="mailto:booking@rockband.ru" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                        booking@rockband.ru
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="text-white font-semibold mb-3">Мы в социальных сетях</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <FaTwitter size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <FaFacebook size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                      <FaYoutube size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl text-center border border-purple-500/30"
          >
            <h4 className="text-xl font-bold text-white mb-3">
              Сотрудничество и концерты
            </h4>
            <p className="text-gray-300 mb-3">
              По вопросам организации концертов, интервью и сотрудничества:
            </p>
            <a href="mailto:booking@rockband.ru" className="text-purple-400 hover:text-purple-300 font-semibold">
              booking@rockband.ru
            </a>
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