import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const body = await request.json();
    const { taskTitle, proposedBudget, freelancerName, taskId } = body;
    const unitAmount = Math.round(Number(proposedBudget) * 100);

    const user = await getUserSession()

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: taskTitle, 
              description: `Hiring Freelancer: ${freelancerName}`,
            },
            unit_amount: unitAmount, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard/client/proposal/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/client`,
    });
   return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}