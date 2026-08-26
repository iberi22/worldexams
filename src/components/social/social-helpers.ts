/**
 * WX-302 helpers — pure functions testables sin runtime Astro
 * Usados por tests/social/*.test.ts
 */

export interface ThreadNode {
  id?: string;
  content: string;
  node_hash: string;
  vote_count: number;
  replies: ThreadNode[];
  created_at?: string;
}

export interface ExplanationLite {
  id: string;
  content: string;
  node_hash: string;
  vote_count: number;
  question_id?: string;
  created_at?: string;
}

/** Selecciona la explicación con mayor vote_count (tie-breaker newest). */
export function getBestExplanation(explanations: ExplanationLite[]): ExplanationLite | null {
  if (!explanations || explanations.length === 0) return null;
  let best = explanations[0];
  for (const e of explanations) {
    if (e.vote_count > best.vote_count) best = e;
    else if (e.vote_count === best.vote_count && e.created_at && best.created_at) {
      if (new Date(e.created_at).getTime() > new Date(best.created_at).getTime()) best = e;
    }
  }
  return best;
}

/** Aplana un árbol de threads en lista plana (DFS). */
export function flattenThreads(threads: ThreadNode[]): ThreadNode[] {
  const out: ThreadNode[] = [];
  const walk = (nodes: ThreadNode[]) => {
    for (const n of nodes) {
      out.push(n);
      if (n.replies && n.replies.length > 0) walk(n.replies);
    }
  };
  walk(threads);
  return out;
}

/** Cuenta total de nodos incluyendo anidados. */
export function countAllReplies(threads: ThreadNode[]): number {
  return flattenThreads(threads).length;
}

/** Genera HTML simplificado de un thread (para test de render) — sin Astro runtime. */
export function renderThreadHTML(explanation: ExplanationLite, threads: ThreadNode[]): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  let html = `<article data-explanation-id="${esc(explanation.id)}">`;
  html += `<div data-role="content">${esc(explanation.content)}</div>`;
  html += `<span data-vote-count>${explanation.vote_count}</span>`;
  html += `<button data-action="cite">Citar</button><button data-action="expand">Ampliar</button>`;
  html += `</article>`;
  if (threads.length > 0) {
    html += `<div data-thread-list>`;
    const renderNode = (node: ThreadNode): string => {
      let h = `<div data-thread-node><div data-role="node-content">${esc(node.content)}</div>`;
      h += `<span data-node-vote>${node.vote_count}</span>`;
      h += `<button data-action="cite">Citar</button><button data-action="expand">Ampliar</button>`;
      if (node.replies && node.replies.length > 0) {
        h += `<div data-nested-replies>`;
        for (const r of node.replies) h += renderNode(r);
        h += `</div>`;
      }
      h += `</div>`;
      return h;
    };
    for (const t of threads) html += renderNode(t);
    html += `</div>`;
  } else {
    html += `<p data-testid="no-threads">Sin hilos aún</p>`;
  }
  return html;
}

/** Genera HTML de banner para test */
export function renderBestBannerHTML(explanations: ExplanationLite[]): string {
  const best = getBestExplanation(explanations);
  if (!best) return `<div data-testid="best-explanation-banner" data-has-best="false"><span data-testid="best-badge">Vacante</span><p data-testid="best-empty">Aún no hay</p></div>`;
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<div data-testid="best-explanation-banner" data-has-best="true"><span data-testid="best-badge">${best.vote_count > 0 ? 'Destacada' : 'Sin votos'}</span><p data-testid="best-content">${esc(best.content)}</p><span data-testid="best-vote-count">${best.vote_count}</span><button data-testid="best-vote-btn">Votar ▲</button></div>`;
}
