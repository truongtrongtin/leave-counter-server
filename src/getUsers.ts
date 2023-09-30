import { getAccessToken } from "./getAccessToken.js";

export async function getUsers() {
  try {
    const accessToken = await getAccessToken();
    const query = new URLSearchParams({
      valueRenderOption: "UNFORMATTED_VALUE",
      dateTimeRenderOption: "FORMATTED_STRING",
    });
    const sheetName = new Date().getFullYear();
    const sheetValuesResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${sheetName}?${query}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const sheetValues = await sheetValuesResponse.json();
    if (!sheetValuesResponse.ok) throw sheetValues;
    const [header, ...rows] = sheetValues.values;
    const result: Record<string, string>[] = [];
    for (const rowValues of rows) {
      const obj: Record<string, string> = {};
      for (let i = 0; i < rowValues.length; i++) {
        const key = header[i];
        const value = rowValues[i];
        obj[key] = value;
      }
      result.push(obj);
    }
    return result;
  } catch (error) {
    throw error;
  }
}
