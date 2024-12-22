import { Injectable } from '@nestjs/common';
import { BlockService } from '@/chat/services/block.service';
import { SettingService } from '@/setting/services/setting.service';
import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import {
  OutgoingMessageFormat,
  StdOutgoingEnvelope,
  StdOutgoingTextEnvelope,
} from '@/chat/schemas/types/message';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';

import SETTINGS from './settings';

@Injectable()
export class CurrentTimePlugin extends BaseBlockPlugin<typeof SETTINGS> {
  template: PluginBlockTemplate = {
    // default trigger for your custom block
    patterns: ['time'],
    // if set to true then your block comes as entrypoint by default
    starts_conversation: true,
    // displayed name for your plugin
    name: 'Current Time Plugin',
  };

  constructor(
    pluginService: PluginService,
    private readonly blockService: BlockService,
    private readonly settingService: SettingService,
  ) {
    super('currenttime-plugin', pluginService);
  }

  getPath(): string {
    return __dirname;
  }

  async process(
    block: Block,
    context: Context,
    _convId: string,
  ): Promise<StdOutgoingEnvelope> {
    const settings = await this.settingService.getSettings();
    const args = this.getArguments(block);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    const currentHour = now.getHours();

    let restMessage: string;
    if (currentHour >= 22 || currentHour < 6) {
      restMessage = "It's late, you should consider getting some rest.";
    } else if (currentHour >= 6 && currentHour < 12) {
      restMessage = "Good morning! Have a great day ahead.";
    } else if (currentHour >= 12 && currentHour < 18) {
      restMessage = "Good afternoon! Keep up the good work.";
    } else {
      restMessage = "Good evening! Hope you had a productive day.";
    }

    const response: string =
      this.blockService.getRandom([...args.response_message]) +
      ' ⌚ ' +
      formattedTime +
      '. ' +
      restMessage;

    const msg: StdOutgoingTextEnvelope = {
      format: OutgoingMessageFormat.text,
      message: {
        text: this.blockService.processText(
          response,
          context,
          {},
          settings,
        ),
      },
    };

    return msg;
  }
}