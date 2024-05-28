'use client'
import { useParams, useRouter, useSearchParams } from "next/navigation";

// export const metadata = {
//   title: "Posts",
// };

export default function Posts() {


  return (
    <div>
      This is a Great Post.
      <button
      onClick={() => navigate.push('/')}
      > Navigate to Home screen.</button>
    </div>
  );
}
