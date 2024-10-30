import {NextRequest, NextResponse} from 'next/server'
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware((auth, request) => {
  return applyCsp(request)
})

function applyCsp(request: NextRequest) {
  // create a randomly generated nonce value
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // format the CSP header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'strict-dynamic' 'nonce-${nonce}' https: http: ${
      process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`
  };
    connect-src 'self' https://moral-kit-16.clerk.accounts.dev;
    img-src 'self' https://img.clerk.com;
    worker-src 'self' blob:;
    style-src 'self' 'unsafe-inline';
    frame-src 'self' https://challenges.cloudflare.com;
    form-action 'self';
  `
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  // set the nonce and csp values in the request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}