// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "@sveltekit-board/oauth";
import type { User as UserModule } from '$lib/module/user'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User<any>,
			userData: UserModule.Data | null,
			headers: Record<string, any>
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
