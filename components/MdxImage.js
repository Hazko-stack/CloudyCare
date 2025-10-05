'use client'

import Image from 'next/image'

export default function MdxImage({ src, alt, aspectRatio = 'aspect-video' }) {
  return (
    <span className={`block relative w-full my-8 rounded-lg overflow-hidden ${aspectRatio}`}>
      <Image
        src={src}
        alt={alt || ''}
        fill
        className="object-cover"
        unoptimized
        loader={({ src }) => src}
      />
    </span>
  )
}