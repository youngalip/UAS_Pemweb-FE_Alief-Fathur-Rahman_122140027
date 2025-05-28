// src/components/home/FeaturedTeams.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedTeams = () => {
  // Sample IBL teams data
  const iblTeams = [
    { id: 1, name: 'Pelita Jaya Bakrie', logo: '/assets/images/teams/pelita-jaya.png', slug: 'pelita-jaya' },
    { id: 2, name: 'Satria Muda Pertamina', logo: '/assets/images/teams/satria-muda.png', slug: 'satria-muda' },
    { id: 3, name: 'Bima Perkasa Jogja', logo: '/assets/images/teams/bima-perkasa.png', slug: 'bima-perkasa' },
    { id: 4, name: 'Prawira Bandung', logo: '/assets/images/teams/prawira-bandung.png', slug: 'prawira-bandung' },
    { id: 5, name: 'NSH Mountain Gold', logo: '/assets/images/teams/nsh-mountain.png', slug: 'nsh-mountain' },
    { id: 6, name: 'Amartha Hangtuah', logo: '/assets/images/teams/amartha-hangtuah.png', slug: 'amartha-hangtuah' },
    { id: 7, name: 'Bali United Basketball', logo: '/assets/images/teams/bali-united.png', slug: 'bali-united' },
    { id: 8, name: 'Dewa United Surabaya', logo: '/assets/images/teams/dewa-united.png', slug: 'dewa-united' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim IBL</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ikuti berita terbaru dari tim-tim favorit Anda di Indonesian Basketball League.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {iblTeams.map(team => (
            <Link 
              key={team.id} 
              to={`/teams/${team.slug}`}
              className="flex flex-col items-center group"
            >
              <div className="bg-white rounded-full p-3 shadow-md mb-3 transition-transform duration-300 group-hover:scale-110">
                {/* Gunakan gambar lokal atau fallback jika URL tidak bisa diakses */}
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${team.logo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Fallback jika gambar gagal dimuat */}
                  <span className="text-gray-500 text-xs opacity-0">{team.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-sm text-center font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                {team.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/teams" 
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            Lihat Semua Tim
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeams;
