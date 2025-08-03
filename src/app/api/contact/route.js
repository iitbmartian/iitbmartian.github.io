import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map();

// Simple rate limiting function
function rateLimit(identifier, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }
  
  const requests = rateLimitStore.get(identifier);
  const validRequests = requests.filter(time => time > windowStart);
  
  if (validRequests.length >= limit) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitStore.set(identifier, validRequests);
  
  // Clean up old entries
  if (requests.length > limit * 2) {
    rateLimitStore.set(identifier, validRequests);
  }
  
  return true;
}

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Email templates
function createEmailTemplate(formData) {
  const { name, email, subject, message } = formData;
  
  return {
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_TO || 'marsrover@iitb.ac.in',
    subject: `[Mars Rover Team Contact] ${subject}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0B0D17 0%, #1A1D2E 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="background: linear-gradient(45deg, #FF6B35, #40E0FF); padding: 2px;">
          <div style="background: #0B0D17; padding: 30px; border-radius: 18px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #40E0FF; font-size: 28px; margin: 0; font-weight: bold;">Mars Rover Team</h1>
              <div style="height: 3px; background: linear-gradient(45deg, #FF6B35, #40E0FF); margin: 15px auto; width: 100px; border-radius: 2px;"></div>
              <p style="color: #40E0FF; font-size: 16px; margin: 10px 0 0 0;">New Contact Form Submission</p>
            </div>
            
            <!-- Contact Info -->
            <div style="background: rgba(64, 224, 255, 0.1); border-radius: 15px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(64, 224, 255, 0.2);">
              <h2 style="color: #FF6B35; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center;">
                📧 Contact Details
              </h2>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center; padding: 10px; background: rgba(255, 107, 53, 0.1); border-radius: 8px; border: 1px solid rgba(255, 107, 53, 0.2);">
                  <span style="color: #40E0FF; font-weight: bold; min-width: 70px;">Name:</span>
                  <span style="color: white; margin-left: 10px;">${name}</span>
                </div>
                
                <div style="display: flex; align-items: center; padding: 10px; background: rgba(64, 224, 255, 0.1); border-radius: 8px; border: 1px solid rgba(64, 224, 255, 0.2);">
                  <span style="color: #FF6B35; font-weight: bold; min-width: 70px;">Email:</span>
                  <span style="color: white; margin-left: 10px;"><a href="mailto:${email}" style="color: #40E0FF; text-decoration: none;">${email}</a></span>
                </div>
                
                <div style="display: flex; align-items: center; padding: 10px; background: rgba(255, 107, 53, 0.1); border-radius: 8px; border: 1px solid rgba(255, 107, 53, 0.2);">
                  <span style="color: #40E0FF; font-weight: bold; min-width: 70px;">Subject:</span>
                  <span style="color: white; margin-left: 10px;">${subject}</span>
                </div>
              </div>
            </div>
            
            <!-- Message -->
            <div style="background: rgba(255, 107, 53, 0.1); border-radius: 15px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(255, 107, 53, 0.2);">
              <h2 style="color: #40E0FF; font-size: 20px; margin: 0 0 15px 0; display: flex; align-items: center;">
                💬 Message
              </h2>
              <div style="background: rgba(11, 13, 23, 0.5); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="color: white; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 20px; background: rgba(64, 224, 255, 0.05); border-radius: 10px; border: 1px solid rgba(64, 224, 255, 0.1);">
              <p style="color: #40E0FF; font-size: 14px; margin: 0;">
                🚀 Received on ${new Date().toLocaleString('en-US', {
                  timeZone: 'Asia/Kolkata',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })} IST
              </p>
              <p style="color: rgba(255, 255, 255, 0.7); font-size: 12px; margin: 10px 0 0 0;">
                Mars Rover Team | IIT Bombay | Powai, Mumbai, Maharashtra 400076
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission - Mars Rover Team

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Received on ${new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Kolkata',
  dateStyle: 'full',
  timeStyle: 'short'
})} IST
Mars Rover Team | IIT Bombay
    `,
  };
}

