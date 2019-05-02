/**
 * Set production properties
 */
module.exports = {

    /**
     * Application base.
     *
     * - Set path from domain name to application. Starting and ending with slash.
     * - ex :
     *        If application is installed here : http://domain.com/my-sub-folder/my-app/
     *        Base should be : "/my-sub-folder/my-app/"
     * - ex :
     *        If application is installed here : http://domain.com/
     *        Base should be : "/"
     */

    base: '/',

    // assets are serve on this url
    // keep relative URL about staging and production
    url: '/',

    /**
     * Les propriété du dotEnv.
     * Va overrider les propriété par défauts
     */
    dotEnv: Object.assign(
        {},
        require('./default.properties').dotEnv,
        {
            // Activer le mode debug
            WP_ENV: "local",
            WP_DEBUG: "true",

            // Cibler le chemin complet vers point d'entrée wordpress (dist/public)
            // Pas de slash à la fin
            WP_URL: "",

            // Cibler le chemin complet vers point d'entrée wordpress (dist/public)
            // Pas de slash à la fin
            WP_URL: "",
            WP_SITEURL:"",
        }
    )
};
