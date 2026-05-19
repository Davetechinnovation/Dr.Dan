import { NextResponse } from 'next/server'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

interface VerifyRequest {
  reference: string
  email: string
  quantity: number
  format: string
  amount: number
}

export async function POST(request: Request) {
  try {
    const body: VerifyRequest = await request.json()
    const { reference, email, quantity, format, amount } = body

    if (!reference || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY is not configured')
      return NextResponse.json(
        { error: 'Payment verification is not configured' },
        { status: 500 }
      )
    }

    // Verify the transaction with Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Paystack verification API error:', data)
      return NextResponse.json(
        { error: 'Failed to verify payment' },
        { status: 502 }
      )
    }

    // Check if transaction was successful
    if (data.status !== true || data.data.status !== 'success') {
      return NextResponse.json(
        { error: 'Transaction was not successful' },
        { status: 400 }
      )
    }

    // Verify the amount matches (amount is in kobo from Paystack)
    const expectedAmount = amount * 100
    if (data.data.amount !== expectedAmount) {
      return NextResponse.json(
        { error: 'Amount mismatch detected' },
        { status: 400 }
      )
    }

    // Verify the email matches
    if (data.data.customer.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: 'Email mismatch detected' },
        { status: 400 }
      )
    }

    // === Transaction is verified! ===
    // Here you can:
    // - Save the order to a database
    // - Send a confirmation email
    // - Grant access to digital content
    // - Update inventory

    console.log('Payment verified successfully:', {
      reference,
      email,
      quantity,
      format,
      amount,
      paystackCustomer: data.data.customer.email,
      paidAt: data.data.paid_at,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        reference,
        email,
        quantity,
        format,
        amount,
      },
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
