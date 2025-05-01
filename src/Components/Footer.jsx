import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-base-300 text-base-content p-4 text-center shadow">
      <p>
        Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd
      </p>
    </footer>
  );
};
