const isBrowser = typeof window !== "undefined";

export const setCookie = (name: string, value: string, days?: number) => {
  if (!isBrowser) return;

  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string) => {
  // Check for browser environment first
  if (!isBrowser) return null;

  // Only access document.cookie if we're in the browser
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (error) {
    // Safety fallback in case document.cookie is somehow accessed in SSR
    return null;
  }
};

export const removeCookie = (name: string) => {
  if (!isBrowser) return;

  document.cookie = `${name}=; Max-Age=0; path=/`;
};
