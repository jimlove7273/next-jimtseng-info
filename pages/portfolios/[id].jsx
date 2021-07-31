import Layout from '../layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Portfolios = ({portfolio}) => {
	
	return (
		<Layout>

			<div id="portfoliosinglepage">
				<div className="pgcontent">
					<div className="container">

						<div className="pgheading">{portfolio[0].title}</div>
						<div className="grid grid-2columns grid-gap10">
							<div className="imgingrid"><img src={"/"+portfolio[0].imageUrl} /></div>
							<div className="content">
								{portfolio[0].content}<br /><br />
								<b>URL:</b><br />{portfolio[0].webUrl}<br /><br />
								<b>Owner:</b><br />{portfolio[0].siteowner}<br /><br />
								<b>Completed:</b><br />{portfolio[0].completed}<br /><br />
								<b>Technology:</b><br />{portfolio[0].technology}<br /><br />
								{
									portfolio[0].deprecated==="Yes"
										? <div className="deprecated">Deprecated</div>
										: <Link href={portfolio[0].webUrl}>
												<a className="jumpbutton" target="_blank">Go To This Site</a>
											</Link>
								}
							</div>
						</div>

					</div>
				</div>
			</div>

		</Layout>
	)
}

export default Portfolios


export const getStaticProps = async ({params: { id }}) => {

	const res = await fetch('http://localhost:3000/api/portfolio/'+id)
	//console.log("res", res)
	const portfolio = await res.json()

	return {
    props: { portfolio } }
	
}

export const getStaticPaths = async () => {

	const res = await fetch("http://localhost:3000/api/portfolios");
	const portfolios = await res.json();
	
	const paths = portfolios.map( portfolio => ({
		params: { id: portfolio.ID.toString() }
	}))

	return {
		fallback: false,
		paths: paths
	}
}