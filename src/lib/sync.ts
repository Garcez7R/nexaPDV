import { queueSync } from "./persistence";
import type { SyncOperation } from "./types";

type RegistrationWithSync = ServiceWorkerRegistration & {
  sync: {
    register(tag: string): Promise<void>;
  };
};

export async function scheduleSync(operation: SyncOperation) {
  await queueSync(operation);

  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    if ("sync" in registration) {
      const syncRegistration = registration as RegistrationWithSync;
      await syncRegistration.sync.register("nexa-sync");
    }
  }
}
