#!/usr/bin/env node

// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

// https://www.o365atp.com/
// https://github.com/newhouse/url-tracking-stripper/blob/master/assets/js/redirects.js

let params = ['url']
try {
  params = $argument.split('&')
} catch (e) {
  // Ignore ReferenceError if argument not provided in sgmodule.
}

// Allow debugging using Node.js
try {
  $request
} catch (e) {
  params = process.argv[2] ? process.argv[2].split('&') : ['url']
  $request = {
    url: process.argv[3] || 'https://www.google.com/url?url=https://www.google.com/',
  }
  $done = console.error
}

const url = new URL($request.url)
let targetUrl

console.log(`params: ${params}`)
for (const param of params) {
  const paramUrl = url.searchParams.get(param)
  console.log(`param: ${param}, value: ${paramUrl}`)

  if (paramUrl) {
    targetUrl = decodeURIComponent(paramUrl)
    break
  }
}

if (targetUrl) {
  // Redirect to the target URL directly without going through intermediate URL.
  $done({
    response: {
      status: 302,
      headers: {
        'Location': targetUrl,
      },
    },
  })
} else {
  // No target URL found, keep the request untouched.
  $done({})
}
