import { getSignatureIndodax } from "@/lib/crypto";

export async function fetchAPI(
  requestPath: string,
  queryString: string = "",
  method: string,
  body: string = ""
): Promise<any> {
  const API_KEY = import.meta.env.BYBIT_API_KEY;
  const API_SECRET = import.meta.env.BYBIT_SECRET_KEY;
  const API_URL = import.meta.env.BYBIT_API_URL;
  const recvWindow = "5000";

  const getServerTime = await fetch(`https://indodax.com/api/server_time`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const timestamp = getServerTime.server_time;

  if (queryString != "") {
    // queryString += "&";
  } else {
    // queryString += "?";
  }
  queryString += `method=getInfo&timestamp=${timestamp}&recvWindow=${recvWindow}`;

  const signature = getSignatureIndodax(queryString, API_SECRET);

  try {
    const result = await fetch(`${API_URL}${requestPath}?${queryString}`, {
      method,
      headers: {
        Key: API_KEY,
        Sign: signature,
      },
    });

    const data = await result.json();

    return 1;
  } catch (error) {
    return error;
  }
}

export async function fetchDataTest(): Promise<any> {
  try {
    const data = await fetchAPI("", "", "POST", "");

    return { data };
  } catch (error) {
    return { error };
  }
}
