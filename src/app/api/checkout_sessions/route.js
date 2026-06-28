import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const body = await request.json();

    const { proposalId, taskId, taskTitle, proposedBudget, freelancerName } =
      body;

    const user = await getUserSession();

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: taskTitle,
              description: `Hiring Freelancer: ${freelancerName}`,
            },
            unit_amount: Math.round(Number(proposedBudget) * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      metadata: {
        proposalId,
        taskId,
        taskTitle,
        freelancerName,
        amount: proposedBudget.toString(),
        clientEmail: user.email,
        clientName :user.name
      },

      success_url: `${origin}/dashboard/client/proposal/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/client`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
