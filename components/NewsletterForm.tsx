'use client'

import { useState, type FormEvent } from 'react'

// Changed: Created NewsletterForm client component with name/email fields and success message

interface ApiResponse {
  success?: boolean
  message?: string
  error?: string
}

export default function NewsletterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })

      const data = (await response.json()) as ApiResponse

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? "You're subscribed! 🏄 Thanks for joining the Swell Journal community.")
      setName('')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-ocean-50 border border-ocean-200 p-6 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-ocean-800 font-semibold text-lg">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-ocean-600 hover:text-ocean-800 underline underline-offset-2 transition-colors duration-200"
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 focus:outline-none transition-all duration-200"
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 focus:outline-none transition-all duration-200"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-ocean-600 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-700 focus:ring-2 focus:ring-ocean-500/40 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subscribing…
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 mt-1">{message}</p>
      )}

      <p className="text-xs text-gray-400">
        No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  )
}