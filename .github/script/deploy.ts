import { parseArgs } from "util";

const { values } = parseArgs({
    args: Bun.argv,
    options: {
        'internal-key': {
            type: 'string'
        },
        'tag': {
            type: 'string'
        }
    },
    allowPositionals: true,
    strict: false
});

if (
    !("internal-key" in values) ||
    typeof (values['internal-key']) !== "string" ||
    !("tag" in values) ||
    typeof (values['tag']) !== "string"
) {
    process.exit(1);
}

const response = await fetch('https://deploy.taiko.wiki/main', {
    method: 'post',
    headers: {
        'x-internal-key': values['internal-key']
    },
    body: JSON.stringify({
        tag: values['tag']
    })
});

console.log(response.status);
if (response.status !== 200) {
    process.exit(1);
}

process.exit();