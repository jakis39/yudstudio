import React from 'react';
import ReactPlayer from 'react-player';

const Preview = ({value}) => {
	const { url } = value
	return (<ReactPlayer url={url} />)
}

export default {
    name: 'video',
    type: 'object',
    title: 'Video Embed',
    fields: [
      {
        name: 'url',
        type: 'url',
        title: 'Video URL'
      }
    ],
    preview: {
        select: {
            url: 'url'
        },
        component: Preview
    }
  }