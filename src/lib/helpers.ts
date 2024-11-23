import moment from "moment";

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(
  date: moment.MomentInput,
  format: string = "DD/MM/YYYY"
) {
  if (!date) return "";

  return moment(date).utc().format(format);
}

export function formatDateInLocalTimezone(
  date: moment.MomentInput,
  format: string = "DD/MM/YYYY"
) {
  if (!date) return "";

  return moment(date).format(format);
}
export function convertToSearchParamsString(params: any) {
  const searchParams = new URLSearchParams();

  // Add key-value pairs to the URLSearchParams object
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }

  // Get the search parameters string
  const searchString = searchParams.toString();

  return searchString;
}

export function removeHtmlTags(inputString: string) {
  if (!inputString) return "";
  return inputString.replace(/<\/?[^>]+(>|$)/g, "");
}

export function truncateString(inputString: string, maxLength: number): string {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength - 3) + "...";
  }
}

type ObjectWithStringValues = { [key: string]: string | number };

export function objectToQueryString(obj: ObjectWithStringValues): string {
  return Object.keys(obj)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`
    )
    .join("&");
}
export function convertToSlug(title: string) {
  // Convert to lowercase and replace spaces with dashes
  let slug = title.toLowerCase().replace(/\s+/g, "-");

  // Remove special characters
  slug = slug.replace(/[^\w-]/g, "");

  return slug;
}
