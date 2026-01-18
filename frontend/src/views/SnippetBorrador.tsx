import { useForm } from 'react-hook-form'
import { ErrorMessageComponent } from '../components/ErrorMessageComponent'


export const SnippetBorrador = () => {


    const { register, handleSubmit ,formState:{errors} } = useForm()

    const handler = () => {}

    return(

//            form.bg-white.px-5.py-20.rounded-lg.space-y-10.mt-10[onSubmit={()=>{}} noValidate={true}]>(div.grid.grid-cols-1.space-y-3>label.text-2xl.text-slate-500+input.bg-slate-100.border-none.p-3.rounded-lg.placeholder-slate-400[id=x type=x placeholder=x ]+{{errors.x && <ErrorMessageComponent></ErrorMessageComponent>}})*2


// (div.grid.grid-cols-1.space-y-3>label.text-1xl.text-slate-500+input.bg-slate-100.border-none.p-2.rounded-lg.placeholder-slate-400[id=x type=text placeholder=x])*5 */}


        <div>

            <form action="" className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10" onSubmit={()=>{}} noValidate={true}>
                <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-2xl text-slate-500"></label><input type="x" className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400" id="x" placeholder="x" />{errors.x && <ErrorMessageComponent>{'h'}</ErrorMessageComponent>}</div>
                <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-2xl text-slate-500"></label><input type="x" className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400" id="x" placeholder="x" />{errors.x && <ErrorMessageComponent>{'g'}</ErrorMessageComponent>}</div>
            </form>


            {/*

            <div className="w-full max-w-2xl mx-auto">
                <form action="" className="bg-white px-5 py-5 rounded-lg space-y-5 mt-2" onSubit={handleSubmit(handler)}>
                    <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-1xl text-slate-500"></label><input type="text" className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" id="x" placeholder="x" /></div>
                    <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-1xl text-slate-500"></label><input type="text" className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" id="x" placeholder="x" /></div>
                    <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-1xl text-slate-500"></label><input type="text" className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" id="x" placeholder="x" /></div>
                    <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-1xl text-slate-500"></label><input type="text" className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" id="x" placeholder="x" /></div>
                    <div className="grid grid-cols-1 space-y-3"><label htmlFor="" className="text-1xl text-slate-500"></label><input type="text" className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" id="x" placeholder="x" /></div>
                </form>
            </div>

            */}





        </div>

    )

}