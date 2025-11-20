// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "@sveltekit-board/oauth";
import type { User as UserModule } from '$lib/module/user'

declare global {
	namespace App {
		interface Error {
			reason?: string;
		}
		interface Locals {
			user?: User<any>,
			userData: UserModule.Data | null,
			//headers: Record<string, any>
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	declare namespace NodeJS {
		interface ProcessEnv {
			DB_HOST: string;
			DB_DATABASE: string;
			DB_USER: string;
			DB_PASSWORD: string;
			DB_SERVICE: string;
			DB_TIMEZONE: string;
			KAKAO_JAVASCRIPT_KEY: string;
			AUTH_KEY: string;
			TIMEZONE: string;
		}
	}
}

export { };
