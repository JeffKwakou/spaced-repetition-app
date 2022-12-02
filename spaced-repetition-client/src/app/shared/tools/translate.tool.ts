import { TranslateService } from "@ngx-translate/core";
import { AppInjector } from "src/app/app.injector";

export class Translate {
    public static get(keys: string | Array<string>, params?: {}): string {
        return AppInjector.get(TranslateService).instant(keys, params);
    }
}