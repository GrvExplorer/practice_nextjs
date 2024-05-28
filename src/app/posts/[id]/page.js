
export const metadata = {
  title: 'Dynamic Post'
}


function Post({ params }) {
  return (
    <div>

      Great Post With a { params.id }
    </div>
  )
}

export default Post