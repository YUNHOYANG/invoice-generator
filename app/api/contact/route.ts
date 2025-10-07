import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  // Initialize Resend inside the function to avoid build-time errors
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, subject, message } = await request.json()

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Invoice Generator <onboarding@resend.dev>', // Resend's default sender for testing
      to: ['treadmall@gmail.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Invoice Generator contact form.</p>
            <p>Reply to: ${email}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully', data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    )
  }
}
