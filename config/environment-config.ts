import { config as baseConfig } from "../wdio.conf"

export const configs = Object.assign(baseConfig, {
    environments: "QA",
    douglasURL: "https://www.douglas.de/de",
});
