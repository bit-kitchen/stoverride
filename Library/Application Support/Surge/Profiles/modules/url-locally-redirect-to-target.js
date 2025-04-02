#!/usr/bin/env node

// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

// https://www.o365atp.com/
// https://github.com/newhouse/url-tracking-stripper/blob/master/assets/js/redirects.js

let params = ['url']
try {
  params = $argument.split(',')
} catch (e) {
  // Ignore ReferenceError if argument not provided in sgmodule.
}

// Allow debugging using Node.js
try {
  $request
} catch (e) {
  params = process.argv[2] ? process.argv[2].split(',') : ['url']
  $request = {
    url: process.argv[3] || 'https://www.google.com/url?url=https://www.google.com/',
  }
  $done = console.error
}

const url = new URL($request.url)

if (params.length) {
  for (const param of params) {
    const paramUrl = url.searchParams.get(param)
    if (paramUrl) {
      // Redirect to the target URL directly without going through ATP safelinks.
      const targetUrl = decodeURIComponent(paramUrl)
      $done({
        response: {
          status: 302,
          headers: {
            'Location': targetUrl,
          },
        },
      })
    }
  }
} else if (url.pathname.startsWith('/lnk/')) {
  const segments = url.pathname.split('/')
  const targetUrl = atob(segments[segments.length - 1])
  $done({
    response: {
      status: 302,
      headers: {
        'Location': targetUrl,
      },
    },
  })
} else {
  // No url parameter found, keep the request untouched.
  $done({})
}
