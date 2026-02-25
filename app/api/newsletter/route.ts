import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/cosmic'

// Changed: Created newsletter API route for handling subscription form submissions
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { name?: string; email?: string }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    await subscribeToNewsletter(name, email)

    return NextResponse.json({
      success: true,
      message: "You're subscribed! 🏄 Thanks for joining the Swell Journal community.",
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}