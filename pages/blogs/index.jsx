import Layout from '../layout'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

export default function indexBlogs({blogs}) {

	return (
		<Layout>
			<div className="container">
				<div className="pgcontent">
				<div className="pgheading">My Blog</div>
					<div className="grid grid-4columns grid-gap10">
						{
							blogs.map( blog => (
								<Link href={`/blogs/${blog.ID}`} key={blog.ID}><a>
									<div className="gridcard" key={blog.ID}>
										<img src={blog.imgUrl} />
										<div className="gridbottomtitle">{blog.title}</div>
									</div>
								</a></Link>
							))
						}
					</div>
				</div>
			</div>
		</Layout>
	)
}


export async function getServerSideProps() {

	const res = await fetch('http://localhost:3000/api/blogs')
	//console.log("res", res)
	const blogs = await res.json()

	return {
    props: {
      blogs
    }
  }
	
}