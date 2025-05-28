import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/button';

const CommunitySection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bergabung dengan Komunitas Basket Indonesia</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Diskusikan pertandingan terbaru, berbagi pendapat, dan terhubung dengan sesama penggemar basket di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Diskusi */}
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Forum Diskusi</h3>
            <p className="text-gray-400 mb-4">
              Bergabunglah dalam diskusi tentang pertandingan terbaru, transfer pemain, dan berita basket terkini.
            </p>
            <Button
              to="/community/forum"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Masuk Forum
            </Button>
          </div>

          {/* Artikel */}
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Tulis Artikel</h3>
            <p className="text-gray-400 mb-4">
              Bagikan analisis dan pandangan Anda tentang dunia basket dengan menulis artikel Anda sendiri.
            </p>
            <Button
              to="/community/write"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Mulai Menulis
            </Button>
          </div>

          {/* Event */}
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Event Basket</h3>
            <p className="text-gray-400 mb-4">
              Temukan informasi tentang turnamen, pertandingan, dan acara basket di sekitar Anda.
            </p>
            <Button
              to="/community/events"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Lihat Event
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-6">Bergabung Sekarang</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/register"
              variant="primary"
              size="lg"
            >
              Daftar Akun
            </Button>
            <Button
              to="/community"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Jelajahi Komunitas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
