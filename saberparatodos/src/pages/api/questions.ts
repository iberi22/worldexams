import type { APIRoute } from "astro";
import { getCountryExamSlug, resolveRuntimeCountryConfig } from "../../config";
import { getLocalGrade11Questions } from "../../lib/questions/grade11-local-bank";
import { filterQuarantinedQuestions } from "../../lib/questions/quarantine-registry";
import {
  getRuntimeEnvObject,
  type RuntimeLocals,
} from "../../lib/server-runtime";

const ANCHOR_DATE_MS = Date.parse("2025-01-01T00:00:00Z");
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getEnv(locals?: RuntimeLocals) {
  const runtimeEnv = getRuntimeEnvObject(locals);
  const publicWorkerBaseUrl = "https://api.saberparatodos.space";

  const publicApiBaseUrl =
    runtimeEnv.PUBLIC_API_BASE_URL ||
    import.meta.env.PUBLIC_API_BASE_URL ||
    "/api";

  return {
    publicApiBaseUrl: String(publicApiBaseUrl || ""),
    publicWorkerBaseUrl,
  };
}

function normalizeSubjectKey(subject: string) {
  const normalized = String(subject || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "");

  const aliasMap: Record<string, string> = {
    socialesyciudadanas: "sociales_y_ciudadanas",
    sociales_ciudadanas: "sociales_y_ciudadanas",
    sociales_y_ciudadanas: "sociales_y_ciudadanas",
    sociales: "sociales",
    cienciasnaturales: "ciencias_naturales",
    ciencias_naturales: "ciencias_naturales",
    ciencias: "ciencias_naturales",
    lectura_critica: "lectura_critica",
    lecturacritica: "lectura_critica",
    lenguaje: "lectura_critica",
    tecnologiaeinformatica: "tecnologia_informatica",
    tecnologiainformatica: "tecnologia_informatica",
    english: "ingles",
    matematica: "matematicas",
  };

  return aliasMap[normalized] || normalized;
}

function getCountryPackPrefixes(country: string) {
  const normalized = String(country || "").trim().toLowerCase();
  const aliases: Record<string, string[]> = {
    co: ["co"],
    colombia: ["co"],
    mx: ["mx"],
    mexico: ["mx"],
    ar: ["ar"],
    argentina: ["ar"],
    br: ["br"],
    brasil: ["br"],
    brazil: ["br"],
    cl: ["cl", "chile"],
    chile: ["cl", "chile"],
    pe: ["pe", "peru"],
    peru: ["pe", "peru"],
    ec: ["ec"],
    ecuador: ["ec"],
    pa: ["panama"],
    panama: ["panama"],
    cr: ["costa-rica"],
    "costa-rica": ["costa-rica"],
    gt: ["guatemala"],
    guatemala: ["guatemala"],
    do: ["dominican_republic"],
    "dominican-republic": ["dominican_republic"],
    dominican_republic: ["dominican_republic"],
    sv: ["el-salvador"],
    "el-salvador": ["el-salvador"],
    hn: ["honduras"],
    honduras: ["honduras"],
    ni: ["nicaragua"],
    nicaragua: ["nicaragua"],
    es: ["spain"],
    spain: ["spain"],
    pr: ["puerto-rico"],
    "puerto-rico": ["puerto-rico"],
    gq: ["guinea-ecuatorial"],
    "guinea-ecuatorial": ["guinea-ecuatorial"],
    uy: ["uruguay"],
    uruguay: ["uruguay"],
    py: ["paraguay"],
    paraguay: ["paraguay"],
    bo: ["bolivia"],
    bolivia: ["bolivia"],
  };

  return aliases[normalized] || (normalized ? [normalized] : []);
}

function getSubjectPackAliases(subject: string) {
  const normalized = normalizeSubjectKey(subject);
  const aliases = new Set([normalized]);

  if (normalized === "matematicas") aliases.add("matematica");
  if (normalized === "matematica") aliases.add("matematicas");
  if (normalized === "lectura_critica") {
    aliases.add("lengua");
    aliases.add("lenguaje");
  }
  if (normalized === "lengua" || normalized === "lenguaje") {
    aliases.add("lectura_critica");
  }

  return Array.from(aliases).filter(Boolean);
}

