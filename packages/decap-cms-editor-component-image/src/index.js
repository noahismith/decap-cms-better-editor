import React from 'react';

const image = {
  label: 'Image',
  id: 'image',
  fromBlock: match =>
    match && {
      image: match[2],
      alt: match[1],
      title: match[4],
      width: match[6],
    },
  toBlock: (obj) => {
    // Handle both Immutable and plain objects
    const getValue = (key) => {
      if (obj && obj.get && typeof obj.get === 'function') {
        return obj.get(key);
      }
      return obj && obj[key] ? obj[key] : '';
    };
    
    const alt = getValue('alt') || '';
    const image = getValue('image') || '';
    const title = getValue('title');
    const width = getValue('width');
    
    let markdown = `![${alt}](${image}`;
    if (title) {
      markdown += ` "${title.replace(/"/g, '\\"')}"`;
    }
    markdown += ')';
    
    if (width) {
      markdown += `{ width=${width} }`;
    }
    
    return markdown;
  },
  // eslint-disable-next-line react/display-name
  toPreview: (props, getAsset, fields) => {
    const getValue = (key) => {
      if (props && props.get && typeof props.get === 'function') {
        return props.get(key);
      }
      return props && props[key] ? props[key] : '';
    };
    
    const image = getValue('image');
    const alt = getValue('alt') || '';
    const title = getValue('title') || '';
    const width = getValue('width');
    
    const imageField = fields?.find(f => f.get('widget') === 'image');
    const src = getAsset(image, imageField);
    
    const imgProps = {
      src: src || '',
      alt: alt,
      title: title,
    };
    
    if (width) {
      imgProps.style = { width };
    }
    
    return <img {...imgProps} />;
  },
  pattern: /^!\[(.*)\]\((.*?)(\s"(.*)")?\)(\s*\{\s*width=([^}]+)\s*\})?/,
  fields: [
    {
      label: 'Image',
      name: 'image',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Alt Text',
      name: 'alt',
    },
    {
      label: 'Title',
      name: 'title',
    },
    {
      label: 'Width',
      name: 'width',
      widget: 'string',
      hint: 'CSS width value (e.g., 300px, 50%, auto)',
    },
  ],
};

export const DecapCmsEditorComponentImage = image;
export default image;
