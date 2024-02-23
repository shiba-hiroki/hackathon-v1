export const uint8ArrayToBase64 = (uint8Array: number[]) =>
	btoa(String.fromCharCode.apply(null, uint8Array));

export const Base64ToUint8Array = (base64String: string) =>
	new Uint8Array(
		atob(base64String)
			.split("")
			.map((char) => char.charCodeAt(0)),
	);
