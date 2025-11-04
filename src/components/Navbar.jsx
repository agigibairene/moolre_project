export default function Navbar() {
  return (
    <header className="sticky top-0 px-6 py-4 z-50">
      <nav className="flex items-center justify-between">
          <img
            src="https://moolre.com/assets/svgs/MainPage-Section.svg"
            alt="Moolre logo"
            className="h-8 w-auto"
          />

        <button
          className="rounded-lg cursor-pointer outline-0 border-0 px-2 py-2 bg-[#fcba37] transition-colors"
        >
          Make a transaction
        </button>
      </nav>
    </header>
  );
}
