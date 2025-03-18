// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

// https://www.o365atp.com/
// https://github.com/newhouse/url-tracking-stripper/blob/master/assets/js/redirects.js

const paramUrl = new URL($request.url).searchParams.get('url')
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
} else {
  // No url parameter found, keep the request untouched.
  $done({})
}
