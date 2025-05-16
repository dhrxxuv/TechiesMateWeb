export const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-base-300 text-gray-700 py-2 px-4 text-center shadow-md border-t border-gray-200">
      <p className="text-xs sm:text-sm">
        Copyright © {new Date().getFullYear()} - All rights reserved by open source
      </p>
    </footer>
  );
};