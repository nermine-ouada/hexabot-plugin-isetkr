import { PluginSetting } from '@/plugins/types';
import { SettingType } from '@/setting/schemas/types';

export default [
  {
    label: 'response_message',
    group: 'default',
    type: SettingType.multiple_text,
    value: ['Time now is: ', 'Right now it\'s: '],
  },
  {
    label: 'rest_message',
    group: 'default',
    type: SettingType.multiple_text,
    value: [
      "It's late, you should consider getting some rest.",
      "Good morning! Have a great day ahead.",
      "Good afternoon! Keep up the good work.",
      "Good evening! Hope you had a productive day.",
    ],
  },
] as const satisfies PluginSetting[];