function getCurrentWeek() {
  const elapsed = Math.max(0, Date.now() - ANCHOR_DATE_MS);
  const week = Math.ceil(elapsed / ONE_WEEK_MS);
  return ((week - 1) % 52) + 1;
}

function normalizePackOption(option: any) {
  const rawText = String(option?.text || "");
  const feedbackMatch = rawText.match(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/);
  return {
    ...option,
    text: rawText.replace(/<!--\s*feedback:[\s\S]*?-->/, "").trim(),
    feedback: String(option?.feedback || feedbackMatch?.[1] || "").trim(),
  };
}

function normalizePackQuestion(question: any) {
  if (!Array.isArray(question?.options)) return question;
  return {
    ...question,
    options: question.options.map(normalizePackOption),
  };
}

function normalizeQuestionText(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function questionIdentityKey(question: any) {
  const id = normalizeQuestionText(question?.id ?? question?.question_id);
  if (id) return `id:${id}`;

  const bundleId = normalizeQuestionText(question?.bundle_id ?? question?.bundleId);
  const localId = normalizeQuestionText(question?.local_id ?? question?.questionId);
  if (bundleId && localId) return `bundle:${bundleId}:${localId}`;

  return "";
}

function questionSemanticKey(question: any) {
  const statement = normalizeQuestionText(
    question?.statement ||
      question?.enunciado ||
      question?.question ||
      question?.text ||
      question?.prompt,
  );
  if (!statement) return "";

  const options = Array.isArray(question?.options)
    ? question.options
        .map((option: any) => normalizeQuestionText(option?.text ?? option?.label ?? option))
        .filter(Boolean)
        .sort()
        .join("|")
    : "";

  return `semantic:${statement.slice(0, 240)}::${options.slice(0, 240)}`;
}

function dedupeQuestions<T>(questions: T[]) {
  const seenIdentity = new Set<string>();
  const seenSemantic = new Set<string>();
  const deduped: T[] = [];
  let duplicateCount = 0;

  for (const question of questions as any[]) {
    const identityKey = questionIdentityKey(question);
    const semanticKey = questionSemanticKey(question);
    const isDuplicate =
      (identityKey && seenIdentity.has(identityKey)) ||
      (semanticKey && seenSemantic.has(semanticKey));

    if (isDuplicate) {
      duplicateCount += 1;
      continue;
    }

    if (identityKey) seenIdentity.add(identityKey);
    if (semanticKey) seenSemantic.add(semanticKey);
    deduped.push(question as T);
  }

  return { questions: deduped, duplicateCount };
}

async function fetchUpstreamJson(
  url: URL,
  headers: Headers,
): Promise<Response> {
  return fetch(url.toString(), {
    method: "GET",
    headers,
  });
}

async function fetchSameOriginPackJson(
  requestUrl: URL,
  grade: number,
  subject: string,
  country?: string,
  locals?: any,
): Promise<Response | null> {
  const subjectKey = normalizeSubjectKey(subject || "matematicas");
  const subjectAliases = getSubjectPackAliases(subjectKey);
  const countryPrefixes = getCountryPackPrefixes(country || "");
  const weekCandidates = [getCurrentWeek(), 1];
  const candidates: string[] = [];

  for (const week of weekCandidates) {
    for (const subjectAlias of subjectAliases) {
      for (const prefix of countryPrefixes) {
        candidates.push(
          `/api/packs/${prefix}-week-${week}-grade-${grade}-subject-${subjectAlias}.json`,
        );
      }
      candidates.push(
        `/api/packs/week-${week}-grade-${grade}-subject-${subjectAlias}.json`,
      );
    }
  }

  // 1. Try using Cloudflare's local ASSETS binding (highly recommended in production)
  let cfEnv = null;
  try {
    // @ts-ignore
    const cf = await import("cloudflare:workers");
    cfEnv = cf.env;
  } catch {
    // Fail silently in non-Cloudflare environments
  }

  if (cfEnv && cfEnv.ASSETS) {
    for (const candidate of candidates) {
      try {
        // Use relative candidate URL to ensure zero external routing issues or loop protections
        const assetResponse = await cfEnv.ASSETS.fetch(
          new Request(
            new URL(candidate, "https://saberparatodos.space").toString(),
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            },
          ),
        );

        if (assetResponse.ok) return assetResponse;
      } catch (err) {
        console.error(
          "[fetchSameOriginPackJson] error reading from ASSETS binding",
          err,
        );
      }
    }
  }

  // 2. Fallback to traditional HTTP fetch (for local development)
  for (const candidate of candidates) {
    try {
      const response = await fetch(new URL(candidate, requestUrl.origin), {
        method: "GET",
        headers: {
          Accept: "application/json",
          Origin: "https://saberparatodos.space",
          Referer: "https://saberparatodos.space/",
        },
      });

      if (response.ok) return response;
    } catch (err) {
      console.error(
        "[fetchSameOriginPackJson] fallback fetch failed for",
        candidate,
        err,
      );
    }
  }

  return null;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // Relaxed for API subdomain, can be restricted to https://saberparatodos.space
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
  "Access-Control-Max-Age": "86400",
};

