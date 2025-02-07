import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const defaultLocale = "en";
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || defaultLocale;

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
