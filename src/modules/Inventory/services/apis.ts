import axios from "axios";

const GET_INVENTORY = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

export const getInventoryData = async (): Promise<any> => {
  let response;
  try {
    response = await axios.get(GET_INVENTORY);
  } catch (err) {
    console.log("err in fetching inventory data", err);
  } finally {
    return response;
  }
};
