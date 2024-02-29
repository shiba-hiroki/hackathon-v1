const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) =>
	btoa(
		String.fromCharCode.apply(null, Array.from(new Uint8Array(arrayBuffer))),
	);

const base64ToUint8Array = (base64String: string) =>
	new Uint8Array(
		atob(base64String)
			.split("")
			.map((char) => char.charCodeAt(0)),
	);

const getCryptKey = (encryptionKey: string) =>
	crypto.subtle.importKey(
		"raw",
		base64ToUint8Array(encryptionKey),
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		["encrypt", "decrypt"],
	);

export const hashedPassword = async (
	initializationVector: string,
	encryptionKey: string,
	password: string,
) =>
	arrayBufferToBase64(
		await crypto.subtle.encrypt(
			{ name: "AES-GCM", iv: base64ToUint8Array(initializationVector) },
			await getCryptKey(encryptionKey),
			new TextEncoder().encode(password),
		),
	);

export const decodePassword = async (
	initializationVector: string,
	encryptionKey: string,
	hashedPassword: string,
) =>
	new TextDecoder("utf-8").decode(
		await crypto.subtle.decrypt(
			{ name: "AES-GCM", iv: base64ToUint8Array(initializationVector) },
			await getCryptKey(encryptionKey),
			base64ToUint8Array(hashedPassword),
		),
	);
