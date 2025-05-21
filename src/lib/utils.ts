import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { JwtToken } from "@/types/grispi.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload) as JwtToken;
}

export function convertPhoneNumber(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return digits.slice(-10);
}

export function formatDate(date: number): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString();
}

export function parseDotNetDateString(dateString: string): number | null {
  const match = /\/Date\((\d+)\)\//.exec(dateString);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export function formatDotNetDateString(dateString: string): string | null {
  const date = parseDotNetDateString(dateString);
  if (!date) return null;
  return formatDate(date);
}
