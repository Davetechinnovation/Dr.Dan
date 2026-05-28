import { NextResponse } from 'next/server'

/**
 * TEST MODE ONLY — Simulates a successful payment for testing the flow.
 * In production, real payments come via Monnify webhook or polling.
 */
export async function POST(request: Request) {
  // Only allow in non-production environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { transactionReference, paymentReference, email, quantity, format, amount } = body

    if (!transactionReference || !paymentReference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('=== TEST MODE: Simulated payment ===')
    console.log('Transaction:', { transactionReference, paymentReference, email, quantity, format, amount })

    return NextResponse.json({
      success: true,
      paid: true,
      message: 'Simulated payment successful (test mode)',
      data: {
        transactionReference,
        paymentReference,
        email,
        quantity,
        format,
        amount,
      },
    })
  } catch (error) {
    console.error('Simulate payment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
