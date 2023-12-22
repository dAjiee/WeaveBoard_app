"use client"

import Image from 'next/image';
import React from 'react';


const ShareButtonClient = ({ weaveId, author }: { weaveId: string, author: string }) => {
  const handleShareClick = () => {
    // Construct the URL you want to share
    const urlToShare = `${window.location.origin}/weave/${weaveId}`;

    // // Use the Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: `Check out this weave by ${author}`,
            url: urlToShare,
        }).catch((error) => {
            console.log('Error sharing', error);
        });
    } else {
    // Fallback to copying the URL to the clipboard
    navigator.clipboard.writeText(urlToShare).then(() => {
      alert('Link copied to clipboard!');
    }).catch((error) => {
      console.error('Copy failed', error);
    });
    }
  };

  return (
    <Image
      src="/assets/share.svg"
      alt="share"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleShareClick}
    />
  );
};

async function ShareButton({ weaveId, author }: { weaveId: string, author: string }) {
  return <ShareButtonClient weaveId={weaveId} author={author} />;
}

export default ShareButton;