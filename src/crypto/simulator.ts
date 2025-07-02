import * as signal from '@privacyresearch/libsignal-protocol';

type Store = signal.SignalProtocolStore;

function createSignalStore(): Store {
  const obj: Record<string, unknown> = {};
  return {
    get: (key: string) => obj[key],
    put: (key: string, val: unknown) => { obj[key] = val; },
    remove: (key: string) => { delete obj[key]; },
  } as unknown as Store;
}

export async function generateContext(name: string) {
  const store = createSignalStore();
  const identityKeyPair = await signal.KeyHelper.generateIdentityKeyPair();
  const registrationId = await signal.KeyHelper.generateRegistrationId();
  store.put('identityKey', identityKeyPair);
  store.put('registrationId', registrationId);
  const address = new signal.SignalProtocolAddress(name, 1);
  return { store, identityKeyPair, registrationId, address };
}

export async function generateBobBundle(store: Store, identityKeyPair: any) {
  const preKey = await signal.KeyHelper.generatePreKey(1);
  const signedPreKey = await signal.KeyHelper.generateSignedPreKey(identityKeyPair, 1);
  return {
    identityKey: identityKeyPair.pubKey,
    registrationId: store.get('registrationId'),
    preKey: { keyId: preKey.keyId, publicKey: preKey.keyPair.pubKey },
    signedPreKey: { keyId: signedPreKey.keyId, publicKey: signedPreKey.keyPair.pubKey, signature: signedPreKey.signature },
  };
}