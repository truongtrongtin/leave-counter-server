import { getAccessToken } from "./getAccessToken.js";

type CalendarEvent = {
  summary: string;
  start: { date: string };
  end: { date: string };
  extendedProperties?: {
    private?: Record<string, string>;
  };
};

export async function getCalendarEvents(query: URLSearchParams) {
  try {
    const accessToken = await getAccessToken();
    const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_ID}/events`;
    let events: CalendarEvent[] = [];
    do {
      const response = await fetch(`${endpoint}?${query}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      if (!response.ok) throw data;
      events = events.concat(data.items);
      query.set("pageToken", data.nextPageToken || "");
    } while (query.get("pageToken"));
    return events;
  } catch (error) {
    throw error;
  }
}
