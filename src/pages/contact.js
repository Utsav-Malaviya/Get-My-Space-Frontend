import React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useState, useEffect, useRef } from "react"
import Navbar from '../components/navbar';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Send form data to backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      console.log("Form submitted successfully:", data)
      setSubmitSuccess(true)
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      })
      setErrors({})
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
      
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(error.message || "There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        gsap.registerPlugin(ScrollTrigger)

        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            },
          )
        }

        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            },
          )
        }
      } catch (error) {
        console.log("GSAP loading error:", error)
      }
    }

    loadGSAP()

    return () => {
      if (typeof window !== "undefined") {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  const handleLocation = () => {
    window.open("https://www.google.com/maps/place/Ratih+Jewels+LLP/@21.208505,72.8388606,17.2z/data=!4m14!1m7!3m6!1s0x3be04f0048069f6d:0x7f0d36bf95d0ed35!2sRatih+Jewels+LLP!8m2!3d21.2086268!4d72.8433354!16s%2Fg%2F11wg7gv66y!3m5!1s0x3be04f0048069f6d:0x7f0d36bf95d0ed35!8m2!3d21.2086268!4d72.8433354!16s%2Fg%2F11wg7gv66y?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D", "_blank")
  }

  return (
    <>
    <Navbar />
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#1a1a1a",
        padding: "100px 40px",
        minHeight: "100vh",
      }}
    >
      <style jsx>{`
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 60px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .contact-icon {
          width: 24px;
          height: 24px;
          color: #ffd700;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-form {
          background-color: #2a2a2a;
          padding: 40px;
          border-radius: 16px;
          border: 1px solid #333;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 15px 18px;
          background-color: #1a1a1a;
          border: 2px solid #333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #ffd700;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
          background-color: #222;
        }

        .form-input:hover {
          border-color: #555;
          background-color: #222;
        }

        .form-input::placeholder {
          color: #888;
          opacity: 0.7;
        }

        .form-textarea {
          width: 100%;
          padding: 15px 18px;
          background-color: #1a1a1a;
          border: 2px solid #333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
          box-sizing: border-box;
        }

        .form-textarea:focus {
          border-color: #ffd700;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
          background-color: #222;
        }

        .form-textarea:hover {
          border-color: #555;
          background-color: #222;
        }

        .form-textarea::placeholder {
          color: #888;
          opacity: 0.7;
        }

        .required-field {
          color: #ff6b6b;
          margin-left: 4px;
        }

        .form-submit-btn {
          width: 100%;
          backgroundColor: #ffd700;
          color: #000000;
          border: none;
          padding: 16px 24px;
          borderRadius: 8px;
          fontSize: 16px;
          fontWeight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          marginTop: 10px;
        }

        .form-submit-btn:hover {
          backgroundColor: #ffed4a;
          transform: translateY(-2px);
          boxShadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }

        .form-submit-btn:active {
          transform: translateY(0px);
        }

        .form-submit-btn:disabled {
          backgroundColor: #666;
          color: #999;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .form-submit-btn:disabled:hover {
          backgroundColor: #666;
          transform: none;
          box-shadow: none;
        }

        .input-error {
          border-color: #ff6b6b !important;
        }

        .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 5px;
          display: block;
        }

        .success-message {
          color: #4CAF50;
          font-size: 14px;
          margin-top: 10px;
          text-align: center;
          padding: 10px;
          background-color: rgba(76, 175, 80, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="contact-container">
        <div ref={headerRef} style={{ textAlign: "center" }}>
          <h3
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              position: "relative",
              display: "inline-block",
            }}
          >
            Contact our team
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "2px",
              }}
            ></div>
          </h3>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "30px 0 0 0",
              lineHeight: "1.2",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Got a question? Contact us anytime for quick support and solutions.
          </h1>
        </div>

        <div ref={contentRef} className="contact-content">
          <div className="contact-info">
            <div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  fontWeight: "bold",
                  margin: "0 0 15px 0",
                }}
              >
                Let's talk with us
              </h2>
              <p
                style={{
                  color: "#cccccc",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  margin: "0 0 40px 0",
                }}
              >
                Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
              </p>
            </div>

            <div className="contact-item">
              <svg
                className="contact-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p onClick={handleLocation}
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    margin: "0",
                    lineHeight: "1.5",
                  }}
                >
                  Ratih House, opposite Poddar Arcade, Khand Bazar, Surat, Gujarat 395006
                </p>
              </div>
            </div>

            <div className="contact-item">
              <svg
                className="contact-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    margin: "0",
                  }}
                >
                  +91 79901 30283
                </p>
              </div>
            </div>

            <div className="contact-item">
              <svg
                className="contact-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    margin: "0",
                  }}
                >
                  support@getmyspace.io
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 10px 0",
              }}
            >
              Inquiry details
            </h3>
            <p
              style={{
                color: "#cccccc",
                fontSize: "14px",
                margin: "0 0 30px 0",
              }}
            >
              Fill this form so we can get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name<span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                    required
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name<span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                    required
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address<span className="required-field">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number<span className="required-field">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message<span className="required-field">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your inquiry..."
                  className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                  required
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              {submitSuccess && (
                <div className="success-message" style={{ textAlign: "center", marginBottom: "10px" }}>
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default ContactSection
