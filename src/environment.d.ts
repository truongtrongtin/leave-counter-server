export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REFRESH_TOKEN: string;
      CALENDAR_ID: string;
      SPREADSHEET_ID: string;
      SHEET_NAME: string;
    }
  }
}
