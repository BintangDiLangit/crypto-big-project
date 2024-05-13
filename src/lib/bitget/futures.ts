import { fetchAPI } from ".";

export const getAccountList = async (productType:string) => {
  const queryString = `productType=${productType}`; 
  const accounts = await fetchAPI(
    queryString,
    "/api/v2/mix/account/accounts",
    "GET",
    ""
  );
  if (!accounts) {
   return 404;
  }

  return accounts;
};
