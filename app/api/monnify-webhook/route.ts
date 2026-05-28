import { NextResponse } from 'next/server'

const MONNIFY_BASE_URL = process.env.NEXT_PUBLIC_MONNIFY_API_KEY?.startsWith('MK_TEST')
  ? 'https://sandbox.monnify.com'
  : 'https://api.monnify.com'

/**
 * Monnify webhook handler — called by Monnify when payment status changes.
 * 
 * Set this URL in Monnify Dashboard → Settings → Webhooks:
 * https://drdanielochi.com/api/monnify-webhook
 * 
 * Enable only: Transaction completion
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventType, eventData } = body

    console.log('Monnify webhook received:', { eventType, eventData })

    // We only care about successful transactions
    if (eventType !== 'SUCCESSFUL_TRANSACTION') {
      return NextResponse.json({ received: true })
    }

    const {
      transactionReference,
      paymentReference,
      amountPaid,
      paidOn,
      paymentStatus,
      customerEmail,
      product: { metadata },
    } = eventData

    if (paymentStatus !== 'PAID') {
      return NextResponse.json({ received: true })
    }

    console.log('Payment confirmed via webhook:', {
      transactionReference,
      paymentReference,
      amountPaid,
      paidOn,
      customerEmail,
      metadata,
    })

    // === Payment is confirmed! ===
    // Here you can:
    // 1. Save the order to a database
    // 2. Send the download link via email
    // 3. Grant access to digital content
    // 4. Update inventory

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Monnify webhook error:', error)
    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
  }
}
