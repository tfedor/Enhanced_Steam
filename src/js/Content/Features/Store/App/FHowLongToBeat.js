import {HTML, Localization, SyncedStorage} from "../../../../modulesCore";
import {Feature} from "../../../modulesContent";
// import Config from "../../../../config";

export default class FHowLongToBeat extends Feature {

    async checkPrerequisites() {
        if (!SyncedStorage.get("showhltb") || this.context.isDlc()) {
            return false;
        }

        const result = await this.context.data;
        if (!result || !result.hltb) { return false; }

        // TODO remove when suggestion link is fixed
        if (!result.hltb.success) { return false; }

        return true;
    }

    async apply() {
        const data = (await this.context.data).hltb;

        // const suggestUrl = `${Config.PublicHost}/gamedata/hltb_link_suggest.php`;
        const icoImg = "//store.steampowered.com/public/images/v5/ico_external_link.gif";

        let html = `<div class="block responsive_apppage_details_right heading">${Localization.str.hltb.title}</div>
                    <div class="block game_details underlined_links es_hltb">
                    <div class="block_content"><div class="block_content_inner"><div class="details_block">`;

        if (data.success) {
            if (data.main_story) {
                html += `<b>${Localization.str.hltb.main}:</b><span>${HTML.escape(data.main_story)}</span><br>`;
            }
            if (data.main_extras) {
                html += `<b>${Localization.str.hltb.main_e}:</b><span>${HTML.escape(data.main_extras)}</span><br>`;
            }
            if (data.comp) {
                html += `<b>${Localization.str.hltb.compl}:</b><span>${HTML.escape(data.comp)}</span><br>`;
            }

            html += `</div>
                    <a class="linkbar" href="${HTML.escape(data.url)}" target="_blank">${Localization.str.more_information} <img src="${icoImg}"></a>
                    <a class="linkbar" href="${HTML.escape(data.submit_url)}" target="_blank">${Localization.str.hltb.submit} <img src="${icoImg}"></a>`;

            // html += `<a class="linkbar" href="${suggestUrl}" id="es_hltb_suggest">${Localization.str.hltb.wrong} ${Localization.str.hltb.help} <img src="${icoImg}"></a>`;
        } else {
            html += `${Localization.str.hltb.no_data}</div>`;
            // html += `<a class="linkbar" href="${suggestUrl}" id="es_hltb_suggest">${Localization.str.hltb.help} <img src="${icoImg}"></a>`;
        }

        html += "</div></div></div>";

        HTML.afterEnd("div.game_details", html);

        /*
         * document.querySelector("#es_hltb_suggest").addEventListener("click", () => {
         *    Background.action("storepagedata.expire", this.context.appid);
         * });
         */
    }
}
