export default function APIRequest(url, method, body) {
  return fetch(url, {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
