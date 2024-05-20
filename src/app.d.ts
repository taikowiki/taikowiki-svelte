// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "@sveltekit-board/oauth";
import type { UserBasicData, UserData } from "./lib/module/common/user/types";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User<any>,
			userBasicData?: UserBasicData,
			userData?: UserData
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
