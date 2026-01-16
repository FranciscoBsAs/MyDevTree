import { Link, Outlet } from "react-router-dom" ;

import { Toaster } from "react-hot-toast";
import NavigationTabs from "../components/NavigationTabs";


export default function AppLayout () {

    return(


        //div>((header.bg-slate-800.py-5>div.mx-auto.max-w-5xl.flex.flex-col.md:flex-row.items-center.md:justify-between>(div.w-full.p-5.lg:p-0.md:w-1/3>img.w-full.block[src=/myDevTree_Logo.jph])+div.md:w-1/3.md:flex.md:justify-end>button.bg-lime-500.p-2.text-slate-800.uppercase.front-black.text-xs.rounded-lg.cursor-pointer[onClick={{}}])+div.bg-gray-100.min-h-screen.py-10>main.mx-auto.max-w-5xl.p-10.md:p-0)+div.flex.justify-end


        // Real Emmet snippet:
            //div>(header.bg-slate-800.py-5>div.mx-auto.max-w-5xl.flex.flex-cols.md:flex-row.items-center.md:justify-between>(div.w-full.p-5.lg:p-0.md:w-1/3>img.w-full.blocl[src=/myDevTree_Logo.jpg])+(div.md:w-1/3.md:flex.md:justify-end>(button.bg-line-500.p-2.text-slate-800.uppercase.front-black.text-xs.rounded-lg.cursor-pointer[onClick={}]>{LogOut})))+(div.bg-gray-100.min-h-screen.py-10>main.mx-auto.max-w-5xl.p-10.md:p-0>div.flex.justify-end>Link.font-bold.text-right.text-slate-800.text-2xl[to={''} target="_blank" rel="noreferrer noopener"]>{Visit my Profile})+((div.flex.flex-col.md:flex-row.gap-10.mt-10>div.flex-1>Outlet)+div.w-full.md:w-96.bg-slate-800.px-5.py-10.space-y-6)+Toaster[position="top-right"]





        <div className="bg-slate-700 min-h-screen" >

            <Toaster position="top-right"/>


            <header className="bg-slate-800 py-5">

                {/*<div className="mx-auto max-w-5xl flex flex-cols md:flex-row items-center md:justify-between">*/}

                <div className=" bg-slate-800 h-16 flex items-center" >

                    <div className="max-w-7x1 mx-auto px-5 h-full flex items-center justify-between gap-4">
                        <img src="/myDevTree_Logo.jpg" alt="" className="h-14" />
                        <h1 className='text-white' >Your DevTree website</h1>
                    </div>

                    <div className="md:flex pr-5 ">
                        <button className="bg-sky-300 p-3 text-lg w-full text-slate-900 rounded-lg font-bold cursor-pointer" onClick={ ()=>{} }>
                            Log Out
                        </button>
                    </div>
                
                </div>
            </header>


            <div className="bg-gray-100 py-3">

                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs/>

                    <div className="flex justify-end">
                        <Link className="font-bold text-right text-slate-800 text-2xl" to={''} target="_blank" rel="noreferrer noopener">
                            Visit my Profile
                        </Link>
                    </div>

                </main>

            </div>


            <div className="flex flex-col md:flex-row gap-10 mt-10">

                <div className="flex-1">
                    <Outlet/>
                </div>

            </div>

            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">

            </div>
            



        </div>


    )

}