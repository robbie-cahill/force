import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const locales = ["en-US", "de-DE"]

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    // backend: {
    //   loadPath: "assets/locales/{{lng}}/{{ns}}.json",
    // },
    resources: {
      ["en-US"]: {
        translation: {
          navbar: {
            show: "Show",
            shows: "Shows",
            buy: "Buy",
            artists: "Artists",
            artworks: "Artworks",
            galleries: "Galleries",
            auctions: "Auctions",
            fairs: "Fairs",
            museums: "Museums",
            viewingRooms: "Viewing Rooms",
            nfts: "NFTs",
            signup: "Sign up",
            login: "Log In",
            sell: "Sell",
            priceDatabase: "Price Database",
            editorial: "Editorial",
            downloadApp: "Download App",
            searchBy: "Search by artist, gallery, style, theme, tag, etc.",
            searchArtsy: "Search Artsy",
          },
        },
      },
    },
    detection: {
      order: ["querystring"],
      lookupQuerystring: "locale",
    },
    supportedLngs: locales,
    fallbackLng: locales[0],
    defaultNS: "translation",
    fallbackNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  })
