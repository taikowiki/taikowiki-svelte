// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "@sveltekit-board/oauth";
import type { UserBasicData } from "./lib/module/common/user/user-controller.server";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User<any>,
			userBasicData?: UserBasicData
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
