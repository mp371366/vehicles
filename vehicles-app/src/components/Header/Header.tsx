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
      <div>{back && <Link to="../">back</Link>}</div>
      <h1>{title}</h1>
      <div>{onSearch && <button onClick={onSearch}>search</button>}</div>
    </header>
  )
}

export default Header