function buildJsonResponse(payload: unknown, upstreamResponse?: Response) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control":
        upstreamResponse?.headers.get("cache-control") || "public, max-age=60",
      ...CORS_HEADERS,
    },
  });
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
};

export const GET: APIRoute = async ({ request, locals }) => {
  const { publicWorkerBaseUrl } = getEnv(locals as RuntimeLocals);
  const requestUrl = new URL(request.url);
  const upstreamPath = "/v1/questions";
  const upstreamUrl = new URL(`${publicWorkerBaseUrl}${upstreamPath}`);
  const grade = Number(requestUrl.searchParams.get("grade") || 0);
  const requestedSubject = String(requestUrl.searchParams.get("subject") || "")
    .trim()
    .toLowerCase();
  const runtimeCountry = locals.country
    ? resolveRuntimeCountryConfig(locals.country as any)
    : undefined;
  const defaultCountry = String(
    requestUrl.searchParams.get("country") ||
      runtimeCountry?.code ||
      locals.countryCode ||
      "",
  ).toLowerCase();
  const defaultExam = String(
    requestUrl.searchParams.get("exam") ||
      (runtimeCountry ? getCountryExamSlug(runtimeCountry) : "") ||
      "",
  ).toLowerCase();

  requestUrl.searchParams.forEach((value, key) =>
    upstreamUrl.searchParams.set(key, value),
  );
  if (defaultCountry && !upstreamUrl.searchParams.has("country"))
    upstreamUrl.searchParams.set("country", defaultCountry);
  if (defaultExam && !upstreamUrl.searchParams.has("exam"))
    upstreamUrl.searchParams.set("exam", defaultExam);

  const headers = new Headers({
    Accept: "application/json",
    Origin: "https://saberparatodos.space",
    Referer: "https://saberparatodos.space/",
  });

  try {
    if (grade === 11) {
      const country = defaultCountry;
      const exam = defaultExam;
      const subject = requestedSubject;

      if (country === "co" && exam === "icfes") {
        const localQuestions = getLocalGrade11Questions(subject);
        if (localQuestions.length > 0) {
          const visibleLocalQuestions = dedupeQuestions(
            filterQuarantinedQuestions(localQuestions).map(normalizePackQuestion),
          );
          return buildJsonResponse({
            success: true,
            questions: visibleLocalQuestions.questions,
            total_questions: visibleLocalQuestions.questions.length,
            grade: 11,
            subject: subject || null,
            country,
            exam_type: exam,
            page: "all",
            meta: {
              aggregated_pages: 1,
              duplicate_filtered: visibleLocalQuestions.duplicateCount,
              source: "local-grade11-bank",
            },
          });
        }
      }

      const aggregatedQuestions: any[] = [];
      let firstResponse: Response | null = null;
      const maxPages = 24;

      for (let page = 1; page <= maxPages; page++) {
        upstreamUrl.searchParams.set("page", String(page));
        const pageResponse = await fetchUpstreamJson(upstreamUrl, headers);

        if (!pageResponse.ok) {
          if (page === 1) {
            return new Response(pageResponse.body, {
              status: pageResponse.status,
              statusText: pageResponse.statusText,
              headers: {
                "Content-Type":
                  pageResponse.headers.get("content-type") ||
                  "application/json",
                "Cache-Control":
                  pageResponse.headers.get("cache-control") ||
                  "public, max-age=60",
                ...CORS_HEADERS,
              },
            });
          }
          break;
        }

        const pagePayload = await pageResponse.json();
        const pageQuestions = Array.isArray(pagePayload?.questions)
          ? pagePayload.questions
          : [];
        if (!firstResponse) firstResponse = pageResponse;
        if (pageQuestions.length === 0) break;

        aggregatedQuestions.push(...pageQuestions);

        if (pageQuestions.length < 10) break;
      }

      const dedupedQuestions = dedupeQuestions(
        filterQuarantinedQuestions(
          aggregatedQuestions.map(normalizePackQuestion),
        ).filter((question) => Boolean(question?.id)),
      );

      return buildJsonResponse(
        {
          success: true,
          questions: dedupedQuestions.questions,
          total_questions: dedupedQuestions.questions.length,
          grade: 11,
          subject: requestUrl.searchParams.get("subject") || null,
          country: defaultCountry || null,
          exam_type: defaultExam || null,
          page: "all",
          meta: {
            aggregated_pages: Math.ceil(dedupedQuestions.questions.length / 10),
            duplicate_filtered: dedupedQuestions.duplicateCount,
            source: "free-api-grade11-expanded",
          },
        },
        firstResponse || undefined,
      );
    }

    const packResponse = await fetchSameOriginPackJson(
      requestUrl,
      grade,
      requestedSubject,
      defaultCountry,
      locals,
    );
    if (packResponse?.ok) {
      const packPayload = await packResponse.json();
      const packQuestions = Array.isArray(packPayload?.questions)
        ? packPayload.questions
        : [];
      const page = Math.max(
        1,
        Number(requestUrl.searchParams.get("page") || "1") || 1,
      );
      const pageSize = 10;
      const dedupedQuestions = dedupeQuestions(
        filterQuarantinedQuestions(
          packQuestions.map(normalizePackQuestion),
        ),
      );
      const startIndex = (page - 1) * pageSize;
      const visibleQuestions = dedupedQuestions.questions.slice(
        startIndex,
        startIndex + pageSize,
      );

      return buildJsonResponse(
        {
          success: true,
          questions: visibleQuestions,
          total_questions: visibleQuestions.length,
          is_guest: true,
          country: defaultCountry || null,
          exam_type: defaultExam || null,
          grade,
          subject: normalizeSubjectKey(requestedSubject || "matematicas"),
          page,
          meta: {
            available_questions: packQuestions.length,
            deduplicated_questions: dedupedQuestions.questions.length,
            duplicate_filtered: dedupedQuestions.duplicateCount,
            source: "same-origin-pack-proxy",
          },
        },
        packResponse,
      );
    }

    const upstreamResponse = await fetchUpstreamJson(upstreamUrl, headers);
    if (!upstreamResponse.ok) {
      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: {
          "Content-Type":
            upstreamResponse.headers.get("content-type") || "application/json",
          "Cache-Control":
            upstreamResponse.headers.get("cache-control") ||
            "public, max-age=60",
          ...CORS_HEADERS,
        },
      });
    }

    const upstreamPayload = await upstreamResponse.json();
    const upstreamQuestions = Array.isArray(upstreamPayload?.questions)
      ? upstreamPayload.questions
      : [];
    const dedupedQuestions = dedupeQuestions(
      filterQuarantinedQuestions(upstreamQuestions.map(normalizePackQuestion)),
    );

    return buildJsonResponse(
      {
        ...upstreamPayload,
        questions: dedupedQuestions.questions,
        total_questions: dedupedQuestions.questions.length,
        meta: {
          ...(upstreamPayload?.meta || {}),
          duplicate_filtered: dedupedQuestions.duplicateCount,
        },
      },
      upstreamResponse,
    );
  } catch (error) {
    console.error("[api/questions] upstream error", error);
    return new Response(
      JSON.stringify({
        error: "UPSTREAM_UNAVAILABLE",
        message: "No fue posible consultar el servicio de preguntas.",
      }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          ...CORS_HEADERS,
        },
      },
    );
  }
};
