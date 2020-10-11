import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export type HeaderProps = {
  back?: boolean
  title: string
  onSearch?: () => void
}

const Header: React.FC<HeaderProps> = ({ back = false, title, onSearch }) => {
  return (
    <header className="Header">
      <div>
        {back && (
          <Link to="../">
            <div className="icon">&#65513;</div>
          </Link>
        )}
      </div>
      <h1>{title}</h1>
      <div>
        {onSearch && (
          <div className="icon" onClick={onSearch}>
            &#128269;
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
