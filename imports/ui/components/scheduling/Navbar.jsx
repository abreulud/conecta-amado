import React from 'react';

export const Navbar = ({ username = 'Usuário', avatarSrc = '/avatar.png' }) => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="h-6" />

      {/* User Info */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          Olá, {username}!
        </span>
        <img src={avatarSrc} alt="Avatar" className="w-9 h-9 rounded-full" />
      </div>
    </nav>
  );
};
