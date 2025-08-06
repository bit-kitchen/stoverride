#!/usr/bin/env node

// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

const url = new URL($request.url)
const searchParams = url.searchParams

const tbm = searchParams.get('tbm')
const q = searchParams.get('q')

console.log(`tbm: ${tbm}, q: ${q}`)

if (tbm === 'map') {
  // tbm=map
  $done({})
} else {
  // Remove all search params except q
  url.search = ''
  url.searchParams.set('q', q)

  if (url.href === $request.url) {
    // No changes, keep the request untouched
    $done({})
  } else {
    // Redirect to the simplified URL
    $done({
      response: {
        status: 302,
        headers: {
          'Location': url.href,
        },
      },
    })
  }
}