function createAutoReplyTemplate(formData) {
  const { name, email, subject } = formData;
  
  return {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Thank you for contacting Mars Rover Team - ${subject}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0B0D17 0%, #1A1D2E 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="background: linear-gradient(45deg, #40E0FF, #FF6B35); padding: 2px;">
          <div style="background: #0B0D17; padding: 30px; border-radius: 18px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #40E0FF; font-size: 32px; margin: 0; font-weight: bold;">🚀 Mars Rover Team</h1>
              <div style="height: 3px; background: linear-gradient(45deg, #40E0FF, #FF6B35); margin: 15px auto; width: 150px; border-radius: 2px;"></div>
              <p style="color: #FF6B35; font-size: 18px; margin: 10px 0 0 0; font-weight: bold;">IIT Bombay</p>
            </div>
            
            <!-- Thank you message -->
            <div style="text-align: center; background: rgba(64, 224, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 25px; border: 1px solid rgba(64, 224, 255, 0.2);">
              <h2 style="color: #40E0FF; font-size: 24px; margin: 0 0 15px 0;">Thank you for reaching out!</h2>
              <p style="color: white; font-size: 16px; line-height: 1.6; margin: 0;">
                Hi <strong style="color: #FF6B35;">${name}</strong>,<br><br>
                We've received your message regarding "<strong style="color: #40E0FF;">${subject}</strong>" and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <!-- What's next -->
            <div style="background: rgba(255, 107, 53, 0.1); border-radius: 15px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(255, 107, 53, 0.2);">
              <h3 style="color: #FF6B35; font-size: 20px; margin: 0 0 15px 0;">🎯 What happens next?</h3>
              <ul style="color: white; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our team will review your message carefully</li>
                <li>You'll receive a detailed response within 24 hours</li>
                <li>For urgent matters, you can also reach us on social media</li>
              </ul>
            </div>
            
            <!-- Connect with us -->
            <div style="background: rgba(64, 224, 255, 0.1); border-radius: 15px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(64, 224, 255, 0.2);">
              <h3 style="color: #40E0FF; font-size: 20px; margin: 0 0 15px 0;">🌐 Stay Connected</h3>
              <p style="color: white; margin: 0 0 15px 0;">Follow our journey to Mars:</p>
              <div style="text-align: center;">
                <a href="#" style="display: inline-block; margin: 5px 10px; padding: 8px 15px; background: rgba(255, 107, 53, 0.2); color: #FF6B35; text-decoration: none; border-radius: 20px; border: 1px solid rgba(255, 107, 53, 0.3);">Facebook</a>
                <a href="#" style="display: inline-block; margin: 5px 10px; padding: 8px 15px; background: rgba(64, 224, 255, 0.2); color: #40E0FF; text-decoration: none; border-radius: 20px; border: 1px solid rgba(64, 224, 255, 0.3);">Instagram</a>
                <a href="#" style="display: inline-block; margin: 5px 10px; padding: 8px 15px; background: rgba(255, 107, 53, 0.2); color: #FF6B35; text-decoration: none; border-radius: 20px; border: 1px solid rgba(255, 107, 53, 0.3);">YouTube</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 20px; background: rgba(64, 224, 255, 0.05); border-radius: 10px; border: 1px solid rgba(64, 224, 255, 0.1);">
              <p style="color: #40E0FF; font-size: 14px; margin: 0 0 10px 0;">
                📍 IIT Bombay, Powai, Mumbai, Maharashtra 400076, India
              </p>
              <p style="color: rgba(255, 255, 255, 0.7); font-size: 12px; margin: 0;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
    text: `
Thank you for contacting Mars Rover Team!

Hi ${name},

We've received your message regarding "${subject}" and our team will get back to you within 24 hours.

What happens next?
- Our team will review your message carefully
- You'll receive a detailed response within 24 hours  
- For urgent matters, you can also reach us on social media

Stay Connected - Follow our journey to Mars on our social media platforms!

---
Mars Rover Team | IIT Bombay
IIT Bombay, Powai, Mumbai, Maharashtra 400076, India

This is an automated response. Please do not reply to this email.
    `,
  };
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Apply rate limiting
    if (!rateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    try {
      contactFormSchema.parse(body);
    } catch (validationError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data'
        },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email configuration error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service configuration error' 
        },
        { status: 500 }
      );
    }

    // Send notification email to team
    const teamEmailOptions = createEmailTemplate(body);
    const autoReplyOptions = createAutoReplyTemplate(body);

    try {
      // Send both emails concurrently
      const [teamEmailResult, autoReplyResult] = await Promise.allSettled([
        transporter.sendMail(teamEmailOptions),
        transporter.sendMail(autoReplyOptions)
      ]);

      // Check if team email was sent successfully
      if (teamEmailResult.status === 'rejected') {
        console.error('Team email failed:', teamEmailResult.reason);
        return NextResponse.json(
          { 
            success: false, 
            message: 'Failed to send message to team' 
          },
          { status: 500 }
        );
      }

      // Auto-reply failure is not critical
      if (autoReplyResult.status === 'rejected') {
        console.warn('Auto-reply failed:', autoReplyResult.reason);
      }

      // Log successful submission
      console.log(`Contact form submission: ${body.name} <${body.email}> - ${body.subject}`);

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send email' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
