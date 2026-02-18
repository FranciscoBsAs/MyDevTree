import { BookmarkSquareIcon, UserIcon } from "@heroicons/react/16/solid";

import { Link, useLocation, useNavigate, type NavigateFunction } from 'react-router-dom' ;

import { toastService } from "../sharedFrontContent/alertToasts/ToastService";
import { thePathsRoutes } from "../routes/PathsRoutes";

const tabs = [
    {
        name: 'Links', href:thePathsRoutes.homeAdmin, icon: BookmarkSquareIcon
    },
    {
        name: 'My Profile', href: thePathsRoutes.profile, icon: UserIcon
    }
]


const classNames = ( ...classes : string[] ) : string => classes.filter( Boolean ).join(' ') ;


export default function NavigationTabs () {

    
    const location = useLocation() ;

    const handleNavigate : NavigateFunction = useNavigate() ;


    const handleChange = ( e : React.ChangeEvent<HTMLSelectElement> ) => {

        toastService.info("Already in:  "+e.target.value) ;

        handleNavigate( e.target.value );

    }


    return (
        
        <div className="mx-auto lg:py-2  px-5  lg:px-5 md:px-6">


            <div className="sm:hidden">

                <label htmlFor="" className="sr-only">
                    Select a tab
                </label>

                <select
                    name="tabs"
                    id="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm md:text-base"
                    onChange={ handleChange }
                >
                    {tabs.map( (tab) => (
                        <option value={tab.href} key={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>


            </div>


            <div className="hidden sm:block">

                <div className="border-b-2 py-0 border-slate-700">

                    <nav className="flex -mb-px space-x-8" aria-label="Tabs">

                        {tabs.map( (tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={
                                    classNames(
                                        location.pathname === tab.href
                                                            ? 'border-blue-500'
                                                            :  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        ,
                                        'group inline-flex items-center border-b-2 py-2 px-1 text-xl md:py-2 md:px-2 lg:py-2 md:text-lg lg:text-xl '
                                    )
                                }
                            >
                                <tab.icon
                                    className={
                                        classNames(
                                            location.pathname === tab.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                            ,
                                            '-ml-0.5 mr-2 h-5 w-5'
                                        )
                                    }
                                    aria-hidden='true'
                                />
                                <span>{tab.name}</span>
                            </Link>

                        ) )}

                    </nav>
                    
                </div>

            </div>


        </div>
    );

}
