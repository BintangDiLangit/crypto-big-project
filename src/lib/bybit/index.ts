import { getSignatureBybit } from "@/lib/crypto";

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

  const getServerTime = await fetch(`${API_URL}/v5/market/time`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const timestamp = getServerTime.time;

  const signature = getSignatureBybit(
    queryString,
    API_SECRET,
    API_KEY,
    timestamp,
    recvWindow
  );

  try {
    const data = await fetch(`${API_URL}${requestPath}?${queryString}`, {
      method,
      headers: {
        "X-BAPI-SIGN-TYPE": "2",
        "X-BAPI-SIGN": signature,
        "X-BAPI-API-KEY": API_KEY,
        "X-BAPI-TIMESTAMP": timestamp,
        "X-BAPI-RECV-WINDOW": recvWindow,
      },
    });
    return data.json();
  } catch (error) {
    return error;
  }
}

export async function fetchBalanceAll(): Promise<any> {
  try {
    const dataBalanceUnified = await fetchAPI(
      "/v5/account/wallet-balance",
      "accountType=UNIFIED",
      "GET",
      ""
    );

    return { dataBalanceUnified };
  } catch (error) {
    return { error };
  }
}
