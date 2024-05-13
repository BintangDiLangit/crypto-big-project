import { fetchAPI } from ".";

export const getAllCoinsBalance = async (productType: string) => {
  try {
    const queryString = `accountType=${productType}`;
    const allAcountBalance = await fetchAPI(
      "/v5/asset/transfer/query-account-coins-balance",
      queryString,
      "GET",
      ""
    );

    if (allAcountBalance.retCode != 0) {
      return 404;
    }
    return allAcountBalance.result;
  } catch (error) {
    return error;
  }
};
