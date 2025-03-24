import { browserKeys } from "../helper/browser/browser-keys";
import { ElementControl } from "./element-control";

export class InputControl extends ElementControl {
    public async setValue(value: string): Promise<void> {
        await this.el.setValue(value);
    }

    public async clearValue(): Promise<void> {
        while ((await this.getValue()) !== '') {
            await this.el.click();
            for (let i = 0; i <= 10; i++) {
                await browserKeys(['Backspace']);
            }
        }
    }
}
