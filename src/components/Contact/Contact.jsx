import React from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export default function Contact() {
  const successAlert = () => {
    Swal.fire({
      html: '<b className="alerta">Contacto enviado</b>',
      icon: 'success',
      timer: '5000',
      timerProgressBar: true,
    });
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_jvpz93g',
        'template_5gf7yok',
        e.target,
        'qKN3lKyzYHg0cRgvh'
      )
      .then((res) => {
        console.log(res);
        return successAlert();
      })
      .catch((err) => console.error(err));
    e.target.reset();
  };
  return (
    <div class="Contact">
      <div class="Contact-container">
        <form onSubmit={(e) => sendEmail(e)}>
          <label class="Contact-detail">
            <span>Tu nombre</span>
            <input type="text" name="name" placeholder="Juan Perez" required />
          </label>
          <label class="Contact-detail">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="juan.perez@ejemplo.com"
              required
            />
          </label>
          <label class="Contact-detail">
            <span>Mensaje</span>
            <textarea
              required
              name="message"
              rows="3"
              placeholder="Tell us what you're thinking about..."
            />
          </label>
          <div class="Contact-button">
            <button class="btn" type="submit">
              Enviar comentario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
