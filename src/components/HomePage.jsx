import homeImg from "../assets/home_img.png";

export default function HomePage() {

    return (
        <section className="bg-bgColor max-h-full">
            <div className="px-8 md:px-12 pt-12 pb-8">

                <div className="hidden md:flex gap-8 items-center">
                    <div className="font-Outfit w-1/2">
                        <h1 
                          className="text-white text-3xl"
                        >
                         <span className="text-blue-900 font-semibold text-3xl">Scale Faster with Our Developer-First Payment APIs</span>
                        </h1>
                        <p className="mt-1 text-lg">
                            From simple transfers to advanced disbursement systems — our APIs grow with your business.
                        </p>

                        <button className="mt-4 cursor-pointer rounded-lg outline-0 border-0 px-2 py-2 bg-[#fcba37] transition-colors">Send an SMS</button>
                       
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