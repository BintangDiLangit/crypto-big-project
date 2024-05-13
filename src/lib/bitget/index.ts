import { getSignatureBitget } from "@/lib/crypto";

export async function fetchAPI(
  requestPath: string,
  queryString: string = "",
  method: string,
  body: string = ""
): Promise<any> {
  const API_KEY = import.meta.env.BITGET_API_KEY;
  const API_SECRET = import.meta.env.BITGET_SECRET_KEY;
  const API_PASS = import.meta.env.BITGET_PASSPHRASE;
  const API_URL = import.meta.env.BITGET_API_URL;

  const getServerTime = await fetch(
    `https://api.bitget.com/api/v2/public/time`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  const timestamp = getServerTime.data.serverTime;

  const signature = getSignatureBitget(
    timestamp,
    method,
    requestPath,
    queryString,
    body,
    API_SECRET
  );

  try {
    const data = await fetch(`${API_URL}${requestPath}?${queryString}`, {
      method,
      headers: {
        "ACCESS-SIGN": signature,
        "ACCESS-KEY": API_KEY,
        "ACCESS-PASSPHRASE": API_PASS,
        "ACCESS-TIMESTAMP": timestamp,
        locale: "en-US",
      },
    });

    return data.json();
  } catch (error) {
    return error;
  }
}

export async function fetchBalanceAll(): Promise<any> {
  try {
    const dataAllAcountBalance = await fetchAPI(
      "/api/v2/account/all-account-balance",
      "",
      "GET",
      ""
    );

    let allTypeBalance = 0;

    dataAllAcountBalance.data.forEach((element: any) => {
      allTypeBalance += parseFloat(element.usdtBalance);
    });
    return { dataAllAcountBalance, allTypeBalance };
  } catch (error) {
    return { error };
  }
}
