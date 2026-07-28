/**
 * SWAL instance identity (thin stub — not @swal/node yet).
 *
 * Plan:
 * - Persist a stable UUID in localStorage so this browser profile keeps the
 *   same WorldExams edge node across reloads.
 * - Future mesh namespace: `swal/worldexams/{instanceId}`
 * - When @swal/node lands, replace getOrCreateSwalInstanceId() with the
 *   official node bootstrap; keep the same storage key for continuity.
 */

const STORAGE_KEY = "swal.worldexams.instanceId";

function randomUuid(): string {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return crypto.randomUUID();
	}
	// SSR / older runtimes
	return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/** Returns existing instanceId or creates + persists one (browser only). */
export function getOrCreateSwalInstanceId(): string {
	if (typeof localStorage === "undefined") {
		return randomUuid();
	}

	try {
		const existing = localStorage.getItem(STORAGE_KEY);
		if (existing && existing.length >= 8) {
			return existing;
		}
		const created = randomUuid();
		localStorage.setItem(STORAGE_KEY, created);
		return created;
	} catch {
		// private mode / quota — ephemeral for this session
		return randomUuid();
	}
}

export function readSwalInstanceId(): string | null {
	if (typeof localStorage === "undefined") return null;
	try {
		return localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
}

export function swalWorldexamsNamespace(instanceId?: string): string {
	const id = instanceId ?? getOrCreateSwalInstanceId();
	return `swal/worldexams/${id}`;
}
