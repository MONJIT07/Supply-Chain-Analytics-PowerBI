import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const prisma = new PrismaClient()

// @desc    Create Stripe Checkout Session
// @route   POST /api/orders/checkout
// @access  Public (for now)
export const createCheckoutSession = async (req, res) => {
  try {
    const { items, userId } = req.body
    
    // Create line items for Stripe
    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      }
    })

    // Calculate total
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    // Create an order in our DB as "pending"
    const order = await prisma.order.create({
      data: {
        userId: userId || 1, // Fallback to user 1 for testing
        totalAmount,
        status: 'pending',
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cart`,
      metadata: {
        orderId: order.id.toString(),
      }
    })

    // Update order with stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id }
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
