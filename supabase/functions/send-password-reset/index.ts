import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // Create Supabase admin client to generate password reset link
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Generate password reset link using Supabase Admin API
    const { data, error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: email,
      options: {
        redirectTo: `${req.headers.get("origin")}/reset-password`,
      },
    });

    if (resetError) {
      console.error("Error generating reset link:", resetError);
      // Don't reveal if email exists or not for security
      return new Response(
        JSON.stringify({ message: "If an account exists with this email, a reset link will be sent." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resetLink = data?.properties?.action_link;

    if (!resetLink) {
      throw new Error("Failed to generate reset link");
    }

    // Send email via Resend REST API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "UniAI Playground <onboarding@resend.dev>",
        to: [email],
        subject: "Reset your UniAI Playground password",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0f; color: #ffffff; padding: 40px 20px;">
            <div style="max-width: 480px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; border: 1px solid #374151;">
              <h1 style="color: #60a5fa; margin: 0 0 24px; font-size: 24px; text-align: center;">
                🎓 UniAI Playground
              </h1>
              <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">
                Password Reset Request
              </h2>
              <p style="color: #9ca3af; line-height: 1.6; margin: 0 0 24px;">
                You requested to reset your password. Click the button below to set a new password:
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 24px 0 0;">
                If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Resend API error:", errorData);
      throw new Error("Failed to send email");
    }

    console.log("Password reset email sent successfully");

    return new Response(
      JSON.stringify({ message: "If an account exists with this email, a reset link will be sent." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
