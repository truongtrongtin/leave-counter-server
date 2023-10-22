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
    let events: CalendarEvent[] = [];
    do {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_ID}/events?${query}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      if (!response.ok) throw data;
      events = events.concat(data.items);
      if (data.nextPageToken) {
        query.set("pageToken", data.nextPageToken);
      }
    } while (query.get("pageToken"));
    return events;
  } catch (error) {
    throw error;
  }
}
