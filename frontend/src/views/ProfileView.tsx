export default function ProfileView () {

    return (

        <div>

            <h3 className="text-2xl text-white font-bold">Edit Profile</h3>


            <div className="w-full max-w-2xl mx-auto" >

                <form
                    action=""
                    className="bg-white px-5 py-5 rounded-lg space-y-5 mt-2"
                    onSubmit={() => {}}
                >

                    <legend className="text-2xl text-slate-800 text-center">
                        Edit Profile Information
                    </legend>

                    <div className="grid grid-cols-1 gap-2   space-y-3 ">

                        <label htmlFor="">Handle Profile Alias</label>
                        <input
                            type="text"
                            className="border-none bg-slate-100 rounded-lg p-2  placeholder-slate-400 "
                            placeholder="handle profile alias or user name"
                        />
                    </div>

                    
                    <div className="grid grid-cols-1 gap-2">

                        <label htmlFor="">Description</label>
                        <textarea
                            name=""
                            id=""
                            className="border-none bg-slate-100 rounded-lg p-2  placeholder-slate-400"
                            placeholder="Your description"
                        ></textarea>
                    </div>


                    <div className="grid grid-cols-1 gap-2">

                        <label htmlFor="">Image</label>

                        <input
                            type="file"
                            className="border-none bg-slate-100 rounded-lg p-2  placeholder-slate-400"
                            id="image"
                            name="handle"
                            accept="image/*"
                            onChange={() => {}}
                        />

                    </div>


                    <input
                        type="text"
                        //className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                        className="bg-cyan-400 p-3 text-lg w-full text-slate-200 rounded-lg font-bold cursor-pointer"
                        value="Save changes"
                    />


                </form>

            </div>
            <br/>
        </div>
        
    )

}