import ThankYouIcon from "@/assets/icon-thank-you.svg"

export function Complete() {
    return (
        <div className='complete'>
            <img src={ThankYouIcon} alt="Check mark icon" />

            <h2>Thank you!</h2>

            <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    )
}