import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export async function openDB() {
  return open({
    filename: './data.sqlite',
    driver: sqlite3.Database
  })
}


export default async function getBlogs(req, res) {

  const db = await openDB()

  switch (req.method) {
    case 'GET':

      const blogs = await db.all("SELECT * FROM Blogs")
      res.json(blogs)
      break

    case 'POST':

      let insertString = "INSERT INTO Blogs (title, category, document, imgUrl, documentdate, author, content) VALUES ('"
      insertString += req.body.title + "', '" + req.body.category + "', '"
      insertString += req.body.document + "', '" + req.body.imgUrl + "', '"
      insertString += req.body.documentdate + "', '" + req.body.author + "', '"
      insertString += req.body.content + "')"
      const bloginsert = await db.all(insertString)
      res.status(200).json({"Message":"Process Completed"})
      break

    case 'DELETE':

      const id = req.body.id
      const delblog = await db.all("DELETE FROM Blogs WHERE ID="+id)
      res.status(200).json({"Message":"Record Deleted"})
      break

    default:

      res.status(405).json({"Error":"This Request Method is Not Supported!"})
      break

  }

}

