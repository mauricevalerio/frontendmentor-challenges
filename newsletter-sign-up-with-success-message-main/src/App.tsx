import IconList from "./assets/icon-list.svg"
import IllustrationMobile from "./assets/illustration-sign-up-mobile.svg"
import DataText from "./data.json"
import Form from "./components/Form"
import Success from "./components/Success"
import { useState, useEffect } from "react"
import IllustrationDesktop from "./assets/illustration-sign-up-desktop.svg"

export default function App() {

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

  const handleEmailChange = (e: any): void => setEmail(e.target.value)

  const toggleHasSubmitted = (): void => setHasSubmitted(prevState => !prevState)

  const clearEmail = (): void => setEmail("")

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    if (email !== "" && email.match("^(.+)@(.+)$")) {
      toggleHasSubmitted()
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  const checkListElements = DataText.map((text: string, index: number) => <li key={index} className="flex items-start gap-4">
    <img src={IconList} alt="Newsletter checklist" />
    <p>{text}</p>
  </li>
  )

  useEffect(() => {
    const screenWidthChange = (): void => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", screenWidthChange)

    return (): void => {
      window.removeEventListener("resize", screenWidthChange)
    }
  }, [screenWidth])

  return (
    <div className="md:bg-[#242742] md:h-screen md:flex md:justify-center md:items-center md:p-4">
      <div className="md:bg-white md:p-4 md:rounded-3xl md:w-fit">
        {!hasSubmitted ?
          <div className="md:flex md:gap-6 md:items-center">

            <img src={screenWidth > 768 ? IllustrationDesktop : IllustrationMobile}
              alt="Header Illustration Design"
              className="w-full md:order-1 md:w-fit" />

            <main className="px-8 py-6 md:py-0">
              <h1 className="text-[2.65rem] font-bold text-[#27293F]">Stay updated!</h1>

              <div className="text-[#36384E] font-medium max-w-[95%]">
                <p className="my-5">Join 60,000+ product managers receiving monthly updates on:</p>

                <ul className="flex flex-col gap-2">
                  {checkListElements}
                </ul>
              </div>

              <Form
                email={email}
                handleEmailChange={handleEmailChange}
                handleSubmit={handleSubmit}
                isError={isError}
              />
            </main>

          </div>
          :
          <Success
            email={email}
            clearEmail={clearEmail}
            toggleHasSubmitted={toggleHasSubmitted}
          />
        }
      </div>
    </div>
  )
}
