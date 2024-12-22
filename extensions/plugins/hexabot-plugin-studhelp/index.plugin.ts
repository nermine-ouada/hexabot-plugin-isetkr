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
export class StudentHelpPlugin extends BaseBlockPlugin<typeof SETTINGS> {
  template: PluginBlockTemplate = {
    patterns: ['mental_health'],
    starts_conversation: true,
    name: 'Student Mental Health Plugin',
  };

  constructor(
    pluginService: PluginService,
    private readonly blockService: BlockService,
    private readonly settingService: SettingService,
  ) {
    super('studhelp-plugin', pluginService);
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

    const supportiveMessage = this.blockService.getRandom([...args.supportive_messages]);

    const response: string = supportiveMessage;

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