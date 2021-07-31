import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { openDB } from './blogs'



export default async function getPortfolios(req, res) {

	const db = await openDB()

	switch (req.method) {
    case 'GET':
			const portfolios = await db.all("SELECT * FROM Portfolios")
			res.json(portfolios)
			break

		case 'POST':

			let insertString = "INSERT INTO Portfolios (title, siteowner, imageUrl, webUrl, content, completed, technology, deprecated) VALUES ('"
			insertString += req.body.title + "', '" + req.body.siteowner + "', '"
			insertString += req.body.imageUrl + "', '" + req.body.webUrl + "', '"
			insertString += req.body.content + "', '" + req.body.completed + "', '"
			insertString += req.body.technology + "', '" + req.body.deprecated + "')"
			console.log("Adding Portfolio", insertString)
			const bloginsert = await db.all(insertString)
			res.status(200).json({"Message":"Process Completed"})
			break

		case 'DELETE':

			const id = req.body.id
			const delblog = await db.all("DELETE FROM Portfolios WHERE ID="+id)
			res.status(200).json({"Message":"Record Deleted"})
			break

		default:

			res.status(405).json({"Error":"This Request Method is Not Supported!"})
			break
	
		}
}

