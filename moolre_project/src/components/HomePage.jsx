import homeImg from "../assets/home_img.png";

export default function HomePage() {
    
    function handleScroll(sectionId){
        const section = document.getElementById(sectionId);
        if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <section className="bg-bgColor max-h-full">
            <div className="px-8 md:px-12 pt-12 pb-8">

                <div className="hidden md:flex gap-8 items-center">
                    <div className="font-Outfit w-1/2">
                        <h1 
                          className="text-white text-3xl"
                        >
                         <span className="text-blue-900 font-bold text-3xl">Scale Faster with Our Developer-First Payment APIs</span>
                        </h1>
                        <p className="mt-1 text-lg">
                            From simple transfers to advanced transactions systems — our APIs grow with your business.
                        </p>

                        <button
                           onClick={() => handleScroll("send_sms")}
                           className="mt-6 cursor-pointer rounded-lg outline-0 border-0 px-4 py-2 bg-blue-900 text-white font-semibold hover:bg-blue-800 hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                        Send an SMS
                        </button>
                       
                    </div>

                    <div className="w-1/2">
                        <img 
                            src={homeImg}
                            alt="man holding phone"
                            className="h-[480px] w-full object-contain rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}