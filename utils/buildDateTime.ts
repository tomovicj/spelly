export const buildDate = (timestamp: Date | string): string => {
  if (typeof timestamp === "string") {
    timestamp = new Date(timestamp);
  }

  return `${timestamp.getDate()}.${timestamp.getMonth() + 1}.${timestamp.getFullYear()}.`;
};

export const buildTime = (timestamp: Date | string): string => {
  if (typeof timestamp === "string") {
    timestamp = new Date(timestamp);
  }

  return `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
};

export const buildDateTime = (timestamp: Date | string): string => {
  return `${buildDate(timestamp)} ${buildTime(timestamp)}`;
};
