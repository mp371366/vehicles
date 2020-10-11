import React from 'react'

export type ErrorInfoProps = {
  error: string | null
  onFix: () => void
  fixInfo?: string
}

function ErrorInfo({ error, onFix, fixInfo = 'Try again.' }: ErrorInfoProps) {
  if (!error) {
    return null
  }

  return (
    <div className="ErrorInfo">
      <p>{error}</p>
      <button onClick={onFix}>{fixInfo}</button>
    </div>
  )
}

export default ErrorInfo
