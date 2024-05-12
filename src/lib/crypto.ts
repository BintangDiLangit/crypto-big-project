import crypto from 'crypto';

export function randStr(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


export function getSignatureBitget(timestamp:string, method:string, requestPath:string, queryString:string, body:string, secretKey:string) {
  let prehashString = timestamp + method.toUpperCase() + requestPath;

  if (queryString) {
    prehashString += '?' + queryString;
  }

  if (body) {
    prehashString += body;
  }

  const hmac = crypto.createHmac('sha256', secretKey);
  const signature = hmac.update(prehashString).digest('base64');

  return signature;
}

export function getSignatureBybit(queryString:string, secret:string, apiKey:string, timestamp:string, recvWindow:string) {
  return crypto.createHmac('sha256', secret).update(timestamp + apiKey + recvWindow + queryString).digest('hex');
}