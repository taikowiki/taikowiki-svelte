import { Doc } from ".";
import { docDBController } from "./server/dbController.server";
import * as prepare from './server/prepare';

namespace DocServer {
    export const DBController = docDBController;
    export const setWikiLinkAvailable = prepare.setWikiLinkAvailable;
    export const prepareParagraphs = prepare.prepareParagraphs;
}

Doc.Server = DocServer;

export { Doc };