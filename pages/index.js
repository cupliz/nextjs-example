// import styles from '../styles/Home.module.css'
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";

export default function Home() {
  const loginGoogle = () => {
    console.log('login google')
  }
  const loginFacebook = () => {
    console.log('login facebook')
  }
  return (
    <main className="h-screen flex flex-col justify-between">
      <section class="content mb-10">
        <header class="bg-blue-600 text-white">
          <div className="container mx-auto p-5 text-2xl font-bold">STRBookingPortal</div>
        </header>
        <section className="container mx-auto p-5 md:pt-10 grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 text-white space-y-10 md:pr-40">
            <div className="text-2xl leading-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            <div className="text-lg leading-8">
              All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary
            </div>
            <div className="text-lg leading-8">
              There are many variations of passages of Lorem Ipsum:
              <ul className="list-disc pl-5">
                <li>The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet</li>
                <li>The standard chunk of Lorem Ipsum used since the 1500s</li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 card drop-shadow-lg bg-white rounded p-4 md:p-10 mt-10 md:mt-0 space-y-5 border border-gray-200">
            <form className="space-y-5">
              <div className="text-gray-500 text-center text-lg tracking-wide">
                Start with a free <b>60 days</b> trial<br />
                of STRBookingPortal
              </div>
              <input type="text" className="bg-gray-100 border-0 rounded w-full" placeholder="First Name *" />
              <input type="text" className="bg-gray-100 border-0 rounded w-full" placeholder="Last Name *" />
              <input type="text" className="bg-gray-100 border-0 rounded w-full" placeholder="Phone Number *" />
              <input type="text" className="bg-gray-100 border-0 rounded w-full" placeholder="Business Email *" />
              <button className="w-full bg-blue-600 rounded-lg py-3 text-white">Submit</button>
            </form>
            <button className="w-full bg-red-500 rounded-lg py-3 text-white flex items-center justify-center" onClick={loginGoogle}><IoLogoGoogle /> &nbsp; Google</button>
            <button className="w-full bg-blue-800 rounded-lg py-3 text-white flex items-center justify-center" onClick={loginFacebook}><IoLogoFacebook /> &nbsp; Facebook</button>
          </div>
        </section>
      </section>
      <footer className="bg-slate-700 w-full">
        <div className="md:h-14 container mx-auto text-white p-5 md:flex items-center justify-between">
          <h1 className="font-bold">STRBookingPortal</h1>
          <span>Copyrght STR Booking Portal @2022 | <a className="underline" href="#"> Privacy Policy</a> | <a className="underline" href="#"> Term of Services</a></span>
        </div>
      </footer>
    </main>
  )
}
