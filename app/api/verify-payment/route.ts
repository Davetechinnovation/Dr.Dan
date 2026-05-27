import { NextResponse } from 'next/server'

const MONNIFY_API_KEY = process.env.NEXT_PUBLIC_MONNIFY_API_KEY
const MONNIFY_SECRET_KEY = process.env.MONNIFY_SECRET_KEY
const MONNIFY_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.monnify.com'
  : 'https://sandbox.monnify.com'

interface VerifyRequest {
  transactionReference: string
  paymentReference: string
  email: string
  quantity: number
  format: string
  amount: number
}

/**
 * Get Monnify access token using API Key and Secret Key (Basic Auth).
 */
async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${MONNIFY_API_KEY}:${MONNIFY_SECRET_KEY}`).toString('base64')

  const response = await fetch(`${MONNIFY_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok || !data.requestSuccessful) {
    console.error('Monnify auth error:', data)
    throw new Error('Failed to authenticate with Monnify')
  }

  return data.responseBody.accessToken
}

/**
 * Verify a transaction on Monnify using the payment reference.
 */
async function verifyTransaction(paymentReference: string, accessToken: string) {
  const response = await fetch(
    `${MONNIFY_BASE_URL}/api/v1/merchant/transactions/query?paymentReference=${paymentReference}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()

  if (!response.ok || !data.requestSuccessful) {
    console.error('Monnify verification error:', data)
    throw new Error('Failed to verify transaction')
  }

  return data.responseBody
}

export async function POST(request: Request) {
  try {
    const body: VerifyRequest = await request.json()
    const { transactionReference, paymentReference, email, quantity, format, amount } = body

    if (!transactionReference || !paymentReference || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!MONNIFY_API_KEY || !MONNIFY_SECRET_KEY) {
      console.error('Monnify API keys are not configured')
      return NextResponse.json(
        { error: 'Payment verification is not configured' },
        { status: 500 }
      )
    }

    // Get access token and verify the transaction
    const accessToken = await getAccessToken()
    const transaction = await verifyTransaction(paymentReference, accessToken)

    // Check if transaction was completed successfully
    if (transaction.paymentStatus !== 'PAID') {
      return NextResponse.json(
        { error: 'Transaction was not completed' },
        { status: 400 }
      )
    }

    // Verify the amount matches
    const expectedAmount = amount
    if (transaction.amountPaid !== expectedAmount) {
      return NextResponse.json(
        { error: 'Amount mismatch detected' },
        { status: 400 }
      )
    }

    // Verify the email matches
    if (transaction.customerEmail?.toLowerCase() !== email.toLowerCase()) {
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
      transactionReference,
      paymentReference,
      email,
      quantity,
      format,
      amount,
      monnifyStatus: transaction.paymentStatus,
      paidAt: transaction.paidOn,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
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
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
