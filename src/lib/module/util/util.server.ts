import type { RequestEvent } from "@sveltejs/kit";
import { Util } from ".";
import { QueryBuilder } from "@yowza/db-handler";

namespace UtilServer {
    export function getClientAddress(event: RequestEvent) {
        return event.request.headers.get('x-forwarded-for') || event.getClientAddress();
    }


    export const queryBuilder = new QueryBuilder({
        'ban/auth': {
            id: ['number'],
            provider: ['string'],
            providerId: ['string']
        },
        'ban/donder': {
            id: ['number'],
            taikoNumber: ['string']
        },
        'ban/ip': {
            order: ['number'],
            time: ['date'],
            ip: ['string']
        },
        banner: {
            type: ['string'],
            data: ['string']
        },
        dani: {
            order: ['number'],
            version: ['string'],
            data: ['string']
        },
        diffchart: {
            order: ['number'],
            name: ['string'],
            level: ['number', 'null'],
            type: ['string', 'null'],
            data: ['string'],
            comment: ['string', 'null']
        },
        docs: {
            id: ['number'],
            title: ['string'],
            type: ['string'],
            editableGrade: ['number'],
            editorUUID: ['string', 'null'],
            editorIp: ['string'],
            comment: ['string'],
            contentTree: ['string', 'null'],
            renderedContentTree: ['string', 'null'],
            flattenedContent: ['string', 'null'],
            songNo: ['string', 'null'],
            redirectTo: ['number', 'null'],
            createdTime: ['date'],
            editedTime: ['date'],
            isDeleted: ['number'],
            version: ['number'],
            diffIncrease: ['number', 'null'],
            diffDecrease: ['number', 'null']
        },
        'docs/log': {
            LID: ['number'],
            id: ['number'],
            title: ['string'],
            type: ['string'],
            editableGrade: ['number'],
            editorUUID: ['string'],
            editorIp: ['string'],
            comment: ['string'],
            contentTree: ['string', 'null'],
            renderedContentTree: ['string', 'null'],
            flattenedContent: ['string', 'null'],
            songNo: ['string', 'null'],
            redirectTo: ['number', 'null'],
            createdTime: ['date'],
            editedTime: ['date'],
            isDeleted: ['number'],
            version: ['number'],
            diffIncrease: ['number', 'null'],
            diffDecrease: ['number', 'null']
        },
        'file/log': {
            order: ['number'],
            time: ['date'],
            UUID: ['string'],
            originalFileName: ['string'],
            fileName: ['string']
        },
        'gamecenter/data': {
            order: ['number'],
            name: ['string'],
            address: ['string'],
            amenity: ['string'],
            businessHours: ['string'],
            machines: ['string'],
            region: ['string'],
            x: ['number', 'null'],
            y: ['number', 'null'],
            favoriteCount: ['number']
        },
        'gamecenter/report': {
            order: ['number'],
            UUID: ['string'],
            requestTime: ['date'],
            ip: ['string'],
            data: ['string'],
            status: ['string']
        },
        log: {
            order: ['number'],
            UUID: ['string', 'null'],
            ip: ['string'],
            path: ['string'],
            time: ['date']
        },
        notice: {
            order: ['number'],
            title: ['string'],
            content: ['string'],
            writtenDate: ['date'],
            type: ['string'],
            officialDate: ['date', 'null']
        },
        'poll/answer': {
            dataId: ['number'],
            responserUUID: ['string'],
            sectionIndex: ['number'],
            value: ['string']
        },
        'poll/data': {
            id: ['number'],
            until: ['date'],
            memo: ['string', 'null']
        },
        'poll/option': {
            dataId: ['number'],
            optionIndex: ['number', 'null'],
            sectionIndex: ['number'],
            type: ['number'],
            value: ['string', 'null']
        },
        'poll/section': {
            dataId: ['number'],
            question: ['string'],
            sectionIndex: ['number'],
            useFree: ['number']
        },
        song: {
            songNo: ['string'],
            order: ['number'],
            title: ['string'],
            titleKo: ['string', 'null'],
            aliasKo: ['string', 'null'],
            titleEn: ['string', 'null'],
            aliasEn: ['string', 'null'],
            romaji: ['string', 'null'],
            bpm: ['string'],
            bpmShiver: ['number'],
            version: ['string'],
            isAsiaBanned: ['number'],
            isKrBanned: ['number'],
            genre: ['string'],
            artists: ['string'],
            addedDate: ['number', 'null'],
            courses: ['string'],
            isDeleted: ['number']
        },
        'song/log': {
            order: ['number'],
            songNo: ['string'],
            before: ['string', 'null'],
            after: ['string'],
            updatedTime: ['number']
        },
        'song/request': {
            order: ['number'],
            UUID: ['string'],
            ip: ['string'],
            songNo: ['string'],
            createdTime: ['number'],
            type: ['string'],
            data: ['string'],
            status: ['string']
        },
        'user/api_key': {
            order: ['number'],
            UUID: ['string'],
            key: ['string']
        },
        'user/data': {
            order: ['number'],
            provider: ['string'],
            providerId: ['string'],
            nickname: ['string'],
            UUID: ['string'],
            grade: ['number'],
            registerTime: ['number'],
            registerTimeStamp: ['date'],
            providerUserData: ['string', 'null'],
            lang: ['string'],
            showRatingNickname: ['number'],
            showRatingTaikoNo: ['number'],
            showRatingSongs: ['number']
        },
        'user/donder_data': {
            order: ['number'],
            UUID: ['string'],
            donder: ['string'],
            clearData: ['string', 'null'],
            scoreData: ['string', 'null'],
            currentRating: ['number', 'null'],
            currentExp: ['number', 'null'],
            ratingHistory: ['string'],
            expHistory: ['string'],
            lastUpdate: ['date'],
            ratingData: ['string', 'null'],
            lastRatingCalculate: ['date', 'null']
        },
        'user/gamecenter_favorites': {
            order: ['number'],
            UUID: ['string'],
            favorites: ['string']
        }
    });

    export const internalRequestor = {
        async deleteUserRating(UUID: string): Promise<Util.RequestorResponse<void>> {
            const response = await fetch(new URL('/api/internal/delete-user', process.env.INTERNAL_RATING_ADDRESS), {
                method: 'post',
                headers: {
                    'X-Internal-Key': process.env.INTERNAL_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UUID
                })
            });

            if (200 <= response.status && response.status < 300) {
                return {
                    status: 'success'
                }
            }
            else {
                return {
                    status: 'error'
                }
            }
        }
    }
}

type P = typeof UtilServer;
export type { P as UtilServer };
Util.Server = UtilServer;

export { Util };