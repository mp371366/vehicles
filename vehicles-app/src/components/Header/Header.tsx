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
      <div>{back && <Link to="../">&#8426;</Link>}</div>
      <h1>{title}</h1>
      <div>{onSearch && <div onClick={onSearch}>&#128269;</div>}</div>
    </header>
  )
}

export default Header
