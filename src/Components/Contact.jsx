import React, { useContext, useState } from 'react'
import '../Style/contact.css';
import axios from 'axios';
import { SnackBarContext } from '../ContextAPI/SnackBar';
import { BASEURL } from '../Utility/Config';

function ContactDetails() {
  return (
    <>
      <div className='contant-info-section'>
        <h2>
          Lets get in touch
        </h2>
        <div>
          we are open for any suggestions or queries
        </div>
        <div className='contact-links'>
          <div>
            <i class="bi bi-geo-alt-fill"></i>
            <span>
              Address: NIT Delhi, Bakoli, New Delhi
            </span>
          </div>
          <div>
            <i class="bi bi-telephone-fill"></i>
            <span>
              Phone: +91-810234234
            </span>
          </div>
          <div>
            <i class="bi bi-envelope-check-fill"></i>
            <span>
              Email: abc@gmail.com
            </span>
          </div>
          <div>
            <i class="bi bi-globe-central-south-asia"></i>
            <span>
              Website: abc.xzy.com
            </span>
          </div>
        </div>

      </div>
    </>
  )
}

function ContactForm() {
  const {ActiveSnackBar} = useContext(SnackBarContext);
  const [formObj, setFormObj] = useState({ fullName: '', emailAddress: '', subject: '', message: '' });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASEURL + '/contactus', formObj);
      if(response.data.success)
      {
        ActiveSnackBar(response.data.ServerMsg, 'success')
        setFormObj({ fullName: '', emailAddress: '', subject: '', message: '' });
      }
      else
      {
        ActiveSnackBar(response.data.ServerMsg, 'error')
      }
    }
    catch (err) {
      ActiveSnackBar('Unknown error', 'error')
    }
  }
  return (
    <>
      <div className='contact-form-section'>
        <h2>
          Get in touch
        </h2>
        <form className='form-section' onSubmit={submitForm}>
          <div className='row'>
            <div className='col-12 col-md-6' style={{ padding: 0 }}>
              <label htmlFor='fullname'><strong>Full Name</strong></label>
              <br></br>
              <input
                required
                id='fullname'
                value={formObj.fullName}
                onChange={(e) => setFormObj({ ...formObj, ['fullName']: e.target.value })}
                placeholder='Full name'
                type='text'>
              </input>
            </div>
            <div className='col-12 col-md-6' style={{ padding: 0 }}>
              <label htmlFor='emailaddress'><strong>Email Address</strong></label>
              <br></br>
              <input
                required
                id='emailaddress'
                value={formObj.emailAddress}
                placeholder='Email address'
                type='email'
                onChange={(e) => setFormObj({ ...formObj, ['emailAddress']: e.target.value })}>
              </input>
            </div>
          </div>
          <div>
            <label htmlFor='subject'>
              <strong>Subject</strong>
            </label>
            <br></br>
            <input
              required
              id='subject'
              value={formObj.subject}
              placeholder='Subject'
              type='text'
              onChange={(e) => setFormObj({ ...formObj, ['subject']: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor='message'>
              <strong>Message</strong>
            </label>
            <br></br>
            <textarea
              rows='3'
              required
              value={formObj.message}
              id='message'
              placeholder='Message'
              onChange={(e) => setFormObj({ ...formObj, ['message']: e.target.value })}></textarea>
          </div>
          <div>
            <button>Send Message</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default function Contact() {
  return (
    <div className='my-5 row'>
      <div className='col-11 col-md-10 col-lg-8  mx-auto'>
        <div className='row' style={{ boxShadow: '#00000027 3px 3px 5px' }}>
          <div className='col-12 col-md-5 text-white px-3 py-5' style={{ backgroundColor: 'rgb(44 129 151)' }}>
            <ContactDetails />
          </div>
          <div className='col-12 col-md-7 px-3 py-5'>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
