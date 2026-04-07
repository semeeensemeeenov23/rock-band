import { useState } from 'react';
import Home from './pages/Home';
import Audio from './pages/Audio';
import Video from './pages/Video';
import Gallery from './pages/Gallery';
import TourDates from './pages/TourDates';
import Contacts from './pages/Contacts';
import FloatingGif from './components/FloatingGif';

function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'audio':
        return <Audio setCurrentPage={setCurrentPage} />;
      case 'video':
        return <Video setCurrentPage={setCurrentPage} setIsVideoPlaying={setIsVideoPlaying} />;
      case 'gallery':
        return <Gallery setCurrentPage={setCurrentPage} />;
      case 'tour-dates':
        return <TourDates setCurrentPage={setCurrentPage} />;
      case 'contacts':
        return <Contacts setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <FloatingGif isVideoPlaying={isVideoPlaying} />
      {renderPage()}
    </>
  );
}

export default App;