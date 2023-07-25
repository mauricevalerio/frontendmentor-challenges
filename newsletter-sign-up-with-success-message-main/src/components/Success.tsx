import IconSuccess from "../assets/icon-success.svg"

export default function Success(props: { email: string, clearEmail: () => void, toggleHasSubmitted: () => void }) {

    const handleDismiss = (): void => {
        props.clearEmail()
        props.toggleHasSubmitted()
    }

    return (
        <div className="flex flex-col justify-center md:items-start px-4 h-screen md:h-fit md:w-96">
            <div className="flex flex-col items-start justify-center gap-6 grow md:grow-0">
                <img src={IconSuccess} alt="Check mark with tomato color background" />
                <h1 className="text-5xl font-bold md:text-4xl">Thanks for subscribing!</h1>

                <p>A confirmation email has been sent to <span className="font-bold">{props.email}</span>. Please open it and click the button inside to confirm your subscription.</p>
            </div>
            <button
                onClick={handleDismiss}
                className="bg-[#242742] text-white p-4 rounded-lg w-full mb-4 md:mt-4 ease-in duration-300 hover:bg-[#FF6257]">Dismiss message</button>
        </div>
    )
}