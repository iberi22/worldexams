import type { APIRoute } from "astro";
import {
  getRuntimeEnvObject,
  type RuntimeLocals,
} from "../../lib/server-runtime";

const PUBLIC_WORKER_BASE_URL = "https://api.saberparatodos.space";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
  "Access-Control-Max-Age": "86400",
};

function getPublicWorkerBaseUrl(locals?: RuntimeLocals) {
  const runtimeEnv = getRuntimeEnvObject(locals);
  const configured = String(
    runtimeEnv.PUBLIC_API_BASE_URL ||
      import.meta.env.PUBLIC_API_BASE_URL ||
      "",
  ).trim();

  if (configured && configured !== "/api") {
    return configured.replace(/\/+$/, "").replace(/\/v1$/, "");
  }

  return PUBLIC_WORKER_BASE_URL;
}

function defaultExamForCountry(country: string) {
  const normalized = country.trim().toLowerCase();
  if (normalized === "co" || normalized === "colombia") return "icfes";
  if (normalized === "mx" || normalized === "mexico") return "exani";
  if (normalized === "ar" || normalized === "argentina") return "aprender";
  if (normalized === "br" || normalized === "brasil" || normalized === "brazil") {
    return "enem";
  }
  return "";
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
};

export const GET: APIRoute = async ({ request, locals }) => {
  const requestUrl = new URL(request.url);
  const country = String(
    requestUrl.searchParams.get("country") || locals.countryCode || "",
  ).toLowerCase();
  const exam = String(
    requestUrl.searchParams.get("exam") || defaultExamForCountry(country),
  ).toLowerCase();

  if (country && !requestUrl.searchParams.has("country")) {
    requestUrl.searchParams.set("country", country);
  }
  if (exam && !requestUrl.searchParams.has("exam")) {
    requestUrl.searchParams.set("exam", exam);
  }

  const upstreamUrl = new URL(`${getPublicWorkerBaseUrl(locals as RuntimeLocals)}/v1/questions`);
  requestUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
  });

  return Response.redirect(upstreamUrl.toString(), 307);
};
