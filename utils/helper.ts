export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00Z");
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-US", options);
}

export const formatTime = (timeStr: string | null | undefined) => {
  if (!timeStr) return "";

  const [hours, minutes] = timeStr.split(":");
  const time = new Date();
  time.setHours(parseInt(hours), parseInt(minutes));
  return time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
