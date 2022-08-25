import React from 'react'
import "./Contact.css"
import emailjs from "@emailjs/browser"
import Swal from 'sweetalert2'

export default function Contact() {

    const successAlert = () => {
        Swal.fire({
            html: '<b className="alerta">Contacto enviado</b>',
            icon: 'success',
            timer: '5000',
            timerProgressBar: true,
            })
        }
    const sendEmail = (e) => {
        e.preventDefault()
        emailjs.sendForm("service_jvpz93g", "template_5gf7yok", e.target, "qKN3lKyzYHg0cRgvh")
            .then(res => {
                console.log(res)
                return successAlert()
            })
            // .catch(err => console.log(err))
        e.target.reset()
    }
    return (
        <div class="Contact">
            <div class="Contact-container">
                <button onClick={e=>successAlert(e)}>alert</button>
                <form  onSubmit={e=>sendEmail(e)}>
                    <label class="Contact-detail">
                        <span >Your name</span>
                        <input type="text" name="name" placeholder="Joe Bloggs"
                        />
                    </label>
                    <label class="Contact-detail">
                        <span >Email address</span>
                        <input name="email" type="email" placeholder="joe.bloggs@example.com" required/>
                    </label>
                    <label class="Contact-detail">
                        <span >Message</span>
                        <textarea name="message" rows="3" placeholder="Tell us what you're thinking about..."/>
                    </label>
                    <div class="Contact-button">
                        <button class="btn" type="submit">
                            Contact Us
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}