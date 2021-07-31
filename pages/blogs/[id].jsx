import Layout from '../layout';

const Blog = ({blog}) => {

	console.log("blog", blog)
	
	return (
		<Layout>

			<div id="blogsinglepage">
				<div className="pgcontent">
					<div className="container">

						{/* {JSON.stringify(blog)} */}

						<div className="blogtop">
							<img src={"/"+blog.imgUrl} align="left" />
							<div className="blogtitle">{blog.title}</div>
						</div>
						<div className="blogmeta">
							<div>Date: {blog.documentdate}</div>
							<div>Category: {blog.category}</div>
						</div>
						<div className="content">
							<div
								dangerouslySetInnerHTML={{
									__html: blog.content
								}}></div>
						</div>

					</div>
				</div>
			</div>

		</Layout>
	)
}

export default Blog


export const getStaticProps = async (ctx) => {

	//console.log("Parameter", ctx.params.id)
	const res = await fetch('http://localhost:3000/api/blog/'+ctx.params.id)
	//console.log("res", res)
	const blog = await res.json()

	return {
    props: { blog } }
	
}

export const getStaticPaths = async () => {

	return {
		fallback: true,
		paths: [
			{ params: { id: '1' } }, { params: { id: '2' } }
		]
	}
}

