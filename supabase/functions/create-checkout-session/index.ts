import Stripe from 'https://esm.sh/stripe@12.0.0';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { ensureError, type ErrorResponse } from '../_shared/ensureError.ts';

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response('Incorrect request method', { status: 405, headers: corsHeaders });
    }

    try {
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        const authHeader = req.headers.get('Authorization') ?? '';
        const accessToken = authHeader.replace('Bearer ', '').trim();

        if (!accessToken) {
            return new Response(
                JSON.stringify({
                    error: 'Unauthorized',
                }),
                {
                    status: 401,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                },
            );
        }

        const { data: user, error } = await supabase.auth.getUser(accessToken);

        if (error || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const { sessionData } = await req.json();
        const { price, quantity, currency } = sessionData;

        if (!price || !quantity || !currency) {
            return new Response(JSON.stringify({ error: 'Missing price or quantity' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

        const session = await stripe.checkout.sessions.create({
            success_url: `${Deno.env.get('SITE_URL')}/vault?session_id={CHECKOUT_SESSION_ID}&status=success&amount=${quantity}&currency=${currency}`,
            cancel_url: `${Deno.env.get('SITE_URL')}/vault?status=cancel`,
            line_items: [{ price: price, quantity: quantity }],
            mode: 'payment',
        });

        return new Response(JSON.stringify({ sessionID: session.id }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (err) {
        const e = ensureError(err) as ErrorResponse;

        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
