type FormType = {
    email: string,
    handleEmailChange: (e: any) => void,
    handleSubmit: (e: any) => void,
    isError: boolean,
}

export default function Form({ email, handleEmailChange, handleSubmit, isError }: FormType) {

    return (
        <form
            autoComplete="off"
            noValidate
            className="flex flex-col gap-2 mt-6"
            onSubmit={handleSubmit}
        >
            <div className="flex justify-between">
                <label htmlFor="email" className="font-bold text-xs">Email Address</label>
                {isError && <span className="text-xs text-red-500">Valid email required</span>}
            </div>

            <input
                type="email"
                placeholder="email@company.com"
                required
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className=
                {`border-2 border-solid border-[#9294A0] 
                focus:outline-none
                p-4 rounded-lg ${isError ? "focus:invalid:border-red-500 bg-red-100 text-red-500" : ""}
                `} />

            <button
                className="bg-[#242742] text-white p-4 rounded-lg mt-4 ease-in duration-300 hover:bg-[#FF6257]">
                Subscribe to monthly newsletter
            </button>
        </form>
    )
}