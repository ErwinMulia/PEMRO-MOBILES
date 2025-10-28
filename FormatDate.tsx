
export const formatDate = (dateInput: string | Date): string => {
  try {
    const date = new Date(dateInput);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
