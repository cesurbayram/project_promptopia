"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick,handleEdit, handleDelete}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  
  const [copied, setCopied] = useState("");

  const handleCopy =() => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""),3000);
  }
  return (
    <div classsName="prompt_card">
      <div classsName= 'flex justify-between items-start gap-5'>
        <div classsName="flex-1 justify-start items-center gap-3 cursor-pointer">
           <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              classsName="rounded-full object-contain"
           />

          <div classsName="flex flex-col">
            <h3 classsName="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p classsName="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div classsName="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />

        </div>
      </div>
      <p classsName="m-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p classsName="font-inter text-sm blue_gradient cursor-pointer"
        onClick={ () => handleTagClick && handleTagClick (post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id &&
      pathName === '/profile' && (
        <div classsName="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            classsName="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            classsName="font-inter text-sm 
            orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
