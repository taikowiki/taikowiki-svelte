import type { Handle } from "@sveltejs/kit";
import { redirect, error } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

interface PermissionCheckerOption {
    path: string,
    level: number,
    rule: 'match' | 'startsWith',
    redirectPath?: string
}

function createPermissionChecker(path: string, level: number, rule: 'match' | 'startsWith', redirectPath?: string): Handle {
    return async function (input) {
        const { locals, url } = input.event;

        switch (rule) {
            case ("match"): {
                if (url.pathname !== path) {
                    return await input.resolve(input.event);
                }
                break;
            }
            case ("startsWith"): {
                if (!url.pathname.startsWith(path)) {
                    return await input.resolve(input.event);
                }
                break;
            }
        }

        if (!locals.user) {
            if (!redirectPath) {
                throw error(403, "You have no permission to access to this page");
            }

            const param = new URLSearchParams({
                redirect_to: url.origin + path
            }).toString()

            throw redirect(302, url.origin + redirectPath + "?" + param)
        }

        if (!locals.userData) {
            throw error(403, "You have no permission to access to this page");
        }

        if(locals.userData.grade < level){
            throw error(401, "You have no permission to access to this page");
        }

        return await input.resolve(input.event);
    }
}

export default function checkPermissions(options: PermissionCheckerOption[]): Handle {
    return sequence(...options.map(option => createPermissionChecker(option.path, option.level, option.rule, option.redirectPath)))
}