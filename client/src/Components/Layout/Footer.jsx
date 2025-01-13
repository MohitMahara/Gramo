import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container-fluid footer-container">
        <p>© {currentYear} Gramo | all rights are reserved </p>
    </div>
  )
}

export default Footer