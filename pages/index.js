import Head from 'next/head'
import { Roboto } from 'next/font/google'
import { useState } from 'react'
import { sendContactForm } from '../lib/api'

const roboto = Roboto({
  weight: ["400"],
  subsets: ['latin']
})
const initValues = { email: "", message: "" }
const initState = { isLoading: false, error: "", values: initValues }

export default function Home() {

  const [state, setState] = useState(initState)
  const [touched, setTouched] = useState({})


  const handleChange = ({ target }) => {
    setState((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [target.name]: target.value
        }
      }
    })
  }

  // without "touched", inputs would have red border onload
  const handleBlur = ({ target }) => {
    setTouched((prevState) => {
      return {
        ...prevState,
        [target.name]: true
      }
    })
  }

  async function onSubmit(e) {

    e.preventDefault()

    console.log("button clicked");

    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })

    try {
      await sendContactForm(state.values)

      // Clearing out data
      setState(initState)
      setTouched({})

      // Do something...:
      alert("Thank you! Message sent!")

    } catch (error) {
      console.log(error.message);
      setState((prevState) => {
        return {
          ...prevState,
          error: error.message
        }
      })
    }
  }

  return (
    <>
      <Head>
        <title>Nodemailer Form</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`container ${roboto.className}`}>
        <h1>Nodemailer Form</h1>

        <form className='form'>
          <div className="form-email">
            <label htmlFor="email">Your Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={state.values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${(!state.values.email && touched.email) ? "error" : ""}`}
            />
          </div>

          <div className="form-message">
            <label htmlFor="message">Your Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={state.values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${(!state.values.message && touched.email) ? "error" : ""}`}
            />
          </div>


          <button onClick={onSubmit} disabled={(!state.values.message || !state.values.email) ? true : false}>Send</button>
        </form>
      </main>
    </>
  )
}
