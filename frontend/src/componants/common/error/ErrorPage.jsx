import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate();
  return (
    <>
    <div className="notfound-page d-flex align-items-center justify-content-center vh-100">
      <div className="text-center bg-white p-5 rounded-4 shadow-lg notfound-card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#764ba2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>

        <h1 className="gradient-text display-1 fw-bold">404</h1>
        <h4 className="fw-semibold text-dark mb-3">Oops! Page Not Found</h4>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist. If something is wrong, report it to us.
        </p>

        <div>
          <Link to="/" className="btn btn-primary rounded-pill px-4 me-2">
            Return Home
          </Link>
          <Link  onClick={() => navigate(-1)} to="#" className="btn btn-outline-primary rounded-pill px-4">
            Back
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
