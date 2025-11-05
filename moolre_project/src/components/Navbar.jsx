export default function Navbar() {

  function handleScroll(sectionId){
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 px-12 bg-white py-4 z-50">
      <nav className="flex items-center justify-between">
          <img
            src="https://moolre.com/assets/svgs/MainPage-Section.svg"
            alt="Moolre logo"
            className="h-8 w-auto"
          />

        <button
          onClick={() => handleScroll("transact")}
          className="mt-4 cursor-pointer rounded-lg outline-0 border-0 px-4 py-2 bg-blue-900 text-white font-semibold hover:bg-blue-800 hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"        >
          Make a transaction
        </button>
      </nav>
    </header>
  );
}
