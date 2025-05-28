import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/button';

const ProfileHeader = ({ profile, isOwnProfile, isFollowing, onFollow, onUnfollow, onEditProfile }) => {
  if (!profile) return null;

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={profile.avatarUrl || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
            <p className="text-primary-light">@{profile.username}</p>
            <p className="text-white mt-2">{profile.bio}</p>
            <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
              <div className="text-white">
                <span className="font-bold">{profile.articlesCount}</span> Artikel
              </div>
              <Link to={`/profile/${profile.username}/followers`} className="text-white hover:underline">
                <span className="font-bold">{profile.followersCount}</span> Pengikut
              </Link>
              <Link to={`/profile/${profile.username}/following`} className="text-white hover:underline">
                <span className="font-bold">{profile.followingCount}</span> Mengikuti
              </Link>
            </div>
          </div>
          <div className="md:ml-auto">
            {isOwnProfile ? (
              <Button
                onClick={onEditProfile}
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Edit Profil
              </Button>
            ) : (
              <Button
                onClick={isFollowing ? onUnfollow : onFollow}
                variant={isFollowing ? 'secondary' : 'primary'}
                className={isFollowing ? 'bg-white text-primary hover:bg-gray-100' : 'bg-white text-primary hover:bg-gray-100'}
              >
                {isFollowing ? 'Berhenti Mengikuti' : 'Ikuti'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
