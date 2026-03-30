import { defineDBHandler } from "@yowza/db-handler";

export async function load(){
    return {
        fileLog: await getFileLog()
    }
}

const getFileLog = defineDBHandler<[], FileLog[]>(() => {
    return async(run) => {
        return await run("SELECT * FROM `file/log` ORDER BY `order` DESC LIMIT 300");
    }
})

interface FileLog{
    originalFileName: string;
    fileName: string
}