import homeImg from "../assets/home_img.png";

export default function HomePage() {
  function handleScroll(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="bg-bgColor w-full">
      <div className="px-6 sm:px-10 md:px-12 pt-12 pb-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          <div className="font-Outfit w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">
              <span className="text-blue-900 font-bold block">
                Scale Faster with Our Developer-First Payment APIs
              </span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-900 max-w-lg mx-auto lg:mx-0">
              From simple transfers to advanced transaction systems — our APIs
              grow with your business.
            </p>

            <button
              onClick={() => handleScroll("send_sms")}
              className="mt-6 rounded-lg px-5 py-2.5 bg-blue-900 text-white font-semibold hover:bg-blue-800 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
            >
              Send an SMS
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={homeImg}
              alt="man holding phone"
              className="h-64 sm:h-80 md:h-[420px] lg:h-[480px] w-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
