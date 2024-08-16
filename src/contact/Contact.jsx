import React,{useEffect} from 'react';
import './Contact.css'

const Contact = () => {

  useEffect(()=>{
    document.title = 'contact-us'
      },[])

  return (
    <div id='contact-div' className='text-center  text-warning '>
      <div className='mt-5'>
        <h3>Hello, user<br/>Facing any issues with our website</h3>
        <h3>Reach us :<a href='https://mail.google.com/mail/u/0/#inbox' target='_blank'>trendyservices@gmail.com</a> </h3>
        <p>or</p>
        <h3>Contact us : <a href=''>01111-2334</a></h3>
        <h3> want to know more  check our <a href=''>Instagram</a> or <a href=''>X(twitter)</a> or <a href=''>LinkedIn</a></h3>
      </div>
    </div>
  )
}

export default Contact
