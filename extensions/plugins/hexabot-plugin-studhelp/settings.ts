import { PluginSetting } from '@/plugins/types';
import { SettingType } from '@/setting/schemas/types';

export default [
  {
    label: 'supportive_messages',
    group: 'default',
    type: SettingType.multiple_text,
    value: [
      'Remember to take breaks and relax. Your mental health is important!',
      'If you are feeling overwhelmed, talk to someone you trust.',
      'Stay positive and keep pushing forward. You are doing great!',
      'It’s okay to ask for help. You are not alone.',
    ],
  },
] as const satisfies PluginSetting[];