import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Audio, AudioProps } from './Audio'

export default {
  title: 'Explorer/base/Audio',
  args: {
    play: true,
<<<<<<< HEAD
    track: "https://play.bears.finance/tone4.mp3",
=======
    track: 'https://play.decentraland.org/tone4.mp3'
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
  },
  component: Audio
} as Meta

export const Template: Story<AudioProps> = (args) => <Audio {...args} />
