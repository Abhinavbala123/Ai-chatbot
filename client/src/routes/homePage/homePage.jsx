import { Link, Links } from 'react-router-dom'
import './homePage.css'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'

const HomePage = () => {
  // const test = async()=>{
  //   try {
  //     const res = await fetch("http://localhost:3000/api/test", {
  //       credentials: "include", // Good — this allows sending cookies
  //     });
  
  //     if (res.ok) {
  //       const text = await res.text();
  //     } else {
  //       alert("❌ Unauthenticated: " + res.status);
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //     alert("❌ Network error");
  //   }
  // }
  const [typingStatus, setTypingStatus] = useState("human1")
  return (
    <div className='homePage'>
      <img src="/orbital.png" alt="" className="orbital" />
      <div className='Left'>
        <h1>CHATBOT</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>  Ask anything, anytime. Your personal AI companion is here to help you write, code, learn, and explore—faster than ever before.</h3>
        <Link className="firstlink" to="/dashboard">Get Started</Link>
        {/* <button onClick={test}>TEST AUTH</button> */}
      </div>
      <div className='Right'>
        <div className='imgcontainer'>
          <div className='bgcontainer'>
            <div className='bg'></div>
          </div>
          <img src='/bot.png' alt='' className='bot' />
          <div className="chat">
            <img src={typingStatus === "human1" ? '/human1.jpeg' : typingStatus === "human2" ? '/human2.jpeg' : 'bot.png'} alt="" />
            <TypeAnimation
              sequence={[
                'Human1:We produce food for Mice',
                2000, () => {
                  setTypingStatus("bot")
                },
                'Bot: produce food for Hamsters',
                2000, () => {
                  setTypingStatus("human2")
                },
                'Human2: produce food for Guinea Pigs',
                2000, () => {
                  setTypingStatus("bot")
                },
                'Bot: produce food for Chinchillas',
                2000, () => {
                  setTypingStatus("human1")
                }
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src= "/logo.png"alt=""/>
        <div className="linkst">
          <Link to="/">Terms Of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage