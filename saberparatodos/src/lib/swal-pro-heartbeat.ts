/**
 * SWAL Pro heartbeat for WorldExams (second product adopting the @swal/node pattern).
 *
 * DoD apps: referencia `@swal/node` + backoffice + WorldExams local mirror.
 * Pro = identity + heartbeat; never Stripe.
 */

import {
	getOrCreateSwalInstanceId,
	swalWorldexamsNamespace,
} from "./swal-instance-id.ts";

export type WeNodeStatus = "inactive" | "starting" | "active" | "degraded";

export interface WeSwalNode {
	nodeId: string;
	instanceId: string;
	meshNamespace: string;
	status: WeNodeStatus;
	lastHeartbeatAt: number;
	xavierEndpoint: string;
}

export const DEFAULT_TTL_MS = 5 * 60 * 1000;

export function createWeInactiveNode(
	xavierEndpoint = "http://127.0.0.1:8006",
): WeSwalNode {
	const instanceId = getOrCreateSwalInstanceId();
	return {
		nodeId: `we-${instanceId.slice(0, 8)}`,
		instanceId,
		meshNamespace: swalWorldexamsNamespace(instanceId),
		status: "inactive",
		lastHeartbeatAt: 0,
		xavierEndpoint,
	};
}

export function beginWeNode(node: WeSwalNode): WeSwalNode {
	return { ...node, status: "starting", lastHeartbeatAt: 0 };
}

export function isWeProEnabled(node: WeSwalNode): boolean {
	return node.status === "active";
}

/** Mirror of `@swal/node` `applyHeartbeat` for WorldExams. */
export function applyWeHeartbeat(
	node: WeSwalNode,
	opts: { xavierReachable: boolean; nowMs?: number; ttlMs?: number },
): WeSwalNode {
	if (node.status === "inactive") {
		return node;
	}
	const now = opts.nowMs ?? Date.now();
	const status: WeNodeStatus = opts.xavierReachable ? "active" : "degraded";
	return { ...node, lastHeartbeatAt: now, status };
}

export async function probeXavier(baseUrl: string): Promise<boolean> {
	try {
		const res = await fetch(`${baseUrl.replace(/\/$/, "")}/health`);
		return res.ok;
	} catch {
		return false;
	}
}

/** Product loop (60s) — same pattern as `@swal/node` `startProHeartbeatLoop`. */
export function startWeHeartbeatLoop(opts: {
	getNode: () => WeSwalNode;
	onUpdate: (node: WeSwalNode) => void;
	intervalMs?: number;
}): { stop: () => void; tick: () => Promise<WeSwalNode> } {
	const intervalMs = opts.intervalMs ?? 60_000;
	let timer: ReturnType<typeof setInterval> | null = null;

	const tick = async (): Promise<WeSwalNode> => {
		const node = opts.getNode();
		if (node.status === "inactive") return node;
		const ok = await probeXavier(node.xavierEndpoint);
		const next = applyWeHeartbeat(node, { xavierReachable: ok });
		opts.onUpdate(next);
		return next;
	};

	timer = setInterval(() => {
		void tick();
	}, intervalMs);

	return {
		stop: () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		},
		tick,
	};
}
