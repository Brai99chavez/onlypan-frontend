import React from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_jvpz93g',
        'template_5gf7yok',
        e.target,
        'qKN3lKyzYHg0cRgvh'
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    e.target.reset();
  };
  return (
    <div class="Contact">
      <div class="Contact-container">
        <form method="POST" onSubmit={sendEmail}>
          <label class="Contact-detail">
            <span>Tu nombre</span>
            <input type="text" name="name" required />
          </label>
          <label class="Contact-detail">
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <label class="Contact-detail">
            <span>Mensaje</span>
            <textarea name="message" rows="3" required />
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
