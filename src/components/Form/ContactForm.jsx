import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { __USER_ID__ } from '../../consts';
import { __SERVICE_ID__ } from '../../consts';
import { __TEMLATE_ID__ } from '../../consts';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: 'Andrey',
    email: 'ustavitskii@sfedu.ru',
    message: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем форму (HTML элемент формы)
    const templateParams = {
      from_email: formData.email,
      message: formData.message,  
      from_name: formData.name
    };

    // Отправка данных формы через emailjs
    emailjs
      .send(
        __SERVICE_ID__,  // Замените на ваш Service ID
        __TEMLATE_ID__,  // Замените на ваш Template ID
        templateParams,                // Передаем саму форму (e.target) как третий аргумент
        __USER_ID__       // Замените на ваш User ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          setStatus('Failed to send message. Please try again later.');
        }
      );

    // Очистить форму после отправки
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} id="contactForm">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            // required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
          style={{
            width: '800px',
            height: '400px'
          }}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactForm;
