import { NextResponse } from 'next/server'

const MONNIFY_API_KEY = process.env.NEXT_PUBLIC_MONNIFY_API_KEY
const MONNIFY_SECRET_KEY = process.env.MONNIFY_SECRET_KEY
const MONNIFY_BASE_URL = process.env.NEXT_PUBLIC_MONNIFY_API_KEY?.startsWith('MK_TEST')
  ? 'https://sandbox.monnify.com'
  : 'https://api.monnify.com'

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
    const body = await request.json()
    const { transactionReference, paymentReference, email, quantity, format, amount } = body

    if (!paymentReference || !email) {
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

    const accessToken = await getAccessToken()
    const transaction = await verifyTransaction(paymentReference, accessToken)

    // Transaction exists but hasn't been paid yet — return gracefully
    if (transaction.paymentStatus !== 'PAID') {
      return NextResponse.json({
        success: false,
        paid: false,
        message: 'Payment not yet received',
        status: transaction.paymentStatus,
      })
    }

    // Verify the amount matches
    const expectedAmount = amount
    if (transaction.amountPaid !== expectedAmount) {
      return NextResponse.json({
        success: false,
        paid: false,
        message: 'Amount mismatch detected',
      })
    }

    // Verify the email matches
    if (transaction.customerEmail?.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({
        success: false,
        paid: false,
        message: 'Email mismatch detected',
      })
    }

    // === Payment confirmed! ===
    console.log('Payment verified successfully:', {
      transactionReference,
      paymentReference,
      email,
      quantity,
      format,
      amount,
      paidAt: transaction.paidOn,
    })

    return NextResponse.json({
      success: true,
      paid: true,
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
    // Return 200 to avoid triggering error UI on the frontend
    return NextResponse.json({
      success: false,
      paid: false,
      message: 'Verification check failed, will retry',
    })
  }
}
