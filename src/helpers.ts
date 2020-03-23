export function assert(condition: boolean, message?: string): asserts condition {
	if (!condition) {
		throw new Error('Assertion failed' + (message ? ': ' + message : ''));
	}
}

export function hasFilter(input: Set<string> | undefined): input is Set<string> {
	return Boolean(input && input.size);
}

export function applyFilter(ids: string[] = [], filter: Set<string> | undefined): string[] {
	if (hasFilter(filter)) {
		return ids.filter((i: string) => filter.has(i));
	} else {
		return ids;
	}
}
