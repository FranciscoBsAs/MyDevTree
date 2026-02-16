import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView () {

    return(
    
        <div>
            
            <Header/>

            <main className="bg-green-50 py-1 min-h-screen 
                            lg:bg-homeView-style-devTree bg-no-repeat bg-right-top bg-homeView-xl"
            >

{/* div.max-w-5xl.mx-auto.mt-10>(div.lg:w-1/2.px-10.lg:p-0.space-y-6>h1.text-6xl.font-black>({All yours }span.text-cyan-400>{Social Networks })+{in one enlace})
*/}
                <div className="max-w-5xl mx-auto mt-10">

                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">

                        <h1 className="text-6xl font-black">All yours <span className="text-cyan-400">Social Networks </span>in one link</h1>

                        <p className="text-slate-800 text-xl">
                            Join multiples developers and content creators sharing their social networks—share your profile from Facebook, Instagram, YouTube, GitHub, and more
                        </p>


                        <SearchForm/>

                    </div>

                </div>
            </main>

        </div>
    
    )
}