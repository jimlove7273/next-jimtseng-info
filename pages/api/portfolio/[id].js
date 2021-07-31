import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { openDB } from '../blogs'


export default async function getPortfolios(req, res) {

	const db = await openDB()

	switch( req.method ) {
		case "GET":
			const portfolio = await db.all("SELECT * FROM Portfolios WHERE id=?", req.query.id)
			res.json(portfolio)
			break
		case "PUT":
			//const db = await openDB()
			const blogupdate = await db.prepare("UPDATE Portfolios SET title=?, siteowner=?, imageUrl=?, webUrl=?, content=?, completed=?, technology=?, deprecated=? WHERE id=?")
			const result = await blogupdate.run( req.body.title, req.body.siteowner, req.body.imageUrl, req.body.webUrl, req.body.content, req.body.completed, req.body.technology, req.body.deprecated, req.query.id )
			//result.finalize()
			const getportfolio = await db.get("SELECT * FROM Portfolios WHERE id=?", req.query.id)
			res.json(getportfolio)
			break	
		default:
			res.json({"Error":"Invalid Request Detected"})
}

}
