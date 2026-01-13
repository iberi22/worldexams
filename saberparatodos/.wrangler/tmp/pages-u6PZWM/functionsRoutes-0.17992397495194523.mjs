import { onRequest as __api_packs_current_ts_onRequest } from "E:\\scripts-python\\worldexams\\saberparatodos\\functions\\api\\packs\\current.ts"
import { onRequestPost as __api_report_problem_ts_onRequestPost } from "E:\\scripts-python\\worldexams\\saberparatodos\\functions\\api\\report_problem.ts"
import { onRequest as ___middleware_ts_onRequest } from "E:\\scripts-python\\worldexams\\saberparatodos\\functions\\_middleware.ts"

export const routes = [
    {
      routePath: "/api/packs/current",
      mountPath: "/api/packs",
      method: "",
      middlewares: [],
      modules: [__api_packs_current_ts_onRequest],
    },
  {
      routePath: "/api/report_problem",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_report_problem_ts_onRequestPost],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]