import IconArrow from "./assets/icon-arrow.svg"
import { useForm } from 'react-hook-form'
import { useState } from "react"

export default function App() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [results, setResults] = useState({
    year: "",
    month: "",
    day: ""
  })

  const [invalidDateMsg, setInvalidDateMsg] = useState(null)
  const [futureDateMsg, setFutureDateMsg] = useState(null)

  //check if valid date
  function dateIsValid(year, month, day) {
    let d = new Date(`${year}-${month}-${day}`)
    return d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() == day ? true : false
  }

  //check if date is greater than today's date
  function dateIsFuture(year, month, day) {
    const currentDate = new Date(Date.now())
    return new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`).getTime() <
      new Date(`${year}-${month}-${day}`).getTime()
  }

  function validateDate(year, month, day) {
    !dateIsValid(year, month, day) 
    ? setInvalidDateMsg("Must be a valid date") 
    : setInvalidDateMsg(null)

    dateIsFuture(year, month, day)
    ? setFutureDateMsg("Cannot be a future date")
    : setFutureDateMsg(null)
  }

  function computeAge(year, month, day) {
    let num_years = (new Date(Date.now()) - Date.parse(`${year}-${month}-${day}`)) / 31536000000
    let num_months = ((new Date(Date.now()) - Date.parse(`${year}-${month}-${day}`)) % 31536000000) / 2628000000
    let num_days = (((new Date(Date.now()) - Date.parse(`${year}-${month}-${day}`)) % 31536000000) % 2628000000) / 86400000

    setResults(
      {
        year: Math.floor(num_years), 
        month: Math.floor(num_months),
        day: Math.floor(num_days)
      })
      reset()
  }

  return (
    <main>

      <div className="form-container">
          <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit((data) => {
            let year = parseInt(data.year), month = parseInt(data.month), day = parseInt(data.day)
            
            validateDate(year, month, day)

            if (dateIsValid(year, month, day) && !dateIsFuture(year, month, day)) {
              computeAge(year, month, day)
            }
            
          })
          }>

            <div className="input-container">
              <label htmlFor="day" className={errors.day || invalidDateMsg ? "validation-error-color" : ""}>Day</label>
              <input 
              id="day"
              name="day"
              type="number"
              className={errors.day || invalidDateMsg ? "validation-error-border" : ""} 
              placeholder="Day" {...register("day", 
              {
              required: {
                  value: true,
                  message: "This field is required"
              }, 
              max: {
                  value: 31,
                  message: "Must be valid day"
              }, 
              min: {
                  value: 1,
                  message: "Must be valid day"
              }
              })}
              />
              {errors.day && <p className="validation-error-color error-message">{errors.day.message}</p>}

              {/* condition is applied to avoid elements overlapping since they're positioned absolute */}
              {errors.day ? "" : invalidDateMsg && <p className="validation-error-color error-message">{invalidDateMsg}</p>} 
              {errors.day ? "" : futureDateMsg && <p className="validation-error-color error-message">{futureDateMsg}</p>}
            </div>

            <div className="input-container">
               <label htmlFor="month" className={errors.month || invalidDateMsg ? "validation-error-color" : ""}>Month</label>
               <input 
               id="month" 
               name="month"
               type="number"
               className={errors.month || invalidDateMsg ? "validation-error-border" : ""}
               placeholder="MM" {...register("month", 
               {
               required: {
                   value: true,
                   message: "This field is required"
               }, 
               max: {
                   value: 12,
                   message: "Must be valid month"
               }, 
               min: {
                   value: 1,
                   message: "Must be valid month"
               }
               })}
              />
              {errors.month && <p className="validation-error-color error-message">{errors.month.message}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="year" className={errors.year || invalidDateMsg ? "validation-error-color" : ""}>Year</label>
              <input 
              id="year"
              name="year"
              type="number"
              className={errors.year || invalidDateMsg ? "validation-error-border" : ""}
              placeholder="YYYY" {...register("year", 
              {
              required: {
                  value: true,
                  message: "This field is required"
              }, 
              max: {
                  value: new Date().getFullYear(),
                  message: "Must be in the past"
              }, 
              min: {
                  value: 1100,
                  message: "Must be valid year"
              }
              })}
              />
              {errors.year && <p className="validation-error-color error-message">{errors.year.message}</p>}
            </div>

            <button><img src={IconArrow} alt="Arrow button pointing downward" /></button>
          </form>

          <div className="output-container">
               <h2><span>{results.year ? results.year : "--"}</span> years</h2>
               <h2><span>{results.month ? results.month : "--"}</span> months</h2>
               <h2><span>{results.day ? results.day : "--"}</span> days</h2>
            </div>
      </div>
             
    </main>
  )
}
