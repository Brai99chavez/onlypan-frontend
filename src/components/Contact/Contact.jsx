import React from 'react'
import "./Contact.css"

export default function Contact() {
    return (
        <div class="Contact">
            <div class="Contact-container">
                <form method="POST" >
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
