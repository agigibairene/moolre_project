export default function Navbar() {
  function handleScroll(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 bg-white z-50">
      <nav className="flex items-center justify-between px-6 sm:px-10 md:px-12 py-4">
        <img
          src="https://moolre.com/assets/svgs/MainPage-Section.svg"
          alt="Moolre logo"
          className="h-8 sm:h-9 md:h-10 w-auto"
        />

        <button
          onClick={() => handleScroll("transact")}
          className="rounded-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-blue-900 text-white text-sm sm:text-base font-medium hover:bg-blue-800 hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Transaction
        </button>
      </nav>
    </header>
  );
}
