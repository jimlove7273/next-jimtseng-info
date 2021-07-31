import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { openDB } from '../blogs'


export default async function getBlogs(req, res) {

	const db = await openDB()

	switch( req.method ) {
		case "GET":
			//const db = await openDB()
			const blog = await db.get("SELECT * FROM Blogs WHERE id=?", req.query.id)
			res.json(blog)
			break
		case "PUT":
			//const db = await openDB()
			const blogupdate = await db.prepare("UPDATE Blogs SET title=?, imgUrl=?, category=?, document=?, author=?, documentdate=? WHERE id=?")
			const result = blogupdate.run( req.body.title, req.body.imgUrl, req.body.category, req.body.document, req.body.author, req.body.documentdate, req.query.id )
			//result.finalize()
			const getblog = await db.get("SELECT * FROM Blogs WHERE id=?", req.query.id)
			res.json(getblog)
			break
		default:
			res.json({"Error":"Invalid Request Detected"})
	}


}

