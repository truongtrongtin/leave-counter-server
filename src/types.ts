export type CalendarEvent = {
  summary: string;
  start: { date: string };
  end: { date: string };
  extendedProperties?: {
    private?: Record<string, string>;
  };
};
