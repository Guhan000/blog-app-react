import React from 'react'

const Footer = () => {
  const today = new Date();
  return (
    <footer>
        <h2>Copyright &copy; {today.getFullYear()}</h2>
    </footer>
  )
}

export default Footer