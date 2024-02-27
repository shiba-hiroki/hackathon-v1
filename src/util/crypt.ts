import { Base64ToUint8Array } from "./arrayBuffer";

export const getCryptKey = (encryptionKey: string) =>
	crypto.subtle.importKey(
		"raw",
		Base64ToUint8Array(encryptionKey),
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		["encrypt", "decrypt"],
	);
