export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00Z");
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-US", options);
}

export const padTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${paddedHours}:${paddedMinutes}`;
};

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

export const formatDateTime = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Change to false for 24-hour format
  };
  return new Date(dateString).toLocaleString(undefined, options);
};
