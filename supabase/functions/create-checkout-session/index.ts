import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'https://esm.sh/stripe@12.0.0';
import { corsHeaders } from '../_shared/cors.ts';
import { ensureError } from '../_shared/EnsureError.ts';
import type { ErrorResponse } from '../_shared/types.ts';

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    if (req.method === 'POST') {
        try {
            const { price, quantity }: { price: string; quantity: number } = await req.json();

            if (!price || !quantity) {
                return new Response(JSON.stringify({ error: 'Missing price or quantity' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });
            }

            const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

            const stripe = new Stripe(stripeSecretKey);

            const session = await stripe.checkout.sessions.create({
                success_url: `${Deno.env.get('SITE_URL')}/vault`,
                cancel_url: `${Deno.env.get('SITE_URL')}/vault`,
                line_items: [
                    {
                        price,
                        quantity,
                    },
                ],
                mode: 'payment',
            });

            return new Response(JSON.stringify({ sessionID: session.id }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        } catch (err) {
            const e = ensureError(err) as ErrorResponse;

            return new Response(JSON.stringify({ error: e.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }
    }

    return new Response('Incorrect request method', { status: 405, headers: corsHeaders });
});
