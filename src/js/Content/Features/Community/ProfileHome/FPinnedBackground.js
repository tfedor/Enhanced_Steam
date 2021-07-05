import {Feature} from "../../../modulesContent";

export default class FPinnedBackground extends Feature {

    checkPrerequisites() {
        return document.body.classList.contains("has_profile_background");
    }

    apply() {

        const animatedBgNode = document.querySelector(".profile_animated_background");
        if (animatedBgNode) {
            animatedBgNode.style.position = "fixed";
        } else { // For static bgs, add its own element so it can scroll independently

            const bgNode = document.createElement("div");
            bgNode.classList.add("as_profile_static_background");

            const profilePage = document.querySelector(".no_header.profile_page");
            bgNode.style.cssText = profilePage.style.cssText; // Copy background-image from inline style
            profilePage.style.cssText = "";

            profilePage.insertAdjacentElement("afterbegin", bgNode);
        }
    }
}
