// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

// Allow debugging using Node.js
try {
  $request
} catch (e) {
  $request = {
    url: process.argv[2] || 'https://jwrcy9qc.r.us-west-2.awstrack.me/L0/https:%2F%2Fconfluent.cloud%2Fverify_email%2Fx%3FnewEmailTemplate=true%26PasswordUninitialization=true/1/0101019ff3d6e393-62acfbfb-bc03-47fe-859a-f7eb8168cdc0-000000/0T9qJUzX04pvMdYN9TrIFVu2u9s=474',
  }
  $done = console.error
}

const url = new URL($request.url)
if (url.pathname.startsWith('/L0/')) {
  const segments = url.pathname.split('/')
  const targetUrl = decodeURIComponent(segments[2])
  $done({
    response: {
      status: 302,
      headers: {
        'Location': targetUrl,
      },
    },
  })
} else {
  // URL not in the expected format, keep the request untouched.
  $done({})
}
